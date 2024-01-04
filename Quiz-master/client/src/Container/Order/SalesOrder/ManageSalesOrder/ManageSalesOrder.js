import React from "react";
import { withRouter } from "react-router-dom";
import Spinner from "../../../../UI/Spinner/Spinner";
import checkPermission from "../../../../Utility/checkPermission";
import SLUGS from "../../../../config/SLUGS";
import { MDBDataTable } from "mdbreact";
import { Row, Col, Container, Card } from "react-bootstrap";
import Navbar from "../../../../UI/Navbar/Navbar";
import Sidebar from "../../../../UI/Sidebar/Sidebar";
import axios from "axios";
import getIp from "../../../../Utility/getIp";
import Routes from "../../../../config/Routes";
import STATUS from "../SalesStatusUtility";
const dataTableData = {
  columns: [
    {
      label: "Sales order#",
      field: "orderId",
      sort: "asc"
    },
    {
      label: "Customer Name",
      field: "customerName",
      sort: "asc"
    },
    {
      label: "Order Status",
      field: "orderStatus",
      sort: "asc"
    },
    {
      label: "Amount",
      field: "amount",
      sort: "asc"
    },
    {
      label: "Order Date",
      field: "orderDate",
      sort: "asc"
    },
    {
      label: "Expected Shipment Date",
      field: "expectedShipmentDate",
      sort: "asc"
    },
    {
      label: "Created By",
      field: "createdBy",
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
class ManageSalesOrder extends React.Component {
  state = {
    errors: "",
    loading: true,
    ordersList: ""
  };
  componentDidMount = async () => {
    let isAuthorized = await checkPermission(SLUGS.MANAGE_SALES_ORDER);
    if (!isAuthorized) {
      this.props.history.push(Routes.UNAUTHORIZED);
    }

    this.setState({ ip: await getIp() });
    await axios
      .post("/api/salesorders/all", { ip: this.state.ip })
      .then(res => {
        if (res.data.error) {
          // this.setState({ errors: { email: res.data.error } });
        } else {
          this.setState({ ordersList: res.data });
        }
      })
      .catch(err => {});
    dataTableData.rows = [];
    for (let order of this.state.ordersList) {
      let orderStatus = order.orderStatus.toUpperCase();
      dataTableData.rows.push({
        orderId: order.orderId,
        customerName: order.customerName,
        orderStatus: (
          <label className={STATUS[orderStatus]} style={{ fontSize: ".9rem" }}>
            {orderStatus}
          </label>
        ),
        amount: "Rs." + order.amount,
        orderDate: order.orderDate.split(" ")[0],
        expectedShipmentDate: order.expectedShipmentDate.split(" ")[0],
        createdBy: order.createdBy,
        action: (
          <button
            className="btn btn-outline-primary"
            id={order.orderId}
            onClick={this.viewHandler}
          >
            <i
              className="fas fa-eye"
              id={order.orderId}
            />
          </button>
        )
      });
    }
    this.setState({ loading: false });
  };
  viewHandler = e => {
    this.props.history.push(`${Routes.VIEW_SALES_ORDER}/${e.target.id}`);
  };
  render() {
    let display = <Spinner />;
    if (!this.state.loading) {
      display = (
        <>
          <Navbar />
          <Container
            fluid
            className="d-flex m-0 p-0
            "
            style={{ position: "relative", width: "100vw" }}
          >
            <Sidebar />
            <Container
              fluid
              style={{ margin: "0", padding: "0", background: "#eeeeee" }}
            >
              <Row noGutters>
                <Col className="p-3 m-2">
                  <h2>Sales orders</h2>
                  <hr />
                  <Card>
                    <Card.Body>
                      <MDBDataTable
                        id="salesOrders"
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

export default withRouter(ManageSalesOrder);
