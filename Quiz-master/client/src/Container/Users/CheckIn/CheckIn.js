import React, { Component } from "react";
import Axios from "axios";
import { Form, Button, Container, Row, Col, Card } from "react-bootstrap";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import moment from "moment";
import checkInValidation from "../../../Validator/checkInValidation";
import Modal from "../../../UI/Modal/messageModal";
import logo from "../../../assets/img/logo.png";
import { checkin } from "../../../Action/checkAction";
import classnames from "classnames";
import getIp from "../../../Utility/getIp";

class CheckIn extends Component {
  state = {
    role: "",
    lateTime: "",
    reasonForLate: "",
    ip: "",
    message: "",
    show: false,
    errors: "",
    displayCheckInTime: new Date(),
    loading: true,
    alertVariant: ""
  };
  isLate = false;
  componentDidMount = async () => {
    this.setState({ ip: await getIp() });

    await Axios.get("/api/shift/checkCheckIn")
      .then(res => {
        if (res.data.check === "exist") {
          this.props.checkin();
          return this.props.history.replace("/userdashboard");
        }
      })
      .catch(err => {
        console.log(err);
      });

    if (this.props.authData.user.role !== 1) {
      return this.props.history.replace("/dashboard");
    }

    var currentDate = new Date();
    var hours = currentDate.getHours();
    var minutes = currentDate.getMinutes();
    var seconds = currentDate.getSeconds();

    var format = "hh:mm:ss";

    var time = moment(`${hours}:${minutes}:${seconds}`, format);
    await Axios.get("/api/shift/checkin")
      .then(res => {
        var addedTime = moment(res.data.checkInTime)
          .add(10, "m")
          .toDate();
        var checkInTimeDate = res.data.checkInTime.split(" ");
        // var afterTime = moment(checkInTimeDate[1], format);
        if (time.isAfter(addedTime)) {
          this.isLate = true;
          var hms = checkInTimeDate[1]; // your input string
          var a = hms.split(":"); // split it at the colons
          // minutes are worth 60 seconds. Hours are worth 60 minutes.
          var checkInSeconds = +a[0] * 60 * 60 + +a[1] * 60 + +a[2];

          var currnetTime = `${hours}:${minutes}:${seconds}`;
          var ab = currnetTime.split(":"); // split it at the colons
          var CurrentTimeInSeconds = +ab[0] * 60 * 60 + +ab[1] * 60 + +ab[2];

          var late = CurrentTimeInSeconds - checkInSeconds;
          this.secondsToHms(late);
        } else {
          this.setState({ reasonForLate: "Not Late" });
        }
      })
      .catch(err => false);
  };

  secondsToHms = d => {
    d = Number(d);
    var h = Math.floor(d / 3600);
    var m = Math.floor((d % 3600) / 60);
    var s = Math.floor((d % 3600) % 60);

    var hours = h > 0 ? h + (h === 1 ? " hour " : " hours ") : "";
    var minutes = m > 0 ? m + (m === 1 ? " minute " : " minutes ") : "";
    var seconds = s > 0 ? s + (s === 1 ? " second" : " seconds") : "";
    var late = `${hours}:${minutes}:${seconds}`;
    this.setState({ lateTime: late });
  };

  changeTime = () => {
    this.setState({
      displayCheckInTime: new Date()
    });
  };

  componentWillMount = () => {
    setInterval(() => this.changeTime(), 1000);
  };

  checkIn = async e => {
    e.preventDefault();

    const data = {
      ip: this.state.ip,
      reasonForLate: this.state.reasonForLate
    };
    const { errors, isValid } = checkInValidation(data);
    if (isValid) {
      await Axios.post("/api/shift/checkin", data)
        .then(res => {
          if (res.data.type === "success") {
            this.props.checkin();
            this.props.history.replace("/userdashboard");
          } else if (res.data.type === "error") {
            this.setState(
              { message: res.data.message, alertVariant: "danger" },
              () => {
                this.showAlerts();
              }
            );
          }
        })
        .catch(err => {
          // console.log(err);
        });
    } else {
      this.setState({ errors: errors });
    }
  };

  changeHandler = e => {
    this.setState({ [e.target.name]: e.target.value });
  };
  showAlerts = () => {
    this.setState({ show: true });
  };
  modalClose = () => {
    this.setState({ show: false });
  };

  render() {
    let isLate = this.isLate;
    let { errors } = this.state;
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
                    <img alt="logo" className="logo" src={logo} />
                  </div>
                  <h5 className="ml-auto title-fixed">Check In</h5>
                </div>
              </div>
              <Card style={{ borderTop: "none" }}>
                <Card.Header>
                  {this.state.displayCheckInTime.toLocaleTimeString()}
                </Card.Header>
                <Card.Body className="login__form">
                  <Card.Title>Please check in to access the system</Card.Title>
                  <Form onSubmit={this.checkIn}>
                    <Row>
                      <Col>
                        <Form.Group>
                          {isLate ? (
                            <>
                              <p>
                                You are Late by
                                <span style={{ color: "red" }}>
                                  {" "}
                                  {this.state.lateTime}{" "}
                                </span>
                              </p>
                              <Form.Label>Reason</Form.Label>
                              <Form.Control
                                size="md"
                                className={classnames({
                                  "is-invalid": errors
                                })}
                                as="textarea"
                                rows="6"
                                resizeable={false}
                                placeholder="Please enter your reason for being late"
                                name="reasonForLate"
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
                      </Col>
                    </Row>
                    <Row>
                      <Col>
                        <Button
                          className="col offset-md-9 col-md-3"
                          variant="primary"
                          type="submit"
                        >
                          Check In
                        </Button>
                      </Col>
                    </Row>
                  </Form>
                </Card.Body>
              </Card>
            </Col>
          </Row>
          <Modal
            show={this.state.show}
            close={this.modalClose}
            variant={this.state.alertVariant}
            message={this.state.message}
          />
        </Container>
      </>
    );
  }
}
const mapActionToProps = dispatch => ({
  checkin: () => dispatch(checkin())
});

const mapStateToProps = state => ({
  authData: state.auth,
  check: state.check
});

export default connect(
  mapStateToProps,
  mapActionToProps
)(withRouter(CheckIn));
