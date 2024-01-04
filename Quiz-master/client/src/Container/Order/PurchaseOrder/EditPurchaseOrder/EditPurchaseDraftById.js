import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import Spinner from "../../../../UI/Spinner/Spinner";
import validatePurchaseOrder from "../../../../Validator/order/purcahseOrder/purchaseOrder";
import classnames from "classnames";
import ReactHTMLTableToExcel from "react-html-table-to-excel";
import {
  Row,
  Col,
  Form,
  Button,
  Container,
  Card,
  Table,
  FormControl,
  FormLabel,
  ButtonGroup
} from "react-bootstrap";
import Navbar from "../../../../UI/Navbar/Navbar";
import Sidebar from "../../../../UI/Sidebar/Sidebar";
import axios from "axios";
import getIp from "../../../../Utility/getIp";
import Modal from "../../../../UI/Modal/messageModal";
import { CardBody } from "react-bootstrap/Card";
import Routes from "../../../../config/Routes";
const STATUS = {
  DRAFT: "badge badge-secondary text-white",
  ISSUED: "badge badge-primary text-white",
  RECEIVED: "badge badge-success text-white"
};

class EditPurchaseDraftById extends Component {
  state = {
    show: false,
    ip: "",
    supplierName: "",
    purchaseOrderDate: "",
    orderStatus: "",
    expectedDeliveryDate: "",
    productDetails: [{}],
    productList: "",
    loading: true,
    errors: "",
    alertVariant: "danger",
    message: "",
    amount: ""
  };

  showAlerts = () => {
    this.setState({ show: true });
  };
  modalClose = () => {
    this.setState({ show: false });
  };

  changeHandler = e => {
    this.setState({ errors: "" });
    this.setState({ [e.target.name]: e.target.value });
  };
  deleteDraft = async () => {
    await axios
      .delete(`/api/purchase/${this.props.match.params.id}`)
      .then(res => {
        console.log(res);
        if (res.data.type === "error") {
          this.setState(
            {
              message: res.data.message,
              alertVariant: "danger"
            },
            () => {
              this.showAlerts();
            }
          );
        } else if (res.data.type === "success") {
          this.setState(
            {
              message: res.data.message,
              alertVariant: "success",
              errors: ""
            },
            () => {
              this.showAlerts();
            }
          );

          this.props.history.push(Routes.MANAGE_PURCHASE_ORDER);
        }
      })
      .catch(err => console.log(err));
  };

  saveDraft = async () => {
    console.log("Save Order");
    let productDetails = [...this.state.productDetails];
    console.log("productDetails", productDetails);
    let filledProductDetails = [];
    for (let product of productDetails) {
      if (product.productName) {
        filledProductDetails.push(product);
      }
    }
    let data = {
      ip: this.state.ip,
      supplierName: this.state.supplierName,
      purchaseId: this.props.match.params.id,
      orderDate: this.state.purchaseOrderDate,
      expectedDate: this.state.expectedDeliveryDate,
      productDetails: filledProductDetails,
      purchaseStatus: "draft",
      amount: this.state.amount
    };
    //const { errors, isValid } = validatePurchaOrder(data);
    let isValid = true;
    let errors = {};
    await axios
      .put(`/api/purchase/draft/${this.props.match.params.id}`, data)
      .then(res => {
        if (res.data.type === "error") {
          alert("error");
          this.setState(
            {
              message: res.data.message,
              alertVariant: "danger"
            },
            () => {
              this.showAlerts();
            }
          );
        } else if (res.data.type === "success") {
          this.setState(
            {
              message: res.data.message,
              alertVariant: "success",
              errors: ""
            },
            () => {
              this.showAlerts();
            }
          );
          this.props.history.push(
            `${Routes.VIEW_PURCHASE_ORDER}/${this.props.match.params.id}`
          );
        }
      })
      .catch(err => console.log(err));
  };
  updatedQuantity = async () => {
    this.props.history.push(
      `${Routes.UPDATE_PURCHASE_QUANTITY}/${this.props.match.params.id}`
    );
  };

