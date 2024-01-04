import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import Navbar from "../../../../UI/Navbar/Navbar";
import Sidebar from "../../../../UI/Sidebar/Sidebar";
import axios from "axios";
import getIp from "../../../../Utility/getIp";
import Modal from "../../../../UI/Modal/messageModal";
import Routes from "../../../../config/Routes";
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
  ButtonGroup,
  Spinner
} from "react-bootstrap";
import ReactHTMLTableToExcel from "react-html-table-to-excel";
import classNames from "classnames";

const STATUS = {
  DRAFT: "badge badge-secondary text-white",
  ISSUED: "badge badge-primary text-white",
  RECEIVED: "badge badge-success text-white"
};

class ProductPurchaseDetail extends Component {
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
  amounts = [];
  componentDidMount = async () => {
    this.setState({ ip: await getIp() });
    await this.loadOrderDetails(this.props.match.params.id);
  };
  loadOrderDetails = async id => {
    return await axios
      .get(`/api/purchase/purchaseorder/${id}`)
      .then(res => {
        if (res.data.type === "error") {
          this.props.history.push(Routes.MANAGE_PURCHASE_ORDER);
        }
        let orderDetails = res.data.orderDetails;

        console.log("consele . orderStatus", orderDetails[0]);
        this.setState({
          amount: orderDetails[0].amount,
          supplierName: orderDetails[0].supplierName,
          purchaseOrderDate: orderDetails[0].purchaseOrderDate.split(" ")[0],
          orderStatus: orderDetails[0].orderStatus,
          expectedDeliveryDate: orderDetails[0].expectedDeliveryDate.split(
            " "
          )[0],
          productDetails: res.data.productDetails,
          loading: false
        });
      })
      .catch(err => {
        console.log("error in loadOrderDetails Method");
      });
  };

