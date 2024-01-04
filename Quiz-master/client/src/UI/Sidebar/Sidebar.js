import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import { connect } from "react-redux";
import classnames from "classnames";
import axios from "axios";
import SidebarTree from "./SidebarTree/SidebarTree";
class Sidebar extends Component {
  state = {
    toggled: true,
    loading: true,
    isDropped: false
  };
  role = this.props.auth.user.role;
  id = this.props.auth.user.user;
  userPermissions = [];
  permissionList = [];
  toggleHandler = () => {
    this.setState({ toggled: !this.state.toggled });
  };
  componentDidMount = async () => {
    await this.getUserPermissions(this.id);
    this.setState({ loading: false });
  };

  getUserPermissions = async id => {
    this.userPermissions = {};
    return await axios
      .get(`/api/modules/sidebar`)
      .then(res => {
        if (res.data.type === "error") {
          return false;
        } else {
          this.userPermissions = res.data.userPermissions;
          this.setState({ loading: false });
        }
      })
      .catch(err => {
        console.log("Side bar ", err);
      });
  };

  render() {
    let sidebarPermissions = "";
    if (!this.state.loading) {
      sidebarPermissions =
        this.userPermissions.length > 0
          ? this.userPermissions.map((item, index) => {
              return (
                <>
                  <hr className="sidebar-divider my-0" />
                  <SidebarTree node={item} children={item.children} />
                </>
              );
            })
          : "";
    }
    return (
      <ul
        className={classnames(
          "m-0 navbar-nav bg-gradient-primary sidebar sidebar-dark accordion",
          {
            toggled: this.state.toggled
          }
        )}
        style={{ fontSize: "1rem" }}
        id="accordionSidebar"
      >
        {/* <!-- Sidebar - Brand --> */}
        <NavLink
          className="sidebar-brand d-flex align-items-center justify-content-center"
          to="/"
        >
          <div className="sidebar-brand-icon rotate-n-15">
            <i className="fas fa-users" />
          </div>
          <div className="sidebar-brand-text mx-3">User Management</div>
        </NavLink>
        {/* <!-- Divider --> */}
        <hr className="sidebar-divider my-0" />
        <li className="nav-item">
          <NavLink className="nav-link" to="/">
            <i className="fas fa-fw fa-tachometer-alt" />
            <span>Dashboard</span>
          </NavLink>
        </li>
        <hr className="sidebar-divider my-0" />
        {/* <!-- Divider --> */}
        <hr className="sidebar-divider d-none d-md-block" />
        {sidebarPermissions}
        {/* <!-- Sidebar Toggler (Sidebar) --> */}
        <div className="text-center d-none d-md-inline">
          <button
            onClick={this.toggleHandler}
            className="rounded-circle border-0"
            id="sidebarToggle"
          />
        </div>
      </ul>
    );
  }
}
const mapStateToProps = state => ({
  auth: state.auth
});
export default connect(
  mapStateToProps,
  null
)(Sidebar);
