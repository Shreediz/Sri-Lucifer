import React, { Component } from "react";
import { Radio, RadioGroup} from 'react-radio-group'

import axios from "axios";
import {
  Form,
  Button,
  Container,
  Row,
  Col,
  Card,
  ButtonGroup,
  Input
} from "react-bootstrap";

import classnames from "classnames";
import Spinner from "../../../UI/Spinner/Spinner";
import getIp from "../../../Utility/getIp";
import { withRouter } from "react-router-dom";
import checkPermission from "../../../Utility/checkPermission";
import Routes from "../../../config/Routes";
import SLUGS from "../../../config/SLUGS";
import Sidebar from "../../../UI/Sidebar/Sidebar";
import Navbar from "../../../UI/Navbar/Navbar";
import validateAddQuestion from "../../../Validator/ValidateQuizQuestion";
import Modal from "../../../UI/Modal/messageModal";
class AddQuizQuestion extends Component {
  state = {
    loading: false,
    ip: null,
    show: false,
    message: "",
    errors: "",
    category:"",
    categories: "",
    question: "",
    answer: [],
    option :""
  };
  changeHandler = event => {
    this.setState({ [event.target.name]: event.target.value, errors: "" });
  };


  handleChange = idx => e => {
    this.setState({ errors: "" });
    const selectedIndex = e.target.selectedIndex;
    const { name, value } = e.target;
    if (value === "") return;

    const answer = [...this.state.answer];
    answer[idx] = {
      ...answer[idx],
      [name]: value
    };
    this.setState({"answer":answer},()=>{console.log(answer)})
  }


  componentDidMount = async () => {
    let isAuthorized = await checkPermission(SLUGS.ADD_NEW_QUIZ);
    // if (!isAuthorized) {
    //   this.props.history.push(Routes.UNAUTHORIZED);
    // }
    await axios
      .get("/api/category")
      .then(results => {
        this.setState({ categories: results.data });
      })
      .catch(err => {});
    this.setState({ ip: await getIp() });
  };

