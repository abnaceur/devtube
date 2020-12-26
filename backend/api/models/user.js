let mongoose = require('mongoose');

// User schema
let userSchema = mongoose.Schema({
	_id: mongoose.Schema.Types.ObjectId,
	googleId: String,
	imageUrl: String, 
	firstname:{
		type: String,
		default: "",
	},
	lastname: {
		type: String,
		default: "",
	},
	email: String,
	name: String,
	givenName: String,
	familyName: String,
	degree: {
		type: String,
		default: "",
	},
	companyPosition: {
		type: String,
		default: "",
	},
	location: {
		type: String,
		default: "",
	},
	role: {
		type: String,
		default: "USER",
	},
	status: {
		type: String,
		default: "",
	},
	linkedin: {
		type: String,
		default: "",
	},
	gitlab: {
		type: String,
		default: "",
	},
	website: {
		type: String,
		default: "",
	},
	skills: {
		type: Array,
		default: [],
	},
	cv: {
		type: String,
		default: "",
	},
	note: {
		type: String,
		default: "",
	},
	dateOfCreation: {
		type: Date,
		default: Date.now,
	},
	blocked: {
        type: Boolean,
        default: false,
    },
	dateOfLastUpdate: {
		type: Date,
		default: Date.now,
	},
});

module.exports = mongoose.model('User', userSchema);