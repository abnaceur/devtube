import { combineReducers } from 'redux';
import auth from './userReducers/auth_reducer';
import addMaterial from './materialReducer/addMaterialReducer';
import getCategoriesList from './materialReducer/getCategoriesListReducer';
import allMaterials from './materialReducer/getAllMaterialsReducer';
import StoreMaterialDetails from './materialReducer/StoreMaterialDetailsReducer'
import profileReducer from './profileReducer/profileReducer';
import profileInfoReducer from './profileReducer/getProfileInfoReducer';
import getAllMemberReducer from './userReducers/getAllmembersReducer';
import getAllMyMaterials from './materialReducer/getAllMyMaterialsreducer';
import deleteMaterialReducer from "./materialReducer/deleteMaterialReducer";
import editMaterialReducer from "./materialReducer/editMaterialReducer";
import updateMaterialViewReducer from "./materialReducer/updateMaterialViewReducer";
import updateMaterialLikeDislikeReducer from './materialReducer/updateMaterialLikeDislikeReducer';
import getAllFilteredMaterials from './materialReducer/getFilteredMaterialByCatReducer';
import getUserStats from './StatsReducer/StatsReducer';
import getAllfilteredMembers from './userReducers/getAllFilteredUserreducer';
import allMemebersDash from './dashboardReducers/getAllUsersDashReducer';
import listCategoriesDash from './dashboardReducers/getAllCategoriesReducer';
import userUpdated from './dashboardReducers/updateUserReducer';
import addCat from './dashboardReducers/addCategoryReducer';
import addproduct from './dashboardReducers/addProductToStoreReducer';
import listProductsDash from './dashboardReducers/getAllProductesReducer';
import editCategory from './dashboardReducers/editCategoryReducer';
import editProduct from './dashboardReducers/editProductDashReducer';
import rmCategory from './dashboardReducers/removeCategoryReducer';
import rmProduct from './dashboardReducers/removeProductDashReducer';
import allProducts from './storeReducer/getAllProducts';
import getTcoin from './userReducers/getUserWalletReducer';
import claimProduct from './storeReducer/claimProductReducer';
import listClaimsDash from './dashboardReducers/getAllUserClaimsListReducer';
import editClaim from './dashboardReducers/editUserClaimReducer';
import allUserNotifs from './userReducers/getUserNotificationReducer';
import updateNotif from './userReducers/updateUserNotifReducer';
import authenticatedOauth2 from './userReducers/oauth2UserReducer';
import getMaterialById from './materialReducer/GetMatByIdReducer';
import requestCourse from './storeReducer/addRequestReducer';
import addChatBot from './ChatBotReducer/AddChatBotQuestionReducer';
import listChatBot from './ChatBotReducer/GetAllChatbotInfoReducer';
import delChatBotMsg from './ChatBotReducer/removeChatBotMsgReducer';
import putChatBotMsg from './ChatBotReducer/EditChatbotMsgReducer';
import trainingChatBot from  './ChatBotReducer/TrainChatbotAiReducer';

const rootReducer = combineReducers({
    trainingChatBot,
    putChatBotMsg,
    delChatBotMsg,
    listChatBot,
    addChatBot,
    auth,
    requestCourse,
    getMaterialById,
    authenticatedOauth2,
    updateNotif,
    allUserNotifs,
    editClaim,
    listClaimsDash,
    claimProduct,
    getTcoin,
    allProducts,
    rmProduct,
    editProduct,
    addCat,
    editCategory,
    rmCategory,
    listProductsDash,
    addproduct,
    userUpdated,
    listCategoriesDash,
    allMemebersDash,
    getUserStats,
    getAllfilteredMembers,
    updateMaterialViewReducer,
    getAllFilteredMaterials,
    editMaterialReducer,
    updateMaterialLikeDislikeReducer,
    addMaterial,
    getCategoriesList,
    allMaterials,
    getAllMyMaterials,
    profileReducer,
    StoreMaterialDetails,
    getAllMemberReducer,
    profileInfoReducer,
    deleteMaterialReducer
});


export default rootReducer;