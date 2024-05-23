import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';

const Chat = () => {
    const [userId, setUserId] = useState('664f35d7901e869a2a8b7725');
    const [targetUserId, setTargetUserId] = useState('664b1a7e2e1ed2385c6d6bed');
    const [roomId, setRoomId] = useState('');
    const [rooms, setRooms] = useState([]);
    const [error, setError] = useState('');
    const [messages, setMessages] = useState([]);
    const [message, setMessage] = useState('');

    const socket = io('http://localhost:8000/chat');

    // useEffect(() => {
    //     // Listen for message events from the server
    //     socket.on('message', (data) => {
    //         setMessages((prevMessages) => [...prevMessages, data]);
    //     });

    //     // Fetch existing rooms when component mounts

    //     return () => {
    //         // Cleanup event listeners when component unmounts
    //         socket.off('message');
    //     };
    // }, []);

    // const fetchRooms = () => {
    //     // Request existing rooms from the server
    //     socket.emit('getRooms', null, (data) => {
    //         console.log(data)
    //         setRooms(data);
    //     });
    // };
    const type = 'student'
    const handleCreateRoom = () => {
        // Emit createRoom event to the server
        socket.emit('createRoom', { userId, targetUserId, type }, (data) => {
            if (data.error) {
                setError(data.error);
            } else {
                setRoomId(data.roomId);
                setError('');
            }
        });
    };

    // const handleJoinRoom = (roomId) => {
    //     // Emit joinRoom event to the server
    //     socket.emit('joinRoom', { roomId, userId }, (success) => {
    //         if (success) {
    //             setRoomId(roomId);
    //             setError('');
    //         } else {
    //             setError('Failed to join room');
    //         }
    //     });
    // };

    // const handleMessageSend = () => {
    //     // Emit sendMessage event to the server
    //     socket.emit('sendMessage', { roomId, userId, message });
    //     setMessage('');
    // };

    console.log(rooms)

    return (
        <div>
            <h2>Create or Join Room</h2>
            <div>
                <label>User ID:</label>
                <input type="text" value={userId} onChange={(e) => setUserId(e.target.value)} />
            </div>
            <div>
                <label>Target User ID:</label>
                <input type="text" value={targetUserId} onChange={(e) => setTargetUserId(e.target.value)} />
            </div>
            <button onClick={() => handleCreateRoom()}>Create Room</button>
            {/* <div>
                <h3>Existing Rooms</h3>
                <ul>
                    {rooms?.map((room) => (
                        <li key={room}>{room} <button onClick={() => handleJoinRoom(room)}>Join</button></li>
                    ))}
                </ul>
            </div>
            <div>
                <h2>Messages</h2>
                <div>
                    {messages.map((msg, index) => (
                        <div key={index}>{msg}</div>
                    ))}
                </div>
                <div>
                    <input type="text" value={message} onChange={(e) => setMessage(e.target.value)} />
                    <button onClick={handleMessageSend}>Send</button>
                </div>
            </div> */}
            {error && <p>Error: {error}</p>}
        </div>
    );
};

export default Chat;
