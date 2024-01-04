import React, { Component } from "react";
import axios from "axios";
import { Table, Button, Spinner } from "react-bootstrap";
import { connect } from "react-redux";
import "./ViewUser.css";
class ViewUser extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userinfo: null,
      role: this.props.auth.user.role,
      userId: props.id
    };
  }
  componentDidMount = async () => {
    await axios
      .get(`/api/users/${this.state.userId}`)
      .then(res => {
        this.setState({
          userinfo: res.data[0]
        });
      })
      .catch(err => {});
  };
  closeHandler = async () => {
    axios
      .delete(`http://localhost:5000/api/users/${this.state.userId}`)
      .then(res => {})
      .catch(err => {});
  };
  render() {
    let role = this.state.role;
    let disableButton;
    if (role === 3) {
      disableButton = (
        <Button variant="outline-danger" onClick={this.closeHandler}>
          Close Account
        </Button>
      );
    }

    let userInfo = <Spinner />;
    if (this.state.userinfo)
      userInfo = (
        <Table style={{color:"#000"}} className="viewTable" striped bordered hover>
          <tbody>
            <tr>
              <td>Name</td>
              <td>
                {this.state.userinfo.firstname +
                  " " +
                  this.state.userinfo.middlename +
                  " " +
                  this.state.userinfo.lastname}
              </td>
            </tr>
            <tr>
              <td>Email</td>
              <td>{this.state.userinfo.email}</td>
            </tr>
            <tr>
              <td>User Status</td>
              <td>{this.state.userinfo.userStatus}</td>
            </tr>
            <tr>
              <td>Address</td>
              <td>{this.state.userinfo.address}</td>
            </tr>
            <tr>
              <td>Country</td>
              <td>{this.state.userinfo.country}</td>
            </tr>
            <tr>
              <td>Phone</td>
              <td>{this.state.userinfo.phone}</td>
            </tr>
            <tr>
              <td>Mobile</td>
              <td>{this.state.userinfo.mobile}</td>
            </tr>
            <tr>
              <td>Registration Date</td>
              <td>{this.state.userinfo.registration_date.split("T")[0]}</td>
            </tr>
            <tr>
              <td>Login Status</td>
              <td>{this.state.userinfo.login_status}</td>
            </tr>
            <tr>
              <td>Last Login Ip</td>
              <td>{this.state.userinfo.last_login_ip}</td>
            </tr>
          </tbody>
        </Table>
      );

    return <>{userInfo}</>;
  }
}
const mapStateToProps = state => ({
  auth: state.auth
});
export default connect(mapStateToProps)(ViewUser);
