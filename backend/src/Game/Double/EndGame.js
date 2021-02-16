const mqtt = require('mqtt');
const client = mqtt.connect("tcp://host:port");
const store = require('../../store');
const { endGame } = require('./actions');


client.on('connect', function () {
    client.subscribe('double/room/+/end_game', function (err) {
    })
});


client.on('message', function (topic, message) {

    const nickWiner = message.toString();
    const rooms = store.getState().double.rooms;
    const valuesTopic = topic.split("/");
    const idRoom = parseInt(valuesTopic[2]);
    const room = rooms.filter(room => room.id === idRoom)[0];
    const actualGame = room.game[0];


    if (nickWiner === "team1") {
        store.dispatch(endGame(idRoom, actualGame.team2[0]));
    } else {
        store.dispatch(endGame(idRoom, actualGame.team1[0]));
    };
});