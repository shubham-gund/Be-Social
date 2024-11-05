import { FC, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { MdHomeFilled } from "react-icons/md";
import { IoNotifications } from "react-icons/io5";
import { FaUser } from "react-icons/fa";
import { BiLogOut } from "react-icons/bi";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import XSvg from "../svgs/Logo";

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
    },
    onError: (error: Error) => {
      toast.error(error.message || "Logout failed");
    },
  });

  const { data: authUser } = useQuery<AuthUser | null>( {
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

  return (
    <div className="md:flex-[2_2_0]">
      {/* Sidebar layout for large screens */}
      <div className="hidden md:flex flex-col sticky top-0 left-0 h-screen border-r border-gray-700 w-12 md:w-full">
        <Link to="/" className="flex justify-center md:justify-start">
          {/* Replace with your logo */}
          <XSvg className='px-2 w-12 h-12 fill-white hover:bg-stone-900' />
        </Link>
        <ul className="flex flex-col gap-3 mt-4">
          <li className="flex justify-center md:justify-start">
            <Link
              to="/"
              className="flex gap-3 items-center hover:bg-stone-900 transition-all rounded-full duration-300 py-2 pl-2 pr-4 md:max-w-full cursor-pointer"
            >
              <MdHomeFilled className="w-8 h-8" />
              <span className="text-lg hidden md:inline">Home</span>
            </Link>
          </li>
          <li className="flex justify-center md:justify-start">
            <Link
              to="/notifications"
              className="flex gap-3 items-center hover:bg-stone-900 transition-all rounded-full duration-300 py-2 pl-2 pr-4 md:max-w-full cursor-pointer"
            >
              <IoNotifications className="w-6 h-6" />
              <span className="text-lg hidden md:inline">Notifications</span>
            </Link>
          </li>
          <li className="flex justify-center md:justify-start">
            <Link
              to={`/profile/${authUser?.username}`}
              className="flex gap-3 items-center hover:bg-stone-900 transition-all rounded-full duration-300 py-2 pl-2 pr-4 md:max-w-full cursor-pointer"
            >
              <FaUser className="w-6 h-6" />
              <span className="text-lg hidden md:inline">Profile</span>
            </Link>
          </li>
        </ul>
        {authUser && (
          <Link
            to={`/profile/${authUser.username}`}
            className="mt-auto mb-14 flex gap-2 items-start transition-all duration-300 hover:bg-stone-900 py-2 px-4 rounded-full"
          >
            <div className="hidden md:inline-flex">
              <div className="w-9">
                <img className="rounded-full" src={authUser.profileImg || "/avatar-placeholder.png"} alt="Profile" />
              </div>
            </div>
            <div className="flex justify-between flex-1 hidden md:flex">
              <div>
                <p className="text-white font-bold text-sm w-20 truncate">{authUser.fullName}</p>
                <p className="text-slate-500 w-20 truncate text-xs">@{authUser.username}</p>
              </div>
              <BiLogOut
                className="w-6 h-6 cursor-pointer"
                onClick={(e) => {
                  e.preventDefault();
                  logout();
                }}
              />
            </div>
          </Link>
        )}
      </div>

      {/* Bottom navigation for small screens */}
      <div className={`md:hidden fixed bottom-0 left-0 right-0 flex justify-between bg-slate-900 border-t border-gray-700 p-2 transition-transform duration-300 ${showNavbar ? 'translate-y-0' : 'translate-y-full'}`}>
        <Link to="/" className="flex-1 flex justify-center items-center">
          <MdHomeFilled className="w-7 h-7 text-white" />
        </Link>
        <Link to="/notifications" className="flex-1 flex justify-center items-center">
          <IoNotifications className="w-6 h-6 text-white" />
        </Link>
        <Link to={`/profile/${authUser?.username}`} className="flex-1 flex justify-center items-center">
          <FaUser className="w-6 h-6 text-white" />
        </Link>
        <button
          className="flex-1 flex justify-center items-center"
          onClick={(e) => {
            e.preventDefault();
            logout();
          }}
        >
          <BiLogOut className="w-6 h-6 text-white" />
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
