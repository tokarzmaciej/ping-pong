import React, { useState } from 'react';
import { connect } from 'react-redux';
import { nickPlayers, comments, observers, chat, game } from '../../state/ducks/single/selectors';
import { postComment, postChat, postMove, endGame } from '../../state/ducks/single/operations';


function Single(
    { id, nickPlayers, comments, observers,
        status, nickPlayer, addComment, nickObserver,
        sendMessage, messages, actualMove, addMove, endGame
    }) {

    const [comment, setComment] = useState("");
    const [chat, setChat] = useState("");

    const checkWin = (actualMove) => {
        if (nickPlayers.length === 2 && actualMove[nickPlayers[0]] === 2) {
            alert(`${nickPlayers[0]} win`)
            endGame(nickPlayers[0], id)
        }
        if (nickPlayers.length === 2 && actualMove[nickPlayers[1]] === 2) {
            alert(`${nickPlayers[1]} win`)
            endGame(nickPlayers[1], id)
        }
    };

    return (
        <div id="single">
            {nickPlayers.length === 2 ? checkWin(actualMove) : null}
            <div className="room">
                <div className="header">
                    <div className="player1">
                        {nickPlayers.length === 2 ? <h1 className="title">
                            {nickPlayers[0]} ------ {actualMove[nickPlayers[0]]}
                        </h1>
                            : <h1 className="title">{nickPlayers[0]}</h1>}
                    </div>
                    <div className="player2">
                        {nickPlayers.length === 2 ? <h1 className="title">
                            {actualMove[nickPlayers[1]]} ------ {nickPlayers[1]}  </h1> :
                            <h1 className="title">{nickPlayers[1]}</h1>}
                    </div>
                </div>
                <div className="center">

                    <div className="board">
                        {status === "player" && nickPlayers.length === 2 && actualMove.queue === nickPlayer ?
                            <>
                                <div className="buttons">
                                    <button
                                        className="button is-size-2 is-white"
                                        onClick={() => addMove("PING", id, actualMove.id, nickPlayer,
                                            nickPlayer === nickPlayers[0] ? nickPlayers[1] : nickPlayers[0])}>
                                        PING
                                    </button>
                                    <button
                                        className="button is-size-2 is-black"
                                        onClick={() => addMove("PONG", id, actualMove.id, nickPlayer,
                                            nickPlayer === nickPlayers[0] ? nickPlayers[1] : nickPlayers[0])}>
                                        PONG
                                    </button>
                                    <button className="button is-size-6 is-link m-1"
                                        onClick={() => addMove("BACK", id, actualMove.id, nickPlayer,
                                            nickPlayer === nickPlayers[0] ? nickPlayers[1] : nickPlayers[0])}>
                                        BACK
                                    </button>
                                </div>
                            </> : null}
                        {status === "player" && nickPlayers.length === 2 && actualMove.back === nickPlayer ? <>
                            <button className="button is-size-6 is-warning m-1"
                                onClick={() => addMove("YES", id, actualMove.id, nickPlayer,
                                    nickPlayer === nickPlayers[0] ? nickPlayers[1] : nickPlayers[0])}
                            >
                                YES
                            </button>
                            <button className="button is-size-6 is-warning m-1"
                                onClick={() => addMove("NO", id, actualMove.id, nickPlayer,
                                    nickPlayer === nickPlayers[0] ? nickPlayers[1] : nickPlayers[0])}
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

                    {status === "player" && nickPlayers.length === 2 ?
                        <div className="chat box has-background-grey-lighter ">
                            <div>
                                <h1 className="title">Chat</h1>
                            </div>
                            <div className="chats-in-box">
                                {messages.map(message =>
                                    message.nick === nickPlayer ?
                                        <div className="box has-background-primary is-size-7" key={message.id}>
                                            <h1 className="title is-size-7">{message.message}</h1>
                                        </div> :
                                        <div className="box has-background-link is-size-7" key={message.id}>
                                            <h1 className="title has-text-light is-size-7">{message.message}</h1>
                                            <p className="has-text-white-bis">{message.nick}</p>
                                        </div>
                                )}
                            </div>
                            <div className="send">
                                <input
                                    value={chat}
                                    className="input is-rounded is-size-7"
                                    onChange={(event) => setChat(event.target.value)}>
                                </input>
                                <button
                                    className="button is-rounded is-size-7"
                                    onClick={() => {
                                        sendMessage(chat, id, nickPlayer, nickPlayer === nickPlayers[0] ?
                                            nickPlayers[1] : nickPlayers[0])
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

const mapStateToProps = (state, { id }) => {
    return {
        nickPlayers: nickPlayers(state, id),
        comments: comments(state, id),
        observers: observers(state, id),
        nickObserver: state.game[`nickObserver${id}`],
        messages: chat(state, id),
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

export default connect(mapStateToProps, mapDispatchToProps)(Single);
