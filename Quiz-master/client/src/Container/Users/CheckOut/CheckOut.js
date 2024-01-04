import React, { Component } from "react";
import { connect } from "react-redux";
import { logout } from "../../../Action/loginAction";
import { authlogout } from "../../../Action/authAction";
import { checkout } from "../../../Action/checkAction";

import Axios from "axios";
import { withRouter } from "react-router-dom";
import moment from "moment";
import checkOutValidation from "../../../Validator/checkOutValidation";
import logo from "../../../assets/img/logo.png";
import classnames from "classnames";
import getIp from "../../../Utility/getIp";
import LogoutModal from "../../../UI/Modal/logoutModal";
import {
  Form,
  Button,
  Container,
  Row,
  Col,
  Card,
} from "react-bootstrap";
import Modal from "../../../UI/Modal/messageModal";
class CheckOut extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ip: null,
      isEarly: false,
      EarlyTime: "",
      checkOutTime: new Date(),
      alertVariant: "danger",
      message: "",
      show: false,
      showLogout: false,
      errors: "",
      reasonForEarly: "",
      todayCheckInTime: "",
      overtime: ""
    };
    this.fullTime = 30600;
  }

  componentDidMount = async () => {
    this.setState({ ip: await getIp() });

    let currentDate = new Date();
    let hours = currentDate.getHours();
    let minutes = currentDate.getMinutes();
    let seconds = currentDate.getSeconds();
    let format = "hh:mm:ss";
    let time = moment(`${hours}:${minutes}:${seconds}`, format);

    await Axios.get("/api/shift/checkout").then(res => {
      this.setState({ todayCheckInTime: res.data.todayCheckInTime });
      let subtractedTime = moment(res.data.checkOutTime)
        .add(-10, "m")
        .toDate();
      let checkOutTimeDate = res.data.checkOutTime.split(" ");
      //TODO consider removing afterTime
      // let afterTime = moment(checkOutTimeDate[1], format);
      if (time.isBefore(subtractedTime)) {
        this.setState({ isEarly: true });
        let hms = checkOutTimeDate[1]; // your input string
        let a = hms.split(":"); // split it at the colons
        // minutes are worth 60 seconds. Hours are worth 60 minutes.
        let checkInSeconds = +a[0] * 60 * 60 + +a[1] * 60 + +a[2];
        let currnetTime = `${hours}:${minutes}:${seconds}`;
        var ab = currnetTime.split(":"); // split it at the colons
        var CurrentTimeInSeconds = +ab[0] * 60 * 60 + +ab[1] * 60 + +ab[2];
        let Early = checkInSeconds - CurrentTimeInSeconds;
        let { hourformat, minuteformat, secondformat } = this.secondsToHms(
          Early
        );
        let Early_time = `${hourformat}:${minuteformat}:${secondformat}`;
        this.setState({ EarlyTime: Early_time });
      } else {
        this.setState({ reasonForEarly: "Not Early" });
      }
    });

    let { differnceInSecond } = this.overtime();
    if (differnceInSecond > this.fullTime) {
      let overtimeinsecond = differnceInSecond - 28800;
      let { hourformat, minuteformat, secondformat } = this.secondsToHms(
        overtimeinsecond
      );
      let Overtime = `${hourformat}:${minuteformat}:${secondformat}`;
      this.setState({ overtime: Overtime });
    }
  };

  overtime = () => {
    let checkout = new Date();
    let todayCheckInTimeSplit = this.state.todayCheckInTime.split(" ");

    let checkin = new Date(todayCheckInTimeSplit);

    let checkouthours = checkout.getHours();
    let checkoutMinutes = checkout.getMinutes();
    let checkoutSeconds = checkout.getSeconds();
    let checkinhours = checkin.getHours();
    let checkinMinutes = checkin.getMinutes();
    let checkinSeconds = checkin.getSeconds();

    let checkintimesecond =
      checkinhours * 60 * 60 + checkinMinutes * 60 + checkinSeconds;
    let checkouttimesecond =
      checkouthours * 60 * 60 + checkoutMinutes * 60 + checkoutSeconds;
    let differnceInSecond = checkouttimesecond - checkintimesecond;
    // let { hourformat, minuteformat, secondfor } = this.secondsToHms(differnceInSecond);
    // let difference_time = `${hourformat}:${minuteformat}:${secondfor}`;
    return { differnceInSecond };
  };

  checkOut = async e => {
    e.preventDefault();
    const data = {
      ip: this.state.ip,
      reasonForEarly: this.state.reasonForEarly,
      checkOutTime: this.state.checkOutTime,
      todayCheckInTime: this.state.todayCheckInTime
    };
    const { errors, isValid } = checkOutValidation(data);
    if (isValid) {
      await Axios.put("/api/shift/checkout", data)
        .then(res => {
          if (res.data.type === "success") {
            this.setState(
              { message: res.data.message, alertVariant: "success" },
              () => {
                this.showAlerts();
              }
            );
            this.props.checkout();
          } else if (res.data.type === "error") {
            this.setState(
              { message: res.data.message, alertVariant: "danger" },
              () => {
                this.showAlerts();
              }
            );
          } else {
            alert("Something is wrong");
          }
        })
        .catch(err => {
          // console.log(err);
        });
    } else {
      this.setState({ errors: errors });
    }
  };
  secondsToHms = d => {
    d = Number(d);
    let h = Math.floor(d / 3600);
    let m = Math.floor((d % 3600) / 60);
    let s = Math.floor((d % 3600) % 60);
    let hourformat = h > 0 ? h + (h == 1 ? " hour " : " hours ") : "";
    let minuteformat = m > 0 ? m + (m == 1 ? " minute " : " minutes ") : "";
    let secondformat = s > 0 ? s + (s == 1 ? " second" : " seconds") : "";
    return { hourformat, minuteformat, secondformat };
  };
  showAlerts = () => {
    this.setState({ show: true });
  };
  modalClose = () => {
  
  };
  modalCloseCheckout = () => {
    if (this.state.alertVariant === "success")
      this.setState({ show: false, showLogout: true });
    else this.setState({ show: false });
  };
  changeHandler = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  changeTime = () => {
    this.setState({
      checkOutTime: new Date()
    });
  };

  componentWillMount = async () => {
    setInterval(() => this.changeTime(), 1000);
  };

  render() {
    let { isEarly, overtime, errors } = this.state;
    return (
      <>
        <Container fluid>
          <Row style={{ height: "100vh" }}>
            <Col
              sm={8}
              md={6}
              lg={5}
              style={{ maxWidth: "500px" }}
              className="mx-auto my-auto"
            >
              <div className="login__title">
                <div className="d-flex align-items-center">
                  <div>
                    <img className="logo" src={logo} alt="logo" />
                  </div>
                  <h5 className="ml-auto title-fixed">Check out</h5>
                </div>
              </div>
              <Card style={{ borderTop: "none" }}>
                <Card.Header>
                  {this.state.checkOutTime.toLocaleTimeString()}
                </Card.Header>
                <Card.Body className="login__form">
                  <Card.Title>Please check out from the system</Card.Title>
                  <Form onSubmit={this.checkOut}>
                    <Row>
                      <Col>
                        <Form.Group>
                          {isEarly ? (
                            <>
                              <p>
                                You are Early by
                                <span style={{ color: "red" }}>
                                  {" "}
                                  {this.state.EarlyTime}{" "}
                                </span>
                              </p>
                              <Form.Label>Reason</Form.Label>
                              <Form.Control
                                // required
                                size="md"
                                className={classnames({
                                  "is-invalid": errors
                                })}
                                as="textarea"
                                rows="6"
                                resizeable={false}
                                placeholder="Please specify a reason for checking out early"
                                name="reasonForEarly"
                                onChange={this.changeHandler}
                              />
                              {/* <Form.Control.Feedback type="invalid">
                            {errors}
                          </Form.Control.Feedback> */}
                            </>
                          ) : (
                            ""
                          )}
                        </Form.Group>
                        <Form.Group>
                          {overtime && !isEarly ? (
                            <p>
                              You have done overtime for
                              <span style={{ color: "green" }}>
                                {" "}
                                {this.state.overtime}{" "}
                              </span>{" "}
                            </p>
                          ) : (
                            ""
                          )}
                        </Form.Group>
                      </Col>
                    </Row>
                    <Row>
                      <Col>
                        <Button
                          className="col offset-md-8 col-md-4"
                          letiant="primary"
                          type="submit"
                        >
                          Check Out
                        </Button>
                      </Col>
                    </Row>
                  </Form>
                </Card.Body>
              </Card>
            </Col>
          </Row>
          <LogoutModal
            show={this.state.showLogout}
            close={this.modalClose}
            ip={localStorage.ip}
          />
          <Modal
            show={this.state.show}
            close={this.modalCloseCheckout}
            variant={this.state.alertVariant}
            message={this.state.message}
          />
        </Container>
      </>
    );
  }
}

const mapActionToProps = dispatch => ({
  logout: () => dispatch(logout()),
  auth: () => dispatch(authlogout()),
  checkout: () => dispatch(checkout())
});

const mapStateToProps = state => ({
  Userdata: state.auth
});

export default connect(
  mapStateToProps,
  mapActionToProps
)(withRouter(CheckOut));
