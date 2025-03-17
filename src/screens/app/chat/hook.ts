import {
  MOCK_CONVERSATION,
  MOCK_MESSAGES,
  MOCK_USER_CONVERSATION,
} from "@/constants/mocks/communicates";
import {
  IConversation,
  IMessage,
  IUserConversation,
} from "@/lib/type/communicate";
import { useAuthStore } from "@/stores/auth";
import { ChangeEvent, KeyboardEvent, useState } from "react";

export function useConversation() {
  const { auth } = useAuthStore();
  const [activeConversation, _setActiveConversation] =
    useState<IConversation>(MOCK_CONVERSATION);
  const [messages, setMessages] = useState<IMessage[]>(MOCK_MESSAGES);
  const [newMessage, setNewMessage] = useState("");

  const getConversationName = (conversation: IConversation) => {
    if (conversation.type === "group") return conversation?.name;
    return conversation.participants[0]?.name;
  };

  const getConversationAvatar = (conversation: IConversation) => {
    if (conversation.type === "group") {
      return "/placeholder.svg?height=40&width=40";
    }
    return conversation.participants[0]?.avatar;
  };

  const getConversationInitial = (conversation: IConversation) => {
    if (conversation.type === "group") {
      return conversation.name?.[0] || "G";
    }
    return conversation.participants[0]?.name[0];
  };

  const getStatusColor = (status: IUserConversation["status"]) => {
    switch (status) {
      case "online":
        return "bg-green-500";
      case "away":
        return "bg-yellow-500";
      case "busy":
        return "bg-red-500";
      case "offline":
        return "bg-gray-400";
      default:
        return "bg-gray-400";
    }
  };

  const handleSendMessage = () => {
    if (newMessage.trim() === "") return;

    const newMsg: IMessage = {
      _id: `new-${Date.now()}`,
      senderId: "current",
      content: newMessage,
      createdAt: new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
      updatedAt: new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
      read: false,
    };

    setMessages([...messages, newMsg]);
    setNewMessage("");
  };

  const handleEnter = (e: KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const handleChangeNewMessage = (e: ChangeEvent<HTMLInputElement>) => {
    setNewMessage(e.target.value);
  };

  const getUserById = (id: string): IUserConversation => {
    if (auth && id === "current") return auth as IUserConversation;
    return (
      MOCK_USER_CONVERSATION.find((user) => user._id === id) ||
      (auth as IUserConversation)
    );
  };

  return {
    activeConversation,
    messages,
    newMessage,
    getConversationName,
    getConversationInitial,
    getConversationAvatar,
    getStatusColor,
    handleSendMessage,
    handleEnter,
    handleChangeNewMessage,
    getUserById,
  };
}
