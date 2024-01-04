import React, { Component } from "react";
import Img from "../../Bootstrap/img/prafulimage.jpg";
import { connect } from "react-redux";
import { logout } from "../../Action/loginAction";
import { checkout } from "../../Action/checkAction";

import { authlogout } from "../../Action/authAction";
import { withRouter, NavLink } from "react-router-dom";
import axios from "axios";
import "./Navbar.css";
import getIp from "../../Utility/getIp";
const Roles = ["User", "Admin", "Super admin"];
class Navbar extends Component {
  state = {
    email: this.props.Userdata.user.email,
    role: this.props.Userdata.user.role,
    ip: null,
    message: "",
    show: false,
    superAccess: false,
    previousCheckOut: false
  };

  componentDidMount = async () => {
    this.setState({ ip: await getIp() });
    this.setState({ superAccess: this.state.role > 2 ? true : false });
    await axios
      .get("/api/shift/checkCheckOut")
      .then(res => {
        console.log("NavBar", res.data.check);
        if (res.data.check === "Exist") {
          this.setState({ previousCheckOut: true });
        }
      })
      .catch(err => {
        console.log(err);
      });
  };

  logout = () => {
    axios
      .post("/api/users/logout", { ip: this.state.ip, email: this.state.email })
      .then(res => {
        if (res.data.type === "success") {
          this.setState({ message: res.data.message });
          localStorage.clear();
          this.props.logout();
          this.props.auth();
          if (this.props.Userdata.user.role === 1) {
            this.props.checkout();
          }
          this.props.history.replace("/");
        } else if (res.data.type === "error") {
          this.setState({ message: res.data.message }, () => this.showAlerts());
        }
      });
  };

  showAlert = () => {
    this.setState({ show: true }, () => {
      setTimeout(() => {
        this.setState({ show: false });
      }, 2000);
    });
  };

  showAlerts = () => {
    this.setState({ show: true }, () => {
      setTimeout(() => {
        this.setState({ show: false });
      }, 3000);
    });
  };
  toggleSidebar = () => {
    document.querySelector("#accordionSidebar").classList.toggle("toggled");
  };
  render() {
    let { superAccess, previousCheckOut } = this.state;

    return (
      <nav
        id="navbar"
        className="navbar navbar-expand navbar-dark  topbar  static-top shadow"
      >
        {/* <!-- Sidebar Toggle (Topbar) --> */}
        <button
          id="sidebarToggleTop"
          className="btn btn-link d-md-none rounded-circle mr-3"
          onClick={this.toggleSidebar}
        >
          <i className="fa fa-bars" />
        </button>
        <NavLink className="navbar-brand" to="/">
          UMS
        </NavLink>
        {/* <!-- Topbar Search -->
          <form className="d-none d-sm-inline-block form-inline mr-auto ml-md-3 my-2 my-md-0 mw-100 navbar-search">
            <div className="input-group">
              <input type="text" className="form-control bg-light border-0 small" placeholder="Search for..." aria-label="Search" aria-describedby="basic-addon2"/>
              <div className="input-group-append">
                <button className="btn btn-primary" type="button">
                  <i className="fas fa-search fa-sm"></i>
                </button>
              </div>
            </div>
          </form> */}

        {/* <!-- Topbar Navbar --> */}
        <ul className="navbar-nav ml-auto">
          {/* <!-- Nav Item - Search Dropdown (Visible Only XS) --> */}

          <div className="topbar-divider d-none d-sm-block" />

          {/* <!-- Nav Item - User Information --> */}
          <li className="nav-item dropdown no-arrow">
            <a
              className="nav-link dropdown-toggle"
              href="#d"
              id="userDropdown"
              role="button"
              data-toggle="dropdown"
              aria-haspopup="true"
              aria-expanded="false"
            >
              <span className="mr-2 d-none d-lg-inline text-gray-600 small">
                {Roles[this.state.role - 1]}
              </span>
              <img className="img-profile rounded-circle" src={Img} alt="profile"/>
            </a>
            {/* <!-- Dropdown - User Information --> */}
            <div
              className="dropdown-menu dropdown-menu-right shadow animated--grow-in"
              aria-labelledby="userDropdown"
            >
              <NavLink className="dropdown-item" to="/profile">
                <i className="fas fa-user mr-2 text-gray-400" />
                Profile
              </NavLink>
              {/* <a className="dropdown-item" href="#">
                <i className="fas fa-cogs fa-sm fa-fw mr-2 text-gray-400" />
                Settings
              </a> */}
              {/* <a className="dropdown-item" href="#">
                <i className="fas fa-list fa-sm fa-fw mr-2 text-gray-400" />
                Activity Log
              </a> */}
              <div className="dropdown-divider" />
              {superAccess ? (
                <button className="dropdown-item" onClick={this.logout}>
                  <i className="fas fa-sign-out mr-2 text-gray-400" />
                  Logout
                </button>
              ) : previousCheckOut ? (
                <button className="dropdown-item" onClick={this.logout}>
                  <i className="fas fa-sign-out mr-2 text-gray-400" />
                  Logout
                </button>
              ) : (
                <NavLink className="dropdown-item" to="/checkout">
                  <i className="fas fa-list fa-sm fa-fw mr-2 text-gray-400" />
                  Checkout
                </NavLink>
              )}
            </div>
          </li>
        </ul>
      </nav>
    );
  }
}

const mapActionToProps = dispatch => ({
  logout: () => dispatch(logout()),
  checkout: () => dispatch(checkout()),
  auth: () => dispatch(authlogout())
});

const mapStateToProps = state => ({
  Userdata: state.auth
});

export default connect(
  mapStateToProps,
  mapActionToProps
)(withRouter(Navbar));
