const mqtt = require('mqtt');
const client = mqtt.connect("tcp://host:port");
const store = require('../../store');
const { endGame } = require('./actions');


client.on('connect', function () {
    client.subscribe('single/room/+/end_game', function (err) {
    })
});


client.on('message', function (topic, message) {

    const nickWiner = message.toString();
    const rooms = store.getState().single.rooms;
    const valuesTopic = topic.split("/");
    const idRoom = parseInt(valuesTopic[2]);
    const room = rooms.filter(room => room.id === idRoom)[0];


    if (room.players[0].nick === nickWiner) {
        store.dispatch(endGame(idRoom, room.players[1].nick));
    } else {
        store.dispatch(endGame(idRoom, room.players[0].nick));
    };

});

