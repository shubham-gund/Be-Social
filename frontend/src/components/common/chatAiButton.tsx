import React from "react";
import { useNavigate } from "react-router-dom";
import { Bot } from "lucide-react";

const ChatAiButton: React.FC = () => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/chat");
  };

  return (
    <div
      className="fixed right-5 bottom-16 sm:hidden cursor-pointer p-3 rounded-full shadow-md shadow-gray-600 bg-gradient-to-tl from-blue-400 via-purple-500 to-pink-500 animate-gradient-move
      hover:scale-110 hover:rotate-6 transition-all duration-300 ease-in-out transform-gpu"
      onClick={handleClick}
      aria-label="Open Chat"
    >
      <div className="relative">
        <div
          className="absolute inset-0 rounded-full blur-xl opacity-80 bg-gradient-to-r from-yellow-600 via-purple-800 to-pink-600"
        ></div>
        <Bot size={30} color="white" className="relative z-10 animate-pulse" />
      </div>
    </div>
  );
};

export default ChatAiButton;
