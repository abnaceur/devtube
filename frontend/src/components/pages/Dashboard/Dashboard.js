import React from "react";
import Header from '../../common/Header';
import Sidebar from '../../common/SideBar';
import Footer from '../../common/Footer';
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { push } from "react-router-redux";
import { ToastContainer, toast } from 'react-toastify';
import { getAllMembersDash } from '../../../store/actions/dashboardAction/getAlluserDashAction';
import { getCategoriesListDash } from '../../../store/actions/dashboardAction/getAllCategoriesDash';
import { updateUserDash } from '../../../store/actions/dashboardAction/updateUserAction';
import { addCategoryDash } from '../../../store/actions/dashboardAction/addCategoryAction';
import { addProductToStoreDash } from '../../../store/actions/dashboardAction/addProductToStoreAction';
import { getProductListDash } from '../../../store/actions/dashboardAction/getAllproductsAction';
import { editCategotyDash } from '../../../store/actions/dashboardAction/editCategoryAction';
import { editProductDash } from '../../../store/actions/dashboardAction/editProductDashAction';
import { removeCategoryDash } from '../../../store/actions/dashboardAction/removeCategoryDash';
import { removeProductDash } from '../../../store/actions/dashboardAction/removeProductDashAction';
import { getUserWallet } from '../../../store/actions/UsersActions/getUserWalletAction';
import { getAllClaimsList } from '../../../store/actions/dashboardAction/getAllUserClaimsAction';
import { editUserClaimDash } from '../../../store/actions/dashboardAction/editUserClaimAction';
import { getUserNotification } from '../../../store/actions/UsersActions/getUserNotificationAction';
import Moment from 'moment';
import { css } from '@emotion/core';
import Pagination from '../Utils/Pagination';
import { addChatBotDash } from '../../../store/actions/ChatbotActions/sendQuestionAction';
import { getChatbotListDash } from '../../../store/actions/ChatbotActions/GetAllChatBotInfo';
import { delChatbotMsgDash } from '../../../store/actions/ChatbotActions/RemoveChatbotMsgAction';
import { editChatbotHtttpDash } from '../../../store/actions/ChatbotActions/EditChatBotMsgAction';
import { trainChatBotAIDash } from '../../../store/actions/ChatbotActions/TrainChatBotAIAction';
import RobotLoading from '../Utils/roboLoading';

const override = css`
    display: block;
    margin: 0 auto;
    border-color: red;
    opacity: 0.5;
`;

