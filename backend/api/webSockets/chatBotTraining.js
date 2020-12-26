const { NlpManager } = require('node-nlp');
const manager = new NlpManager({ languages: ['fr', 'en'] });
const Chatbot = require('../models/ChatBot');

async function getAllChatbotMsg() {
    return new Promise((resolve, reject) => {
        Chatbot.find({
            chatBotDeleted: false
        }).exec()
            .then(bots => {
                resolve(bots);
            }).catch(err => console.log("getAllChatbotMsg ERR : ", err))
    })
}

async function trainChatBotIA() {
    return new Promise(async (resolve, reject) => {

        let chatBotMsg = await getAllChatbotMsg();

        // Adds the utterances and intents for the NLP
        // // Train also the NLG
        await chatBotMsg.map(bot => {
            manager.addDocument(bot.chatBotLang, bot.chatBotQuestion, bot.chatBotKey);
            manager.addAnswer(bot.chatBotLang, bot.chatBotKey, bot.chatBotResponse);
        })
        await manager.train();
        manager.save();
        resolve(true);
    })
}

async function generateResponseAI(qsm) {
    // Train and save the mode
    return new Promise(async (resolve, reject) => {
        let response = await manager.process('fr', qsm);
        if (response.answer === undefined)
            response = await manager.process('en', qsm);
        resolve(response);
    })
}

module.exports = {
    generateResponseAI,
    trainChatBotIA
}