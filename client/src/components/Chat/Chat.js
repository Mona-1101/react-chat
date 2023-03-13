import React, { useState, useEffect } from "react";
import queryString from "query-string";
import { io } from "socket.io-client";
import { useLocation } from "react-router-dom";
import "./Chat.css";
import InfoBar from "../InfoBar/InfoBar";
import Input from "../Input/Input";
import Messages from "../Messages/Messages";
import TextContainer from "../TextContainer/TextContainer";
let socket;

const Chat = ({ location }) => {
    const [name, setName] = useState('');
    const [room, setRoom] = useState('');
    const [users, setUsers] = useState('');
    const [message, setMessage] = useState('');
    const [messages, setMessages] = useState([]);
    const handleQueryString = useLocation().search;
    const ENDPOINT = 'localhost:5000';
    //const location = useLocation();

    useEffect(() => {

        const { name, room } = queryString.parse(handleQueryString, { arrayFormat: 'bracket-separator', arrayFormatSeparator: '|' });
        socket = io.connect(ENDPOINT);

        setName(name);
        setRoom(room);

        //console.log(socket);

        socket.emit('join', { name, room }, () => {
        });

        return () => {
            socket.emit('disconnect');
            socket.off();
        }

    }, [ENDPOINT, useLocation.search], [handleQueryString, name, room, location]);

    useEffect(() => {
        socket.on('message', (message) => {
            setMessages([...messages, message]);
        })
    }, [messages]);

    //function for sending messages

    const sendMessage = (event) => {

        event.preventDefault();

        if (message) {
            socket.emit('sendMessage', message, () => setMessage(''));
        }
    }

    console.log(message, messages);

    return (
        <div className="outerContainer">
            <div className="container">
                <InfoBar room={room} />
                <Messages messages={messages} name={name} />
                <Input message={message} setMessage={setMessage} sendMessage={sendMessage} />
            </div>
            <TextContainer
                users={users}
            />
        </div>
    )
};

export default Chat;
