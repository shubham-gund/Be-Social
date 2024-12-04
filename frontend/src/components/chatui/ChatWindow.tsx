import React, { useState } from 'react';
import { User, Message } from '../../types';
import { useSendMessage } from '../../hooks/useMessages';

interface ChatWindowProps {
  selectedUser: User | null;
  messages: Message[];
}

const ChatWindow: React.FC<ChatWindowProps> = ({ selectedUser, messages }) => {
  const [newMessage, setNewMessage] = useState('');
  const sendMessageMutation = useSendMessage();

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedUser && newMessage.trim()) {
      sendMessageMutation.mutate({ receiverId: selectedUser._id, text: newMessage });
      setNewMessage('');
    }
  };

  return (
    <div className="w-3/4 p-4">
      {selectedUser ? (
        <>
          <h2 className="text-xl font-bold mb-4">Chat with {selectedUser.username}</h2>
          <div className="h-96 overflow-y-auto mb-4 border rounded p-2">
            {messages.map((message) => (
              <div
                key={message._id}
                className={`mb-2 ${
                  message.senderId === selectedUser._id ? 'text-left' : 'text-right'
                }`}
              >
                <span className="bg-base-300 rounded px-2 py-1 inline-block">
                  {message.text}
                </span>
              </div>
            ))}
          </div>
          <form onSubmit={handleSendMessage} className="flex">
            <input
              type="text"
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              className="flex-grow bg-neutral border rounded-full px-5 mr-2 py-1"
              placeholder="Type a message..."
            />
            <button
              type="submit"
              className="bg-blue-500 text-white px-4 py-1 rounded-full"
            >
              Send
            </button>
          </form>
        </>
      ) : (
        <p>Select a user to start chatting</p>
      )}
    </div>
  );
};

export default ChatWindow;

