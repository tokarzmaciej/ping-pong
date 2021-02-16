import thunk from 'redux-thunk';
import { createStore, combineReducers, applyMiddleware } from 'redux';
import { singleRooms, game } from './ducks/single/reducers';
import { doubleRooms, doubleGame } from './ducks/double/reducers';



const rootReducer = combineReducers({ singleRooms, game, doubleGame, doubleRooms });
const store = createStore(rootReducer, applyMiddleware(thunk));

export default store;
