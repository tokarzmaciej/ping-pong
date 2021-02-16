const mqtt = require('mqtt');
const client = mqtt.connect("tcp://host:port");
const store = require('../../store');
const { addComment } = require('./actions');



client.on('connect', function () {
    client.subscribe('single/room/+/comment/#', function (err) {
    });
});


client.on('message', function (topic, message) {

    const comment = message.toString();
    const rooms = store.getState().single.rooms;
    const valuesTopic = topic.split("/");
    const id = parseInt(valuesTopic[2]);
    const nick = valuesTopic[4];

    const checkExistRoom = (id) => {
        const result = rooms.filter(room => room.id === id)
        return result
    };

    const checkExistNick = (nick, id) => {
        const observers = checkExistRoom(id)[0]
            .observers
            .filter(observer => observer === nick)
        const players = checkExistRoom(id)[0]
            .players
            .filter(player => player.nick === nick)
        const result = [...players, ...observers]
        return result.length
    };

    if (checkExistRoom(id).length === 1) {
        if (checkExistNick(nick, id) === 1) {
            store.dispatch(addComment(id, nick, comment))
        }
    };
});