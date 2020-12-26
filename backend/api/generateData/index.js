const catData = require('./categoryData');
const userData = require('./userData');
const materialsData = require('./materialData');
const productData = require('./productData');

generateData = () => {
    catData.generateCategoryData();
    userData.generateUsers();
    //materialsData.generateMaterial();
    //productData.generateProduct();
}


module.exports = {
    generateData
}
