import React from "react";
import { connect } from "react-redux";
import { Spinner } from "react-bootstrap";
import { login } from "../../Action/loginAction";
import { checkout } from "../../Action/checkAction";

import { withRouter } from "react-router-dom";
import { auth } from "../../Action/authAction";
import setAuthToken from "../../Utility/setauth";
import {checkin} from '../../Action/checkAction';

import jwt_decode from "jwt-decode";
class CustomSpinner extends React.Component {
  state = {
    authorized: false
  };
  componentDidMount(){
    if (localStorage.token) {
        setAuthToken(localStorage.token);
        const decode = jwt_decode(localStorage.token);
        this.props.auth(decode);
        this.props.login();
  
      this.props.checkin();
        this.setState({authorized:this.props.login.login})
      }
      
  }

  render() {
    let display = <Spinner animation="border" />;
    if(!this.state.authorized)
    display=<p>You dont have access to this page!</p>
    return <>{display}</>;
  }
}
const mapActionToProps = dispatch => ({
  checkout:()=>dispatch(checkout()),
    checkin:()=>dispatch(checkin()),
    login: () => dispatch(login()),
    auth: payload => dispatch(auth(payload))
  });
  
  const mapStateToProps = state => ({
    loginData: state.login,
    authData: state.auth,
    checkData:state.check
  });
  
  export default connect(
    mapStateToProps,
    mapActionToProps
  )(withRouter(CustomSpinner));
  