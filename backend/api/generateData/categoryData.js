const Category = require('../models/category')
const mongoose = require('mongoose');

const listCategory = [
    {
        _id: new mongoose.Types.ObjectId,
        categoryTitle: "NOOB Training",
        categoryDescription: "",
        categoryPhoto: "",
    },
    {
        _id: new mongoose.Types.ObjectId,
        categoryTitle: "Mouf framework",
        categoryDescription: "",
        categoryPhoto: "",
    },
    {
        _id: new mongoose.Types.ObjectId,
        categoryTitle: "PHP",
        categoryDescription: "",
        categoryPhoto: "",
    },
    {
        _id: new mongoose.Types.ObjectId,
        categoryTitle: "Docker",
        categoryDescription: "",
        categoryPhoto: "",
    },
    {
        _id: new mongoose.Types.ObjectId,
        categoryTitle: "Version control",
        categoryDescription: "",
        categoryPhoto: "",
    },
    {
        _id: new mongoose.Types.ObjectId,
        categoryTitle: "NodeJs",
        categoryDescription: "",
        categoryPhoto: "",
    },
    {
        _id: new mongoose.Types.ObjectId,
        categoryTitle: "Symfony framework",
        categoryDescription: "",
        categoryPhoto: "",
    },
    {
        _id: new mongoose.Types.ObjectId,
        categoryTitle: "Laravel framework",
        categoryDescription: "",
        categoryPhoto: "",
    },
    {
        _id: new mongoose.Types.ObjectId,
        categoryTitle: "Go",
        categoryDescription: "",
        categoryPhoto: "",
    },
    {
        _id: new mongoose.Types.ObjectId,
        categoryTitle: "Ruby",
        categoryDescription: "",
        categoryPhoto: "",
    },
    {
        _id: new mongoose.Types.ObjectId,
        categoryTitle: "Artificial intelligence",
        categoryDescription: "",
        categoryPhoto: "",
    },
    {
        _id: new mongoose.Types.ObjectId,
        categoryTitle: "AngularJs",
        categoryDescription: "",
        categoryPhoto: "",
    },
    {
        _id: new mongoose.Types.ObjectId,
        categoryTitle: "Angular2 +",
        categoryDescription: "",
        categoryPhoto: "",
    },
    {
        _id: new mongoose.Types.ObjectId,
        categoryTitle: "Ionic 1 +",
        categoryDescription: "",
        categoryPhoto: "",
    },
    {
        _id: new mongoose.Types.ObjectId,
        categoryTitle: "Fluter",
        categoryDescription: "",
        categoryPhoto: "",
    },
    {
        _id: new mongoose.Types.ObjectId,
        categoryTitle: "Javascript",
        categoryDescription: "",
        categoryPhoto: "",
    },
    {
        _id: new mongoose.Types.ObjectId,
        categoryTitle: "MySql",
        categoryDescription: "",
        categoryPhoto: "",
    },
    {
        _id: new mongoose.Types.ObjectId,
        categoryTitle: "MongoDB",
        categoryDescription: "",
        categoryPhoto: "",
    },
    {
        _id: new mongoose.Types.ObjectId,
        categoryTitle: "ReactJs",
        categoryDescription: "",
        categoryPhoto: "",
    },
    {
        _id: new mongoose.Types.ObjectId,
        categoryTitle: "VueJs",
        categoryDescription: "",
        categoryPhoto: "",
    },
    {
        _id: new mongoose.Types.ObjectId,
        categoryTitle: "ElasticSearch",
        categoryDescription: "",
        categoryPhoto: "",
    },
    {
        _id: new mongoose.Types.ObjectId,
        categoryTitle: "Python",
        categoryDescription: "",
        categoryPhoto: "",
    },
    {
        _id: new mongoose.Types.ObjectId,
        categoryTitle: "Java",
        categoryDescription: "",
        categoryPhoto: "",
    },
    {
        _id: new mongoose.Types.ObjectId,
        categoryTitle: "C language",
        categoryDescription: "",
        categoryPhoto: "",
    },
    {
        _id: new mongoose.Types.ObjectId,
        categoryTitle: "C++ language",
        categoryDescription: "",
        categoryPhoto: "",
    },
    
];

generateCategoryData = () => {
    Category.find()
        .exec()
        .then(categories => {
            if (categories.length == 0) {
                listCategory.map(cat => {
                    let categorisModel = new Category(cat);
                    categorisModel.save();
                })
            }
        }).catch(err => console.log("generateCategoryData ERR : ", err))
}

module.exports = {
    generateCategoryData,
    listCategory,
}