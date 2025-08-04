"use client"

import { Dialog, DialogContent } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { TrendingUp, Users, Target } from "lucide-react"

interface JoinPopupProps {
  isOpen: boolean
  onClose: () => void
  onSelectType: (type: "athlete" | "scout") => void
}

export default function JoinPopup({ isOpen, onClose, onSelectType }: JoinPopupProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl p-0 overflow-hidden">
        <div className="bg-gradient-to-br from-blue-600 via-purple-600 to-indigo-700 p-8 text-white text-center">
          <div className="flex items-center justify-center mb-4">
            <TrendingUp className="h-12 w-12 mr-3" />
            <h1 className="text-3xl font-bold">GAMECHANGER</h1>
          </div>
          <p className="text-xl mb-2">Where Dreams Meet Opportunities</p>
          <p className="text-blue-100">Join thousands of athletes and scouts already making their mark</p>
        </div>

        <div className="p-8">
          <h2 className="text-2xl font-bold text-center mb-8">Choose Your Path</h2>

          <div className="grid md:grid-cols-2 gap-6">
            {/* Athlete Card */}
            <Card
              className="p-6 cursor-pointer hover:shadow-xl transition-all duration-300 border-2 hover:border-blue-500 group"
              onClick={() => onSelectType("athlete")}
            >
              <div className="text-center">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-blue-200 transition-colors">
                  <Users className="h-8 w-8 text-blue-600" />
                </div>
                <h3 className="text-xl font-bold mb-3">I'm an Athlete</h3>
                <p className="text-gray-600 mb-4">
                  Showcase your skills, get discovered by scouts, and advance your career
                </p>

                <div className="space-y-2 text-sm text-left">
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <span>Create your sports profile</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <span>Share training videos & highlights</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <span>Connect with scouts & coaches</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <span>Get sponsorship opportunities</span>
                  </div>
                </div>

                <Button className="w-full mt-6 bg-blue-600 hover:bg-blue-700">Start Your Journey</Button>
              </div>
            </Card>

            {/* Scout Card */}
            <Card
              className="p-6 cursor-pointer hover:shadow-xl transition-all duration-300 border-2 hover:border-purple-500 group"
              onClick={() => onSelectType("scout")}
            >
              <div className="text-center">
                <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-purple-200 transition-colors">
                  <Target className="h-8 w-8 text-purple-600" />
                </div>
                <h3 className="text-xl font-bold mb-3">I'm a Scout/Coach</h3>
                <p className="text-gray-600 mb-4">
                  Discover talented athletes, build your network, and find the next sports stars
                </p>

                <div className="space-y-2 text-sm text-left">
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <span>Browse athlete profiles & videos</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <span>Advanced search & filtering</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <span>Direct messaging with athletes</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <span>Talent tracking & notes</span>
                  </div>
                </div>

                <Button className="w-full mt-6 bg-purple-600 hover:bg-purple-700">Find Talent</Button>
              </div>
            </Card>
          </div>

          <div className="text-center mt-8">
            <p className="text-sm text-gray-500">
              Already have an account?
              <button className="text-blue-600 hover:underline ml-1">Sign in here</button>
            </p>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
