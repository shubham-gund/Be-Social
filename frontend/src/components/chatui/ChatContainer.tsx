import { useChatStore } from "../../store/useChatStore";
import { useEffect, useRef } from "react";
import ChatHeader from "../chatui/ChatHeader";
import MessageInput from "../chatui/MessageInput";
import MessageSkeleton from "../skeleton/MessageSkeleton";
import { useAuthStore } from "../../store/useAuthStore";
import { formatMessageTime } from "../../lib/utils";
import { Message } from "../../types";

const ChatContainer: React.FC = () => {
  const {
    messages,
    getMessages,
    isMessagesLoading,
    selectedUser,
    subscribeToMessages,
    unsubscribeFromMessages,
  } = useChatStore();

  const { authUser } = useAuthStore();

  // Explicitly type the ref
  const messageEndRef = useRef<HTMLDivElement>(null);

  // First effect for fetching and subscribing to messages
  useEffect(() => {
    if (selectedUser?._id) {
      getMessages(selectedUser._id);
      subscribeToMessages();
    }
    return () => unsubscribeFromMessages();
  }, [selectedUser?._id, getMessages, subscribeToMessages, unsubscribeFromMessages]);

  // Second effect for scrolling to bottom
  useEffect(() => {
    if (messageEndRef.current && messages.length) {
      messageEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  // Loading state
  if (isMessagesLoading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen">
        <MessageSkeleton />
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full">  
      <ChatHeader/>
      
      <div className="flex-grow overflow-y-auto p-4 space-y-2 w-full">
        {messages.map((message:Message) => (
          <div 
            key={message._id} 
            className={`flex ${message.senderId === authUser?._id ? 'justify-end' : 'justify-start'}`}
          >
            <div 
              className={`max-w-[70%] p-2 rounded-lg  break-words overflow-hidden ${
                message.senderId === authUser?._id 
                  ? 'bg-blue-500 text-white' 
                  : 'bg-gray-200 text-black'
              }`}
            >
              <div className="flex w-full">
                {message.text && <div className="px-2">{message.text}</div>}
                <div className="text-xs opacity-70 text-right">
                  {formatMessageTime(message.createdAt)}
                </div>
              </div>
            </div>
          </div>
        ))}
        <div ref={messageEndRef} />
      </div>
      
      <MessageInput />
    </div>
  );
};

export default ChatContainer;