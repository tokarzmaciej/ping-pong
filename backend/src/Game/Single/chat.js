const mqtt = require('mqtt');
const client = mqtt.connect("tcp://host:port");
const store = require('../../store');
const { sendMessage } = require('./actions');


client.on('connect', function () {
    client.subscribe('single/room/+/+/send_to/#', function (err) {
    })
});


client.on('message', function (topic, message) {

    const ms = message.toString();
    const rooms = store.getState().single.rooms;
    const valuesTopic = topic.split("/");
    const idRoom = parseInt(valuesTopic[2]);
    const nickSender = valuesTopic[3];
    const nickReceiver = valuesTopic[5];

    const checkExistNicks = (nickSender, nickReceiver) => {
        const result = rooms.reduce((total, amount) => {
            const nick = amount.players
                .filter(player => player.nick === nickSender || player.nick === nickReceiver)
            return [...nick, ...total]
        }, [])
        return result.length
    };

    if (checkExistNicks(nickSender, nickReceiver) === 2) {
        store.dispatch(sendMessage(idRoom, nickSender, ms))
    };

});