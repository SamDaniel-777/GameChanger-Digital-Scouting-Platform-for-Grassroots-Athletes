"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Send, Search, MoreVertical } from "lucide-react"
import Layout from "@/components/layout"
import { useAuth } from "@/hooks/use-auth"

export default function MessagesPage() {
  const { isAuthenticated } = useAuth()
  const [selectedChat, setSelectedChat] = useState(1)
  const [newMessage, setNewMessage] = useState("")

  if (!isAuthenticated) {
    return (
      <Layout>
        <div className="text-center py-12">
          <h1 className="text-2xl font-bold mb-4">Please sign in to view messages</h1>
          <p className="text-gray-600">You need to be logged in to access messages.</p>
        </div>
      </Layout>
    )
  }

  const mockChats = [
    {
      id: 1,
      name: "Coach Rajesh Kumar",
      avatar: "/placeholder.svg?height=40&width=40",
      lastMessage: "I'm interested in your football skills. Would you like to discuss opportunities?",
      timestamp: "2m ago",
      unread: 2,
      type: "scout",
      online: true,
    },
    {
      id: 2,
      name: "Mumbai FC Academy",
      avatar: "/placeholder.svg?height=40&width=40",
      lastMessage: "We have trials next week. Are you available?",
      timestamp: "1h ago",
      unread: 0,
      type: "scout",
      online: false,
    },
    {
      id: 3,
      name: "Priya Patel",
      avatar: "/placeholder.svg?height=40&width=40",
      lastMessage: "Great match yesterday! Keep it up 👏",
      timestamp: "3h ago",
      unread: 0,
      type: "athlete",
      online: true,
    },
    {
      id: 4,
      name: "Sports Sponsor Connect",
      avatar: "/placeholder.svg?height=40&width=40",
      lastMessage: "We'd like to discuss sponsorship opportunities with you.",
      timestamp: "1d ago",
      unread: 1,
      type: "sponsor",
      online: false,
    },
  ]

  const mockMessages = [
    {
      id: 1,
      senderId: 1,
      senderName: "Coach Rajesh Kumar",
      message: "Hi Rahul! I've been following your progress and I'm really impressed with your skills on the field.",
      timestamp: "10:30 AM",
      isOwn: false,
    },
    {
      id: 2,
      senderId: "me",
      senderName: "Me",
      message: "Thank you so much! That means a lot coming from you.",
      timestamp: "10:32 AM",
      isOwn: true,
    },
    {
      id: 3,
      senderId: 1,
      senderName: "Coach Rajesh Kumar",
      message: "I'm interested in your football skills. Would you like to discuss opportunities?",
      timestamp: "10:35 AM",
      isOwn: false,
    },
    {
      id: 4,
      senderId: "me",
      senderName: "Me",
      message: "I'd love to hear more about what opportunities you have in mind.",
      timestamp: "10:37 AM",
      isOwn: true,
    },
    {
      id: 5,
      senderId: 1,
      senderName: "Coach Rajesh Kumar",
      message:
        "We have a youth development program starting next month. I think you'd be a great fit. Can we schedule a call to discuss details?",
      timestamp: "10:40 AM",
      isOwn: false,
    },
  ]

  const handleSendMessage = () => {
    if (newMessage.trim()) {
      // Add message logic here
      console.log("Sending message:", newMessage)
      setNewMessage("")
    }
  }

  const selectedChatData = mockChats.find((chat) => chat.id === selectedChat)

  return (
    <Layout>
      <div className="max-w-6xl mx-auto h-[calc(100vh-200px)]">
        <div className="flex h-full bg-white rounded-lg shadow-lg overflow-hidden">
          {/* Chat List */}
          <div className="w-1/3 border-r border-gray-200 flex flex-col">
            {/* Header */}
            <div className="p-4 border-b border-gray-200">
              <h2 className="text-xl font-bold mb-3">Messages</h2>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input placeholder="Search conversations..." className="pl-10" />
              </div>
            </div>

            {/* Chat List */}
            <div className="flex-1 overflow-y-auto">
              {mockChats.map((chat) => (
                <div
                  key={chat.id}
                  className={`p-4 border-b border-gray-100 cursor-pointer hover:bg-gray-50 transition-colors ${
                    selectedChat === chat.id ? "bg-blue-50 border-blue-200" : ""
                  }`}
                  onClick={() => setSelectedChat(chat.id)}
                >
                  <div className="flex items-center space-x-3">
                    <div className="relative">
                      <Avatar className="h-12 w-12">
                        <AvatarImage src={chat.avatar || "/placeholder.svg"} alt={chat.name} />
                        <AvatarFallback>
                          {chat.name
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </AvatarFallback>
                      </Avatar>
                      {chat.online && (
                        <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-white rounded-full"></div>
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <h3 className="font-semibold text-sm truncate">{chat.name}</h3>
                        <div className="flex items-center space-x-2">
                          <span className="text-xs text-gray-500">{chat.timestamp}</span>
                          {chat.unread > 0 && (
                            <Badge className="bg-blue-600 text-white text-xs px-2 py-1 rounded-full">
                              {chat.unread}
                            </Badge>
                          )}
                        </div>
                      </div>
                      <div className="flex items-center justify-between mt-1">
                        <p className="text-sm text-gray-600 truncate">{chat.lastMessage}</p>
                        <Badge variant="outline" className="text-xs">
                          {chat.type}
                        </Badge>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Chat Window */}
          <div className="flex-1 flex flex-col">
            {selectedChatData ? (
              <>
                {/* Chat Header */}
                <div className="p-4 border-b border-gray-200 bg-white">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="relative">
                        <Avatar className="h-10 w-10">
                          <AvatarImage
                            src={selectedChatData.avatar || "/placeholder.svg"}
                            alt={selectedChatData.name}
                          />
                          <AvatarFallback>
                            {selectedChatData.name
                              .split(" ")
                              .map((n) => n[0])
                              .join("")}
                          </AvatarFallback>
                        </Avatar>
                        {selectedChatData.online && (
                          <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-white rounded-full"></div>
                        )}
                      </div>
                      <div>
                        <h3 className="font-semibold">{selectedChatData.name}</h3>
                        <p className="text-sm text-gray-600">
                          {selectedChatData.online ? "Online" : "Last seen 2h ago"}
                        </p>
                      </div>
                    </div>
                    <Button variant="ghost" size="icon">
                      <MoreVertical className="h-5 w-5" />
                    </Button>
                  </div>
                </div>

                {/* Messages */}
                <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50">
                  {mockMessages.map((message) => (
                    <div key={message.id} className={`flex ${message.isOwn ? "justify-end" : "justify-start"}`}>
                      <div
                        className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
                          message.isOwn ? "bg-blue-600 text-white" : "bg-white text-gray-800 border border-gray-200"
                        }`}
                      >
                        <p className="text-sm">{message.message}</p>
                        <p className={`text-xs mt-1 ${message.isOwn ? "text-blue-100" : "text-gray-500"}`}>
                          {message.timestamp}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Message Input */}
                <div className="p-4 border-t border-gray-200 bg-white">
                  <div className="flex items-center space-x-3">
                    <Input
                      value={newMessage}
                      onChange={(e) => setNewMessage(e.target.value)}
                      placeholder="Type a message..."
                      className="flex-1"
                      onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
                    />
                    <Button onClick={handleSendMessage} size="icon">
                      <Send className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </>
            ) : (
              <div className="flex-1 flex items-center justify-center bg-gray-50">
                <div className="text-center">
                  <h3 className="text-lg font-semibold text-gray-600 mb-2">Select a conversation</h3>
                  <p className="text-gray-500">Choose a chat from the sidebar to start messaging</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </Layout>
  )
}
