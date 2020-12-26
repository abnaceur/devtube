const mongoose = require('mongoose');

creatNewUser = (value) => {
    return new Promise((resolve, reject) => {
        resolve({
            _id: new mongoose.Types.ObjectId,
            googleId: value.googleId,
            imageUrl: value.imageUrl,
            email: value.email,
            name: value.name,
            givenName: value.givenName,
            familyName: value.familyName,
            role: 'HR',
        })
    });
}

creatNewOauth2User = (userInfo) => {
    return new Promise((resolve, reject) => {
        resolve({
            _id: new mongoose.Types.ObjectId,
            googleId: userInfo.id,
            imageUrl: userInfo.photos[0].value,
            email: userInfo.emails[0].value,
            name: userInfo.displayName,
            givenName: userInfo.name.givenName,
            familyName: userInfo.name.familyName,
            role: 'HR'
        })
    });
}

module.exports = {
    creatNewOauth2User,
    creatNewUser,
}