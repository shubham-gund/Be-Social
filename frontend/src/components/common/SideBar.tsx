import { FC, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { MdHomeFilled } from "react-icons/md";
import { IoNotifications } from "react-icons/io5";
import { FaUser } from "react-icons/fa";
import { BiLogOut } from "react-icons/bi";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import XSvg from "../svgs/Logo";
import { useLocation } from 'react-router-dom'; 
import { BadgePlus, Bot, MessagesSquare } from "lucide-react";

interface AuthUser {
  fullName: string;
  username: string;
  profileImg: string;
}

const Sidebar: FC = () => {
  const queryClient = useQueryClient();
  const [showNavbar, setShowNavbar] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  const handleScroll = () => {
    if (typeof window !== "undefined") {
      if (window.scrollY > lastScrollY) {
        // Scrolling down
        setShowNavbar(false);
      } else {
        // Scrolling up
        setShowNavbar(true);
      }
      setLastScrollY(window.scrollY);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [lastScrollY]);

  const { mutate: logout } = useMutation({
    mutationFn: async () => {
      const res = await fetch("https://socialmedia-backend-production-5eb9.up.railway.app/api/auth/logout", {
        method: "POST",
        credentials: "include",
      });
      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || "Something went wrong");
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["authUser"] });
      localStorage.clear();
      document.documentElement.classList.add("dark");
    },
    onError: (error: Error) => {
      toast.error(error.message || "Logout failed");
    },
  });

  const { data: authUser } = useQuery<AuthUser | null>({
    queryKey: ["authUser"],
    queryFn: async () => {
      const res = await fetch("https://socialmedia-backend-production-5eb9.up.railway.app/api/auth/me", {
        headers: {
          Authorization: `${localStorage.getItem("token")}`,
        },
      });
      if (!res.ok) {
        return null;
      }
      const data: AuthUser = await res.json();
      return data;
    },
  });

   const location = useLocation(); 
  const isActive = (path:string) => location.pathname === path;

  return (
    <div className="md:w-64">
      {/* Sidebar layout for large screens */}
      <div className="hidden md:flex flex-col sticky top-0 left-0 h-screen border-r border-base-300 w-12 md:w-64 bg-base-100">
        <Link to="/" className="flex justify-center md:justify-start px-2 py-4" >
          <XSvg className='px-2 w-12 h-12 fill-base-content' />
        </Link>
        <ul className="flex flex-col gap-3 mt-4">
          <li className="flex justify-center md:justify-start">
            <Link
              to="/"
              className={`flex gap-3 items-center hover:bg-base-200 transition-all rounded-full duration-300 py-2 pl-2 pr-4 md:w-11/12 cursor-pointer text-base-content
              ${
                isActive('/') ? 'bg-base-200 border-r-4 border-blue-600' : 'text-base-content'
              }
              `}
            >
              <MdHomeFilled className="w-7 h-8" />
              <span className="text-lg hidden md:inline">Home</span>
            </Link>
          </li>
          <li className="flex justify-center md:justify-start">
            <Link
              to="/notifications"
              className={`flex gap-3 items-center hover:bg-base-200 transition-all rounded-full duration-300 py-2 pl-2 pr-4 md:w-11/12 cursor-pointer text-base-content
               ${
                isActive('/notifications') ? 'bg-base-200 border-r-4 border-blue-600' : 'text-base-content'
              }
              `}
            >
              <IoNotifications className="w-6 h-6" />
              <span className="text-lg hidden md:inline">Notifications</span>
            </Link>
          </li>
          <li className="flex justify-center md:justify-start">
            <Link
              to={`/create`}
              className={`flex gap-3 items-center hover:bg-base-200 transition-all rounded-full duration-300 py-2 pl-2 pr-4 md:w-11/12 cursor-pointer text-base-content  ${
                isActive(`/create`) ? 'bg-base-200 border-r-4 border-blue-600' : 'text-base-content'
              }
              `}
            >
              <BadgePlus className="w-6 h-6"/>
              <span className="text-lg hidden md:inline">Create</span>
            </Link>
          </li>
          <li className="flex justify-center md:justify-start">
            <Link
              to={`/profile/${authUser?.username}`}
              className={`flex gap-3 items-center hover:bg-base-200 transition-all rounded-full duration-300 py-2 pl-2 pr-4 md:w-11/12 cursor-pointer text-base-content  ${
                isActive(`/profile/${authUser?.username}`) ? 'bg-base-200 border-r-4 border-blue-600' : 'text-base-content'
              }
              `}
            >
              <FaUser className="w-6 h-6" />
              <span className="text-lg hidden md:inline">Profile</span>
            </Link>
          </li>
          <li className="flex justify-center md:justify-start">
            <Link
              to={`/chat`}
              className={`flex gap-3 items-center hover:bg-base-200 transition-all rounded-full duration-300 py-2 pl-2 pr-4 md:w-11/12 cursor-pointer text-base-content  ${
                isActive(`/chat`) ? 'bg-base-200 border-r-4 border-blue-600' : 'text-base-content'
              }
              `}
            >
              <Bot className="w-6 h-6"/>
              <span className="text-lg hidden md:inline">Chat with Ai</span>
            </Link>
          </li>
          <li className="flex justify-center md:justify-start">
            <Link
              to={`/message`}
              className={`flex gap-3 items-center hover:bg-base-200 transition-all rounded-full duration-300 py-2 pl-2 pr-4 md:w-11/12 cursor-pointer text-base-content  ${
                isActive(`/message`) ? 'bg-base-200 border-r-4 border-blue-600' : 'text-base-content'
              }
              `}
            >
              <MessagesSquare className="w-6 h-6"/>
              <span className="text-lg hidden md:inline">Messages</span>
            </Link>
          </li>
        </ul>
        {authUser && (
          <Link
            to={`/profile/${authUser.username}`}
            className="mt-auto mb-14 flex gap-2 items-start transition-all duration-300 hover:bg-base-200 py-2 px-4 rounded-full"
          >
            <div className="hidden md:inline-flex">
              <div className="w-9">
                <img className="rounded-full" src={authUser.profileImg || "/avatar-placeholder.png"} alt="Profile" />
              </div>
            </div>
            <div className="flex justify-between flex-1 md:flex">
              <div>
                <p className="text-base-content font-bold text-sm w-20 truncate">{authUser.fullName}</p>
                <p className="text-base-content/70 w-20 truncate text-xs">@{authUser.username}</p>
              </div>
              <BiLogOut
                className="w-6 h-6 cursor-pointer text-base-content"
                onClick={(e) => {
                  e.preventDefault();
                  logout();
                  toast.error("Double click to Logout");
                }}
              />
            </div>
          </Link>
        )}
      </div>

      {/* Bottom navigation for small screens */}
      <div className={`md:hidden fixed bottom-0 left-0 right-0 z-10 flex justify-between bg-base-100 border-t border-base-300 py-2 transition-transform duration-300 ${showNavbar ? 'translate-y-0' : 'translate-y-full'}`}>
        <Link to="/" className="flex-1 flex justify-center items-center rounded-full hover:bg-base-200">
          <MdHomeFilled className={`w-7 h-7  ${
                isActive(`/`) ? 'text-blue-500' : 'text-base-content'
              }
              `} />
        </Link>
        <Link to="/notifications" className="flex-1 flex justify-center items-center rounded-full hover:bg-base-200">
          <IoNotifications className={`w-6 h-6 ${
                isActive(`/notifications`) ? 'text-blue-500' : ''
              }
              `}  />
        </Link>
        <Link to="/create" className="flex-1 flex justify-center items-center rounded-full hover:bg-base-200">
          <BadgePlus className={`w-6 h-6 ${
                isActive(`/create`) ? 'text-blue-500' : ''
              }
              `}  />
        </Link>
        <Link to={`/profile/${authUser?.username}`} className="flex-1 flex justify-center items-center rounded-full hover:bg-base-200">
          <FaUser className={`w-6 h-6  ${
                isActive(`/profile/${authUser?.username}`) ? 'text-blue-500' : 'text-base-content'
              }
              `} />
        </Link>
        <Link
              to={`/message`}
              className={`flex-1 flex justify-center items-center hover:bg-base-200 transition-all rounded-full duration-300 py-2 md:w-11/12 cursor-pointer text-base-content
              `}
            >
              <MessagesSquare className={`w-7 h-6   ${
                isActive(`/message`) ? 'text-blue-500' : 'text-base-content'
              }`}/>
              <span className="text-lg hidden md:inline">Messages</span>
        </Link>
        <button
          className="flex-1 flex justify-center items-center"
          onClick={(e) => {
            e.preventDefault();
            logout();
          }}
        >
          <BiLogOut className="w-7 h-7  text-red-400" />
        </button>
      </div>
    </div>
  );
};

export default Sidebar;