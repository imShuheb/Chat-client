import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';

const Chat = () => {
    const [socket, setSocket] = useState(null);
    const [message, setMessage] = useState('');
    const [messages, setMessages] = useState([]);
    const [roomId, setRoomId] = useState('');
    const [userId, setUserId] = useState('');
    const [roomUsers, setRoomUsers] = useState(0);

    useEffect(() => {
        const socket = io('http://localhost:8000/chat');

        socket.on('connect', () => {
            console.log('Connected to server');
        });

        socket.on('message', (message) => {
            setMessages((prevMessages) => [...prevMessages, message]);
        });

        setSocket(socket);

        return () => {
            socket.disconnect();
        };
    }, []);

    const getChat = () => {
        socket.emit('chatList', (data) => {
            console.log(data)
        })
    }

    const joinRoom = () => {
        if (socket && roomId && userId) {
            socket.emit('joinRoom', { roomId, userId }, (success) => {
                getRoomUsers();
                if (success) {
                    console.log('Joined room:', roomId);
                } else {
                    console.error('Failed to join room:', roomId);
                }
            });
        }
    };

    const getRoomUsers = () => {
        if (socket && roomId) {
            socket.emit('getRoomUsers', { roomId }, (usersCount) => {
                setRoomUsers(usersCount);
            });
        }
    };

    const sendMessage = () => {
        if (socket && message && roomId) {
            socket.emit('sendMessage', { roomId, userId, message });
            setMessage('');
        }
    };

    return (
        <div>
            <h1>Chat Application</h1>
            <div>
                <input
                    type="text"
                    placeholder="Room ID"
                    value={roomId}
                    onChange={(e) => setRoomId(e.target.value)}
                />
                <input
                    type="text"
                    placeholder="User ID"
                    value={userId}
                    onChange={(e) => setUserId(e.target.value)}
                />
                <button onClick={joinRoom}>Join Room</button>
            </div>
            <div>
                <input
                    type="text"
                    placeholder="Type your message"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                />
                <button onClick={sendMessage}>Send Message</button>
                <button onClick={getChat}>getList</button>
                <button onClick={getRoomUsers}>getRoomUsers</button>
            </div>
            <div>
                <h2>Room Information</h2>
                <p>Number of users in the room: {roomUsers}</p>
            </div>
            <div>
                <h2>Messages</h2>
                <ul>
                    {messages.map((msg, index) => (
                        <li key={index}>{msg.userId}: {msg.message}</li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default Chat;
