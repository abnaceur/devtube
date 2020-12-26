const Chatbot = require('../../models/ChatBot');
const utils = require('../utils')

initEditbaleChatbot = (data) => {
    return new Promise((resolve, reject) => {
        Chatbot.find({
            _id: data.chatBotId,
            chatBotDeleted: false
        }).exec()
            .then(bot => {
                console.log("bot ==> :", bot);
                if (bot.length > 0) {
                    //TODO TRACK WHO MODIFIED
                    // bot[0].chatBotUserId = chatBotQuestion:;
                    bot[0].chatBotLang = data.chatBotLanguage;
                    bot[0].chatBotQuestion = data.chatBotQuestion;
                    bot[0].chatBotResponse = data.chatBotResponse;
                    bot[0].chatBotKey = data.chatBotKey;
                    resolve(bot)
                } else resolve(false);
            })
            .catch(err => console.log("initEditbaleChatbot ERR :", err))
    })
}

async function editChatbotMsg(data, res) {
    let chatbot = await initEditbaleChatbot(data.chatbot)
    
    if (chatbot !== false) {
        Chatbot.findByIdAndUpdate(chatbot[0]._id,
            chatbot[0], {
            new: false,
        },
            function (err, results) {
                if (err) return res.status(500).json(err);
                res.status(200).json(200)
            })
    } else utils.defaultError(res, "Error")
}

module.exports = {
    editChatbotMsg
}