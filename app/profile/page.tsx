"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { MapPin, Calendar, Trophy, Users, Eye, MessageSquare, UserPlus } from "lucide-react"
import Layout from "@/components/layout"
import { useAuth } from "@/hooks/use-auth"

export default function ProfilePage() {
  const { user, isAuthenticated } = useAuth()
  const [isFollowing, setIsFollowing] = useState(false)

  if (!isAuthenticated) {
    return (
      <Layout>
        <div className="text-center py-12">
          <h1 className="text-2xl font-bold mb-4">Please sign in to view profiles</h1>
          <p className="text-gray-600">You need to be logged in to access profile pages.</p>
        </div>
      </Layout>
    )
  }

  const mockAthleteData = {
    name: user?.name || "Rahul Sharma",
    username: "@rahul_striker",
    avatar: "/placeholder.svg?height=120&width=120",
    coverImage: "/placeholder.svg?height=200&width=800",
    sport: "Football",
    position: "Forward",
    location: "Mumbai, Maharashtra",
    joinDate: "March 2024",
    bio: "Passionate footballer from Mumbai with dreams of playing professionally. Started playing at age 8 and have been dedicated to improving my skills ever since. Looking for opportunities to showcase my talent and connect with scouts.",
    stats: {
      followers: 1234,
      following: 567,
      posts: 89,
      profileViews: 5678,
    },
    achievements: [
      "District Championship Winner 2023",
      "Best Player Award - Mumbai League",
      "State Level Qualifier 2024",
      "Top Scorer - Local Tournament",
    ],
    gameStats: {
      matchesPlayed: 45,
      goals: 23,
      assists: 12,
      yellowCards: 3,
      redCards: 0,
    },
  }

  const mockPosts = [
    {
      id: 1,
      type: "video",
      content: "Training session highlights from yesterday. Working on my finishing!",
      media: "/placeholder.svg?height=300&width=400",
      likes: 156,
      comments: 23,
      timestamp: "2 days ago",
    },
    {
      id: 2,
      type: "image",
      content: "Match day! Ready to give my best performance 💪",
      media: "/placeholder.svg?height=300&width=400",
      likes: 234,
      comments: 45,
      timestamp: "1 week ago",
    },
    {
      id: 3,
      type: "image",
      content: "Team celebration after winning the district championship! 🏆",
      media: "/placeholder.svg?height=300&width=400",
      likes: 567,
      comments: 89,
      timestamp: "2 weeks ago",
    },
  ]

  return (
    <Layout>
      <div className="max-w-4xl mx-auto">
        {/* Cover Image */}
        <div className="relative h-48 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg mb-6 overflow-hidden">
          <img
            src={mockAthleteData.coverImage || "/placeholder.svg"}
            alt="Cover"
            className="w-full h-full object-cover opacity-50"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
        </div>

        {/* Profile Header */}
        <div className="relative -mt-16 mb-8">
          <div className="flex flex-col md:flex-row items-start md:items-end space-y-4 md:space-y-0 md:space-x-6">
            <Avatar className="h-32 w-32 border-4 border-white shadow-lg">
              <AvatarImage src={mockAthleteData.avatar || "/placeholder.svg"} alt={mockAthleteData.name} />
              <AvatarFallback className="text-2xl">
                {mockAthleteData.name
                  .split(" ")
                  .map((n) => n[0])
                  .join("")}
              </AvatarFallback>
            </Avatar>

            <div className="flex-1">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                <div>
                  <h1 className="text-3xl font-bold text-gray-900">{mockAthleteData.name}</h1>
                  <p className="text-gray-600 text-lg">{mockAthleteData.username}</p>
                  <div className="flex items-center space-x-4 mt-2 text-sm text-gray-600">
                    <div className="flex items-center space-x-1">
                      <Badge variant="secondary">{mockAthleteData.sport}</Badge>
                      <Badge variant="outline">{mockAthleteData.position}</Badge>
                    </div>
                  </div>
                  <div className="flex items-center space-x-4 mt-2 text-sm text-gray-600">
                    <div className="flex items-center space-x-1">
                      <MapPin className="h-4 w-4" />
                      <span>{mockAthleteData.location}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Calendar className="h-4 w-4" />
                      <span>Joined {mockAthleteData.joinDate}</span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center space-x-3 mt-4 md:mt-0">
                  <Button
                    variant={isFollowing ? "outline" : "default"}
                    onClick={() => setIsFollowing(!isFollowing)}
                    className="flex items-center space-x-2"
                  >
                    <UserPlus className="h-4 w-4" />
                    <span>{isFollowing ? "Following" : "Follow"}</span>
                  </Button>
                  <Button variant="outline" className="flex items-center space-x-2">
                    <MessageSquare className="h-4 w-4" />
                    <span>Message</span>
                  </Button>
                </div>
              </div>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
            <Card className="text-center p-4">
              <div className="text-2xl font-bold text-blue-600">{mockAthleteData.stats.followers}</div>
              <div className="text-sm text-gray-600">Followers</div>
            </Card>
            <Card className="text-center p-4">
              <div className="text-2xl font-bold text-green-600">{mockAthleteData.stats.following}</div>
              <div className="text-sm text-gray-600">Following</div>
            </Card>
            <Card className="text-center p-4">
              <div className="text-2xl font-bold text-purple-600">{mockAthleteData.stats.posts}</div>
              <div className="text-sm text-gray-600">Posts</div>
            </Card>
            <Card className="text-center p-4">
              <div className="text-2xl font-bold text-orange-600">{mockAthleteData.stats.profileViews}</div>
              <div className="text-sm text-gray-600">Profile Views</div>
            </Card>
          </div>
        </div>

        {/* Profile Content */}
        <Tabs defaultValue="posts" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="posts">Posts</TabsTrigger>
            <TabsTrigger value="about">About</TabsTrigger>
            <TabsTrigger value="stats">Stats</TabsTrigger>
            <TabsTrigger value="achievements">Achievements</TabsTrigger>
          </TabsList>

          <TabsContent value="posts" className="space-y-6">
            <div className="grid gap-6">
              {mockPosts.map((post) => (
                <Card key={post.id} className="p-6">
                  <div className="flex items-center space-x-3 mb-4">
                    <Avatar className="h-10 w-10">
                      <AvatarImage src={mockAthleteData.avatar || "/placeholder.svg"} alt={mockAthleteData.name} />
                      <AvatarFallback>
                        {mockAthleteData.name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <h4 className="font-semibold">{mockAthleteData.name}</h4>
                      <p className="text-sm text-gray-600">{post.timestamp}</p>
                    </div>
                  </div>
                  <p className="mb-4">{post.content}</p>
                  {post.type === "video" ? (
                    <video
                      src={post.media}
                      controls
                      className="w-full rounded-lg max-h-96"
                      poster="/placeholder.svg?height=300&width=400"
                    />
                  ) : (
                    <img
                      src={post.media || "/placeholder.svg"}
                      alt="Post content"
                      className="w-full rounded-lg object-cover max-h-96"
                    />
                  )}
                  <div className="flex items-center justify-between pt-4 mt-4 border-t border-gray-100">
                    <div className="flex items-center space-x-1 text-gray-600">
                      <Eye className="h-4 w-4" />
                      <span className="text-sm">{post.likes} likes</span>
                    </div>
                    <div className="flex items-center space-x-1 text-gray-600">
                      <MessageSquare className="h-4 w-4" />
                      <span className="text-sm">{post.comments} comments</span>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="about">
            <Card className="p-6">
              <CardHeader>
                <CardTitle>About Me</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700 leading-relaxed">{mockAthleteData.bio}</p>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="stats">
            <div className="grid md:grid-cols-2 gap-6">
              <Card className="p-6">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Trophy className="h-5 w-5" />
                    <span>Game Statistics</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Matches Played</span>
                    <span className="font-semibold">{mockAthleteData.gameStats.matchesPlayed}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Goals Scored</span>
                    <span className="font-semibold">{mockAthleteData.gameStats.goals}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Assists</span>
                    <span className="font-semibold">{mockAthleteData.gameStats.assists}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Yellow Cards</span>
                    <span className="font-semibold">{mockAthleteData.gameStats.yellowCards}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Red Cards</span>
                    <span className="font-semibold">{mockAthleteData.gameStats.redCards}</span>
                  </div>
                </CardContent>
              </Card>

              <Card className="p-6">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Users className="h-5 w-5" />
                    <span>Profile Insights</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Profile Views (This Month)</span>
                    <span className="font-semibold">1,234</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Scout Views</span>
                    <span className="font-semibold">89</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Messages Received</span>
                    <span className="font-semibold">23</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Opportunities</span>
                    <span className="font-semibold">5</span>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="achievements">
            <Card className="p-6">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Trophy className="h-5 w-5" />
                  <span>Achievements & Awards</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {mockAthleteData.achievements.map((achievement, index) => (
                    <div key={index} className="flex items-center space-x-3 p-3 bg-yellow-50 rounded-lg">
                      <Trophy className="h-5 w-5 text-yellow-600" />
                      <span className="font-medium">{achievement}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  )
}
