
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
      <div class="login-box">
        <div class="login-logo">
          <b>The</b>Learning<b>Machine</b>
        </div>
        <div class="login-box-body">
          <p class="login-box-msg">Sign in to start your session</p>

          <form action="../../index2.html" method="post">
            <div class="form-group has-feedback">
              <input type="email" class="form-control" placeholder="Email" />
              <span class="glyphicon glyphicon-envelope form-control-feedback"></span>
            </div>
            <div class="form-group has-feedback">
              <input type="password" class="form-control" placeholder="Password" />
              <span class="glyphicon glyphicon-lock form-control-feedback"></span>
            </div>
            <div class="row">
              <div class="col-xs-8">
                <div class="checkbox icheck">
                  <label>
                    <input type="checkbox" /> Remember Me
                  </label>
                </div>
              </div>
              <div class="col-xs-4">
                <button type="submit" class="btn btn-primary btn-block btn-flat">Sign In</button>
              </div>
            </div>
          </form>

          <div class="social-auth-links text-center">
            <p>- OR -</p>
            <a href="#" class="btn btn-block btn-social btn-google btn-flat"><i class="fa fa-google-plus"></i> Sign in using
              Google+</a>
              <GoogleLogin
              clientId="508247381072-mkltitqrnb22o26irdte7jjdkamctosg.apps.googleusercontent.com" //CLIENTID NOT CREATED YET
              buttonText="CONNXION PAR GOOGLE"
              onSuccess={responseGoogle}
              onFailure={responseGoogle}
            />
          </div>

          <a href="#">I forgot my password</a><br></br>
          <a href="register.html" class="text-center">Register a new membership</a>

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