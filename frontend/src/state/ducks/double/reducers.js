import { ADD_ROOMS, ADD_PLAYER_NICK, ADD_OBSERVER_NICK } from './types';

export const doubleRooms = (state = { rooms: [] }, action) => {
    switch (action.type) {
        case ADD_ROOMS:
            return {
                ...state,
                rooms: action.payload
            }
        default:
            return state
    }
};

export const doubleGame = (state = { playerNick: "" }, action) => {
    switch (action.type) {
        case ADD_PLAYER_NICK:
            return {
                playerNick: action.payload
            }
        case ADD_OBSERVER_NICK:
            return {
                ...state,
                ...action.payload
            }
        default:
            return state
    }
};
