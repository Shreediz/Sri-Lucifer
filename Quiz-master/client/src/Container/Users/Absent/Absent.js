import React, { Component } from "react";
import Modal from "../../../UI/Modal/messageModal";
import {
  Container,
  Row,
  Col,
  Form,
  Button,
  FormControl,
  Card
} from "react-bootstrap";
import Spinner from "../../../UI/Spinner/Spinner";
import { MDBDataTable } from "mdbreact";
import Axios from "axios";
import Navbar from "../../../UI/Navbar/Navbar";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import Sidebar from "../../../UI/Sidebar/Sidebar";
import Routes from "../../../config/Routes";
import checkPermission from "../../../Utility/checkPermission";
import SLUGS from "../../../config/SLUGS";
const dataTableData = {
  columns: [
    {
      label: "S.no",
      field: "sno",
      sort: "asc"
    },
    { label: "Date", field: "dates", sort: "asc" },
    {
      label: "First Name",
      field: "firstName",
      sort: "asc"
    },
    {
      label: "Last Name",
      field: "lastname",
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
    }
  ],
  row: []
};

class Absent extends Component {
  state = {
    data: "",
    loading: true,
    displayShift: "",
    displayToDate: "",
    displayFromDate: "",
    shift: "all",
    shifts: "",
    todate: "null",
    fromdate: "null",
    alertVariant: "danger",
    message: ""
  };

  showAlerts = () => {
    this.setState({ show: true });
  };
  modalClose = () => {
    this.setState({ show: false });
  };

  componentDidMount = async () => {
    let isAuthorized = await checkPermission(SLUGS.ABSENT_REPORT);
    if (!isAuthorized || this.props.authData.user.role === 1) {
      this.props.history.push(Routes.UNAUTHORIZED);
    }

    await Axios.get("/api/utility/add")
      .then(res => {
        this.setState({
          shifts: res.data.shifts
        });
      })
      .catch(err => {
        console.log(err);
      });

    let data = {
      shift: this.state.shift
    };

    await Axios.post("/api/shift/absent", data)
      .then(res => {
        this.setState({ data: res.data });
      })
      .catch(err => {});
    let i = 0;
    dataTableData.rows = [];
    for (let user of this.state.data) {
      i++;

      dataTableData.rows.push({
        sno: i,
        date: user.date.split(" ")[0],
        firstName: user.first_name,
        lastName: user.last_name,
        email: user.email,
        mobile: user.mobile
      });
    }

    this.setState({ loading: false });
  };

  changeHandler = event => {
    this.setState({ [event.target.name]: event.target.value, errors: "" });
  };

  searchAbsentByShift = async () => {
    this.setState({
      loading: true,
      displayShift: this.state.shift,
      displayToDate: this.state.todate,
      displayFromDate: this.state.fromdate
    });

    console.log(this.state);
    let data;

    if (this.state.fromdate === "null") {
      console.log("Here1");
      data = {
        shift: this.state.shift
      };
      await Axios.post("http://localhost:5000/api/shift/absent", data).then(
        res => {
          console.log(res.data);
          this.setState({ data: res.data });
        }
      );
    } else {
      if (new Date(this.state.todate) - new Date(this.state.fromdate) < 0) {
        alert("From cannot be lesser than To");
        this.setState({
          loading: false
        });
        return false;
      }
      //  - this.state.fromdate);

      let data = {
        shift: this.state.shift,
        FromDateOnly: this.state.fromdate.split("T")[0],
        ToDateOnly: this.state.todate.split("T")[0]
      };
      await Axios.post(
        "http://localhost:5000/api/shift/absentOfRangeOfDate",
        data
      ).then(res => {
        console.log(res.data);
        this.setState({ data: res.data });
      });
    }

    let i = 0;
    dataTableData.rows = [];
    for (let user of this.state.data) {
      i++;
      dataTableData.rows.push({
        sno: i,
        date: user.date.split(" ")[0],
        firstName: user.first_name,
        lastName: user.last_name,
        email: user.email,
        mobile: user.mobile
      });
    }
    this.setState({
      loading: false,
      shift: "all",
      todate: "null",
      fromdate: "null"
    });
  };

  render() {
    let utc = new Date().toJSON().slice(0, 10);
    const shiftsOptions = [];
    if (!this.state.loading) {
      let shifts = this.state.shifts;
      for (let Shift of shifts) {
        shiftsOptions.push(<option value={Shift.shift}>{Shift.shift}</option>);
      }
    }
    let display = <Spinner />;
    if (!this.state.loading) {
      display = (
        <>
          <Navbar />
          <section
            class="d-flex"
            style={{ position: "relative", width: "100vw" }}
          >
            <Sidebar />

            <Container
              fluid
              style={{ margin: "0", padding: "0", background: "#eeeeee" }}
            >
              <Row noGutters>
                <Col className="p-3 m-2">
                  <Row className="my-2">
                    <Col className="mt-2">
                      <h2>
                        {this.state.displayShift
                          ? `Absent report for ${this.state.displayShift.toLowerCase()} shift`
                          : `Absent report for all shifts`}
                      </h2>
                    </Col>
                  </Row>
                  <hr />
                  <Card>
                    <Card.Body>
                      <Card.Header>
                        <Form>
                          <Row>
                            <Col sm="12" md="8" lg="3">
                              <Form.Group>
                                <Row>
                                  <Col xs="3">
                                    <Form.Label>Select shift</Form.Label>
                                  </Col>
                                  <Col>
                                    <Form.Control
                                      as="select"
                                      name="shift"
                                      onChange={this.changeHandler}
                                      placeholder={this.state.shift}
                                    >
                                      <option value="all">All Shifts</option>
                                      {shiftsOptions}
                                    </Form.Control>
                                  </Col>
                                </Row>
                              </Form.Group>
                            </Col>{" "}
                            <Col sm="12" md="8" lg="3">
                              <Form.Group>
                                <Row>
                                  <Col>
                                    <Form.Label>From</Form.Label>
                                  </Col>
                                  <Col>
                                    <FormControl
                                      className="form-control"
                                      type="date"
                                      onChange={this.changeHandler}
                                      name="fromdate"
                                      max={utc}
                                    />
                                  </Col>
                                </Row>
                              </Form.Group>
                            </Col>{" "}
                            <Col sm="12" md="8" lg="3">
                              {" "}
                              <Form.Group>
                                <Row>
                                  <Col>
                                    {" "}
                                    <Form.Label>To</Form.Label>
                                  </Col>
                                  <Col>
                                    <FormControl
                                      className="form-control"
                                      type="date"
                                      onChange={this.changeHandler}
                                      name="todate"
                                      max={utc}
                                    />
                                  </Col>
                                </Row>
                              </Form.Group>
                            </Col>
                            <Col sm="12" md="8" lg="3">
                              {" "}
                              <Form.Group>
                                <Button onClick={this.searchAbsentByShift}>
                                  Search
                                </Button>
                              </Form.Group>
                            </Col>
                          </Row>{" "}
                        </Form>
                      </Card.Header>
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
              </Row>{" "}
            </Container>
            <Modal
              show={this.state.show}
              close={this.modalClose}
              variant={this.state.alertVariant}
              message={this.state.message}
            />
          </section>
        </>
      );
    }

    return <>{display}</>;
  }
}

const mapStateToProps = state => ({
  authData: state.auth,
  check: state.check
});

export default connect(mapStateToProps)(withRouter(Absent));
