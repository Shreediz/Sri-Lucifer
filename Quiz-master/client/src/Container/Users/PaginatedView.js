import React, { Component } from "react";
import axios from "axios";
import { connect } from "react-redux";
import { auth } from "../../Action/authAction";
import { Container, Row, Col, Card } from "react-bootstrap";
import { MDBDataTable } from "mdbreact";
import Navbar from "../../UI/Navbar/Navbar";
import Sidebar from "../../UI/Sidebar/Sidebar";
import { login } from "../../Action/loginAction";
import { withRouter } from "react-router-dom";
import setAuthToken from "../../Utility/setauth";
import jwt_decode from "jwt-decode";
import Spinner from "../../UI/Spinner/Spinner";
import Modal from "../../UI/Modal/Modal";
import SLUGS from "../../config/SLUGS";
import checkPermission from "../../Utility/checkPermission";

let actions = [
  {
    class: "fas fa-eye",
    type: "view"
  },
  {
    class: "fas fa-edit",
    type: "edit"
  }
];
const dataTableData = {
  columns: [
    {
      label: "S.No",
      field: "sno",
      sort: "asc"
    },
    {
      label: "Name",
      field: "name",
      sort: "asc"
    },
    {
      label: "Email",
      field: "email",
      sort: "asc"
    },
    {
      label: "Mobile",
      field: "mobile",
      sort: "asc"
    },
    // {
    //   label: "Registration Date",
    //   field: "registration",
    //   sort: "asc"
    // },
    {
      label: "User Status",
      field: "userStatus",
      sort: "asc"
    },
    // {
    //   label: "Login Status",
    //   field: "loginStatus",
    //   sort: "asc"
    // },
    {
      label: "Actions",
      field: "actions",
      sort: "asc"
    }
  ],
  rows: []
};
class PaginatedView extends Component {
  state = {
    data: "",
    loading: true,
    modalShow: false,
    action: "",
    id: ""
  };

  async componentDidMount() {
    let isEditAuthorized = await checkPermission(SLUGS.EDIT_USER);
    let isManagePermissionAuthorized = await checkPermission(
      SLUGS.MANAGE_PERMISSIONS
    );
    // alert(isAuthorized)
    // if (!isAuthorized) {
    //   this.props.history.replace(Routes.UNAUTHORIZED);
    // }
    // if (this.props.auth.role !== 3) {
    //   this.props.history.push(Routes.UNAUTHORIZED);
    // }

    await axios
      .get("/api/users/dashboard")
      .then(res => {
        this.setState({
          data: res.data,
        });
      })
      .catch(err => {});
    if (localStorage.token) {
      setAuthToken(localStorage.token);
      const decode = jwt_decode(localStorage.token);
      this.props.auth(decode);
      this.props.login();
    }

    dataTableData.rows = [];
    for (let user of this.state.data) {
      let optionsList = [];
      if (isEditAuthorized) {
        for (let j = 0; j < actions.length; j++) {
          optionsList.push(
            <>
              <button
                className="btn btn-outline-primary"
                onClick={event => {
                  event.persist();
                  this.actionHandler(actions[j].type, event);
                }}
                data-id={user.id}
              >
                <i
                  className={actions[j].class}
                  data-id={user.id}
                  onClick={event => {
                    event.persist();
                    this.actionHandler(actions[j].type, event);
                  }}
                />
              </button>
            </>
          );
        }
      }
      if (isManagePermissionAuthorized) {
        optionsList.push(
          <button
            className="btn btn-outline-primary"
            data-id={user.id}
            onClick={event => {
              event.persist();
              this.actionHandler("", event);
            }}
          >
            <i
              data-id={user.id}
              onClick={event => {
                event.persist();
                this.actionHandler("", event);
              }}
              className="fas fa-fw fa-key"
            />
          </button>
        );
      }
      dataTableData.rows.push({
        sno: user.id,
        name: user.firstname + " " + user.lastname,
        email: user.email,
        mobile: user.mobile,
        userStatus: user.userStatus,
        actions: optionsList
      });
    }
    this.setState({ loading: false });
  }
  editUser = id => {
    this.props.history.push(`/users/edit/${id}`);
  };
  viewUser = id => {
    this.modalShow();
    this.setState({ action: "View", id });
  };

  modalClose = () => {
    this.setState({ modalShow: false });
  };

  modalShow = () => {
    this.setState({ modalShow: true });
  };

  actionHandler = (type = "", event) => {
    event.preventDefault();
    const id = event.target.dataset.id;
    switch (type) {
      case "view":
        this.viewUser(id);
        break;
      case "edit":
        this.editUser(id);
        break;
      default:
        this.props.history.push(`/permissions/${id}`);
    }
  };
  render() {
    //Add a spinner here
    let display = <Spinner />;
    if (!this.state.loading) {
      display = (
        <>
          <Navbar />
          <section
            className="d-flex"
            style={{ position: "relative", width: "100vw" }}
          >
            <Sidebar />
            <Container
              fluid
              style={{ margin: "0", padding: "0", background: "#eeeeee" }}
            >
              <Row noGutters>
                <Col className="p-3 m-2">
                  <h2>Users List</h2>
                  <hr />
                  <Card>
                    <Card.Body>
                      <MDBDataTable
                        responsive
                        striped
                        hover
                        data={dataTableData}
                        searching={true}
                      />
                    </Card.Body>
                  </Card>{" "}
                </Col>
              </Row>
            </Container>

            <Modal
              show={this.state.modalShow}
              close={this.modalClose}
              action={this.state.action}
              id={this.state.id}
            />
          </section>
          {/* // </Container> */}
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
)(withRouter(PaginatedView));
