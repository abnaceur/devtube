import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { push } from "react-router-redux";
import { getUserStats } from '../../store/actions/StatsActions/getStatsAction';
import Moment from 'moment';
import { getProfileInfo } from '../../store/actions/ProfileAction/getProfileInfo';
import { getUserWallet } from '../../store/actions/UsersActions/getUserWalletAction';
import { getUserNotification } from '../../store/actions/UsersActions/getUserNotificationAction';
import { updateUserNotification } from '../../store/actions/UsersActions/updateUserNotificationAction';
import moment from "moment";

class Header extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      page: 0,
      currentPagination: 0,
      allPagination: [],
      allNotifs: [],
      userData: {
        userId: localStorage.getItem('userId'),
        familyName: "",
        tcoinValue: 0,
        givenName: "",
        imageUrl: "",
        noSeen: 0,
        dateOfCreation: localStorage.getItem('dateOfCreation'),
      }
    }

    this.updateNotification = this.updateNotification.bind(this);
    this.nextPage = this.nextPage.bind(this);
    this.previousPage = this.previousPage.bind(this);
  }

  updateNotification() {
    if (this.state.noSeen > 0) {
      this.props.onUpdateUserNotification();
      this.setState({
        noSeen: 0
      })
    }
  }

  transform(value) {
    moment.locale("fr");
    let a = moment(value).fromNow();
    return a;
  }

  nextPage(e) {
    let notif = document.getElementById('toggle-notif');
    e.stopPropagation();
    notif.click();
    let i = this.state.currentPagination;
    i = i + 1;
    if (i < this.props.totalPage) {
      this.setState({
        currentPagination: i
      })
      this.props.onGetUserNotification(i);
    }
  }

  previousPage(e) {
    let notif = document.getElementById('toggle-notif');
    e.stopPropagation();
    notif.click();
    if (this.state.currentPagination > 0) {
      let i = this.state.currentPagination;
      i = i - 1;
      this.setState({
        currentPagination: i
      })
      this.props.onGetUserNotification(i);
    }
  }

  async UNSAFE_componentWillMount() {
    await this.props.onGetUserWallet();
    await this.props.onGetProfileInfo();
    await this.props.onGetUserNotification(this.state.page);
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
          imageUrl: localStorage.getItem("imageUrl")
        },
      })
    }
  }

  async UNSAFE_componentWillReceiveProps(nextProps) {
    let profileData = nextProps.profileInfo;
    this.initPropsValues(profileData);

    this.setState({
      noSeen: this.props.noSeen,
      tcoinValue: nextProps.getTcoin,
      allNotifs: nextProps.allUserNotifs,
    })
  }


  render() {


    return (
      <header className="main-header">

        <a href="/" className="logo">
          <span className="logo-mini"><b>DEV</b></span>
          <span className="logo-lg">Dev<b>TUBE</b></span>
        </a>
        <nav className="navbar navbar-static-top">
          <a href="/" className="sidebar-toggle" data-toggle="push-menu" role="button">
            <span className="sr-only">Toggle navigation</span>
          </a>

          <div className="navbar-custom-menu" style={{ zIndex: "1223" }}>
            <ul className="nav navbar-nav">
              <li>
                <a href="/" className="dropdown-toggle" data-toggle="dropdown">
                  <span style={{ position: 'relative', fontSize: '18px', fontWeight: 'bold' }}>{this.state.tcoinValue}
                    <img style={{ position: 'relative', width: '14px', marginLeft: '8px', top: '-1px' }} src="./assets/dollar.svg" alt="headreImage" />
                    <span style={{ position: 'relative', marginLeft: '2px', color: 'gold', fontSize: '13px', }}>TCoin
                    </span>
                  </span>
                </a>
              </li>

              {/**
            
<li className="dropdown messages-menu">
                <a href="/" className="dropdown-toggle" data-toggle="dropdown">
                  <i className="fa fa-envelope-o"></i>
                  <span className="label label-success">4</span>
                </a>
                <ul className="dropdown-menu">
                  <li className="header">You have 4 messages</li>
                  <li>
                    <ul className="menu">
                      <li>
                        <a href="/">
                          <div className="pull-left">
                            <img src="dist/img/user2-160x160.jpg" className="img-circle" alt="User " />
                          </div>
                          <h4>
                            Support Team
                                <small><i className="fa fa-clock-o"></i> 5 mins</small>
                          </h4>
                          <p>Why not buy a new awesome theme?</p>
                        </a>
                      </li>
                      <li>
                        <a href="/">
                          <div className="pull-left">
                            <img src="dist/img/user3-128x128.jpg" className="img-circle" alt="User " />
                          </div>
                          <h4>
                            AdminLTE Design Team
                                <small><i className="fa fa-clock-o"></i> 2 hours</small>
                          </h4>
                          <p>Why not buy a new awesome theme?</p>
                        </a>
                      </li>
                      <li>
                        <a href="/">
                          <div className="pull-left">
                            <img src="dist/img/user4-128x128.jpg" className="img-circle" alt="User " />
                          </div>
                          <h4>
                            Developers
                                <small><i className="fa fa-clock-o"></i> Today</small>
                          </h4>
                          <p>Why not buy a new awesome theme?</p>
                        </a>
                      </li>
                      <li>
                        <a href="/">
                          <div className="pull-left">
                            <img src="dist/img/user3-128x128.jpg" className="img-circle" alt="User " />
                          </div>
                          <h4>
                            Sales Department
                                <small><i className="fa fa-clock-o"></i> Yesterday</small>
                          </h4>
                          <p>Why not buy a new awesome theme?</p>
                        </a>
                      </li>
                      <li>
                        <a href="/">
                          <div className="pull-left">
                            <img src="dist/img/user4-128x128.jpg" className="img-circle" alt="User " />
                          </div>
                          <h4>
                            Reviewers
                                <small><i className="fa fa-clock-o"></i> 2 days</small>
                          </h4>
                          <p>Why not buy a new awesome theme?</p>
                        </a>
                      </li>
                    </ul>
                  </li>
                  <li className="footer"><a href="/">See All Messages</a></li>
                </ul>
              </li>
              <li className="dropdown tasks-menu">
                <a href="/" className="dropdown-toggle" data-toggle="dropdown">
                  <i className="fa fa-flag-o"></i>
                  <span className="label label-danger">9</span>
                </a>
                <ul className="dropdown-menu">
                  <li className="header">You have 9 tasks</li>
                  <li>
                    <ul className="menu">
                      <li>
                        <a href="/">
                          <h3>
                            Design some buttons
                                <small className="pull-right">20%</small>
                          </h3>
                          <div className="progress xs">
                            <div className="progress-bar progress-bar-aqua" style={style} role="progressbar"
                              aria-valuenow="20" aria-valuemin="0" aria-valuemax="100">
                              <span className="sr-only">20% Complete</span>
                            </div>
                          </div>
                        </a>
                      </li>
                      <li>
                        <a href="/">
                          <h3>
                            Create a nice theme
                                <small className="pull-right">40%</small>
                          </h3>
                          <div className="progress xs">
                            <div className="progress-bar progress-bar-green" style={style} role="progressbar"
                              aria-valuenow="20" aria-valuemin="0" aria-valuemax="100">
                              <span className="sr-only">40% Complete</span>
                            </div>
                          </div>
                        </a>
                      </li>
                      <li>
                        <a href="/">
                          <h3>
                            Some task I need to do
                                <small className="pull-right">60%</small>
                          </h3>
                          <div className="progress xs">
                            <div className="progress-bar progress-bar-red" style={style} role="progressbar"
                              aria-valuenow="20" aria-valuemin="0" aria-valuemax="100">
                              <span className="sr-only">60% Complete</span>
                            </div>
                          </div>
                        </a>
                      </li>
                      <li>
                        <a href="/">
                          <h3>
                            Make beautiful transitions
                                <small className="pull-right">80%</small>
                          </h3>
                          <div className="progress xs">
                            <div className="progress-bar progress-bar-yellow" style={style} role="progressbar"
                              aria-valuenow="20" aria-valuemin="0" aria-valuemax="100">
                              <span className="sr-only">80% Complete</span>
                            </div>
                          </div>
                        </a>
                      </li>
                    </ul>
                  </li>
                  <li className="footer">
                    <a href="/">View all tasks</a>
                  </li>
                </ul>
              </li>
*/}
              <li className="dropdown notifications-menu">
                <a href="/" onClick={(e) => { this.updateNotification() }} className="dropdown-toggle" id="toggle-notif" data-toggle="dropdown">
                  <i className="fa fa-bell-o"></i>
                  {this.state.noSeen > 0
                    ?
                    <span className="label label-warning">
                      {this.state.noSeen}
                    </span>
                    : ""}
                </a>
                <ul className="dropdown-menu">
                  <li className="header">
                    {this.props.allCountNotif ?
                      <span>You have {this.props.allCountNotif} notifications</span>
                      : <span>You have 0 notifications</span>}
                  </li>
                  <li>
                    <ul className="menu">
                      {this.state.allNotifs && this.state.allNotifs.length > 0 ?
                        this.state.allNotifs.map(notif => {
                          return (
                            <li key={notif._id}>
                              {notif.notificationCategory === "goodies" ?
                                <a href="/">
                                  <i className="fa fa-shopping-cart text-aqua"></i>
                                  Your request of {notif.notificationTitle} is {notif.notificationStatus}
                                  <p className="notifTime">{this.transform(notif.dateOfLastUpdate)}</p>
                                </a>
                                : <a href="/">
                                <i className="fa fa-book text-aqua"></i>
                                Your request of {notif.notificationTitle} is {notif.notificationStatus}
                                <p className="notifTime">{this.transform(notif.dateOfLastUpdate)}</p>
                              </a>}
                            </li>
                          )
                        })
                        : <li></li>}
                    </ul>
                  </li>
                  <li className="footer text-center">
                    {(this.state.allNotifs && this.state.allNotifs.length > 0) || (this.props.totalPage > 1) ?
                      <ul className="pagination">
                        <li className="page-item">
                          <span style={{'cursor': 'pointer'}} className="notif" onClick={(e) => { this.previousPage(e) }}>
                            «
                            </span>
                        </li>
                        <li>
                          <span className="notif" style={{'border': '0', 'cursor': 'none'}}>
                            Page {this.state.currentPagination + 1} of {this.props.totalPage}
                          </span></li>
                        <li className="page-item">
                          <span className="notif" onClick={(e) => { this.nextPage(e) }}>
                            »
                          </span>
                        </li>
                      </ul>
                      : ""}
                  </li>
                </ul>
              </li>



              <li className="dropdown user user-menu">
                <a href="/" className="dropdown-toggle" data-toggle="dropdown">
                  <img src={this.state.userData.imageUrl} className="user-image" alt="User " />
                  <span className="hidden-xs">{this.state.userData.givenName} {this.state.userData.familyName}</span>
                </a>
                <ul className="dropdown-menu">
                  <li className="user-header">
                    <img src={this.state.userData.imageUrl} className="img-circle" alt="User " />

                    <p>
                      {this.state.userData.givenName} {this.state.userData.familyName}
                      <small>Member since {this.state.userData.dateOfCreation ?
                        Moment().format('ll', this.state.userData.dateOfCreation) : ""}</small>
                    </p>
                  </li>
                  <li className="user-body">
                    <div className="row">
                    </div>
                  </li>
                  <li className="user-footer">
                    <div className="pull-left">
                      <Link to="/profile" onClick={this.props.navigateTo.bind(this, '/profile')} className="btn btn-default btn-flat">Profile</Link>
                    </div>
                    <div className="pull-right">
                      <Link to="/logout" onClick={this.props.navigateTo.bind(this, '/logout')} className="btn btn-default btn-flat">Deconnexion</Link>
                    </div>
                  </li>
                </ul>
              </li>
            </ul>
          </div>
        </nav>
      </header>
    );
  }
}


const state = (state, ownProps = {}) => {
  return {
    allUserNotifs: state.allUserNotifs.allUserNotifs.data,
    allCountNotif: state.allUserNotifs.allUserNotifs.Count,
    totalPage: state.allUserNotifs.allUserNotifs.total_pages + 1,
    location: state.location,
    noSeen: state.allUserNotifs.allUserNotifs.noSeen,
    getTcoin: state.getTcoin.getTcoin.data,
    profileInfo: state.profileInfo.profileInfo.data,
    userStats: state.getUserStats.userStat,
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
    onGetUserNotification: (page) => dispatch(getUserNotification(page)),
    onUpdateUserNotification: () => dispatch(updateUserNotification()),
  }
};

export default connect(state, mapDispatchToProps)(Header);