import React from "react";
import Header from "../../common/Header";
import Sidebar from "../../common/SideBar";
import Footer from "../../common/Footer";
import { connect } from "react-redux";
import { push } from "react-router-redux";
import Select from 'react-select';
import { getCategoriesList } from '../../../store/actions/materialAction/getCategoriesList';
import Slider from 'react-input-slider';
import { uploadProfile } from '../../../store/actions/ProfileAction/profile'
import { getProfileInfo } from '../../../store/actions/ProfileAction/getProfileInfo';
import { ToastContainer, toast } from 'react-toastify';
import { getUserStats } from '../../../store/actions/StatsActions/getStatsAction';

class Profile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      //   colorLabel: ['label-success', 'label-info', 'label-warning', 'label-primary'],
      colorLabel: ['label-info', 'label-info', 'label-info', 'label-info'],
      firstname: "",
      lastname: "",
      email: "",
      degree: "",
      linkedin: "",
      gitlab: "",
      companyPosition: "",
      location: "",
      website: "",
      cv: "",
      note: "",
      x: [],
      selectedOption: [],
      userData: {
        userId: localStorage.getItem("userId"),
        familyName: localStorage.getItem("familyName"),
        givenName: localStorage.getItem("givenName"),
        imageUrl: localStorage.getItem("imageUrl")
      }
    };
    this.handleRange = this.handleRange.bind(this);
    this.handleFormSubmit = this.handleFormSubmit.bind(this);
    this.handlFormSubmitAction = this.handlFormSubmitAction.bind(this);
  }

  handleFormSubmit(event) {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;

    if (target.type === "file") {
      this.setState({
        cv: target.files.length > 0 ? target.files[0] : this.state.cv
      });

    } else {
      this.setState({
        [name]: value
      });
    }
  }


  async handlFormSubmitAction(e) {
    e.preventDefault();
    await this.props.onUploadProfile(this.state);
  }


  //TODO PUT THIS FUNCTIONS IN UTILS
  successNotification(msg) {
    toast.success(msg, {
      position: toast.POSITION.TOP_RIGHT
    })
  }

  dangerNotification(msg) {
    toast.error(msg, {
      position: toast.POSITION.TOP_RIGHT
    })
  }

  handleChange = selectedOption => {
    let x = [];
    if (selectedOption) {
      selectedOption.map((option, index) => {
        return (
          x.push({
            id: option.value,
            label: option.label,
            rang: this.state.x[index] !== undefined && this.state.x.length > 0 ? this.state.x[index].rang : 0,
          })
        )
      })
    }

    this.setState({ selectedOption, x });
  };


  handleRange(rang, x, index) {
    x[index].rang = rang;
    this.setState({ x });
  }

  async UNSAFE_componentWillMount() {
    await this.props.onGetUserStats();
    await this.props.onGetProfileInfo();
    await this.props.onGetCategoriesList();
  }

  async initPropsValues(profileData) {
    if (this.props.profileInfo && profileData) {
      this.setState({
        firstname: profileData.data.firstname,
        lastname: profileData.data.lastname,
        email: profileData.data.email,
        degree: profileData.data.degree,
        linkedin: profileData.data.linkedin,
        gitlab: profileData.data.gitlab,
        companyPosition: profileData.data.companyPosition,
        location: profileData.data.location,
        userData: {
          userId: localStorage.getItem("userId"),
          familyName: profileData.data.familyName,
          givenName: profileData.data.givenName,
          imageUrl: localStorage.getItem("imageUrl")
        },
        website: profileData.data.website,
        cv: profileData.data.cv === "" ? this.state.cv : profileData.data.cv,
        note: profileData.data.note,
        x: profileData.data.skills,
        selectedOption: profileData.selectedItems,
      })
    }
  }
  
  UNSAFE_componentWillReceiveProps(nextProps) {
    let profileData = nextProps.profileInfo;
    if (nextProps.profileUpdated.profileUpdated) {
      if (nextProps.profileUpdated.profileUpdated.data.code === 200) {
        this.successNotification("Profile updated with success")
        setTimeout(() => {
          this.props.onGetProfileInfo();
        }, 30)
      }
      else
        this.dangerNotification("Sorry, an error occured")
    }
    setTimeout(() => {
      this.initPropsValues(profileData);
    }, 50)
  }