  handleChange = idx => e => {
    console.log("index", idx);
    this.setState({ errors: "" });
    let { name, value } = e.target;
    let selectedIndex = e.target.selectedIndex - 1;
    if (selectedIndex < 0) {
      document.querySelector(`#product-${idx}`).style.outline = "";
      return;
    }
    let productDetails = [...this.state.productDetails];
    productDetails[idx] = {
      ...productDetails[idx],
      [name]: value
    };
    if (name === "productName") {
      if (this.productAdded.hasOwnProperty(value)) {
        this.setState({
          errors: { productDetails: [`Dublicate Product added in the list`] }
        });
        document.querySelector(`#product-${idx}`).style.outline =
          "2px solid #ff0000";
        return;
      } else {
        document.querySelector(`#product-${idx}`).style.outline = "";
        this.productAdded[value] = idx;
      }
      productDetails[idx] = {
        ...productDetails[idx],
        rate: this.state.productList[selectedIndex].rate
      };
    }
    this.setState(
      {
        ...this.state,
        productDetails,
        errors: {}
      },
      () => {
        let productsInState = {};
        let i = 0;
        for (let product of this.state.productDetails) {
          productsInState[product.productName] = i++;
        }
        this.productAdded = productsInState;
      }
    );
    if (productDetails[idx].rate && productDetails[idx].quantity) {
      let amount =
        +productDetails[idx].rate * +productDetails[idx].quantity -
        (+productDetails[idx].discount || 0);
      if (amount < 0) {
        this.setState({
          errors: {
            productDetails: [
              // ...this.state.errors.productDetails,
              `Amount cannot be in negative for  ${
                this.state.productDetails[idx].productName
              } at S.No. ${idx + 1}`
            ]
          }
        });
        document.querySelector(`#product-${idx}`).style.outline =
          "2px solid #ff0000";
      } else {
        document.querySelector(`#product-${idx}`).style.outline = "";
      }

      document.querySelector(`#amount-${idx}`).textContent = amount;
    }
    this.calculateTotal();
  };

  calculateTotal = () => {
    const amounts = document.querySelectorAll("[id^='amount']");
    let total = 0.0;
    amounts.forEach(amount => {
      total += +amount.textContent;
    });
    console.log("total ", total);
    document.querySelector(`#sub-total`).textContent = total;
    let otherCharges = +document.querySelector("#other-charges").value || 0;
    if(isNaN(otherCharges))
      this.setState({ errors: { otherCharges: "Numeric value required" } });
    total += otherCharges;
    document.querySelector("#total").textContent = total;
    this.setState({ amount: total });
  };
  handleAddRow = () => {
    const item = {
      product: "",
      quantity: "",
      rate: "",
      discount: ""
    };
    this.setState({
      productDetails: [...this.state.productDetails, item]
    });
  };

  handleRemoveSpecificRow = idx => () => {
    if (idx === 0) return;
    const productDetails = [...this.state.productDetails];
    //TODO: ADD THIS IN PRAFUL"S
    delete this.productAdded[productDetails[idx].productName];
    productDetails.splice(idx, 1);
    this.setState({ productDetails });
  };

  amounts = [];
  productAdded = {};

  componentDidMount = async () => {
    this.setState({ ip: await getIp() });
    await this.loadProducts();
    await this.loadOrderDetails(this.props.match.params.id);
    this.calculateTotal();
    let subTotal = +document.querySelector("#sub-total").textContent || 0;
    let total = +document.querySelector("#total").textContent || 0;
    document.querySelector(`#other-charges`).value = total - subTotal;
  };

  loadProducts = async () => {
    return await axios
      .get("/api/purchase")
      .then(res => {
        console.log("loadProduct", res.data);
        if (res.data.type == "error") {
          alert("couldnot load products");
        }
        this.setState({ productList: res.data });
      })
      .catch(err => {
        console.log(err);
      });
  };

  loadOrderDetails = async () => {
    return await axios
      .get(`/api/purchase/purchaseorder/${this.props.match.params.id}`)
      .then(res => {
        if (res.data.type === "error") {
          alert("couldnot load the order detail");
          this.props.history.push(Routes.MANAGE_PURCHASE_ORDER);
          return;
        }

        let orderDetails = res.data.orderDetails;
        let productDetails = res.data.productDetails;
        console.log(
          "orderDetail ",
          orderDetails,
         
        );
        this.setState(
          {
            amount: orderDetails[0].amount,
            supplierName: orderDetails[0].supplierName,
            purchaseOrderDate: orderDetails[0].purchaseOrderDate.split(" ")[0],
            orderStatus: orderDetails[0].orderStatus,
            expectedDeliveryDate: orderDetails[0].expectedDeliveryDate.split(
              " "
            )[0],
            productDetails: productDetails,
            loading: false
          },
          () => {
            let productsInState = {};
            let i = 0;
            for (let product of this.state.productDetails) {
              productsInState[product.productName] = i++;
            }
            this.productAdded = productsInState;
          }
        );
      })
      .catch(err => {
        console.log(err);
      });
  };

