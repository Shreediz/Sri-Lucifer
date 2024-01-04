import React, { Component } from "react";
import Navbar from "../../../UI/Navbar/Navbar";
import Axios from "axios";
import setAuthToken from "../../../Utility/setauth";
import { login } from "../../../Action/loginAction";
import { checkin } from "../../../Action/checkAction";

import jwt_decode from "jwt-decode";
import { auth } from "../../../Action/authAction";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { MDBDataTable } from "mdbreact";
import { Container, Row, Col ,Card} from "react-bootstrap";
import Spinner from "../../../UI/Spinner/Spinner";
import Sidebar from "../../../UI/Sidebar/Sidebar";

const dataTableData = {
  columns: [
    {
      label: "S.No",
      field: "sno",
      sort: "asc"
    },
    {
      label: "Date",
      field: "date",
      sort: "asc"
    },
    {
      label: "Check In Time",
      field: "checkInTime",
      sort: "asc"
    },
    {
      label: "Check Out Time",
      field: "checkOutTime",
      sort: "asc"
    },
    {
      label: "Total Time Work",
      field: "totalTimeWork",
      sort: "asc"
    }
  ],
  rows: []
};

class UserDashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: "",
      loading: true
    };
  }
  componentDidMount = async () => {
    if (localStorage.token) {
      setAuthToken(localStorage.token);
      const decode = jwt_decode(localStorage.token);
      this.props.auth(decode);
      this.props.login();
      this.props.checkin();
    }
    await Axios.get("http://localhost:5000/api/shift/checktime")
      .then(res => {
        let proxyData = res.data;
        for (let data of proxyData) {
          if (!data.checkout) data.checkout = "*";
        }
        this.setState({ data: proxyData });
      })
      .catch(err => console.log(err));

    let i = 0;
    dataTableData.rows = [];
    for (let record of this.state.data) {
      i++;
      let date = record.checkin.split(" ");
      let inTime = record.checkin;
      let outTime = record.checkout;
      let totalTime, outDateTime;
      if (record.checkout === "*") {
        totalTime = outDateTime = "*";
      } else {
        outDateTime = record.checkout.split(" ")[1];
        totalTime = this.getTotalTime({ inTime, outTime });
      }
      // console.log("Call 3:Total Time", totalTime);
      dataTableData.rows.push({
        sno: i,
        date: date[0],
        checkInTime: date[1],
        checkOutTime: outDateTime,
        totalTimeWork: totalTime
      });
    }
    this.setState({ loading: false });
  };
  getTotalTime = ({ inTime, outTime }) => {
    let endDates = new Date(outTime);
    let startDates = new Date(inTime);
    let differnceInSeconds = (endDates.getTime() - startDates.getTime()) / 1000;
    let { hourformat, minuteformat, secondformat } = this.secondToHMS(
      differnceInSeconds
    );
    let totalTime = hourformat ? `${hourformat} : ` : "";
    totalTime += `${minuteformat} : ${secondformat}`;
    return totalTime;
  };

  secondToHMS = differnceInSeconds => {
    let h = Math.floor(differnceInSeconds / 3600);
    let m = Math.floor((differnceInSeconds % 3600) / 60);
    let s = Math.floor((differnceInSeconds % 3600) % 60);
    let hourformat = h > 0 ? h + (h === 1 ? " hour " : " hours ") : "";
    let minuteformat = m > 0 ? m + (m === 1 ? " minute " : " minutes ") : "00";
    let secondformat = s > 0 ? s + (s === 1 ? " second" : " seconds") : "00";
    return { hourformat, minuteformat, secondformat };
  };

  render() {
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
                  <h2>Work history</h2>
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
          </section>
        </>
      );
    }
    return <>{display}</>;
  }
}

const mapActionToProps = dispatch => ({
  checkin: () => dispatch(checkin()),
  login: () => dispatch(login()),
  auth: payload => dispatch(auth(payload))
});

const mapStateToProps = state => ({
  authData: state.auth
});

export default connect(
  mapStateToProps,
  mapActionToProps
)(withRouter(UserDashboard));
