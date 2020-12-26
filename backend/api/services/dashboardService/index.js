const getMembersDash = require('./getAllusersByHr');
const getCatsDash = require('./getAllCatsDashService');
const updateUserDash = require('./updateMemeberDash');
const addCatDash = require('./addCategory');
const addProdcutDash = require('./addNewProduct');
const getListProductsDash = require("./getListProducts")
const editCategoryValueDash = require("./editCategoy")
const editProductValueDash = require("./editProduct")
const removeCatgeoryServiceDash = require('./removeCatgeory');
const removeProductServiceDash = require('./removeProduct')
const listAllClaimsServiceDash = require('./listAllClaims')
const editClaimsServiceDash = require('./editClaimsServiceDash');
const addInfoChatbotDash = require("./addInfoChatbotDashService")
const getListChatbotDash = require("./getListChatbotDashService")
const delChatbotMsgDash = require("./delChatbotMsgDashService")
const editChatbotMsgDash = require('./editChatbotMsgDashService');
const trainingChatbotMsgDash = require('./trainingChatbotMsgDashService');

module.exports = {
    trainingChatbotMsgDash,
    editChatbotMsgDash,
    editClaimsServiceDash,
    delChatbotMsgDash,
    getListChatbotDash,
    addInfoChatbotDash,
    listAllClaimsServiceDash,
    removeProductServiceDash,
    removeCatgeoryServiceDash,
    editProductValueDash,
    editCategoryValueDash,
    getListProductsDash,
    addCatDash,
    addProdcutDash,
    getMembersDash,
    getCatsDash,
    updateUserDash

}