import React, { Component } from "react";
import axios from "axios";
import { connect } from "react-redux";
import { auth } from "../../../Action/authAction";
import { Container, Row, Col, Card } from "react-bootstrap";
import Navbar from "../../../UI/Navbar/Navbar";
import Sidebar from "../../../UI/Sidebar/Sidebar";
import { login } from "../../../Action/loginAction";
import { withRouter } from "react-router-dom";
import Spinner from "../../../UI/Spinner/Spinner";
import Modal from "../../../UI/Modal/Modal";
import { MDBDataTable } from "mdbreact";
import SLUGS from "../../../config/SLUGS";
import checkPermission from "../../../Utility/checkPermission";
import Routes from "../../../config/Routes";
const dataTableData = {
  columns: [
    {
      label: "S.no",
      field: "sno",
      sort: "asc"
    },
    {
      label: "Name",
      field: "name",
      sort: "asc"
    },
    {
      label: "Current Stock",
      field: "quantity",
      sort: "asc"
    },
    {
      label: "Re-Order Level",
      field: "reorderLevel",
      sort: "asc"
    }
  ],
  row: []
};
class Dashboard extends Component {
  state = {
    permission: "",
    loading: true,
    modalShow: false,
    products: ""
  };

  async componentDidMount() {
    // let isEditAuthorized = await checkPermission(SLUGS.EDIT_USER);
    // let isManagePermissionAuthorized = await checkPermission(
    //   SLUGS.MANAGE_PERMISSIONS
    // );
    // if (!isEditAuthorized) {
    //   this.props.history.replace(Routes.UNAUTHORIZED);
    // }
    // if (this.props.auth.role !== 3) {
    //   this.props.history.push(Routes.UNAUTHORIZED);
    // }

    await axios
      .get("/api/notification/")
      .then(res => {
        this.setState({ products: res.data });
      })
      .catch(err => {});

    let i = 0;
    dataTableData.rows = [];
    for (let product of this.state.products) {
      i++;

      dataTableData.rows.push({
        sno: i,
        name: product.name,
        quantity: product.quantity,
        reorderLevel: product.reorderLevel
      });
    }

    this.setState({ loading: false });
  }
  modalClose = () => {
    this.setState({ modalShow: false });
  };

  modalShow = () => {
    this.setState({ modalShow: true });
  };

  render() {
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
                  <h2>Dashboard</h2>
                </div>
                <hr />
                <Card>
                  <Card.Body>
                    <Row>
                      <Col xs="12 mb-3" md="6" xl="3">
                        <Card className="border-left-primary shadow h-100 py-2">
                          <Card.Body>
                            <Row className="align-items-center">
                              <Col clasName="mr-2">
                                <div class="text-xs font-weight-bold text-primary text-uppercase mb-1">
                                  Earnings (Monthly)
                                </div>
                                <div class="h5 mb-0 font-weight-bold text-gray-800">
                                  Rs 40,000
                                </div>
                              </Col>
                              <Col xs="auto">
                                <i class="fas fa-calendar fa-2x text-gray-300" />
                              </Col>
                            </Row>
                          </Card.Body>
                        </Card>
                      </Col>
                      <Col xs="12 mb-3" md="6" xl="3">
                        <Card className="border-left-success shadow h-100 py-2">
                          <Card.Body>
                            <Row className="align-items-center">
                              <Col clasName="mr-2">
                                <div class="text-xs font-weight-bold text-success text-uppercase mb-1">
                                  Earnings (Yearly)
                                </div>
                                <div class="h5 mb-0 font-weight-bold text-gray-800">
                                  Rs 22,00,000
                                </div>
                              </Col>
                              <Col xs="auto">
                                <i class="fas fa-dollar-sign fa-2x text-gray-300" />
                              </Col>
                            </Row>
                          </Card.Body>
                        </Card>
                      </Col>
                      <Col xs="12 mb-3" md="6" xl="3">
                        <Card className="border-left-info shadow h-100 py-2">
                          <Card.Body>
                            <Row className="align-items-center">
                              <Col clasName="mr-2">
                                <div class="text-xs font-weight-bold text-info text-uppercase mb-1">
                                  Products(In stock)
                                </div>
                                <div class="h5 mb-0 font-weight-bold text-gray-800">
                                  22
                                </div>
                              </Col>
                              <Col xs="auto">
                                <i class="fas fa-clipboard-list fa-2x text-gray-300" />
                              </Col>
                            </Row>
                          </Card.Body>
                        </Card>
                      </Col>
                      <Col xs="12 mb-3" md="6" xl="3">
                        <Card className="border-left-danger shadow h-100 py-2">
                          <Card.Body>
                            <Row className="align-items-center">
                              <Col clasName="mr-2">
                                <div class="text-xs font-weight-bold text-danger text-uppercase mb-1">
                                  Re-order needed
                                </div>
                                <div class="h5 mb-0 font-weight-bold text-gray-800">
                                  {this.state.products.length}
                                </div>
                              </Col>
                              <Col xs="auto">
                                <i class="fas fa-calendar fa-2x text-gray-300" />
                              </Col>
                            </Row>
                          </Card.Body>
                        </Card>
                      </Col>
                    </Row>

                    <Row>
                      <Col md="6">
                        {this.state.products &&
                        this.state.products.length > 0 ? (
                          <h6>Products requiring Reorder</h6>
                        ) : (
                          ""
                        )}
                        <Card>
                          <Card.Body>
                            {this.state.products &&
                            this.state.products.length > 0 ? (
                              <MDBDataTable
                                responsive
                                striped
                                hover
                                data={dataTableData}
                                searching={true}
                              />
                            ) : (
                              <span className="text-primary">
                                No products require re-ordering
                              </span>
                            )}
                          </Card.Body>
                        </Card>
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
)(withRouter(Dashboard));
