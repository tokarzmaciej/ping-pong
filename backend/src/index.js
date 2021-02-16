
const http = require('./Api/http');

// SINGLE

const singleJoinToGame = require('./Game/Single/JoinToGame');
const singleObservers = require('./Game/Single/Observers');
const singleComments = require('./Game/Single/Comments');
const singleChat = require('./Game/Single/Chat');
const singleGame = require('./Game/Single/Game');
const singleEndGame = require('./Game/Single/EndGame');

// DOUBLE

const doubleJoinToGame = require('./Game/Double/JoinToGame');
const doubleGame = require('./Game/Double/Game');
const doubleEndGame = require('./Game/Double/EndGame');
const doubleObservers = require('./Game/Double/Observers');
const doubleComments = require('./Game/Double/Comments');
const doubleChat = require('./Game/Double/Chat');