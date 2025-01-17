import { Navigate, Route, Routes } from "react-router-dom";
import { useState, useEffect } from "react";
import { Socket } from "socket.io-client";
import { useQuery } from "@tanstack/react-query";
import { Toaster } from "react-hot-toast";

import HomePage from "./pages/home/HomePage";
import SignUpPage from "./pages/auth/signup/SignUpPage";
import LoginPage from "./pages/auth/login/LoginPage";
import Sidebar from "./components/common/SideBar";
import RightPanel from "./components/common/RightPanel";
import NotificationPage from "./pages/notification/NotificationPage";
import ProfilePage from "./pages/profile/ProfilePage";
import LoadingSpinner from "./components/common/LoadingSpinner";
import ChatPage from "./pages/chat/chatPage";
import CreatePost from "./pages/home/CreatePost";
import MessagePage from "./pages/message/MessagePage";
import LandingPage from "./pages/landing/LandingPage";

// Create a context for socket to be used across the app
import React from "react";
import { useAuthStore } from "./store/useAuthStore";
export const SocketContext = React.createContext<Socket | null>(null);

function App() {
  const [socket,] = useState<Socket | null>(null);

  const { data: authUser, isLoading } = useQuery({
    queryKey: ["authUser"],
    queryFn: async () => {
      try {
        const res = await fetch("https://socialmedia-backend-production-5eb9.up.railway.app/api/auth/me", {
          headers: {
            Authorization: `${localStorage.getItem("token")}`,
          },
        });
        const data = await res.json();
        if (!res.ok) {
          throw new Error(data.message || "Something went wrong");
        }
        return data;
      } catch (error: any) {
        throw new Error(error);
      }
    },
    retry: false,
  });

  const { checkAuth, onlineUsers } = useAuthStore();

  console.log({ onlineUsers });

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  console.log({ authUser });

  if (isLoading) {
    return (
      <div className="h-screen flex justify-center items-center">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  return (
    <SocketContext.Provider value={socket}>
      <div className={`${authUser ? 'max-w-6xl' : 'w-full'} flex justify-center mx-auto sm:w-full`}>
        {/* common component */}
        {authUser && <Sidebar />}
        <Routes>
        <Route
            path="/feed"
            element={authUser ? <HomePage /> : <Navigate to="/login" />}
          />
          <Route
            path="/"
            element={!authUser ? <LandingPage /> : <Navigate to="/feed" />}
          />
          <Route
            path="/login"
            element={!authUser ? <LoginPage /> : <Navigate to="/feed" />}
          />
          <Route
            path="/signup"
            element={!authUser ? <SignUpPage /> : <Navigate to="/feed" />}
          />
          <Route
            path="/notifications"
            element={
              authUser ? <NotificationPage /> : <Navigate to="/login" />
            }
          />
          <Route
            path="/profile/:username"
            element={
              authUser ? <ProfilePage /> : <Navigate to="/login" />
            }
          />
          <Route
            path="/chat"
            element={authUser ? <ChatPage /> : <Navigate to="/login" />}
          />
          <Route
            path="/message"
            element={authUser ? <MessagePage /> : <Navigate to="/login" />}
          />
          <Route
            path="/create"
            element={authUser ? <CreatePost /> : <Navigate to="/login" />}
          />
        </Routes>
        {authUser && <RightPanel />}
        <Toaster />
      </div>
    </SocketContext.Provider>
  );
}

export default App;