import React, { Component } from "react";
import { connect } from "react-redux";
import { Route, Switch } from "react-router-dom";
import { login } from "./Action/loginAction";
import ROUTES from "./config/Routes";
import Dashboard from "./Container/Users/Dashboard/Dashboard";
import Absent from "./Container/Users/Absent/Absent";
import ChangePassword from "./Container/Users/ChangePassword/ChangePassword";
import CheckIn from "./Container/Users/CheckIn/CheckIn";
import CheckOut from "./Container/Users/CheckOut/CheckOut";
import EditTemplate from "./Container/Users/EmailTemplate/EditTemplate/EditTemplate";
import EmailTemplate from "./Container/Users/EmailTemplate/EmailTemplate";
import Forgot from "./Container/Users/Forgot/Forgot";
import Login from "./Container/Users/Login/Login";
import ModulePermission from "./Container/Users/ModulePermission/ModulePermission";
import AddCategory from './Container/Category/AddCategory/AddCategory';
import EditCategory from './Container/Category/EditCategory/EditCategory'
import ManageCategories from './Container/Category/ManageCategories/ManageCategories'



import PaginatedView from "./Container/Users/PaginatedView";
import ResetPassword from "./Container/Users/ResetPassword/ResetPassword";
import ConfirmEmailChange from "./Container/Users/UpdateEmail/ConfirmEmailChange";
import ConfirmPassword from "./Container/Users/UpdateEmail/ConfirmPassword";
import UpdateEmail from "./Container/Users/UpdateEmail/UpdateEmail";
import AddUser from "./Container/Users/User/AddUser";
import EditUser from "./Container/Users/User/EditUser";
import UserDashboard from "./Container/Users/UserDashboard/UserDashboard";
import UserLogs from "./Container/Users/UserLogs/UserLogs";
import UserProfile from "./Container/Users/UserProfile/UserProfile";
import Message from "./UI/Message";
import PageNotFound from "./UI/PageNotFound";
import CustomSpinner from "./UI/Spinner/CustomSpinner";
import UserDashboardSpinner from "./UI/Spinner/UserDashboardSpinner";
import Unauthorized from "./UI/Unauthorized";
import AddQuizQuestion from "./Container/Quiz/AddQuizQuestion/AddQuizQuestion";

