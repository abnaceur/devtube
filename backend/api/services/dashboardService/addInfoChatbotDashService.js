const ChatBot = require('../../models/ChatBot');
const mongoose = require('mongoose');
const utils = require('../utils');

initChatBot = (data, userId) => {
    return new Promise((resolve, reject) => {
        resolve({
            _id: new mongoose.Types.ObjectId,
            chatBotUserId: userId,
            chatBotLang: data.chatBotLanguage,
            chatBotQuestion: data.chatBotQuestion,
            chatBotResponse: data.chatBotResponse,
            chatBotKey: data.chatBotKey,
        })
    })
}

async function addnfoChatbot (userId, data, res) {
    let chatbot = new ChatBot(await initChatBot(data, userId));
    try {
        chatbot.save()
        .then(results => {
            res.status(200).json(200)
        }).catch(err => utils.defaultError(res, err))
    } catch(e) {
        utils.defaultError(res, e);
    }
}

module.exports = {
    addnfoChatbot
}