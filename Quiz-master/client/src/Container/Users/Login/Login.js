import React, { Component } from "react";
import LoginValidation from "../../../Validator/LoginValidation";
import { connect } from "react-redux";
import { NavLink } from "react-router-dom";
import axios from "axios";
import Modal from "../../../UI/Modal/messageModal";

import {
  Form,
  Button,
  Container,
  Row,
  Col,
  Card,
} from "react-bootstrap";
import { login } from "../../../Action/loginAction";
import { logout } from "../../../Action/loginAction";
import { authlogout } from "../../../Action/authAction";
import { checkout } from "../../../Action/checkAction";
import { checkin } from "../../../Action/checkAction";
import { auth } from "../../../Action/authAction";
import setAuthToken from "../../../Utility/setauth";
import jwt_decode from "jwt-decode";
import classnames from "classnames";
import { withRouter } from "react-router-dom";
import logo from "../../../assets/img/logo.png";
import "./Login.css";
import getIp from "../../../Utility/getIp";
class Login extends Component {
  state = {
    ip: null,
    data: "",
    permission: "",
    errors: "",
    email: "",
    message: "",
    show: false,
    alertVariant: "danger"
  };
  async componentDidMount() {
    // if (this.props.loginData.login) {
    //   this.props.history.push("/dashboard");
    // }
    this.setState({ ip: await getIp() });

    if (localStorage.token) {
      setAuthToken(localStorage.token);
      const decode = jwt_decode(localStorage.token);
      if (decode.exp < Date.now() / 1000) {
        localStorage.removeItem("token");
        this.props.logout();
        this.props.authlogout();
        if (this.props.authData.user.role === 1) {
          this.props.checkout();
        }
        this.props.history.replace("/");
        return true;
      } else {
        this.props.auth(decode);
        this.props.login();
        if (this.props.loginData.login) {
          if (decode.role > 1) {
            this.props.history.push("/dashboard");
          } else if (decode.role === 1) {
            this.props.checkin();
            this.props.history.push("/userdashboard");
          }
        }
      }
    }
  }
  changeHandler = e => {
    this.setState({ [e.target.name]: e.target.value }, () => {
      console.log(this.state);
    });
  };
  login = async e => {
    e.preventDefault();
    this.setState({ email: e.target.email.value });
    const data = {
      email: e.target.email.value,
      password: e.target.password.value,
      ip: this.state.ip
    };
    const { errors, isValid } = LoginValidation(data);
    if (isValid) {
      await axios.post("/api/users/login", data).then(res => {
        if (res.data.type === "success") {
          localStorage.setItem("token", res.data.token);
          setAuthToken(res.data.token);
          const decode = jwt_decode(res.data.token);
          this.props.auth(decode);
          this.props.login();
          this.props.history.replace("/checkin");
        } else if (res.data.type === "error") {
          console.log("Error has occured", res);
          this.setState({ message: res.data.message }, () => {
            this.showAlerts();
          });
          this.props.history.replace("/");
        }
      });
    } else {
      this.setState({ errors });
    }
  };

  showAlerts = () => {
    this.setState({ show: true });
  };
  modalClose = () => {
    this.setState({ show: false });
  };
  render() {
    let { errors } = this.state;
    return (
      <>
        <Container fluid id="login">
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
                  <h5 className="ml-auto title-fixed">Login</h5>
                </div>
              </div>
              <Card style={{ border: "none" }}>
                <Card.Body className="login__form">
                  <Form onSubmit={this.login}>
                    <Row>
                      <Col>
                        <Form.Group>
                          <Form.Label>Email</Form.Label>
                          <Form.Control
                            size="md"
                            className={classnames({
                              "is-invalid": errors.email
                            })}
                            type="email"
                            placeholder="Email"
                            name="email"
                            onChange={this.changeHandler}
                          />
                          <Form.Control.Feedback type="invalid">
                            {errors.email}
                          </Form.Control.Feedback>
                        </Form.Group>
                      </Col>
                    </Row>
                    <Form.Group style={{ position: "relative" }}>
                      <label>Password</label>
                      <NavLink
                        style={{ position: "absolute", right: "0" }}
                        to={{ pathname: "/forgot", email: this.state.email }}
                        className="navbar-button"
                      >
                        Forgot Password?
                      </NavLink>
                      <Form.Control
                        size="md"
                        className={classnames({
                          "is-invalid": errors.password
                        })}
                        type="password"
                        placeholder="Password"
                        name="password"
                      />{" "}
                      <Form.Control.Feedback type="invalid">
                        {errors.password}
                      </Form.Control.Feedback>
                    </Form.Group>
                    <Row>
                      <Col>
                        <Button
                          className="col offset-md-9 col-md-3"
                          variant="primary"
                          type="submit"
                        >
                          Login
                        </Button>
                      </Col>
                    </Row>
                  </Form>
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
}

const mapActionToProps = dispatch => ({
  logout: () => dispatch(logout()),
  checkout: () => dispatch(checkout()),
  authlogout: () => dispatch(authlogout()),
  login: () => dispatch(login()),
  checkin: () => dispatch(checkin()),
  auth: payload => dispatch(auth(payload))
});

const mapStateToProps = state => ({
  loginData: state.login,
  authData: state.auth,
  checkData: state.check
});

export default connect(
  mapStateToProps,
  mapActionToProps
)(withRouter(Login));
