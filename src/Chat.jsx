import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';

const ChatRoom = () => {
  const [socket, setSocket] = useState(null);
  const [userId, setUserId] = useState('66365c6317cd2a0f65529082');
  const [targetUserId, setTargetUserId] = useState('663784188b83b504b972dbf1');
  const [message, setMessage] = useState('');
  const [chat, setChat] = useState([]);
  const [roomId, setRoomId] = useState(null);

  useEffect(() => {
    const newSocket = io('http://localhost:8000/events');
    setSocket(newSocket);

    return () => newSocket.close();
  }, []);

  useEffect(() => {
    if (socket) {
      socket.on('message', (data) => {
        setChat([...chat, data]);
      });

      socket.on('roomJoined', (roomId) => {
        console.log('Room Joined:', roomId);
        setRoomId(roomId);
      });
    }
  }, [socket, chat]);

  const handleJoinRoom = () => {
    if (socket && userId && targetUserId) {
      socket.emit('join', { userId, targetUserId });
    } else {
      console.log('Please provide user ID and target user ID');
    }
  };

  const handleMessageSend = () => {
    if (socket && message && roomId) {
      socket.emit('message', { roomId, message });
      setChat([...chat, { user: userId, message }]);
      setMessage('');
    } else {
      console.log('Please provide a message and make sure you have joined a room');
    }
  };

  const handleEndChat = () => {
    socket.emit('end', { roomId });
  }

  return (
    <div>
      <div>
        <input
          type="text"
          placeholder="Your User ID"
          value={userId}
          onChange={(e) => setUserId(e.target.value)}
        />
        <input
          type="text"
          placeholder="Target User ID"
          value={targetUserId}
          onChange={(e) => setTargetUserId(e.target.value)}
        />
        <button onClick={handleJoinRoom}>Join Room</button>
      </div>
      <div>
        <div style={{ height: '300px', overflowY: 'scroll' }}>
          {chat.map((entry, index) => (
            <div key={index}>
              <strong>{entry.user}:</strong> {entry.message}
            </div>
          ))}
        </div>
        <input
          type="text"
          placeholder="Type your message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        <button onClick={handleMessageSend}>Send</button>
        <button onClick={handleEndChat}>end</button>
      </div>
    </div>
  );
};

export default ChatRoom;
