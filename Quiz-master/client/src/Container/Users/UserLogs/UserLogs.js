import React from "react";
import axios from "axios";
import { MDBDataTable } from "mdbreact";
import Navbar from "../../../UI/Navbar/Navbar";
import Sidebar from "../../../UI/Sidebar/Sidebar";
import { Container, Row, Col, Card } from "react-bootstrap";
import Spinner from "../../../UI/Spinner/Spinner";
import getIp from "../../../Utility/getIp";
import { withRouter } from "react-router-dom";
import Routes from "../../../config/Routes";
import checkPermission from "../../../Utility/checkPermission";
import SLUGS from "../../../config/SLUGS";
const dataTableData = {
  columns: [
    {
      label: "User",
      field: "user"
    },
    {
      label: "Action",
      field: "action"
    },
    {
      label: "Date / Time",
      field: "timestamp",
      sort: "desc"
    },
    {
      label: "Ip",
      field: "ip"
    }
  ],
  rows: []
};

class UserLogs extends React.Component {
  state = {
    ip: null,
    logs: "",
    loading: true
  };

  componentDidMount = async () => {
    let isAuthorized = await checkPermission(SLUGS.USER_LOGS);
    if (!isAuthorized) {
      this.props.history.push(Routes.UNAUTHORIZED);
    }
    this.setState({ ip: await getIp() });
    await axios
      .post("/api/utility/logs", { ip: this.state.ip })
      .then(res => {
        this.setState({ logs: res.data.logs });
      })
      .catch(err => {});
    dataTableData.rows = [];
    for (let log of this.state.logs) {
      dataTableData.rows.push({
        user: log.user,
        action: log.action,
        timestamp: log.timestamp,
        ip: log.ip
      });
    }
    this.setState({ loading: false });
  };
  render() {
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
                  <h2>User's activity Logs</h2>
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
export default withRouter(UserLogs);
