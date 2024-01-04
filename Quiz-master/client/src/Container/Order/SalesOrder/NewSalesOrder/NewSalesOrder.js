import React from "react";
import { withRouter } from "react-router-dom";
import Spinner from "../../../../UI/Spinner/Spinner";
import checkPermission from "../../../../Utility/checkPermission";
import SLUGS from "../../../../config/SLUGS";
import classnames from "classnames";
import MessageModal from "../../../../UI/Modal/messageModal";
import {
  Row,
  Col,
  Form,
  Button,
  Container,
  Card,
  Table,
  FormLabel,
  Modal
} from "react-bootstrap";
import Navbar from "../../../../UI/Navbar/Navbar";
import Sidebar from "../../../../UI/Sidebar/Sidebar";
import axios from "axios";
import getIp from "../../../../Utility/getIp";
import Routes from "../../../../config/Routes";
import validateSalesOrder from "../../../../Validator/order/SalesOrder/SalesOrder";
import validateAddCustomer from "../../../../Validator/AddCustomer";
class NewSalesOrder extends React.Component {
  state = {
    show: false,
    ip: "",
    customerName: "",
    salesId: "",
    salesOrderDate: "",
    expectedShipmentDate: "",
    productDetails: [{}],
    loading: true,
    errors: "",
    alertVariant: "danger",
    productList: "",
    message: "",
    amount: "",
    countries: "",
    firstname: "",
    middlename: "",
    lastname: "",
    email: "",
    phone: "",
    mobile: "",
    country: "",
    address: "",
    customers: "",
    showMessage: ""
  };
  productAdded = {};
  showNewCustomerModal = () => {
    this.setState({ show: true });
  };
  modalClose = () => {
    this.setState({ show: false });
  };
  changeHandler = e => {
    this.setState({ errors: "" });
    this.setState({ [e.target.name]: e.target.value });
  };
  disabledOption = new Set();
  componentDidMount = async () => {
    let isAuthorized = await checkPermission(SLUGS.NEW_SALES_ORDER);
    if (!isAuthorized) {
      this.props.history.push(Routes.UNAUTHORIZED);
    }
    this.setState({ ip: await getIp() });
    await axios
      .get("/api/utility/add")
      .then(res => {
        this.setState({
          countries: res.data.countries
        });
      })
      .catch(err => {});
    await this.loadCustomers();
    await this.loadProducts();
  };
  loadCustomers = async () => {
    return await axios
      .get("/api/users/customers")
      .then(res => {
        this.setState({ customers: res.data.customers });
      })
      .catch(err => {});
  };
  loadProducts = async () => {
    return await axios
      .get("/api/salesorders")
      .then(res => {
        if (res.data.type === "error") {
          // alert("Couldn't load products");
        }
        this.setState({ productList: res.data, loading: false });
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
    if (value === "") return;
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
      }

      productDetails[idx] = {
        ...productDetails[idx],
        rate: this.state.productList[selectedIndex].rate,
        availableQuantity: this.state.productList[selectedIndex].quantity
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
      if (+stockAvailable < value) {
        this.setState({
          errors: {
            productDetails: [
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
      discount: 0
    };
    this.setState({
      productDetails: [...this.state.productDetails, item]
    });
  };

  handleRemoveSpecificRow = idx => () => {
    if (idx === 0) return;

    const productDetails = [...this.state.productDetails];
    delete this.productAdded[productDetails[idx].productName];
    productDetails.splice(idx, 1);
    this.setState({ productDetails });
  };
  handleSalesOrder = async e => {
    let salesStatus;
    if (e.target.id === "save") {
      salesStatus = "draft";
    } else {
      salesStatus = "confirmed";
    }
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
      salesOrderDate: this.state.salesOrderDate,
      expectedShipmentDate: this.state.expectedShipmentDate,
      productDetails: filledProductDetails,
      salesStatus,
      amount: this.state.amount
    };
    const { errors, isValid } = validateSalesOrder(data);
    if (isValid) {
      await this.setState({ errors: "" });
      axios
        .post(`/api/salesorders`, data)
        .then(res => {
          if (res.data.type === "success") {
            this.props.history.push(
              `${Routes.VIEW_SALES_ORDER}/${res.data.orderId}`
            );
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
          } else this.setState({ errors: "" });
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
          console.log(err.response.data);
          this.setState({ errors: err.response.data.errors });
          this.loadProducts();
        });
    } else {
      this.setState({ errors: errors });
    }
  };
  showMessage = () => {
    this.setState({ showMessage: true });
  };
  closeMessage = () => {
    this.setState({ showMessage: false });
  };
  showAlerts = () => {
    this.setState({ show: true });
  };
  addNewCustomer = async e => {
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
    const { errors, isValid } = validateAddCustomer(data);
    if (isValid) {
      await axios
        .post(`/api/users/customers`, data)
        .then(res => {
          if (res.data.type === "success") {
            //TODO CLOSE MODAL AFTER SUCCESS
            this.setState(
              {
                message: res.data.message,
                alertVariant: "success"
              },
              () => {
                this.showAlerts();
              }
            );
            this.loadCustomers();
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
              errors: err.response.data.errors,
              message: "Failed to add new customer.",
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
  render() {
    let display = <Spinner border="animation" />;
    let productLists = <Spinner border="animation" />;
    let { errors } = this.state;
    let productErrors = [];
    const countriesList = [];
    const customersList = [];
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
    if (!this.state.loading) {
      productLists = [];
      for (let product of this.state.productList) {
        productLists.push(
          <option value={product.name} key={product.name}>
            {product.name}
          </option>
        );
      }

      let countries = this.state.countries;

      for (let country of countries)
        countriesList.push(
          <option value={country.name} key={country.name}>
            {country.name}
          </option>
        );
      let customers = this.state.customers;
      for (let customer of customers)
        customersList.push(
          <option value={customer.customerName} key={customer.customerName}>
            {customer.customerName}--
            {customer.address}
          </option>
        );
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
                <Col className="p-0 m-0 p-md-3 m-md-2">
                  <div className="mt-2">
                    <h2>New Sales Order</h2>
                  </div>
                  <hr />
                  <Card>
                    <Card.Body>
                      <h5>New Sales Order</h5>
                      <p style={{ fontSize: ".9rem", color: "#ACACAC" }}>
                        Use this form to create new sales orders
                      </p>
                      <Form>
                        <Form.Group>
                          <Row>
                            <Col md="4">
                              <Form.Label>Customer's Name</Form.Label>
                              <Form.Control
                                className={classnames({
                                  "is-invalid": errors.customerName
                                })}
                                value={this.state.customerName}
                                as="select"
                                name="customerName"
                                onChange={this.changeHandler}
                              >
                                <option value="">
                                  Select existing customer
                                </option>
                                {customersList}
                              </Form.Control>

                              <Form.Control.Feedback type="invalid">
                                {errors.customerName}
                              </Form.Control.Feedback>
                            </Col>
                            <Col className="d-flex align-items-end">
                              <Button onClick={this.showNewCustomerModal}>
                                New Customer
                              </Button>
                            </Col>
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
                              <Form.Label>Expected Shipment Date</Form.Label>
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
                        <Form.Group>
                          <Row>
                            <Col>
                              <div>{productErrors}</div>
                              <Table striped bordered responsive>
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
                                              onChange={this.handleChange(
                                                index
                                              )}
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
                                              placeholder="Quantity"
                                              className="text-right"
                                              value={product.quantity || ""}
                                              onChange={this.handleChange(
                                                index
                                              )}
                                            />

                                            <span
                                              style={{ fontSize: ".8rem" }}
                                              className="text-danger text-right d-block"
                                              id={`stock-${index}`}
                                            >
                                              Uncommited stock
                                            </span>

                                            <Form.Control.Feedback type="invalid">
                                              {errors.quantity}
                                            </Form.Control.Feedback>
                                          </td>
                                          <td>
                                            <Form.Label
                                              type="text"
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
                                              placeholder="Discount"
                                              name="discount"
                                              className="text-right"
                                              value={product.discount || ""}
                                              onChange={this.handleChange(
                                                index
                                              )}
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
                                              0
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
                            <Col>
                              <Button
                                className="mt-2"
                                onClick={this.handleAddRow}
                                disabled={
                                  this.state.productDetails.length >
                                  this.state.productList.length - 1
                                }
                                className="btn btn-primary"
                              >
                                Add Product
                              </Button>
                            </Col>
                            <Col>
                              <Row>
                                <Col className="text-right">
                                  <FormLabel>Sub Total</FormLabel>
                                </Col>
                                <Col className="text-right">
                                  <FormLabel id="sub-total">0.00</FormLabel>
                                </Col>
                              </Row>
                              <hr />
                              <Row>
                                <Col className="text-right">
                                  <FormLabel>Other Charges</FormLabel>
                                </Col>
                                <Col className="text-right">
                                  <Form.Control
                                    default="0"
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
                                  <FormLabel
                                    className={classnames({
                                      "text-danger": errors.amount
                                    })}
                                  >
                                    Total
                                  </FormLabel>
                                </Col>
                                <Col className="text-right">
                                  <FormLabel
                                    className={classnames({
                                      "text-danger": errors.amount
                                    })}
                                    id="total"
                                  >
                                    0.00
                                  </FormLabel>
                                </Col>
                              </Row>
                            </Col>
                          </Row>
                        </Form.Group>
                        <Form.Group>
                          <Row>
                            <Col xs="12 mb-2" sm="6" lg="auto">
                              <Button
                                id="save"
                                className="col"
                                variant="secondary"
                                disabled={
                                  this.state.errors.productDetails &&
                                  this.state.errors.productDetails.length > 0
                                    ? true
                                    : false
                                }
                                onClick={this.handleSalesOrder}
                              >
                                Save as Draft
                              </Button>
                            </Col>
                            <Col sm="6" lg="auto">
                              <Button
                                className="col"
                                id="send"
                                variant="primary"
                                onClick={this.handleSalesOrder}
                              >
                                Save and Send
                              </Button>
                            </Col>
                          </Row>
                        </Form.Group>
                      </Form>
                    </Card.Body>
                  </Card>
                </Col>
              </Row>
            </Container>
            <Modal
              show={this.state.show}
              onHide={this.modalClose}
              backdrop={true}
            >
              <Modal.Header closeButton>
                <Modal.Title style={{ fontSize: "18px" }}>
                  Add new customer
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
                    onClick={this.addNewCustomer}
                    variant="primary"
                    type="submit"
                  >
                    Save and Select
                  </Button>
                </Form>
              </Modal.Body>
            </Modal>
            <MessageModal
              show={this.state.showMessage}
              close={this.closeMessage}
              variant={this.state.alertVariant}
              message={this.state.message}
            />
          </Container>
        </>
      );
    }

    return <>{display}</>;
  }
}

export default withRouter(NewSalesOrder);
