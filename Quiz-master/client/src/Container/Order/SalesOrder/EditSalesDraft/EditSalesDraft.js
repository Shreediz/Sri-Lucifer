import React from "react";
import { withRouter } from "react-router-dom";
import Spinner from "../../../../UI/Spinner/Spinner";
import checkPermission from "../../../../Utility/checkPermission";
import SLUGS from "../../../../config/SLUGS";
import classnames from "classnames";
import ReactHTMLTableToExcel from "react-html-table-to-excel";
import validateSalesOrder from "../../../../Validator/order/SalesOrder/SalesOrder";
import {
  Row,
  Col,
  Form,
  Button,
  Container,
  Card,
  Table,
  FormLabel
} from "react-bootstrap";
import Navbar from "../../../../UI/Navbar/Navbar";
import Sidebar from "../../../../UI/Sidebar/Sidebar";
import axios from "axios";
import getIp from "../../../../Utility/getIp";
import Routes from "../../../../config/Routes";
import Modal from "../../../../UI/Modal/messageModal";
class EditSalesDraft extends React.Component {
  state = {
    show: false,
    ip: "",
    customerName: "",
    salesOrderDate: "",
    orderStatus: "",
    expectedShipmentDate: "",
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
  amounts = [];
  productAdded = {};
  componentDidMount = async () => {
    let isAuthorized = await checkPermission(SLUGS.MANAGE_SALES_ORDER);
    if (!isAuthorized) {
      this.props.history.push(Routes.UNAUTHORIZED);
    }
    this.setState({ ip: await getIp() });
    await this.loadProducts();
    await this.loadOrderDetails(this.props.match.params.id);
    this.calculateTotal();
    let subTotal = +document.querySelector("#sub-total").textContent || 0;
    let total = +document.querySelector("#total").textContent || 0;
    document.querySelector("#other-charges").value = total - subTotal;
  };
  loadOrderDetails = async () => {
    return await axios
      .get(`/api/salesorders/${this.props.match.params.id}`)
      .then(res => {
        if (res.data.type === "error") {
          this.props.history.push("/salesorders");
          return;
        }

        let orderDetails = res.data.orderDetails;
        this.setState(
          {
            amount: orderDetails.amount,
            customerName: orderDetails.customerName,
            salesOrderDate: orderDetails.orderDate.split(" ")[0],
            orderStatus: orderDetails.orderStatus,
            expectedShipmentDate: orderDetails.expectedShipmentDate.split(
              " "
            )[0],
            productDetails: res.data.productDetails,
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
      .catch(err => console.log(err));
  };

  loadProducts = async () => {
    return await axios
      .get("/api/salesorders")
      .then(res => {
        if (res.data.type === "error") {
          // alert("Couldn't load products");
          //TODO: Handle this
        }
        this.setState({ productList: res.data });
      })
      .catch(err => console.log(err));
  };
  handleChange = idx => e => {
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
          errors: {
            productDetails: [
              // ...this.state.errors.productDetails,
              `Duplicate products added in list`
            ]
          }
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
      document.querySelector(
        `#stock-${idx}`
      ).textContent = `Uncommited stock := ${this.state.productList[selectedIndex].quantity}`;
    }

    if (name === "quantity") {
      if (value < 0) {
        this.setState({
          errors: {
            productDetails: [
              `Quantity cannot be negative for ${
                this.state.productDetails[idx].productName
              } at S.No. ${idx + 1}`
            ]
          }
        });
        document.querySelector(`#product-${idx}`).style.outline =
          "2px solid #ff0000";
        return;
      }
      let stockAvailable = document
        .querySelector(`#stock-${idx}`)
        .textContent.split(":=")[1];
      if (+stockAvailable < +value) {
        this.setState({
          errors: {
            productDetails: [
              // ...this.state.errors.productDetails,
              `Specified quantity not available for ${
                this.state.productDetails[idx].productName
              } at S.No. ${idx + 1}`
            ]
          }
        });
        document.querySelector(`#product-${idx}`).style.outline =
          "2px solid #ff0000";
        return;
      } else {
        document.querySelector(`#product-${idx}`).style.outline = "";
      }
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
    document.querySelector("#sub-total").textContent = total;
    let otherCharges = +document.querySelector("#other-charges").value || 0;
    if (isNaN(otherCharges))
      this.setState({ errors: { otherCharges: "Numeric value required" } });
    total += otherCharges;
    document.querySelector("#total").textContent = total;
    this.setState({ amount: total });
  };
  handleAddRow = () => {
    const item = {
      productName: "",
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
  saveDraft = async () => {
    //TODO: Fix Redirect
    //Sanitize and remove empty rows
    let productDetails = [...this.state.productDetails];
    let filledProductDetails = [];
    for (let product of productDetails) {
      if (product.productName) {
        filledProductDetails.push(product);
      }
    }
    let data = {
      ip: this.state.ip,
      customerName: this.state.customerName,
      salesId: this.props.match.params.id,
      salesOrderDate: this.state.salesOrderDate,
      expectedShipmentDate: this.state.expectedShipmentDate,
      productDetails: filledProductDetails,
      salesStatus: "draft",
      amount: this.state.amount
    };
    const { errors, isValid } = validateSalesOrder(data);
    if (isValid) {
      this.setState({ errors: "" });
      axios
        .put(`/api/salesorders/draft/${this.props.match.params.id}`, data)
        .then(res => {
          if (res.data.type === "success") {
            this.setState(
              { message: res.data.message, alertVariant: "success" },
              () => {
                this.showAlerts();
              }
            );
            this.props.history.replace(
              `/salesorders/${this.props.match.params.id}`
            );
          } else if (res.data.type === "error") {
            this.setState(
              {
                message: res.data.message,
                alertVariant: "danger"
              },
              () => {
                this.showAlerts();
              }
            );
          } else {
            this.setState({ errors: "" });
          }
        })
        .catch(err => {
          this.setState(
            {
              message: "Failed to update draft.",
              alertVariant: "danger"
            },
            () => {
              this.showAlerts();
            }
          );
          this.setState({ errors: err.response.data.errors });
          this.loadProducts();
        });
    } else {
      this.setState({ errors: errors });
    }
  };
  deleteDraft = async () => {
    await axios
      .put(`/api/salesorders/${this.props.match.params.id}`, {
        ip: this.state.ip
      })
      .then(res => {
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
        }
        setTimeout(() => {
          this.props.history.push(Routes.MANAGE_SALES_ORDER);
        }, 1000);
      })
      .catch(err => {});
  };
  // confirmOrder = async () => {
  //   console.log("CONFIRM ORDER");
  //   await axios
  //     .put(`/api/salesorders/confirm/${this.props.match.params.id}`)
  //     .then(res => {
  //       if (res.data.type === "error") {
  //         this.setState(
  //           {
  //             message: res.data.message,
  //             alertVariant: "danger"
  //           },
  //           () => {
  //             this.showAlerts();
  //           }
  //         );
  //       } else if (res.data.type === "success") {
  //         this.setState(
  //           {
  //             message: res.data.message,
  //             alertVariant: "success",
  //             errors: ""
  //           },
  //           () => {
  //             this.showAlerts();
  //           }
  //         );
  //         this.props.history.push(`/salesorders/${this.props.match.params.id}`);
  //       }
  //     })
  //     .catch(err => console.log(err));
  // };
  render() {
    let productErrors = [];
    let { errors } = this.state;
    console.log("Errors editSalesDraft", errors);
    let display = <Spinner border="animation" />;
    let productLists = <Spinner border="animation" />;
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
    let salesOptions = "";
    if (!this.state.loading) {
      salesOptions = (
        <Row className="d-flex justify-content-center">
          <Col xs="12" md="2">
            <ReactHTMLTableToExcel
              id="test-table-xls-button"
              className="col btn btn-primary"
              table="table-to-xls"
              filename={`salesorder-${this.props.match.params.id}`}
              sheet="tablexls"
              buttonText="Export to Excel"
            />
          </Col>
          <Col xs="12" md="2">
            <Button onClick={this.saveDraft} variant="info" className="col">
              Save Draft
            </Button>
          </Col>

          <Col xs="12" md="2">
            <Button variant="danger" className="col" onClick={this.deleteDraft}>
              Delete Draft
            </Button>
          </Col>
        </Row>
      );
      productLists = [];
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
                  <h2>Sales Order Id :: SO-{this.props.match.params.id}</h2>
                </div>
                <hr />
                <Card>
                  <Card.Body>
                    <Row>
                      <Col md="6">
                        <h5>Edit draft order</h5>
                        <p style={{ fontSize: ".9rem", color: "#ACACAC" }}>
                          Manage sales order draft
                        </p>
                      </Col>
                    </Row>
                    {salesOptions}
                    <hr />
                    <Row>
                      <Col>
                        <Row>
                          <Col>
                            <Form.Group>
                              <Row>
                                <Col md="6">
                                  <Form.Label>Customer's Name</Form.Label>
                                  <Form.Control
                                    type="text"
                                    placeholder="Customer's Full name"
                                    value={this.state.customerName}
                                    name="customerName"
                                    onChange={this.changeHandler}
                                    className={classnames({
                                      "is-invalid": errors.customerName
                                    })}
                                  />
                                  <Form.Control.Feedback type="invalid">
                                    {errors.customerName}
                                  </Form.Control.Feedback>
                                </Col>
                                <Col md="3" />
                              </Row>
                            </Form.Group>
                            <Form.Group>
                              <Row>
                                <Col md="4">
                                  <Form.Label>Sales's Order Date</Form.Label>
                                  <Form.Control
                                    type="date"
                                    value={this.state.salesOrderDate}
                                    name="salesOrderDate"
                                    onChange={this.changeHandler}
                                    className={classnames({
                                      "is-invalid": errors.salesOrderDate
                                    })}
                                  />
                                  <Form.Control.Feedback type="invalid">
                                    {errors.salesOrderDate}
                                  </Form.Control.Feedback>
                                </Col>
                                <Col md="4">
                                  <Form.Label>
                                    Expected Shipment Date
                                  </Form.Label>
                                  <Form.Control
                                    type="date"
                                    value={this.state.expectedShipmentDate}
                                    className={classnames({
                                      "is-invalid": errors.salesOrderDate
                                    })}
                                    name="expectedShipmentDate"
                                    onChange={this.changeHandler}
                                  />
                                  <Form.Control.Feedback type="invalid">
                                    {errors.expectedShipmentDate}
                                  </Form.Control.Feedback>
                                </Col>
                              </Row>
                            </Form.Group>
                          </Col>
                        </Row>
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
                            {this.state.productDetails.map((product, index) => {
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
                                      <option value="">Select a product</option>
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

                                    <span
                                      style={{ fontSize: ".8rem" }}
                                      className="text-danger text-right d-block"
                                      id={`stock-${index}`}
                                    >
                                      Uncommited stock:
                                      {this.state.productList.filter(item => {
                                        return (
                                          item.name === product.productName
                                        );
                                      })[0]
                                        ? this.state.productList.filter(
                                            item => {
                                              return (
                                                item.name ===
                                                product.productName
                                              );
                                            }
                                          )[0].quantity
                                        : `*`}
                                    </span>

                                    <Form.Control.Feedback type="invalid">
                                      {errors.quantity}
                                    </Form.Control.Feedback>
                                  </td>
                                  <td>
                                    <Form.Label
                                      type="number"
                                      min="0"
                                      id={`rate-${index}`}
                                      name="rate"
                                      style={{
                                        border: "0",
                                        outline: "0",
                                        background: "transparent"
                                      }}
                                      className="form-control text-right"
                                    >
                                      {product.rate || ""}
                                    </Form.Label>
                                    <Form.Control.Feedback type="invalid">
                                      {errors.rate}
                                    </Form.Control.Feedback>
                                  </td>
                                  <td>
                                    <Form.Control
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
                                      {product.quantity * product.rate}
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
                            })}
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
    }
    return <>{display}</>;
  }
}
export default withRouter(EditSalesDraft);
