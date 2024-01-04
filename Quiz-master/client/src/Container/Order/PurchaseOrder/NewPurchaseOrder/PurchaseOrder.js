import React, { Component } from "react";
import getIp from "../../../../Utility/getIp";

import {
  Container,
  Row,
  Col,
  Form,
  Button,
  Card,
  Table,
  Spinner,
  Modal
} from "react-bootstrap";
import { withRouter } from "react-router-dom";
import AddProductModal from "../../../../UI/Modal/addProductModel";
import MessageModal from "../../../../UI/Modal/messageModal";
import Navbar from "../../../../UI/Navbar/Navbar";
import Sidebar from "../../../../UI/Sidebar/Sidebar";
import classnames from "classnames";
import axios from "axios";
import checkPermission from "../../../../Utility/checkPermission";
import SLUGS from "../../../../config/SLUGS";
import Routes from "../../../../config/Routes";
import validateAddSupplier from "../../../../Validator/AddSupplier";
import purachaseOrder from "../../../../Validator/order/purcahseOrder/purchaseOrder";

class PurchaseOrder extends Component {
  state = {
    errors: "",
    supplier: "",
    supplierName: "",
    orderDate: "",
    expectedDate: "",
    productDetails: [{}],
    productList: "",
    loading: false,
    modalShow: false,
    message: "",
    show: false,
    alertVariant: "",
    total: "",
    countries: "",
    suppliers: ""
  };

  showSupplierCloseModal = () => {
    this.setState({ showSupplier: false });
  };

  showAlerts = () => {
    this.setState({ show: true });
  };
  addNewSupplier = async e => {
    this.setState({ showSupplier: false });
    e.preventDefault();
    let data = {
      ip: this.state.ip,
      firstname: this.state.firstname,
      middlename: this.state.middlename,
      lastname: this.state.lastname,
      email: this.state.email,
      phone: this.state.phone,
      mobile: this.state.mobile,
      address: this.state.address,
      country: this.state.country
    };

    const { errors, isValid } = validateAddSupplier(data);

    if (isValid) {
      await axios
        .post(`/api/users/supplier`, data)
        .then(res => {
          console.log("EROROROOROR", res.data);
          if (res.data.type === "success") {
            this.loadSuppliers();
            this.setState(
              {
                message: res.data.message,
                alertVariant: "success"
              },
              () => {
                this.showAlerts();
              }
            );
          } else if (res.data.type === "error") {
            this.setState(
              {
                errors: res.data.errors,
                message: res.data.message,
                alertVariant: "danger"
              },
              () => {
                this.showAlerts();
              }
            );
          } else {
            this.setState({ errors: res.data.errors });
          }
        })
        .catch(err => {
          this.setState(
            {
              // errors: err.response.data.errors,
              message: "Failed to add new supplier.",
              alertVariant: "danger"
            },
            () => {
              this.showAlerts();
            }
          );
        });
    } else {
      this.setState({ errors: errors });
    }
  };

  showNewSupplierModal = () => {
    this.setState({ showSupplier: true });
  };

  componentDidMount = async () => {
    let isAuthorized = await checkPermission(SLUGS.NEW_PURCHASE_ORDER);
    if (!isAuthorized) {
      this.props.history.push(Routes.UNAUTHORIZED);
    }
    this.setState({ ip: await getIp() });

    await this.loadCountries();
    await this.loadProducts();
    await this.loadSuppliers();
  };

  loadProducts = async () => {
    await axios
      .get("/api/purchase")
      .then(res => {
        if (res.data.type === "error") {
        }
        this.setState({ productList: res.data });
      })
      .catch(err => {
        console.log(err);
      });
  };

  loadCountries = async () => {
    await axios
      .get("/api/utility/add")
      .then(res => {
        this.setState({
          countries: res.data.countries
        });
      })
      .catch(err => {});
  };

  loadSuppliers = async () => {
    return await axios
      .get("/api/users/suppliers")
      .then(res => {
        console.log(res.data);
        this.setState({ suppliers: res.data.suppliers });
      })
      .catch(err => {
        console.log("error while fetching the suppliers list");
      });
  };
  changeHandler = e => {
    const { name, value } = e.target;
    this.setState({ [name]: value, errors: "" });
  };

