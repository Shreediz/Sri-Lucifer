import React from "react";
import { withRouter } from "react-router-dom";
import Spinner from "../../../../UI/Spinner/Spinner";
import checkPermission from "../../../../Utility/checkPermission";
import SLUGS from "../../../../config/SLUGS";
import classnames from "classnames";
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
import Routes from "../../../../config/Routes";
import Modal from "../../../../UI/Modal/messageModal";
import validatePartialDelivery from "../../../../Validator/order/PartialReceived/validatePartialReceived";
const STATUS = {
  DRAFT: "badge badge-secondary text-white",
  ISSUED: "badge badge-primary text-white",
  RECEIVED: "badge badge-success text-white",
  CANCELLED: "badge badge-danger text-white",
  FULFILLED: "badge badge-success text-white"
};
class PartialRecived extends React.Component {
  state = {
    show: false,
    ip: "",
    supplierName: "",
    purchaseOrderDate: "",
    orderStatus: "",
    expectedDeliveryDate: "",
    productDetails: [{}],
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
    // let isAuthorized = await checkPermission(SLUGS.MANAGE_SALES_ORDER);
    // if (!isAuthorized) {
    //   this.props.history.push(Routes.UNAUTHORIZED);
    // }
    this.setState({ ip: await getIp() });
    await this.loadOrderDetails(this.props.match.params.id);
  };
  loadOrderDetails = async id => {
    await axios
      .get(`/api/purchase/purchaseorder/${id}`)
      .then(res => {
        console.log("res", res.data.orderDetails, res.data.productDetails);
        if (res.data.type === "error") {
          this.props.history.push("/managepurchaseorder");
        }
        let orderDetails = res.data.orderDetails;
        let productDetails = res.data.productDetails;
        for (let i = 0; i < productDetails.length; i++) {
          productDetails[i] = { ...productDetails[i], newQuantity: 0 };
        }
        this.setState({
          amount: orderDetails[0].amount,
          supplierName: orderDetails[0].supplierName,
          purchaseOrderDate: orderDetails[0].purchaseOrderDate.split(" ")[0],
          orderStatus: orderDetails[0].orderStatus,
          expectedDeliveryDate: orderDetails[0].expectedDeliveryDate.split(
            " "
          )[0],
          productDetails,
          loading: false
        });
      })
      .catch(err => console.log("error", err));
    console.log("After update", this.state);
  };

  handleChange = idx => e => {
    let { name, value } = e.target;

    let productDetails = [...this.state.productDetails];

    let totalProductToBeReceived =
      +productDetails[idx].receivedQuantity + +value;

    if (totalProductToBeReceived > productDetails[idx].quantity) {
      document.querySelector(`#product-${idx}`).style.outline =
        "2px solid #ff0000";

      this.setState(
        {
          message: `Received quantity exceeds ordered quantity for "${productDetails[idx].productName}"`,
          alertVariant: "danger",
          errors: ""
        },
        () => {
          this.showAlerts();
        }
      );
      setTimeout(() => {
        document.querySelector(`#product-${idx}`).style.outline = "";
      }, 1200);
      return;
    }
    productDetails[idx].newQuantity = +value;
    this.setState({
      ...this.state,
      productDetails,
      errors: {}
    });
  };
  fulfillOrder = async () => {
    await axios
      .put(`/api/purchase/fulfilled/${this.props.match.params.id}`, {
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
        // this.setTimeout(() => {
        //   this.props.history.push("/salesorders");
        // }, 1000);
      })
      .catch(err => console.log(err));
  };
  handlePartialDelivery = async () => {
    let data = { ip: this.state.ip, productDetails: this.state.productDetails };
    const { errors, isValid } = validatePartialDelivery(data);
    if (isValid) {
      this.setState({ errors: "" });
      axios
        .put(`/api/purchase/delivery/${this.props.match.params.id}`, data)
        .then(async res => {
          if (res.data.type === "success") {
            this.setState(
              { message: res.data.message, alertVariant: "success" },
              () => {
                this.showAlerts();
              }
            );
            await this.loadOrderDetails(this.props.match.params.id);
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
          } else this.setState({ errors: "" });
        })
        .catch(err => {
          this.setState(
            {
              message: "Failed to update delivered quantity.",
              alertVariant: "danger"
            },
            () => {
              this.showAlerts();
            }
          );
          this.setState({ errors: err.response.data.errors });
        });
    } else {
      this.setState({ errors: errors });
    }
  };
  render() {
    let display = <Spinner border="animation" />;

    let { errors } = this.state;
    let productErrors = [];
    if (errors.productReceived) {
      for (let problem of errors.productReceived) {
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
                  <h2>Purchase Order Id:: SO-{this.props.match.params.id}</h2>
                </div>
                <hr />
                <Card>
                  <Card.Body>
                    <Row>
                      <Col md="6">
                        <h5>Purchase order details</h5>
                        <p style={{ fontSize: ".9rem", color: "#ACACAC" }}>
                          Manage Purchase order from this page
                        </p>
                      </Col>
                    </Row>
                    <hr />
                    <Row>
                      <Col>
                        <Row>
                          <Col md="6">
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
                        <div>{productErrors}</div>
                        <Table striped bordered responsive>
                          <thead>
                            <tr>
                              <th>S.No.</th>
                              <th>Product Name</th>
                              <th className="text-right">Ordered Quantity</th>
                              <th className="text-right">Recivied Quantity</th>
                              <th className="text-right">New Received</th>
                            </tr>
                          </thead>
                          <tbody>
                            {this.state.productDetails.map((product, index) => {
                              let no = index;
                              return (
                                <tr id={`product-${index}`} key={index}>
                                  <td>{++no}</td>
                                  <td>{product.productName}</td>
                                  <td className="text-right">
                                    {product.quantity}
                                  </td>
                                  <td className="text-right">
                                    {product.receivedQuantity === null
                                      ? "0"
                                      : product.receivedQuantity}
                                  </td>
                                  <td className="text-right">
                                    {+product.quantity ===
                                    +product.receivedQuantity ? (
                                      ""
                                    ) : (
                                      <Form.Control
                                        id={`newQuantity-${index}`}
                                        min="0"
                                        type="number"
                                        className="text-right"
                                        name="newQuantity"
                                        value={
                                          this.state.productDetails[index]
                                            .newQuantity || ""
                                        }
                                        onChange={this.handleChange(index)}
                                      />
                                    )}
                                  </td>
                                </tr>
                              );
                            })}
                          </tbody>
                        </Table>
                        <Row>
                          <Col>
                            <Button
                              variant="primary"
                              onClick={this.handlePartialDelivery}
                            >
                              Update Received
                            </Button>
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
export default withRouter(PartialRecived);
