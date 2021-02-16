const { ADD_PLAYER, ADD_ROOM, ADD_OBSERVER,
    ADD_COMMENT, NEW_MESSAGE, NEW_MOVE,
    NEW_GAME, TRY_BACK_MOVE, BACK_MOVE, END_GAME } = require('./types');
const { v4: uuid } = require('uuid');
const store = require('../../store');


const addPlayer = (nick) => (
    {
        type: ADD_PLAYER,
        payload: {
            id: uuid(),
            nick: nick,
        }
    }
);

const addRoom = () => (
    { type: ADD_ROOM, payload: store.getState().single.rooms.length + 1 }
);

const addObserver = (nick, id) => (
    {
        type: ADD_OBSERVER,
        payload: {
            idRoom: id,
            nick: nick
        }
    }
);

const addComment = (id, nick, comment) => (
    {
        type: ADD_COMMENT,
        payload: {
            id: uuid(),
            idRoom: id,
            nick: nick,
            comment: comment
        }
    }
);

const sendMessage = (id, nickSender, message) => (
    {
        type: NEW_MESSAGE,
        payload: {
            id: uuid(),
            idRoom: id,
            nickSender: nickSender,
            message: message
        }
    }
);

const addGame = (idRoom, nickPlayerToMove, score1, score2) => (
    {
        type: NEW_GAME,
        payload: {
            id: uuid(),
            idRoom: idRoom,
            queue: nickPlayerToMove,
            score1: score1,
            score2: score2
        }
    }
);

const addMove = (idRoom, idGame, nickPlayerToMove, move) => (
    {
        type: NEW_MOVE,
        payload: {
            idRoom: idRoom,
            idGame: idGame,
            queue: nickPlayerToMove,
            move: move,
        }
    }
);

const tryBackMove = (idRoom, idGame, queue, nickPlayerWhoDecide) => (
    {
        type: TRY_BACK_MOVE,
        payload: {
            idRoom: idRoom,
            idGame: idGame,
            queue: queue,
            nick: nickPlayerWhoDecide
        }
    }
);

const backMove = (idRoom, idGame, queue, score1, score2, idLastMove) => (
    {
        type: BACK_MOVE,
        payload: {
            idRoom: idRoom,
            idGame: idGame,
            queue: queue,
            score1: score1,
            score2: score2,
            idLastMove: idLastMove
        }
    }
);

const endGame = (idRoom, nickPlayerToMove) => (
    {
        type: END_GAME,
        payload: {
            idRoom: idRoom,
            idGame: uuid(),
            queue: nickPlayerToMove,
        }
    }
);

const actions = {
    addPlayer,
    addRoom,
    addObserver,
    addComment,
    sendMessage,
    addGame,
    addMove,
    tryBackMove,
    backMove,
    endGame
};

module.exports = actions;
