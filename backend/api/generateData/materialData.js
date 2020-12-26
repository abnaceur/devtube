const faker = require('faker');
const Material = require("../models/material");
let mongoose = require('mongoose');
const User = require('../models/user');
const Category = require('../models/category');

getAllUserInfo = () => {
    return new Promise((resolve, reject) => {
        User.find()
            .select(["_id", "firstname", "lastname"])
            .exec()
            .then(users => {
                resolve(users);
            }).catch(err => console.log("getAllUserInfo ERR : ", err))
    })
}


getAllCatsInfo = () => {
    return new Promise((resolve, reject) => {
        Category.find()
            .select(["_id"])
            .exec()
            .then(cats => {
                resolve(cats);
            }).catch(err => console.log("getAllUserInfo ERR : ", err))
    })
}


async function creatNewAccountMaterials() {
    let usersInfo = await getAllUserInfo();
    let cats = await getAllCatsInfo();

    let user = usersInfo[Math.floor(Math.random() * 50)];
    let catId = cats[Math.floor(Math.random() * 10)];

    let title = faker.lorem.paragraph(1);
    let description = faker.lorem.paragraph(20);
    // let photo = faker.random.image();
    let photo =  faker.image.imageUrl();
 
    let videos = [];
    let uploadedBy = {
        userId: user._id,
        userFullname: user.fistname + " " + user.lastname,
    };
    let category = catId;


    return new Promise((resolve, reject) => {
        resolve({
            _id: new mongoose.Types.ObjectId,
            title: title,
            description: description,
            photo: photo,
            videos: videos,
            uploadedBy: uploadedBy,
            category: category,
        })
    })
}

async function generateMaterial() {

    let material = {}

    for (let id = 1; id <= 50; id++) {
        material = new Material(await creatNewAccountMaterials());
        material.save();
        material = {};
    }
    console.log("50 material added to database!")
}

module.exports = {
    generateMaterial,
}
