import React, { Component } from "react";
import Axios from "axios";
import { Form, Button, Container, Row, Col, Card } from "react-bootstrap";
import logo from "../../../assets/img/logo.png";
import "./Forgot.css";
import getIp from "../../../Utility/getIp";
import Modal from "../../../UI/Modal/messageModal";

export default class Forgot extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: this.props.location.email,
      ip: null,
      message: "",
      show: false,
      alertVariant: "danger"
    };
  }
  forget = async e => {
    e.preventDefault();
    await Axios.post(`/api/users/forgot`, this.state)
      .then(res => {
        if (res.data.type === "success") {
          this.setState(
            { message: res.data.message, alertVariant: "success" },
            () => this.showAlerts()
          );
        } else if (res.data.type === "error") {
          this.setState(
            { message: res.data.message, alertVariant: "danger" },
            () => this.showAlerts()
          );
        }
      })
      .catch(err => {});
  };
  changeHandler = e => {
    this.setState({ [e.target.name]: e.target.value, errors: "" });
  };
  componentDidMount = async () => {
    this.setState({ ip: await getIp() });
  };
  showAlerts = () => {
    this.setState({ show: true });
  };
  modalClose = () => {
    this.setState({ show: false });
  };
  render() {
    return (
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
                  <h5 className="ml-auto title-fixed">Forgot Password</h5>
                </div>
              </div>
              <Card style={{ border: "none" }}>
                <Card.Body className="forgot__form">
                  <Form onSubmit={this.forget}>
                    <Row>
                      <Col>
                        <Form.Group>
                          <Form.Label>Email</Form.Label>
                          <Form.Control
                            required
                            className="input-lg"
                            type="email"
                            value={this.state.email}
                            name="email"
                            onChange={this.changeHandler}
                          />
                        </Form.Group>
                      </Col>
                    </Row>
                    <Button
                      variant="primary"
                      className="col offset-md-9 col-md-3"
                      type="submit"
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
  }
}
