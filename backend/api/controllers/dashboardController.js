const DashService = require('./../services/dashboardService/index'); 

getAllUsersDash = (req, res, next) => {
    let page = req.params.page;

    DashService.getMembersDash.getMembersDash(res, page);
}

getAllCategoriesDash = (req, res, next) => {
    let page = req.params.page;

    DashService.getCatsDash.getCategoriesDash(res, page);
}

updateUserDash = (req, res, next) => {
    DashService.updateUserDash.updateMemeberDash(req.body, res)   
}

addCategoryDash = (req, res, next) => {
    DashService.addCatDash.addCategory(req.body, res, next)
}

addProdcutToStoreDash = (req, res, next) => {
    DashService.addProdcutDash.addNewProduct(req, res)
}

getAllProductsDash = (req, res, next) => {
    let page = req.params.page;
    
    DashService.getListProductsDash.getListProducts(res, page);
}

editCategoryDash = (req, res, next) => {
    DashService.editCategoryValueDash.editCategoy(req.body, res)
}

editProductDash = (req, res, next) => {
    DashService.editProductValueDash.editProduct(req, res);
}

removeCatgeoryDash = (req, res, next) => {
    let catId = req.params.catId;
    DashService.removeCatgeoryServiceDash.removeCatgeory(catId, res)
}

removeProductDash = (req, res, next) => {
    let productId = req.params.productId;
    DashService.removeProductServiceDash.removeProduct(productId, res)
}

getClaimsListDash = (req, res, next) => {
    let page = req.params.page;
    DashService.listAllClaimsServiceDash.listAllClaims(page, res)
}

editUserClaimDash = (req, res, next) => {
    DashService.editClaimsServiceDash.editClaims(req.body, res)
}

addChatbotDash = (req, res, next) => {
    let userId = req.params.userId;
    DashService.addInfoChatbotDash.addnfoChatbot(userId, req.body, res)
}

getChatbotDash = (req, res, next) => {
    let page = req.params.page;
    DashService.getListChatbotDash.getListChatbot(page, res)
}

delChatbotDash = (req, res, next) => {
    DashService.delChatbotMsgDash.delChatbotMsg(req.body, res)
}

editChatbotDash = (req, res, next) => {
    DashService.editChatbotMsgDash.editChatbotMsg(req.body, res)
}

trainingChatbotDash = (req, res, next) => {
    DashService.trainingChatbotMsgDash.trainingChatbotMsg(res)
}

module.exports = {
    trainingChatbotDash,
    delChatbotDash,
    editChatbotDash,
    getChatbotDash,
    addChatbotDash,
    editProductDash,
    removeCatgeoryDash,
    removeProductDash,
    editUserClaimDash,
    getClaimsListDash,
    getAllProductsDash,
    updateUserDash,
    editCategoryDash,
    addProdcutToStoreDash,
    addCategoryDash,
    getAllUsersDash,
    getAllCategoriesDash
}