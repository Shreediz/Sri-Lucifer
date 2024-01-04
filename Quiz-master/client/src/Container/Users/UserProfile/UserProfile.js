import React, { Component } from "react";
import { Container, Row, Col, Card } from "react-bootstrap";
import axios from "axios";
import setAuthToken from "../../../Utility/setauth";
import jwt_decode from "jwt-decode";
import { login } from "../../../Action/loginAction";
import { connect } from "react-redux";
import { auth } from "../../../Action/authAction";
import { checkin } from "../../../Action/checkAction";
import Sidebar from "../../../UI/Sidebar/Sidebar";
import Modal from "../../../UI/Modal/messageModal";
import Navbar from "../../../UI/Navbar/Navbar";
import Routes from "../../../config/Routes";
import { withRouter, NavLink } from "react-router-dom";

class UserProfile extends Component {
  state = {
    loading: "",
    informations: ""
  };
  componentDidMount = async () => {
    setAuthToken(localStorage.token);
    const decode = jwt_decode(localStorage.token);
    this.props.auth(decode);
    // this.props.login();
    // this.props.checkin();

    await axios

      .get("/api/users/profileInfo")
      .then(res => {
        // alert("information", res.data);
        this.setState({ informations: res.data });
      })
      .catch(err => {
        // console.log("Problem 123",err);
        console.log(err);
      });
  };
  render() {
    const informationList = [];
    if (!this.state.loading) {
      let informations = this.state.informations;
      for (let info of informations) {
        informationList.push(
          <>
            <Row>
              <Col md="4">
                <b>{info.name}</b>{" "}
              </Col>
              <Col>{info.value}</Col>
            </Row>
            <hr />
          </>
        );
      }
    }
    return (
      <>
        <Navbar />
        <Container
          fluid
          style={{ margin: "0", padding: "0", background: "#eeeeee" }}
        >
          {" "}
          <Row noGutters>
            <Sidebar />
            <Col className="p-3 m-2">
              <div className="mt-2">
                <h2>User Profile</h2>
              </div>
              <hr />
              <Card>
                <Card.Body>
                  <h5>Your account details </h5>
                  {/* <p style={{ fontSize: ".9rem", color: "#ACACAC" }}>
                    Use this form to update details of existing users
                  </p> */}
                  <hr />
                  <div>{informationList}</div>
                  <Row>
                    <Col xs="12 mb-3" md="3">
                      <NavLink
                        className="btn btn-danger"
                        to={Routes.CONFIRMPASSWORD_FOR_UPDATE_EMAIL}
                      >
                        Update Email
                      </NavLink>
                    </Col>
                    <Col xs="12" md="3">
                      <NavLink
                        className="btn btn-primary"
                        to={Routes.UPDATE_PASSWORD}
                      >
                        Update Password
                      </NavLink>
                    </Col>
                  </Row>
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
const mapActionToProps = dispatch => ({
  checkin: () => dispatch(checkin()),
  login: () => dispatch(login()),
  auth: payload => dispatch(auth(payload))
});

const mapStateToProps = state => ({
  authData: state.auth
});

export default connect(
  mapStateToProps,
  mapActionToProps
)(withRouter(UserProfile));
