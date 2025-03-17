import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { AtSign, FileText, Search, Settings } from "lucide-react";
import { useConversation } from "./hook";
import { useEffect, useRef } from "react";
import { Card } from "@/components/ui/card";
import { timeAgo } from "@/lib/utils";
import { SidebarTrigger } from "@/components/ui/sidebar";
import InputAction from "./input-action";

export default function ChatScreen() {
  const {
    activeConversation,
    messages,
    newMessage,
    getConversationInitial,
    getConversationName,
    getConversationAvatar,
    getStatusColor,
    handleSendMessage,
    handleEnter,
    handleChangeNewMessage,
    getUserById,
  } = useConversation();

  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div className="flex flex-1 flex-col overflow-hidden">
      <header className="flex h-16 items-center justify-between border-b px-6">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-3">
            <SidebarTrigger />
            <div className="relative">
              <Avatar>
                <AvatarImage
                  src={getConversationAvatar(activeConversation)}
                  alt={getConversationName(activeConversation)}
                />
                <AvatarFallback>
                  {getConversationInitial(activeConversation)}
                </AvatarFallback>
              </Avatar>
              {activeConversation.type === "direct" && (
                <div
                  className={`absolute bottom-0 right-0 h-3 w-3 rounded-full border-2 border-background ${getStatusColor(activeConversation.participants[0]?.status)}`}
                />
              )}
            </div>
            <div>
              <h3 className="font-medium">
                {getConversationName(activeConversation)}
              </h3>
              {activeConversation.type === "direct" ? (
                <div className="flex items-center text-xs text-muted-foreground">
                  <span>
                    {activeConversation.participants[0]?.status === "offline" &&
                    activeConversation.participants[0].lastSeen
                      ? `Last seen ${activeConversation.participants[0].lastSeen}`
                      : activeConversation.participants[0].status}
                  </span>
                </div>
              ) : (
                <div className="flex items-center text-xs text-muted-foreground">
                  <span>{activeConversation.participants.length} members</span>
                </div>
              )}
            </div>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon">
            <Search className="h-5 w-5" />
          </Button>
          <Button variant="ghost" size="icon">
            <AtSign className="h-5 w-5" />
          </Button>
          <Button variant="ghost" size="icon">
            <Settings className="h-5 w-5" />
          </Button>
        </div>
      </header>
      <ScrollArea className="flex-1 p-4 h-0">
        <div className="flex flex-col gap-4">
          {messages.map((message) => {
            const isCurrentUser = message.senderId === "current";
            const sender = getUserById(message.senderId);

            return (
              <div
                key={message._id}
                className={`flex ${isCurrentUser ? "justify-end" : "justify-start"}`}
              >
                <div
                  className={`flex max-w-[80%] gap-3 ${isCurrentUser ? "flex-row-reverse" : ""}`}
                >
                  {!isCurrentUser && (
                    <Avatar className="h-8 w-8">
                      <AvatarImage src={sender.avatar} alt={sender.name} />
                      <AvatarFallback>{sender.name[0]}</AvatarFallback>
                    </Avatar>
                  )}
                  <div
                    className={`flex flex-col gap-1 ${isCurrentUser ? "items-end" : ""}`}
                  >
                    <div className="flex items-center gap-2">
                      {!isCurrentUser && (
                        <span className="text-sm font-medium">
                          {sender.name}
                        </span>
                      )}
                      <span className="text-xs text-muted-foreground">
                        {timeAgo("en-US", message.createdAt)}
                      </span>
                    </div>
                    <Card
                      className={`p-3 ${isCurrentUser ? "bg-primary text-primary-foreground" : ""}`}
                    >
                      <p className="text-sm">{message.content}</p>
                    </Card>
                    {message.attachments?.map((attachment, index) => (
                      <div key={index} className="mt-1">
                        {attachment.type === "image" ? (
                          <div className="overflow-hidden rounded-md border">
                            <img
                              src={attachment.url || "/placeholder.svg"}
                              alt={attachment.name}
                              className="h-auto max-w-xs object-cover"
                            />
                          </div>
                        ) : (
                          <div className="flex items-center gap-2 rounded-md border p-2">
                            <FileText className="h-4 w-4 text-muted-foreground" />
                            <span className="text-sm">{attachment.name}</span>
                            <Button
                              variant="ghost"
                              size="sm"
                              className="ml-auto h-6 px-2"
                            >
                              Download
                            </Button>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            );
          })}
          <div ref={messagesEndRef} />
        </div>
      </ScrollArea>
      <Separator />
      <InputAction
        value={newMessage}
        onChangeValue={handleChangeNewMessage}
        onEnter={handleEnter}
        onSend={handleSendMessage}
      />
    </div>
  );
}
