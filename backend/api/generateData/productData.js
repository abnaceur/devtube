const faker = require('faker');
let mongoose = require('mongoose');
const Product = require('../models/Product');

async function creatNewAccountProducts() {
   
    let randStock = ["In stock", "Out stock"];
    let productTitle =  faker.lorem.words(4);
	let productDescription =  faker.lorem.words(6); 
	let productPhoto =  faker.image.food(400, 400);
	let productPrice = faker.random.number(500);
    let productStatus = randStock[Math.random() * 2];

    return new Promise((resolve, reject) => {
        resolve({
            _id: new mongoose.Types.ObjectId,
            productTitle: productTitle,
            productDescription: productDescription, 
            productPhoto: productPhoto,
            productPrice: productPrice,
            productStatus: productStatus
        })
    })
}

async function generateProduct() {

    let product = {}

    for (let id = 1; id <= 50; id++) {
        product = new Product(await creatNewAccountProducts());
        product.save();
        product = {};
    }
    console.log("| 50 | - product added to database!")
}

module.exports = {
    generateProduct,
}
