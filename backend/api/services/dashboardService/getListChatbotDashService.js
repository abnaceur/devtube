const ChatBot = require('../../models/ChatBot');
const utils = require('../utils');

countAllChatBots = () => {
    return new Promise((resolve, reject) => {
        ChatBot.find({
            chatBotDeleted: false
        })
            .exec()
            .then(ChatBots => {
                resolve(ChatBots.length);
            }).catch(err => console.log("countAllChatbot ERR : ", err))
    })
}


async function getListChatbot(page, res) {
    ChatBot.find({
        chatBotDeleted: false
    })
        .sort({ 'dateOfLastUpdate': -1 })
        .skip(Number(page * 10))
        .limit(Number(20))
        .exec()
        .then(async ChatBots => {
            console.log("ChatBots :",ChatBots);
            let ChatBotCount = await countAllChatBots();
            res.status(200).json({
                Count: ChatBotCount,
                per_page: 10,
                total: ChatBotCount,
                total_pages: Math.floor(ChatBotCount / 10),
                data: ChatBots,
                code: 200,
                msg: "ok"
            })
        })
        .catch(err => utils.defaultError(res, err))

}

module.exports = {
    getListChatbot
}