import { useChatStore } from "../../store/useChatStore";

import Sidebar from "../../components/chatui/ChatSideBar";
import ChatContainer from "../../components/chatui/ChatContainer";

const HomePage = () => {
  const { selectedUser } = useChatStore();

  return (
    <div className="h-screen bg-base-200 w-full border-e border-gray-700">
      <div className="flex items-center justify-center">
        <div className="bg-base-100 shadow-cl w-full max-w-6xl h-screen">
            

            {!selectedUser ? <Sidebar /> : <ChatContainer />}
       
        </div>
      </div>
    </div>
  );
};
export default HomePage;