"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Heart, MessageSquare, UserPlus, Trophy, Eye, Bell } from "lucide-react"
import Layout from "@/components/layout"
import { useAuth } from "@/hooks/use-auth"

export default function NotificationsPage() {
  const { isAuthenticated } = useAuth()
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      type: "like",
      user: {
        name: "Priya Patel",
        avatar: "/placeholder.svg?height=40&width=40",
        username: "@priya_cricket",
      },
      content: "liked your training video",
      timestamp: "2 minutes ago",
      read: false,
      postPreview: "Training session highlights from yesterday...",
    },
    {
      id: 2,
      type: "follow",
      user: {
        name: "Coach Rajesh Kumar",
        avatar: "/placeholder.svg?height=40&width=40",
        username: "@coach_rajesh",
      },
      content: "started following you",
      timestamp: "1 hour ago",
      read: false,
    },
    {
      id: 3,
      type: "comment",
      user: {
        name: "Arjun Singh",
        avatar: "/placeholder.svg?height=40&width=40",
        username: "@arjun_kabaddi",
      },
      content: "commented on your post",
      comment: "Great technique! Keep it up 👏",
      timestamp: "3 hours ago",
      read: true,
      postPreview: "Match day! Ready to give my best...",
    },
    {
      id: 4,
      type: "opportunity",
      user: {
        name: "Mumbai FC Academy",
        avatar: "/placeholder.svg?height=40&width=40",
        username: "@mumbai_fc",
      },
      content: "sent you a trial opportunity",
      timestamp: "1 day ago",
      read: true,
    },
    {
      id: 5,
      type: "achievement",
      content: "You reached 1000 profile views!",
      timestamp: "2 days ago",
      read: true,
    },
    {
      id: 6,
      type: "message",
      user: {
        name: "Sports Sponsor Connect",
        avatar: "/placeholder.svg?height=40&width=40",
        username: "@sponsor_connect",
      },
      content: "sent you a message about sponsorship",
      timestamp: "3 days ago",
      read: true,
    },
  ])

  if (!isAuthenticated) {
    return (
      <Layout>
        <div className="text-center py-12">
          <h1 className="text-2xl font-bold mb-4">Please sign in to view notifications</h1>
          <p className="text-gray-600">You need to be logged in to access notifications.</p>
        </div>
      </Layout>
    )
  }

  const markAsRead = (id: number) => {
    setNotifications((prev) => prev.map((notif) => (notif.id === id ? { ...notif, read: true } : notif)))
  }

  const markAllAsRead = () => {
    setNotifications((prev) => prev.map((notif) => ({ ...notif, read: true })))
  }

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case "like":
        return <Heart className="h-5 w-5 text-red-500" />
      case "comment":
        return <MessageSquare className="h-5 w-5 text-blue-500" />
      case "follow":
        return <UserPlus className="h-5 w-5 text-green-500" />
      case "opportunity":
        return <Trophy className="h-5 w-5 text-yellow-500" />
      case "achievement":
        return <Trophy className="h-5 w-5 text-purple-500" />
      case "message":
        return <MessageSquare className="h-5 w-5 text-blue-500" />
      default:
        return <Bell className="h-5 w-5 text-gray-500" />
    }
  }

  const unreadCount = notifications.filter((n) => !n.read).length
  const allNotifications = notifications
  const unreadNotifications = notifications.filter((n) => !n.read)

  return (
    <Layout>
      <div className="max-w-2xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold">Notifications</h1>
            {unreadCount > 0 && <p className="text-gray-600 mt-1">{unreadCount} unread notifications</p>}
          </div>
          {unreadCount > 0 && (
            <Button variant="outline" onClick={markAllAsRead}>
              Mark all as read
            </Button>
          )}
        </div>

        <Tabs defaultValue="all" className="space-y-6">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="all" className="relative">
              All
            </TabsTrigger>
            <TabsTrigger value="unread" className="relative">
              Unread
              {unreadCount > 0 && (
                <Badge className="ml-2 bg-red-500 text-white text-xs px-2 py-1 rounded-full">{unreadCount}</Badge>
              )}
            </TabsTrigger>
          </TabsList>

          <TabsContent value="all" className="space-y-4">
            {allNotifications.length === 0 ? (
              <Card className="p-8 text-center">
                <Bell className="h-12 w-12 mx-auto mb-4 text-gray-400" />
                <h3 className="text-lg font-semibold mb-2">No notifications yet</h3>
                <p className="text-gray-600">When you get notifications, they'll show up here.</p>
              </Card>
            ) : (
              allNotifications.map((notification) => (
                <Card
                  key={notification.id}
                  className={`p-4 cursor-pointer transition-colors hover:bg-gray-50 ${
                    !notification.read ? "bg-blue-50 border-blue-200" : ""
                  }`}
                  onClick={() => markAsRead(notification.id)}
                >
                  <div className="flex items-start space-x-3">
                    <div className="flex-shrink-0 mt-1">{getNotificationIcon(notification.type)}</div>

                    <div className="flex-1 min-w-0">
                      <div className="flex items-center space-x-2">
                        {notification.user && (
                          <Avatar className="h-8 w-8">
                            <AvatarImage
                              src={notification.user.avatar || "/placeholder.svg"}
                              alt={notification.user.name}
                            />
                            <AvatarFallback className="text-xs">
                              {notification.user.name
                                .split(" ")
                                .map((n) => n[0])
                                .join("")}
                            </AvatarFallback>
                          </Avatar>
                        )}
                        <div className="flex-1">
                          <p className="text-sm">
                            {notification.user && <span className="font-semibold">{notification.user.name} </span>}
                            <span className={notification.read ? "text-gray-600" : "text-gray-900"}>
                              {notification.content}
                            </span>
                          </p>
                          {notification.comment && (
                            <p className="text-sm text-gray-600 mt-1 italic">"{notification.comment}"</p>
                          )}
                          {notification.postPreview && (
                            <p className="text-xs text-gray-500 mt-1">"{notification.postPreview}"</p>
                          )}
                        </div>
                        <div className="flex items-center space-x-2">
                          <span className="text-xs text-gray-500">{notification.timestamp}</span>
                          {!notification.read && <div className="w-2 h-2 bg-blue-600 rounded-full"></div>}
                        </div>
                      </div>
                    </div>
                  </div>
                </Card>
              ))
            )}
          </TabsContent>

          <TabsContent value="unread" className="space-y-4">
            {unreadNotifications.length === 0 ? (
              <Card className="p-8 text-center">
                <Eye className="h-12 w-12 mx-auto mb-4 text-gray-400" />
                <h3 className="text-lg font-semibold mb-2">All caught up!</h3>
                <p className="text-gray-600">You have no unread notifications.</p>
              </Card>
            ) : (
              unreadNotifications.map((notification) => (
                <Card
                  key={notification.id}
                  className="p-4 cursor-pointer transition-colors hover:bg-gray-50 bg-blue-50 border-blue-200"
                  onClick={() => markAsRead(notification.id)}
                >
                  <div className="flex items-start space-x-3">
                    <div className="flex-shrink-0 mt-1">{getNotificationIcon(notification.type)}</div>

                    <div className="flex-1 min-w-0">
                      <div className="flex items-center space-x-2">
                        {notification.user && (
                          <Avatar className="h-8 w-8">
                            <AvatarImage
                              src={notification.user.avatar || "/placeholder.svg"}
                              alt={notification.user.name}
                            />
                            <AvatarFallback className="text-xs">
                              {notification.user.name
                                .split(" ")
                                .map((n) => n[0])
                                .join("")}
                            </AvatarFallback>
                          </Avatar>
                        )}
                        <div className="flex-1">
                          <p className="text-sm">
                            {notification.user && <span className="font-semibold">{notification.user.name} </span>}
                            <span className="text-gray-900">{notification.content}</span>
                          </p>
                          {notification.comment && (
                            <p className="text-sm text-gray-600 mt-1 italic">"{notification.comment}"</p>
                          )}
                          {notification.postPreview && (
                            <p className="text-xs text-gray-500 mt-1">"{notification.postPreview}"</p>
                          )}
                        </div>
                        <div className="flex items-center space-x-2">
                          <span className="text-xs text-gray-500">{notification.timestamp}</span>
                          <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                        </div>
                      </div>
                    </div>
                  </div>
                </Card>
              ))
            )}
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  )
}
