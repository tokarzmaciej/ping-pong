import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { getRooms, postJoinPlayerToSingleGame, postJoinObserverToSingleRoom } from '../../state/ducks/single/operations';
import { getDoubleRooms, postJoinPlayerToDoubleGame, postJoinObserverToDoubleRoom } from '../../state/ducks/double/operations';
import { rooms, allObservers, allPlayers } from '../../state/ducks/single/selectors';
import { doubleRooms, allObserversDouble, allPlayersDouble } from '../../state/ducks/double/selectors';
import { addPlayerNick, addObserverNick } from '../../state/ducks/single/actions';
import { addPlayerNickDouble, addObserverNickDouble } from '../../state/ducks/double/actions';


function Rooms({ rooms, getRooms, joinPlayer, joinObserver,
    addPlayerNick, nickGamer, addObserverNick, doubleRooms, getRoomsDouble,
    joinPlayerDouble, joinObserverDouble, addPlayerNickDouble, addObserverNickDouble,
    nickGamerDouble, allObservers, allPlayers, allObserversDouble, allPlayersDouble }) {

    const [nickPlayer, setNickPlayer] = useState("");
    const [nickObserverSingle, setNickObserverSingle] = useState("");
    const [nickObserverDouble, setNickObserverDouble] = useState("");

    useEffect(() => {
        getRooms()
        setInterval(() => getRooms(), 1000);
    }, [getRooms]);

    useEffect(() => {
        getRoomsDouble()
        setInterval(() => getRoomsDouble(), 1000);
    }, [getRoomsDouble]);

    const single = rooms.map((room, index) =>

        <div className="box has-background-primary" key={index}>
            <h3 to={`/room/single/${room.id}`} className="title has-text-black has-text-weight-bold">
                {index + 1}
            </h3>
            <p className="subtitle has-text-black-bis is-size-2">
                {room.players[0].nick} vs {room.players.length === 2 ? room.players[1].nick : ""}
            </p>
            <div>
                <input
                    onChange={(event) => setNickObserverSingle(event.target.value)}
                    className="input is-rounded is-size-6 has-background-primary-light"
                />
                <button className="button is-rounded is-size-6 has-background-link-light">
                    {!room.observers.includes(nickObserverSingle) &&
                        !room.players.map(player => player.nick).includes(nickObserverSingle) ?
                        <Link to={{ pathname: `/room/single/${room.id}`, status: "observer" }}
                            onClick={() => {
                                joinObserver(nickObserverSingle, room.id)
                                addObserverNick({ [`nickObserver${room.id}`]: nickObserverSingle })
                                setNickObserverSingle("")
                            }}>
                            OBSERVE
                </Link> : <>
                            <Link to={`/`}>This nick exist</Link>
                        </>}
                </button>
                <button className="button is-rounded is-size-6 has-background-link-light">
                    {
                        room.players.map(player => player.nick).includes(nickGamer) ?
                            <Link to={{ pathname: `/room/single/${room.id}`, status: "player", nickPlayer: nickGamer }}>
                                PLAY
                    </Link> :
                            <Link to={`/`}>PLAY</Link>
                    }
                </button>
            </div>
        </div >
    );

    const double = doubleRooms.map((room, index) =>
        <div className="box has-background-primary" key={index}>
            <h3 to={`/room/double/${room.id}`} className="title has-text-black has-text-weight-bold">
                {index + 1}
            </h3>
            <p className="subtitle has-text-black-bis is-size-2">
                {room.players[0].nick} {room.players.length >= 2 ? room.players[1].nick : ""} vs {room.players.length >= 3 ? room.players[2].nick : ""} {room.players.length >= 4 ? room.players[3].nick : ""}
            </p>
            <div>
                <input
                    onChange={(event) => setNickObserverDouble(event.target.value)}
                    className="input is-rounded is-size-6 has-background-primary-light"
                />
                <button className="button is-rounded is-size-6 has-background-link-light">
                    {!room.observers.includes(nickObserverDouble) &&
                        !room.players.map(player => player.nick).includes(nickObserverDouble) ?
                        <Link to={{ pathname: `/room/double/${room.id}`, status: "observer" }}
                            onClick={() => {
                                joinObserverDouble(nickObserverDouble, room.id)
                                addObserverNickDouble({ [`nickObserver${room.id}`]: nickObserverDouble })
                                setNickObserverDouble("")
                            }}>
                            OBSERVE
                </Link> : <>
                            <Link to={`/`}>This nick exist</Link>
                        </>}
                </button>
                <button className="button is-rounded is-size-6 has-background-link-light">
                    {
                        room.players.map(player => player.nick).includes(nickGamerDouble) ?
                            <Link to={{ pathname: `/room/double/${room.id}`, status: "player", nickPlayer: nickGamerDouble }}>
                                PLAY
                    </Link> :
                            <Link to={`/`}>PLAY</Link>
                    }
                </button>
            </div>
        </div >
    );

    return (
        <div id="container">
            <div className="rooms ">

                <div className="menu">
                    <h1 className="title is-size-2 has-text-link-dark">PING PONG</h1>
                </div>

                <div className="joining">
                    <input
                        value={nickPlayer}
                        onChange={(event) => setNickPlayer(event.target.value)}
                        className="input is-size-5 is-rounded"
                    >
                    </input>
                    {!allPlayers.includes(nickPlayer) &&
                        !allObservers.includes(nickPlayer) ?
                        <button onClick={() => {
                            joinPlayer(nickPlayer)
                            addPlayerNick(nickPlayer)
                            setNickPlayer("")
                        }}
                            className="button is-info is-rounded is-size-5"
                        >
                            SINGLE
                    </button> : <button className="button is-info is-rounded is-size-5">This nick exist</button>}
                    {!allPlayersDouble.includes(nickPlayer) &&
                        !allObserversDouble.includes(nickPlayer) ?
                        <button onClick={() => {
                            joinPlayerDouble(nickPlayer)
                            addPlayerNickDouble(nickPlayer)
                            setNickPlayer("")
                        }}
                            className="button is-danger is-rounded is-size-5"
                        >
                            DOUBLE
                    </button> : <button className="button is-danger is-rounded is-size-5">This nick exist</button>}
                </div>

                <div className="gamerooms ">
                    <div className="single has-background-grey-lighter">
                        <div className="singlerooms">
                            <h2 className="title has-text-grey-dark is-size-2">Single</h2>
                            {single}
                        </div>

                    </div>
                    <div className="double has-background-grey-lighter">
                        <div className="doublerooms">
                            <h2 className="title has-text-grey-dark is-size-2">Double</h2>
                            {double}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

const mapStateToProps = (state) => {
    return {
        rooms: rooms(state),
        nickGamer: state.game.playerNick,
        nickGamerDouble: state.doubleGame.playerNick,
        doubleRooms: doubleRooms(state),
        allObservers: allObservers(state),
        allPlayers: allPlayers(state),
        allObserversDouble: allObserversDouble(state),
        allPlayersDouble: allPlayersDouble(state)
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        getRooms: () => dispatch(getRooms()),
        joinPlayer: (payload) => dispatch(postJoinPlayerToSingleGame(payload)),
        joinObserver: (payload, id) => dispatch(postJoinObserverToSingleRoom(payload, id)),
        addPlayerNick: (payload) => dispatch(addPlayerNick(payload)),
        addObserverNick: (payload) => dispatch(addObserverNick(payload)),

        getRoomsDouble: () => dispatch(getDoubleRooms()),
        joinPlayerDouble: (payload) => dispatch(postJoinPlayerToDoubleGame(payload)),
        joinObserverDouble: (payload, id) => dispatch(postJoinObserverToDoubleRoom(payload, id)),
        addPlayerNickDouble: (payload) => dispatch(addPlayerNickDouble(payload)),
        addObserverNickDouble: (payload) => dispatch(addObserverNickDouble(payload))

    }
};

export default connect(mapStateToProps, mapDispatchToProps)(Rooms);
