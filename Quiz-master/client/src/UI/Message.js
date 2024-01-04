import React from "react";
import axios from "axios";
import { Container, Row, Col, Card, Spinner } from "react-bootstrap";
import getIp from "../Utility/getIp";

class Message extends React.Component {
  state = {
    isVerified: false,
    message: "",
    ip: null
  };
  redirectButton = () => {
    this.props.history.push("/");
  };
  async componentDidMount() {
    let token = this.props.match.params.id;
    this.setState({ ip: await getIp() });
    await axios
      .post(`/api/users/confirmation/${token}`, { ip: this.state.ip })
      .then(res => {
        this.setState({
          isVerified: res.data.isVerified,
          message: res.data.message
        });
      })
      .catch(err => {});
  }
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
      if (this.state.isVerified)
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
                      Oops, failed to activate account!
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
export default Message;
