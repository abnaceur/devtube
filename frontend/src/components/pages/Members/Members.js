
import React from "react";
import { getCategoriesList } from '../../../store/actions/materialAction/getCategoriesList';
import { getAllMembers } from '../../../store/actions/UsersActions/getAllUsers';
import { getAllFilteredMembers } from '../../../store/actions/UsersActions/getAllFilteredUsers';
import Header from '../../common/Header';
import Sidebar from '../../common/SideBar';
import Footer from '../../common/Footer';
import parse from "html-react-parser";
import { connect } from "react-redux";
import { push } from "react-router-redux";
import Pagination from "../Utils/Pagination";
import { ScrollView } from "@cantonjs/react-scroll-view";

class Memebers extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            // colorLabel: ['label-success', 'label-info', 'label-warning', 'label-primary'],
            colorLabel: ['success', 'info', 'danger', 'primary'],
            page: 0,
            allMembers: [],
            selectedCategory: "",
            currentPagination: 0,
            allPagination: []
        }
        this.handleChangeFilterCat = this.handleChangeFilterCat.bind(this);
        this.initPagination = this.initPagination.bind(this);
        this.activePagination = this.activePagination.bind(this);
    }

    handleChangeFilterCat(event) {
        const target = event.target;
        const value = target.value;

        this.setState({
            selectedCategory: value,
            currentPagination: 0,
        });
        if (value !== "") {
            this.props.onGetAllFilteredMembers(0, value);
        } else {
            this.props.onGetAllMembers(0);
        }
    }

    async activePagination(event) {
        this.setState({
            currentPagination: parseInt(event.target.id, 10)
        })
        await this.initPagination();
        if (this.state.selectedCategory === "")
            await this.props.onGetAllMembers(this.state.currentPagination);
        else
            await this.props.onGetAllFilteredMembers(this.state.currentPagination, this.state.selectedCategory)
    }

    UNSAFE_componentWillReceiveProps(nextProps) {
        if (this.state.selectedCategory !== "")
            this.setState({
                allMembers: nextProps.allFilteredMembers
            })
        else
            this.setState({
                allMembers: nextProps.allMembers
            })
    }
    async UNSAFE_componentWillMount() {
        await this.props.onGetAllMembers();
        await this.props.onGetCategoriesList();
    }

    initPagination(active) {
        let allPagination = [];
        let totalPage = 0;

        if (this.state.selectedCategory !== "")
            totalPage = this.props.totalPageFilteredMembers
        else
            totalPage = this.props.totalPage;

        for (var i = 0; i < totalPage; i++) {
            if (i === this.state.currentPagination)
                allPagination.push(<li onClick={this.activePagination} key={i} className="active"><span style={{ 'cursor': 'pointer' }} id={i}>{i + 1}</span></li>);
            else
                allPagination.push(<li onClick={this.activePagination} key={i}><span style={{ 'cursor': 'pointer' }} id={i}>{i + 1}</span></li>);
        }
        i = 0;
        return allPagination;
    }


    render() {

        return (
            <div>
                <Header />
                <Sidebar />
                <div>
                    <div className="content-wrapper">
                        <section className="content">

                            <section className="content">

                                <div className="row">
                                    <div className="col-md-12">
                                        <div className="box box-primary" id="fixMarginTop">
                                            <div className="box-header with-border">
                                                <h3 className="box-title">Liste des membres</h3>

                                                {/* <div className="box-tools pull-right">
                                                    <button type="button" className="btn btn-box-tool" data-widget="collapse"><i className="fa fa-minus"></i>
                                                    </button>
                                                    <button type="button" className="btn btn-box-tool" data-widget="remove"><i className="fa fa-times"></i></button>
                                                </div> */}
                                            </div>
                                            <div className="box-body">
                                                <div className="row">

                                                    <form className="form-inline margin">
                                                        {/*  <div className="form-group margin">
                                                            <input type="text" className="form-control" />
                                                            <button type="button" className="btn btn-info btn-flat">search!</button>
        </div>*/}
                                                        <div className="form-group margin">
                                                            <label style={{ marginRight: "15px" }} >Filtrer par compétence</label>
                                                            <select className="form-control" name="category" onChange={this.handleChangeFilterCat} placeholder="Enter category">
                                                                <option value="" >Select</option>
                                                                {this.props.listCats.map(cat => {
                                                                    return (
                                                                        <option key={cat._id} value={cat._id} >{cat.categoryTitle}</option>
                                                                    )
                                                                })}   </select>
                                                        </div>
                                                    </form>
                                                    <br></br>

                                                    {this.state.allMembers ?
                                                        this.state.allMembers.map((member, index) => {
                                                            return (
                                                                <div key={index} className="modal fade" id={member._id}>
                                                                    <div className="modal-dialog">
                                                                        <div className="modal-content">
                                                                            <div className="box box-widget widget-user-2">

                                                                                <div className="widget-user-header bg-blue">
                                                                                    <div className="widget-user-image">
                                                                                        <img className="img-circle" src={member.imageUrl} alt="User Avatar" />
                                                                                    </div>

                                                                                    <h3 className="widget-user-username">
                                                                                        ** {member.firstname.length < 2 ? member.givenName : member.firstname}
                                                                                        {" "}{member.lastname === "" ? member.familyName : member.lastname} **
                                                                                    </h3>
                                                                                    <h5 className="widget-user-desc">{member.companyPosition}</h5>
                                                                                    <h6 className="widget-user-desc">Contact : {member.email}</h6>
                                                                                </div>
                                                                                <div class="box-footer no-padding">
                                                                                    <ul class="nav nav-stacked">
                                                                                        <li>
                                                                                            <h3 className="progress-title">Note</h3>

                                                                                        </li>
                                                                                        {/* <li><a href="#">Tasks <span class="pull-right badge bg-aqua">5</span></a></li>
                                                                                        <li><a href="#">Completed Projects <span class="pull-right badge bg-green">12</span></a></li>
                                                                                        <li><a href="#">Followers <span class="pull-right badge bg-red">842</span></a></li> */}

                                                                                        <li>
                                                                                            {/* {member.note.length > 0 ?
                                                                                                <span>
                                                                                                    <p><b>Note</b></p>
                                                                                                    <p>{member.note}</p>
                                                                                                </span>
                                                                                                : ""} */}

                                                                                            <ScrollView style={{ marginLeft: "30px", marginRight: '30px', height: '20vh' }}>
                                                                                                {member.note.length > 0
                                                                                                    ? parse(
                                                                                                        member.note
                                                                                                    )
                                                                                                    : ""}
                                                                                            </ScrollView>
                                                                                        </li>
                                                                                    </ul>
                                                                                    <ScrollView style={{ height: '35vh' }}>

                                                                                        {member.skills.map((option, index) => {
                                                                                            return (
                                                                                                <div key={index}>
                                                                                                    <h3 className="progress-title">{option.label}</h3>
                                                                                                    <div className="progress">
                                                                                                        <div className={"progress-bar progress-bar-" + this.state.colorLabel[Math.floor(Math.random() * 3) + 0] + " progress-bar-striped active"} style={{ width: option.rang + '%' }}>
                                                                                                            <div className="progress-value">{option.rang}%</div>
                                                                                                        </div>
                                                                                                    </div>
                                                                                                </div>
                                                                                            )
                                                                                        })}
                                                                                    </ScrollView>
                                                                                </div>



                                                                                <ul style={{ position: 'relative', 'bottom': '0px' }} id="services">
                                                                                    <li class="linkedin">
                                                                                        {member.cv !== "" ?
                                                                                            <div class="github">
                                                                                                <a href={process.env.REACT_APP_API_URL + "/" + member.cv} target="_blank" rel="noopener noreferrer">
                                                                                                    <i class="fa fa-file" aria-hidden="true"></i>
                                                                                                </a>
                                                                                            </div>
                                                                                            : ""}
                                                                                    </li>
                                                                                    <li className="github">
                                                                                        {member.linkedin !== "" ?
                                                                                            <div class="github">
                                                                                                <a href={member.linkedin} target="_blank" rel="noopener noreferrer">
                                                                                                    <i class="fa fa-linkedin" aria-hidden="true"></i>
                                                                                                </a>
                                                                                            </div>
                                                                                            : ""}
                                                                                    </li>
                                                                                    <li className="github">
                                                                                        {member.gitlab !== "" ?
                                                                                            <div class="github">
                                                                                                <a href={member.gitlab} target="_blank" rel="noopener noreferrer">
                                                                                                    <i class="fa fa-github" aria-hidden="true"></i>
                                                                                                </a>
                                                                                            </div>
                                                                                            : ""}
                                                                                    </li>
                                                                                    <li className="github">
                                                                                        {member.website !== "" ?
                                                                                            <div class="github">
                                                                                                <a href={member.website} target="_blank" rel="noopener noreferrer">
                                                                                                    <i class="fa fa-sitemap" aria-hidden="true"></i>
                                                                                                </a>
                                                                                            </div>
                                                                                            : ""}
                                                                                    </li>
                                                                                </ul>
                                                                            </div>
                                                                            <div class="modal-footer">
                                                                                <button type="button" class="btn btn-default pull-left" data-dismiss="modal">Fermer</button>
                                                                                {/* <button type="button" class="btn btn-primary">Save changes</button> */}
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </div>)
                                                        }) : ""}

                                                    <div className="box-body no-padding">
                                                        <ul style={{ flex: '3' }} className="users-list clearfix">
                                                            {this.state.allMembers ?
                                                                this.state.allMembers.map((member, index) => {
                                                                    return (
                                                                        <li key={index} style={{ width: '140px' }} data-toggle="modal" data-target={'#' + member._id}>
                                                                            <img src={member.imageUrl} alt="User Image" />
                                                                            <a className="users-list-name" href="#" >{member.firstname === "" ? member.givenName : member.firstname}
                                                                                {" "}{member.lastname === "" ? member.familyName : member.lastname}</a>
                                                                            <span style={{ height: '40px', 'wordWrap': 'break-word', overflow: 'hidden' }} className="users-list-date">{member.companyPosition}</span>
                                                                        </li>

                                                                        // <div key={index} className="col-md-2">

                                                                        //     <aside className="asideCard profile-card">

                                                                        //         <header className="headerCard">

                                                                        //             <a href="/#/">
                                                                        //                 <img className="imgCard" src={member.imageUrl} />
                                                                        //             </a>

                                                                        //             <h1 className="h1Card">{member.firstname} {member.lastname}</h1>

                                                                        //             <h2 className="h2Card">- {member.companyPosition} -</h2>

                                                                        //         </header>

                                                                        //         <div className="profile-bio">
                                                                        //             {member.note.length > 0 ?
                                                                        //                 <span>
                                                                        //                     <p><b>Note</b></p>
                                                                        //                     <p>{member.note}</p>
                                                                        //                 </span>
                                                                        //                 : ""}
                                                                        //             {/* {member.skills.length > 0 ? <p><b>Skills</b></p> : ""} */}

                                                                        //             {member.skills.map((option, index) => {
                                                                        //                 return (
                                                                        //                     <div key={index}>
                                                                        //                         <h3 style={{ 'color': 'white' }} className="progress-title">{option.label}</h3>
                                                                        //                         <div className="progress">
                                                                        //                             <div className={"progress-bar progress-bar-" + this.state.colorLabel[Math.floor(Math.random() * 3) + 0] + " progress-bar-striped active"} style={{ width: option.rang + '%' }}>
                                                                        //                                 <div className="progress-value">{option.rang}%</div>
                                                                        //                             </div>
                                                                        //                         </div>
                                                                        //                     </div>
                                                                        //                 )
                                                                        //             })}

                                                                        //             {member.website === "" && member.linkedin === "" && member.cv === ""
                                                                        //                 && member.gitlab === "" && member.skills.length == 0 ?
                                                                        //                 <span>This profile information is not completed yet.</span>
                                                                        //                 : ""}
                                                                        //         </div>
                                                                        //         <br></br>



                                                                        //         <ul className="profile-social-links">
                                                                        //             <li>
                                                                        //                 {member.cv !== "" ?
                                                                        //                     <a target="_blank" href={process.env.REACT_APP_API_URL + "/" + member.cv} rel="noopener noreferrer" className="social-icon text-xs-center">
                                                                        //                         <i style={{ 'marginTop': '5px', 'backgroundColor': 'white', 'color': 'black', 'fontSize': '16px', 'borderRadius': '50%', 'width': '23px', 'height': '23px', 'display': 'block', 'textAlign': 'center' }} className="fa fa-file"></i>
                                                                        //                     </a>
                                                                        //                     : ""}
                                                                        //             </li>
                                                                        //             <li >
                                                                        //                 {member.linkedin !== "" ?
                                                                        //                     <a href={member.linkedin} className="social-icon text-xs-center" target="_blank" rel="noopener noreferrer" >
                                                                        //                         <i style={{ 'marginTop': '5px', 'backgroundColor': 'white', 'color': 'black', 'fontSize': '16px', 'borderRadius': '50%', 'width': '23px', 'height': '23px', 'display': 'block', 'textAlign': 'center' }} className="fa fa-linkedin"></i>
                                                                        //                     </a>
                                                                        //                     : ""}
                                                                        //             </li>
                                                                        //             <li >
                                                                        //                 {member.gitlab !== "" ?
                                                                        //                     <a href={member.gitlab} className="social-icon text-xs-center" target="_blank" rel="noopener noreferrer" >
                                                                        //                         <i style={{ 'marginTop': '5px', 'backgroundColor': 'white', 'color': 'black', 'fontSize': '16px', 'borderRadius': '50%', 'width': '23px', 'height': '23px', 'display': 'block', 'textAlign': 'center' }} className="fa fa-github"></i>
                                                                        //                     </a>
                                                                        //                     : ""}
                                                                        //             </li>
                                                                        //             <li >
                                                                        //                 {member.website !== "" ?
                                                                        //                     <a href={member.website} className="social-icon text-xs-center" target="_blank" rel="noopener noreferrer">
                                                                        //                         <i style={{ 'marginTop': '5px', 'backgroundColor': 'white', 'color': 'black', 'fontSize': '16px', 'borderRadius': '50%', 'width': '23px', 'height': '23px', 'display': 'block', 'textAlign': 'center' }} className="fa fa-sitemap"></i>
                                                                        //                     </a>
                                                                        //                     : ""}
                                                                        //             </li>
                                                                        //         </ul>

                                                                        //     </aside>


                                                                        // </div>
                                                                    )
                                                                })
                                                                : ""}
                                                        </ul>
                                                    </div>

                                                </div>

                                                {
                                                    this.props.allMembers && this.props.allMembers.length >= 0 ?
                                                        <Pagination activePagination={this.activePagination} currentPage={this.state.currentPagination} totalPage={this.props.totalPage} />
                                                        : ""
                                                }

                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </section>


                        </section>
                    </div>
                </div>
                <Footer />
            </div >

        );
    }
}

const state = (state, ownProps = {}) => {
    return {
        location: state.location,
        allMembers: state.getAllMembers.allMemebers.data,
        allFilteredMembers: state.getAllfilteredMembers.allMemebers.data,
        totalPageFilteredMembers: state.getAllfilteredMembers.allMemebers.total_pages + 1,
        totalPage: state.getAllMembers.allMemebers.total_pages + 1,
        listCats: state.getCategoriesList.listCategories
    }
}

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        navigateTo: (location) => {
            dispatch(push(location));
        },
        onGetCategoriesList: () => dispatch(getCategoriesList()),
        onGetAllMembers: (page) => dispatch(getAllMembers(page)),
        onGetAllFilteredMembers: (page, catId) => dispatch(getAllFilteredMembers(page, catId))
    }
};

export default connect(state, mapDispatchToProps)(Memebers);
