import React, { useState, useEffect } from 'react';
import { io } from 'socket.io-client';

const socket = io('http://localhost:5000', { autoConnect: false });

const ChatApp = () => {
    const [username, setUsername] = useState('');
    const [message, setMessage] = useState('');
    const [messages, setMessages] = useState([]);
    const [isChatActive, setIsChatActive] = useState(false);
    const [room, setRoom] = useState('');

    useEffect(() => {
        if (isChatActive) {
            socket.connect();

            // Listen for chat messages
            socket.on('chat', (data) => {
                setMessages((prevMessages) => [...prevMessages, `${data.username}: ${data.message}`]);
            });

            return () => {
                socket.disconnect();
            };
        }
    }, [isChatActive]);

    const handleJoin = () => {
        setIsChatActive(true);
        socket.emit('join_room', { username, room });
    };

    const handleLeave = () => {
        setIsChatActive(false)
        socket.emit('leave_room', {username, room});
    };

    const handleSendMessage = (e) => {
        if (e.key === 'Enter') {
            socket.emit('new_message', { username, message, room });
            setMessage('');
        }
    };

    return (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', backgroundColor: '#e5e5e5' }}>
            {!isChatActive ? (
                <div id="landing" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', gap: '10px' }}>
                    <input
                        type="text"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        placeholder="Username"
                    />
                    <input
                        type="text"
                        value={room}
                        onChange={(e) => setRoom(e.target.value)}
                        placeholder="Room ID"
                    />
                    <button onClick={handleJoin}>JOIN</button>
                </div>
            ) : (
                <div id="chat" style={{ width: '50%' }}>
                <button onClick={handleLeave}>X</button>
                    <ul id="chat-messages" style={{ height: '500px', backgroundColor: 'white', overflowY: 'scroll' }}>
                        {messages.map((msg, index) => (
                            <li key={index} style={{ listStyle: 'none' }}>{msg}</li>
                        ))}
                    </ul>
                    <input
                        type="text"
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        onKeyUp={handleSendMessage}
                        placeholder="Enter a Message"
                        style={{ width: '99%' }}
                    />
                </div>
            )}
        </div>
    );
};

export default ChatApp;
