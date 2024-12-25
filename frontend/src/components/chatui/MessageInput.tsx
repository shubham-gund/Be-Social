import { useState } from "react";
import { useChatStore } from "../../store/useChatStore";
import { Send } from "lucide-react";

const MessageInput = () => {
  const [text, setText] = useState("");
  const { sendMessage } = useChatStore();

  const handleSendMessage = async (e:any) => {
    e.preventDefault();
    if (!text.trim()) return;

    try {
      await sendMessage({
        text: text.trim(),
      });

      setText("");
    } catch (error) {
      console.error("Failed to send message:", error);
    }
  };

  return (
    <div className="mb-16 md:mb-4 px-4 w-full bg-transparent mt-1 md:mt-2">

      <form onSubmit={handleSendMessage} className="flex items-center gap-2">
        <div className="flex-1 flex gap-2">
          <input
            type="text"
            className="w-full h-10 input input-bordered rounded-full input-sm sm:input-md bg-base-200"
            placeholder="Type a message..."
            value={text}
            onChange={(e) => setText(e.target.value)}
          />
        </div>
        <button
          type="submit"
          className="btn btn-circle "
          disabled={!text.trim()}
        >
          <Send size={22} />
        </button>
      </form>
    </div>
  );
};
export default MessageInput;