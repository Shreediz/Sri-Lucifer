import React from "react";
import { withRouter } from "react-router-dom";
import Spinner from "../../../../UI/Spinner/Spinner";
import checkPermission from "../../../../Utility/checkPermission";
import SLUGS from "../../../../config/SLUGS";
import { MDBDataTable } from "mdbreact";
import STATUS from "../PurchaseStatusUtility";
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
import ProductPurchaseDetail from "../ManageDraftOrder/ProductPurchaseDetail";
const dataTableData = {
  columns: [
    {
      label: "Purchase order#",
      field: "orderID",
      sort: "asc"
    },
    {
      label: "Supplier Name",
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
    ,
    {
      label: "Order Date",
      field: "orderDate",
      sort: "asc"
    },
    {
      label: "Expected Delivery Date",
      field: "expectedDeliveryDate",
      sort: "asc"
    },
    {
      label: "Created By",
      field: "purchaseBy",
      sort: "asc"
    },
    {
      label: "Action",
      field: "action"
    }
  ],
  rows: []
};
class ManageSalesOrder extends React.Component {
  state = {
    orderDate: "",
    orderID: "",
    supplierName: "",
    orderStatus: "",
    amount: "",
    expectedDelivaryDate: "",
    errors: "",
    createdBy: "",
    loading: true,
    purchaseList: "",
    purchaseDetail: [{}]
  };
  viewHandler = e => {
    console.log("id is ", e.target.id);
    this.props.history.push(`${Routes.VIEW_PURCHASE_ORDER}/${e.target.id}`);
  };
  componentDidMount = async () => {
    let isAuthorized = await checkPermission(SLUGS.MANAGE_PURCHASE_ORDER);
    if (!isAuthorized) {
      this.props.history.push(Routes.UNAUTHORIZED);
    }

    this.setState({ ip: await getIp() });
    await axios
      .post("/api/purchase/purchaseorderdetail", {
        ip: this.state.ip
      })
      .then(res => {
        console.log(res.data.purchaseDetail);

        if (res.data.type === "success") {
          this.setState({ purchaseDetail: res.data.purchaseDetail }, () => {
            console.log("purchaseDetail", this.state.purchaseDetail);
          });
        } else {
          this.setState({ show: true, message: res.data.message });
        }
      })
      .catch(err => {
        console.log("error", err);
      });
    console.log("managePurchaseDetail", this.state.purchaseDetail);
    dataTableData.rows = [];
    for (let order of this.state.purchaseDetail) {
      console.log(order);
      let orderStatus = order.purchase_status.toUpperCase();
      dataTableData.rows.push({
        orderId: order.id,
        supplierName: order.supplier,
        orderStatus: (
          <label className={STATUS[orderStatus]} style={{ fontSize: ".9rem" }}>
            {orderStatus}
          </label>
        ),
        amount: "Rs." + order.total_amount,
        orderDate: order.order_date.split(" ")[0],

        expectedDeliveryDate: order.expected_delivery_date.split(" ")[0],
        createdBy: order.created_by,
        action: (
          <button
            className="btn btn-outline-primary"
            id={order.id}
            onClick={this.viewHandler}
          >
            <i
              className="fas fa-eye"
              id={order.id}
              onClick={this.viewHandler}
            />
          </button>
        )
      });
    }
    this.setState({ loading: false });
  };
  //   editHandler = e => {
  //     this.props.history.push(`${Routes.EDIT_TEMPLATES}/${e.target.id}`);
  //   };
  render() {
    let display = <Spinner />;
    if (!this.state.loading) {
      display = (
        <>
          <Navbar />
          <Container
            className="d-flex m-0 p-0"
            fluid
            style={{ position: "relative", width: "100vw" }}
          >
            <Sidebar />
            <Container
              fluid
              style={{ margin: "0", padding: "0", background: "#eeeeee" }}
            >
              <Row noGutters>
                <Col className="p-3 m-2">
                  <h2>Purchase orders</h2>
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

export default withRouter(ManageSalesOrder);
