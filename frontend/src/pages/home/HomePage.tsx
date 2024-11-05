import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import Posts from "../../components/common/Posts.jsx";
import CreatePost from "./CreatePost";
import { Search } from "lucide-react";
import { UserType } from "../../types.js";
type FeedType = "forYou" | "following";



interface TabProps {
  label: string;
  isActive: boolean;
  onClick: () => void;
}


const FeedTab = ({ label, isActive, onClick }: TabProps) => (
  <div
    className="flex justify-center flex-1 p-3 hover:bg-secondary transition duration-300 cursor-pointer relative"
    onClick={onClick}
  >
    {label}
    {isActive && (
      <div className="absolute bottom-0 w-10 h-1 rounded-full bg-primary" />
    )}
  </div>
);

const FeedTabs = ({ activeTab, onTabChange }: { activeTab: FeedType; onTabChange: (tab: FeedType) => void }) => (
  <div className="flex w-full border-b border-gray-700">
    <FeedTab
      label="For you"
      isActive={activeTab === "forYou"}
      onClick={() => onTabChange("forYou")}
    />
    <FeedTab
      label="Following"
      isActive={activeTab === "following"}
      onClick={() => onTabChange("following")}
    />
  </div>
);
const SearchBar = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [users, setUsers] = useState<UserType[]>([]);
  const [showDropdown, setShowDropdown] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setShowDropdown(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    const searchUsers = async () => {
      if (searchQuery.trim().length === 0) {
        setUsers([]);
        return;
      }

      setIsLoading(true);
      try {
        const response = await fetch(
          `https://socialmedia-backend-production-5eb9.up.railway.app/api/users/search?username=${encodeURIComponent(searchQuery)}`,
          {
            method: "GET",
            credentials: 'include',
            headers: { Authorization: `${localStorage.getItem("token")}` }
          }
        );
        const data = await response.json();
        setUsers(data);
        setShowDropdown(true);
      } catch (error) {
        console.error("Error searching users:", error);
      } finally {
        setIsLoading(false);
      }
    };

    const debounceTimer = setTimeout(searchUsers, 300);
    return () => clearTimeout(debounceTimer);
  }, [searchQuery]);

  return (
    <div className="relative w-full px-4 py-2 border-b border-gray-700">
      <div className="relative">
        <input
          type="text"
          placeholder="Search users..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full px-10 py-2 bg-gray-800 rounded-full border border-gray-700 focus:outline-none focus:border-primary transition duration-300"
        />
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
      </div>

      {showDropdown && searchQuery && (
        <div 
          ref={dropdownRef}
          className="absolute left-4 right-4 mt-2 max-h-96 overflow-y-auto bg-gray-800 rounded-lg border border-gray-700 shadow-lg z-50"
        >
          {isLoading ? (
            <div className="p-4 text-center text-gray-400">Searching...</div>
          ) : users.length > 0 ? (
            users.map((user) => (
              <Link
                key={user._id}
                to={`/profile/${user.username}`}
                className="flex items-center gap-3 p-3 hover:bg-gray-700 cursor-pointer transition duration-300"
                onClick={() => {
                  setShowDropdown(false);
                  setSearchQuery("");
                }}
              >
                <img
                  src={user.profileImg || "/avatar-placeholder.png"}
                  alt={user.username}
                  className="w-10 h-10 rounded-full object-cover"
                />
                <div>
                  <div className="font-medium">{user.fullName}</div>
                  <div className="text-sm text-gray-400">@{user.username}</div>
                </div>
              </Link>
            ))
          ) : (
            <div className="p-4 text-center text-gray-400">No users found</div>
          )}
        </div>
      )}
    </div>
  );
};

const HomePage = () => {
  const [feedType, setFeedType] = useState<FeedType>("forYou");

  return (
    <div className="flex-[4_4_0] mr-auto border-r border-gray-700 min-h-screen">
      <SearchBar />
      <FeedTabs activeTab={feedType} onTabChange={setFeedType} />
      <CreatePost />
      <Posts feedType={feedType} />
    </div>
  );
};

export default HomePage;