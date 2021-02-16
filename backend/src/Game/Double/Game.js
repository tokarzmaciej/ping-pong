const mqtt = require('mqtt');
const client = mqtt.connect("tcp://host:port");
const store = require('../../store');
const { addMove, addGame, tryBackMove, backMove, answerOnBackMove } = require('./actions');


client.on('connect', function () {
    client.subscribe('double/room/+/game/+/+/move_to/#', function (err) {
    });
});


client.on('message', function (topic, message) {

    const move = message.toString();
    const rooms = store.getState().double.rooms;
    const valuesTopic = topic.split("/");
    const idRoom = parseInt(valuesTopic[2]);
    const idGame = valuesTopic[4];
    const nickSender = valuesTopic[5];
    const nickReceiver = valuesTopic[7];
    const room = rooms.filter(room => room.id === idRoom)[0];
    const roomPlayers = room.players.map(player => player.nick);
    const actualGame = room.game[0];
    const answersOnBackMove = actualGame.answersOnBack;

    const checkExistNicks = (nickSender, nickReceiver) => {
        const result = rooms.reduce((total, amount) => {
            const nicks = amount.players
                .filter(player => player.nick === nickSender || player.nick === nickReceiver)
            return [...nicks, ...total]
        }, [])
        return result.length
    };

    if (move === "BACK") {
        store.dispatch(tryBackMove(idRoom, idGame, "", roomPlayers
            .filter(nick => nick !== nickSender)))
    };

    if (move === "NO" || move === "YES") {
        store.dispatch(answerOnBackMove(idRoom, idGame, move, actualGame.back
            .filter(nick => nick !== nickSender)))
    };

    if (answersOnBackMove.length === 2 && answersOnBackMove.includes("NO")) {
        store.dispatch(tryBackMove(idRoom, idGame, nickSender, ""))
    };

    if (answersOnBackMove.length === 2 && !answersOnBackMove.includes("NO") && move === "YES") {
        const lastResult = room.game.filter(game => game.move.length === 2 &&
            game.move.includes("PING") && game.move.includes("PONG"))
        if (lastResult.length === 0) {
            store.dispatch(backMove(idRoom, idGame, room.players[3].nick, 0, 0, undefined))
        }
        else {
            store.dispatch(backMove(idRoom, idGame, lastResult[0].queue,
                lastResult[0].score1, lastResult[0].score2, lastResult[0].id))
        }
    };

    if (checkExistNicks(nickSender, nickReceiver) === 2 && (move === "PING" || move === "PONG")) {
        if (actualGame.move.length === 0) {
            store.dispatch(addMove(idRoom, idGame, nickReceiver, move))
        } else {
            if (actualGame.move[0] === move) {
                store.dispatch(addMove(idRoom, idGame, nickSender, move))
                if (actualGame.team1.includes(nickSender)) {
                    const score1 = actualGame.score1
                    const score2 = actualGame.score2
                    store.dispatch(addGame(idRoom, nickSender, score1, score2))
                } else {
                    const score1 = actualGame.score1
                    const score2 = actualGame.score2
                    store.dispatch(addGame(idRoom, nickSender, score1, score2))
                }
            } else {
                store.dispatch(addMove(idRoom, idGame, nickReceiver, move))
                if (actualGame.team1.includes(nickSender)) {
                    const score1 = actualGame.score1
                    const score2 = actualGame.score2 + 1
                    store.dispatch(addGame(idRoom, nickReceiver, score1, score2))
                } else {
                    const score1 = actualGame.score1 + 1
                    const score2 = actualGame.score2
                    store.dispatch(addGame(idRoom, nickReceiver, score1, score2))
                }
            }
        }
    };
});