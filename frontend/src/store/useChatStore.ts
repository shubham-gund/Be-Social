// useChatStore.ts
import { create } from "zustand";
import toast from "react-hot-toast";
import { useAuthStore } from "./useAuthStore";
import { User, Message } from "../types";
import axios from "axios";

interface MessageData {
  text: string;
}

interface ChatState {
  messages: Message[];
  users: User[];
  selectedUser: User | null;
  isUsersLoading: boolean;
  isMessagesLoading: boolean;
  getUsers: () => Promise<void>;
  getMessages: (userId: string) => Promise<void>;
  sendMessage: (messageData: MessageData) => Promise<void>;
  subscribeToMessages: () => void;
  unsubscribeFromMessages: () => void;
  setSelectedUser: (selectedUser: User | null) => void;
}

export const useChatStore = create<ChatState>((set, get) => ({
  messages: [],
  users: [],
  selectedUser: null,
  isUsersLoading: false,
  isMessagesLoading: false,

  getUsers: async () => {
    set({ isUsersLoading: true });
    try {
      const res = await axios.get<User[]>(
        "https://socialmedia-backend-production-5eb9.up.railway.app/api/messages/users",
        {
          withCredentials: true,
          headers: {
            Authorization: `${localStorage.getItem("token")}`,
          }
        }
      );
      set({ users: res.data });
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Failed to fetch users");
    } finally {
      set({ isUsersLoading: false });
    }
  },

  getMessages: async (userId) => {
    set({ isMessagesLoading: true });
    try {
      const res = await axios.get<Message[]>(
        `https://socialmedia-backend-production-5eb9.up.railway.app/api/messages/${userId}`,
        {
          withCredentials: true,
          headers: {
            Authorization: `${localStorage.getItem("token")}`,
          }
        }
      );
      set({ messages: res.data });
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Failed to fetch messages");
    } finally {
      set({ isMessagesLoading: false });
    }
  },

  sendMessage: async (messageData) => {
    const { selectedUser, messages } = get();
    if (!selectedUser) {
      toast.error("No user selected");
      return;
    }

    try {
      const res = await axios.post<Message>(
        `https://socialmedia-backend-production-5eb9.up.railway.app/api/messages/send/${selectedUser._id}`,
        messageData,
        {
          withCredentials: true,
          headers: {
            Authorization: `${localStorage.getItem("token")}`,
          }
        }
      );
      
      const socket = useAuthStore.getState().socket;
      if (socket) {
        socket.emit("sendMessage", {
          ...res.data,
          receiverId: selectedUser._id
        });
      }
      
      set({ messages: [...messages, res.data] });
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Failed to send message");
    }
  },

  subscribeToMessages: () => {
    const socket = useAuthStore.getState().socket;
    if (!socket) return;

    socket.on("newMessage", (newMessage: Message) => {
      const { selectedUser, messages } = get();
      
      if (selectedUser && 
          (newMessage.senderId === selectedUser._id || 
           newMessage.receiverId === selectedUser._id)) {
        set({ messages: [...messages, newMessage] });
      }
    });
  },

  unsubscribeFromMessages: () => {
    const socket = useAuthStore.getState().socket;
    if (socket) {
      socket.off("newMessage");
    }
  },

  setSelectedUser: (selectedUser) => set({ selectedUser }),
}));