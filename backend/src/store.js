const { createStore, combineReducers } = require('redux');;
const single = require('./Game/Single/reducers');
const double = require('./Game/Double/reducers');



const rootReducer = combineReducers({ single, double });
const store = createStore(rootReducer);

module.exports = store;