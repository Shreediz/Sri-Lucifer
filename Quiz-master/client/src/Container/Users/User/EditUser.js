import React, { Component } from "react";
import axios from "axios";
import EditFormRegister from "../../../Validator/editFormValidation";
import Navbar from "../../../UI/Navbar/Navbar";
import Modal from "../../../UI/Modal/messageModal";
import { Row, Col, Form, Button, Container, Card } from "react-bootstrap";
import Sidebar from "../../../UI/Sidebar/Sidebar";
import classnames from "classnames";
import { withRouter } from "react-router-dom";
import Spinner from "../../../UI/Spinner/Spinner";
import getIp from "../../../Utility/getIp";
import checkPermission from "../../../Utility/checkPermission";
import Routes from "../../../config/Routes";
import SLUGS from "../../../config/SLUGS";
const Shifts = ["MORNING", "DAY", "EVENING"];
const Roles = ["user", "admin", "superadmin"];
class EditUser extends Component {
  state = {
    loading: true,
    email: "",
    userTypes: "",
    countries: "",
    firstname: "",
    lastname: "",
    middlename: "",
    phone: "",
    mobile: "",
    address: "",
    country: "",
    userType: "",
    errors: "",
    show: false,
    alertVariant: "danger",
    message: "",
    shifts: "",
    shift: "",
    userId: this.props.match.params.id,
    ip: null
  };

  componentDidMount = async () => {
    let isAuthorized = await checkPermission(SLUGS.EDIT_USER);
    if (!isAuthorized) {
      this.props.history.push(Routes.UNAUTHORIZED);
    }
    let userId = this.state.userId;
    await axios
      .get(`/api/users/${userId}`)
      .then(response => {
        let data = response.data[0];
        this.setState({
          id: data.id,
          firstname: data.firstname,
          middlename: data.middlename,
          lastname: data.lastname,
          address: data.address,
          userStatus: data.userStatus,
          country: data.country,
          mobile: data.mobile,
          phone: data.phone,
          email: data.email,
          shift: Shifts[data.shift - 1] || 0,
          userType: Roles[data.userType - 1],
          ip: this.state.ip
        });
      })
      .catch(err => {
        console.log(err);
      });
    await axios
      .get("/api/utility/add")
      .then(res => {
        this.setState({
          ...this.state,
          loading: false,
          userTypes: res.data.userType,
          countries: res.data.countries,
          shifts: res.data.shifts
        });
      })
      .catch(err => {});
    this.setState({ ip: await getIp() });
  };

  changeHandler = e => {
    this.setState({ [e.target.name]: e.target.value });
  };
  update = e => {
    e.preventDefault();
    const { errors, isValid } = EditFormRegister(this.state);
    if (isValid) {
      axios
        .put(`/api/users/${this.props.match.params.id}`, this.state)
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
        userTypeOptions.push(<option>{userType.title}</option>);
      }
      let countries = this.state.countries;
      for (let country of countries) {
        countriesList.push(<option>{country.name}</option>);
      }
      let shifts = this.state.shifts;
      for (let shift of shifts) {
        shiftsOptions.push(<option>{shift.shift}</option>);
      }
    }

    let errors = this.state.errors;
    let statusOptions = [
      "Select a status",
      "active",
      "inactive",
      "suspended",
      "closed"
    ];
    let userStatusOptions = [];
    statusOptions.forEach(option => {
      if (option === this.state.userStatus)
        userStatusOptions.push(<option selected="selected">{option}</option>);
      else userStatusOptions.push(<option>{option}</option>);
    });
    let display = <Spinner />;
    if (this.state.userId)
      display = (
        <>
          <Navbar />
          <Container
            fluid
            style={{ margin: "0", padding: "0", background: "#eeeeee" }}
          >
            <Row>
              <Sidebar />{" "}
              <Col className="p-3 m-2">
                <div className="mt-2">
                  <h2>Edit user</h2>
                </div>
                <hr />
                <Card>
                  <Card.Body>
                    <h5>Edit user </h5>
                    <p style={{ fontSize: ".9rem", color: "#ACACAC" }}>
                      Use this form to update details of existing users
                    </p>
                    <Form onSubmit={this.update} className="needs-validation">
                      <Form.Group>
                        <Form.Label>Name</Form.Label>
                        <Row>
                          <Col sm="12 mb-2" md="4 mb-0">
                            <Form.Control
                              className={classnames({
                                "is-invalid": errors.firstname
                              })}
                              type="text"
                              value={this.state.firstname}
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
                              value={this.state.middlename}
                              name="middlename"
                              onChange={this.changeHandler}
                            />

                            <Form.Control.Feedback type="invalid">
                              {errors.middlename}
                            </Form.Control.Feedback>
                          </Col>
                          <Col sm="12 mb-2" md="4 mb-0">
                            <Form.Control
                              className={classnames({
                                "is-invalid": errors.lastname
                              })}
                              type="text"
                              value={this.state.lastname}
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
                          <Col>
                            <Form.Label>User Type</Form.Label>
                            <Form.Control
                              className={classnames({
                                "is-invalid": errors.userType
                              })}
                              as="select"
                              name="userType"
                              value={this.state.userType}
                              onChange={this.changeHandler}
                            >
                              <option value="0">Select a User type</option>
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
                              value={this.state.shift}
                              onChange={this.changeHandler}
                              disabled={
                                this.state.userType === "user" ||
                                this.state.userType === ""
                                  ? false
                                  : true
                              }
                            >
                              <option value="0">
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
                              value={this.state.address}
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
                              type="text"
                              onChange={this.changeHandler}
                              value={this.state.phone}
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
                              type="text"
                              onChange={this.changeHandler}
                              value={this.state.mobile}
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
                              value={this.state.country}
                              name="country"
                              onChange={this.changeHandler}
                            >
                              <option value="0">Select your country</option>
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
    return <>{display}</>;
  }
}
export default withRouter(EditUser);
