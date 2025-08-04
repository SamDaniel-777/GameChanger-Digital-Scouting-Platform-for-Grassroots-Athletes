"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Search, MapPin, Filter, UserPlus, MessageSquare } from "lucide-react"
import Layout from "@/components/layout"
import { useAuth } from "@/hooks/use-auth"

export default function SearchPage() {
  const { isAuthenticated } = useAuth()
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedSport, setSelectedSport] = useState("all")
  const [selectedLocation, setSelectedLocation] = useState("all")
  const [selectedLevel, setSelectedLevel] = useState("all")

  if (!isAuthenticated) {
    return (
      <Layout>
        <div className="text-center py-12">
          <h1 className="text-2xl font-bold mb-4">Please sign in to search</h1>
          <p className="text-gray-600">You need to be logged in to search for athletes and scouts.</p>
        </div>
      </Layout>
    )
  }

  const mockAthletes = [
    {
      id: 1,
      name: "Rahul Sharma",
      username: "@rahul_striker",
      avatar: "/placeholder.svg?height=60&width=60",
      sport: "Football",
      position: "Forward",
      location: "Mumbai, Maharashtra",
      level: "State",
      followers: 1234,
      achievements: ["District Champion 2023", "Best Player Award"],
      bio: "Passionate footballer with 8 years of experience",
    },
    {
      id: 2,
      name: "Priya Patel",
      username: "@priya_cricket",
      avatar: "/placeholder.svg?height=60&width=60",
      sport: "Cricket",
      position: "All-rounder",
      location: "Ahmedabad, Gujarat",
      level: "District",
      followers: 856,
      achievements: ["Top Scorer 2023", "MVP Award"],
      bio: "Cricket enthusiast aiming for national level",
    },
    {
      id: 3,
      name: "Arjun Singh",
      username: "@arjun_kabaddi",
      avatar: "/placeholder.svg?height=60&width=60",
      sport: "Kabaddi",
      position: "Raider",
      location: "Delhi, Delhi",
      level: "National",
      followers: 2341,
      achievements: ["National Championship 2023", "Best Raider"],
      bio: "Professional kabaddi player representing Delhi",
    },
    {
      id: 4,
      name: "Sneha Reddy",
      username: "@sneha_volleyball",
      avatar: "/placeholder.svg?height=60&width=60",
      sport: "Volleyball",
      position: "Spiker",
      location: "Hyderabad, Telangana",
      level: "State",
      followers: 678,
      achievements: ["State Championship 2023"],
      bio: "Volleyball player with strong attacking skills",
    },
  ]

  const mockScouts = [
    {
      id: 1,
      name: "Coach Rajesh Kumar",
      username: "@coach_rajesh",
      avatar: "/placeholder.svg?height=60&width=60",
      club: "Mumbai FC Academy",
      specialization: "Football",
      experience: "15+ years",
      location: "Mumbai, Maharashtra",
      athletes_discovered: 45,
      bio: "Experienced football coach specializing in youth development",
    },
    {
      id: 2,
      name: "Meera Gupta",
      username: "@scout_meera",
      avatar: "/placeholder.svg?height=60&width=60",
      club: "Cricket Excellence Academy",
      specialization: "Cricket",
      experience: "10+ years",
      location: "Bangalore, Karnataka",
      athletes_discovered: 32,
      bio: "Cricket scout with focus on finding emerging talent",
    },
    {
      id: 3,
      name: "Vikram Yadav",
      username: "@vikram_scout",
      avatar: "/placeholder.svg?height=60&width=60",
      club: "Pro Kabaddi Scouts",
      specialization: "Kabaddi",
      experience: "8+ years",
      location: "Jaipur, Rajasthan",
      athletes_discovered: 28,
      bio: "Kabaddi talent scout for professional leagues",
    },
  ]

  const filteredAthletes = mockAthletes.filter((athlete) => {
    const matchesSearch =
      athlete.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      athlete.sport.toLowerCase().includes(searchQuery.toLowerCase()) ||
      athlete.position.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesSport = selectedSport === "all" || athlete.sport.toLowerCase() === selectedSport
    const matchesLocation = selectedLocation === "all" || athlete.location.includes(selectedLocation)
    const matchesLevel = selectedLevel === "all" || athlete.level.toLowerCase() === selectedLevel

    return matchesSearch && matchesSport && matchesLocation && matchesLevel
  })

  const filteredScouts = mockScouts.filter((scout) => {
    const matchesSearch =
      scout.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      scout.club.toLowerCase().includes(searchQuery.toLowerCase()) ||
      scout.specialization.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesSport = selectedSport === "all" || scout.specialization.toLowerCase() === selectedSport
    const matchesLocation = selectedLocation === "all" || scout.location.includes(selectedLocation)

    return matchesSearch && matchesSport && matchesLocation
  })

  return (
    <Layout>
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <h1 className="text-2xl font-bold mb-4">Discover Talent</h1>

          {/* Search Bar */}
          <div className="relative mb-6">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
            <Input
              placeholder="Search athletes, scouts, sports..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 pr-4 py-3 text-lg"
            />
          </div>

          {/* Filters */}
          <div className="flex flex-wrap gap-4 mb-6">
            <Select value={selectedSport} onValueChange={setSelectedSport}>
              <SelectTrigger className="w-40">
                <SelectValue placeholder="Sport" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Sports</SelectItem>
                <SelectItem value="football">Football</SelectItem>
                <SelectItem value="cricket">Cricket</SelectItem>
                <SelectItem value="kabaddi">Kabaddi</SelectItem>
                <SelectItem value="volleyball">Volleyball</SelectItem>
                <SelectItem value="basketball">Basketball</SelectItem>
              </SelectContent>
            </Select>

            <Select value={selectedLocation} onValueChange={setSelectedLocation}>
              <SelectTrigger className="w-40">
                <SelectValue placeholder="Location" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Locations</SelectItem>
                <SelectItem value="Mumbai">Mumbai</SelectItem>
                <SelectItem value="Delhi">Delhi</SelectItem>
                <SelectItem value="Bangalore">Bangalore</SelectItem>
                <SelectItem value="Chennai">Chennai</SelectItem>
                <SelectItem value="Hyderabad">Hyderabad</SelectItem>
              </SelectContent>
            </Select>

            <Select value={selectedLevel} onValueChange={setSelectedLevel}>
              <SelectTrigger className="w-40">
                <SelectValue placeholder="Level" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Levels</SelectItem>
                <SelectItem value="district">District</SelectItem>
                <SelectItem value="state">State</SelectItem>
                <SelectItem value="national">National</SelectItem>
                <SelectItem value="international">International</SelectItem>
              </SelectContent>
            </Select>

            <Button variant="outline" className="flex items-center space-x-2">
              <Filter className="h-4 w-4" />
              <span>More Filters</span>
            </Button>
          </div>
        </div>

        <Tabs defaultValue="athletes" className="space-y-6">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="athletes">Athletes ({filteredAthletes.length})</TabsTrigger>
            <TabsTrigger value="scouts">Scouts ({filteredScouts.length})</TabsTrigger>
          </TabsList>

          <TabsContent value="athletes" className="space-y-6">
            {filteredAthletes.length === 0 ? (
              <Card className="p-8 text-center">
                <Search className="h-12 w-12 mx-auto mb-4 text-gray-400" />
                <h3 className="text-lg font-semibold mb-2">No athletes found</h3>
                <p className="text-gray-600">Try adjusting your search criteria or filters.</p>
              </Card>
            ) : (
              <div className="grid gap-6">
                {filteredAthletes.map((athlete) => (
                  <Card key={athlete.id} className="p-6 hover:shadow-lg transition-shadow">
                    <div className="flex items-start space-x-4">
                      <Avatar className="h-16 w-16">
                        <AvatarImage src={athlete.avatar || "/placeholder.svg"} alt={athlete.name} />
                        <AvatarFallback>
                          {athlete.name
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </AvatarFallback>
                      </Avatar>

                      <div className="flex-1">
                        <div className="flex items-start justify-between">
                          <div>
                            <h3 className="text-xl font-bold">{athlete.name}</h3>
                            <p className="text-gray-600">{athlete.username}</p>
                            <div className="flex items-center space-x-2 mt-2">
                              <Badge>{athlete.sport}</Badge>
                              <Badge variant="outline">{athlete.position}</Badge>
                              <Badge variant="secondary">{athlete.level} Level</Badge>
                            </div>
                            <div className="flex items-center space-x-4 mt-2 text-sm text-gray-600">
                              <div className="flex items-center space-x-1">
                                <MapPin className="h-4 w-4" />
                                <span>{athlete.location}</span>
                              </div>
                              <span>•</span>
                              <span>{athlete.followers} followers</span>
                            </div>
                          </div>

                          <div className="flex items-center space-x-2">
                            <Button variant="outline" size="sm">
                              <UserPlus className="h-4 w-4 mr-2" />
                              Follow
                            </Button>
                            <Button size="sm">
                              <MessageSquare className="h-4 w-4 mr-2" />
                              Message
                            </Button>
                          </div>
                        </div>

                        <p className="text-gray-700 mt-3">{athlete.bio}</p>

                        <div className="mt-4">
                          <h4 className="font-semibold text-sm mb-2">Recent Achievements:</h4>
                          <div className="flex flex-wrap gap-2">
                            {athlete.achievements.map((achievement, index) => (
                              <Badge key={index} variant="outline" className="text-xs">
                                {achievement}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            )}
          </TabsContent>

          <TabsContent value="scouts" className="space-y-6">
            {filteredScouts.length === 0 ? (
              <Card className="p-8 text-center">
                <Search className="h-12 w-12 mx-auto mb-4 text-gray-400" />
                <h3 className="text-lg font-semibold mb-2">No scouts found</h3>
                <p className="text-gray-600">Try adjusting your search criteria or filters.</p>
              </Card>
            ) : (
              <div className="grid gap-6">
                {filteredScouts.map((scout) => (
                  <Card key={scout.id} className="p-6 hover:shadow-lg transition-shadow">
                    <div className="flex items-start space-x-4">
                      <Avatar className="h-16 w-16">
                        <AvatarImage src={scout.avatar || "/placeholder.svg"} alt={scout.name} />
                        <AvatarFallback>
                          {scout.name
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </AvatarFallback>
                      </Avatar>

                      <div className="flex-1">
                        <div className="flex items-start justify-between">
                          <div>
                            <h3 className="text-xl font-bold">{scout.name}</h3>
                            <p className="text-gray-600">{scout.username}</p>
                            <p className="font-semibold text-blue-600 mt-1">{scout.club}</p>
                            <div className="flex items-center space-x-2 mt-2">
                              <Badge>{scout.specialization}</Badge>
                              <Badge variant="outline">{scout.experience}</Badge>
                            </div>
                            <div className="flex items-center space-x-4 mt-2 text-sm text-gray-600">
                              <div className="flex items-center space-x-1">
                                <MapPin className="h-4 w-4" />
                                <span>{scout.location}</span>
                              </div>
                              <span>•</span>
                              <span>{scout.athletes_discovered} athletes discovered</span>
                            </div>
                          </div>

                          <div className="flex items-center space-x-2">
                            <Button variant="outline" size="sm">
                              <UserPlus className="h-4 w-4 mr-2" />
                              Connect
                            </Button>
                            <Button size="sm">
                              <MessageSquare className="h-4 w-4 mr-2" />
                              Message
                            </Button>
                          </div>
                        </div>

                        <p className="text-gray-700 mt-3">{scout.bio}</p>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  )
}
