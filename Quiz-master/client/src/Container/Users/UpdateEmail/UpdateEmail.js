import React, { Component } from "react";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import getIp from "../../../Utility/getIp";
import classnames from "classnames";
import Axios from "axios";
import Modal from "../../../UI/Modal/messageModal";
import validationEmail from "../../../Validator/validationEmail";

export default class UpdateEmail extends Component {
  state = {
    errors: "",
    ip: "",
    message: "",
    show: false,
    newEmail: "",
    alertVariant: ""
  };

  changeHandler = e => {
    this.setState({ [e.target.name]: e.target.value, errors: "" }, () => {});
  };
  componentDidMount = async () => {
    this.setState({ ip: await getIp() });
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
      await Axios.put("/api/users/users/updateEmail", data)
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
  modalClose = () => {
    this.setState({ show: false });
  };
  render() {
    let { errors } = this.state;
    console.log("this.state inside the UpdateEmail ", this.state);

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
              <Form onSubmit={this.updateEmail}>
                <Row>
                  <Col>
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
                  </Col>
                </Row>
              </Form>
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
