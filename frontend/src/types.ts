// types.ts
export interface UserType {
  _id: string;
  username: string;
  profileImg: string;
  fullName: string;
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
