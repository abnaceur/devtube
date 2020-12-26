import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Redirect,
  Route,
} from "react-router-dom";
import 'react-toastify/dist/ReactToastify.css';
import Login from "./components/pages/Login/Login";
import decode from 'jwt-decode';
import NotFound from './components/pages/NotFound/NotFound';
import Logout from './components/pages/Logout/Logout';
import Training from './components/pages/Training/Training';
import Members from './components/pages/Members/Members';
import MySpace from './components/pages/MySpace/MySpace';
import Store from './components/pages/Shop/Store';
import AddMaterials from './components/pages/AddMaterials/AddMaterials';
import MaterialDetails from './components/pages/MaterialDetails/MaterialDetails';
import MaterialVideo from './components/pages/MaterialVideo/MaterialVideo';
import Profile from './components/pages/Profile/Profile';
import EditMaterial from './components/pages/EditMaterial/EditMaterial';
import Dashboard from './components/pages/Dashboard/Dashboard';
require('dotenv').config();

function App() {
  const checkAuth = () => { 
    const token = localStorage.getItem('token');
    if (!token) {
      return false;
    }

    try {
      // { exp: 12903819203 }
      const { exp } = decode(token);

      if (exp < new Date().getTime() / 1000) {
        return false;
      }

    } catch (e) {
      return false;
    }

    return true;
  }

  const AuthRoute = ({ component: Component, ...rest }) => (
    <Route {...rest} render={props => (
      checkAuth() ? (
        <Component {...props} />
      ) : (
          <Redirect to={{ pathname: '/login' }} />
        )
    )} />
  )

  return (
    <div className="row">
      <Router>
        <Switch>
          <AuthRoute exact path="/" component={Training} />
          <AuthRoute exact path="/dashboard" component={Dashboard} />
          <AuthRoute exact path="/editMaterial" component={EditMaterial} />
          <AuthRoute exact path="/profile" component={Profile} />
          <AuthRoute exact path="/playvideo" component={MaterialVideo} />
          <AuthRoute exact path="/materialdetails" component={MaterialDetails} />
          <AuthRoute exact path="/addmaterials" component={AddMaterials} />
          <AuthRoute exact path="/myspace" component={MySpace} />
          <AuthRoute exact path="/store" component={Store} />
          <AuthRoute exact path="/training" component={Training} />
          <AuthRoute exact path="/members" component={Members} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/logout" component={Logout} />
          <AuthRoute exact component={NotFound} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
