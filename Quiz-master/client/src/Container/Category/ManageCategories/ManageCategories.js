import React, { Component } from "react";
import axios from "axios";
import { Container, Row, Col, Card } from "react-bootstrap";
import Sidebar from "../../../UI/Sidebar/Sidebar";
import Navbar from "../../../UI/Navbar/Navbar";
import Spinner from "../../../UI/Spinner/Spinner";
import getIp from "../../../Utility/getIp";
import checkPermission from "../../../Utility/checkPermission";
import Routes from "../../../config/Routes";
import SLUGS from "../../../config/SLUGS";
import Modal from "../../../UI/Modal/messageModal";
import { MDBDataTable } from "mdbreact";
import { withRouter } from "react-router-dom";
const dataTableData = {
  columns: [
    {
      label: "No",
      field: "no",
      sort: "asc"
    },
    {
      label: "Category",
      field: "category",
      sort: "asc"
    },
    {
      label: "Options",
      field: "options"
    }
  ],
  rows: []
};
class ManageCategories extends Component {
  state = {
    loading: true,
    ip: null,
    show: false,
    message: "",
    categories: ""
  };
  changeHandler = event => {
    this.setState({ [event.target.name]: event.target.value });
  };
  loadData = async () => {
    await axios
      .get("/api/category")
      .then(results => {
        if (results.data.type === "error") {
          this.props.history.push(Routes.UNAUTHORIZED);
        }
        this.setState({ categories: results.data });
      })
      .catch(err => {});
  };
  populateDataTable = () => {
    let i = 1;
    dataTableData.rows = [];
    for (let category of this.state.categories) {
      let optionsList = [];
      optionsList.push(
        <button
          className="btn btn-outline-primary"
          data-slug={category.slug}
          onClick={event => {
            event.persist();
            this.editCategory(event);
          }}
        >
          <i data-slug={category.slug} className="fas fa-edit" />
        </button>
      );
      optionsList.push(
        <button
          className="btn btn-outline-danger"
          data-slug={category.slug}
          onClick={event => {
            // event.persist();
            this.deleteCategory(event);
          }}
        >
          <i data-slug={category.slug} className="fas fa-trash" />
        </button>
      );

      dataTableData.rows.push({
        no: i++,
        category: category.name,
        options: optionsList
      });
    }
  };
  componentDidMount = async () => {
    let isAuthorized = await checkPermission(SLUGS.MANAGE_CATEGORIES);
    if (!isAuthorized) {
      this.props.history.push(Routes.UNAUTHORIZED);
    }
    await this.loadData();
    await this.populateDataTable();
    this.setState({ ip: await getIp() });
    this.setState({ loading: false });
  };
  editCategory = event => {
    let slug = event.target.dataset.slug;
    if (slug) {
      this.props.history.push(`${Routes.EDIT_CATEGORY}/${slug}`);
    } else {
      alert("Oops! Something went wrong");
    }
  };
  deleteCategory = async event => {
    let slug = event.target.dataset.slug;
    if (slug) {
      await axios
        .delete(`/api/category/${slug}`)
        .then(async res => {
          if (res.data.type === "success") {
            await this.setState(
              {
                message: res.data.message,
                alertVariant: "success"
              },
              async () => {
                this.showAlerts();
              }
            );
            this.setState({ loading: true });
            await this.loadData();
            await this.populateDataTable();
            this.setState({ loading: false });
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
        })
        .catch(err => {
          console.log(err);
        });
    } else {
      alert("Oops! Something went wrong");
    }
  };
  showAlerts = () => {
    this.setState({ show: true });
  };
  modalClose = () => {
    this.setState({ show: false });
  };

  render() {
    let display = <Spinner />;
    if (!this.state.loading)
      display = (
        <>
          <Navbar />
          <Container
            fluid
            style={{ margin: "0", padding: "0", background: "#eeeeee" }}
          >
            <Row>
              <Sidebar />
              <Col className="p-3 m-2">
                <div className="mt-2">
                  <h2>Categories List</h2>
                </div>
                <hr />
                <Card>
                  <Card.Body>
                    <h5>Manage Category</h5>
                    <p style={{ fontSize: ".9rem", color: "#ACACAC" }}>
                      Select category you want to edit or delete from the table
                      below
                    </p>
                    <MDBDataTable
                      responsive
                      striped
                      hover
                      data={dataTableData}
                      searching={true}
                    />
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
export default withRouter(ManageCategories);
// export default connect(
//   null,
//   mapActionToProps
// )(withRouter(AddCategory));
