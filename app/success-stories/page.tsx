"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Trophy, Star, TrendingUp, Quote } from "lucide-react"
import Layout from "@/components/layout"

export default function SuccessStoriesPage() {
  const successStories = [
    {
      id: 1,
      name: "Ravi Kumar",
      sport: "Football",
      position: "Striker",
      location: "Chennai, Tamil Nadu",
      avatar: "/placeholder.svg?height=80&width=80",
      story:
        "From playing on dusty village grounds to signing with Chennai FC's senior team, GameChanger helped me showcase my skills to the right scouts. The platform's video analysis feature helped me improve my technique, and within 6 months, I was discovered by a professional scout.",
      achievement: "Signed with Chennai FC",
      beforeAfter: {
        before: "Village-level player",
        after: "Professional footballer",
      },
      timeframe: "6 months",
      quote: "GameChanger didn't just change my game, it changed my life. From a small village to the big leagues!",
    },
    {
      id: 2,
      name: "Sneha Reddy",
      sport: "Cricket",
      position: "All-rounder",
      location: "Hyderabad, Telangana",
      avatar: "/placeholder.svg?height=80&width=80",
      story:
        "As a woman in cricket, finding opportunities was challenging. GameChanger's platform helped me connect with women's cricket scouts and coaches. My consistent posting of training videos and match highlights caught the attention of the Hyderabad Women's Cricket Association.",
      achievement: "Selected for State Women's Team",
      beforeAfter: {
        before: "Local club player",
        after: "State team captain",
      },
      timeframe: "8 months",
      quote:
        "The platform gave me a voice and visibility in women's cricket. Now I'm inspiring other girls to follow their dreams!",
    },
    {
      id: 3,
      name: "Arjun Patel",
      sport: "Kabaddi",
      position: "Raider",
      location: "Ahmedabad, Gujarat",
      avatar: "/placeholder.svg?height=80&width=80",
      story:
        "Kabaddi was my passion but lacked exposure. Through GameChanger, I connected with Pro Kabaddi League scouts who were specifically looking for raiders with my skill set. The platform's detailed stats tracking helped me present my performance data professionally.",
      achievement: "Drafted by Gujarat Giants (PKL)",
      beforeAfter: {
        before: "District-level player",
        after: "Pro Kabaddi League player",
      },
      timeframe: "4 months",
      quote:
        "GameChanger made kabaddi accessible to scouts who never would have found me otherwise. Dreams do come true!",
    },
    {
      id: 4,
      name: "Priya Sharma",
      sport: "Basketball",
      position: "Point Guard",
      location: "Delhi, Delhi",
      avatar: "/placeholder.svg?height=80&width=80",
      story:
        "Basketball in India needed more visibility, especially for women. GameChanger's community helped me connect with international scouts. My highlight reels and consistent performance tracking led to a scholarship offer from a US college basketball program.",
      achievement: "US College Basketball Scholarship",
      beforeAfter: {
        before: "School team player",
        after: "International scholarship recipient",
      },
      timeframe: "1 year",
      quote: "From Delhi courts to American colleges - GameChanger opened doors I never knew existed!",
    },
  ]

  return (
    <Layout>
      <div className="max-w-6xl mx-auto">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center mb-6">
            <div className="flex items-center justify-center w-20 h-20 bg-gradient-to-br from-gamechanger-green to-yellow-500 rounded-3xl shadow-xl">
              <Trophy className="h-10 w-10 text-white" />
            </div>
          </div>
          <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-gamechanger-green to-yellow-600 bg-clip-text text-transparent">
            Success Stories
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Real athletes, real dreams, real success. Discover how GameChanger has transformed the careers of grassroots
            athletes across India and beyond.
          </p>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12">
          <Card className="text-center p-6 bg-gradient-to-br from-gamechanger-green-light to-green-50">
            <div className="text-3xl font-bold text-gamechanger-green">890+</div>
            <div className="text-sm text-gray-600 mt-1">Success Stories</div>
          </Card>
          <Card className="text-center p-6 bg-gradient-to-br from-blue-50 to-blue-100">
            <div className="text-3xl font-bold text-blue-600">156</div>
            <div className="text-sm text-gray-600 mt-1">Professional Contracts</div>
          </Card>
          <Card className="text-center p-6 bg-gradient-to-br from-gamechanger-purple-light to-purple-100">
            <div className="text-3xl font-bold text-gamechanger-purple">234</div>
            <div className="text-sm text-gray-600 mt-1">Scholarships Awarded</div>
          </Card>
          <Card className="text-center p-6 bg-gradient-to-br from-yellow-50 to-orange-100">
            <div className="text-3xl font-bold text-orange-600">67</div>
            <div className="text-sm text-gray-600 mt-1">National Team Selections</div>
          </Card>
        </div>

        {/* Success Stories Grid */}
        <div className="space-y-8">
          {successStories.map((story, index) => (
            <Card key={story.id} className="overflow-hidden hover:shadow-xl transition-all duration-300">
              <CardContent className="p-8">
                <div className="flex flex-col lg:flex-row gap-8">
                  {/* Profile Section */}
                  <div className="lg:w-1/3">
                    <div className="text-center lg:text-left">
                      <Avatar className="h-20 w-20 mx-auto lg:mx-0 mb-4 ring-4 ring-gamechanger-green/20">
                        <AvatarImage src={story.avatar || "/placeholder.svg"} alt={story.name} />
                        <AvatarFallback className="bg-gradient-to-br from-gamechanger-green to-green-600 text-white text-xl">
                          {story.name
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </AvatarFallback>
                      </Avatar>
                      <h3 className="text-xl font-bold mb-2">{story.name}</h3>
                      <div className="flex flex-wrap gap-2 justify-center lg:justify-start mb-4">
                        <Badge className="bg-gamechanger-green text-white">{story.sport}</Badge>
                        <Badge variant="outline">{story.position}</Badge>
                      </div>
                      <p className="text-gray-600 text-sm mb-4">{story.location}</p>

                      {/* Achievement Highlight */}
                      <div className="bg-gradient-to-r from-gamechanger-green-light to-green-50 p-4 rounded-xl mb-4">
                        <div className="flex items-center justify-center lg:justify-start space-x-2 mb-2">
                          <Star className="h-5 w-5 text-gamechanger-green" />
                          <span className="font-semibold text-gamechanger-green">Achievement</span>
                        </div>
                        <p className="font-bold text-gray-800">{story.achievement}</p>
                      </div>

                      {/* Before/After */}
                      <div className="space-y-3">
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-gray-500">Before:</span>
                          <span className="font-medium">{story.beforeAfter.before}</span>
                        </div>
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-gray-500">After:</span>
                          <span className="font-medium text-gamechanger-green">{story.beforeAfter.after}</span>
                        </div>
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-gray-500">Timeframe:</span>
                          <span className="font-medium">{story.timeframe}</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Story Content */}
                  <div className="lg:w-2/3">
                    <div className="mb-6">
                      <h4 className="text-lg font-semibold mb-4 flex items-center space-x-2">
                        <TrendingUp className="h-5 w-5 text-gamechanger-green" />
                        <span>Journey to Success</span>
                      </h4>
                      <p className="text-gray-700 leading-relaxed text-lg">{story.story}</p>
                    </div>

                    {/* Quote */}
                    <div className="bg-gradient-to-r from-blue-50 to-gamechanger-purple-light p-6 rounded-xl border-l-4 border-gamechanger-purple">
                      <div className="flex items-start space-x-3">
                        <Quote className="h-6 w-6 text-gamechanger-purple mt-1 flex-shrink-0" />
                        <div>
                          <p className="text-gray-800 italic text-lg leading-relaxed">"{story.quote}"</p>
                          <p className="text-gamechanger-purple font-semibold mt-2">- {story.name}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Call to Action */}
        <Card className="mt-12 bg-gradient-to-r from-gamechanger-green to-blue-600 text-white">
          <CardContent className="p-8 text-center">
            <Trophy className="h-16 w-16 mx-auto mb-6 text-white" />
            <h3 className="text-2xl font-bold mb-4">Ready to Write Your Success Story?</h3>
            <p className="text-xl mb-8 text-green-100">
              Join thousands of athletes who have transformed their careers through GameChanger
            </p>
            <div className="flex justify-center space-x-4">
              <button className="bg-white text-gamechanger-green px-8 py-3 rounded-xl font-bold hover:bg-gray-100 transition-colors">
                Start Your Journey
              </button>
              <button className="border-2 border-white text-white px-8 py-3 rounded-xl font-bold hover:bg-white hover:text-gamechanger-green transition-colors">
                Learn More
              </button>
            </div>
          </CardContent>
        </Card>
      </div>
    </Layout>
  )
}
