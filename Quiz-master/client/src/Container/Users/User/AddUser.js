import React, { Component } from "react";
import axios from "axios";

import Modal from "../../../UI/Modal/messageModal";
import { Form, Button, Container, Row, Col, Card } from "react-bootstrap";
import FormValidationRegister from "../../../Validator/FormValidationRegister";
import Sidebar from "../../../UI/Sidebar/Sidebar";
import { connect } from "react-redux";
import Navbar from "../../../UI/Navbar/Navbar";
import { login } from "../../../Action/loginAction";
import "./ViewUser.css";
import Axios from "axios";
import { auth } from "../../../Action/authAction";
import classnames from "classnames";
import Spinner from "../../../UI/Spinner/Spinner";
import getIp from "../../../Utility/getIp";
import { withRouter } from "react-router-dom";
import checkPermission from "../../../Utility/checkPermission";
import Routes from "../../../config/Routes";
import SLUGS from "../../../config/SLUGS";
class AddUser extends Component {
  state = {
    validated: false,
    loading: true,
    userTypes: "",
    countries: "",
    firstname: "",
    lastname: "",
    middlename: "",
    password: "",
    email: "",
    phone: "",
    mobile: "",
    address: "",
    country: "",
    confirmPassword: "",
    userType: "",
    errors: "",
    ip: null,
    show: false,
    message: "",
    shift: ""
  };
  changeHandler = event => {
    this.setState({ [event.target.name]: event.target.value, errors: "" });
  };

  componentDidMount = async () => {
    let isAuthorized = await checkPermission(SLUGS.ADD_USER);
    if (!isAuthorized) {
      this.props.history.push(Routes.UNAUTHORIZED);
    }
    await Axios.get("/api/utility/add")
      .then(res => {
        this.setState({
          loading: false,
          userTypes: res.data.userType,
          countries: res.data.countries,
          shifts: res.data.shifts
        });
      })
      .catch(err => {});

    this.setState({ ip: await getIp() });
  };
  register = async e => {
    e.preventDefault();
    let data = {
      firstname: this.state.firstname,
      lastname: this.state.lastname,
      middlename: this.state.middlename,
      password: this.state.password,
      confirmPassword: this.state.confirmPassword,
      email: this.state.email,
      phone: this.state.phone,
      mobile: this.state.mobile,
      address: this.state.address,
      country: this.state.country,
      userType: this.state.userType,
      shift: this.state.shift,
      ip: this.state.ip
    };
    if (this.state.userType !== "user") this.setState({ shift: "" });
    const { errors, isValid } = FormValidationRegister(data);
    if (isValid) {
      await axios
        .post("/api/users/", data)
        .then(res => {
          if (res.data.type === "success") {
            this.setState(
              {
                message: res.data.message,
                alertVariant: "success",
                errors: ""
              },
              () => {
                this.showAlerts();
              }
            );
          } else if (res.data.errors) {
            this.setState({ errors: res.data.errors });
          } else {
            this.setState({
              message: res.data.message,
              alertVariant: "danger"
            });
          }
        })
        .catch(err => {
          this.setState({ errors: err.response.data.errors });
        });
    } else {
      this.setState({ errors: errors });
    }
  };
  showAlerts = () => {
    this.setState({ show: true });
  };
  modalClose = () => {
    this.setState({ show: false });
  };