class App extends Component {
  render() {
    return (
      <Switch>
        <Route exact path={`${ROUTES.CONFIRMATION}/:id`} component={Message} />
        <Route
          path={`${ROUTES.CONFIRM_EMAIL_CHANGE_MESSAGE}/:id`}
          exact
          component={ConfirmEmailChange}
        />
        <Route path={ROUTES.USER_PROFILE} component={UserProfile} exact />
        <Route path={ROUTES.UNAUTHORIZED} component={Unauthorized} />
        <Route path={ROUTES.LOGIN} component={Login} exact />
        <Route exact path={ROUTES.FORGOT_PASSWORD} component={Forgot} />
    
        <Route
          path={ROUTES.ADD_CATEGORIES}
          exact
          render={() =>
            this.props.login.login ? <AddCategory /> : <CustomSpinner />
          }
        />

<Route
          path={ROUTES.ADD_QUIZ_QUESTION}
          exact
          render={() =>
            this.props.login.login ? <AddQuizQuestion /> : <CustomSpinner />
          }
        />
        <Route
          path={ROUTES.MANAGE_CATEGORIES}
          exact
          render={() =>
            this.props.login.login ? <ManageCategories /> : <CustomSpinner />
          }
        />
        <Route
          path={`${ROUTES.EDIT_CATEGORY}/:slug`}
          exact
          render={() =>
            this.props.login.login ? <EditCategory /> : <CustomSpinner />
          }
        />
       
       
      
        <Route
          path={ROUTES.UPDATE_PASSWORD}
          exact
          render={() =>
            this.props.login.login ? <ChangePassword /> : <CustomSpinner />
          }
        />
       
       
      
     
        <Route
          path={ROUTES.CHECKIN}
          exact
          render={() =>
            this.props.login.login ? <CheckIn /> : <CustomSpinner />
          }
        />
        <Route
          path={ROUTES.CHECKOUT}
          exact
          render={() =>
            this.props.login.login ? <CheckOut /> : <CustomSpinner />
          }
        />{" "}
        <Route
          path={ROUTES.ADD_USER}
          exact
          render={() =>
            this.props.login.login ? <AddUser /> : <CustomSpinner />
          }
        />
        {/* 
        
        Inventory ROUTES START
        
            
        */}
     
      
       
        {/* Product Routes */}
       
        
     
        {/* 
        
        Inventory ROUTES END
        
            
        */}
        <Route
          path={`${ROUTES.RESET_PASSWORD}/:id`}
          component={ResetPassword}
        />
        <Route
          path={`${ROUTES.EDIT_USER}/edit/:id`}
          exact
          render={() =>
            this.props.login.login ? <EditUser /> : <CustomSpinner />
          }
        />
        <Route
          path={`${ROUTES.EDIT_TEMPLATES}/:id`}
          exact
          render={() =>
            this.props.login.login ? <EditTemplate /> : <CustomSpinner />
          }
        />
        <Route
          path={`${ROUTES.MANAGE_PERMISSIONS}/:id`}
          exact
          render={() =>
            this.props.login.login ? <ModulePermission /> : <CustomSpinner />
          }
        />{" "}
        <Route
          path={ROUTES.USER_LOGS}
          exact
          render={() =>
            this.props.login.login ? <UserLogs /> : <CustomSpinner />
          }
        />
        <Route
          path={ROUTES.CONFIRMPASSWORD_FOR_UPDATE_EMAIL}
          exact
          render={() =>
            this.props.login.login ? <ConfirmPassword /> : <CustomSpinner />
          }
        />
        <Route
          path={ROUTES.UPDATE_EMAIL}
          exact
          render={() =>
            this.props.login.login ? <UpdateEmail /> : <CustomSpinner />
          }
        />
        <Route
          path={ROUTES.ADMIN_DASHBOARD}
          exact
          render={() =>
            this.props.login.login && this.props.auth.user.role > 1 ? (
              <Dashboard />
            ) : (
              <CustomSpinner />
            )
          }
        />
        <Route
          path={ROUTES.MANAGE_PERMISSIONS}
          exact
          render={() =>
            this.props.login.login && this.props.auth.user.role > 1 ? (
              <PaginatedView />
            ) : (
              <CustomSpinner />
            )
          }
        />
        <Route
          path={ROUTES.USER_DASHBOARD}
          exact
          render={() =>
            this.props.login.login && this.props.check.check ? (
              <UserDashboard />
            ) : (
              <UserDashboardSpinner />
            )
          }
        />{" "}
        <Route
          path={ROUTES.MANAGE_MEMBERS}
          exact
          render={() =>
            this.props.login.login ? <PaginatedView /> : <CustomSpinner />
          }
        />
        <Route
          path={ROUTES.EDIT_TEMPLATES}
          exact
          render={() =>
            this.props.login.login ? <EmailTemplate /> : <CustomSpinner />
          }
        />
        <Route
          path={ROUTES.EDIT_USER}
          exact
          render={() =>
            this.props.login.login ? <PaginatedView /> : <CustomSpinner />
          }
        />
        <Route
          path={ROUTES.ABSENT_REPORT}
          exact
          render={() =>
            this.props.login.login ? <Absent /> : <CustomSpinner />
          }
        />
        <Route component={PageNotFound} exact />
      </Switch>
    );
  }
}

const mapStateToProps = state => ({
  login: state.login,
  auth: state.auth,
  check: state.check
});
const mapActionToProps = dispatch => ({
  loginuser: () => dispatch(login())
});

export default connect(
  mapStateToProps,
  mapActionToProps
)(App);
