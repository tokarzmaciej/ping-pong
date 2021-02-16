import React, { useState } from 'react';
import { connect } from 'react-redux';
import { nickPlayers, comments, observers, chat, game } from '../../state/ducks/double/selectors';
import { postComment, postChat, postMove, endGame } from '../../state/ducks/double/operations';


function Double(
    { id, nickPlayers, comments, observers,
        status, nickPlayer, addComment, nickObserver,
        sendMessage, messages, actualMove, addMove, endGame
    }) {

    const [comment, setComment] = useState("");
    const [chat, setChat] = useState("");
    const [receiver, setReceiver] = useState("");
    const [addresser, setAddresser] = useState("");

    const sendTo = () => {
        if (actualMove.team1.includes(nickPlayer) && receiver === "") {
            return actualMove.team2[0]
        }
        if (actualMove.team2.includes(nickPlayer) && receiver === "") {
            return actualMove.team1[0]
        }
        if (receiver !== "") {
            return receiver
        }
    };

    const checkWin = (actualMove) => {
        if (nickPlayers.length === 4 && actualMove.score1 === 2) {
            alert(`${nickPlayers[0]} ${nickPlayers[1]} win`)
            endGame("team1", id)
        }
        if (nickPlayers.length === 4 && actualMove.score2 === 2) {
            alert(`${nickPlayers[2]} ${nickPlayers[3]} win`)
            endGame("team2", id)
        }
    };

    return (
        <div id="double">
            {nickPlayers.length === 4 ? checkWin(actualMove) : null}
            <div className="room">
                <div className="header">
                    <div className="team1">
                        {nickPlayers.length === 4 ?
                            <h1 className="title">
                                {nickPlayers[0]} {nickPlayers[1]} ------ {actualMove.score1}
                            </h1> :
                            <h1 className="title">
                                {nickPlayers.length >= 2 ? nickPlayers[0] + nickPlayers[1] : nickPlayers[0]}
                            </h1>}
                    </div>
                    <div className="team2">
                        {nickPlayers.length === 4 ?
                            <h1 className="title">
                                {actualMove.score2} ------ {nickPlayers[2]} {nickPlayers[3]}
                            </h1> :
                            <h1 className="title">
                                {nickPlayers.length === 3 ? nickPlayers[2] : null}
                            </h1>}

                    </div>
                </div>
                <div className="center">

                    <div className="board">
                        {status === "player" && nickPlayers.length === 4 && actualMove.queue === nickPlayer ?
                            <>
                                <div className="buttons">
                                    {actualMove.team1.includes(nickPlayer) ?
                                        <div className="select is-rounded is-size-4"
                                            onChange={(event) => setReceiver(event.target.value)}
                                        >
                                            <select onChange={(event) => setReceiver(event.target.value)}>
                                                <option>
                                                    {receiver !== "" && actualMove.team2[0] !== receiver ? receiver : actualMove.team2[0]}
                                                </option>
                                                <option>
                                                    {actualMove.team2[1] === receiver ? actualMove.team2[0] : actualMove.team2[1]}
                                                </option>
                                            </select>
                                        </div> :
                                        <div className="select is-rounded is-size-4"
                                            onChange={(event) => setReceiver(event.target.value)}
                                        >
                                            <select onChange={(event) => setReceiver(event.target.value)} >
                                                <option>
                                                    {receiver !== "" && actualMove.team1[0] !== receiver ? receiver : actualMove.team1[0]}
                                                </option>
                                                <option>
                                                    {actualMove.team1[1] === receiver ? actualMove.team1[0] : actualMove.team1[1]}
                                                </option>
                                            </select>
                                        </div>
                                    }
                                    <button
                                        className="button is-size-2 is-white"
                                        onClick={() => {
                                            addMove("PING", id, actualMove.id, nickPlayer, sendTo())
                                        }}>
                                        PING
                                    </button>
                                    <button
                                        className="button is-size-2 is-black"
                                        onClick={() => {
                                            addMove("PONG", id, actualMove.id, nickPlayer, sendTo())
                                        }}>
                                        PONG
                                    </button>
                                    <button className="button is-size-6 is-link m-1"
                                        onClick={() => addMove("BACK", id, actualMove.id, nickPlayer, "players")}>
                                        BACK
                                    </button>
                                </div>
                            </> : null}
                        {status === "player" && nickPlayers.length === 4 && actualMove.back.includes(nickPlayer) ? <>
                            <button className="button is-size-6 is-warning m-1"
                                onClick={() => addMove("YES", id, actualMove.id, nickPlayer, "players")}
                            >
                                YES
                            </button>
                            <button className="button is-size-6 is-warning m-1"
                                onClick={() => addMove("NO", id, actualMove.id, nickPlayer, "players")}
                            >
                                NO
                            </button>
                        </> : null}
                    </div>

                    <div className="comments box has-background-primary">
                        <div className="title">
                            <h1 className="title">Comments</h1>
                        </div>
                        <div className="comments-in-box">
                            {comments.map(comment =>
                                <div className="box has-background-danger-dark is-size-7" key={comment.id}>
                                    <h1 className="title has-text-light is-size-7">{comment.comment}</h1>
                                    <p className="has-text-white-bis">{comment.nick}</p>
                                </div>)}
                        </div>
                        <div className="send">
                            <input
                                value={comment}
                                className="input is-rounded is-size-7"
                                onChange={(event) => setComment(event.target.value)}>
                            </input>
                            <button
                                className="button is-rounded is-size-7"
                                onClick={() => {
                                    status === "player" ? addComment(comment, id, nickPlayer) :
                                        addComment(comment, id, nickObserver)
                                    setComment("")
                                }}
                            >
                                Send
                            </button>
                        </div>
                    </div>

                    {status === "player" && nickPlayers.length >= 2 ?
                        <div className="chat box has-background-grey-lighter ">
                            <div>
                                <h1 className="title">Chat</h1>
                            </div>
                            <div className="chats-in-box">
                                {messages.map(message =>
                                    message.nickSender === nickPlayer ?
                                        <div className="box has-background-primary is-size-7" key={message.id}>
                                            <h1 className="title is-size-7">{message.message}</h1>
                                            <p className="has-text-white-bis">{message.nickReceiver}</p>
                                        </div> :
                                        <div className="box has-background-link is-size-7" key={message.id}>
                                            <h1 className="title has-text-light is-size-7">{message.message}</h1>
                                            <p className="has-text-white-bis">{message.nickSender}</p>
                                        </div>
                                )}
                            </div>
                            <div className="send">
                                <div className="select is-rounded is-size-7">
                                    <select
                                        onClick={(event) => setAddresser(event.target.value)}
                                    >
                                        <option></option>
                                        {nickPlayers
                                            .filter(nick => nick !== nickPlayer)
                                            .map((nick, index) => <option key={index}>{nick}</option>)}
                                    </select>
                                </div>
                                <input
                                    value={chat}
                                    className="input is-rounded is-size-7"
                                    onChange={(event) => setChat(event.target.value)}>
                                </input>
                                <button
                                    className="button is-rounded is-size-7"
                                    onClick={() => {
                                        sendMessage(chat, id, nickPlayer, addresser)
                                        setChat("")
                                    }}
                                >
                                    Send
                                </button>
                            </div>
                        </div>
                        : null}
                </div>

                <div className="observers">
                    <h1 className="title">observers</h1>
                    <div>
                        {observers.map(((observer, index) => <p key={index} className="is-size-4 has-text-link">
                            {observer}</p>))}
                    </div>
                </div>
            </div >
        </div >
    );
};

const mapStateToProps = (state, { id, nickPlayer }) => {
    return {
        nickPlayers: nickPlayers(state, id),
        comments: comments(state, id),
        observers: observers(state, id),
        nickObserver: state.doubleGame[`nickObserver${id}`],
        messages: chat(state, id, nickPlayer),
        actualMove: game(state, id)
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        addComment: (payload, id, nick) => dispatch(postComment(payload, id, nick)),
        sendMessage: (payload, id, nickSender, nickReceiver) =>
            dispatch(postChat(payload, id, nickSender, nickReceiver)),
        addMove: (payload, id, idGame, nickSender, nickReceiver) =>
            dispatch(postMove(payload, id, idGame, nickSender, nickReceiver)),
        endGame: (payload, id) => dispatch(endGame(payload, id))

    }
};

export default connect(mapStateToProps, mapDispatchToProps)(Double);