  addquiz = async e => {
    e.preventDefault();
    let data = {
      category: this.state.category,
      question : this.state.question,
      answer : this.state.answer,
      option: this.state.option,
      ip: this.state.ip
    };
    console.log("data",data)
    const { errors, isValid } = validateAddQuestion(data);
    // let isValid= true;
    // let errors=""
    console.log(isValid,errors)
    if (isValid) {
      await axios
        .post("/api/quiz", data)
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
    let utc = new Date().toJSON().slice(0, 10);
    let { errors } = this.state;
    let display = <Spinner />;
    const categoriesOptions = [];
    if (!this.state.loading) {
      let categories = this.state.categories;
      for (let category of categories) {
        categoriesOptions.push(
          <option key={category.slug} value={category.name}>
            {category.name}
          </option>
        );
      }
      display = (
        <>
          {!this.props.sidebar ? <Navbar /> : ""}

          <Container
            fluid
            style={{ margin: "0", padding: "0", background: "#eeeeee" }}
          >
            <Row noGutters>
              {!this.props.sidebar ? <Sidebar /> : ""}
              <Col className="p-3 m-2">
                {!this.props.navbar ? (
                  <>
                    {" "}
                    <div className="mt-2">
                      <h2>Add Question</h2>
                    </div>
                    <hr />
                  </>
                ) : (
                  ""
                )}
                <Card>
                  <Card.Body>
                    <h5>Add Question</h5>
                    <p style={{ fontSize: ".9rem", color: "#ACACAC" }}>
                      Use this form to add new question
                    </p>
                    <Form onSubmit={this.addquiz}>
                      <Form.Group>
                        <Row>
                          <Col md="4">
                            <Form.Label>Question Category</Form.Label>
                            <Form.Control
                              className={classnames({
                                "is-invalid": errors.category
                              })}
                              as="select"
                              name="category"
                              onChange={this.changeHandler}
                            >
                              <option value="">Select a Category</option>
                              {categoriesOptions}
                            </Form.Control>
                            <Form.Control.Feedback type="invalid">
                              {errors.category}
                            </Form.Control.Feedback>
                          </Col>
                        </Row>
                      </Form.Group>
                      <Form.Group>
                        <Row>
                          <Col md="5">
                            <Form.Label>Question</Form.Label>
                            <Form.Control
                              className={classnames({
                                "is-invalid": errors.question
                              })}
                              type="text"
                              placeholder="Question"
                              name="question"
                              onChange={this.changeHandler}
                            />
                            <Form.Control.Feedback type="invalid">
                              {errors.question}
                            </Form.Control.Feedback>
                          </Col>
                          <Col md="7">
                            <Row>
                              <Col>
                                <Form.Label>Answer</Form.Label>
                              </Col>
                            </Row>
                            <Row>
                              <Col md="4">
                                <Row>
                                  <Col md="10">
                                    <Form.Control
                                      className={classnames({
                                        "is-invalid": errors.answer
                                      })}
                                      type="text"
                                      placeholder="Answer"
                                      name="answer"
                                      onChange={this.handleChange(0)}
                                    />
                                    <Form.Control.Feedback type="invalid">
                                      {errors.answer}
                                    </Form.Control.Feedback>
                                  </Col>
                                  <Col md = "2">
                                  <input type="radio" name="option" value="1" onChange = {this.changeHandler}/>
                                  </Col>
                                </Row>
                                <Row>
                                  <Col md = "10">
                                    <Form.Control
                                      className={classnames({
                                        "is-invalid": errors.answer
                                      })}
                                      type="text"
                                      placeholder="Answer"
                                      name="answer"
                                      onChange={this.handleChange(1)}
                                    />
                                    <Form.Control.Feedback type="invalid">
                                      {errors.answer}
                                    </Form.Control.Feedback>
                                  </Col>
                                  <Col md = "2">
                                  <input type="radio" name="option" value="2" onClick ={this.changeHandler}/>
                                  </Col>
                                </Row>
                                <Row>
                                  <Col md="10">
                                    <Form.Control
                                      className={classnames({
                                        "is-invalid": errors.answer
                                      })}
                                      type="text"
                                      placeholder="Answer"
                                      name="answer"
                                      onChange={this.handleChange(2)}
                                    />
                                    <Form.Control.Feedback type="invalid">
                                      {errors.answer}
                                    </Form.Control.Feedback>
                                  </Col>
                                  <Col md = "2">
                                  <input type="radio" name="option" value="3" onChange = {this.changeHandler}/>
                                  </Col>
                                </Row>
                                <Row>
                                  <Col md="10">
                                    <Form.Control
                                      className={classnames({
                                        "is-invalid": errors.answer
                                      })}
                                      type="text"
                                      placeholder="Answer"
                                      name="answer"
                                      onChange={this.handleChange(3)}
                                    />
                                    <Form.Control.Feedback type="invalid">
                                      {errors.answer}
                                    </Form.Control.Feedback>
                                  </Col>
                                  <Col md = "2">
                                  <input type="radio" name="option" value="1" onChange = {this.changeHandler}/>
                                  </Col>
                                </Row>
                              </Col>
                             
                                      
                                      
                            </Row>
                            <Row>
                            <Col md="12"><h6>(check the correct answer)</h6></Col> 
                              </Row>          
                          </Col>
                        </Row>
                      </Form.Group>

                      <Form.Group>
                        <Row>
                          <Col>
                            <Button
                              className="col-sm-2"
                              variant="primary"
                              type="submit"
                            >
                              Submit Question
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
}
// const mapActionToProps = dispatch => ({
//   login: () => dispatch(login()),
//   auth: payload => dispatch(auth(payload))
// });
export default withRouter(AddQuizQuestion);
// export default connect(
//   null,
//   mapActionToProps
// )(withRouter(AddCategory));
