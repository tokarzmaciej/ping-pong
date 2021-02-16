import { createSelector } from 'reselect';

export const doubleRooms = (state) => state.doubleRooms.rooms;

const roomsById = (state, id) => doubleRooms(state)
    .filter(room => room.id === parseInt(id));

const messagePlayer = (state, id, nickPlayer) => roomsById(state, id)[0].chat
    .filter(message => message.nickReceiver === nickPlayer
        || message.nickSender === nickPlayer);

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
    messagePlayer,
    messages => messages.slice(-5)
);

export const game = createSelector(
    roomsById,
    room => room[0].game[0]
);

export const allObserversDouble = createSelector(
    doubleRooms,
    rooms => rooms.map(room => room.observers).flat()
);

export const allPlayersDouble = createSelector(
    doubleRooms,
    rooms => rooms.map(room => room.players)
        .flat()
        .map(player => player.nick)
);