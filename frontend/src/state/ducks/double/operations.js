import axios from 'axios';
import { addRooms } from './actions';
const host = "http://localhost:3001/"

export const getDoubleRooms = () => async dispatch => {

    try {
        const res = await axios.get(`${host}double/rooms`)
        dispatch(addRooms(res.data))
    }
    catch (e) {
        dispatch({
            type: "ERROR",
            payload: console.log(e),
        })
    }
};

export const postJoinPlayerToDoubleGame = (payload) => async dispatch => {

    try {
        await axios.post(`${host}double/player/join`, { nick: payload })
    }
    catch (e) {
        dispatch({
            type: "ERROR",
            payload: console.log(e),
        })
    }
};

export const postJoinObserverToDoubleRoom = (payload, id) => async dispatch => {

    try {
        await axios.post(`${host}double/room/${id}/join/observer`, { nick: payload })
    }
    catch (e) {
        dispatch({
            type: "ERROR",
            payload: console.log(e),
        })
    }
};

export const postComment = (payload, id, nick) => async dispatch => {

    try {
        await axios.post(`${host}double/room/${id}/comment/${nick}`, { message: payload })
    }
    catch (e) {
        dispatch({
            type: "ERROR",
            payload: console.log(e),
        })
    }
};

export const postChat = (payload, id, nickSender, nickReceiver) => async dispatch => {

    try {
        await axios.post(`${host}double/room/${id}/${nickSender}/chat/${nickReceiver}`, { message: payload })
    }
    catch (e) {
        dispatch({
            type: "ERROR",
            payload: console.log(e),
        })
    }
};

export const postMove = (payload, id, idGame, nickSender, nickReceiver) => async dispatch => {

    try {
        await axios.post(`${host}double/room/${id}/game/${idGame}/${nickSender}/move/${nickReceiver}`, { move: payload })
    }
    catch (e) {
        dispatch({
            type: "ERROR",
            payload: console.log(e),
        })
    }
};

export const endGame = (payload, id) => async dispatch => {

    try {
        await axios.post(`${host}double/room/${id}/endGame`, { winner: payload })
    }
    catch (e) {
        dispatch({
            type: "ERROR",
            payload: console.log(e),
        })
    }
};