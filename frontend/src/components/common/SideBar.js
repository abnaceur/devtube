
import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { push } from "react-router-redux";
import { getUserStats } from '../../store/actions/StatsActions/getStatsAction';
import { getProfileInfo } from '../../store/actions/ProfileAction/getProfileInfo';
import { getUserWallet } from '../../store/actions/UsersActions/getUserWalletAction';
import queryString from "query-string";

class Sidebar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      activeClass: {
        dash: "",
        course: "",
        mySpace: "",
        profile: "",
        member: "",
        store: "",
      },
      userData: {
        userId: localStorage.getItem('userId'),
        tcoinValue: 0,
        familyName: "",
        givenName: "",
        imageUrl: "",
        role: ""
      }
    }
  }

  async UNSAFE_componentWillMount() {
    await this.props.onGetUserStats();
    await this.props.onGetProfileInfo();
    await this.props.onGetUserWallet();
    if (window.location) {
      var query = queryString.parse(window.location.search);
      var activeClass = this.state.activeClass;
      activeClass[query.selected] = "active";
      this.setState({
        activeClass
      })
    }
    this.setState({
      userData: {
        userId: localStorage.getItem("userId"),
        familyName: localStorage.getItem("familyName"),
        givenName: localStorage.getItem("givenName"),
        imageUrl: localStorage.getItem("imageUrl")
      },
    })
  }

  async initPropsValues(profileData) {
    if (this.props.profileInfo) {
      this.setState({
        userData: {
          userId: localStorage.getItem("userId"),
          familyName: profileData.data.familyName,
          givenName: profileData.data.givenName,
          imageUrl: localStorage.getItem("imageUrl"),
          role: profileData.data.role,
        },
      })
    }
  }

  async UNSAFE_componentWillReceiveProps(nextProps) {
    let profileData = nextProps.profileInfo;
    this.initPropsValues(profileData);
    this.setState({
      tcoinValue: nextProps.getTcoin
    })
  }

  render() {

    return (
      <div>
        <aside id="sideBarStyle" className="main-sidebar">
          <section className="sidebar">
            <div className="user-panel">
              <div className="pull-left image">
                <img src={this.state.userData.imageUrl} className="img-circle" alt="User" />
              </div>
              <div className="pull-left info">
                <p>{this.state.userData.givenName} {this.state.userData.familyName}</p>
                <p style={{ fontSize: '16px' }}>{this.state.tcoinValue} <img style={{ position: 'relative', width: '13px', marginLeft: '3px', top: '-1px' }} src="./assets/dollar.svg" alt="imageSidebar" />
                  <span style={{ position: 'relative', marginLeft: '2px', color: 'gold', fontSize: '13px', }}>TCoin
                    </span>

                </p>
              </div>
            </div>
            {/*  
        <form action="#" method="get" className="sidebar-form">
        <div className="input-group">
          <input type="text" name="q" className="form-control" placeholder="Search..."/>
          <span className="input-group-btn">
                <button type="submit" name="search" id="search-btn" className="btn btn-flat"><i className="fa fa-search"></i>
                </button>
              </span>
        </div>
      </form>
       */}
            <ul className="sidebar-menu" data-widget="tree">
              <li className="header">MAIN NAVIGATION</li>

              {this.state.userData.role && this.state.userData.role === "HR"
                ? <li className={this.state.activeClass.dash}>
                  <Link to="/dashboard?selected=dash" onClick={this.props.navigateTo.bind(this, '/dashboard')}>
                    <i className="glyphicon glyphicon-dashboard"></i>
                    <span>Dashboard</span>
                    <span className="pull-right-container">
                    </span>
                  </Link>
                </li>
                : <span></span>}
              <li className={this.state.activeClass.course}>
                <Link to="/training?selected=course" onClick={this.props.navigateTo.bind(this, '/training')}>
                  <i  className="fa fa-connectdevelop"></i>
                  <span> Ressources</span>
                  <span className="pull-right-container">
                  </span>
                </Link>
              </li>
              <li className={this.state.activeClass.mySpace}>
                <Link to="/myspace?selected=mySpace" onClick={this.props.navigateTo.bind(this, '/myspace')}>
                  <i  className="glyphicon glyphicon-list-alt"></i>
                  <span> Mon éspace</span>
                  <span className="pull-right-container">
                  </span>
                </Link>
              </li>
              <li className={this.state.activeClass.member}>
                <Link to="/members?selected=member" onClick={this.props.navigateTo.bind(this, '/members')}>
                  <i  className="fa fa-users"></i> 
                    <span> Membres</span>
                  <span className="pull-right-container">
                  </span>
                </Link>
              </li>
              <li className={this.state.activeClass.store}>
                <Link to="/store?selected=store" onClick={this.props.navigateTo.bind(this, '/store')}>
                  <i  className="fa fa-shopping-bag"></i> 
                  <span> Boutique</span>
                  <span className="pull-right-container">
                  </span>
                </Link>
              </li>
              <li className={this.state.activeClass.profile}>
                <Link to="/profile?selected=profile" onClick={this.props.navigateTo.bind(this, '/store')}>
                  <i  className="fa fa-user-circle"></i> 
                    <span> Profil</span>
                  <span className="pull-right-container">
                  </span>
                </Link>
              </li>
            </ul>
          </section>
          <section style={{ 'position': 'absolute', 'bottom': '4.5%' }} className="sidebar">
            <li>
              <Link to="/logout" onClick={this.props.navigateTo.bind(this, '/logout')}>
                <i style={{ 'fontSize': '3rem', 'marginLeft': '-33%' }} className="fa fa-power-off"></i>
                <span className="pull-right-container">
                </span>
              </Link>
            </li>
          </section>
        </aside>
      </div>
    );
  }
}

const state = (state, ownProps = {}) => {
  return {
    location: state.location,
    getTcoin: state.getTcoin.getTcoin.data,
    userStats: state.getUserStats.userStat,
    profileInfo: state.profileInfo.profileInfo.data,
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    navigateTo: (location) => {
      dispatch(push(location));
    },
    onGetUserStats: () => dispatch(getUserStats()),
    onGetProfileInfo: (data) => dispatch(getProfileInfo()),
    onGetUserWallet: () => dispatch(getUserWallet()),
  }
};

export default connect(state, mapDispatchToProps)(Sidebar);