  render() {
    const userTypeOptions = [];
    const countriesList = [];
    const shiftsOptions = [];
    if (!this.state.loading) {
      let userTypes = this.state.userTypes;
      for (let userType of userTypes) {
        if (userType.title === "customer" || userType.title === "supplier")
          continue;
        userTypeOptions.push(
          <option value={userType.title} key={userType.title}>
            {userType.title}
          </option>
        );
      }
      let countries = this.state.countries;
      for (let country of countries)
        countriesList.push(
          <option value={country.name}>{country.name}</option>
        );
      let shifts = this.state.shifts;
      for (let shift of shifts) {
        shiftsOptions.push(<option value={shift.shift}>{shift.shift}</option>);
      }
    }
    let display = <Spinner />;
    //Form validation error
    let errors = this.state.errors;
    if (!this.state.loading)
      display = (
        <>
          <Navbar />
          <Container
            fluid
            style={{ margin: "0", padding: "0", background: "#eeeeee" }}
          >
            <Row noGutters>
              <Sidebar />
              <Col className="p-3 m-2">
                <div className="mt-2">
                  <h2>Add User</h2>
                </div>
                <hr />
                <Card>
                  <Card.Body>
                    <h5>Add user </h5>
                    <p style={{ fontSize: ".9rem", color: "#ACACAC" }}>
                      Use this form to add new users
                    </p>
                    <Form onSubmit={this.register} className="needs-validation">
                      <Form.Group>
                        <Form.Label>Name</Form.Label>
                        <Row>
                          <Col sm="12 mb-2" md="4 mb-0">
                            <Form.Control
                              className={classnames({
                                "is-invalid": errors.firstname
                              })}
                              type="text"
                              placeholder="Firstname"
                              name="firstname"
                              onChange={this.changeHandler}
                            />

                            <Form.Control.Feedback type="invalid">
                              {errors.firstname}
                            </Form.Control.Feedback>
                          </Col>
                          <Col sm="12 mb-2" md="4 mb-0">
                            <Form.Control
                              className={classnames({
                                "is-invalid": errors.middlename
                              })}
                              type="text"
                              placeholder="Middlename"
                              name="middlename"
                              onChange={this.changeHandler}
                            />

                            <Form.Control.Feedback type="invalid">
                              {errors.middlename}
                            </Form.Control.Feedback>
                          </Col>
                          <Col xs="mb-2" sm="12" md="4 mb-0">
                            <Form.Control
                              className={classnames({
                                "is-invalid": errors.lastname
                              })}
                              type="text"
                              placeholder="Lastname"
                              name="lastname"
                              onChange={this.changeHandler}
                            />
                            <Form.Control.Feedback type="invalid">
                              {errors.lastname}
                            </Form.Control.Feedback>
                          </Col>
                        </Row>
                      </Form.Group>
                      <Form.Group>
                        <Row>
                          <Col sm="12" md="4">
                            <Form.Label>Email address</Form.Label>
                            <Form.Control
                              className={classnames({
                                "is-invalid": errors.email
                              })}
                              type="email"
                              placeholder="Email Address"
                              name="email"
                              onChange={this.changeHandler}
                            />
                            <Form.Control.Feedback type="invalid">
                              {errors.email}
                            </Form.Control.Feedback>
                          </Col>
                          <Col sm="12" md="4">
                            <Form.Label>Password</Form.Label>
                            <Form.Control
                              className={classnames({
                                "is-invalid": errors.password
                              })}
                              onChange={this.changeHandler}
                              type="password"
                              placeholder="Password"
                              name="password"
                            />
                            <Form.Control.Feedback type="invalid">
                              {errors.password}
                            </Form.Control.Feedback>
                          </Col>
                          <Col sm="12" md="4">
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

                      <Form.Group>
                        <Row>
                          <Col sm="12" md="4">
                            <Form.Label>User Type</Form.Label>
                            <Form.Control
                              className={classnames({
                                "is-invalid": errors.userType
                              })}
                              as="select"
                              name="userType"
                              onChange={this.changeHandler}
                            >
                              <option value="">Select a User type</option>
                              {userTypeOptions}
                            </Form.Control>
                            <Form.Control.Feedback type="invalid">
                              {errors.userType}
                            </Form.Control.Feedback>
                          </Col>
                          <Col sm="12" md="4">
                            <Form.Label>Shift</Form.Label>
                            <Form.Control
                              className={classnames({
                                "is-invalid": errors.shift
                              })}
                              as="select"
                              name="shift"
                              onChange={this.changeHandler}
                              disabled={
                                this.state.userType === "user" ||
                                this.state.userType === ""
                                  ? false
                                  : true
                              }
                            >
                              <option value="">
                                {this.state.userType === "user" ||
                                this.state.userType === ""
                                  ? "Select a shift"
                                  : "Shift not required"}
                              </option>
                              {shiftsOptions}
                            </Form.Control>
                            <Form.Control.Feedback type="invalid">
                              {errors.shift}
                            </Form.Control.Feedback>
                          </Col>
                          <Col sm="12" md="4">
                            <Form.Label>Address</Form.Label>
                            <Form.Control
                              className={classnames({
                                "is-invalid": errors.address
                              })}
                              type="text"
                              onChange={this.changeHandler}
                              placeholder="Current Address"
                              name="address"
                            />
                            <Form.Control.Feedback type="invalid">
                              {errors.address}
                            </Form.Control.Feedback>
                          </Col>
                        </Row>
                      </Form.Group>
                      <Form.Group controlId="formBasicPassword">
                        <Row>
                          <Col sm="12" md="4">
                            <Form.Label>Phone Number</Form.Label>
                            <Form.Control
                              className={classnames({
                                "is-invalid": errors.phone
                              })}
                              type="number"
                              onChange={this.changeHandler}
                              placeholder="01XXXXXXX"
                              name="phone"
                            />
                            <Form.Control.Feedback type="invalid">
                              {errors.phone}
                            </Form.Control.Feedback>
                          </Col>
                          <Col sm="12" md="4">
                            <Form.Label>Mobile Number</Form.Label>
                            <Form.Control
                              className={classnames({
                                "is-invalid": errors.mobile
                              })}
                              type="number"
                              onChange={this.changeHandler}
                              placeholder="98XXXXXXXX"
                              name="mobile"
                            />
                            <Form.Control.Feedback type="invalid">
                              {errors.mobile}
                            </Form.Control.Feedback>
                          </Col>
                          <Col sm="12" md="4">
                            <Form.Label>Country</Form.Label>
                            <Form.Control
                              className={classnames({
                                "is-invalid": errors.firstname
                              })}
                              as="select"
                              name="country"
                              onChange={this.changeHandler}
                            >
                              <option value="">Select your country</option>
                              {countriesList}
                            </Form.Control>
                            <Form.Control.Feedback type="invalid">
                              {errors.country}
                            </Form.Control.Feedback>
                          </Col>
                        </Row>
                      </Form.Group>

                      <Button variant="primary" type="submit">
                        Submit
                      </Button>
                    </Form>
                  </Card.Body>
                </Card>{" "}
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

    return <>{display}</>;
  }
}
const mapActionToProps = dispatch => ({
  login: () => dispatch(login()),
  auth: payload => dispatch(auth(payload))
});
export default connect(
  null,
  mapActionToProps
)(withRouter(AddUser));
