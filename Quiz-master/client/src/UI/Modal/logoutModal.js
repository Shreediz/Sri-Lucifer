import React, { Component } from "react";
import { Modal, Button, Row, Col } from "react-bootstrap";
import { logout } from "../../Action/loginAction";
import { checkout } from "../../Action/checkAction";

import { connect } from "react-redux";
import { authlogout } from "../../Action/authAction";
import { withRouter } from "react-router-dom";
import Axios from "axios";
class logoutModal extends Component {
  state = {
    message: "",
    showModal: false
  };

  logout = () => {
    Axios.post("/api/users/logout", this.props.ip).then(res => {
      if (res.data.type === "success") {
        this.setState({ message: res.data.message, showModal: true });
        localStorage.clear();
        this.props.logout();
        this.props.auth();
        this.props.checkout();
        this.props.history.replace("/");
      } else if (res.data.type === "error") {
        this.setState({ message: res.data.message, showModal: true });
      }
    });
  };

  dontLogout = () => {
    this.props.checkout();
    this.props.history.replace("/checkin");
  };

  render() {
    console.log("Here");
    return (
      <Modal show={this.props.show} onHide={this.props.close}>
        <Modal.Header
          className="primary"
          style={{ color: "white", backgroundColor: `#88aff7` }}
          closeButton
        >
          <Modal.Title style={{ fontSize: "18px", color: "white" }}>
            Logout Confirmation
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <h3 style={{ fontSize: "18px" }}>
            Are You Sure ! You want to Logout{" "}
          </h3>
          <Row>
            <Col className="text-right">
              <Button className="col-6" onClick={this.logout}>
                Yes
              </Button>
            </Col>
            <Col>
              <Button className="col-6" onClick={this.dontLogout}>
                No
              </Button>
            </Col>
          </Row>
        </Modal.Body>
      </Modal>
    );
  }
}

const mapActionToProps = dispatch => ({
  logout: () => dispatch(logout()),
  auth: () => dispatch(authlogout()),
  checkout: () => dispatch(checkout())
});

export default connect(
  null,
  mapActionToProps
)(withRouter(logoutModal));
