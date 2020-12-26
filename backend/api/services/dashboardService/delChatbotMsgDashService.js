

const utils = require('../utils')
const Chatbot = require('../../models/ChatBot');


async function delChatbotMsg(data, res) {
    console.log("Remove chatbot :", data.botId);
    let botId = data.botId;
    Chatbot.find({
        _id: botId,
        chatBotDeleted: false
    }).exec()
        .then(bot => {
            if (bot.length > 0) {
                bot[0].chatBotDeleted = true;
                bot[0].dateOfLastUpdate = Date.now;
                Chatbot.findByIdAndUpdate(bot[0]._id,
                    bot[0], {
                    new: false,
                },
                    function (err, results) {
                        if (err) return res.status(500).json(err);
                        res.status(200).json(200)
                    })
            } else
                res.status(500)
        })
        .catch(err => utils.defaultError(res, err))
}

module.exports = {
    delChatbotMsg
}