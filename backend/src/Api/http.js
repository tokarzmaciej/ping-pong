const express = require('express');
const cors = require('cors');
const app = express();
const store = require('../store');
const mqtt = require('mqtt');
const client = mqtt.connect("tcp://host:port");

app.use(cors());
app.use(express.json());


// SINGLE

// ROOMS

app.get('/single/rooms', async (req, res) => {
    try {
        const single = await store.getState().single.rooms;
        res.status(200).send(single);
    } catch (error) {
        res.status(404).send("error" + error)
    }

});

// PLAYERS

app.post('/single/player/join', async (req, res) => {
    try {
        const nick = req.body.nick;
        if (nick === "") {
            res.status(404).send("error")
        } else {
            await client.publish('single/player/join', `${nick}`);
            res.status(200).send("Add player");
        }
    } catch (error) {
        res.status(404).send("error" + error)
    }

});


// OBSERVERS

app.post('/single/room/:id/join/observer', async (req, res) => {
    try {
        const nick = req.body.nick;
        const id = req.params.id;
        if (nick === "") {
            res.status(404).send("error")
        } else {
            await client.publish(`single/room/${id}/join/observer`, `${nick}`);
            res.status(200).send("Add observer");
        }

    } catch (error) {
        res.status(404).send("error" + error)
    }

});

// COMMENTS

app.post('/single/room/:id/comment/:nick', async (req, res) => {
    try {
        const id = parseInt(req.params.id);
        const nick = req.params.nick;
        const message = req.body.message;
        await client.publish(`single/room/${id}/comment/${nick}`, `${message}`);
        res.status(200).send("Add comment");
    } catch (error) {
        res.status(404).send("error" + error)
    }

});


// CHAT

app.post('/single/room/:id/:nickSender/chat/:nickReceiver', async (req, res) => {
    try {
        const idRoom = req.params.id;
        const nickSender = req.params.nickSender;
        const nickReceiver = req.params.nickReceiver;
        const message = req.body.message;
        await client.publish(`single/room/${idRoom}/${nickSender}/send_to/${nickReceiver}`, `${message}`);
        res.status(200).send("Send message");
    } catch (error) {
        res.status(404).send("error" + error)
    }

});


// GAME

app.post('/single/room/:id/game/:idGame/:nickSender/move/:nickReceiver', async (req, res) => {
    try {
        const idRoom = req.params.id;
        const nickSender = req.params.nickSender;
        const nickReceiver = req.params.nickReceiver;
        const idGame = req.params.idGame;
        const move = req.body.move;
        await client.publish(`single/room/${idRoom}/game/${idGame}/${nickSender}/move_to/${nickReceiver}`, `${move}`);
        res.status(200).send("Add move");
    } catch (error) {
        res.status(404).send("error" + error)
    }

});

app.post('/single/room/:id/endGame', async (req, res) => {
    try {
        const idRoom = req.params.id;
        const winner = req.body.winner;
        await client.publish(`single/room/${idRoom}/end_game`, `${winner}`);
        res.status(200).send("End game");
    } catch (error) {
        res.status(404).send("error" + error)
    }

});




// DOUBLE

// ROOMS

app.get('/double/rooms', async (req, res) => {
    try {
        const double = await store.getState().double.rooms;
        res.status(200).send(double);
    } catch (error) {
        res.status(404).send("error" + error)
    }

});

// PLAYERS

app.post('/double/player/join', async (req, res) => {
    try {
        const nick = req.body.nick;
        if (nick === "") {
            res.status(404).send("error")
        } else {
            await client.publish('double/player/join', `${nick}`);
            res.status(200).send("Add player");
        }

    } catch (error) {
        res.status(404).send("error" + error)
    }

});

// GAME

app.post('/double/room/:id/game/:idGame/:nickSender/move/:nickReceiver', async (req, res) => {
    try {
        const idRoom = req.params.id;
        const nickSender = req.params.nickSender;
        const nickReceiver = req.params.nickReceiver;
        const idGame = req.params.idGame;
        const move = req.body.move;
        await client.publish(`double/room/${idRoom}/game/${idGame}/${nickSender}/move_to/${nickReceiver}`, `${move}`);
        res.status(200).send("Add move");
    } catch (error) {
        res.status(404).send("error" + error)
    }

});

app.post('/double/room/:id/endGame', async (req, res) => {
    try {
        const idRoom = req.params.id;
        const winner = req.body.winner;
        await client.publish(`double/room/${idRoom}/end_game`, `${winner}`);
        res.status(200).send("End game");
    } catch (error) {
        res.status(404).send("error" + error)
    }

});

// OBSERVERS

app.post('/double/room/:id/join/observer', async (req, res) => {
    try {
        const nick = req.body.nick;
        const id = req.params.id;
        if (nick === "") {
            res.status(404).send("error")

        } else {
            await client.publish(`double/room/${id}/join/observer`, `${nick}`);
            res.status(200).send("Add observer");
        }
    } catch (error) {
        res.status(404).send("error" + error)
    }

});

// COMMENTS

app.post('/double/room/:id/comment/:nick', async (req, res) => {
    try {
        const id = parseInt(req.params.id);
        const nick = req.params.nick;
        const message = req.body.message;
        await client.publish(`double/room/${id}/comment/${nick}`, `${message}`);
        res.status(200).send("Add comment");
    } catch (error) {
        res.status(404).send("error" + error)
    }

});

// CHAT

app.post('/double/room/:id/:nickSender/chat/:nickReceiver', async (req, res) => {
    try {
        const idRoom = req.params.id;
        const nickSender = req.params.nickSender;
        const nickReceiver = req.params.nickReceiver;
        const message = req.body.message;
        await client.publish(`double/room/${idRoom}/${nickSender}/send_to/${nickReceiver}`, `${message}`);
        res.status(200).send("Send message");
    } catch (error) {
        res.status(404).send("error" + error)
    }

});

app.listen(3001, () => {
});
