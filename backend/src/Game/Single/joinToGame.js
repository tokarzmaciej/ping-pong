const mqtt = require('mqtt');
const client = mqtt.connect("tcp://host:port");
const store = require('../../store');
const { addPlayer, addRoom, addGame } = require('./actions');



client.on('connect', function () {
    client.subscribe('single/player/join', function (err) {
    });
});


client.on('message', function (topic, message) {

    const playerNick = message.toString();
    const rooms = store.getState().single.rooms;


    const checkReapeatNicks = (playerNick) => {
        const nicksPlayers = rooms
            .map(room => room.players)
            .flat()
            .filter(player => player.nick === playerNick)
        const nicksObservers = rooms
            .map(room => room.observers)
            .flat()
            .filter(nick => nick === playerNick)
        const allNicks = [...nicksPlayers, ...nicksObservers]
        return allNicks.length
    };

    if (rooms[rooms.length - 1].players.length === 0) {
        if (checkReapeatNicks(playerNick) === 0) {
            store.dispatch(addPlayer(playerNick))
        }
    }
    else {
        if (checkReapeatNicks(playerNick) === 0) {
            store.dispatch(addPlayer(playerNick))
            store.dispatch(addGame(store.getState().single.rooms.length, playerNick, 0, 0))
            store.dispatch(addRoom())
        }
    };
});
