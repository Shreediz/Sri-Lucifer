import React from "react";
import { Container, Row, Col,Spinner } from "react-bootstrap";
const spinner = (props) => (
  <Container fluid style={{ margin: "0", padding: "0" }}>
    <Row>
      <Col
        className="d-flex justify-content-center align-items-center"
        style={{ minHeight: "100vh", minWidth: "100vw" }}
      >
        <Spinner animation="border" />
      </Col>
    </Row>
  </Container>
);

export default spinner;
