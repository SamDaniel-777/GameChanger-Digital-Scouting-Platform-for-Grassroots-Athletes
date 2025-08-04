"use client"

import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Heart, MessageCircle, Share, TrendingUp } from "lucide-react"
import Layout from "@/components/layout"
import { useAuth } from "@/hooks/use-auth"
import { useRouter } from "next/navigation"
import { useState, useEffect } from "react"

export default function HomePage() {
  const { isAuthenticated } = useAuth()
  const router = useRouter()
  const [feedPosts, setFeedPosts] = useState([])
  const [isLoading, setIsLoading] = useState(true)

  const fallbackPosts = [
    {
      id: 1,
      type: "video",
      content: "Training session highlights! Working on my finishing and technique. The grind never stops! 💪⚽",
      media: "/videos/sam_training.mp4",
      likes: 234,
      comments: 45,
      shares: 12,
      timestamp: "2 hours ago",
      user: {
        id: "demo-athlete-1",
        name: "Sam Daniel",
        username: "@sxm_leo",
        avatar: "/avatars/sam.png",
        sport: "Football",
        position: "Forward",
      },
    },
    {
      id: 2,
      type: "image",
      content: "Match day! Ready to give my best performance. The crowd energy is incredible! 🔥⚽",
      media: "/images/priya_match.jpg",
      likes: 456,
      comments: 78,
      shares: 23,
      timestamp: "1 day ago",
      user: {
        id: "demo-athlete-2",
        name: "Priya Patel",
        username: "@priya_cricket",
        avatar: "/avatars/priya.png",
        sport: "Cricket",
        position: "All-rounder",
      },
    },
  ]

  useEffect(() => {
    const loadFeedData = async () => {
      try {
        const { demoUsers } = await import("@/data/demo-users")

        const currentUsername = "@sxm_leo" // replace with dynamic username from auth later

        const posts = demoUsers.athletes
          .filter((athlete) => athlete.username !== currentUsername)
          .flatMap((athlete) =>
            athlete.posts.map((post) => ({
              ...post,
              user: {
                id: athlete.id,
                name: athlete.name,
                username: athlete.username,
                avatar: athlete.avatar,
                sport: athlete.sport,
                position: athlete.position,
              },
            }))
          )
          .sort((a, b) => {
            const timeA = a.timestamp.includes("hour") ? 1 : a.timestamp.includes("day") ? 2 : 3
            const timeB = b.timestamp.includes("hour") ? 1 : b.timestamp.includes("day") ? 2 : 3
            return timeA - timeB
          })

        setFeedPosts(posts)
        console.log("Feed posts loaded:", posts.length, "posts")
      } catch (error) {
        console.log("Using fallback data due to import error:", error)
        setFeedPosts(fallbackPosts)
      } finally {
        setIsLoading(false)
      }
    }

    loadFeedData()
  }, [])

  const handlePostInteraction = (postId, action) => {
    console.log(`${action} on post ${postId}`)
  }

  const handleUserClick = (userId) => {
    if (!userId) return
    const profileId = userId.startsWith("@") ? userId.slice(1) : userId
    router.push(`/profile/${profileId}`)
  }

  return (
    <Layout>
      <div className="max-w-2xl mx-auto">
        {feedPosts.map((post) => (
          <Card key={post.id} className="mb-4 p-4">
            <div className="flex items-center gap-3 cursor-pointer" onClick={() => handleUserClick(post.user.username)}>
              <Avatar>
                <AvatarImage src={post.user.avatar} />
                <AvatarFallback>{post.user.name[0]}</AvatarFallback>
              </Avatar>
              <div>
                <div className="font-semibold leading-none">{post.user.name}</div>
                <div className="text-xs text-gray-500">{post.timestamp}</div>
                <div className="flex gap-2 mt-1">
                  <Badge>{post.user.sport}</Badge>
                  <Badge>{post.user.position}</Badge>
                </div>
              </div>
            </div>
            <div className="mt-4 text-sm">{post.content}</div>
            {post.type === "video" ? (
              <video controls className="w-full mt-2 rounded">
                <source src={post.media} type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            ) : (
              <img src={post.media} alt="Post" className="w-full mt-2 rounded" />
            )}
            <div className="mt-4 flex justify-between text-sm text-gray-500">
              <div className="flex gap-2 items-center">
                <Heart className="w-4 h-4" /> {post.likes} Likes
              </div>
              <div className="flex gap-2 items-center">
                <MessageCircle className="w-4 h-4" /> {post.comments} Comments
              </div>
              <div className="flex gap-2 items-center">
                <Share className="w-4 h-4" /> {post.shares} Shares
              </div>
            </div>
          </Card>
        ))}
      </div>
    </Layout>
  )
}
