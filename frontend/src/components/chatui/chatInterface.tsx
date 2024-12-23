import React, { useEffect, useRef, useState } from 'react';
import axios from 'axios';
import { Send, Bot } from 'lucide-react';

interface ChatMessage {
  role: 'user' | 'assistant';
  content: string;
}

const ChatInterface: React.FC = () => {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(scrollToBottom, [messages]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMessage: ChatMessage = { role: 'user', content: input };
    setMessages(prevMessages => [...prevMessages, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      const response = await axios.post<{ message: string }>(
        'https://socialmedia-backend-production-5eb9.up.railway.app/api/chat',
        { messages: [...messages, userMessage] },
        {
          headers: {
            Authorization: `${localStorage.getItem("token")}`,
            'Content-Type': 'application/json',
          },
          withCredentials: true,
        }
      );

      setMessages((prevMessages) => [
        ...prevMessages,
        { role: 'assistant', content: response.data.message },
      ]);
    } catch (error) {
      console.error('Error sending message:', error);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="flex flex-col h-screen border-e border-gray-700">
      {/* Top Bar */}
      <div className="sticky top-0 z-10 flex items-center px-4 py-2 bg-neutral border-b border-gray-700">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center">
            <Bot size={24} />
          </div>
          <div>
            <h2 className="font-semibold">AI Assistant</h2>
            <p className="text-sm text-base-content">
              {isLoading ? 'Typing...' : 'Online'}
            </p>
          </div>
        </div>
      </div>

      {/* Messages Area */}
      <div className="flex-grow overflow-y-auto p-4 space-y-4">
        {messages.map((message, index) => (
          <div
            key={index}
            className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div
              className={`max-w-xs md:max-w-md lg:max-w-lg xl:max-w-xl rounded-lg p-3 ${
                message.role === 'user'
                  ? 'bg-primary text-white'
                  : 'bg-gray-100 text-gray-800'
              }`}
            >
              {message.content}
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      {/* Input Area */}
      <div className="sticky bottom-10 md:bottom-2 bg-base-100 p-6 ">
        <form onSubmit={handleSubmit}>
          <div className="flex items-center space-x-2">
            <input
              type="text"
              value={input}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setInput(e.target.value)}
              placeholder="Type a message"
              className="flex-grow px-4 py-2 border bg-base-200 text-white rounded-full focus:outline-none focus:ring-2 focus:ring-primary"
              disabled={isLoading}
            />
            <button
              type="submit"
              disabled={isLoading}
              className="bg-primary text-white p-2 rounded-full hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-300"
            >
              <Send size={20} />
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ChatInterface;