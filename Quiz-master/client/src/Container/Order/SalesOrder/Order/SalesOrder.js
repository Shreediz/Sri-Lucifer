import React from "react";
import { withRouter } from "react-router-dom";
import Spinner from "../../../../UI/Spinner/Spinner";
import checkPermission from "../../../../Utility/checkPermission";
import SLUGS from "../../../../config/SLUGS";
import ReactHTMLTableToExcel from "react-html-table-to-excel";
import {
  Row,
  Col,
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
import STATUS from "../SalesStatusUtility";

class SalesOrder extends React.Component {
  state = {
    show: false,
    ip: "",
    customerName: "",
    salesOrderDate: "",
    orderStatus: "",
    expectedShipmentDate: "",
    productDetails: [{}],
    loading: true,
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
  amounts = [0];
  componentDidMount = async () => {
    // let isAuthorized = await checkPermission(SLUGS.MANAGE_SALES_ORDER);
    // if (!isAuthorized) {
    //   this.props.history.push(Routes.UNAUTHORIZED);
    // }
    this.setState({ ip: await getIp() });
    await this.loadOrderDetails(this.props.match.params.id);
  };
  loadOrderDetails = async () => {
    return await axios
      .get(`/api/salesorders/${this.props.match.params.id}`)
      .then(res => {
        if (res.data.type === "error") {
          alert("Error");
          this.props.history.push(Routes.MANAGE_SALES_ORDER);
        }
        let orderDetails = res.data.orderDetails;
        this.setState({
          amount: orderDetails.amount,
          customerName: orderDetails.customerName,
          salesOrderDate: orderDetails.orderDate.split(" ")[0],
          orderStatus: orderDetails.orderStatus,
          expectedShipmentDate: orderDetails.expectedShipmentDate.split(" ")[0],
          productDetails: res.data.productDetails,
          loading: false
        });
      })
      .catch(err => console.log(err));
  };
  editDraft = async () => {
    this.props.history.push(
      `${Routes.EDIT_SALES_DRAFT}/${this.props.match.params.id}`
    );
  };
  confirmOrder = async () => {
    await axios
      .put(`/api/salesorders/confirm/${this.props.match.params.id}`, {
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
              alertVariant: "success"
            },
            () => {
              this.showAlerts();
              this.loadOrderDetails();
            }
          );
          this.props.history.push(
            `${Routes.VIEW_SALES_ORDER}/${this.props.match.params.id}`
          );
        }
      })
      .catch(err => console.log(err));
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
              alertVariant: "success"
            },
            () => {
              this.showAlerts();
              setTimeout(() => {
                this.props.history.push(Routes.MANAGE_SALES_ORDER);
              }, 1200);
            }
          );
        }
      })
      .catch(err => console.log(err));
  };
  cancelOrder = async () => {
    //TODO: Partial cancel allowed or not
    await axios
      .put(`/api/salesorders/cancel/${this.props.match.params.id}`, {
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
              alertVariant: "success"
            },
            () => {
              this.showAlerts();
              this.loadOrderDetails();
            }
          );
        }
        this.setTimeout(() => {
          this.props.history.push(Routes.MANAGE_SALES_ORDER);
        }, 1000);
      })
      .catch(err => console.log(err));
  };
  fulfillOrder = async () => {
    await axios
      .put(`/api/salesorders/fulfilled/${this.props.match.params.id}`, {
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
          alert("error");
          this.setState(
            {
              message: res.data.message,
              alertVariant: "success"
            },
            () => {
              this.showAlerts();
              this.loadOrderDetails();
            }
          );
        }
      })
      .catch(err => console.log(err));
  };
  updateDelivery = async () => {
    this.props.history.push(
      `${Routes.UPDATES_SALES_DELIVERY}/${this.props.match.params.id}`
    );
  };
  render() {
    let display = <Spinner border="animation" />;
    let salesOptions = "";
    if (!this.state.loading) {
      switch (this.state.orderStatus) {
        case "draft":
          salesOptions = (
            <Row className="d-flex justify-content-center">
              <Col xs="12 mb-2" sm="6" md="3 mb-0" lg="2">
                <ReactHTMLTableToExcel
                  id="test-table-xls-button"
                  className="col btn btn-primary"
                  table="table-to-xls"
                  filename={`salesorder-${this.props.match.params.id}`}
                  sheet="tablexls"
                  buttonText="Export to Excel"
                />
              </Col>
              <Col xs="12 mb-2" sm="6" md="3 mb-0" lg="2">
                <Button
                  onClick={this.confirmOrder}
                  variant="info"
                  className="col"
                >
                  Confirm Order
                </Button>
              </Col>
              <Col xs="12 mb-2" sm="6" md="3 mb-0" lg="2">
                <Button
                  onClick={this.editDraft}
                  variant="warning"
                  className="col"
                >
                  Edit Draft
                </Button>
              </Col>
              <Col xs="12" sm="6" md="3" lg="2">
                <Button
                  variant="danger"
                  className="col"
                  onClick={this.deleteDraft}
                >
                  Delete Draft
                </Button>
              </Col>
            </Row>
          );
          break;
        case "confirmed":
          salesOptions = (
            <Row className="d-flex justify-content-center">
              <Col xs="12 mb-2" sm="6" md="3 mb-0" lg="2">
                <ReactHTMLTableToExcel
                  id="test-table-xls-button"
                  className="col btn btn-primary"
                  table="table-to-xls"
                  filename={`salesorder-${this.props.match.params.id}`}
                  sheet="tablexls"
                  buttonText="Export to Excel"
                />
              </Col>
              <Col xs="12 mb-2" sm="6" md="3 mb-0" lg="2">
                <Button
                  onClick={this.updateDelivery}
                  variant="info"
                  className="col"
                >
                  Update Delivery
                </Button>
              </Col>
              <Col xs="12 mb-2" sm="6" md="3 mb-0" lg="2">
                <Button
                  onClick={this.fulfillOrder}
                  variant="success"
                  className="col"
                >
                  Fulfill Order
                </Button>
              </Col>
              <Col xs="12 mb-2" sm="6" md="3 mb-0" lg="2">
                {this.state.orderStatus === "confirmed" ? (
                  <Button
                    onClick={this.cancelOrder}
                    variant="danger"
                    className="col"
                  >
                    Cancel Order
                  </Button>
                ) : (
                  ""
                )}
              </Col>
            </Row>
          );
          break;
        case "fulfilled":
          salesOptions = (
            <Row className="d-flex">
              <Col xs="12 mb-2" sm="6" md="3 mb-0" lg="2">
                <ReactHTMLTableToExcel
                  id="test-table-xls-button"
                  className="col btn btn-primary"
                  table="table-to-xls"
                  filename={`salesorder-${this.props.match.params.id}`}
                  sheet="tablexls"
                  buttonText="Export to Excel"
                />
              </Col>
            </Row>
          );
          break;
        case "delivered":
          salesOptions = (
            <Row className="d-flex">
              <Col xs="12 mb-2" sm="6" md="3 mb-0" lg="2">
                <ReactHTMLTableToExcel
                  id="test-table-xls-button"
                  className="col btn btn-primary"
                  table="table-to-xls"
                  filename={`salesorder-${this.props.match.params.id}`}
                  sheet="tablexls"
                  buttonText="Export to Excel"
                />
              </Col>
              <Col xs="12 mb-2" sm="6" md="3 mb-0" lg="2">
                <Button
                  onClick={this.fulfillOrder}
                  variant="success"
                  className="col"
                >
                  Fulfill Order
                </Button>
              </Col>
            </Row>
          );
          break;
        case "cancelled":
          salesOptions = (
            <Row className="d-flex">
              <Col xs="12 mb-2" sm="6" md="3 mb-0" lg="2">
                <ReactHTMLTableToExcel
                  id="test-table-xls-button"
                  className="col btn btn-primary"
                  table="table-to-xls"
                  filename={`salesorder-${this.props.match.params.id}`}
                  sheet="tablexls"
                  buttonText="Export to Excel"
                />
              </Col>
            </Row>
          );
          break;
        default:
          salesOptions = "";
      }
      this.amounts = [];

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
                  <h2>Sales Order Id:: SO-{this.props.match.params.id}</h2>
                </div>
                <hr />
                <Card>
                  <Card.Body>
                    <Row>
                      <Col md="6">
                        <h5>Sales order details</h5>
                        <p style={{ fontSize: ".9rem", color: "#ACACAC" }}>
                          Manage sales order from this page
                        </p>
                      </Col>
                    </Row>
                    <hr />
                    {salesOptions}
                    <hr />
                    <Row>
                      <Col>
                        <Row>
                          <Col md="6">
                            <Row>
                              <Col>
                                <p style={{ fontSize: "1.5rem" }}>
                                  SALES ORDER
                                </p>
                              </Col>
                            </Row>
                            <Row>
                              <Col>
                                <label style={{ fontSize: ".9rem" }}>
                                  Sales Order #{" "}
                                  <b>SO-{this.props.match.params.id}</b>
                                </label>
                              </Col>
                              <Col>
                                <label
                                  className={
                                    STATUS[this.state.orderStatus.toUpperCase()]
                                  }
                                  style={{ fontSize: ".9rem" }}
                                >
                                  {this.state.orderStatus.toUpperCase()}
                                </label>
                              </Col>
                            </Row>
                            <Row>
                              <Col>
                                <label>ORDER DATE</label>
                              </Col>
                              <Col>
                                <label>{this.state.salesOrderDate}</label>
                              </Col>
                            </Row>
                            <Row>
                              <Col>
                                <label>EXPECTED SHIPMENT DATE</label>
                              </Col>
                              <Col>
                                <label>{this.state.expectedShipmentDate}</label>
                              </Col>
                            </Row>
                          </Col>
                        </Row>
                      </Col>
                    </Row>
                    <Row>
                      <Col>
                        <Table id="table-to-xls" striped bordered responsive>
                          <thead>
                            <tr>
                              <th>S.No.</th>
                              <th>Product Name</th>
                              <th>Quantity</th>
                              <th className="text-right">Rate</th>
                              <th className="text-right">Discount</th>
                              <th className="text-right">Amount</th>
                            </tr>
                          </thead>
                          <tbody>
                            {this.state.productDetails.map((product, index) => {
                              let no = index;
                              let amount =
                                +product.rate * +product.quantity -
                                +product.discount;
                              this.amounts.push(amount);

                              return (
                                <tr id={`product-${index}`} key={index}>
                                  <td>{++no}</td>
                                  <td>{product.productName}</td>
                                  <td className="p-0 m-0">
                                    <Table
                                      striped
                                      responsive
                                      className="p-0 m-0"
                                    >
                                      <tr>
                                        <td className="bg-primary text-white p-2">
                                          Ordered
                                        </td>{" "}
                                        <td
                                          className="text-right"
                                          style={{
                                            fontSize: "1.1rem",
                                            fontWeight: "bold"
                                          }}
                                        >
                                          {product.quantity}
                                        </td>
                                      </tr>
                                      <tr>
                                        <td className="bg-secondary text-white p-2">
                                          Delivered
                                        </td>{" "}
                                        <td
                                          className="text-right"
                                          style={{
                                            fontSize: "1.1rem",
                                            fontWeight: "bold"
                                          }}
                                        >
                                          {product.deliveredQuantity}
                                        </td>
                                      </tr>
                                    </Table>
                                  </td>
                                  <td className="text-right">{product.rate}</td>
                                  <td className="text-right">
                                    {product.discount}
                                  </td>
                                  <td className="text-right">
                                    {this.amounts[index]}
                                  </td>
                                </tr>
                              );
                            })}
                          </tbody>
                        </Table>
                        <Row>
                          <Col className="offset-sm-6">
                            <Row>
                              <Col className="text-right">
                                <FormLabel>Sub Total</FormLabel>
                              </Col>
                              <Col className="text-right">
                                <FormLabel id="sub-total">
                                  {this.amounts.reduce((total, value) => {
                                    return (total += value);
                                  })}
                                </FormLabel>
                              </Col>
                            </Row>
                            <hr />
                            <Row>
                              <Col className="text-right">
                                <FormLabel>Other Charges</FormLabel>
                              </Col>
                              <Col className="text-right">
                                <FormLabel>
                                  {this.state.amount -
                                    this.amounts.reduce((total, value) => {
                                      return (total += value);
                                    })}
                                </FormLabel>
                              </Col>
                            </Row>
                            <hr />
                            <hr />
                            <Row>
                              <Col className="text-right">
                                <FormLabel>Total</FormLabel>
                              </Col>
                              <Col className="text-right">
                                <FormLabel>Rs. {this.state.amount}</FormLabel>
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
    }
    return <>{display}</>;
  }
}
export default withRouter(SalesOrder);
