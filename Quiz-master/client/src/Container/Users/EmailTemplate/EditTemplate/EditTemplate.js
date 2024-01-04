import React from "react";
import { Editor } from "@tinymce/tinymce-react";
import { withRouter } from "react-router-dom";
import editEmailTemplate from "../../../../Validator/editEmailTemplate";
import Spinner from "../../../../UI/Spinner/Spinner";
import checkPermission from "../../../../Utility/checkPermission";
import SLUGS from "../../../../config/SLUGS";
import {
  Row,
  Col,
  Form,
  Button,
  Container,
  Card,
  Table
} from "react-bootstrap";
import Navbar from "../../../../UI/Navbar/Navbar";
import Sidebar from "../../../../UI/Sidebar/Sidebar";
import axios from "axios";
import getIp from "../../../../Utility/getIp";
import Routes from "../../../../config/Routes";
import Modal from "../../../../UI/Modal/messageModal";
import classnames from "classnames";
class EditTemplate extends React.Component {
  state = {
    show: false,
    body: "",
    hook: "",
    ip: "",
    name: "",
    title: "",
    loading: true,
    errors: "",
    alertVariant: ""
  };
  showAlerts = () => {
    this.setState({ show: true });
  };
  modalClose = () => {
    this.setState({ show: false });
  };
  changeHandler = e => {
    this.setState({ [e.target.name]: e.target.value });
  };
  componentDidMount = async () => {
    let isAuthorized = await checkPermission(SLUGS.EMAIL_TEMPLATES);
    if (!isAuthorized) {
      this.props.history.push(Routes.UNAUTHORIZED);
    }

    this.setState({ ip: await getIp() });
    await axios
      .get(`/api/utility/emails/${this.props.match.params.id}`)
      .then(res => {
        if (res.data.errors) {
          this.setState({ errors: res.data.errors });
        } else {
          this.setState({
            hook: res.data.template[0].hook,
            title: res.data.template[0].email_subject,
            name: res.data.template[0].template_name,
            body: res.data.template[0].email_body,
            loading: false
          });
        }
      })
      .catch(err => {});
  };

  update = e => {
    e.preventDefault();
    const { errors, isValid } = editEmailTemplate(this.state);
    if (isValid) {
      axios
        .put(`/api/utility/emails/${this.props.match.params.id}`, this.state)
        .then(res => {
          if (res.data.error) {
            this.setState({ errors: errors });
          } else if (res.data.type === "success") {
            this.setState(
              { message: res.data.message, alertVariant: "success" },
              () => {
                this.showAlerts();
              }
            );
          } else if (res.data.type === "error") {
            this.setState(
              {
                message: res.data.message,
                alertVariant: "danger"
              },
              () => {
                this.showAlerts();
              }
            );
          } else this.setState({ errors: "" });
        })
        .catch(err => {
          console.log("Error ", err);
        });
    } else {
      alert("invalid");
      this.setState({ errors: errors });
    }
  };
  handleEditorChange = (body, editor) => {
    this.setState({ body });
  };

  render() {
    let { errors } = this.state;
    let display = <Spinner border="animation" />;
    if (!this.state.loading) {
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
                  <h2>Edit email templates</h2>
                </div>
                <hr />
                <Card>
                  <Card.Body>
                    <h5>Edit email Template</h5>
                    <p style={{ fontSize: ".9rem", color: "#ACACAC" }}>
                      Use this form to update email temlate
                    </p>
                    <Form className="needs-validation">
                      <Form.Group>
                        <Row>
                          <Col>
                            <Form.Label>Name</Form.Label>
                            <Form.Control
                              className={classnames({
                                "is-invalid": errors.name
                              })}
                              type="text"
                              value={this.state.name}
                              name="name"
                              onChange={this.changeHandler}
                            />
                            <Form.Control.Feedback type="invalid">
                              {errors.name}
                            </Form.Control.Feedback>
                          </Col>
                          <Col>
                            <Form.Label>Title</Form.Label>
                            <Form.Control
                              className={classnames({
                                "is-invalid": errors.title
                              })}
                              type="text"
                              value={this.state.title}
                              name="title"
                              onChange={this.changeHandler}
                            />
                            <Form.Control.Feedback type="invalid">
                              {errors.title}
                            </Form.Control.Feedback>
                          </Col>
                        </Row>
                      </Form.Group>
                      <Form.Group>
                        <h6>Legends</h6>
                        <Table striped bordered hover>
                          <thead>
                            <tr>
                              <td>[SITE_URL]</td>
                              <td>The URL to your site.</td>{" "}
                            </tr>
                            <tr>
                              <td>[SITE_EMAIL]</td>
                              <td>The contact/support email of your site.</td>
                            </tr>
                            <tr>
                              <td>[SITE_NAME]</td>
                              <td>The name of your site.</td>{" "}
                            </tr>
                            <tr>
                              <td>[EMAIL_LINK]</td>
                              <td>
                                The email link specified for this particular
                                email.
                              </td>
                            </tr>
                          </thead>
                        </Table>
                      </Form.Group>
                      <Form.Group>
                        <Form.Label>Edit Template</Form.Label>
                        <Editor
                         
                          apiKey="3s1spnp2gdgqe2tt5nzzgauiqkgei7fc9173qyjjdzms0lmb"
                          init={{
                            height: "30rem",
                            plugins: "link image code",
                            branding: false,
                            toolbar:
                              "undo redo | bold italic | alignleft aligncenter alignright | code"
                          }}
                          initialValue={this.state.body}
                          onEditorChange={this.handleEditorChange}
                        />
                      </Form.Group>
                      <Button variant="primary" onClick={this.update}>
                        Submit
                      </Button>{" "}
                    </Form>{" "}
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

    return <>{display}</>;
  }
}

export default withRouter(EditTemplate);
