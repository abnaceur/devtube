
import React from "react";
import Header from '../../common/Header';
import Sidebar from '../../common/SideBar';
import Footer from '../../common/Footer';
import { connect } from "react-redux";
import { push } from "react-router-redux";
import { getUserStats } from '../../../store/actions/StatsActions/getStatsAction';
import { getAllProductsList } from '../../../store/actions/storeAction/getAllProductsList';
import { getUserWallet } from '../../../store/actions/UsersActions/getUserWalletAction';
import { claimProduct } from '../../../store/actions/storeAction/claimProductAction';
import { ToastContainer, toast } from 'react-toastify';
import { getUserNotification } from '../../../store/actions/UsersActions/getUserNotificationAction';
import Pagination from "../Utils/Pagination";

class Store extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            page: 0,
            tcoinValue: 0,
            allProducts: [],
            currentPagination: 0,
            allPagination: []
        }
        this.initPagination = this.initPagination.bind(this);
        this.activePagination = this.activePagination.bind(this);
        this.purchaceProduct = this.purchaceProduct.bind(this);
    }

    async purchaceProduct(e, product) {
        await this.props.onClaimProduct(product);
        setTimeout(async () => {
            await this.props.onGetUserWallet();
        }, 500)
    }

    async activePagination(event) {
        this.setState({
            currentPagination: parseInt(event.target.id, 10)
        })
        await this.initPagination();
        await this.props.onGetAllProductsList(this.state.currentPagination)
    }

    initPagination(active) {
        let allPagination = [];
        let totalPage = 0;

        totalPage = this.props.totalPage;
        for (var i = 0; i < totalPage; i++) {
            if (i === this.state.currentPagination)
                allPagination.push(<li style={{ 'cursor': 'pointer' }} onClick={this.activePagination} key={i} className="active"><span style={{'cursor': 'pointer'}} id={i}>{i + 1}</span></li>);
            else
                allPagination.push(<li style={{ 'cursor': 'pointer' }} onClick={this.activePagination} key={i}><span  style={{'cursor': 'pointer'}} id={i}>{i + 1}</span></li>);
        }
        i = 0;
        return allPagination;
    }

    async UNSAFE_componentWillReceiveProps(nextProps) {
        this.setState({
            allProducts: nextProps.allProducts
        })
        this.setState({
            tcoinValue: nextProps.getTcoin
        })

        if (nextProps.claimProduct === 200) {
            this.successNotification("Votre demande a été envoyé")
            await this.props.onGetUserNotification(0);
            await this.props.onClaimProduct("");
        }
    }

    successNotification(msg) {
        toast.success(msg, {
            position: toast.POSITION.TOP_RIGHT
        })
    }


    async UNSAFE_componentWillMount() {
        await this.props.onGetUserStats();
        await this.props.onGetAllProductsList(this.state.page)
        await this.props.onGetUserWallet();
    }

    render() {

        return (
            <div>
                <Header />
                <Sidebar />
                <div>
                    <div className="content-wrapper">
                        <section className="content">
                            <ToastContainer />
                            <section className="content">

                                <div className="row">
                                    <div className="col-md-12">
                                        <div className="box box-primary" id="fixMarginTop">
                                            <div className="box-header with-border">
                                                <h3 className="box-title">Boutique</h3>

                                                {/* <div className="box-tools pull-right">
                                                    <button type="button" className="btn btn-box-tool" data-widget="collapse"><i className="fa fa-minus"></i>
                                                    </button>
                                                    <button type="button" className="btn btn-box-tool" data-widget="remove"><i className="fa fa-times"></i></button>
                                                </div> */}
                                            </div>
                                            <div className="box-body">
                                                <div className="row">
                                                    <div className="projects_holder clearfix v3 standard">

                                                        {this.state.allProducts ? this.state.allProducts.map((product, index) => {
                                                            return (
                                                                <article key={index} className="mix portfolio_category_17 portfolio_category_5  mix_all" style={{ display: 'inline-block', opacity: '1' }}>
                                                                    <div className="image_holder"><span style={{'cursor': 'pointer'}} className="portfolio_link_for_touch" >
                                                                        <span className="store image">
                                                                            <img width="1100" height="825" 
                                                                            src={product.productPhoto.toString().substring(0, 5) === 'http' ? process.env.REACT_APP_API_URL + "/" + product.productPhoto
                                                                        : process.env.REACT_APP_API_URL + "/" + product.productPhoto } className="attachment-full wp-post-image" alt="qode interactive strata" />
                                                                        </span>
                                                                    </span>
                                                                        <span className="text_holder">
                                                                            <span className="text_outer">
                                                                                <span className="text_inner">
                                                                                    <span className="feature_holder">
                                                                                        <span className="store feature_holder_icons">
                                                                                            <span className="lightbox qbutton small white" title="Stockholm Fashion"
                                                                                                onClick={(e) => {
                                                                                                    this.state.tcoinValue >= product.productPrice && product.productStatus === "In stock" ?
                                                                                                        this.purchaceProduct(e, product)
                                                                                                        : console.log("nothing")
                                                                                                }}
                                                                                            >
                                                                                                {product.productStatus === "In stock" ? this.state.tcoinValue < product.productPrice ?
                                                                                                    product.productPrice - this.state.tcoinValue + " needed" : "PURCHACE" : "Out of stock"}
                                                                                            </span>
                                                                                        </span>
                                                                                    </span>
                                                                                </span>
                                                                            </span>
                                                                        </span>
                                                                    </div>
                                                                    <div className="text-center">
                                                                        <h5>
                                                                            <b>{product.productTitle}</b>
                                                                        </h5>
                                                                        <span className="project_category">
                                                                            <h5>{product.productPrice} <img style={{ position: 'relative', width: '13px', marginLeft: '3px', top: '-1px' }} src="./assets/dollar.svg" alt="imageStore" />
                                                                                <span style={{ position: 'relative', marginLeft: '2px', color: 'gold', fontSize: '13px', }}>TCoin
                        </span></h5>
                                                                        </span>
                                                                    </div>
                                                                </article>

                                                            )
                                                        }) : ""}
                                                    </div>

                                                    {this.props.allProducts && this.props.allProducts.length >= 0 ?
                                                        <Pagination activePagination={this.activePagination} currentPage={this.state.currentPagination} totalPage={this.props.totalPage} />
                                                        : ""}

                                                </div>
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
        claimProduct: state.claimProduct.claimProduct,
        getTcoin: state.getTcoin.getTcoin.data,
        allProducts: state.allProducts.allProducts.data,
        totalPage: state.allProducts.allProducts.total_pages + 1,
        userStats: state.getUserStats.userStat,
    }
}

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        navigateTo: (location) => {
            dispatch(push(location));
        },
        onGetUserStats: () => dispatch(getUserStats()),
        onGetAllProductsList: (page) => dispatch(getAllProductsList(page)),
        onGetUserWallet: () => dispatch(getUserWallet()),
        onClaimProduct: (data) => dispatch(claimProduct(data)),
        onGetUserNotification: (page) => dispatch(getUserNotification(page))
    }
};

export default connect(state, mapDispatchToProps)(Store);
