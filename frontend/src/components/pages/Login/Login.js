
import React from "react";
import { connect } from 'react-redux';
import { authUser } from "../../../store/actions/UsersActions/auth_user";
import { bindActionCreators } from "redux";
import GoogleLogin from 'react-google-login';
import FontAwesome from 'react-fontawesome';
import { ToastContainer, toast } from 'react-toastify';
import { oauth2User } from '../../../store/actions/UsersActions/oauth2User';
import queryString from "query-string";
const createHistory = require("history").createBrowserHistory;
 
class Login extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      password: "",
      email: "",
      notify: "",
    }

    this.handlFormSubmit = this.handlFormSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  openGoogleWindow() {
    let el = document.getElementsByClassName('signInButton');
    el[0].click();
  }

  handleChange(event) {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;

    this.setState({
      [name]: value
    });
  }

  componentWillMount() {
    let history = createHistory();
    var query = queryString.parse(this.props.location.search);
    if (query.token && query.auth == "true") {
      localStorage.setItem('token', query.token);
      localStorage.setItem('userId', query.userId);
      localStorage.setItem('familyName', query.familyName);
      localStorage.setItem('givenName', query.givenName);
      localStorage.setItem('imageUrl', query.imageUrl);
      localStorage.setItem('dateOfCreation', query.dateOfCreation);
      history.push("/");
    } else if (query.auth == "false") {
      toast.error("This email is not authorized", {
        position: toast.POSITION.TOP_RIGHT
      })
    }
  }

  handlFormSubmit(e) {
    e.preventDefault();
    this.props.authUser(this.state.email, this.state.password, this.state.notify);
  }

  render() {

    return (
      <div className="login-box fadein-fast" >
        <ToastContainer />
        <div className="login-logo">
          <b>Dev</b>TUBE<b></b>
          <p style={{ 'fontSize': '21px' }}>
          <b>Connect via Google</b></p>
          <div className='button-wrapper fadein-fast' id="authBorder">
            <a href={process.env.REACT_APP_API_URL + "/auth/google"}>
            <button id="authButton"
              className="google button"
            >
              <FontAwesome
                name="google"
              />
            </button>
            </a>
          </div>
        </div>
      </div>
    );
  }
};


const mapStateToProps = state => {
  return {
    auth: state.auth,
  };
};


function mapDispatchToProps(dispatch) {
  return bindActionCreators({ authUser, oauth2User }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(Login);