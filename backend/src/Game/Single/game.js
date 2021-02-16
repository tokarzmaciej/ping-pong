const mqtt = require('mqtt');
const client = mqtt.connect("tcp://host:port");
const store = require('../../store');
const { addMove, addGame, tryBackMove, backMove } = require('./actions');


client.on('connect', function () {
    client.subscribe('single/room/+/game/+/+/move_to/#', function (err) {
    });
});


client.on('message', function (topic, message) {

    const move = message.toString();
    const rooms = store.getState().single.rooms;
    const valuesTopic = topic.split("/");
    const idRoom = parseInt(valuesTopic[2]);
    const idGame = valuesTopic[4];
    const nickSender = valuesTopic[5];
    const nickReceiver = valuesTopic[7];
    const room = rooms.filter(room => room.id === idRoom)[0];


    const checkExistNicks = (nickSender, nickReceiver) => {
        const result = rooms.reduce((total, amount) => {
            const nick = amount.players
                .filter(player => player.nick === nickSender || player.nick === nickReceiver)
            return [...nick, ...total]
        }, [])
        return result.length
    };


    if (checkExistNicks(nickSender, nickReceiver) === 2 && move === "BACK") {
        store.dispatch(tryBackMove(idRoom, idGame, "", nickReceiver))
    };

    if (checkExistNicks(nickSender, nickReceiver) === 2 && move === "NO") {
        store.dispatch(tryBackMove(idRoom, idGame, nickReceiver, ""))
    };

    if (checkExistNicks(nickSender, nickReceiver) === 2 && move === "YES") {
        const lastResult = room.game.filter(game => game.move.length === 2 &&
            game.move.includes("PING") && game.move.includes("PONG"))
        if (lastResult.length === 0) {
            store.dispatch(backMove(idRoom, idGame, room.players[1].nick, 0, 0, undefined))
        }
        else {
            const player1 = Object.keys(lastResult[0])[2]
            const player2 = Object.keys(lastResult[0])[3]
            store.dispatch(backMove(idRoom, idGame, lastResult[0].queue,
                lastResult[0][player1], lastResult[0][player2], lastResult[0].id))
        }
    };

    if (checkExistNicks(nickSender, nickReceiver) === 2 && (move === "PING" || move === "PONG")) {
        if (room.game[0].move.length === 0) {
            store.dispatch(addMove(idRoom, idGame, nickReceiver, move))
        } else {
            if (room.game[0].move[0] === move) {
                store.dispatch(addMove(idRoom, idGame, nickSender, move))
                if (room.players[0].nick === nickSender) {
                    const score1 = room.game[0][nickSender]
                    const score2 = room.game[0][nickReceiver]
                    store.dispatch(addGame(idRoom, nickSender, score1, score2))
                } else {
                    const score1 = room.game[0][nickReceiver]
                    const score2 = room.game[0][nickSender]
                    store.dispatch(addGame(idRoom, nickSender, score1, score2))
                }
            } else {
                store.dispatch(addMove(idRoom, idGame, nickReceiver, move))
                if (room.players[0].nick === nickSender) {
                    const score1 = room.game[0][nickSender]
                    const score2 = room.game[0][nickReceiver] + 1
                    store.dispatch(addGame(idRoom, nickReceiver, score1, score2))
                } else {
                    const score1 = room.game[0][nickReceiver] + 1
                    const score2 = room.game[0][nickSender]
                    store.dispatch(addGame(idRoom, nickReceiver, score1, score2))
                }
            }
        }
    };
});
