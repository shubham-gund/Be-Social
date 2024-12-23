import { useEffect, useState } from "react";
import { useChatStore } from "../../store/useChatStore";
import { useAuthStore } from "../../store/useAuthStore";
import ChatSidebarSkeleton from "../skeleton/ChatSidebarSkeleton";
import { User } from "../../types";
import  XSvg  from "../svgs/Logo"
const Sidebar: React.FC = () => {
  const {
    getUsers,
    users,
    selectedUser,
    setSelectedUser,
    isUsersLoading
  } = useChatStore();
  
  const { onlineUsers } = useAuthStore();
  const [showOnlineOnly, setShowOnlineOnly] = useState<boolean>(false);
  const [searchQuery, setSearchQuery] = useState<string>("");

  useEffect(() => {
    getUsers();
  }, [getUsers]);

  const filteredUsers = users
    .filter((user: User) => 
      (showOnlineOnly ? onlineUsers.includes(user._id) : true) &&
      user.fullName.toLowerCase().includes(searchQuery.toLowerCase())
    );

  if (isUsersLoading) return <ChatSidebarSkeleton />;

  return (
    <div className="h-full w-full flex flex-col rounded-xl">
      <div className="flex">
        <XSvg className="md:hidden px-2 w-12 h-12 fill-base-content hover:bg-base-200 mt-3 ml-4" />
        {/* Search Bar */}
        <div className="px-4 bg-base-100 rounded-xl pt-4 w-full">
          <div className="relative">
            <input
              type="text"
              placeholder="Search or start new chat"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full p-2 pl-4 rounded-full bg-base-200 
                      text-sm border border-gray-200 focus:outline-none
                      focus:border-emerald-500"
            />
          </div>
        </div>
      </div>

      {/* Online Filter */}
      <div className="px-4 py-4 border-b border-gray-500">
        <label className="flex items-center gap-2 text-sm text-gray-600">
          <input
            type="checkbox"
            checked={showOnlineOnly}
            onChange={(e) => setShowOnlineOnly(e.target.checked)}
            className="checkbox checkbox-sm checkbox-success"
          />
          <span>Online only ({onlineUsers.length - 1} active)</span>
        </label>
      </div>

      {/* Chat List */}
      <div className="flex-1 overflow-y-auto">
        {filteredUsers.map((user: User) => (
          <button
            key={user._id}
            onClick={() => setSelectedUser(user)}
            className={`w-full p-3 flex items-center gap-4 border-b border-gray-500
                     hover:bg-base-200 transition-colors
                     ${selectedUser?._id === user._id ? "bg-gray-50" : ""}`}
          >
            <div className="relative">
              <img
                src={user.profileImg || "/avatar-placeholder.png"}
                alt={user.fullName}
                className="size-12 object-cover rounded-full"
              />
              {onlineUsers.includes(user._id) && (
                <span className="absolute bottom-0 right-0 size-3 
                               bg-emerald-500 rounded-full 
                               ring-2 ring-white" />
              )}
            </div>

            <div className="flex-1 min-w-0">
              <div className="flex justify-between items-baseline">
                <div className="">
                  <div className="flex justify-start font-medium truncate ">{user.username}</div>
                  <div className="flex justify-start font-medium truncate text-base-300">{user.fullName}</div>
                </div>
                <div className="text-sm text-gray-500 truncate">
                {onlineUsers.includes(user._id) 
                  ? "Online" 
                  : "Offline"}
              </div>
              </div>
              
            </div>
          </button>
        ))}

        {filteredUsers.length === 0 && (
          <div className="text-center text-gray-500 py-8">
            No chats found
          </div>
        )}
      </div>
    </div>
  );
};

export default Sidebar;