  render() {
    let productErrors = [];
    let { errors } = this.state;
    if (errors.productDetails) {
      for (let error of errors.productDetails) {
        productErrors.push(
          <p
            style={{ fontSize: ".8rem" }}
            className="p-2 border border-danger text-danger mb-1"
          >
            {error}
          </p>
        );
      }
    }

    let display = <Spinner border="animation" />;
    let productList = <Spinner border="animation" />;

    let purchaseOptions = "";
    if (!this.state.loading) {
      purchaseOptions = (
        <Row className="d-flex justify-content-center">
          <Col xs="12" md="2">
            <ReactHTMLTableToExcel
              id="test-table-xls-button"
              className="col btn btn-primary"
              table="table-to-xls"
              filename={`purchase_order-${this.props.match.params.id}`}
              sheet="tablexls"
              buttonText="Export to Excel"
            />
          </Col>
          {this.state.orderStatus === "issued" ? (
            <Col xs="12" md="2">
              <Button
                onClick={this.updateQuantity}
                variant="info"
                className="col"
              >
                Update Quantity
              </Button>
            </Col>
          ) : (
            <Col xs="12" md="2">
              <Button onClick={this.saveDraft} variant="info" className="col">
                Save Draft
              </Button>
            </Col>
          )}
          <Col xs="12" md="2">
            <Button variant="danger" className="col" onClick={this.deleteDraft}>
              Delete Draft
            </Button>
          </Col>
        </Row>
      );
    }
    let productLists = [];
    let i = 0;
    for (let product of this.state.productList) {
      productLists.push(
        <option value={product.name} key={product.name}>
          {product.name}
        </option>
      );
    }

    display = (
      <>
        <Navbar />
        <Container
          fluid
          style={{ margin: "0", padding: "0", background: "#eeeeee" }}
        >
          <Row noGutters>
            <Sidebar />
            <Col className="p-0 m-0 p-md-3 m-md-2">
              <div className="mt-2">
                <h2>Purchase Order Id :: PO-{this.props.match.params.id}</h2>
              </div>
              <hr />
              <Card>
                <Card.Body>
                  <Row>
                    <Col mb="6">
                      <h5>Edit draft order</h5>
                      <p style={{ fontSize: ".9rem", color: "#ACACAC" }}>
                        Manage purchase order draft
                      </p>
                    </Col>
                  </Row>
                  <hr />
                  {purchaseOptions}
                  <hr />
                  <Row>
                    <Col>
                      <Row>
                        <Col>
                          <Form.Group>
                            <Row>
                              <Col md="6">
                                <Form.Label>Supplier's Name</Form.Label>
                                <Form.Control
                                  type="text"
                                  placeholder="Supplier's Full Name"
                                  value={this.state.supplierName}
                                  name="supplierName"
                                  onChange={this.handleChange}
                                />{" "}
                              </Col>
                              <Col md="3" />
                            </Row>
                          </Form.Group>
                          <Form.Group>
                            <Row>
                              <Col md="6">
                                <Form.Label>Order Date</Form.Label>
                                <Form.Control
                                  type="text"
                                  placeholder="Purchase Order Date"
                                  value={this.state.purchaseOrderDate}
                                  name="purchaseOrderDate"
                                  onChange={this.handleChange}
                                />{" "}
                              </Col>
                              <Col md="3" />
                            </Row>
                          </Form.Group>
                          <Form.Group>
                            <Row>
                              <Col md="6">
                                <Form.Label>Expected Delivery Date</Form.Label>
                                <Form.Control
                                  type="text"
                                  placeholder="Expected Delivery Date"
                                  value={this.state.expectedDeliveryDate}
                                  name="expectedOrderDate"
                                  onChange={this.handleChange}
                                />{" "}
                              </Col>
                              <Col md="3" />
                            </Row>
                          </Form.Group>
                        </Col>
                      </Row>
                      <Row>
                        <Col>
                          <div>{productErrors}</div>
                          <Table id="table-to-xls" striped bordered responsive>
                            <thead>
                              <tr>
                                <th>S.No.</th>
                                <th>Product Name</th>
                                <th className="text-right">Quantity</th>
                                <th className="text-right">Rate</th>
                                <th className="text-right">Discount</th>
                                <th>Amount</th>
                                <th />
                              </tr>
                            </thead>
                            <tbody>
                              {this.state.productDetails.map(
                                (product, index) => {
                                  let no = index;
                                  return (
                                    <tr id={`product-${index}`} key={index}>
                                      <td>{++no}</td>
                                      <td>
                                        <Form.Control
                                          as="select"
                                          name="productName"
                                          value={product.productName || ""}
                                          onChange={this.handleChange(index)}
                                        >
                                          <option value="">
                                            Select a product
                                          </option>
                                          {productLists}
                                        </Form.Control>
                                        <Form.Control.Feedback type="invalid">
                                          {errors.productName}
                                        </Form.Control.Feedback>
                                      </td>
                                      <td>
                                        <Form.Control
                                          id={`quantity-${index}`}
                                          type="number"
                                          min="0"
                                          name="quantity"
                                          className="text-right"
                                          value={product.quantity || ""}
                                          onChange={this.handleChange(index)}
                                        />
                                        <Form.Control.Feedback type="invalid">
                                          {errors.quantity}
                                        </Form.Control.Feedback>
                                      </td>
                                      <td>
                                        <Form.Label
                                          id={`rate-${index}`}
                                          type="number"
                                          min="0"
                                          name="rate"
                                          className="text-right"
                                          onChange={this.handleChange(index)}
                                        >
                                          {product.rate ||
                                            this.state.productDetails[index]
                                              .rate}
                                        </Form.Label>
                                        <Form.Control.Feedback type="invalid">
                                          {errors.rate}
                                        </Form.Control.Feedback>
                                      </td>
                                      <td>
                                        <Form.Control
                                          id={`discount-${index}`}
                                          type="number"
                                          min="0"
                                          name="discount"
                                          className="text-right"
                                          value={product.discount || ""}
                                          onChange={this.handleChange(index)}
                                        />
                                        <Form.Control.Feedback type="invalid">
                                          {errors.discount}
                                        </Form.Control.Feedback>
                                      </td>
                                      <td>
                                        <Form.Label
                                          className="form-control"
                                          style={{
                                            border: "0",
                                            outline: "0",
                                            background: "transparent"
                                          }}
                                          id={`amount-${index}`}
                                          name="amount"
                                        >
                                          {product.quantity * product.rate -
                                            product.discount}
                                        </Form.Label>
                                      </td>
                                      <td>
                                        {index > 0 ? (
                                          <Button
                                            style={{ borderRadius: "50%" }}
                                            variant="danger"
                                            onClick={this.handleRemoveSpecificRow(
                                              index
                                            )}
                                          >
                                            X
                                          </Button>
                                        ) : (
                                          <Button
                                            style={{
                                              borderRadius: "50%",
                                              visibility: "hidden"
                                            }}
                                          >
                                            X
                                          </Button>
                                        )}
                                      </td>
                                    </tr>
                                  );
                                }
                              )}
                            </tbody>
                          </Table>
                        </Col>
                      </Row>
                      <Row>
                        <Col xs="12 my-2" sm="6" md="4" lg="2">
                          <Button
                            className="btn btn-primary col"
                            onClick={this.handleAddRow}
                            disabled={
                              this.state.productDetails.length >
                              this.state.productList.length - 1
                            }
                          >
                            Add Product
                          </Button>
                        </Col>
                        <Col sm="6" md="6 offset-2" lg="4 offset-6">
                          <Row>
                            <Col className="text-right">
                              <FormLabel>Sub Total</FormLabel>
                            </Col>
                            <Col className="text-right">
                              Rs.
                              <FormLabel id="sub-total">
                                {/* {this.amounts.reduce((total, value) => {
                                return (total += value);
                              })} */}
                              </FormLabel>
                            </Col>
                          </Row>
                          <hr />
                          <Row>
                            <Col className="text-right">
                              <FormLabel>Other Charges</FormLabel>
                            </Col>
                            <Col className="text-right">
                              <Form.Control
                                type="number"
                                id="other-charges"
                                className={classnames("text-right", {
                                  "is-invalid": errors.otherCharges
                                })}
                                onChange={this.calculateTotal}
                              />
                              <Form.Control.Feedback type="invalid">
                                {errors.otherCharges}
                              </Form.Control.Feedback>
                            </Col>
                          </Row>
                          <hr />
                          <hr />
                          <Row>
                            <Col className="text-right">
                              <FormLabel>Total</FormLabel>
                            </Col>
                            <Col className="text-right">
                              Rs.{" "}
                              <FormLabel id="total">
                                {this.state.amount}
                              </FormLabel>
                            </Col>
                          </Row>
                        </Col>
                      </Row>
                    </Col>
                  </Row>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Container>
        <Modal
          show={this.state.show}
          close={this.modalClose}
          variant={this.state.alertVariant}
          message={this.state.message}
        />
      </>
    );

    return <div>{display}</div>;
  }
}
export default withRouter(EditPurchaseDraftById);