  messageModalClose = () => {
    this.setState({ show: false });
  };
  order = async e => {
    let purchaseStatus;
    if (e.target.id === "save") {
      purchaseStatus = "draft";
    } else {
      purchaseStatus = "issued";
    }

    let data = {
      ip: this.state.ip,
      supplierName: this.state.supplierName,
      orderDate: this.state.orderDate,
      expectedDate: this.state.expectedDate,
      productDetails: this.state.productDetails,
      total: this.state.total,
      purchaseStatus
    };

    const { errors, isValid } = purachaseOrder(data);
    alert(isValid);
    if (isValid) {
      await axios
        .post("/api/purchase", data)
        .then(res => {
          //TODO:REDIRECT to particualar order page
          if (res.data.type === "success") {
            this.props.history.push(`${Routes.VIEW_PURCHASE_ORDER}/${res.data.orderId}`);
          } else if (res.data.type === "error") {
            this.setState(
              {
                message: res.data.message,
                alertVariant: "danger"
              },
              () => {
                this.showMessage();
              }
            );
          }
        })
        .catch(err => {
          this.setState(
            {
              message: "Failed to record sales order.",
              alertVariant: "danger"
            },
            () => {
              this.showAlerts();
            }
          );
        });
    } else {
      this.setState({ errors: errors });
    }
  };

  modalShow = () => {
    this.setState({ modalShow: true });
  };
  modalClose = () => {
    this.loadProducts();
    this.setState({ modalShow: false });
  };
  handleChange = idx => e => {
    this.setState({ errors: "" });
    const selectedIndex = e.target.selectedIndex;
    const { name, value } = e.target;
    if (value === "") return;

    const productDetails = [...this.state.productDetails];
    productDetails[idx] = {
      ...productDetails[idx],
      [name]: value
    };

    if (name === "product") {
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
        productDetails
      },
      () => {
        let productsInState = {};
        let i = 0;
        for (let product of this.state.productDetails) {
          productsInState[product.product] = i++;
        }
        this.productAdded = productsInState;
        console.log("check", this.productAdded);
      }
    );

