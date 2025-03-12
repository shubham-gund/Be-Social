import { useChatStore } from "../../store/useChatStore";
import { useEffect, useRef, useState } from "react";
import ChatHeader from "../chatui/ChatHeader";
import MessageInput from "../chatui/MessageInput";
import MessageSkeleton from "../skeleton/MessageSkeleton";
import { useAuthStore } from "../../store/useAuthStore";
import { formatMessageTime } from "../../lib/utils";
import { Message } from "../../types";
import { Bot, Loader2 } from "lucide-react";

interface MessageWithSuggestionLoading extends Message {
  isLoadingSuggestions?: boolean;
}

const ChatContainer: React.FC = () => {
  const {
    messages,
    getMessages,
    isMessagesLoading,
    selectedUser,
    subscribeToMessages,
    unsubscribeFromMessages,
    sendMessage,
    getAiSuggestions,
  } = useChatStore();

  const { authUser } = useAuthStore();
  const [loadingStates, setLoadingStates] = useState<Record<string, boolean>>({});

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

  const handleSuggestionClick = async (suggestion: string) => {
    try {
      await sendMessage({ text: suggestion });
    } catch (error) {
      console.error("Failed to send suggested message:", error);
    }
  };

  const handleGetSuggestions = async (messageId: string) => {
    setLoadingStates(prev => ({ ...prev, [messageId]: true }));
    try {
      const suggestions = await getAiSuggestions(messageId);
      // Update the message in the store with the new suggestions
      const updatedMessages = messages.map(msg => 
        msg._id === messageId ? { ...msg, aiSuggestions: suggestions } : msg
      );
      useChatStore.setState({ messages: updatedMessages });
    } catch (error) {
      console.error("Failed to get suggestions:", error);
    } finally {
      setLoadingStates(prev => ({ ...prev, [messageId]: false }));
    }
  };

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
        {messages.map((message: MessageWithSuggestionLoading) => (
          <div key={message._id} className="space-y-2">
            <div 
              className={`flex ${message.senderId === authUser?._id ? 'justify-end' : 'justify-start'}`}
            >
              <div 
                className={`max-w-[70%] p-2 rounded-lg break-words overflow-hidden ${
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

            {/* AI Suggestions section */}
            {message.senderId !== authUser?._id && (
              <div className="flex flex-col items-end space-y-2 pl-8">
                <div className="flex items-center gap-2 text-sm text-gray-500">
                  <Bot size={16} />
                  <span>AI Suggestions</span>
                  {!message.aiSuggestions && !loadingStates[message._id] && (
                    <button
                      onClick={() => handleGetSuggestions(message._id)}
                      className="text-primary hover:text-primary-focus text-xs underline"
                    >
                      Get suggestions
                    </button>
                  )}
                </div>
                
                {loadingStates[message._id] ? (
                  <div className="flex items-center gap-2">
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span className="text-sm text-gray-500">Loading suggestions...</span>
                  </div>
                ) : message.aiSuggestions && message.aiSuggestions.length > 0 ? (
                  <div className="flex flex-wrap gap-2 justify-end">
                    {message.aiSuggestions.map((suggestion, idx) => (
                      <button
                        key={idx}
                        onClick={() => handleSuggestionClick(suggestion)}
                        className="px-3 py-1.5 text-sm bg-base-200 hover:bg-base-300 rounded-full transition-colors"
                      >
                        {suggestion}
                      </button>
                    ))}
                  </div>
                ) : null}
              </div>
            )}
          </div>
        ))}
        <div ref={messageEndRef} />
      </div>
      
      <MessageInput />
    </div>
  );
};

export default ChatContainer;