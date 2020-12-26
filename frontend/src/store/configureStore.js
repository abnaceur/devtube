import { combineReducers } from 'redux';
import { routerReducer } from "react-router-redux";
import authReducer from './reducers/userReducers/auth_reducer';
import addMaterialReducer from './reducers/materialReducer/addMaterialReducer';
import getCategoriesListReducer from './reducers/materialReducer/getCategoriesListReducer';
import getAllMaterials from './reducers/materialReducer/getAllMaterialsReducer';
import StoreMaterialDetails from './reducers/materialReducer/StoreMaterialDetailsReducer'
import profileUpdated from './reducers/profileReducer/profileReducer'
import profileInfo from './reducers/profileReducer/getProfileInfoReducer'
import getAllMembers from './reducers/userReducers/getAllmembersReducer';
import getAllMyMaterials from './reducers/materialReducer/getAllMyMaterialsreducer';
import deleteMaterial from "./reducers/materialReducer/deleteMaterialReducer";
import editMaterial from "./reducers/materialReducer/editMaterialReducer";
import updateViews from "./reducers/materialReducer/updateMaterialViewReducer";
import updateMaterialLikeDislike from './reducers/materialReducer/updateMaterialLikeDislikeReducer';
import filteredMaterials from './reducers/materialReducer/getFilteredMaterialByCatReducer';
import getUserStats from './reducers/StatsReducer/StatsReducer';
import getAllfilteredMembers from './reducers/userReducers/getAllFilteredUserreducer';
import allMemebersDash from './reducers/dashboardReducers/getAllUsersDashReducer';
import listCategoriesDash from './reducers/dashboardReducers/getAllCategoriesReducer';
import userUpdated from './reducers/dashboardReducers/updateUserReducer';
import addCat from './reducers/dashboardReducers/addCategoryReducer';
import addproduct from './reducers/dashboardReducers/addProductToStoreReducer';
import listProductsDash from './reducers/dashboardReducers/getAllProductesReducer';
import editCategory from './reducers/dashboardReducers/editCategoryReducer';
import editProductDash from './reducers/dashboardReducers/editProductDashReducer';
import rmCategory from './reducers/dashboardReducers/removeCategoryReducer';
import rmProduct from './reducers/dashboardReducers/removeProductDashReducer';
import allProducts from './reducers/storeReducer/getAllProducts';
import getTcoin from './reducers/userReducers/getUserWalletReducer';
import claimProduct from './reducers/storeReducer/claimProductReducer';
import listClaimsDash from './reducers/dashboardReducers/getAllUserClaimsListReducer';
import editClaim from './reducers/dashboardReducers/editUserClaimReducer';
import allUserNotifs from './reducers/userReducers/getUserNotificationReducer';
import updateNotif from './reducers/userReducers/updateUserNotifReducer';
import authenticatedOauth2 from './reducers/userReducers/oauth2UserReducer';
import getMaterialById from './reducers/materialReducer/GetMatByIdReducer';
import requestCourse from './reducers/storeReducer/addRequestReducer';
import addChatBot from './reducers/ChatBotReducer/AddChatBotQuestionReducer';
import listChatBot from './reducers/ChatBotReducer/GetAllChatbotInfoReducer';
import delChatBotMsg from './reducers/ChatBotReducer/removeChatBotMsgReducer';
import putChatBotMsg from './reducers/ChatBotReducer/EditChatbotMsgReducer';
import trainingChatBot from './reducers/ChatBotReducer/TrainChatbotAiReducer';

const reducers = combineReducers({
  putChatBotMsg: putChatBotMsg,
  trainingChatBot: trainingChatBot,
  delChatBotMsg: delChatBotMsg,
  listChatBot: listChatBot,
  requestCourse: requestCourse,
  addChatBot: addChatBot,
  getMaterialById: getMaterialById,
  router: routerReducer,
  authenticatedOauth2: authenticatedOauth2,
  updateNotif: updateNotif,
  allUserNotifs: allUserNotifs,
  editClaim: editClaim,
  listClaimsDash: listClaimsDash,
  getTcoin: getTcoin,
  claimProduct: claimProduct,
  allProducts: allProducts,
  rmProduct: rmProduct,
  rmCategory: rmCategory,
  editCategory: editCategory,
  editProductDash: editProductDash,
  listProductsDash: listProductsDash,
  addCat: addCat,
  addproduct: addproduct,
  userUpdated: userUpdated,
  allMemebersDash: allMemebersDash,
  auth: authReducer,
  listCategoriesDash: listCategoriesDash,
  getAllfilteredMembers: getAllfilteredMembers,
  getUserStats: getUserStats,
  filteredMaterials: filteredMaterials,
  updateMaterialLikeDislike: updateMaterialLikeDislike,
  updateViews: updateViews,
  editMaterial: editMaterial,
  addMaterial: addMaterialReducer,
  getCategoriesList: getCategoriesListReducer,
  allMaterials: getAllMaterials,
  materialDetails: StoreMaterialDetails,
  profileUpdated: profileUpdated,
  profileInfo: profileInfo,
  getAllMembers: getAllMembers,
  getAllMyMaterials: getAllMyMaterials,
  deleteMaterial: deleteMaterial
});

export default reducers;