import React, { Component } from "react";
import axios from "axios";
import {
  Form,
  Button,
  Container,
  Row,
  Col,
  Card
} from "react-bootstrap";
import Sidebar from "../../../UI/Sidebar/Sidebar";
import { connect } from "react-redux";
import Navbar from "../../../UI/Navbar/Navbar";
import { login } from "../../../Action/loginAction";
import { auth } from "../../../Action/authAction";
import Spinner from "../../../UI/Spinner/Spinner";
import getIp from "../../../Utility/getIp";
import TreeNode from "../../../TreeNode/TreeNode";
import { withRouter } from "react-router-dom";
import Modal from "../../../UI/Modal/messageModal";
import SLUGS from "../../../config/SLUGS";
import Routes from "../../../config/Routes";
import checkPermission from "../../../Utility/checkPermission";
class ModulePermission extends Component {
  state = {
    loading: true,
    errors: "",
    ip: null,
    show: false,
    message: "",
    tree: "",
    permissions: "",
    alertVariant: "danger",
  };
  checkedNodes = {};
  changeHandler = event => {
    this.setState({ [event.target.name]: event.target.value, errors: "" });
  };
  permissionHandler = e => {
    let moduleCheckbox = e.target;
    let isChecked = moduleCheckbox.checked;
    let childNodes = document.querySelectorAll(
      `[data-parent="${moduleCheckbox.id}"]`
    );
    //Adding the parent
    this.manageCheckedNodes(moduleCheckbox, isChecked);
    for (let child of childNodes) {
      child.checked = isChecked;
      this.manageCheckedNodes(child, isChecked);
      this.propagateSelection(child.id, child.checked);
    }
  };
  manageCheckedNodes = (moduleCheckbox, isChecked) => {
    //Only child modules should be added as permissions
    if (isChecked) {
      this.checkedNodes[moduleCheckbox.id] =
        moduleCheckbox.nextElementSibling.innerText;
    } else {
      delete this.checkedNodes[moduleCheckbox.id];
    }
  };
  propagateSelection = (id, isParentSelected) => {
    let childNodes = document.querySelectorAll(`[data-parent="${id}"]`);
    if (childNodes.length === 0) return;
    else {
      for (let child of childNodes) {
        child.checked = isParentSelected;
        this.manageCheckedNodes(child, isParentSelected);
        this.propagateSelection(child.id, isParentSelected);
      }
    }
  };
  selectAllModules = e => {
    let checkAll = e.target.checked;
    const parentModules = document.querySelectorAll(`[data-parent='0']`);
    //Making sure that the child nodes are not selected since all parents are already selected
    this.checkedNodes = {};
    parentModules.forEach(parent => {
      parent.checked = checkAll;
      if (checkAll) {
        this.checkedNodes[parent.id] = document.getElementById(
          `${parent.id}`
        ).nextElementSibling.innerText;
      }
      this.propagateSelection(parent.id, checkAll);
    });
  };

