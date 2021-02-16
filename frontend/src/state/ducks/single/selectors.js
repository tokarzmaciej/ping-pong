import { createSelector } from 'reselect';

export const rooms = (state) => state.singleRooms.rooms;

const roomsById = (state, id) => rooms(state)
    .filter(room => room.id === parseInt(id));


export const nickPlayers = createSelector(
    roomsById,
    room => room[0].players.map(player => player.nick)
);

export const comments = createSelector(
    roomsById,
    room => room[0].comments.slice(-5)
);

export const observers = createSelector(
    roomsById,
    room => room[0].observers
);

export const chat = createSelector(
    roomsById,
    room => room[0].chat.slice(-5)
);

export const game = createSelector(
    roomsById,
    room => room[0].game[0]
);

export const allObservers = createSelector(
    rooms,
    rooms => rooms.map(room => room.observers).flat()
);

export const allPlayers = createSelector(
    rooms,
    rooms => rooms.map(room => room.players).flat().map(player => player.nick)
);