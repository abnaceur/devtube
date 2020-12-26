const Material = require('../../models/material');
const utils = require('../utils');

async function getMatbyId (id, res) {
    Material.find({
        _id: id, 
        materialDeleted: false
    })
        .exec()
        .then(async materials => {
            console.log("test :, ", materials);
            if (materials.length > 0) {
                res.status(200).json({
                    data: materials[0],
                    code: 200
                })
            } else {
                res.status(500);
            } 
        })
        .catch(err => utils.defaultError(res, err))
}


module.exports = {
    getMatbyId
}