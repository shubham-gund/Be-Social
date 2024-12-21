import { useChatStore } from "../../store/useChatStore";

import Sidebar from "../../components/chatui/ChatSideBar";
import ChatContainer from "../../components/chatui/ChatContainer";

const HomePage = () => {
  const { selectedUser } = useChatStore();

  return (
    <div className="h-screen bg-base-200 w-full">
      <div className="flex items-center justify-center pt-10 px-4">
        <div className="bg-base-100 rounded-lg shadow-cl w-full max-w-6xl h-[calc(100vh-8rem)]">
            

            {!selectedUser ? <Sidebar /> : <ChatContainer />}
       
        </div>
      </div>
    </div>
  );
};
export default HomePage;