    if (productDetails[idx].rate && productDetails[idx].quantity) {
      let amount =
        productDetails[idx].rate * productDetails[idx].quantity -
        (productDetails[idx].discount || 0);
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
  amounts = [];
  productAdded = {};

  calculateTotal = () => {
    const amounts = document.querySelectorAll(`[id^='amount']`);
    let total = 0.0;
    amounts.forEach(amount => {
      total += +amount.textContent;
    });
    document.querySelector(`#sub-Total`).textContent = total;
    total += +document.querySelector(`#other-charge`).value;

    document.querySelector(`#total`).textContent = total;
    this.setState({ total });
  };
  handleAddRow = () => {
    const item = {
      quantity: "",
      productName: "",
      rate: "",
      total: ""
    };
    this.setState({
      productDetails: [...this.state.productDetails, item]
    });
  };

  handleRemoveSpecificRow = idx => () => {
    if (idx === 0) return;
    const productDetails = [...this.state.productDetails];
    productDetails.splice(idx, 1);
    this.setState({ productDetails });
  };
  render() {
    let { errors } = this.state;
    let productLists = <Spinner border="animation" />;
    const countriesList = [];
    const supplierList = [];

    let countries = this.state.countries;
    let productErrors = [];
    if (errors.productDetails) {
      for (let problem of errors.productDetails) {
        productErrors.push(
          <p
            style={{ fontSize: ".8rem" }}
            className="p-2 border border-danger text-danger mb-1"
          >
            {problem}
          </p>
        );
      }
    }

    for (let country of countries)
      countriesList.push(
        <option value={country.name} key={country.name}>
          {country.name}
        </option>
      );
    let suppliers = this.state.suppliers;
    console.log("suppliers", suppliers);
    for (let supplier of suppliers) {
      supplierList.push(
        <option value={supplier.supplierName} key={supplier.supplierName}>
          {supplier.supplierName}--
          {supplier.address}
        </option>
      );
    }

    let display = <Spinner border="animation" />;
    if (!this.state.loading) {
      productLists = [];
      for (let product of this.state.productList) {
        productLists.push(<option value={product.name}>{product.name}</option>);
      }

      display = (
        <>
          <Navbar />
          <Container
            className="d-flex m-0 p-0"
            fluid
            style={{ position: "relative", width: "100vw" }}
          >
            <Sidebar />
            <Container
              fluid
              style={{ margin: "0", padding: "0", background: "#eeeeee" }}
            >
              <Row noGutters>
                <Col className="p-3 m-2">
                  <div className="mt-2">
                    <h2>Purchase</h2>
                  </div>
                  <hr />
                  <Card>
                    <Card.Body>
                      <h5>New Purchase</h5>
                      <p style={{ fontSize: ".9rem", color: "#ACACAC" }}>
                        Use this form to add New Purchase
                      </p>
                      <Form onSubmit={this.submit} className="needs-validation">
                        <Form.Group>
                          <Row>
                            <Col sm="12 mb-2" md="4 mb-0">
                              <Form.Label>Supplier</Form.Label>
                              <Form.Control
                                className={classnames({
                                  "is-invalid": errors.supplierName
                                })}
                                value={this.state.supplierName}
                                as="select"
                                name="supplierName"
                                onChange={this.changeHandler}
                              >
                                <option value="">
                                  Select existing supplier
                                </option>
                                {supplierList}
                              </Form.Control>

                              <Form.Control.Feedback type="invalid">
                                {errors.supplier}
                              </Form.Control.Feedback>
                            </Col>
                            <Col className="d-flex align-items-end">
                              <Button onClick={this.showNewSupplierModal}>
                                New Supplier
                              </Button>
                            </Col>
                          </Row>
                          <Row>
                            <Col sm="12 mb-2" md="4 mb-0">
                              <Form.Label>Date of Order</Form.Label>
                              <Form.Control
                                className={classnames({
                                  "is-invalid": errors.orderDate
                                })}
                                type="date"
                                placeholder="order Date"
                                name="orderDate"
                                onChange={this.changeHandler}
                              />

                              <Form.Control.Feedback type="invalid">
                                {errors.orderDate}
                              </Form.Control.Feedback>
                            </Col>

                            <Col xs="mb-2" sm="12" md="4 mb-0">
                              <Form.Label>Expected Delivery Date</Form.Label>
                              <Form.Control
                                className={classnames({
                                  "is-invalid": errors.expectedDate
                                })}
                                type="date"
                                placeholder="expected Delivary Date"
                                name="expectedDate"
                                onChange={this.changeHandler}
                              />
                              <Form.Control.Feedback type="invalid">
                                {errors.expectedDate}
                              </Form.Control.Feedback>
                            </Col>
                          </Row>
                        </Form.Group>
                        <hr />
                        <Row>
                          <Col>
                            <div>{productErrors}</div>

                            <Table striped bordered responsive>
                              <thead>
                                <tr>
                                  <th className="text-center">S.no</th>
                                  <th className="text-center">Product Name</th>
                                  <th className="text-center">Quantity</th>
                                  <th className="text-center">Rate</th>
                                  <th className="text-center">Discount</th>
                                  <th className="text-center">Amount</th>
                                </tr>
                              </thead>
                              <tbody>
                                {this.state.productDetails.map(
                                  (product, idx) => {
                                    let no = idx;
                                    return (
                                      <tr id={`product-${idx}`} key={idx}>
                                        <td>{++no}</td>
                                        <td>
                                          <Form.Control
                                            className={classnames({
                                              "is-invalid": errors.productName
                                            })}
                                            as="select"
                                            name="product"
                                            value={
                                              this.state.productDetails[idx]
                                                .product || ""
                                            }
                                            onChange={this.handleChange(idx)}
                                          >
                                            <option value="">
                                              Select a product
                                            </option>
                                            {productLists}
                                          </Form.Control>
                                        </td>
                                        <td>
                                          <Form.Control
                                            className={classnames({
                                              "is-invalid": errors.quantity
                                            })}
                                            value={
                                              this.state.productDetails[idx]
                                                .quantity || ""
                                            }
                                            min="0"
                                            type="number"
                                            name="quantity"
                                            placeholder="Quantity"
                                            onChange={this.handleChange(idx)}
                                          />
                                        </td>
                                        <td>
                                          <Form.Label
                                            type="text"
                                            id={`rate-${idx}`}
                                            name="rate"
                                            style={{
                                              border: "0",
                                              outline: "0",
                                              background: "transparent"
                                            }}
                                            className="form-control text-right"
                                          >
                                            {
                                              this.state.productDetails[idx]
                                                .rate
                                            }
                                          </Form.Label>
                                          <Form.Control.Feedback type="invalid">
                                            {errors.rate}
                                          </Form.Control.Feedback>
                                        </td>
                                        <td>
                                          <Form.Control
                                            className={classnames({
                                              "is-invalid": errors.quantity
                                            })}
                                            min="0"
                                            default="0"
                                            type="number"
                                            name="discount"
                                            placeholder="Discount"
                                            onChange={this.handleChange(idx)}
                                          />
                                        </td>
                                        <td>
                                          <Form.Label
                                            id={`amount-${idx}`}
                                            className="form-control"
                                            style={{
                                              border: "0",
                                              outline: "0",
                                              background: "transparent"
                                            }}
                                          >
                                            {" "}
                                          </Form.Label>
                                          {/* <Form.Label> {this.state.productDetails[idx].total}</Form.Label>   */}
                                        </td>
                                        <td>
                                          {idx > 0 ? (
                                            <Button
                                              style={{ borderRadius: "50%" }}
                                              variant="danger"
                                              onClick={this.handleRemoveSpecificRow(
                                                idx
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
                        <Row mb="5">
                          <Col sm="12 mb-2" md="6 mb-0">
                            <Row>
                              <Col sm="6 mb-2" md="3 mb-0">
                                <Button
                                  onClick={this.handleAddRow}
                                  className="btn btn-primary"
                                >
                                  Add Row
                                </Button>
                              </Col>
                              <Col sm="6 mb-2" md="4 mb-0">
                                <Button onClick={this.modalShow}>
                                  Add New Item
                                </Button>
                              </Col>
                            </Row>
                          </Col>
                          <Col sm="12 mb-2" md="6 mb-0">
                            <Row>
                              <Col md="6 mb-0">
                                <Form.Label>Sub Total</Form.Label>
                              </Col>
                              <Col md="6 mb-0">
                                <Form.Label
                                  id={`sub-Total`}
                                  className="form-control"
                                  style={{
                                    border: "0",
                                    outline: "0",
                                    background: "transparent"
                                  }}
                                />
                              </Col>
                            </Row>
                            <hr />
                            <Row>
                              <Col md="6 mb-0" sm="12 mb-2">
                                <Form.Label>Other Charge</Form.Label>
                              </Col>
                              <Col md="6 mb-0" sm="12 mb-2">
                                <Form.Control
                                  type="number"
                                  id="other-charge"
                                  onChange={this.calculateTotal}
                                  min="0"
                                />
                              </Col>
                            </Row>
                            <hr />
                            <hr />
                            <Row>
                              <Col md="6 mb-0" sm="12 mb-2">
                                <Form.Label>Total</Form.Label>
                              </Col>
                              <Col md="6 mb-0" sm="12 mb-2">
                                <Form.Label
                                  id="total"
                                  className="form-control"
                                  style={{
                                    border: "0",
                                    outline: "0",
                                    background: "transparent"
                                  }}
                                />
                              </Col>
                            </Row>
                            <Row>
                              <Col>
                                <hr />
                              </Col>
                            </Row>
                          </Col>
                        </Row>
                        <Form.Group>
                          <Row>
                            <Col xs="12 mb-2" sm="6" lg="auto">
                              <Button
                                id="save"
                                className="col"
                                variant="secondary"
                                onClick={this.order}
                              >
                                Save as Draft
                              </Button>
                            </Col>
                            <Col sm="6" lg="auto">
                              <Button
                                className="col"
                                id="issued"
                                variant="primary"
                                onClick={this.order}
                              >
                                Save and Send
                              </Button>
                            </Col>
                          </Row>
                        </Form.Group>
                      </Form>
                    </Card.Body>
                  </Card>{" "}
                </Col>
              </Row>
            </Container>
            <Modal
              show={this.state.showSupplier}
              onHide={this.showSupplierCloseModal}
              backdrop={true}
            >
              <Modal.Header closeButton>
                <Modal.Title style={{ fontSize: "18px" }}>
                  Add new Supplier
                </Modal.Title>
              </Modal.Header>
              <Modal.Body style={{ padding: "10" }}>
                <Form>
                  <Form.Group>
                    <Form.Label>Name</Form.Label>
                    <Row>
                      <Col sm="12 mb-2" md="4 mb-0">
                        <Form.Control
                          className={classnames({
                            "is-invalid": errors.firstname
                          })}
                          type="text"
                          placeholder="Firstname"
                          name="firstname"
                          onChange={this.changeHandler}
                        />

                        <Form.Control.Feedback type="invalid">
                          {errors.firstname}
                        </Form.Control.Feedback>
                      </Col>
                      <Col sm="12 mb-2" md="4 mb-0">
                        <Form.Control
                          className={classnames({
                            "is-invalid": errors.middlename
                          })}
                          type="text"
                          placeholder="Middlename"
                          name="middlename"
                          onChange={this.changeHandler}
                        />

                        <Form.Control.Feedback type="invalid">
                          {errors.middlename}
                        </Form.Control.Feedback>
                      </Col>
                      <Col xs="mb-2" sm="12" md="4 mb-0">
                        <Form.Control
                          className={classnames({
                            "is-invalid": errors.lastname
                          })}
                          type="text"
                          placeholder="Lastname"
                          name="lastname"
                          onChange={this.changeHandler}
                        />
                        <Form.Control.Feedback type="invalid">
                          {errors.lastname}
                        </Form.Control.Feedback>
                      </Col>
                    </Row>
                  </Form.Group>
                  <Form.Group>
                    <Row>
                      <Col sm="12">
                        <Form.Label>Email address</Form.Label>
                        <Form.Control
                          className={classnames({
                            "is-invalid": errors.email
                          })}
                          type="email"
                          placeholder="Email Address"
                          name="email"
                          onChange={this.changeHandler}
                        />
                        <Form.Control.Feedback type="invalid">
                          {errors.email}
                        </Form.Control.Feedback>
                      </Col>
                    </Row>
                  </Form.Group>
                  <Form.Group>
                    <Row>
                      <Col sm="12" md="6">
                        <Form.Label>Phone Number</Form.Label>
                        <Form.Control
                          className={classnames({
                            "is-invalid": errors.phone
                          })}
                          type="number"
                          onChange={this.changeHandler}
                          placeholder="01XXXXXXX"
                          name="phone"
                        />
                        <Form.Control.Feedback type="invalid">
                          {errors.phone}
                        </Form.Control.Feedback>
                      </Col>
                      <Col sm="12" md="6">
                        <Form.Label>Mobile Number</Form.Label>
                        <Form.Control
                          className={classnames({
                            "is-invalid": errors.mobile
                          })}
                          type="number"
                          onChange={this.changeHandler}
                          placeholder="98XXXXXXXX"
                          name="mobile"
                        />
                        <Form.Control.Feedback type="invalid">
                          {errors.mobile}
                        </Form.Control.Feedback>
                      </Col>
                    </Row>
                    <Row>
                      <Col sm="12" md="6">
                        <Form.Label>Address</Form.Label>
                        <Form.Control
                          className={classnames({
                            "is-invalid": errors.address
                          })}
                          type="text"
                          onChange={this.changeHandler}
                          placeholder="Current Address"
                          name="address"
                        />
                        <Form.Control.Feedback type="invalid">
                          {errors.address}
                        </Form.Control.Feedback>
                      </Col>{" "}
                      <Col sm="12" md="6">
                        <Form.Label>Country</Form.Label>
                        <Form.Control
                          className={classnames({
                            "is-invalid": errors.firstname
                          })}
                          as="select"
                          name="country"
                          onChange={this.changeHandler}
                        >
                          <option value="">Select your country</option>
                          {countriesList}
                        </Form.Control>
                        <Form.Control.Feedback type="invalid">
                          {errors.country}
                        </Form.Control.Feedback>
                      </Col>
                    </Row>
                  </Form.Group>{" "}
                  <Button
                    onClick={this.addNewSupplier}
                    variant="primary"
                    type="submit"
                  >
                    Save and Select
                  </Button>
                </Form>
              </Modal.Body>
            </Modal>
          </Container>
          <AddProductModal
            show={this.state.modalShow}
            close={this.modalClose}
            action={this.state.action}
            id={this.state.id}
          />
          <MessageModal
            show={this.state.show}
            close={this.messageModalClose}
            variant={this.state.alertVariant}
            message={this.state.message}
          />
        </>
      );
    }

    return <>{display}</>;
  }
}

export default withRouter(PurchaseOrder);