  confirmOrder = async () =>{
    let { ip } = this.state;
    await axios.put(`/api/purchase/confirm-order/${this.props.match.params.id}`,{ip})
    .then(res => {
      console.log(res.data);
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
          `${Routes.MANAGE_PURCHASE_ORDER}`
        );
      }
    })
    .catch(err => console.log(err));
  }

  UpdatedQuantity = async () => {
    this.props.history.push(
      `${Routes.UPDATE_PURCHASE_QUANTITY}/${this.props.match.params.id}`
    );
  };
  editDraft = async () => {
    this.props.history.push(
      `${Routes.EDIT_PURCHASE_DRAFT}/${this.props.match.params.id}`
    );
  };

  saveDraft = async () => {
    console.log("Save ORDER");
    let { ip } = this.state;
    await axios
      .put(`/api/purchase/confirm/${this.props.match.params.id}`, { ip })
      .then(res => {
        console.log(res.data);
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

  receivedOrder = async () => {
    console.log("received order");
    await axios
      .put(`/api/purchase/received/${this.props.match.params.id}`)
      .then(res => {
        if (res.data.type === "success") {
          this.setState(
            { message: res.data.message, alertVariant: "success" },
            () => {
              this.showAlerts();
            }
          );

          this.props.history.push(Routes.MANAGE_PURCHASE_ORDER);
        } else {
          this.setState(
            { message: res.data.message, alertVariant: "danger" },
            () => {
              this.showAlerts();
            }
          );
        }
      })
      .catch(err => {
        console.log("error in receiving the order");
      });
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
  amounts = [];

  render() {
    let productErrors = [];
    let productLists = <Spinner border="animation" />;
    let { errors } = this.state;

    let display = <Spinner border="animation" />;
    let purchaseOptions = "";
    if (!this.state.loading) {
      switch (this.state.orderStatus) {
        case "draft":
          purchaseOptions = (
            <Row className="d-flex justify-content-center">
              <Col xs="12 mb-2" sm="6" md="3 mb-0" lg="2">
                <ReactHTMLTableToExcel
                  id="test-table-xls-button"
                  className="col btn btn-primary"
                  table="table-to-xls"
                  filename={`purchaseorder-${this.props.match.params.id}`}
                  sheet="tablexls"
                  buttonText="Export to Excel"
                />
              </Col>
              <Col xs="12 mb-2" sm="6" md="3 mb-0" lg="2">
                <Button
                  onClick={this.confirmOrder}
                  // variant="info"
                  //TODO : WHERE IS THIS FUNCTION
                  variant="secondary"
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
        case "issued":
          purchaseOptions = (
            <Row className="d-flex justify-content-center">
              <Col xs="12 mb-2" sm="6" md="3 mb-0" lg="2">
                <ReactHTMLTableToExcel
                  id="test-table-xls-button"
                  className="col btn btn-primary"
                  table="table-to-xls"
                  filename={`purchase_order-${this.props.match.params.id}`}
                  sheet="tablexls"
                  buttonText="Export to Excel"
                />
              </Col>
              <Col xs="12 mb-2" sm="6" md="3 mb-0" lg="2">
                <Button
                  onClick={this.UpdatedQuantity}
                  variant="secondary"
                  className="col"
                >
                  Update Delivery
                </Button>
              </Col>
              <Col xs="12 mb-2" sm="6" md="3 mb-0" lg="2">
                {/* <Button
                  onClick={this.fulfillOrder}
                  variant="success"
                  className="col"
                >
                  Fulfill Order
                </Button> */}
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
          purchaseOptions = (
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
        // case "received":
        //   purchaseOptions = (
        //     <Row className="d-flex">
        //       <Col xs="12 mb-2" sm="6" md="3 mb-0" lg="2">
        //         <ReactHTMLTableToExcel
        //           id="test-table-xls-button"
        //           className="col btn btn-primary"
        //           table="table-to-xls"
        //           filename={`salesorder-${this.props.match.params.id}`}
        //           sheet="tablexls"
        //           buttonText="Export to Excel"
        //         />
        //       </Col>
        //       <Col xs="12 mb-2" sm="6" md="3 mb-0" lg="2">
        //         <Button
        //           onClick={this.fulfillOrder}
        //           variant="success"
        //           className="col"
        //         >
        //           Fulfill Order
        //         </Button>
        //       </Col>
        //     </Row>
        //   );
        //   break;
        // case "cancelled":
        //   purchaseOptions = (
        //     <Row className="d-flex">
        //       <Col xs="12 mb-2" sm="6" md="3 mb-0" lg="2">
        //         <ReactHTMLTableToExcel
        //           id="test-table-xls-button"
        //           className="col btn btn-primary"
        //           table="table-to-xls"
        //           filename={`salesorder-${this.props.match.params.id}`}
        //           sheet="tablexls"
        //           buttonText="Export to Excel"
        //         />
        //       </Col>
        //     </Row>
        //   );
        //   break;
        default:
          purchaseOptions = "";
      }
      productLists = [];
      let i = 0;
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
                  <h2>Purchase Order Id :: PO-{this.props.match.params.id}</h2>
                </div>
                <hr />
                <Card>
                  <Card.Body>
                    <Row>
                      <Col md="6">
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
                            <Row>
                              <Col>
                                <p style={{ fontSize: "1.5rem" }}>
                                  Purchase ORDER
                                </p>
                              </Col>
                            </Row>
                            <Row>
                              <Col>
                                <label style={{ fontSize: ".9rem" }}>
                                  Purchase Order #{" "}
                                  <b>PO-{this.props.match.params.id}</b>
                                </label>
                              </Col>
                              <Col>
                                <label
                                  classNames={
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
                                <label>{this.state.purchaseOrderDate}</label>
                              </Col>
                            </Row>
                            <Row>
                              <Col>
                                <label>EXPECTED DELIVERY DATE</label>
                              </Col>
                              <Col>
                                <label>{this.state.expectedDeliveryDate}</label>
                              </Col>
                            </Row>
                          </Col>
                        </Row>
                      </Col>
                    </Row>
                    <Row>
                      <Col>
                        <div>error</div>
                        <Table id="table-to-xls" striped bordered responsive>
                          <thead>
                            <tr>
                              <th className="text-right">S.No.</th>
                              <th className="text-right">Product Name</th>
                              <th className="text-right">Quantity</th>
                              <th className="text-right">Rate</th>
                              <th className="text-right">Discount</th>
                              <th className="text-right">Amount</th>
                            </tr>
                          </thead>
                          <tbody>
                            {this.state.productDetails.map((product, index) => {
                              let no = index;
                              let amount =
                                product.rate * product.quantity -
                                product.discount;
                              this.amounts.push(amount);
                              return (
                                <tr id={`product-${index}`} key={index}>
                                  <td align="center">{++no}</td>
                                  <td align="center">{product.productName}</td>
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
                                          Received
                                        </td>{" "}
                                        <td
                                          className="text-right"
                                          style={{
                                            fontSize: "1.1rem",
                                            fontWeight: "bold"
                                          }}
                                        >
                                          {product.receivedQuantity}
                                        </td>
                                      </tr>
                                    </Table>
                                  </td>

                                  {/* <td align="center">{product.quantity}</td> */}
                                  <td align="center">{product.rate}</td>
                                  <td align="center">{product.discount}</td>
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
    return <div>{display}</div>;
  }
}
export default withRouter(ProductPurchaseDetail);
