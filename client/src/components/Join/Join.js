import React, { useState } from "react";
import { Link } from "react-router-dom";
import './Join.css'

function Join() {

    const [name, setName] = useState('');
    const [room, setRoom] = useState('');

    return (
        <div className="joinOuterContainer">
            <div className="joinInnerContainer">
                <h1 className="heading">Join</h1>
                <div> <input placeholder="Name" className="joinInput" type="text" onChange={(Event) => setName(Event.target.value)} /> </div>
                <div> <input placeholder="Room" className="joinInput mt-20" type="text" onChange={(Event) => setRoom(Event.target.value)} /> </div>
                <Link onClick={Event => (!name || !room) ? Event.preventDefault() : null} to={`/chat?name=${name}&room=${room}`}>
                    <button className="button mt-20" type="submit">Sign In</button>
                </Link>
            </div>
        </div>
    );
};

export default Join;
