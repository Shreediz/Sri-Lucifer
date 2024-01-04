import React from "react";
import { Form, Button, Container, Row, Col, Card } from "react-bootstrap";
import Modal from "../../../UI/Modal/messageModal";
import changePasswordValidation from "../../../Validator/changePassword";
import classnames from "classnames";
import axios from "axios";
import { connect } from "react-redux";
import Navbar from "../../../UI/Navbar/Navbar";
import Sidebar from "../../../UI/Sidebar/Sidebar";
import getIp from "../../../Utility/getIp";
class ChangePassword extends React.Component {
  state = {
    email: this.props.auth.user.email,
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
    errors: "",
    ip: null,
    message: "",
    show: false,
    alertVariant: ""
  };
  componentDidMount = async () => {
    this.setState({ ip: await getIp() });
  };
  submitHandler = e => {
    e.preventDefault();
    const { isValid, errors } = changePasswordValidation(this.state);
    if (isValid) {
      axios
        .put("/api/users/password", this.state)
        .then(res => {
          if (res.data.errors) {
            this.setState({ errors: res.data.errors });
          } else if (res.data.type === "success") {
            this.setState(
              {
                message: res.data.message,
                errors: "",
                alertVariant: "success"
              },
              () => this.showAlerts()
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
          } else {
            this.setState({ errors: res.data.errors });
          }
        })
        .catch(err => {
          console.log(err);
          // this.setState({ errors: err.response.data.errors });
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
    let { errors } = this.state;
    return (
      <>
        <Navbar />
        <Container
          fluid
          style={{ margin: "0", padding: "0", background: "#eeeeee" }}
        >
          <Row>
            <Sidebar />
            <Col className="p-3 m-2">
              {" "}
              <div className="mt-2">
                <h2>Update Password</h2>
              </div>
              <hr />
              <Card>
                <Card.Body>
                  <h5>Update Password</h5>
                  <p style={{ fontSize: ".9rem", color: "#ACACAC" }}>
                    Use this form to update your password
                  </p>
                  <Form onSubmit={this.submitHandler}>
                    <Form.Group>
                      <Row>
                        <Col md="4">
                          <Form.Label>Old Password</Form.Label>
                          <Form.Control
                            type="password"
                            placeholder="Your Old Password"
                            name="oldPassword"
                            className={classnames({
                              "is-invalid": errors.oldPassword
                            })}
                            onChange={this.changeHandler}
                          />
                          <Form.Control.Feedback type="invalid">
                            {errors.oldPassword}
                          </Form.Control.Feedback>
                        </Col>
                      </Row>
                    </Form.Group>
                    <Form.Group>
                      <Row>
                        <Col md="4">
                          <Form.Label>New Password</Form.Label>
                          <Form.Control
                            onChange={this.changeHandler}
                            type="password"
                            placeholder="Your New Password"
                            name="newPassword"
                            className={classnames({
                              "is-invalid": errors.newPassword
                            })}
                          />
                          <Form.Control.Feedback type="invalid">
                            {errors.newPassword}
                          </Form.Control.Feedback>
                        </Col>
                      </Row>
                    </Form.Group>
                    <Form.Group>
                      <Row>
                        <Col md="4">
                          <Form.Label>Confirm Password</Form.Label>
                          <Form.Control
                            className={classnames({
                              "is-invalid": errors.confirmPassword
                            })}
                            onChange={this.changeHandler}
                            type="password"
                            placeholder="Confirm Password"
                            name="confirmPassword"
                          />
                          <Form.Control.Feedback type="invalid">
                            {errors.confirmPassword}
                          </Form.Control.Feedback>
                        </Col>
                      </Row>
                    </Form.Group>
                    <Button variant="primary" type="submit">
                      Submit
                    </Button>
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
const mapStateToProps = state => ({ auth: state.auth });

export default connect(
  mapStateToProps,
  null
)(ChangePassword);
