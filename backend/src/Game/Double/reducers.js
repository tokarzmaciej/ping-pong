const initialState = { rooms: [{ id: 1, players: [], observers: [], comments: [], chat: [], game: [] }] };
const { ADD_PLAYER, ADD_ROOM, ADD_OBSERVER,
    ADD_COMMENT, NEW_MESSAGE, NEW_MOVE,
    NEW_GAME, TRY_BACK_MOVE, BACK_MOVE,
    END_GAME, ANSWER_ON_BACK_MOVE } = require('./types');



const double = (state = initialState, action) => {
    switch (action.type) {
        case ADD_PLAYER:
            return {
                rooms: [
                    ...state.rooms.slice(0, -1),
                    {
                        ...state.rooms[state.rooms.length - 1],
                        players: [...state.rooms[state.rooms.length - 1].players, action.payload]
                    }
                ]
            }

        case ADD_ROOM:
            return {
                rooms: [
                    ...state.rooms,
                    {
                        id: action.payload,
                        players: [],
                        observers: [],
                        comments: [],
                        chat: [],
                        game: []
                    }]
            }

        case NEW_GAME:
            return {
                rooms: state.rooms.map(room => {
                    if (room.id === action.payload.idRoom) {
                        return {
                            ...room,
                            game: [{
                                id: action.payload.id,
                                queue: action.payload.queue,
                                score1: action.payload.score1,
                                score2: action.payload.score2,
                                team1: [room.players[0].nick, room.players[1].nick],
                                team2: [room.players[2].nick, room.players[3].nick],
                                move: [],
                                back: "",
                                answersOnBack: []
                            }, ...room.game]
                        }
                    } else {
                        return room
                    }
                })
            }

        case NEW_MOVE:
            return {
                rooms: state.rooms.map(room => {
                    if (room.id === action.payload.idRoom) {
                        return {
                            ...room,
                            game: room.game.map(game => {
                                if (game.id === action.payload.idGame) {
                                    return {
                                        ...game,
                                        move: [action.payload.move, ...game.move],
                                        queue: action.payload.queue
                                    }

                                } else {
                                    return game
                                }
                            })
                        }
                    } else {
                        return room
                    }
                })
            }

        case TRY_BACK_MOVE:
            return {
                rooms: state.rooms.map(room => {
                    if (room.id === action.payload.idRoom) {
                        return {
                            ...room,
                            game: room.game.map(game => {
                                if (game.id === action.payload.idGame) {
                                    return {
                                        ...game,
                                        back: action.payload.nicks,
                                        queue: action.payload.queue,
                                        answersOnBack: []
                                    }

                                } else {
                                    return game
                                }
                            })
                        }
                    } else {
                        return room
                    }
                })
            }

        case ANSWER_ON_BACK_MOVE:
            return {
                rooms: state.rooms.map(room => {
                    if (room.id === action.payload.idRoom) {
                        return {
                            ...room,
                            game: room.game.map(game => {
                                if (game.id === action.payload.idGame) {
                                    return {
                                        ...game,
                                        back: action.payload.nicks,
                                        answersOnBack: [...game.answersOnBack, action.payload.answer]
                                    }

                                } else {
                                    return game
                                }
                            })
                        }
                    } else {
                        return room
                    }
                })
            }

        case BACK_MOVE:
            return {
                rooms: state.rooms.map(room => {
                    if (room.id === action.payload.idRoom) {
                        return {
                            ...room,
                            game: room.game.map(game => {
                                if (game.id === action.payload.idGame) {
                                    return {
                                        ...game,
                                        queue: action.payload.queue,
                                        score1: action.payload.score1,
                                        score2: action.payload.score2,
                                        move: [],
                                        back: "",
                                        answersOnBack: []
                                    }

                                } else {
                                    return game
                                }
                            }).filter(game => game.id !== action.payload.idLastMove)
                        }
                    } else {
                        return room
                    }
                })
            }

        case END_GAME:
            return {
                rooms: state.rooms.map(room => {
                    if (room.id === action.payload.idRoom) {
                        return {
                            ...room,
                            game: [{
                                id: action.payload.idGame,
                                queue: action.payload.queue,
                                score1: 0,
                                score2: 0,
                                team1: [room.players[0].nick, room.players[1].nick],
                                team2: [room.players[2].nick, room.players[3].nick],
                                move: [],
                                back: "",
                                answersOnBack: []
                            }]
                        }
                    } else {
                        return room
                    }
                })
            }

        case ADD_OBSERVER:
            return {
                rooms: state.rooms.map(room => {
                    if (room.id === action.payload.idRoom) {
                        return {
                            ...room,
                            observers: [...room.observers, action.payload.nick]
                        }
                    } else {
                        return room
                    }
                })
            }

        case ADD_COMMENT:
            return {
                rooms: state.rooms.map(room => {
                    if (room.id === action.payload.idRoom) {
                        return {
                            ...room,
                            comments: [
                                ...room.comments,
                                {
                                    id: action.payload.id,
                                    nick: action.payload.nick,
                                    comment: action.payload.comment
                                }
                            ]
                        }
                    } else {
                        return room
                    }
                })
            }

        case NEW_MESSAGE:
            return {
                rooms: state.rooms.map(room => {
                    if (room.id === action.payload.idRoom) {
                        return {
                            ...room,
                            chat: [
                                ...room.chat,
                                {
                                    id: action.payload.id,
                                    nickSender: action.payload.nickSender,
                                    nickReceiver: action.payload.nickReceiver,
                                    message: action.payload.message
                                }
                            ]
                        }
                    } else {
                        return room
                    }
                })
            }

        default:
            return state
    }
};

module.exports = double;