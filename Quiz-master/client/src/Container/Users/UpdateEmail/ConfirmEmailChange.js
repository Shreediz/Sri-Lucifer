import React, { Component } from "react";
import getIp from "../../../Utility/getIp";
import { Container, Row, Col, Card, Spinner } from "react-bootstrap";
import axios from "axios";
import { withRouter } from "react-router-dom";

import classnames from "classnames";

class ConfirmEmailChange extends Component {
  state = {
    message: "",
    isUpdated: false,
    ip: ""
  };
  redirectButton = () => {
    this.props.history.push("/");
  };
  componentDidMount = async () => {
    console.log(this.props.match.params.id);
    this.setState({ ip: await getIp() });
    await axios
      .put(`/api/users/users/updateNewEmail/${this.props.match.params.id}`, {
        ip: this.state.ip
      })
      .then(res => {
        this.setState({
          isUpdated: res.data.isUpdated,
          message: res.data.message
        });
      })
      .catch(err => {
        console.log(err);
      });
  };
  render() {
    let message = (
      <>
        <Container
          style={{ width: "100vw", height: "100vh" }}
          className="d-flex justify-content-center align-items-center"
        >
          <Spinner animation="border" />
        </Container>
      </>
    );
    if (this.state.message) {
      if (this.state.isUpdated)
        message = (
          <Container fluid style={{ padding: 0, margin: 0 }}>
            <Row className="bg-success">
              <Col
                style={{ width: "100vw", height: "100vh" }}
                className="d-flex align-items-center justify-content-center"
              >
                <Card>
                  <Card.Body className="d-flex justify-content-center flex-column">
                    <h6 className="text-success text-center">
                      {this.state.message}
                    </h6>
                    <div className="text-center">
                      <button
                        className="btn btn-success"
                        onClick={this.redirectButton}
                      >
                        Go Home
                      </button>
                    </div>
                  </Card.Body>
                </Card>
              </Col>
            </Row>
          </Container>
        );
      else {
        message = (
          <Container fluid style={{ padding: 0, margin: 0 }}>
            <Row className="bg-danger">
              <Col
                style={{ width: "100vw", height: "100vh" }}
                className="d-flex align-items-center justify-content-center"
              >
                <Card>
                  <Card.Body className="d-flex justify-content-center flex-column">
                    <h1 className="text-danger text-center">
                      Oops, failed to update email!
                    </h1>
                    <div className="text-center">
                      <button
                        className="btn btn-danger"
                        onClick={this.redirectButton}
                      >
                        Go Home
                      </button>
                    </div>
                    <div className="text-center text-muted">
                      <small>
                        If you think this is a mistake, please contact
                        biticonic@support.com
                      </small>
                    </div>
                  </Card.Body>
                </Card>
              </Col>
            </Row>
          </Container>
        );
      }
    }
    return <>{message}</>;
  }
}

export default withRouter(ConfirmEmailChange);
