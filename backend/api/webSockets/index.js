let trainAIChatBox = require('./chatBotTraining') 

exports.connectWebSocket = (io) => {

    io.on('connection', function (socket) {
        socket.on('join', (userId) => {
            socket.join(userId);
            console.log("socket joined!")
        });

        socket.on('new-msg', async function (data) {
            let response = await trainAIChatBox.generateResponseAI(data.msg);
            io.to(data.room).emit('send-msg-response', response.answer !== undefined 
            ? response.answer : "Désolé, je ne comprends pas :( ");
        })

    });
}
