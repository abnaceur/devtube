const faker = require('faker');
const fs = require('fs');
const User = require("../models/user");
let mongoose = require('mongoose');
const bcrypt = require('bcrypt');

async function creatNewAccountUser () {
    // faker.setLocale("fr");

    let email = faker.internet.email();
    let password = "1658oqhi8fkW8MC87$";

    let userIdGen = email.substring(0, email.search('@')) + '_' + Math.floor(Math.random() * 10000) + '_' + email.substring(email.search('@'), email.lenght);
    let firstname = faker.name.firstName();
    let lastname = faker.name.lastName();

    let googleId = userIdGen;
    // let imageUrl =  faker.image.people(600, 650);
    let imageUrl =  faker.image.avatar();
    // let imageUrl =  userImg[Math.floor(Math.random() * 4)];
    
    // let imageUrl =  "https://source.unsplash.com/random";
    
    //let imageUrl =  faker.random.image();

	let givenName = firstname;
	let familyName = lastname;
	let degree = faker.company.bs(); 
	let companyPosition = faker.name.jobTitle(); 
	let location = faker.address.streetAddress(); 
	let role = "HR";
	let status = "";
	let linkedin = faker.internet.url();
	let gitlab = faker.internet.url();
	let website = faker.internet.url();
	let skills =  [{
        label: "PHP",
        rang: Math.floor(Math.random() * 50)
    }, {
        label: "JS",
        rang: Math.floor(Math.random() * 70)
    },{
        label: "C",
        rang: Math.floor(Math.random() * 90)
    },{
        label: "Node",
        rang: Math.floor(Math.random() * 80)
    }];
	let cv = faker.internet.url(); 
	let note = faker.lorem.paragraph(10);
    
    return new Promise((resolve, reject) => {

        bcrypt.hash(password, 10, (err, hash) => {

            resolve({
                _id: new mongoose.Types.ObjectId,
                googleId: googleId,
                imageUrl: imageUrl, 
                firstname: firstname,
                lastname: lastname,
                email: email,
                givenName: givenName,
                familyName: familyName,
                degree: degree,
                companyPosition: companyPosition,
                location: location,
                role: role,
                status: status,
                linkedin: linkedin,
                gitlab: gitlab,
                website: website,
                skills: skills,
                cv: cv,
                note: note,
            })
        })
    })
}

async function generateUsers() {

  let users = {}

  for (let id=1; id <= 100; id++) {
    user = new User(await creatNewAccountUser());
    user.save();
    user = {};
  }
  console.log("50 user added to database!")
}

module.exports = {
    generateUsers,
    creatNewAccountUser
}
