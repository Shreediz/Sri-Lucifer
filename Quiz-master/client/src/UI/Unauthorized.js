import React from "react";
import { withRouter } from "react-router-dom";
import { Container, Row, Col, Card } from "react-bootstrap";

class Unauthorized extends React.Component {
  redirectButton = () => {
    this.props.history.push("/");
  };
  render() {
    let display = (
      <>
        <Container fluid style={{ padding: 0, margin: 0 }}>
          <Row className="bg-danger">
            <Col
              style={{ width: "100vw", height: "100vh" }}
              className="d-flex align-items-center justify-content-center"
            >
              <Card>
                <Card.Body className="d-flex justify-content-center flex-column">
                  <h1 className="text-danger text-center">
                    You dont have access to this page!
                  </h1>
                  <div className="text-center">
                    <button
                      className="btn btn-danger"
                      onClick={this.redirectButton}
                    >
                      Go back
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
      </>
    );
    return <>{display}</>;
  }
}

export default withRouter(Unauthorized);
