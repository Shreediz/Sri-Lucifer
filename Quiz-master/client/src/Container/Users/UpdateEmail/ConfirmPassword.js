import React, { Component } from "react";
import getIp from "../../../Utility/getIp";
import axios from "axios";
import { Container, Row, Col, Form, Button, Card } from "react-bootstrap";
import classnames from "classnames";
import { withRouter } from "react-router-dom";
import Modal from "../../../UI/Modal/messageModal";
import validatatePassword from "../../../Validator/validatatePassword";
import validationEmail from "../../../Validator/validationEmail";
import logo from "../../../assets/img/logo.png";
class ConfirmPassword extends Component {
  state = {
    errors: "",
    ip: "",
    password: "",
    message: "",
    show: false,
    alertVariant: "danger",
    newEmail: ""
  };
  isAuthorized = false;
  componentDidMount = async () => {
    this.setState({ ip: await getIp() });
  };
  changeHandler = e => {
    this.setState({ [e.target.name]: e.target.value, errors: "" }, () => {});
  };
  updateEmail = async e => {
    e.preventDefault();
    const data = {
      newEmail: this.state.newEmail,
      ip: this.state.ip
    };
    const { errors, isValid } = validationEmail(data);
    if (isValid) {
      console.log("Is Valid");
      await axios
        .put("/api/users/users/updateEmail", data)
        .then(res => {
          if (res.data.type === "success") {
            this.setState({
              message: res.data.message,
              show: true,
              alertVariant: "success"
            });
          } else {
            this.setState({
              message: res.data.message,
              show: true,
              alertVariant: "danger",
              errors: res.data.errors
            });
          }
        })
        .catch(err => {
          console.log("error from updateEmail", err.response.data.errors);
          this.setState({ errors: err.response.data.errors });
        });
    } else {
      this.setState({ errors });
    }
  };

  check = async e => {
    e.preventDefault();
    const data = {
      ip: this.state.ip,
      password: this.state.password
    };
    const { errors, isValid } = validatatePassword(data);
    console.log(errors);
    if (isValid) {
      await axios
        .post("/api/users/checkPassword", data)
        .then(res => {
          console.log(res.data.type);
          if (res.data.type === "success") {
            this.isAuthorized = true;
            this.setState({});
          } else {
            this.setState({ message: res.data.message, show: true });
          }
        })
        .catch(err => {
          console.log(err);
        });
    } else {
      // console.log("this.state.errors",errors)
      this.setState({ errors: errors });
      console.log("this.state.errors", errors);
    }
  };
  modalClose = () => {
    this.setState({ show: false });
  };

  render() {
    let { errors } = this.state;
    let display = (
      <>
        <Container fluid id="forgot">
          <Row style={{ height: "100vh" }}>
            <Col
              sm={8}
              md={6}
              lg={5}
              style={{ maxWidth: "500px" }}
              className="mx-auto my-auto"
            >
              <div className="forgot__title">
                <div className="d-flex align-items-center">
                  <div>
                    <img className="logo" src={logo} alt="logo" />
                  </div>
                </div>
              </div>
              <Card style={{ border: "none" }}>
                <Card.Body className="forgot__form">
                  <Form onSubmit={this.forget}>
                    <Row>
                      <Col>
                        <Form.Group>
                          <Form.Label>Password</Form.Label>
                          <Form.Control
                            size="md"
                            className={classnames({
                              "is-invalid": errors.email
                            })}
                            type="password"
                            placeholder="Password"
                            name="password"
                            onChange={this.changeHandler}
                          />
                        </Form.Group>
                      </Col>
                    </Row>
                    <Button
                      className="col offset-md-9 col-md-3"
                      variant="primary"
                      type="submit"
                      onClick={this.check}
                    >
                      Submit
                    </Button>
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
    if (this.isAuthorized) {
      display = (
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
                <div className="forgot__title">
                  <div className="d-flex align-items-center">
                    <div>
                      <img className="logo" src={logo} alt="logo" />
                    </div>
                  </div>
                </div>
                <Card style={{ border: "none" }}>
                  <Card.Body className="forgot__form">
                    <Form onSubmit={this.updateEmail}>
                      <Form.Group>
                        <Form.Label>Enter the New Email Id</Form.Label>
                        <Form.Control
                          size="md"
                          className={classnames({
                            "is-invalid": errors
                          })}
                          type="email"
                          placeholder="Email@example.com"
                          name="newEmail"
                          onChange={this.changeHandler}
                        />
                        <Form.Control.Feedback type="invalid">
                          {errors}
                        </Form.Control.Feedback>
                      </Form.Group>
                      <Row>
                        <Col>
                          <Button
                            className="col offset-md-9 col-md-3"
                            variant="primary"
                            type="submit"
                          >
                            Submit
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
    return <>{display}</>;
  }
}
export default withRouter(ConfirmPassword);
