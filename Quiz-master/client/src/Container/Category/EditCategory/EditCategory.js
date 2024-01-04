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
class EditCategory extends Component {
  state = {
    loading: false,
    ip: null,
    show: false,
    message: "",
    category: "",
    errors: ""
  };
  changeHandler = event => {
    this.setState({ [event.target.name]: event.target.value, errors: "" });
  };

  componentDidMount = async () => {
    let isAuthorized = await checkPermission(SLUGS.MANAGE_CATEGORIES);
    if (!isAuthorized) {
      this.props.history.push(Routes.UNAUTHORIZED);
      return;
    }
    await axios
      .get(`/api/category/${this.props.match.params.slug}`)
      .then(results => {
        if (results.data.type === "error") {
          this.props.history.push(Routes.MANAGE_CATEGORIES);
        } else {
          this.setState({ category: results.data });
        }
      })
      .catch(err => {
        console.log("error,", err);
        alert("Something went wrong");
      });
    this.setState({ ip: await getIp() });
  };

  updateCategory = async e => {
    e.preventDefault();
    let data = {
      category: this.state.category,
      ip: this.state.ip
    };
    const { errors, isValid } = validateCategory(data);
    if (isValid) {
      await axios
        .put(`/api/category/${this.props.match.params.slug}`, data)
        .then(res => {
          if (res.data.type === "success") {
            alert(res.data.message);
            console.log("Updated response", res.data);
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
            this.props.history.push(
              `${Routes.EDIT_CATEGORY}/${this.state.category
                .trim()
                .split(" ")
                .join("-")}`
            );
          } else if (res.data.errors) {
            this.setState({ errors: res.data.errors }, () =>
              console.log("State now", this.state)
            );
          } else {
            this.setState(
              {
                message: res.data.message,
                alertVariant: "danger"
              },
              () => {
                console.log("State now contains", this.state.errors);
                this.showAlerts();
              }
            );
          }
        })
        .catch(err => {
          this.setState({ errors: err.response.data.errors });
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
                  <h2>Edit category</h2>
                </div>
                <hr />
                <Card>
                  <Card.Body>
                    <h5>Edit Category</h5>
                    <p style={{ fontSize: ".9rem", color: "#ACACAC" }}>
                      Use this form to update existing category
                    </p>
                    <Form onSubmit={this.updateCategory}>
                      <Form.Group>
                        <Row>
                          <Col sm="12 mb-2" md="2 mb-0">
                            <Form.Label>Category</Form.Label>
                          </Col>
                          <Col md="6">
                            <Form.Control
                              className={classnames({
                                "is-invalid": errors.category
                              })}
                              type="text"
                              value={this.state.category}
                              name="category"
                              onChange={this.changeHandler}
                            />

                            <Form.Control.Feedback type="invalid">
                              {errors.category}
                            </Form.Control.Feedback>
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
                              Update
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
export default withRouter(EditCategory);
// export default connect(
//   null,
//   mapActionToProps
// )(withRouter(AddCategory));
