import React from "react";
import { connect } from "react-redux";
import { Spinner, Container,Row,Col,Card } from "react-bootstrap";
import { login } from "../../Action/loginAction";
import { checkout } from "../../Action/checkAction";

import { withRouter } from "react-router-dom";
import { auth } from "../../Action/authAction";
import setAuthToken from "../../Utility/setauth";
import { checkin } from "../../Action/checkAction";

import jwt_decode from "jwt-decode";
class CustomSpinner extends React.Component {
  state = {
    authorized: false
  };
  componentDidMount() {
    if (localStorage.token) {
      setAuthToken(localStorage.token);
      const decode = jwt_decode(localStorage.token);
      this.props.auth(decode);
      this.props.login();
      if (this.props.checkData.check) {
        this.props.checkin();
      }
      this.setState({ authorized: this.props.login.login });
    }
  }

  render() {
    let display = <Spinner animation="border" />;
    if (!this.state.authorized)
      display = (
        <>
          <Container fluid style={{ padding: 0, margin: 0 }}>
            <Row className="bg-danger">
              <Col
                style={{ width: "100vw", height: "100vh" }}
                className="d-flex align-items-center justify-content-center"
              >
                <Card>
                  <Card.Body className="d-flex justify-content-center flex-column">
                    <h1 className="text-danger text-center">
                      You dont have access to this page!
                    </h1>
                    <div className="text-center">
                      <button
                        className="btn btn-danger"
                        onClick={this.redirectButton}
                      >
                        Go back
                      </button>
                    </div>
                    <div className="text-center text-muted">
                      <small>
                        If you think this is a mistake, please contact
                        biticonic@support.com
                      </small>
                    </div>
                  </Card.Body>
                </Card>
              </Col>
            </Row>
          </Container>
        </>
      );
    return <>{display}</>;
  }
}
const mapActionToProps = dispatch => ({
  checkout: () => dispatch(checkout()),
  checkin: () => dispatch(checkin()),
  login: () => dispatch(login()),
  auth: payload => dispatch(auth(payload))
});

const mapStateToProps = state => ({
  loginData: state.login,
  authData: state.auth,
  checkData: state.check
});

export default connect(
  mapStateToProps,
  mapActionToProps
)(withRouter(CustomSpinner));
