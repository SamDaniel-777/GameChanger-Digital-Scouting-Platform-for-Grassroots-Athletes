"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { TrendingUp, Users, Target, Award, Globe, Heart, Star } from "lucide-react"
import Layout from "@/components/layout"

export default function AboutPage() {
  return (
    <Layout>
      <div className="max-w-4xl mx-auto">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center mb-6">
            <div className="flex items-center justify-center w-20 h-20 bg-gradient-to-br from-blue-600 to-gamechanger-purple rounded-3xl shadow-xl">
              <TrendingUp className="h-10 w-10 text-white" />
            </div>
          </div>
          <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-gamechanger-purple bg-clip-text text-transparent">
            About GameChanger
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Empowering grassroots athletes to showcase their skills, get discovered, and advance their careers through
            technology and community.
          </p>
        </div>

        {/* Mission Section */}
        <Card className="mb-8 border-2 border-blue-200 bg-gradient-to-br from-blue-50 to-gamechanger-purple-light">
          <CardHeader>
            <CardTitle className="flex items-center space-x-3 text-2xl">
              <Target className="h-8 w-8 text-blue-600" />
              <span>Our Mission</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-lg text-gray-700 leading-relaxed">
              We believe that talent exists everywhere, but opportunities don't. Our
              platform bridges that gap by providing athletes with the tools to showcase their skills and get
              discovered, regardless of their background or location.
            </p>
          </CardContent>
        </Card>

        {/* Real Stories Section with Videos */}
        <Card className="mb-8 border border-green-200 bg-green-50">
          <CardHeader>
            <CardTitle className="flex items-center space-x-3 text-2xl">
              <Star className="h-7 w-7 text-green-600" />
              <span>Real GameChangers</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="grid gap-6 text-gray-700">

            {/* Sabareesh - Real Madrid x Neymar Jr. */}
            <div className="bg-white p-4 rounded-xl shadow-md border border-gray-200 space-y-2">
              <strong className="text-lg font-bold text-green-800">Sabareesh (Football)</strong>
              <p className="italic text-sm text-green-600 font-medium">
                "Sabareesh, also known as the 'Nutmeg King' and the 'Indian Neymar of Futsal,' gained prominence for his skills and was featured by brands like Real Madrid and Neymar Jr.'s team."
              </p>
              <video 
                controls 
                className="mt-2 mx-auto rounded-xl shadow-lg w-[450px] h-[690px] object-cover"
              >
                <source src="/videos/carlos.mp4" type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            </div>

            {/* Sabareesh - Neymar Jr's Global Five */}
            <div className="bg-white p-4 rounded-xl shadow-md border border-gray-200 space-y-2">
              <strong className="text-lg font-bold text-green-800">Sabareesh (Football)</strong>
              <p className="italic text-sm text-green-600 font-medium">
                "Sabareesh will be repping India at Neymar Jr's Global Five! 😍🔥"
              </p>
              <video 
                controls 
                className="mt-2 mx-auto rounded-xl shadow-lg w-[450px] h-[570px] object-cover"
              >
                <source src="/videos/NEYMAR.mp4" type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            </div>

            {/* Sushila Meena */}
            <div className="bg-white p-4 rounded-xl shadow-md border border-gray-200 space-y-2">
              <strong className="text-lg font-bold text-blue-800">Sushila Meena (Cricket)</strong>
              <p className="italic text-sm text-blue-600 font-medium">
                "A raw reel of pace caught Sachin Tendulkar's eye — She is a young, talented bowler from Rajasthan who gained attention after a video of her bowling went viral and received praise from Sachin Tendulkar."
              </p>
              <video 
                controls 
                className="mt-2 mx-auto rounded-xl shadow-lg w-[450px] h-[570px] object-cover ring-2 ring-blue-300"
              >
                <source src="/videos/sushila_sachin_clip.mp4" type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            </div>

          </CardContent>
        </Card>


                {/* What We Do */}
                <div className="grid md:grid-cols-2 gap-8 mb-12">
          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <CardTitle className="flex items-center space-x-3">
                <Users className="h-6 w-6 text-gamechanger-green" />
                <span>For Athletes</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-gamechanger-green rounded-full mt-2"></div>
                  <p>Create comprehensive sports profiles with stats, achievements, and media</p>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-gamechanger-green rounded-full mt-2"></div>
                  <p>Share training videos, match highlights, and career updates</p>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-gamechanger-green rounded-full mt-2"></div>
                  <p>Connect directly with scouts, coaches, and other athletes</p>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-gamechanger-green rounded-full mt-2"></div>
                  <p>Access opportunities for trials, sponsorships, and career advancement</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <CardTitle className="flex items-center space-x-3">
                <Target className="h-6 w-6 text-gamechanger-purple" />
                <span>For Scouts & Coaches</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-gamechanger-purple rounded-full mt-2"></div>
                  <p>Discover talented athletes from diverse backgrounds and locations</p>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-gamechanger-purple rounded-full mt-2"></div>
                  <p>Access detailed performance data and video analysis</p>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-gamechanger-purple rounded-full mt-2"></div>
                  <p>Use advanced search and filtering to find specific talent</p>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-gamechanger-purple rounded-full mt-2"></div>
                  <p>Build relationships and track potential recruits</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Sports Supported */}
        <Card>
          <CardHeader>
            <CardTitle className="text-2xl">Sports We Support</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-3">
              {[
                "Football", "Cricket", "Kabaddi", "Basketball", "Volleyball", "Hockey", "Badminton",
                "Tennis", "Athletics", "Swimming", "Boxing", "Wrestling", "Weightlifting", "Cycling", "Table Tennis"
              ].map((sport) => (
                <Badge key={sport} variant="outline" className="text-sm py-2 px-4">
                  {sport}
                </Badge>
              ))}
            </div>
          </CardContent>
        </Card>

      </div>
    </Layout>
  )
}
