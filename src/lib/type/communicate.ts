import { IUser } from "./auth";

export interface IMail {
  _id: string;
  name: string;
  email: string;
  subject: string;
  date: string;
  teaser: string;
}

export type Mails = IMail[];

export interface IMessage {
  _id: string;
  senderId: string;
  content: string;
  createdAt: string;
  updatedAt: string;
  read: boolean;
  attachments?: {
    type: "image" | "file";
    url: string;
    name: string;
  }[];
}

export interface IUserConversation extends IUser {
  status: "online" | "offline" | "away" | "busy";
  lastSeen?: string;
}

export interface IConversation {
  _id: string;
  type: "direct" | "group";
  participants: IUserConversation[];
  lastMessage?: IMessage;
  unreadCount: number;
  name?: string;
  isActive?: boolean;
}
