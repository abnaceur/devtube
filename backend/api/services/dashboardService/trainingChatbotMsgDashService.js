const chatBotAI = require('../../webSockets/chatBotTraining');
const utils = require('../utils')


async function trainingChatbotMsg (res) {
    try {
        let tarinAI = await chatBotAI.trainChatBotIA();
        res.status(200).json(200);
    } catch (err) {
        utils.defaultError(res, err)
    }
}

module.exports = {
    trainingChatbotMsg
}