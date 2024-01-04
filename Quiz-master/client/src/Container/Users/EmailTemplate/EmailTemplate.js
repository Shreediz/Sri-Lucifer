import React from "react";

import { Container, Row, Col, Card } from "react-bootstrap";
import Navbar from "../../../UI/Navbar/Navbar";
import Sidebar from "../../../UI/Sidebar/Sidebar";
import axios from "axios";
import { MDBDataTable } from "mdbreact";
import { withRouter } from "react-router-dom";
import Spinner from "../../../UI/Spinner/Spinner";
import getIp from "../../../Utility/getIp";
import Routes from "../../../config/Routes";
import checkPermission from "../../../Utility/checkPermission";
import SLUGS from "../../../config/SLUGS";
// import 'tinymce/themes/silver';
// import 'tinymce/plugins/paste';
// import 'tinymce/plugins/link';
const dataTableData = {
  columns: [
    {
      label: "Name",
      field: "name",
      sort: "asc"
    },
    {
      label: "Title",
      field: "title",
      sort: "asc"
    },
    {
      label: "Action",
      field: "action",
      sort: "asc"
    }
  ],
  rows: []
};
class EmailTemplate extends React.Component {
  state = {
    ip: "",
    templates: "",
    errors: "",
    loading: true
  };
  componentDidMount = async () => {
    let isAuthorized = await checkPermission(SLUGS.EMAIL_TEMPLATES);
    if (!isAuthorized) {
      this.props.history.push(Routes.UNAUTHORIZED);
    }

    this.setState({ ip: await getIp() });
    await axios
      .post("/api/utility/emails", { ip: this.state.ip })
      .then(res => {
        if (res.data.error) {
          this.setState({ errors: { email: res.data.error } });
        } else {
          this.setState({ templates: res.data.emails });
        }
      })
      .catch(err => {});
    dataTableData.rows = [];
    for (let template of this.state.templates) {
      dataTableData.rows.push({
        name: template.template_name,
        title: template.email_subject,
        action: (
          <button
            className="btn btn-outline-primary"
            id={template.hook}
            onClick={this.editHandler}
          >
            <i className="fas fa-cog" />
          </button>
        )
      });
    }
    this.setState({ loading: false });
  };
  editHandler = e => {
    this.props.history.push(`${Routes.EDIT_TEMPLATES}/${e.target.id}`);
  };
  render() {
    let display = <Spinner />;
    if (!this.state.loading) {
      display = (
        <>
          <Navbar />
          <Container
            fluid
            className="d-flex p-0 m-0"
            style={{ position: "relative", width: "100vw" }}
          >
            <Sidebar />
            <Container
              fluid
              style={{ margin: "0", padding: "0", background: "#eeeeee" }}
            >
              <Row noGutters>
                <Col className="p-3 m-2">
                  <h2>Email templates</h2>
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
          </Container>
        </>
      );
    }
    return <>{display}</>;
  }
}

export default withRouter(EmailTemplate);
