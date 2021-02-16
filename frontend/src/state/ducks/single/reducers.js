import { ADD_ROOMS, ADD_PLAYER_NICK, ADD_OBSERVER_NICK } from './types';

export const singleRooms = (state = { rooms: [] }, action) => {
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

export const game = (state = { playerNick: "" }, action) => {
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
