"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import {
  MapPin,
  Calendar,
  Trophy,
  Users,
  Eye,
  MessageSquare,
  UserPlus,
  ArrowLeft,
  Play,
  Plus,
  Edit3,
  Building,
  Activity,
  Heart,
  Ruler,
  Weight,
  Clock,
  Briefcase,
  Award,
  AlertTriangle,
} from "lucide-react"
import Layout from "@/components/layout"
import { useAuth } from "@/hooks/use-auth"
import { demoUsers } from "@/data/demo-users"
import { useRouter } from "next/navigation"
import React from "react"

interface ProfilePageProps {
  params: {
    id: string
  }
}

export default function ProfilePage({ params }: ProfilePageProps) {
  const { user, isAuthenticated } = useAuth()
  const router = useRouter()
  const [isFollowing, setIsFollowing] = useState(false)
  const [achievements, setAchievements] = useState<string[]>([])
  const [clubs, setClubs] = useState<string[]>([])
  const [newAchievement, setNewAchievement] = useState("")
  const [newClub, setNewClub] = useState("")
  const [showAchievementDialog, setShowAchievementDialog] = useState(false)
  const [showClubDialog, setShowClubDialog] = useState(false)

  // Find the athlete by ID
  const athlete = React.useMemo(() => {
    if (!demoUsers?.athletes || !params.id) return null

    const searchId = decodeURIComponent(params.id).toLowerCase()

    // Try multiple matching strategies
    const found = demoUsers.athletes.find((a) => {
      const athleteId = a.id.toLowerCase()
      const athleteUsername = a.username.toLowerCase()
      const athleteName = a.name.toLowerCase().replace(/\s+/g, "-")

      return (
        athleteId === searchId ||
        athleteId === searchId.replace("@", "") ||
        athleteUsername === searchId ||
        athleteUsername === `@${searchId}` ||
        athleteName === searchId ||
        athleteId.includes(searchId) ||
        athleteUsername.includes(searchId)
      )
    })

    return found || null
  }, [params.id])

  React.useEffect(() => {
    console.log("Profile lookup:", {
      paramId: params.id,
      availableAthletes: demoUsers?.athletes?.map((a) => ({ id: a.id, name: a.name, username: a.username })),
      foundAthlete: athlete,
    })
  }, [params.id, athlete])

  // Initialize achievements and clubs from athlete data
  useState(() => {
    if (athlete) {
      setAchievements(athlete.achievements || [])
      setClubs(athlete.clubs || [])
    }
  })

  if (!athlete) {
    return (
      <Layout>
        <div className="text-center py-12">
          <h1 className="text-2xl font-bold mb-4">Profile not found</h1>
          <p className="text-gray-600">The profile you're looking for doesn't exist.</p>
          <Button onClick={() => router.push("/")} className="mt-4">
            Go Home
          </Button>
        </div>
      </Layout>
    )
  }

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

  const isOwnProfile = user?.id === athlete.id

  const handleAddAchievement = () => {
    if (newAchievement.trim()) {
      setAchievements([...achievements, newAchievement.trim()])
      setNewAchievement("")
      setShowAchievementDialog(false)
    }
  }

  const handleAddClub = () => {
    if (newClub.trim()) {
      setClubs([...clubs, newClub.trim()])
      setNewClub("")
      setShowClubDialog(false)
    }
  }

  const removeAchievement = (index: number) => {
    setAchievements(achievements.filter((_, i) => i !== index))
  }

  const removeClub = (index: number) => {
    setClubs(clubs.filter((_, i) => i !== index))
  }

  return (
    <Layout>
      <div className="max-w-4xl mx-auto">
        {/* Back Button */}
        <Button variant="ghost" onClick={() => router.back()} className="mb-6 flex items-center space-x-2">
          <ArrowLeft className="h-4 w-4" />
          <span>Back</span>
        </Button>

        {/* Cover Image */}
        <div className="relative h-64 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl mb-8 overflow-hidden shadow-xl">
          <img
            src={athlete.coverImage || "/placeholder.svg"}
            alt="Cover"
            className="w-full h-full object-cover opacity-60"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
          <div className="absolute bottom-6 left-6 text-white">
            <h1 className="text-3xl font-bold">{athlete.name}</h1>
            <p className="text-xl opacity-90">
              {athlete.sport} • {athlete.position}
            </p>
          </div>
        </div>

        {/* Profile Header */}
        <div className="relative -mt-20 mb-8">
          <div className="flex flex-col md:flex-row items-start md:items-end space-y-6 md:space-y-0 md:space-x-8">
            <Avatar className="h-40 w-40 border-6 border-white shadow-2xl">
              <AvatarImage src={athlete.avatar || "/placeholder.svg"} alt={athlete.name} />
              <AvatarFallback className="text-4xl bg-gradient-to-br from-blue-500 to-purple-500 text-white">
                {athlete.name
                  .split(" ")
                  .map((n) => n[0])
                  .join("")}
              </AvatarFallback>
            </Avatar>

            <div className="flex-1 bg-white rounded-2xl p-6 shadow-lg">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                <div>
                  <h2 className="text-2xl font-bold text-gray-900">{athlete.name}</h2>
                  <p className="text-gray-600 text-lg">{athlete.username}</p>
                  <div className="flex items-center space-x-3 mt-3">
                    <Badge className="bg-blue-100 text-blue-800">{athlete.sport}</Badge>
                    <Badge variant="outline">{athlete.position}</Badge>
                    <Badge variant="secondary">Age {athlete.age}</Badge>
                  </div>
                  <div className="flex items-center space-x-6 mt-3 text-sm text-gray-600">
                    <div className="flex items-center space-x-1">
                      <MapPin className="h-4 w-4" />
                      <span>{athlete.location}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Calendar className="h-4 w-4" />
                      <span>Joined {athlete.joinDate}</span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center space-x-3 mt-6 md:mt-0">
                  {!isOwnProfile && (
                    <>
                      <Button
                        variant={isFollowing ? "outline" : "default"}
                        onClick={() => setIsFollowing(!isFollowing)}
                        className="flex items-center space-x-2"
                      >
                        <UserPlus className="h-4 w-4" />
                        <span>{isFollowing ? "Following" : "Follow"}</span>
                      </Button>
                      <Button className="flex items-center space-x-2 bg-green-600 hover:bg-green-700">
                        <MessageSquare className="h-4 w-4" />
                        <span>Message</span>
                      </Button>
                    </>
                  )}
                  {isOwnProfile && (
                    <Button variant="outline" className="flex items-center space-x-2">
                      <Edit3 className="h-4 w-4" />
                      <span>Edit Profile</span>
                    </Button>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8">
            <Card className="text-center p-6 hover:shadow-lg transition-shadow">
              <div className="text-3xl font-bold text-blue-600">{athlete.stats.followers.toLocaleString()}</div>
              <div className="text-sm text-gray-600 mt-1">Followers</div>
            </Card>
            <Card className="text-center p-6 hover:shadow-lg transition-shadow">
              <div className="text-3xl font-bold text-green-600">{athlete.stats.following}</div>
              <div className="text-sm text-gray-600 mt-1">Following</div>
            </Card>
            <Card className="text-center p-6 hover:shadow-lg transition-shadow">
              <div className="text-3xl font-bold text-purple-600">{athlete.stats.posts}</div>
              <div className="text-sm text-gray-600 mt-1">Posts</div>
            </Card>
            <Card className="text-center p-6 hover:shadow-lg transition-shadow">
              <div className="text-3xl font-bold text-orange-600">{athlete.stats.profileViews.toLocaleString()}</div>
              <div className="text-sm text-gray-600 mt-1">Profile Views</div>
            </Card>
          </div>
        </div>

        {/* Profile Content */}
        <Tabs defaultValue="posts" className="space-y-8">
          <TabsList className="grid w-full grid-cols-5 bg-white shadow-sm">
            <TabsTrigger value="posts" className="data-[state=active]:bg-blue-600 data-[state=active]:text-white">
              Posts
            </TabsTrigger>
            <TabsTrigger value="about" className="data-[state=active]:bg-blue-600 data-[state=active]:text-white">
              About
            </TabsTrigger>
            <TabsTrigger value="stats" className="data-[state=active]:bg-blue-600 data-[state=active]:text-white">
              Stats
            </TabsTrigger>
            <TabsTrigger
              value="achievements"
              className="data-[state=active]:bg-blue-600 data-[state=active]:text-white"
            >
              Achievements
            </TabsTrigger>
            <TabsTrigger value="clubs" className="data-[state=active]:bg-blue-600 data-[state=active]:text-white">
              Clubs
            </TabsTrigger>
          </TabsList>

          <TabsContent value="posts" className="space-y-6">
            <div className="grid gap-6">
              {athlete.posts.map((post) => (
                <Card key={post.id} className="overflow-hidden hover:shadow-xl transition-all duration-300">
                  <div className="p-6">
                    <div className="flex items-center space-x-3 mb-4">
                      <Avatar className="h-12 w-12">
                        <AvatarImage src={athlete.avatar || "/placeholder.svg"} alt={athlete.name} />
                        <AvatarFallback className="bg-gradient-to-br from-blue-500 to-purple-500 text-white">
                          {athlete.name
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <h4 className="font-bold">{athlete.name}</h4>
                        <p className="text-sm text-gray-600">{post.timestamp}</p>
                      </div>
                    </div>
                    <p className="mb-4 leading-relaxed">{post.content}</p>

                    <div className="relative rounded-xl overflow-hidden bg-gray-100">
                      {post.type === "video" ? (
                        <div className="relative">
                          <video
                            src={post.media}
                            controls
                            className="w-full aspect-video object-cover"
                            poster="/placeholder.svg?height=400&width=600"
                          />
                          <div className="absolute inset-0 flex items-center justify-center bg-black/20 opacity-0 hover:opacity-100 transition-opacity">
                            <Play className="h-16 w-16 text-white" />
                          </div>
                        </div>
                      ) : (
                        <img
                          src={post.media || "/placeholder.svg"}
                          alt="Post content"
                          className="w-full aspect-video object-cover"
                        />
                      )}
                    </div>

                    <div className="flex items-center justify-between pt-6 border-t border-gray-100 mt-6">
                      <div className="flex items-center space-x-1 text-gray-600">
                        <Eye className="h-4 w-4" />
                        <span className="text-sm font-medium">{post.likes} likes</span>
                      </div>
                      <div className="flex items-center space-x-1 text-gray-600">
                        <MessageSquare className="h-4 w-4" />
                        <span className="text-sm font-medium">{post.comments} comments</span>
                      </div>
                      <div className="flex items-center space-x-1 text-gray-600">
                        <span className="text-sm font-medium">{post.shares} shares</span>
                      </div>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="about">
            <div className="grid gap-8">
              {/* Bio Section */}
              <Card className="p-8">
                <CardHeader>
                  <CardTitle className="text-2xl">About {athlete.name}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-700 leading-relaxed text-lg">{athlete.bio}</p>
                </CardContent>
              </Card>

              {/* Physical Details */}
              <Card className="p-8">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2 text-xl">
                    <Activity className="h-6 w-6 text-blue-600" />
                    <span>Physical Details</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid md:grid-cols-3 gap-6">
                    <div className="space-y-4">
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                          <Ruler className="h-5 w-5 text-blue-600" />
                        </div>
                        <div>
                          <p className="text-sm text-gray-600">Height</p>
                          <p className="font-semibold">{athlete.height}</p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                          <Weight className="h-5 w-5 text-blue-600" />
                        </div>
                        <div>
                          <p className="text-sm text-gray-600">Weight</p>
                          <p className="font-semibold">{athlete.weight}</p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                          <Clock className="h-5 w-5 text-blue-600" />
                        </div>
                        <div>
                          <p className="text-sm text-gray-600">Age</p>
                          <p className="font-semibold">{athlete.age} years</p>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-4">
                      {athlete.strongFoot && (
                        <div className="flex items-center space-x-3">
                          <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                            <span className="font-bold text-blue-600">F</span>
                          </div>
                          <div>
                            <p className="text-sm text-gray-600">Strong Foot</p>
                            <p className="font-semibold">{athlete.strongFoot}</p>
                          </div>
                        </div>
                      )}
                      {athlete.battingStyle && (
                        <div className="flex items-center space-x-3">
                          <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                            <span className="font-bold text-blue-600">B</span>
                          </div>
                          <div>
                            <p className="text-sm text-gray-600">Batting Style</p>
                            <p className="font-semibold">{athlete.battingStyle}</p>
                          </div>
                        </div>
                      )}
                      {athlete.bowlingStyle && (
                        <div className="flex items-center space-x-3">
                          <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                            <span className="font-bold text-blue-600">B</span>
                          </div>
                          <div>
                            <p className="text-sm text-gray-600">Bowling Style</p>
                            <p className="font-semibold">{athlete.bowlingStyle}</p>
                          </div>
                        </div>
                      )}
                      {athlete.specialSkill && (
                        <div className="flex items-center space-x-3">
                          <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                            <span className="font-bold text-blue-600">S</span>
                          </div>
                          <div>
                            <p className="text-sm text-gray-600">Special Skill</p>
                            <p className="font-semibold">{athlete.specialSkill}</p>
                          </div>
                        </div>
                      )}
                    </div>

                    <div className="space-y-4">
                      {athlete.injuries && athlete.injuries.length > 0 && (
                        <div>
                          <div className="flex items-center space-x-2 mb-2">
                            <AlertTriangle className="h-5 w-5 text-amber-500" />
                            <h4 className="font-semibold">Injury History</h4>
                          </div>
                          <div className="space-y-2">
                            {athlete.injuries.map((injury, index) => (
                              <div key={index} className="flex items-start space-x-2 text-sm">
                                <div className="w-2 h-2 bg-amber-500 rounded-full mt-1.5"></div>
                                <div>
                                  <p className="font-medium">{injury.type}</p>
                                  <p className="text-gray-600">
                                    {injury.date} - {injury.status}
                                  </p>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                      {athlete.fitness && (
                        <div>
                          <div className="flex items-center space-x-2 mb-2">
                            <Heart className="h-5 w-5 text-green-500" />
                            <h4 className="font-semibold">Fitness Level</h4>
                          </div>
                          <div className="space-y-2">
                            {Object.entries(athlete.fitness).map(([key, value]) => (
                              <div key={key} className="flex justify-between text-sm">
                                <span className="text-gray-600 capitalize">
                                  {key.replace(/([A-Z])/g, " $1").trim()}
                                </span>
                                <span className="font-medium">{value}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Career Info */}
              <Card className="p-8">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2 text-xl">
                    <Briefcase className="h-6 w-6 text-purple-600" />
                    <span>Career Information</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center">
                          <Award className="h-5 w-5 text-purple-600" />
                        </div>
                        <div>
                          <p className="text-sm text-gray-600">Sport</p>
                          <p className="font-semibold">{athlete.sport}</p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center">
                          <Users className="h-5 w-5 text-purple-600" />
                        </div>
                        <div>
                          <p className="text-sm text-gray-600">Position</p>
                          <p className="font-semibold">{athlete.position}</p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center">
                          <MapPin className="h-5 w-5 text-purple-600" />
                        </div>
                        <div>
                          <p className="text-sm text-gray-600">Location</p>
                          <p className="font-semibold">{athlete.location}</p>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-4">
                      {athlete.experience && (
                        <div className="flex items-center space-x-3">
                          <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center">
                            <Clock className="h-5 w-5 text-purple-600" />
                          </div>
                          <div>
                            <p className="text-sm text-gray-600">Experience Level</p>
                            <p className="font-semibold">{athlete.experience}</p>
                          </div>
                        </div>
                      )}
                      {athlete.careerStart && (
                        <div className="flex items-center space-x-3">
                          <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center">
                            <Calendar className="h-5 w-5 text-purple-600" />
                          </div>
                          <div>
                            <p className="text-sm text-gray-600">Career Started</p>
                            <p className="font-semibold">{athlete.careerStart}</p>
                          </div>
                        </div>
                      )}
                      {athlete.coach && (
                        <div className="flex items-center space-x-3">
                          <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center">
                            <span className="font-bold text-purple-600">C</span>
                          </div>
                          <div>
                            <p className="text-sm text-gray-600">Coach</p>
                            <p className="font-semibold">{athlete.coach}</p>
                          </div>
                        </div>
                      )}
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center">
                          <Calendar className="h-5 w-5 text-purple-600" />
                        </div>
                        <div>
                          <p className="text-sm text-gray-600">Joined Platform</p>
                          <p className="font-semibold">{athlete.joinDate}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="stats">
            <div className="grid md:grid-cols-2 gap-8">
              {/* Game Statistics - Only visible to the profile owner */}
              {isOwnProfile && (
                <Card className="p-6">
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                      <Trophy className="h-6 w-6 text-yellow-600" />
                      <span>Game Statistics</span>
                    </CardTitle>
                    <p className="text-sm text-gray-600">
                      <span className="font-medium text-blue-600">Note:</span> These stats are pulled from your
                      dashboard and are only visible to you
                    </p>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {Object.entries(athlete.gameStats).map(([key, value]) => (
                      <div key={key} className="flex justify-between items-center">
                        <span className="text-gray-600 capitalize">{key.replace(/([A-Z])/g, " $1").trim()}</span>
                        <span className="font-bold text-lg">{value}</span>
                      </div>
                    ))}
                  </CardContent>
                </Card>
              )}

              {/* Public Profile Insights - Visible to everyone */}
              <Card className="p-6">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Users className="h-6 w-6 text-blue-600" />
                    <span>Profile Insights</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Profile Views (This Month)</span>
                    <span className="font-bold text-lg">2,456</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Scout Views</span>
                    <span className="font-bold text-lg">189</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Messages Received</span>
                    <span className="font-bold text-lg">67</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Opportunities</span>
                    <span className="font-bold text-lg">12</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Engagement Rate</span>
                    <span className="font-bold text-lg">8.4%</span>
                  </div>
                </CardContent>
              </Card>

              {/* Performance Metrics - Visible to everyone */}
              <Card className="p-6 md:col-span-2">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Activity className="h-6 w-6 text-green-600" />
                    <span>Performance Metrics</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid md:grid-cols-3 gap-6">
                    {athlete.sport === "Football" && (
                      <>
                        <div className="space-y-3">
                          <h4 className="font-semibold text-gray-700">Attacking</h4>
                          <div className="space-y-2">
                            <div className="flex justify-between">
                              <span className="text-gray-600">Goals</span>
                              <span className="font-medium">{athlete.gameStats.goals}</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-gray-600">Assists</span>
                              <span className="font-medium">{athlete.gameStats.assists}</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-gray-600">Shots on Target</span>
                              <span className="font-medium">{athlete.gameStats.shotsOnTarget}</span>
                            </div>
                          </div>
                        </div>
                        <div className="space-y-3">
                          <h4 className="font-semibold text-gray-700">Discipline</h4>
                          <div className="space-y-2">
                            <div className="flex justify-between">
                              <span className="text-gray-600">Yellow Cards</span>
                              <span className="font-medium">{athlete.gameStats.yellowCards}</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-gray-600">Red Cards</span>
                              <span className="font-medium">{athlete.gameStats.redCards}</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-gray-600">Matches Played</span>
                              <span className="font-medium">{athlete.gameStats.matchesPlayed}</span>
                            </div>
                          </div>
                        </div>
                        <div className="space-y-3">
                          <h4 className="font-semibold text-gray-700">Physical</h4>
                          <div className="space-y-2">
                            <div className="flex justify-between">
                              <span className="text-gray-600">Top Speed</span>
                              <span className="font-medium">{athlete.gameStats.topSpeed}</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-gray-600">Distance/Match</span>
                              <span className="font-medium">{athlete.gameStats.distanceCovered}</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-gray-600">Passing Accuracy</span>
                              <span className="font-medium">{athlete.gameStats.passingAccuracy}</span>
                            </div>
                          </div>
                        </div>
                      </>
                    )}
                    {athlete.sport === "Cricket" && (
                      <>
                        <div className="space-y-3">
                          <h4 className="font-semibold text-gray-700">Batting</h4>
                          <div className="space-y-2">
                            <div className="flex justify-between">
                              <span className="text-gray-600">Runs Scored</span>
                              <span className="font-medium">{athlete.gameStats.runsScored}</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-gray-600">Batting Average</span>
                              <span className="font-medium">{athlete.gameStats.battingAverage}</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-gray-600">Strike Rate</span>
                              <span className="font-medium">{athlete.gameStats.strikeRate}</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-gray-600">Highest Score</span>
                              <span className="font-medium">{athlete.gameStats.highestScore}</span>
                            </div>
                          </div>
                        </div>
                        <div className="space-y-3">
                          <h4 className="font-semibold text-gray-700">Bowling</h4>
                          <div className="space-y-2">
                            <div className="flex justify-between">
                              <span className="text-gray-600">Wickets Taken</span>
                              <span className="font-medium">{athlete.gameStats.wicketsTaken}</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-gray-600">Bowling Average</span>
                              <span className="font-medium">{athlete.gameStats.bowlingAverage}</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-gray-600">Economy Rate</span>
                              <span className="font-medium">{athlete.gameStats.economyRate}</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-gray-600">Best Bowling</span>
                              <span className="font-medium">{athlete.gameStats.bestBowling}</span>
                            </div>
                          </div>
                        </div>
                        <div className="space-y-3">
                          <h4 className="font-semibold text-gray-700">Fielding</h4>
                          <div className="space-y-2">
                            <div className="flex justify-between">
                              <span className="text-gray-600">Catches</span>
                              <span className="font-medium">{athlete.gameStats.catches}</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-gray-600">Matches Played</span>
                              <span className="font-medium">{athlete.gameStats.matchesPlayed}</span>
                            </div>
                          </div>
                        </div>
                      </>
                    )}
                    {athlete.sport === "Kabaddi" && (
                      <>
                        <div className="space-y-3">
                          <h4 className="font-semibold text-gray-700">Raiding</h4>
                          <div className="space-y-2">
                            <div className="flex justify-between">
                              <span className="text-gray-600">Successful Raids</span>
                              <span className="font-medium">{athlete.gameStats.successfulRaids}</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-gray-600">Raid Success Rate</span>
                              <span className="font-medium">{athlete.gameStats.raidSuccessRate}</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-gray-600">Super Raids</span>
                              <span className="font-medium">{athlete.gameStats.superRaids}</span>
                            </div>
                          </div>
                        </div>
                        <div className="space-y-3">
                          <h4 className="font-semibold text-gray-700">Defense</h4>
                          <div className="space-y-2">
                            <div className="flex justify-between">
                              <span className="text-gray-600">Tackle Points</span>
                              <span className="font-medium">{athlete.gameStats.tacklePoints}</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-gray-600">Bonus Points</span>
                              <span className="font-medium">{athlete.gameStats.bonusPoints}</span>
                            </div>
                          </div>
                        </div>
                        <div className="space-y-3">
                          <h4 className="font-semibold text-gray-700">Overall</h4>
                          <div className="space-y-2">
                            <div className="flex justify-between">
                              <span className="text-gray-600">Total Points</span>
                              <span className="font-medium">{athlete.gameStats.totalPoints}</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-gray-600">Avg Points/Match</span>
                              <span className="font-medium">{athlete.gameStats.averagePointsPerMatch}</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-gray-600">Matches Played</span>
                              <span className="font-medium">{athlete.gameStats.matchesPlayed}</span>
                            </div>
                          </div>
                        </div>
                      </>
                    )}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="achievements">
            <Card className="p-8">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="flex items-center space-x-2 text-2xl">
                    <Trophy className="h-8 w-8 text-yellow-600" />
                    <span>Achievements & Awards</span>
                  </CardTitle>
                  {isOwnProfile && (
                    <Dialog open={showAchievementDialog} onOpenChange={setShowAchievementDialog}>
                      <DialogTrigger asChild>
                        <Button className="flex items-center space-x-2">
                          <Plus className="h-4 w-4" />
                          <span>Add Achievement</span>
                        </Button>
                      </DialogTrigger>
                      <DialogContent>
                        <DialogHeader>
                          <DialogTitle>Add New Achievement</DialogTitle>
                        </DialogHeader>
                        <div className="space-y-4">
                          <Input
                            placeholder="Enter your achievement..."
                            value={newAchievement}
                            onChange={(e) => setNewAchievement(e.target.value)}
                          />
                          <div className="flex space-x-2">
                            <Button onClick={handleAddAchievement} className="flex-1">
                              Add Achievement
                            </Button>
                            <Button variant="outline" onClick={() => setShowAchievementDialog(false)}>
                              Cancel
                            </Button>
                          </div>
                        </div>
                      </DialogContent>
                    </Dialog>
                  )}
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4">
                  {achievements.map((achievement, index) => (
                    <div
                      key={index}
                      className="flex items-center space-x-4 p-4 bg-gradient-to-r from-yellow-50 to-orange-50 rounded-xl border border-yellow-200 group"
                    >
                      <div className="w-12 h-12 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full flex items-center justify-center">
                        <Trophy className="h-6 w-6 text-white" />
                      </div>
                      <div className="flex-1">
                        <span className="font-semibold text-lg">{achievement}</span>
                      </div>
                      <Badge className="bg-yellow-100 text-yellow-800">2023</Badge>
                      {isOwnProfile && (
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => removeAchievement(index)}
                          className="opacity-0 group-hover:opacity-100 transition-opacity"
                        >
                          ×
                        </Button>
                      )}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="clubs">
            <Card className="p-8">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="flex items-center space-x-2 text-2xl">
                    <Building className="h-8 w-8 text-blue-600" />
                    <span>Clubs & Academies</span>
                  </CardTitle>
                  {isOwnProfile && (
                    <Dialog open={showClubDialog} onOpenChange={setShowClubDialog}>
                      <DialogTrigger asChild>
                        <Button className="flex items-center space-x-2">
                          <Plus className="h-4 w-4" />
                          <span>Add Club</span>
                        </Button>
                      </DialogTrigger>
                      <DialogContent>
                        <DialogHeader>
                          <DialogTitle>Add New Club/Academy</DialogTitle>
                        </DialogHeader>
                        <div className="space-y-4">
                          <Input
                            placeholder="Enter club or academy name..."
                            value={newClub}
                            onChange={(e) => setNewClub(e.target.value)}
                          />
                          <div className="flex space-x-2">
                            <Button onClick={handleAddClub} className="flex-1">
                              Add Club
                            </Button>
                            <Button variant="outline" onClick={() => setShowClubDialog(false)}>
                              Cancel
                            </Button>
                          </div>
                        </div>
                      </DialogContent>
                    </Dialog>
                  )}
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4">
                  {clubs.map((club, index) => (
                    <div
                      key={index}
                      className="flex items-center space-x-4 p-4 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl border border-blue-200 group"
                    >
                      <div className="w-12 h-12 bg-gradient-to-br from-blue-400 to-indigo-500 rounded-full flex items-center justify-center">
                        <Building className="h-6 w-6 text-white" />
                      </div>
                      <div className="flex-1">
                        <span className="font-semibold text-lg">{club}</span>
                      </div>
                      <Badge className="bg-blue-100 text-blue-800">Active</Badge>
                      {isOwnProfile && (
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => removeClub(index)}
                          className="opacity-0 group-hover:opacity-100 transition-opacity"
                        >
                          ×
                        </Button>
                      )}
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
