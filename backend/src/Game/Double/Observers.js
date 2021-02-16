const mqtt = require('mqtt');
const client = mqtt.connect("tcp://host:port");
const store = require('../../store');
const { addObserver } = require('./actions');



client.on('connect', function () {
    client.subscribe('double/room/+/join/observer', function (err) {
    });
});


client.on('message', function (topic, message) {

    const nickObserver = message.toString();
    const rooms = store.getState().double.rooms;
    const idRoom = parseInt(topic.split("/")[2]);

    const checkExistRoom = (idRoom) => {
        const result = rooms.filter(room => room.id === idRoom)
        return result
    };


    const checkReapeatNicks = (nickObserver) => {
        const nicksPlayers = rooms
            .map(room => room.players)
            .flat()
            .filter(player => player.nick === nickObserver)
        const nicksObservers = rooms
            .map(room => room.observers)
            .flat()
            .filter(nick => nick === nickObserver)
        const allNicks = [...nicksPlayers, ...nicksObservers]
        return allNicks.length
    };

    if (checkExistRoom(idRoom).length === 1) {
        if (checkReapeatNicks(nickObserver) === 0) {
            store.dispatch(addObserver(nickObserver, idRoom))
        }
    };
});