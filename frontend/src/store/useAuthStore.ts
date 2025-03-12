import { create } from 'zustand';
import axios from 'axios';
import toast from 'react-hot-toast';
import { io, Socket } from 'socket.io-client';


// Typed interfaces
interface AuthUser {
  _id: string;
  username: string;
  fullName: string;
  email: string;
  profilePic?: string;
  [key: string]: any;
}

interface SignupData {
  username: string;
  fullName: string;
  email: string;
  password: string;
}

interface LoginData {
  username: string;
  password: string;
}


// Store interface with precise types
interface AuthStore {
  authUser: AuthUser | null;
  isSigningUp: boolean;
  isLoggingIn: boolean;
  isCheckingAuth: boolean;
  onlineUsers: string[];
  socket: Socket | null;

  // Method signatures
  checkAuth: () => Promise<void>;
  signup: (data: SignupData) => Promise<void>;
  login: (data: LoginData) => Promise<void>;
  logout: () => Promise<void>;
  connectSocket: () => void;
  disconnectSocket: () => void;
}

// Utility function for error handling
const handleApiError = (error: unknown): string => {
  if (axios.isAxiosError(error)) {
    return error.response?.data?.message || 'An unexpected error occurred';
  }
  return 'An unexpected error occurred';
};

export const useAuthStore = create<AuthStore>((set, get) => ({
  authUser: null,
  isSigningUp: false,
  isLoggingIn: false,
  isUpdatingProfile: false,
  isCheckingAuth: true,
  onlineUsers: [],
  socket: null,

  checkAuth: async () => {
    try {
      const res = await axios.get<AuthUser>(`https://be-social-8uqb.onrender.com/api/auth/me`, {
        withCredentials: true,
        headers:{
          Authorization: `${localStorage.getItem("token")}` ,
        }
      });
      set({ 
        authUser: res.data,
        isCheckingAuth: false 
      });
      get().connectSocket();
    } catch (error) {
      set({ 
        authUser: null, 
        isCheckingAuth: false 
      });
      console.error('Authentication check failed:', error);
    }
  },

  signup: async (data) => {
    set({ isSigningUp: true });
    try {
      const res = await axios.post<AuthUser>(`https://be-social-8uqb.onrender.com/api/auth/signup`, data, {
        withCredentials: true
      });
      set({ 
        authUser: res.data,
        isSigningUp: false 
      });
      toast.success("Account created successfully");
      get().connectSocket();
    } catch (error) {
      const errorMessage = handleApiError(error);
      toast.error(errorMessage);
      set({ isSigningUp: false });
    }
  },

  login: async (data) => {
    set({ isLoggingIn: true });
    try {
      const res = await axios.post<AuthUser>(`https://be-social-8uqb.onrender.com/api/auth/login`, data, {
        withCredentials: true,
      });
      set({ 
        authUser: res.data,
        isLoggingIn: false 
      });
      toast.success("Logged in successfully");
      get().connectSocket();
    } catch (error) {
      const errorMessage = handleApiError(error);
      toast.error(errorMessage);
      set({ isLoggingIn: false });
    }
  },

  logout: async () => {
    try {
      await axios.post(`https://be-social-8uqb.onrender.com/api/auth/logout`, null, {
        withCredentials: true
      });
      set({ authUser: null });
      toast.success("Logged out successfully");
      get().disconnectSocket();
    } catch (error) {
      const errorMessage = handleApiError(error);
      toast.error(errorMessage);
    }
  },
  connectSocket: () => {
    const { authUser } = get();
    if (!authUser || get().socket?.connected) return;

    get().disconnectSocket();

    const socket = io("https://be-social-8uqb.onrender.com", {
      query: { userId: authUser._id },
      reconnection: true,
      reconnectionAttempts: 5,
      reconnectionDelay: 1000,
    });

    socket.on('connect', () => {
      console.log('Socket connected:', socket.id);
      set({ socket });
    });

    socket.on('getOnlineUsers', (userIds: string[]) => {
      console.log('Online users updated:', userIds);
      set({ onlineUsers: userIds });
    });

    socket.on('disconnect', () => {
      console.log('Socket disconnected');
    });

    socket.on('connect_error', (error) => {
      console.error('Socket connection error:', error);
    });

    // Don't set the socket until it's connected
    socket.connect();
  },

  disconnectSocket: () => {
    const { socket } = get();
    if (socket && socket.connected) {
      socket.disconnect();
      set({ socket: null });
    }
  }
}));