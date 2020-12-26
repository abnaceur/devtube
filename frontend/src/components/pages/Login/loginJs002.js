
import React from "react";
import { connect } from 'react-redux';
import { authUser } from "../../../store/actions/UsersActions/auth_user";
import { bindActionCreators } from "redux";
import GoogleLogin from 'react-google-login';

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

  handleChange(event) {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;

    this.setState({
      [name]: value
    });
  }
  handlFormSubmit(e) {
    e.preventDefault();
    this.props.authUser(this.state.email, this.state.password, this.state.notify);
  }

  render() {
    const responseGoogle = (response) => {
      this.props.authUser(response);
    }

    return (
      <div className="login-box">
        <div className="login-logo">
          <b>The</b>Learning<b>Machine</b>
        </div>
        <div className="login-box-body">
          <p className="login-box-msg">Sign in to start your session</p>

          <form action="../../index2.html" method="post">
            <div className="form-group has-feedback">
              <input type="email" className="form-control" placeholder="Email" />
              <span className="glyphicon glyphicon-envelope form-control-feedback"></span>
            </div>
            <div className="form-group has-feedback">
              <input type="password" className="form-control" placeholder="Password" />
              <span className="glyphicon glyphicon-lock form-control-feedback"></span>
            </div>
            <div className="row">
              <div className="col-xs-8">
                <div className="checkbox icheck">
                  <label>
                    <input type="checkbox" /> Remember Me
                  </label>
                </div>
              </div>
              <div className="col-xs-4">
                <button type="submit" className="btn btn-primary btn-block btn-flat">Sign In</button>
              </div>
            </div>
          </form>

          <div className="social-auth-links text-center">
            <p>- OR -</p>
            <GoogleLogin
              className="signInButton"
              clientId="508247381072-mkltitqrnb22o26irdte7jjdkamctosg.apps.googleusercontent.com" //CLIENTID NOT CREATED YET
              buttonText="Login via Google"
              onSuccess={responseGoogle}
              onFailure={responseGoogle}
            />
          </div>

          <a href="/">I forgot my password</a><br></br>
          <a href="register.html" className="text-center">Register a new membership</a>

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
  return bindActionCreators({ authUser }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(Login);