  componentDidMount = async () => {
    let isAuthorized =
      (await checkPermission(SLUGS.MANAGE_PERMISSIONS)) &&
      this.props.authData.user.role === 3;
    if (!isAuthorized) {
      this.props.history.push(Routes.UNAUTHORIZED);
    }

    await axios
      .get("/api/modules/")
      .then(res => {
        if (res.data.type === "error") {
          this.setState(
            {
              message: res.data.message,
              alertVariant: "danger"
            },
            () => {
              this.showAlerts();
            }
          );
        } else {
          this.setState({ tree: res.data });
        }
      })
      .catch(err => {
        console.log(err);
      });
    this.setState({ ip: await getIp(), loading: false });
  };
  checkPermissionsFromDatabase = async () => {
    let id = this.props.match.params.id;
    await axios
      .get(`/api/modules/permissions/${id}`)
      .then(res => {
        if (res.data.type === "error") {
          this.setState(
            {
              message: res.data.message,
              alertVariant: "danger"
            },
            () => {
              this.showAlerts();
            }
          );
        } else {
          let permissions = res.data;
          permissions.forEach(permission => {
            {
              let moduleCheckbox = document.getElementById(`${permission}`);
              moduleCheckbox.checked = true;
              // this.propagateSelection(permission, true);
              this.manageCheckedNodes(moduleCheckbox, true);
            }
          });
        }
      })
      .catch(err => {
        console.log(err);
      });
  };
  validatePermissions = async permissions => {
    return await axios
      .get("/api/modules/unordered")
      .then(res => {
        let moduleList = res.data;
        for (let moduleItem of moduleList) {
          if (
            this.checkedNodes.hasOwnProperty(moduleItem.id) &&
            this.checkedNodes[moduleItem.id].parent === "0"
          ) {
            delete this.checkedNodes[moduleItem.parent];
          }
        }
        return { isValid: true };
      })
      .catch(err => {
      });
  };
  setPermissions = async () => {
    let { isValid, errors } = await this.validatePermissions(this.checkedNodes);
    let userId = this.props.match.params.id;
    if (isValid) {
      await axios
        .post(`/api/modules/permissions/${userId}`, {
          permissions: this.checkedNodes,
          ip: this.state.ip
        })
        .then(res => {
          if (res.data.type === "success") {
            this.setState(
              { message: res.data.message, alertVariant: "success" },
              () => {
                this.showAlerts();
              }
            );
          } else {
            this.setState(
              {
                message: res.data.message,
                alertVariant: "danger"
              },
              () => {
                this.showAlerts();
              }
            );
          }
        });
    } else {
      this.setState({errors:errors, loading: false });
    }
  };
  showAlerts = () => {
    this.setState({ show: true });
  };
  modalClose = () => {
    this.setState({ show: false });
  };

  clearSelection = () => {
    document.querySelector("#checkAll").checked = false;
    this.checkedNodes = {};
    const parentModules = document.querySelectorAll(`[data-parent='0']`);
    //Making sure that the child nodes are not selected since all parents are already selected
    parentModules.forEach(parent => {
      parent.checked = false;
      this.propagateSelection(parent.id, false);
    });
  };
  render() {
    let display = <Spinner />;
    //TODO: Errors in setting permission
    // let errors = this.state.errors;
    if (!this.state.loading) {
      this.checkPermissionsFromDatabase();
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
                  <h2>Permission management</h2>
                </div>
                <hr />{" "}
                <Card>
                  <Card.Body>
                    <h5>Permission management</h5>
                    <p style={{ fontSize: ".9rem", color: "#ACACAC" }}>
                      Use this form to grant or revoke permissions
                    </p>

                    <Form>
                      <Row className="justify-content-center">
                        <Col md="2 d-flex align-items-center">
                          <div class="custom-control custom-checkbox">
                            <input
                              type="checkbox"
                              class="custom-control-input"
                              id="checkAll"
                              onChange={this.selectAllModules}
                            />

                            <label class="custom-control-label" for="checkAll">
                              Select All
                            </label>
                          </div>
                        </Col>
                        <Col>
                          <div>
                            <Button onClick={this.clearSelection}>
                              Clear All
                            </Button>
                          </div>
                        </Col>
                      </Row>
                    </Form>
                    <hr />
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "column"
                      }}
                    >
                      {this.state.tree.length > 0
                        ? this.state.tree.map(node => (
                            <div
                              className="p-2 m-2 bg-light"
                              style={{ maxWidth: "300px" }}
                            >
                              {TreeNode({
                                node: node,
                                children: node.children,
                                permissionHandler: this.permissionHandler
                              })}
                            </div>
                          ))
                        : ""}
                    </div>
                    <Button onClick={this.setPermissions}>
                      Set Permissions
                    </Button>
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
const mapActionToProps = dispatch => ({
  login: () => dispatch(login()),
  auth: payload => dispatch(auth(payload))
});
const mapStateToProps = state => ({
  authData: state.auth
});
export default connect(
  mapStateToProps,
  mapActionToProps
)(withRouter(ModulePermission));
