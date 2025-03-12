// types.ts
export interface UserType {
  _id: string;
  fullName: string;
  username: string;
  email:string;
  profileImg?: string;
  coverImg?: string;
  bio?: string;
  link?: string;
  following: string[];
  followers: string[];
  createdAt: string;
}

export interface CommentType {
  _id: string;
  text: string;
  user: UserType;
}

export interface PostType {
  _id: string;
  text: string;
  img?: string;
  user: UserType;
  comments: CommentType[];
  likes: string[];
  createdAt:string;
}

export interface NotificationFromType {
  _id: string;
  username: string;
  profileImg: string;
}

export interface NotificationType {
  _id: string;
  from: NotificationFromType;
  type: "follow" | "like"; // Add other notification types as needed
}

export interface User {
  _id: string;
  fullName: string;
  username: string;
  profileImg?: string;
  email?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface Message {
  _id: string;
  senderId: string;
  receiverId: string;
  text: string;
  createdAt: string;
  aiSuggestions?: string[];  // Array of AI-suggested replies
}

