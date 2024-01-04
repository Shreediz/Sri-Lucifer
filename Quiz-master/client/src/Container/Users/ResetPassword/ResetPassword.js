import React, { Component } from "react";
import Axios from "axios";
import { Form, Button, Container, Row, Col, Card } from "react-bootstrap";
import ResetPasswordValidation from "../../../Validator/resetPassword";
import classnames from "classnames";
import logo from "../../../assets/img/logo.png";
import "./ResetPassword.css";
import getIp from "../../../Utility/getIp";
import Modal from "../../../UI/Modal/messageModal";

export default class ResetPassword extends Component {
  state = {
    change: false,
    isVerified: false,
    message: "",
    email: "",
    errors: "",
    ip: null,
    show: false,
    newPassword: "",
    confirmPassword: ""
  };
  changeHandler = e => {
    this.setState({ [e.target.name]: e.target.value, errors: "" });
  };
  async componentDidMount() {
    let token = this.props.match.params.id;
    await Axios.get(`/api/users/reset/${token}/`)
      .then(res => {
        alert(res.data.isVerified);
        this.setState({
          isVerified: res.data.isVerified,
          email: res.data.email
        });
      })
      .catch(err => {});
    this.setState({ ip: await getIp() });
  }

  reset = async e => {
    e.preventDefault();
    const data = {
      newPassword: this.state.newPassword,
      confirmPassword: this.state.confirmPassword,
      email: this.state.email,
      ip: this.state.ip
    };
    const { errors, isValid } = ResetPasswordValidation(data);

    if (isValid) {
      await Axios.put(`/api/users/reset`, data)
        .then(res => {
          if (res.data.errors) {
            this.setState({
              errors: { newPassword: res.data.errors.newPassword }
            });
          } else if (res.data.type === "success") {
            this.setState(
              {
                message: res.data.message,
                errors: "",
                alertVariant: "success"
              },
              () => {
                this.showAlerts();
              }
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
          } else this.setState({ errors: "" });
        })
        .catch(err => {});
    } else {
      this.setState({ errors: errors });
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
    let message = <p>Loading...</p>;
    if (this.state.isVerified) {
      message = (
        <>
          <Container fluid id="reset">
            <Row style={{ height: "100vh" }}>
              <Col
                sm={8}
                md={6}
                lg={5}
                className="mx-auto my-auto"
                style={{ maxWidth: "500px" }}
              >
                <div className="reset__title">
                  <div className="d-flex align-items-center">
                    <div>
                      <img className="logo" src={logo} alt="User" />
                    </div>
                    <h5 className="ml-auto title-fixed">Reset Password</h5>
                  </div>
                </div>
                <Card style={{ border: "none" }}>
                  <Card.Body className="reset__form">
                    <Form onSubmit={this.reset}>
                      <Row>
                        <Col>
                          <Form.Group>
                            <Form.Label>New Password</Form.Label>
                            <Form.Control
                              className={classnames({
                                "is-invalid": errors.newPassword
                              })}
                              type="password"
                              placeholder={this.props.location.newPassword}
                              name="newPassword"
                              onChange={this.changeHandler}
                            />
                            <Form.Control.Feedback type="invalid">
                              {errors.newPassword}
                            </Form.Control.Feedback>
                          </Form.Group>
                        </Col>
                      </Row>
                      <Row>
                        <Col>
                          <Form.Group>
                            <Form.Label>Confirm Password</Form.Label>
                            <Form.Control
                              type="password"
                              className={classnames({
                                "is-invalid": errors.confirmPassword
                              })}
                              placeholder={this.props.location.email}
                              name="confirmPassword"
                              onChange={this.changeHandler}
                            />
                            <Form.Control.Feedback type="invalid">
                              {errors.confirmPassword}
                            </Form.Control.Feedback>
                          </Form.Group>{" "}
                        </Col>
                      </Row>
                      <Button
                        variant="primary"
                        type="submit"
                        className="col offset-md-9 col-md-3"
                      >
                        Submit
                      </Button>
                    </Form>
                    {this.state.change ? "Change Password Successfully" : ""}
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
    } else {
      message = (
        <div>
          <h3 className="font-weight-bold text-danger text-center">
            Sorry, but the token has expired!!!
          </h3>
        </div>
      );
    }
    return <>{message}</>;
  }
}
