import { ADD_ROOMS, ADD_PLAYER_NICK, ADD_OBSERVER_NICK } from './types';

export const addRooms = (data) => (
    {
        type: ADD_ROOMS,
        payload: data.filter(room => room.players.length !== 0)
    }
);

export const addPlayerNickDouble = (payload) => (
    {
        type: ADD_PLAYER_NICK,
        payload: payload
    }
);

export const addObserverNickDouble = (payload) => (
    {
        type: ADD_OBSERVER_NICK,
        payload: payload
    }
);