render() {
  let catArray = [];

  if (this.props.listCats) {
    this.props.listCats.map(cat => {
      return catArray.push({ value: cat._id, label: cat.categoryTitle })
    })
  }

  return (
    <div>
      <Header />
      <ToastContainer />
      <div className="content-wrapper" >
        <section className="content-header" >
          <br></br>
          <ol className="breadcrumb">
            <li>
              <a href="/">
                <i className="fa fa-dashboard"></i> Home
                </a>
            </li>
          </ol>
        </section>

        <section className="content">
          <div className="row">
            <div className="col-md-3">
              <div className="box box-primary" id="fixMarginTop">
                <div className="box-body box-profile">
                  <img
                    className="profile-user-img img-responsive img-circle"
                    src={this.state.userData.imageUrl}
                    alt="User profile"
                  />

                  <h3 className="profile-username text-center">
                    {this.state.userData.givenName}{" "}
                    {this.state.userData.familyName}
                  </h3>

                  <p className="text-muted text-center">
                    {this.state.companyPosition}
                  </p>

                  <ul className="list-group list-group-unbordered">
                    <li className="list-group-item">
                      <b>Ressources ajoutés</b> <span className="pull-right">
                        {this.props.userStats.countMaterials}
                      </span>
                    </li>
                    <li className="list-group-item">
                      <b>Ressources aimés</b> <span className="pull-right">
                        {this.props.userStats.countMyLikedMaterials}
                      </span>
                    </li>
                  </ul>
                </div>
              </div>

              <div className="box box-primary">
                <div className="box-header with-border">
                  <h3 className="box-title">A propos</h3>
                </div>
                <div className="box-body">
                  <strong>
                    <i className="fa fa-book margin-r-5"></i> Diplome
                    </strong>

                  <p className="text-muted" style={{ 'color': 'black', 'fontSize': '11px' }}>
                    {this.state.degree}
                  </p>

                  <hr></hr>

                  <strong>
                    <i className="fa fa-sitemap margin-r-5"></i> site web
                    </strong>

                  <p className="text-muted" style={{ 'color': 'black', 'fontSize': '11px' }}>
                    {this.state.website}
                  </p>

                  <hr></hr>

                  <strong>
                    <i className="fa fa-linkedin margin-r-5"></i> Linkedin
                    </strong>

                  <p className="text-muted" style={{ 'color': 'black', 'fontSize': '11px' }}>
                    {this.state.linkedin}
                  </p>

                  <hr></hr>

                  <strong>
                    <i className="fa fa-github margin-r-5"></i> Github/Bitbucket/Gitlab
                    </strong>

                  <p className="text-muted" style={{ 'color': 'black', 'fontSize': '11px' }}>
                    {this.state.gitlab}
                  </p>

                  <hr></hr>

                  <strong>
                    <i className="fa fa-pencil margin-r-5"></i> Compétences
                    </strong>

                  <div style={{ position: 'relative', textAlign: 'center', fontWeight: 'bold' }}>
                    {this.state.x.map((option, index) => {
                      return (
                        <p key={index} className={this.state.colorLabel[Math.floor(Math.random() * 3) + 0]}>{option.label} - {option.rang}%</p>
                      )
                    })}
                  </div>

                  <hr></hr>

                  <strong>
                    <i className="fa fa-file margin-r-5"></i> CV
                    </strong>
                  <p>{this.state.cv !== "" ?
                    <a target="_blank"  href={process.env.REACT_APP_API_URL + "/" + this.state.cv}  rel="noopener noreferrer">Click hereto see my cv</a>
                    : ""}</p>

                  <hr></hr>

                  <strong>
                    <i className="fa fa-map-marker margin-r-5"></i> Adresse
                    </strong>

                  <p className="text-muted">
                    {this.state.location}
                  </p>

                  <hr></hr>
                  <strong>
                    <i className="fa fa-file-text-o margin-r-5"></i> Note
                    </strong>

                  <div>
                    <p style={{ height: '140px', 'wordWrap': 'break-word', overflow: 'hidden' }}>
                      {this.state.note}
                    </p>
                  </div>

                </div>
              </div>
            </div>
            <div className="col-md-9" id="fixMarginTop">
              <div className="nav-tabs-custom">
                <ul className="nav nav-tabs">
                  <li className="active">
                    <a href="#settings" data-toggle="tab">
                        Paramètres
                      </a>
                  </li>
                </ul>
                <div className="tab-content">

                  <div className="active tab-pane" id="settings">
                    <form onSubmit={this.handlFormSubmitAction} encType="multipart/form-data" className="form-horizontal">
                      <div className="form-group">
                        <label
                          className="col-sm-2 control-label"
                        >
                          Prénom
                          </label>

                        <div className="col-sm-10">
                          <input
                            type="text"
                            value={this.state.firstname}
                            className="form-control"
                            id="firstName"
                            onChange={this.handleFormSubmit}
                            name="firstname"
                            placeholder="Entrez votre prénom"
                          />
                        </div>
                      </div>

                      <div className="form-group">
                        <label
                          className="col-sm-2 control-label"
                        >
                          Nom
                          </label>

                        <div className="col-sm-10">
                          <input
                            type="text"
                            value={this.state.lastname}
                            className="form-control"
                            id="lastName"
                            name="lastname"
                            onChange={this.handleFormSubmit}
                            placeholder="Entrez votre nom"
                          />
                        </div>
                      </div>

                      <div className="form-group">
                        <label
                          className="col-sm-2 control-label"
                        >
                          Email
                          </label>

                        <div className="col-sm-10">
                          <input disabled={true}
                            type="email"
                            className="form-control"
                            id="inputEmail"
                            value={this.state.email}
                            name="email"
                            onChange={this.handleFormSubmit}
                            placeholder="Entrez votre email"
                            required
                          />
                        </div>
                      </div>

                      <div className="form-group">
                        <label
                          className="col-sm-2 control-label"
                        >
                          Profession
                          </label>

                        <div className="col-sm-10">
                          <input
                            type="text"
                            value={this.state.companyPosition}
                            className="form-control"
                            id="companyPosition"
                            name="companyPosition"
                            onChange={this.handleFormSubmit}
                            placeholder="Entrez votre profession "
                          />
                        </div>
                      </div>

                      <div className="form-group">
                        <label
                          className="col-sm-2 control-label"
                        >
                          Adresse
                          </label>

                        <div className="col-sm-10">
                          <input
                            type="text"
                            value={this.state.location}
                            className="form-control"
                            id="location"
                            name="location"
                            onChange={this.handleFormSubmit}
                            placeholder="Entrez votre adresse"
                          />
                        </div>
                      </div>

                      <div className="form-group">
                        <label
                          className="col-sm-2 control-label"
                        >
                          Diplome
                          </label>

                        <div className="col-sm-10">
                          <input
                            type="text"
                            value={this.state.degree}
                            className="form-control"
                            id="Degree"
                            name="degree"
                            onChange={this.handleFormSubmit}
                            placeholder="Entrez votre diplome"
                          />
                        </div>
                      </div>

                      <div className="form-group">
                        <label
                          className="col-sm-2 control-label"
                        >
                          Linkedin
                          </label>

                        <div className="col-sm-10">
                          <input
                            type="text"
                            className="form-control"
                            id="linkedin"
                            value={this.state.linkedin}
                            name="linkedin"
                            onChange={this.handleFormSubmit}
                            placeholder="Entrez votre Linkedin"
                          />
                        </div>
                      </div>

                      <div className="form-group">
                        <label
                          className="col-sm-2 control-label"
                        >
                          Github/Gitlab
                          </label>

                        <div className="col-sm-10">
                          <input
                            type="text"
                            value={this.state.gitlab}
                            className="form-control"
                            id="gitlab"
                            name="gitlab"
                            onChange={this.handleFormSubmit}
                            placeholder="Entrez le lien vers votre git"
                          />
                        </div>
                      </div>

                      <div className="form-group">
                        <label
                          className="col-sm-2 control-label"
                        >
                          Site web
                          </label>

                        <div className="col-sm-10">
                          <input
                            type="text"
                            value={this.state.website}
                            className="form-control"
                            id="website"
                            name="website"
                            onChange={this.handleFormSubmit}
                            placeholder="Entez le lien vers votre siteweb"
                          />
                        </div>
                      </div>

                      <div className="form-group">
                        <label
                          className="col-sm-2 control-label"
                        >Compétences</label>
                        <div className="col-sm-10" style={{ 'zIndex': '222' }}>

                          <Select
                            isMulti
                            isSearchable
                            placeholder="Select your skills"
                            value={this.state.selectedOption}
                            onChange={this.handleChange}
                            options={catArray}
                          />
                        </div>
                      </div>

                      {this.state.x.map((option, index) => {
                        return (
                          <div key={option.id} className="form-group">
                            <p
                              className="col-sm-2 control-label"
                            >{option.label}</p>
                            <div className="col-sm-10">
                              <Slider
                                axis="x"
                                xstep="2"
                                x={this.state.x[index].rang}
                                onChange={({ x }) => this.handleRange(x, this.state.x, index)}
                              />
                            </div>
                          </div>
                        )
                      })}

                      <div className="form-group">
                        <label
                          className="col-sm-2 control-label"
                        >
                          CV
                          </label>

                        <div className="input-group image-preview col-md-8">
                          <input type="text" className="form-control image-preview-filename" value={this.state.cv.name ? this.state.cv.name : this.state.cv} disabled="disabled" />
                          <span className="input-group-btn">

                            <div className="btn btn-default image-preview-input">
                              <span className="glyphicon glyphicon-folder-open"></span>
                              <span className="image-preview-input-title">   Browse</span>
                              <input id="cv" name="photo" onChange={this.handleFormSubmit} type="file" accept="image/png, image/jpeg, image/gif" />
                            </div>
                          </span>
                        </div>
                        <div className="input-group image-preview col-md-10 col-md-offset-2">
                          {this.state.cv !== "" ?
                            <a target="_blank" href={process.env.REACT_APP_API_URL + "/" + this.state.cv} rel="noopener noreferrer">Click hereto see my cv</a>
                            : ""}
                        </div>
                      </div>

                      <div className="form-group">
                        <label
                          className="col-sm-2 control-label"
                        >
                          Note
                          </label>

                        <div className="col-sm-10">
                          <textarea
                            value={this.state.note}
                            id="note" name="note"
                            rows="5" cols="99" onChange={this.handleFormSubmit}>
                          </textarea>
                        </div>
                      </div>

                      <div className="form-group">
                        <div className="col-sm-offset-2 col-sm-10">
                          <button type="submit" className="btn btn-info">
                            Mettre à jour
                            </button>
                        </div>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>

      <Sidebar />
      <Footer />
    </div>
  );
}
}

const state = (state, ownProps = {}) => {
  return {
    location: state.location,
    listCats: state.getCategoriesList.listCategories,
    profileInfo: state.profileInfo.profileInfo.data,
    profileUpdated: state.profileUpdated,
    userStats: state.getUserStats.userStat,
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    navigateTo: (location) => {
      dispatch(push(location));
    },
    onGetCategoriesList: () => dispatch(getCategoriesList()),
    onUploadProfile: (data) => dispatch(uploadProfile(data)),
    onGetProfileInfo: (data) => dispatch(getProfileInfo()),
    onGetUserStats: () => dispatch(getUserStats()),
  }
};

export default connect(
  state,
  mapDispatchToProps
)(Profile);
