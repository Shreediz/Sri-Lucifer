import React, { Component } from "react";
import axios from "axios";
import { Form, Button, Container, Row, Col, Card } from "react-bootstrap";
import Sidebar from "../../../UI/Sidebar/Sidebar";
import Navbar from "../../../UI/Navbar/Navbar";
import classnames from "classnames";
import Spinner from "../../../UI/Spinner/Spinner";
import getIp from "../../../Utility/getIp";
import { withRouter } from "react-router-dom";
import checkPermission from "../../../Utility/checkPermission";
import Routes from "../../../config/Routes";
import SLUGS from "../../../config/SLUGS";
import validateCategory from "../../../Validator/Category";
import Modal from "../../../UI/Modal/messageModal";
class AddCategory extends Component {
  state = {
    loading: false,
    ip: null,
    show: false,
    message: "",
    category: "",
    passmarks:"",
    status:"",
    fullmarks:"",
    errors: ""
  };
  changeHandler = event => {
    console.log("target", event.target.name);
    console.log("value", event.target.value);
    this.setState({ [event.target.name]: event.target.value, errors: "" });
  };

  componentDidMount = async () => {
    let isAuthorized = await checkPermission(SLUGS.ADD_CATEGORIES);
    if (!isAuthorized) {
      this.props.history.replace(Routes.UNAUTHORIZED);
    }
    this.setState({ ip: await getIp() });
  };

  addCategory = async e => {
    e.preventDefault();
    let data = {
      category: this.state.category,
      passmarks: this.state.passmarks,
      fullmarks:this.state.fullmarks,
      status:this.state.status,
      ip: this.state.ip
    };
    console.log("client side validataion",data)
    const { errors, isValid } = validateCategory(data);
    if (isValid) {
      await axios
        .post("/api/category", data)
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
          alert("ERRR");

          this.setState({ errors: err.response.data.errors }, () => {
            console.log(this.state.errors);
          });
        });
    } else {
      this.setState({ errors });
    }
  };

  showAlerts = () => {
    this.setState({ show: true });
  };
  modalClose = () => {
    this.setState({ show: false });
  };

  render() {
    let { errors } = this.state;
    let display = <Spinner />;
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
                  <h2>Add category</h2>
                </div>
                <hr />
                <Card>
                  <Card.Body>
                    <h5>Add Category</h5>
                    <p style={{ fontSize: ".9rem", color: "#ACACAC" }}>
                      Use this form to add new category
                    </p>
                    <Form onSubmit={this.addCategory}>
                      <Form.Group>
                        <Row>
                          <Col sm="12" md="6">
                            <Row>
                              <Col sm="12 mb-2" md="3 mb-0">
                                <Form.Label>Subject Category</Form.Label>
                              </Col>
                              <Col md="8" sm="12">
                                <Form.Control
                                  className={classnames({
                                    "is-invalid": errors.category
                                  })}
                                  type="text"
                                  placeholder="Category"
                                  name="category"
                                  onChange={this.changeHandler}
                                />

                                <Form.Control.Feedback type="invalid">
                                  {errors.category}
                                </Form.Control.Feedback>
                              </Col>
                            </Row>
                          </Col>
                          <Col sm="12" md="6">
                            <Row>
                              <Col sm="12" md="2 mb-0">
                                <Form.Label>Status</Form.Label>
                              </Col>
                              <Col sm="12" md="6 mb-0">
                                <Form.Control
                                  className={classnames({
                                    "is-invalid": errors.status
                                  })}
                                  as="select"
                                  name="status"
                                  onChange={this.changeHandler}
                                >
                                  <option value="">Specify the status</option>
                                  <option value="show">show</option>
                                  <option value="hide">hide</option>
                                </Form.Control>
                                <Form.Control.Feedback type="invalid">
                                  {errors.status}
                                </Form.Control.Feedback>
                              </Col>
                            </Row>
                          </Col>
                        </Row>
                        <Row>
                          <Col sm="12" md="6">
                            <Row>
                              <Col sm="12 mb-2" md="3 mb-0">
                                <Form.Label>Full Marks</Form.Label>
                              </Col>
                              <Col md="8" sm="12">
                                <Form.Control
                                  className={classnames({
                                    "is-invalid": errors.fullmarks
                                  })}
                                  type="number"
                                  placeholder="Full Marks                                               "
                                  name="fullmarks"
                                  onChange={this.changeHandler}
                                />

                                <Form.Control.Feedback type="invalid">
                                  {errors.fullmarks}
                                </Form.Control.Feedback>
                              </Col>
                            </Row>
                          </Col>
                          <Col sm="12" md="6">
                            <Row>
                              <Col sm="12" md="3 mb-0">
                                <Form.Label>Pass Marks</Form.Label>
                              </Col>
                              <Col sm="12" md="6 mb-0">
                                <Form.Control
                                  className={classnames({
                                    "is-invalid": errors.passmarks
                                  })}
                                  type="number"
                                  placeholder="Pass Marks                                            "
                                  name="passmarks"
                                  onChange={this.changeHandler}
                                />
                                 <Form.Control.Feedback type="invalid">
                                  {errors.passmarks}
                                </Form.Control.Feedback>
                              </Col>
                            </Row>
                          </Col>
                        </Row>
                      </Form.Group>

                      <Form.Group>
                        <Row>
                          <Col className="offset-md-2">
                            <Button
                              className="col-sm-12 col-md-2"
                              variant="primary"
                              type="submit"
                            >
                              Submit
                            </Button>
                          </Col>
                        </Row>
                      </Form.Group>
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
// const mapActionToProps = dispatch => ({
//   login: () => dispatch(login()),
//   auth: payload => dispatch(auth(payload))
// });
export default withRouter(AddCategory);
// export default connect(
//   null,
//   mapActionToProps
// )(withRouter(AddCategory));
