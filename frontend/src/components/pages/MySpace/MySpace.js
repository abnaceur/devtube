import React from "react";
import Header from '../../common/Header';
import Sidebar from '../../common/SideBar';
import Footer from '../../common/Footer';
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { push } from "react-router-redux";
import { storeMaterialDetails } from '../../../store/actions/materialAction/StoreMaterialDetails'
import { getAllMyMaterials } from '../../../store/actions/materialAction/getAllMyMaterials';
import { removeMaterial } from '../../../store/actions/materialAction/deleteMaterialAction';
import parse from 'html-react-parser';
import { ToastContainer, toast } from 'react-toastify';
import Pagination from "../Utils/Pagination";
import { addRequestAction } from '../../../store/actions/storeAction/RequestCourseAction';

class MySpace extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            displayRequestForm: "none",
            page: 0,
            currentPagination: 0,
            requestPrice: "",
            requestDescription: "",
            requestTitle: "",
            allPagination: []
        }

        this.handleChange = this.handleChange.bind(this);
        this.handleShowRequestForm = this.handleShowRequestForm.bind(this);
        this.goToMaterialDatails = this.goToMaterialDatails.bind(this);
        this.initPagination = this.initPagination.bind(this);
        this.activePagination = this.activePagination.bind(this);
        this.removeMaterial = this.removeMaterial.bind(this);
        this.handleAddRequest = this.handleAddRequest.bind(this);
    }

    fireNotification(style, msg) {
        toast[style](msg, {
            position: toast.POSITION.TOP_RIGHT
        })
    }

    removeMaterial(material) {
        this.setState({
            page: 0,
            currentPagination: 0,
        })
        this.props.onRemoveMaterial(material._id);
        setTimeout(() => {
            this.props.onGetAllMyMaterials(this.state.page);
        }, 300);
        document.getElementById('close' + material._id).click();
        toast.success("Material has been deleted", {
            position: toast.POSITION.TOP_RIGHT
        })
    }

    async activePagination(event) {
        this.setState({
            currentPagination: parseInt(event.target.id, 10)
        })
        await this.initPagination();
        await this.props.onGetAllMyMaterials(this.state.currentPagination);
    }

    goToMaterialDatails(material) {
        this.props.onStoreMaterialDetails(material);
    }

    async UNSAFE_componentWillMount() {
        await this.props.onGetAllMyMaterials(this.state.page);
    }

    initPagination(active) {
        let allPagination = [];

        for (var i = 0; i < this.props.totalPage; i++) {
            if (i === this.state.currentPagination)
                allPagination.push(<li onClick={this.activePagination} key={i} className="active"><span style={{ 'cursor': 'pointer' }} id={i}>{i + 1}</span></li>);
            else
                allPagination.push(<li onClick={this.activePagination} key={i}><span style={{ 'cursor': 'pointer' }} id={i}>{i + 1}</span></li>);
        }
        i = 0;
        return allPagination;
    }

    handleShowRequestForm() {
        if (this.state.displayRequestForm === 'none')
            this.setState({
                displayRequestForm: 'initial'
            })
        else
            this.setState({
                displayRequestForm: 'none'
            })
    }

    async handleAddRequest(e) {
        e.preventDefault();
        let validateUrl = /^(?:http(s)?:\/\/)?[\w.-]+(?:\.[\w\.-]+)+[\w\-\._~:/?#[\]@!\$&'\(\)\*\+,;=.]+$/;
        var regexNum = /^[0-9]+$/;

        let data = {
            title: this.state.requestTitle,
            description: this.state.requestDescription,
            price: this.state.requestPrice
        };

        if (data.price === "" || data.title === "" || data.description === "") {
            this.fireNotification('info', 'Tous les champs doivent etre emplis');
        } else if (data.description.match(validateUrl) === null) {
            this.fireNotification('warning', 'Le lien URL n\'est pas valide')
        } else if (data.price.match(regexNum) === null) {
            this.fireNotification('warning', 'Le prix doit etre un nombre')
        } else {
            await this.props.onAddRequestAction(data);
        }
    }

    handleChange(event) {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;

        this.setState({
            [name]: value
        });

    }


    UNSAFE_componentWillReceiveProps(nextProps) {
        if (nextProps.requestCourse === 200) {
            this.fireNotification('success', 'Votre demande est enregitrer avec succés');
        }
    }

    render() {
        return (
            <div>
                <Header />
                <Sidebar />
                <div>
                    <div className="content-wrapper">
                        <section className="content">
                            <div className="content">
                                <ToastContainer />
                                <section className="content">
                                    <div className="row">
                                        <div className="col-md-12">
                                            <div className="box box-primary" id="fixMarginTop">
                                                <div className="box-header with-border">
                                                    <div className="form-group">
                                                        <label style={{ fontSize: "20px", marginRight: "20px" }} className="control-label">Ajouter des ressources </label>
                                                        <Link to="/addmaterials?selected=mySpace" onClick={this.props.navigateTo.bind(this, '/addmaterials')}>
                                                            <button type="submit" className="btn btn-info">
                                                                <i className="fa fa-plus"></i>
                                                            </button>
                                                        </Link>
                                                        <label style={{ 'marginLeft': '2.5rem', fontSize: "20px", marginRight: "20px" }} className="control-label">Demander un cours </label>

                                                        {this.state.displayRequestForm === 'none' ?
                                                            <button type="button" onClick={() => { this.handleShowRequestForm() }} className="btn btn-info btn-flat"><i className="fa fa-plus"></i></button>
                                                            : <button type="button" onClick={() => { this.handleShowRequestForm() }} className="btn btn-danger btn-flat"><i className="fa fa-minus"></i></button>}

                                                        

                                                    </div>
                                                    <form onSubmit={(e) => { this.handleAddRequest(e) }} className="col col-md-5" style={{ 'display': this.state.displayRequestForm }}>
                                                            <div className="box-body">
                                                                <div className="form-group">
                                                                    <label>Titre</label>
                                                                    <input type="text" className="form-control" name="requestTitle" onChange={this.handleChange} id="requestTitle" placeholder="Entrez un titre" />
                                                                </div>

                                                                <div className="form-group">
                                                                    <label>Le lien vers le cours</label>
                                                                    <input type="text" className="form-control" name="requestDescription" onChange={this.handleChange} id="requestDescription" placeholder="Entrez le lien" required />
                                                                </div>

                                                                <div className="form-group">
                                                                    <label>Prix</label>
                                                                    <input type="text" className="form-control" name="requestPrice" onChange={this.handleChange} id="requestPrice" placeholder="Entrez le prix" required />
                                                                </div>
                                                            </div>

                                                            <div className="box-footer pull-right">
                                                                <button type="submit" style={{ backgroundColor: 'powderblue', color: 'black' }} className="btn btn-primary">Créer</button>
                                                            </div>
                                                        </form>
                                                    {/* <div className="box-tools pull-right">
                                                        <button type="button" className="btn btn-box-tool" data-widget="collapse"><i className="fa fa-minus"></i>
                                                        </button>
                                                        <button type="button" className="btn btn-box-tool" data-widget="remove"><i className="fa fa-times"></i></button>
                                                    </div> */}
                                                </div>
                                            </div>
                                        </div>


                                        <div className="col-md-12">
                                            <div className="box box-primary">
                                                <div className="box-header with-border">
                                                    <h3 className="box-title">Mes ressources ajouté</h3>

                                                    {/* <div className="box-tools pull-right">
                                                        <button type="button" className="btn btn-box-tool" data-widget="collapse"><i className="fa fa-minus"></i>
                                                        </button>
                                                        <button type="button" className="btn btn-box-tool" data-widget="remove"><i className="fa fa-times"></i></button>
                                                    </div> */}
                                                </div>
                                                <div className="box-body">
                                                    <div className="row" >
                                                        {/*<div className="input-group margin col-md-5">
                                                            <input type="text" className="form-control" />
                                                            <span className="input-group-btn">
                                                                <button type="button" className="btn btn-info btn-flat">search!</button>
                                                            </span>
        </div>*/}
                                                        <br></br>
                                                        {this.props.allMyMaterials && this.props.allMyMaterials.length > 0 ?
                                                            <span>
                                                                {this.props.allMyMaterials ? this.props.allMyMaterials.map(myMaterial => {
                                                                    return (
                                                                        <div key={myMaterial._id} className="col-md-3">
                                                                            <div id="" className="card-content">

                                                                                <div className="holder my-2 mx-auto p-relative bg-white shadow-1 blue-hover" style={{ 'overflow': 'hidden', 'borderRadius': '3%' }}>
                                                                                    <img src={process.env.REACT_APP_API_URL + "/" + myMaterial.photo} alt="Man with backpack"
                                                                                        className="d-block w-full" />

                                                                                    <div class="px-2 py-2">


                                                                                        <h1 className="ff-serif font-weight-normal text-black card-heading mt-0 mb-1" style={{ 'overflow': 'hidden', 'whiteSpace': 'nowrap', 'lineHeight': '1.25' }}>
                                                                                            {myMaterial.title}
                                                                                        </h1>

                                                                                        <p class="mb-1" style={{ height: '100px', lineHeight: '20px', overflow: 'hidden' }}>
                                                                                            {parse(myMaterial.description)}
                                                                                        </p>

                                                                                    </div>

                                                                                    <div className="text-right" style={{ 'marginRight': '20px' }}>
                                                                                        <div className="btn-group">
                                                                                            <Link to="/materialdetails?selected=mySpace" >
                                                                                                <button type="button" onClick={() => { this.goToMaterialDatails(myMaterial) }} className="btn btn-warning btn-flat"><i className="fa fa-eye"></i></button>
                                                                                            </Link>
                                                                                            <Link to="/editMaterial" >
                                                                                                <button type="button" onClick={() => { this.goToMaterialDatails(myMaterial) }} className="btn btn-info btn-flat"><i className="fa fa-edit"></i></button>
                                                                                            </Link>
                                                                                            <Link to="#" >
                                                                                                <button data-toggle="modal" data-target={'#' + myMaterial._id} type="button" className="btn btn-danger btn-flat"><i className="fa fa-trash"></i></button>
                                                                                            </Link>
                                                                                        </div>
                                                                                    </div>
                                                                                    <br></br>
                                                                                </div>
                                                                                <div className="card-desc">

                                                                                    <div key={myMaterial._id} className="modal fade" id={myMaterial._id}>
                                                                                        <div className="modal-dialog">
                                                                                            <div className="modal-content">
                                                                                                <div className="modal-header">
                                                                                                    <button
                                                                                                        type="button"
                                                                                                        className="close"
                                                                                                        data-dismiss="modal"
                                                                                                        aria-label="Close"
                                                                                                    >
                                                                                                        <span aria-hidden="true">&times;</span>
                                                                                                    </button>
                                                                                                    <h4 className="modal-title">Confirmation</h4>
                                                                                                </div>
                                                                                                <div className="modal-body">
                                                                                                    <p>Etes-vous sure de vouloir supprimer cette ressource ?</p>
                                                                                                </div>
                                                                                                <div className="modal-footer">
                                                                                                    <button
                                                                                                        type="button"
                                                                                                        className="btn btn-danger pull-right"
                                                                                                        onClick={() => { this.removeMaterial(myMaterial) }}
                                                                                                    >
                                                                                                        Valider
              </button>
                                                                                                    <button
                                                                                                        type="button"
                                                                                                        className="btn btn-default pull-right"
                                                                                                        data-dismiss="modal"
                                                                                                        id={"close" + myMaterial._id}
                                                                                                    >
                                                                                                        Fermer
              </button>
                                                                                                </div>
                                                                                            </div>
                                                                                        </div>
                                                                                    </div>

                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                    )
                                                                }) : ""}
                                                            </span> :
                                                            <div className="col-md-12">
                                                                <h5>Cette liste est vide.</h5>
                                                            </div>
                                                        }






                                                    </div>
                                                    {this.props.allMyMaterials && this.props.allMyMaterials.length > 0 ?

                                                        <Pagination activePagination={this.activePagination} currentPage={this.state.currentPagination} totalPage={this.props.totalPage} />
                                                        : ""}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </section>
                            </div>

                        </section>
                    </div>
                </div>

                <Footer />
            </div>
        );
    }
}

const state = (state, ownProps = {}) => {
    return {
        requestCourse: state.requestCourse.requestCourse,
        location: state.location,
        allMyMaterials: state.getAllMyMaterials.allMyMaterials.data,
        totalPage: state.getAllMyMaterials.allMyMaterials.total_pages + 1,
        deleteMaterial: state.deleteMaterial.materialDeleted
    }
}

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        navigateTo: (location) => {
            dispatch(push(location));
        },
        onAddRequestAction: (data) => dispatch(addRequestAction(data)),
        onGetAllMyMaterials: (page) => dispatch(getAllMyMaterials(page)),
        onStoreMaterialDetails: (data) => dispatch(storeMaterialDetails(data)),
        onRemoveMaterial: (data) => dispatch(removeMaterial(data)),
    }
};

export default connect(state, mapDispatchToProps)(MySpace);