class Dashboard extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            onLoding: false,
            productTitle: "",
            productDescription: "",
            productPhoto: {
                name: ""
            },
            productStatus: [],
            pageClaim: 0,
            productPhotoEdited: [],
            productPrice: "",
            loading: true,
            allChatBot: [],
            displayStoreForm: "none",
            displayCategoryForm: "none",
            displayChatBotForm: "none",
            pageMembers: 0,
            role: [],
            chatBotLangArr: [],
            responseUser: "",
            editCategoryElem: [],
            editChatbotElem: [],
            editProductElem: [],
            editClaimElem: [],
            editUserElem: [],
            blocked: [],
            chatBotResponse: "",
            chatBotKey: "",
            chatBotLanguage: "fr",
            chatBotQuestion: "",
            claimStatus: [],
            pageCats: 0,
            pageChatBot: 0,
            pageStore: 0,
            editCatElem: "",
            allProducts: [],
            categoryName: "",
            allMembers: [],
            allCategories: [],
            currentPaginationCats: 0,
            currentPaginationClaims: 0,
            allPaginationCats: [],
            currentPaginationMembers: 0,
            currentPaginationProducts: 0,
            allPaginationMembers: [],
        }
        this.handleChange = this.handleChange.bind(this);
        this.updateThisUser = this.updateThisUser.bind(this);

        this.handleShowCatForm = this.handleShowCatForm.bind(this);
        this.handleShowStoreForm = this.handleShowStoreForm.bind(this);

        this.initPaginationMembers = this.initPaginationMembers.bind(this);
        this.activePaginationMembers = this.activePaginationMembers.bind(this);

        this.initPaginationClaims = this.initPaginationClaims.bind(this);
        this.activePaginationClaims = this.activePaginationClaims.bind(this);

        this.initPaginationProducts = this.initPaginationProducts.bind(this);
        this.activePaginationProducts = this.activePaginationProducts.bind(this);

        this.addProductToStore = this.addProductToStore.bind(this);

        this.initPaginationCats = this.initPaginationCats.bind(this);
        this.activePaginationCats = this.activePaginationCats.bind(this);
        this.handleAddCategory = this.handleAddCategory.bind(this);

        this.initPaginationChatbot = this.initPaginationChatbot.bind(this);
        this.activePaginationChatBot = this.activePaginationChatBot.bind(this);
        this.handleAddChatBot = this.handleAddChatBot.bind(this);


        this.editCatgory = this.editCatgory.bind(this);
        this.editChatbot = this.editChatbot.bind(this);
        this.editProduct = this.editProduct.bind(this);

        this.handleEditStorePhoto = this.handleEditStorePhoto.bind(this);
        this.editedStatusOptions = this.editedStatusOptions.bind(this);

        this.removeCategory = this.removeCategory.bind(this);
        this.removeProduct = this.removeProduct.bind(this);
        this.removeChatbot = this.removeChatbot.bind(this);

        this.initEditChatbotButton = this.initEditChatbotButton.bind(this);
        this.initEditCatButton = this.initEditCatButton.bind(this);
        this.initEditProductButton = this.initEditProductButton.bind(this);
        this.initEditMemeberButton = this.initEditMemeberButton.bind(this);

        this.editUserClaim = this.editUserClaim.bind(this);
        this.initEditClaimButton = this.initEditClaimButton.bind(this);

        this.handleTrainChatBot = this.handleTrainChatBot.bind(this);
    }

    async handleTrainChatBot(e) {
        e.preventDefault();
        this.setState({ onLoding: true })
        await this.props.onTrainChatBotAIDash();
        setTimeout(() => {
            this.setState({ onLoding: false })
        }, 1500)
    }

    initEditClaimButton(e, claim) {
        let value = this.state.editClaimElem;
        value[claim._id] === 'true' ?
            value[claim._id] = 'false' : value[claim._id] = 'true'

        this.setState({
            editClaimElem: value
        })
    }

    async editUserClaim(e, claimId) {
        let value = this.state.editClaimElem;
        value[claimId] = 'false';


        let data = {
            id: claimId,
            claimStatus: this.state.claimStatus[claimId]
        }

        if (this.state.claimStatus === "")
            this.fireNotification("info", "Aucun changement à mettre à jour")
        else
            await this.props.onEditUserClaimDash(data);

        //        setTimeout(() => {
        //          this.setState({
        //            editClaimElem: value,
        //          claimStatus: ""
        //    })
        //M}, 500)
    }

    initEditProductButton(e, product) {
        let value = this.state.editProductElem;
        value[product._id] === 'true' ?
            value[product._id] = 'false' : value[product._id] = 'true'

        this.setState({
            editProductElem: value
        })
    }

    initEditMemeberButton(e, memebr) {
        let value = this.state.editUserElem;
        value[memebr._id] === 'true' ?
            value[memebr._id] = 'false' : value[memebr._id] = 'true'

        this.setState({
            editUserElem: value
        })
    }

    initEditCatButton(e, catId) {
        let value = this.state.editCategoryElem;
        value[catId] === 'true' ?
            value[catId] = 'false' : value[catId] = 'true'
        this.setState({
            editCategoryElem: value
        })
    }

    initEditChatbotButton(e, chatbotId) {
        e.preventDefault();

        let value = this.state.editChatbotElem;
        value[chatbotId] === 'true' ?
            value[chatbotId] = 'false' : value[chatbotId] = 'true'
        this.setState({
            editChatbotElem: value
        })
    }

    async removeCategory(e, catId) {
        e.preventDefault()
        await this.props.onRemoveCategoryDash(catId);
    }

    async removeChatbot(e, chatbotId) {
        e.preventDefault();
        await this.props.onDelChatbotMsgDash(chatbotId);
        setTimeout(async () => {
            await this.props.onGetChatbotListDash(this.state.currentPaginationChatBot);
        }, 100)
    }

    async removeProduct(e, productId) {
        e.preventDefault()
        await this.props.onRemoveProductDash(productId);
    }

    editedStatusOptions(prodId, status, active) {
        if (status === 'In stock' && (active === 'false' || active === undefined))
            return (
                <select disabled={true} className="form-control" name="productStatus" value={this.state.productStatus[prodId]}>
                    <option value="In stock">In stock</option>
                    <option value="Out of stock">Out of stock</option>
                </select>
            )
        else if (status === 'In stock' && active === 'true')
            return (
                <select className="form-control" name="productStatus" value={this.state.productStatus[prodId]} id={prodId} onChange={this.handleChange}>
                    <option value="In stock">In stock</option>
                    <option value="Out of stock">Out of stock</option>
                </select>
            )
        else if (active === 'false' || active === undefined)
            return (
                <select disabled={true} className="form-control" name="productStatus" value={this.state.productStatus[prodId]}>
                    <option value="Out of stock">Out of stock</option>
                    <option value="In stock">In stock</option>
                </select>
            )
        else
            return (
                <select className="form-control" name="productStatus" value={this.state.productStatus[prodId]} id={prodId} onChange={this.handleChange}>
                    <option value="Out of stock">Out of stock</option>
                    <option value="In stock">In stock</option>
                </select>
            )
    }

    handleEditStorePhoto(event, productId) {
        const target = event.target;
        let photo = [];

        photo[productId] = target.files[0];

        if (target.type === "file") {
            this.setState({
                productPhotoEdited: photo
            });
        }
    }

    async editProduct(e, product) {
        let productTitle = document.getElementById(product._id + '_name').innerHTML;
        let productDescription = document.getElementById(product._id + '_desc').innerHTML;
        let productPrice = document.getElementById(product._id + '_price').innerHTML;

        let value = this.state.editProductElem;
        value[product._id] = 'false';
        this.setState({
            editProductElem: value
        })

        let data = "";

        if (this.state.productPhotoEdited[product._id] === undefined) {
            data = {
                productStatus: this.state.productStatus === "" ? product.productStatus : this.state.productStatus[product._id],
                productId: product._id,
                photoChanged: false,
                productTitle,
                productDescription,
                productPrice,
                photo: product.productPhoto
            }
        } else {
            data = {
                productStatus: this.state.productStatus === "" ? product.productStatus : this.state.productStatus[product._id],
                productId: product._id,
                photoChanged: true,
                productTitle,
                productDescription,
                productPrice,
                photo: product.productPhoto,
                productPhoto: this.state.productPhotoEdited[product._id]
            }
        }

        await this.props.onEditProductDash(data);

    }

    async editChatbot(e, chatbot) {
        e.preventDefault();

        let key = document.getElementById(chatbot._id + '_key').innerHTML;
        let question = document.getElementById(chatbot._id + '_ques').innerHTML;
        let response = document.getElementById(chatbot._id + '_resp').innerHTML;

        let data = {
            chatBotId: chatbot._id,
            chatBotQuestion: question,
            chatBotLanguage: this.state.chatBotLangArr === [] ? chatbot.chatBotLang : this.state.chatBotLangArr[chatbot._id],
            chatBotKey: key,
            chatBotResponse: response
        }

        var regex = /^[0-9a-zA-Z]+.+[0-9a-zA-Z]+$/;

        if (data.chatBotResponse === "" || data.chatBotKey === "" || data.chatBotLanguage === ""
            || data.chatBotQuestion === "")
            this.fireNotification('warning', 'Tous les champs sont obligatoires')
        else if (data.chatBotKey.match(regex) === null) {
            this.fireNotification('warning', 'La Clé doit etre de cette format [mot].[mot]')
        } else {
            let value = this.state.editChatbotElem;
            value[chatbot._id] === 'false' ?
                value[chatbot._id] = 'true' : value[chatbot._id] = 'false';

            this.setState({
                editChatbotElem: value
            })
            await this.props.onEditChatbotHtttpDash(data);
        }
    }

    editCatgory(e, catId) {
        let value = this.state.editCategoryElem;
        value[catId] === 'false' ?
            value[catId] = 'true' : value[catId] = 'false';

        this.setState({
            editCategoryElem: value
        })
        let catValue = document.getElementById(catId).innerHTML;
        let data = {
            id: catId,
            name: catValue
        }
        this.props.onEditCategotyDash(data)

    }

    async addProductToStore(e) {
        e.preventDefault();
        let data = {
            productTitle: this.state.productTitle,
            productDescription: this.state.productDescription,
            productPhoto: this.state.productPhoto,
            productPrice: this.state.productPrice,
        }

        if (this.state.productPhoto.name !== "") {
            await this.props.onAddProductToStoreDash(data);
        }
        else
            this.fireNotification("warning", "Photo est obligqtoire");

    }

    handleAddCategory(e) {
        e.preventDefault();
        if (this.state.categoryName === "")
            this.fireNotification('warning', 'Nom doit ètre rempli !');
        else {
            let data = {
                name: this.state.categoryName
            }
            this.props.onAddCategoryDash(data);
            setTimeout(() => {
                this.props.onGetCategoriesListDash(this.state.pageCats);
            }, 400)
        }
    }

    async handleAddChatBot(e) {
        e.preventDefault();
        let data = {
            chatBotQuestion: this.state.chatBotQuestion,
            chatBotLanguage: this.state.chatBotLanguage,
            chatBotKey: this.state.chatBotKey,
            chatBotResponse: this.state.chatBotResponse
        }

        var regex = /^[0-9a-zA-Z]+.+[0-9a-zA-Z]+$/;

        if (data.chatBotResponse === "" || data.chatBotKey === "" || data.chatBotLanguage === ""
            || data.chatBotQuestion === "")
            this.fireNotification('warning', 'Tous les champs sont obligatoires')
        else if (data.chatBotKey.match(regex) === null) {
            this.fireNotification('warning', 'La Clé doit etre de cette format [mot].[mot]')
        } else {
            //TODO REGEXT FOR THE KEY FORMAT

            await this.props.onAddChatBotDash(data);
            setTimeout(async () => {
                this.setState({
                    pageChatBot: 0
                })
                this.activePaginationChatBot(e)
                await this.props.onGetChatbotListDash(this.state.pageChatBot);
            }, 100)
        }
    }

    updateThisUser(member) {
        let data;
        let value = this.state.editUserElem;
        value[member._id] = 'false';
        this.setState({
            editUserElem: value
        })

        if (this.state.role[member._id] !== "" || this.state.blocked[member._id] !== "") {
            data = {
                blocked: this.state.blocked[member._id],
                role: this.state.role[member._id],
                id: member._id,
            }
            this.props.onUpdateUserDash(data);
        }
        else {
            this.fireNotification('warning', 'Aucun changement à mettre à jour !');
        }

    }

    fireNotification(style, msg) {
        toast[style](msg, {
            position: toast.POSITION.TOP_RIGHT
        })
    }

    handleChange(event) {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;
        let claimId = "";
        let roleId = "";
        let botId = "";
        let blockedId = "";
        let productStatusId = "";

        if (name === "claimStatus") {
            claimId = target.id;
            let claimStatus = this.state.claimStatus
            claimStatus[claimId] = value;
            this.setState({
                claimStatus
            })
        } else if (name === "blocked") {
            blockedId = target.id;
            let blocked = this.state.blocked
            blocked[blockedId] = value;
            this.setState({
                blocked
            })
        } else if (name === "role") {
            roleId = target.id;
            let role = this.state.role
            role[roleId] = value;
            this.setState({
                role
            })
        } else if (name === "chatBotLangArr") {
            botId = target.id;
            let chatBotLangArr = this.state.chatBotLangArr
            chatBotLangArr[botId] = value;
            this.setState({
                chatBotLangArr
            })
        } else if (name === "productStatus") {
            productStatusId = target.id;
            let productStatus = this.state.productStatus
            productStatus[productStatusId] = value;
            this.setState({
                productStatus
            })
        } else if (target.type === "file") {
            this.setState({
                productPhoto: target.files[0]
            });
        } else {
            this.setState({
                [name]: value
            });
        }
    }

    handleShowCatForm() {
        if (this.state.displayCategoryForm === 'none')
            this.setState({
                displayCategoryForm: 'initial'
            })
        else
            this.setState({
                displayCategoryForm: 'none'
            })
    }

    handleShowChatBotForm() {
        if (this.state.displayChatBotForm === 'none')
            this.setState({
                displayChatBotForm: 'initial'
            })
        else
            this.setState({
                displayChatBotForm: 'none'
            })
    }

    handleShowStoreForm() {
        if (this.state.displayStoreForm === 'none')
            this.setState({
                displayStoreForm: 'initial'
            })
        else
            this.setState({
                displayStoreForm: 'none'
            })
    }

    async activePaginationMembers(event) {
        this.setState({
            currentPaginationMembers: parseInt(event.target.id, 10)
        })
        await this.initPaginationMembers();
        await this.props.onGetAllMembersDash(this.state.currentPaginationMembers);
    }

    async activePaginationClaims(event) {
        this.setState({
            currentPaginationClaims: parseInt(event.target.id, 10)
        })
        await this.initPaginationClaims();
        await this.props.onGetAllClaimsList(this.state.currentPaginationClaims);
    }


    async activePaginationProducts(event) {
        this.setState({
            currentPaginationProducts: parseInt(event.target.id, 10)
        })
        await this.initPaginationProducts();
        await this.props.onGetProductListDash(this.state.currentPaginationProducts);
    }

    async activePaginationCats(event) {
        this.setState({
            currentPaginationCats: parseInt(event.target.id, 10)
        })
        await this.initPaginationCats();
        await this.props.onGetCategoriesListDash(this.state.currentPaginationCats);
    }

    async activePaginationChatBot(event) {
        if (!event.target || event.target.id === undefined || event.target.id === null)
            this.setState({ currentPaginationChatBot: 0 })
        else this.setState({ currentPaginationChatBot: parseInt(event.target.id, 10) })

        await this.initPaginationChatbot();
        await this.props.onGetChatbotListDash(this.state.currentPaginationChatBot);
    }

    UNSAFE_componentWillReceiveProps(nextProps) {
        this.setState({
            allMembers: nextProps.allMembersDash,
            allCategories: nextProps.listCategoriesDash,
            allProducts: nextProps.listProductsDash,
            allClaims: nextProps.allClaimsDash,
            allChatBot: nextProps.listChatBot,
        })

        if (nextProps.putChatBotMsg === 200)
            this.fireNotification('success', 'Le message est modifié avec succés');

        if (nextProps.delChatBotMsg === 200)
            this.fireNotification('success', 'Le message est supprimé avec succés');

        if (nextProps.userUpdated === 200)
            this.fireNotification('success', 'Utilisateur est mise à jour avec succés');

        if (nextProps.addChatBot === 200)
            this.fireNotification('success', 'Ressource est ajouté avec succés');

        if (nextProps.editCategory === 200)
            this.fireNotification('success', 'Categorie est mise à jour avec succés');

        if (nextProps.editProductDash === 200)
            this.fireNotification('success', 'Produit est mise à jour avec succés');

        if (nextProps.addproduct === 200) {
            this.fireNotification('success', 'Product est ajouté avec succés');
            this.props.onGetProductListDash(this.state.pageStore);
            this.setState({
                currentPaginationProducts: 0
            })
        }

        if (nextProps.editClaimDash === 200) {
            this.fireNotification('success', 'La demande est mise à jour avec succés');
            this.props.onGetUserNotification(0);
            setTimeout(() => {
                this.props.onGetAllClaimsList(this.state.currentPaginationClaims);
            }, 500)
        }

        if (nextProps.rmCategory === 200) {
            this.fireNotification('success', 'Categorie est supprimée avec succés');
            setTimeout(() => {
                this.props.onGetCategoriesListDash(this.state.currentPaginationCats);
            }, 500)
        }

        if (nextProps.rmProduct === 200) {
            this.fireNotification('success', 'Produit est supprimée avec succés');
            setTimeout(() => {
                this.props.onGetProductListDash(this.state.currentPaginationProducts);
            }, 500)
        }

        if (nextProps.addproduct !== 200 && nextProps.addproduct !== "")
            this.fireNotification('error', 'Désolé, une erreur est survenu');

        if (nextProps.userUpdated !== 200 && nextProps.userUpdated !== "")
            this.fireNotification('error', 'Désolé, une erreur est survenu');

        if (nextProps.addCat === 200) {
            this.fireNotification('success', 'Categorie est ajoutée avec succés');
            setTimeout(() => {
                this.props.onGetCategoriesListDash(this.state.pageCats);
                this.setState({
                    currentPaginationCats: 0
                })
            }, 500)
        }

        if (nextProps.addCat === 203)
            this.fireNotification('info', 'Ce nom exist');

        if (nextProps.addCat !== 200 && nextProps.addCat !== 203 && nextProps.addCat !== "")
            this.fireNotification('error', 'Désolé, une erreur est survenu');

    }

    async UNSAFE_componentWillMount() {
        this.setState({ onLoding: true })
        await this.props.onGetChatbotListDash(this.state.pageChatBot);
        await this.props.onGetAllClaimsList(this.state.pageClaim)
        await this.props.onGetProductListDash(this.state.pageStore);
        await this.props.onGetCategoriesListDash(this.state.pageCats);
        await this.props.onGetAllMembersDash(this.state.pageMembers);
        await this.props.onGetUserWallet();
        this.setState({ onLoding: false })
    }

    initPaginationMembers(active) {
        let allPagination = [];
        let totalPage = 0;

        totalPage = this.props.totalPageDash;

        for (var i = 0; i < totalPage; i++) {
            if (i === this.state.currentPaginationMembers)
                allPagination.push(<li onClick={this.activePaginationMembers} key={i} className="active"><span style={{ 'cursor': 'pointer' }} id={i}>{i + 1}</span></li>);
            else
                allPagination.push(<li onClick={this.activePaginationMembers} key={i}><span style={{ 'cursor': 'pointer' }} id={i}>{i + 1}</span></li>);
        }
        i = 0;
        return allPagination;
    }

    initPaginationProducts(active) {
        let allPagination = [];
        let totalPage = 0;

        totalPage = this.props.totalPageProductDash;

        for (var i = 0; i < totalPage; i++) {
            if (i === this.state.currentPaginationProducts)
                allPagination.push(<li onClick={this.activePaginationProducts} key={i} className="active"><span style={{ 'cursor': 'pointer' }} id={i}>{i + 1}</span></li>);
            else
                allPagination.push(<li onClick={this.activePaginationProducts} key={i}><span style={{ 'cursor': 'pointer' }} id={i}>{i + 1}</span></li>);
        }
        i = 0;
        return allPagination;
    }

    initPaginationClaims(active) {
        let allPagination = [];
        let totalPage = 0;

        totalPage = this.props.totalPageClaimDash;

        for (var i = 0; i < totalPage; i++) {
            if (i === this.state.currentPaginationClaims)
                allPagination.push(<li style={{ 'cursor': 'pointer' }} onClick={this.activePaginationClaims} key={i} className="active"><span style={{ 'cursor': 'pointer' }} id={i}>{i + 1}</span></li>);
            else
                allPagination.push(<li style={{ 'cursor': 'pointer' }} onClick={this.activePaginationClaims} key={i}><span style={{ 'cursor': 'pointer' }} id={i}>{i + 1}</span></li>);
        }
        i = 0;
        return allPagination;
    }


    initPaginationCats(active) {
        let allPagination = [];
        let totalPage = 0;

        totalPage = this.props.totalPageCatDash;

        for (var i = 0; i < totalPage; i++) {
            if (i === this.state.currentPaginationCats)
                allPagination.push(<li onClick={this.activePaginationCats} key={i} className="active"><span style={{ 'cursor': 'pointer' }} id={i}>{i + 1}</span></li>);
            else
                allPagination.push(<li onClick={this.activePaginationCats} key={i}><span style={{ 'cursor': 'pointer' }} id={i}>{i + 1}</span></li>);
        }
        i = 0;
        return allPagination;

    }

    initPaginationChatbot(active) {
        let allPagination = [];
        let totalPage = 0;

        totalPage = this.props.totalPageChatBotDash;

        for (var i = 0; i < totalPage; i++) {
            if (i === this.state.currentPaginationChatBot)
                allPagination.push(<li onClick={this.activePaginationChatBot} key={i} className="active"><span style={{ 'cursor': 'pointer' }} id={i}>{i + 1}</span></li>);
            else
                allPagination.push(<li onClick={this.activePaginationChatBot} key={i}><span style={{ 'cursor': 'pointer' }} id={i}>{i + 1}</span></li>);
        }
        i = 0;
        return allPagination;
    }

    render() {

        return (
            <div>
                <Header />
                <Sidebar />
                {this.state.onLoding === true ?
                    <div className="container">
                        <div className="row">
                            <div className="animationload">
                                <div className="osahanloading">
                                    <RobotLoading />
                                </div>
                            </div>
                        </div>
                    </div>
                    : ""}
                <div>
                    <div className="content-wrapper">
                        <ToastContainer />
                        <section className="content">
                            <div className="row">
                                <div className="col-md-12">
                                    <div className="box box-primary" id="fixMarginTop">

                                        <div className="box-header with-border">
                                            <h3 className="box-title">Ma dashboard</h3>
                                            {/* <div className="box-tools pull-right">
                                                <button type="button" className="btn btn-box-tool" data-widget="collapse"><i className="fa fa-minus"></i>
                                                </button>
                                                <button type="button" className="btn btn-box-tool" data-widget="remove"><i className="fa fa-times"></i></button>
                                            </div> */}
                                        </div>
                                        <div className="box-body">
                                            <div className="row">

                                                <div className="col-md-9">
                                                    <div className="nav-tabs-custom">
                                                        <ul className="nav nav-tabs">
                                                            <li className="active">
                                                                <a href="#usersMaanagment" data-toggle="tab">
                                                                    Utilisateurs
                      </a>
                                                            </li>
                                                            <li>
                                                                <a href="#categories" data-toggle="tab">
                                                                    Categories
                                                                    </a>
                                                            </li>
                                                            <li>
                                                                <a href="#store" data-toggle="tab">
                                                                    Boutique
                                                                    </a>
                                                            </li>
                                                            <li>
                                                                <a href="#requests" data-toggle="tab">
                                                                    Demandes
                                                                    </a>
                                                            </li>
                                                            <li>
                                                                <a href="#chatBot" data-toggle="tab">
                                                                    ChatBotAI
                                                                    </a>
                                                            </li>
                                                        </ul>
                                                        <div className="tab-content">

                                                            <div className="tab-pane" id="requests">
                                                                {(this.state.allClaims && this.state.allClaims.length > 0) || this.props.totalPageClaimDash > 0 ?
                                                                    <span>
                                                                        <table className="table table-hover">
                                                                            <tbody>
                                                                                <tr>
                                                                                    <th>Date</th>
                                                                                    <th>Demandeur</th>
                                                                                    <th>Categorie</th>
                                                                                    <th>Titre</th>
                                                                                    <th>Description</th>
                                                                                    <th>Prix</th>
                                                                                    <th>Status</th>
                                                                                </tr>
                                                                                {this.state.allClaims ?
                                                                                    this.state.allClaims.map((claim, option) => {
                                                                                        return (
                                                                                            <tr key={option + claim._id}>
                                                                                                <td>{Moment().format('ll', claim.dateOfCreation)}</td>
                                                                                                <td>{claim.claimerFullname}</td>
                                                                                                <td>{claim.claimCategory}</td>
                                                                                                <td>{claim.claimTitle}</td>
                                                                                                <td>{claim.claimDescription}</td>
                                                                                                <td>{claim.claimPrice}</td>
                                                                                                <td>{this.state.editClaimElem[claim._id] === 'true' ?
                                                                                                    <select className="form-control" name="claimStatus" value={this.state.claimStatus[claim._id]} id={claim._id} onChange={this.handleChange}>
                                                                                                        {claim.claimState === "In progress" ?
                                                                                                            <option value="In progress" >In progress</option>
                                                                                                            :
                                                                                                            <option value="validated">Validated</option>
                                                                                                        }
                                                                                                        {claim.claimState === "In progress" ?
                                                                                                            <option value="validated">Validated</option>
                                                                                                            :
                                                                                                            <option value="In progress">In progress</option>
                                                                                                        }
                                                                                                    </select>
                                                                                                    :
                                                                                                    <select disabled={true} className="form-control" name="claimStatus" value={this.state.claimStatus[claim._id]}>
                                                                                                        {claim.claimState === "In progress" ?
                                                                                                            <option value="In progress" >In progress</option>
                                                                                                            :
                                                                                                            <option value="validated">Validated</option>
                                                                                                        }
                                                                                                        {claim.claimState === "In progress" ?
                                                                                                            <option value="validated">Validated</option>
                                                                                                            :
                                                                                                            <option value="In progress">In progress</option>
                                                                                                        }
                                                                                                    </select>
                                                                                                }
                                                                                                </td>
                                                                                                <td>
                                                                                                    {this.state.editClaimElem[claim._id] === 'true' ?
                                                                                                        <Link to="#">
                                                                                                            <button type="button" onClick={(e) => { this.editUserClaim(e, claim._id) }} className="btn btn-info btn-flat"><i className="glyphicon glyphicon-ok"></i></button>
                                                                                                        </Link> : <Link to="#">
                                                                                                            <button type="button" onClick={(e) => { this.initEditClaimButton(e, claim) }} className="btn btn-info btn-flat"><i className="fa fa-edit"></i></button>
                                                                                                        </Link>}
                                                                                                </td>
                                                                                            </tr>
                                                                                        )
                                                                                    })
                                                                                    : <tr></tr>}

                                                                            </tbody>
                                                                        </table>
                                                                        <Pagination activePagination={this.activePaginationClaims} currentPage={this.state.currentPaginationClaims} totalPage={this.props.totalPageClaimDash} /> </span> :
                                                                    <h5>There are currently no requests </h5>}

                                                            </div>


                                                            <div className="tab-pane" id="categories">
                                                                <div className="form-group col-md-7">
                                                                    <label style={{ fontSize: "15px", marginRight: "20px" }} className="control-label">Ajouter une categorie </label>
                                                                    {this.state.displayCategoryForm === 'none' ?
                                                                        <button type="button" onClick={() => { this.handleShowCatForm() }} className="btn btn-info btn-flat"><i className="fa fa-plus"></i></button>
                                                                        : <button type="button" onClick={() => { this.handleShowCatForm() }} className="btn btn-danger btn-flat"><i className="fa fa-minus"></i></button>}

                                                                    <form style={{ 'display': this.state.displayCategoryForm }}>
                                                                        <div className="box-body">
                                                                            <div className="form-group">
                                                                                <label>Titre</label>
                                                                                <input type="text" className="form-control" name="categoryName" onChange={this.handleChange} id="categoryName" placeholder="Entez un titre" />
                                                                            </div>
                                                                        </div>

                                                                        <div className="box-footer pull-right">
                                                                            <button onClick={(e) => { this.handleAddCategory(e) }} style={{ backgroundColor: 'powderblue', color: 'black' }} className="btn btn-primary">Créer</button>
                                                                        </div>
                                                                    </form>


                                                                </div>
                                                                <table className="table table-hover">
                                                                    <tbody>
                                                                        <tr>
                                                                            <th>Titre</th>
                                                                        </tr>
                                                                        {this.state.allCategories ?
                                                                            this.state.allCategories.map(cat => {
                                                                                return (
                                                                                    <tr key={cat._id}>
                                                                                        <td suppressContentEditableWarning={true} contentEditable={this.state.editCategoryElem[cat._id]} id={cat._id}>{cat.categoryTitle}
                                                                                        </td>
                                                                                        <td>
                                                                                            {this.state.editCategoryElem[cat._id] === 'true' ?
                                                                                                <Link to="#">
                                                                                                    <button type="button" onClick={(e) => { this.editCatgory(e, cat._id) }} className="btn btn-info btn-flat"><i className="glyphicon glyphicon-ok"></i></button>
                                                                                                </Link> : <Link to="#">
                                                                                                    <button type="button" onClick={(e) => { this.initEditCatButton(e, cat._id) }} className="btn btn-info btn-flat"><i className="fa fa-edit"></i></button>
                                                                                                </Link>}
                                                                                            <Link to="#">
                                                                                                <button type="button" onClick={(e) => { this.removeCategory(e, cat._id) }} className="btn btn-danger btn-flat"><i className="fa fa-trash"></i></button>
                                                                                            </Link>
                                                                                        </td>
                                                                                        <td>
                                                                                        </td>
                                                                                    </tr>
                                                                                )
                                                                            })
                                                                            : <tr></tr>}

                                                                    </tbody>
                                                                </table>

                                                                <Pagination activePagination={this.activePaginationCats} currentPage={this.state.currentPaginationCats} totalPage={this.props.totalPageCatDash} />
                                                            </div>

                                                            {/* ChatbotIADiv */}
                                                            <div className="tab-pane" id="chatBot">
                                                                <div className="form-group col-md-7">
                                                                    <label style={{ fontSize: "15px", marginRight: "20px" }} className="control-label">Ajouter un message </label>
                                                                    {this.state.displayCategoryForm === 'none' ?
                                                                        <button type="button" onClick={() => { this.handleShowChatBotForm() }} className="btn btn-info btn-flat"><i className="fa fa-plus"></i></button>
                                                                        : <button type="button" onClick={() => { this.handleShowChatBotForm() }} className="btn btn-danger btn-flat"><i className="fa fa-minus"></i></button>}

                                                                    <label style={{ 'marginLeft': '15px', fontSize: "15px", marginRight: "20px" }} className="control-label">Entrainez l'IA du chatBot  </label>

                                                                    <button onClick={(e) => { this.handleTrainChatBot(e) }} className="btn btn-info btn-flat"> <i className='fas fa-robot'></i></button>


                                                                    <form style={{ 'display': this.state.displayChatBotForm }}>
                                                                        <div className="box-body">
                                                                            <div className="form-group">
                                                                                <label htmlFor="chatBotLanguage" >Language</label>
                                                                                <select id="chatBotLanguage" className="form-control" name="chatBotLanguage" value={this.state.chatBotLanguage} onChange={this.handleChange}>
                                                                                    <option value="fr">FR</option>
                                                                                    <option value="en">EN</option>
                                                                                </select>
                                                                            </div>
                                                                            <div className="form-group">
                                                                                <label htmlFor="chatBotKey" >Clé </label> <small>(ex: greetings.hello pour la question "Bonjour")</small>
                                                                                <input type="text" className="form-control" name="chatBotKey" onChange={this.handleChange} id="chatBotKey" placeholder="Enter un id" />
                                                                            </div>
                                                                            <div className="form-group">
                                                                                <label htmlFor="chatBotQuestion" >Question</label>
                                                                                <input type="text" className="form-control" name="chatBotQuestion" onChange={this.handleChange} id="chatBotQuestion" placeholder="Enter une question" />
                                                                            </div>
                                                                            <div className="form-group">
                                                                                <label>Réponse</label>
                                                                                <input type="text" className="form-control" name="chatBotResponse" onChange={this.handleChange} id="chatBotResponse" placeholder="Enter une reponse" />
                                                                            </div>
                                                                        </div>

                                                                        <div className="box-footer pull-right">
                                                                            <button onClick={(e) => { this.handleAddChatBot(e) }} style={{ backgroundColor: 'powderblue', color: 'black' }} className="btn btn-primary">Créer</button>
                                                                        </div>
                                                                    </form>


                                                                </div>
                                                                <table className="table table-hover">
                                                                    <tbody>
                                                                        <tr>
                                                                            <th>Lang</th>
                                                                            <th>Clé</th>
                                                                            <th>Question</th>
                                                                            <th>Réponse</th>
                                                                        </tr>
                                                                        {this.state.allChatBot ?
                                                                            this.state.allChatBot.map(chatbot => {
                                                                                return (
                                                                                    <tr key={chatbot._id}>
                                                                                        <td>
                                                                                            {this.state.editChatbotElem[chatbot._id] === 'true' ?
                                                                                                <select className="form-control" name="chatBotLangArr" value={this.state.chatBotLangArr[chatbot._id]} id={chatbot._id} onChange={this.handleChange}>
                                                                                                    {chatbot.chatBotLang === "fr" ?
                                                                                                        <option value="fr" >FR</option>
                                                                                                        :
                                                                                                        <option value="en">EN</option>
                                                                                                    }
                                                                                                    {chatbot.chatBotLang === "fr" ?
                                                                                                        <option value="en">EN</option>
                                                                                                        :
                                                                                                        <option value="fr">FR</option>
                                                                                                    }
                                                                                                </select>
                                                                                                :
                                                                                                <select disabled={true} className="form-control" name="chatBotLangArr" value={this.state.chatBotLangArr[chatbot._id]} id={chatbot._id}>
                                                                                                    {chatbot.chatBotLang === "fr" ?
                                                                                                        <option value="fr" >FR</option>
                                                                                                        :
                                                                                                        <option value="en">EN</option>
                                                                                                    }
                                                                                                    {chatbot.chatBotLang === "fr" ?
                                                                                                        <option value="en">EN</option>
                                                                                                        :
                                                                                                        <option value="fr">FR</option>
                                                                                                    }
                                                                                                </select>
                                                                                            }
                                                                                        </td>
                                                                                        <td suppressContentEditableWarning={true} contentEditable={this.state.editChatbotElem[chatbot._id]} id={chatbot._id + "_key"}>{chatbot.chatBotKey}
                                                                                        </td>
                                                                                        <td suppressContentEditableWarning={true} contentEditable={this.state.editChatbotElem[chatbot._id]} id={chatbot._id + "_ques"}>{chatbot.chatBotQuestion}
                                                                                        </td>
                                                                                        <td suppressContentEditableWarning={true} contentEditable={this.state.editChatbotElem[chatbot._id]} id={chatbot._id + "_resp"}>{chatbot.chatBotResponse}
                                                                                        </td>
                                                                                        <td>
                                                                                            {this.state.editChatbotElem[chatbot._id] === 'true' ?
                                                                                                <Link to="#">
                                                                                                    <button type="button" onClick={(e) => { this.editChatbot(e, chatbot) }} className="btn btn-info btn-flat"><i className="glyphicon glyphicon-ok"></i></button>
                                                                                                </Link> : <Link to="#">
                                                                                                    <button type="button" onClick={(e) => { this.initEditChatbotButton(e, chatbot._id) }} className="btn btn-info btn-flat"><i className="fa fa-edit"></i></button>
                                                                                                </Link>}
                                                                                            <Link to="#">
                                                                                                <button type="button" onClick={(e) => { this.removeChatbot(e, chatbot._id) }} className="btn btn-danger btn-flat"><i className="fa fa-trash"></i></button>
                                                                                            </Link>
                                                                                        </td>
                                                                                        <td>
                                                                                        </td>
                                                                                    </tr>
                                                                                )
                                                                            })
                                                                            : <tr></tr>}

                                                                    </tbody>
                                                                </table>

                                                                <Pagination activePagination={this.activePaginationChatBot} currentPage={this.state.currentPaginationChatBot} totalPage={this.props.totalPageChatBotDash} />
                                                            </div>

                                                            <div className="tab-pane" id="store">
                                                                <div className="form-group col-md-7">
                                                                    <label style={{ fontSize: "15px", marginRight: "20px" }} className="control-label">Ajouter un produit </label>
                                                                    {this.state.displayStoreForm === 'none' ?
                                                                        <button type="button" onClick={() => { this.handleShowStoreForm() }} className="btn btn-info btn-flat"><i className="fa fa-plus"></i></button>
                                                                        : <button type="button" onClick={() => { this.handleShowStoreForm() }} className="btn btn-danger btn-flat"><i className="fa fa-minus"></i></button>}
                                                                    <form style={{ 'display': this.state.displayStoreForm }}>
                                                                        <div className="box-body">
                                                                            <div className="form-group">
                                                                                <label >Titre</label>
                                                                                <input type="text" className="form-control" id="productTitle" name="productTitle" onChange={this.handleChange} placeholder="Entrez un titre" required />
                                                                            </div>
                                                                            <div className="form-group">
                                                                                <label >Description</label>
                                                                                <input type="text" className="form-control" id="productDescription" name="productDescription" onChange={this.handleChange} placeholder="Entrez une descirption" />
                                                                            </div>
                                                                            <div className="form-group">
                                                                                <label >Prix</label>
                                                                                <input type="text" className="form-control" id="productPrice" name="productPrice" onChange={this.handleChange} placeholder="Entrez le prix" required />
                                                                            </div>
                                                                            <div className="input-group image-preview">
                                                                                <input type="text" className="form-control image-preview-filename" value={this.state.productPhoto.name} disabled="disabled" />
                                                                                <span className="input-group-btn">

                                                                                    <div className="btn btn-default image-preview-input">
                                                                                        <span className="glyphicon glyphicon-folder-open"></span>
                                                                                        <span className="image-preview-input-title">   Browse</span>
                                                                                        <input name="productPhoto" onChange={this.handleChange} type="file" accept="image/png, image/jpeg, image/gif" required />
                                                                                    </div>
                                                                                </span>
                                                                            </div>
                                                                        </div>

                                                                        <div className="box-footer pull-right">
                                                                            <button onClick={(e) => { this.addProductToStore(e) }} style={{ backgroundColor: 'powderblue', color: 'black' }} className="btn btn-primary">Créer</button>
                                                                        </div>
                                                                    </form>

                                                                </div>
                                                                {(this.state.allProducts && this.state.allProducts.length > 0) || this.props.totalPageProductDash > 0 ?
                                                                    <span>
                                                                        <table className="table table-hover">
                                                                            <tbody>
                                                                                <tr>
                                                                                    <th>Titre</th>
                                                                                    <th>Description</th>
                                                                                    <th>prix</th>
                                                                                    <th>Status</th>
                                                                                    <th>Photo</th>
                                                                                </tr>
                                                                                {this.state.allProducts ? this.state.allProducts.map((product, index) => {
                                                                                    return (
                                                                                        <tr key={index}>
                                                                                            <td suppressContentEditableWarning={true} contentEditable={this.state.editProductElem[product._id]} id={product._id + "_name"}>{product.productTitle}
                                                                                            </td>

                                                                                            <td suppressContentEditableWarning={true} contentEditable={this.state.editProductElem[product._id]} id={product._id + "_desc"}>{product.productDescription}
                                                                                            </td>
                                                                                            <td suppressContentEditableWarning={true} contentEditable={this.state.editProductElem[product._id]} id={product._id + "_price"}>
                                                                                                {product.productPrice}
                                                                                            </td>
                                                                                            <td>
                                                                                                {this.editedStatusOptions(product._id, product.productStatus, this.state.editProductElem[product._id])}
                                                                                            </td>
                                                                                            <td>
                                                                                                <div className="input-group image-preview">
                                                                                                    <input type="text" className="form-control image-preview-filename" value={this.state.productPhotoEdited[product._id] || '' ? this.state.productPhotoEdited[product._id].name : product.productPhoto} disabled="disabled" />
                                                                                                    <span className="input-group-btn">
                                                                                                        {this.state.editProductElem[product._id] === 'true' ?

                                                                                                            <div className="btn btn-default image-preview-input">
                                                                                                                <span className="glyphicon glyphicon-folder-open"></span>
                                                                                                                <span className="image-preview-input-title">   Browse</span>
                                                                                                                <input name="productPhotoEdited" onChange={(e) => { this.handleEditStorePhoto(e, product._id) }} type="file" accept="image/png, image/jpeg, image/gif" required />
                                                                                                            </div>
                                                                                                            : <div className="btn btn-default image-preview-input">
                                                                                                                <span className="glyphicon glyphicon-folder-open"></span>
                                                                                                                <span className="image-preview-input-title">   Browse</span>
                                                                                                                <input disabled={true} name="productPhotoEdited" onChange={(e) => { this.handleEditStorePhoto(e, product._id) }} type="file" accept="image/png, image/jpeg, image/gif" required />
                                                                                                            </div>}
                                                                                                    </span>
                                                                                                </div>
                                                                                            </td>
                                                                                            <td>
                                                                                                {this.state.editProductElem[product._id] === 'true' ?
                                                                                                    <Link to="#">
                                                                                                        <button type="button" onClick={(e) => { this.editProduct(e, product) }} className="btn btn-info btn-flat"><i className="glyphicon glyphicon-ok"></i></button>
                                                                                                    </Link> : <Link to="#">
                                                                                                        <button type="button" onClick={(e) => { this.initEditProductButton(e, product) }} className="btn btn-info btn-flat"><i className="fa fa-edit"></i></button>
                                                                                                    </Link>}
                                                                                                <Link to="#">
                                                                                                    <button onClick={(e) => { this.removeProduct(e, product._id) }} type="button" className="btn btn-danger btn-flat"><i className="fa fa-trash"></i></button>
                                                                                                </Link>
                                                                                            </td>
                                                                                            <td>
                                                                                            </td>
                                                                                        </tr>
                                                                                    )
                                                                                }) : <tr></tr>}
                                                                            </tbody>
                                                                        </table>
                                                                        <Pagination activePagination={this.activePaginationProducts} currentPage={this.state.currentPaginationProducts} totalPage={this.props.totalPageProductDash} />
                                                                    </span> :
                                                                    <div className="col-md-12">
                                                                        <h5>Your store is empty.</h5>
                                                                    </div>}

                                                            </div>
                                                            <div className="active tab-pane" id="usersMaanagment">
                                                                <table className="table table-hover">
                                                                    <tbody>
                                                                        <tr>
                                                                            <th>Prénom</th>
                                                                            <th>Nom</th>
                                                                            <th>Email</th>
                                                                            <th>Role</th>
                                                                            <th>Bloqué</th>
                                                                        </tr>
                                                                        {this.state.allMembers ? this.state.allMembers.map(member => {
                                                                            return (
                                                                                <tr key={member._id}>
                                                                                    <td>{member.givenName}</td>
                                                                                    <td>{member.familyName}</td>
                                                                                    <td>{member.email}</td>
                                                                                    <td>
                                                                                        {this.state.editUserElem[member._id] === 'true' ?
                                                                                            <select className="form-control" name="role" value={this.state.role[member._id]} id={member._id} onChange={this.handleChange}>
                                                                                                {member.role === "USER" ?
                                                                                                    <option value="USER" >USER</option>
                                                                                                    :
                                                                                                    <option value="HR">HR</option>
                                                                                                }
                                                                                                {member.role === "USER" ?
                                                                                                    <option value="HR">HR</option>
                                                                                                    :
                                                                                                    <option value="USER">USER</option>
                                                                                                }
                                                                                            </select>
                                                                                            :
                                                                                            <select disabled={true} className="form-control" name="role" value={this.state.role[member._id]}>
                                                                                                {member.role === "USER" ?
                                                                                                    <option value="USER" >USER</option>
                                                                                                    :
                                                                                                    <option value="HR">HR</option>
                                                                                                }
                                                                                                {member.role === "USER" ?
                                                                                                    <option value="HR">HR</option>
                                                                                                    :
                                                                                                    <option value="USER">USER</option>
                                                                                                }
                                                                                            </select>
                                                                                        }

                                                                                    </td>
                                                                                    <td>
                                                                                        {this.state.editUserElem[member._id] === 'true' ?
                                                                                            <select className="form-control" name="blocked" value={this.state.blocked[member._id]} id={member._id} onChange={this.handleChange}>
                                                                                                {member.blocked === false ?
                                                                                                    <option value="false" >false</option>
                                                                                                    :
                                                                                                    <option value="true">true</option>
                                                                                                }
                                                                                                {member.blocked === false ?
                                                                                                    <option value="true" >true</option>
                                                                                                    :
                                                                                                    <option value="false">false</option>
                                                                                                }
                                                                                            </select>
                                                                                            : <select disabled={true} className="form-control" name="blocked" value={this.state.blocked[member._id]}>
                                                                                                {member.blocked === false ?
                                                                                                    <option value="false" >false</option>
                                                                                                    :
                                                                                                    <option value="true">true</option>
                                                                                                }
                                                                                                {member.blocked === false ?
                                                                                                    <option value="true" >true</option>
                                                                                                    :
                                                                                                    <option value="false">false</option>
                                                                                                }
                                                                                            </select>}


                                                                                    </td>
                                                                                    <td>
                                                                                        {this.state.editUserElem[member._id] === 'true' ?
                                                                                            <Link to="#">
                                                                                                <button type="button" onClick={() => { this.updateThisUser(member) }} className="btn btn-info btn-flat"><i className="glyphicon glyphicon-ok"></i></button>
                                                                                            </Link> : <Link to="#">
                                                                                                <button type="button" onClick={(e) => { this.initEditMemeberButton(e, member) }} className="btn btn-info btn-flat"><i className="fa fa-edit"></i></button>
                                                                                            </Link>}
                                                                                    </td>
                                                                                </tr>
                                                                            )
                                                                        })
                                                                            : <tr></tr>}
                                                                    </tbody>
                                                                </table>
                                                                <Pagination activePagination={this.activePaginationMembers} currentPage={this.state.currentPaginationMembers} totalPage={this.props.totalPageDash} />
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>

                                            </div>

                                        </div>
                                    </div>
                                </div>
                            </div>
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
        trainingChatBot: state.trainingChatBot.trainingChatBot,
        putChatBotMsg: state.putChatBotMsg.putChatBotMsg,
        delChatBotMsg: state.delChatBotMsg.delChatBotMsg,
        addChatBot: state.addChatBot.addChatBot,
        editClaimDash: state.editClaim.editClaim,
        rmCategory: state.rmCategory.rmCategory,
        rmProduct: state.rmProduct.rmProduct,
        editProductDash: state.editProductDash.editProduct,
        editCategory: state.editCategory.editCategory,
        addproduct: state.addproduct.addproduct,
        listProductsDash: state.listProductsDash.listProductsDash.data,
        listChatBot: state.listChatBot.listChatBot.data,
        totalPageChatBotDash: state.listChatBot.listChatBot.total_pages + 1,
        addCat: state.addCat.addCat,
        location: state.location,
        userUpdated: state.userUpdated.userUpdated,
        listCategoriesDash: state.listCategoriesDash.listCategoriesDash.data,
        totalPageCatDash: state.listCategoriesDash.listCategoriesDash.total_pages + 1,
        totalPageProductDash: state.listProductsDash.listProductsDash.total_pages + 1,
        allMembersDash: state.allMemebersDash.allMemebersDash.data,
        totalPageDash: state.allMemebersDash.allMemebersDash.total_pages + 1,
        allClaimsDash: state.listClaimsDash.listClaimsDash.data,
        totalPageClaimDash: state.listClaimsDash.listClaimsDash.total_pages + 1,
    }
}

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        navigateTo: (location) => {
            dispatch(push(location));
        },
        onGetAllMembersDash: (page) => dispatch(getAllMembersDash(page)),
        onGetCategoriesListDash: (page) => dispatch(getCategoriesListDash(page)),
        onUpdateUserDash: (data) => dispatch(updateUserDash(data)),
        onAddCategoryDash: (data) => dispatch(addCategoryDash(data)),
        onAddProductToStoreDash: (data) => dispatch(addProductToStoreDash(data)),
        onGetProductListDash: (page) => dispatch(getProductListDash(page)),
        onEditCategotyDash: (data) => dispatch(editCategotyDash(data)),
        onEditProductDash: (data) => dispatch(editProductDash(data)),
        onRemoveCategoryDash: (catId) => dispatch(removeCategoryDash(catId)),
        onRemoveProductDash: (productId) => dispatch(removeProductDash(productId)),
        onGetUserWallet: () => dispatch(getUserWallet()),
        onGetAllClaimsList: (page) => dispatch(getAllClaimsList(page)),
        onEditUserClaimDash: (data) => dispatch(editUserClaimDash(data)),
        onGetUserNotification: (page) => { dispatch(getUserNotification(page)) },
        onAddChatBotDash: (data) => { dispatch(addChatBotDash(data)) },
        onGetChatbotListDash: (page) => { dispatch(getChatbotListDash(page)) },
        onDelChatbotMsgDash: (botId) => { dispatch(delChatbotMsgDash(botId)) },
        onEditChatbotHtttpDash: (data) => { dispatch(editChatbotHtttpDash(data)) },
        onTrainChatBotAIDash: () => { dispatch(trainChatBotAIDash()) }
    }
};

export default connect(state, mapDispatchToProps)(Dashboard);