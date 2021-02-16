const initialState = { rooms: [{ id: 1, players: [], observers: [], comments: [], chat: [], game: [] }] };
const { ADD_PLAYER, ADD_ROOM, ADD_OBSERVER,
    ADD_COMMENT, NEW_MESSAGE, NEW_MOVE,
    NEW_GAME, TRY_BACK_MOVE, BACK_MOVE, END_GAME } = require('./types');



const single = (state = initialState, action) => {
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
                                [room.players[0].nick]: action.payload.score1,
                                [room.players[1].nick]: action.payload.score2,
                                move: [],
                                back: ""
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
                                        back: action.payload.nick,
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
                                        [room.players[0].nick]: action.payload.score1,
                                        [room.players[1].nick]: action.payload.score2,
                                        move: [],
                                        back: ""
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
                                [room.players[0].nick]: 0,
                                [room.players[1].nick]: 0,
                                move: [],
                                back: ""
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
                                    nick: action.payload.nickSender,
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

module.exports = single;

