let mongoose = require('mongoose');

// ChatBot schema
let ChatBotSchema = mongoose.Schema({
	_id: mongoose.Schema.Types.ObjectId,
    chatBotUserId: String,
    chatBotLang: String,
    chatBotQuestion: String,
    chatBotResponse: String,
    chatBotKey: String,
    chatBotDeleted: {
        type: Boolean,
        default: false,
    },
    dateOfCreation: {
		type: Date,
		default: Date.now,
	},
	dateOfLastUpdate: {
		type: Date,
		default: Date.now,
	},
});

module.exports = mongoose.model('ChatBot', ChatBotSchema);