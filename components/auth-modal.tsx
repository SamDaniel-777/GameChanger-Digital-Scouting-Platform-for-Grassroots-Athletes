"use client"

import { useState } from "react"
import { Dialog, DialogContent } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Upload, ArrowRight, ArrowLeft } from "lucide-react"
import { useAuth } from "@/hooks/use-auth"

interface AuthModalProps {
  isOpen: boolean
  onClose: () => void
  type: "signin" | "athlete" | "scout"
}

export default function AuthModal({ isOpen, onClose, type }: AuthModalProps) {
  const { login } = useAuth()
  const [currentStep, setCurrentStep] = useState(1)
  const [formData, setFormData] = useState({
    // Common fields
    email: "",
    password: "",
    name: "",
    phone: "",
    location: "",
    profilePhoto: null as File | null,

    // Athlete specific
    sport: "",
    position: "",
    experience: "",
    achievements: "",
    stats: "",
    strongFoot: "",
    height: "",
    weight: "",

    // Scout specific
    clubName: "",
    coachingStyle: "",
    experience_years: "",
    specialization: "",
    requirements: "",
  })

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const handleFileUpload = (file: File) => {
    setFormData((prev) => ({ ...prev, profilePhoto: file }))
  }

  const handleNext = () => {
    setCurrentStep((prev) => prev + 1)
  }

  const handlePrevious = () => {
    setCurrentStep((prev) => prev - 1)
  }

  const handleSubmit = () => {
    // Create user object based on type
    const userData = {
      id: Date.now().toString(),
      name: formData.name,
      email: formData.email,
      type: type === "athlete" ? "athlete" : "scout",
      ...formData,
    }

    // Save to localStorage and login
    localStorage.setItem("gamechangerUser", JSON.stringify(userData))
    login(userData)
    onClose()
    setCurrentStep(1)
    setFormData({
      email: "",
      password: "",
      name: "",
      phone: "",
      location: "",
      profilePhoto: null,
      sport: "",
      position: "",
      experience: "",
      achievements: "",
      stats: "",
      strongFoot: "",
      height: "",
      weight: "",
      clubName: "",
      coachingStyle: "",
      experience_years: "",
      specialization: "",
      requirements: "",
    })
  }

  const handleSignIn = () => {
    // Simple sign in logic - in real app, validate against backend
    const userData = {
      id: "1",
      name: formData.name || "Demo User",
      email: formData.email,
      type: "athlete",
    }
    login(userData)
    onClose()
  }

  const renderSignIn = () => (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-bold">Welcome Back</h2>
        <p className="text-gray-600 mt-2">Sign in to your GameChanger account</p>
      </div>

      <div className="space-y-4">
        <div>
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            type="email"
            value={formData.email}
            onChange={(e) => handleInputChange("email", e.target.value)}
            placeholder="Enter your email"
          />
        </div>
        <div>
          <Label htmlFor="password">Password</Label>
          <Input
            id="password"
            type="password"
            value={formData.password}
            onChange={(e) => handleInputChange("password", e.target.value)}
            placeholder="Enter your password"
          />
        </div>
      </div>

      <Button onClick={handleSignIn} className="w-full">
        Sign In
      </Button>

      <div className="text-center">
        <p className="text-sm text-gray-600">
          Don't have an account?{" "}
          <button className="text-blue-600 hover:underline">Sign up as an athlete or scout</button>
        </p>
      </div>
    </div>
  )

  const renderAthleteFlow = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-6">
            <div className="text-center">
              <h2 className="text-2xl font-bold">Start Your Journey</h2>
              <p className="text-gray-600 mt-2">Step 1 of 4: Personal Details</p>
            </div>

            <div className="space-y-4">
              <div>
                <Label htmlFor="name">Full Name</Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) => handleInputChange("name", e.target.value)}
                  placeholder="Enter your full name"
                />
              </div>
              <div>
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => handleInputChange("email", e.target.value)}
                  placeholder="Enter your email"
                />
              </div>
              <div>
                <Label htmlFor="phone">Phone Number</Label>
                <Input
                  id="phone"
                  value={formData.phone}
                  onChange={(e) => handleInputChange("phone", e.target.value)}
                  placeholder="Enter your phone number"
                />
              </div>
              <div>
                <Label htmlFor="location">Location</Label>
                <Input
                  id="location"
                  value={formData.location}
                  onChange={(e) => handleInputChange("location", e.target.value)}
                  placeholder="City, State"
                />
              </div>
              <div>
                <Label>Profile Photo</Label>
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                  <Upload className="h-8 w-8 mx-auto mb-2 text-gray-400" />
                  <p className="text-sm text-gray-600">Click to upload or drag and drop</p>
                  <input
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={(e) => e.target.files?.[0] && handleFileUpload(e.target.files[0])}
                  />
                </div>
              </div>
            </div>

            <Button onClick={handleNext} className="w-full">
              Next <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        )

      case 2:
        return (
          <div className="space-y-6">
            <div className="text-center">
              <h2 className="text-2xl font-bold">Game Details</h2>
              <p className="text-gray-600 mt-2">Step 2 of 4: Tell us about your sport</p>
            </div>

            <div className="space-y-4">
              <div>
                <Label>Sport</Label>
                <Select value={formData.sport} onValueChange={(value) => handleInputChange("sport", value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select your sport" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="football">Football</SelectItem>
                    <SelectItem value="cricket">Cricket</SelectItem>
                    <SelectItem value="kabaddi">Kabaddi</SelectItem>
                    <SelectItem value="basketball">Basketball</SelectItem>
                    <SelectItem value="volleyball">Volleyball</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label>Position</Label>
                <Input
                  value={formData.position}
                  onChange={(e) => handleInputChange("position", e.target.value)}
                  placeholder="e.g., Forward, Midfielder, Goalkeeper"
                />
              </div>
              <div>
                <Label>Experience Level</Label>
                <Select value={formData.experience} onValueChange={(value) => handleInputChange("experience", value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select experience level" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="beginner">Beginner (0-2 years)</SelectItem>
                    <SelectItem value="intermediate">Intermediate (2-5 years)</SelectItem>
                    <SelectItem value="advanced">Advanced (5+ years)</SelectItem>
                    <SelectItem value="professional">Semi-Professional</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              {formData.sport === "football" && (
                <div>
                  <Label>Strong Foot</Label>
                  <Select value={formData.strongFoot} onValueChange={(value) => handleInputChange("strongFoot", value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select strong foot" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="left">Left</SelectItem>
                      <SelectItem value="right">Right</SelectItem>
                      <SelectItem value="both">Both</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              )}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label>Height (cm)</Label>
                  <Input
                    value={formData.height}
                    onChange={(e) => handleInputChange("height", e.target.value)}
                    placeholder="170"
                  />
                </div>
                <div>
                  <Label>Weight (kg)</Label>
                  <Input
                    value={formData.weight}
                    onChange={(e) => handleInputChange("weight", e.target.value)}
                    placeholder="65"
                  />
                </div>
              </div>
            </div>

            <div className="flex space-x-4">
              <Button variant="outline" onClick={handlePrevious} className="flex-1">
                <ArrowLeft className="mr-2 h-4 w-4" /> Previous
              </Button>
              <Button onClick={handleNext} className="flex-1">
                Next <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </div>
        )

      case 3:
        return (
          <div className="space-y-6">
            <div className="text-center">
              <h2 className="text-2xl font-bold">Achievements & Stats</h2>
              <p className="text-gray-600 mt-2">Step 3 of 4: Showcase your accomplishments</p>
            </div>

            <div className="space-y-4">
              <div>
                <Label>Achievements</Label>
                <Textarea
                  value={formData.achievements}
                  onChange={(e) => handleInputChange("achievements", e.target.value)}
                  placeholder="List your major achievements, awards, tournaments won..."
                  rows={4}
                />
              </div>
              <div>
                <Label>Career Stats</Label>
                <Textarea
                  value={formData.stats}
                  onChange={(e) => handleInputChange("stats", e.target.value)}
                  placeholder="Share your key statistics (goals scored, matches played, etc.)"
                  rows={3}
                />
              </div>
            </div>

            <div className="flex space-x-4">
              <Button variant="outline" onClick={handlePrevious} className="flex-1">
                <ArrowLeft className="mr-2 h-4 w-4" /> Previous
              </Button>
              <Button onClick={handleNext} className="flex-1">
                Next <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </div>
        )

      case 4:
        return (
          <div className="space-y-6">
            <div className="text-center">
              <h2 className="text-2xl font-bold">Welcome to GameChanger!</h2>
              <p className="text-gray-600 mt-2">Step 4 of 4: You're almost ready</p>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>How GameChanger Works</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-start space-x-3">
                  <div className="w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-bold">
                    1
                  </div>
                  <div>
                    <h4 className="font-semibold">Create Your Profile</h4>
                    <p className="text-sm text-gray-600">Showcase your skills, stats, and achievements</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-bold">
                    2
                  </div>
                  <div>
                    <h4 className="font-semibold">Share Your Journey</h4>
                    <p className="text-sm text-gray-600">Post videos, photos, and updates about your progress</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-bold">
                    3
                  </div>
                  <div>
                    <h4 className="font-semibold">Get Discovered</h4>
                    <p className="text-sm text-gray-600">Connect with scouts, coaches, and sponsors</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-bold">
                    4
                  </div>
                  <div>
                    <h4 className="font-semibold">Advance Your Career</h4>
                    <p className="text-sm text-gray-600">Get opportunities, training, and sponsorships</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <div className="flex space-x-4">
              <Button variant="outline" onClick={handlePrevious} className="flex-1">
                <ArrowLeft className="mr-2 h-4 w-4" /> Previous
              </Button>
              <Button onClick={handleSubmit} className="flex-1 bg-green-600 hover:bg-green-700">
                Join GameChanger!
              </Button>
            </div>
          </div>
        )

      default:
        return null
    }
  }

  const renderScoutFlow = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-6">
            <div className="text-center">
              <h2 className="text-2xl font-bold">Find Talent</h2>
              <p className="text-gray-600 mt-2">Step 1 of 3: Personal Details</p>
            </div>

            <div className="space-y-4">
              <div>
                <Label htmlFor="name">Full Name</Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) => handleInputChange("name", e.target.value)}
                  placeholder="Enter your full name"
                />
              </div>
              <div>
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => handleInputChange("email", e.target.value)}
                  placeholder="Enter your email"
                />
              </div>
              <div>
                <Label htmlFor="clubName">Club/Organization</Label>
                <Input
                  id="clubName"
                  value={formData.clubName}
                  onChange={(e) => handleInputChange("clubName", e.target.value)}
                  placeholder="Enter your club or organization name"
                />
              </div>
              <div>
                <Label htmlFor="location">Location</Label>
                <Input
                  id="location"
                  value={formData.location}
                  onChange={(e) => handleInputChange("location", e.target.value)}
                  placeholder="City, State"
                />
              </div>
            </div>

            <Button onClick={handleNext} className="w-full">
              Next <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        )

      case 2:
        return (
          <div className="space-y-6">
            <div className="text-center">
              <h2 className="text-2xl font-bold">Coaching Details</h2>
              <p className="text-gray-600 mt-2">Step 2 of 3: Tell us about your expertise</p>
            </div>

            <div className="space-y-4">
              <div>
                <Label>Specialization</Label>
                <Select
                  value={formData.specialization}
                  onValueChange={(value) => handleInputChange("specialization", value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select your specialization" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="football">Football</SelectItem>
                    <SelectItem value="cricket">Cricket</SelectItem>
                    <SelectItem value="kabaddi">Kabaddi</SelectItem>
                    <SelectItem value="basketball">Basketball</SelectItem>
                    <SelectItem value="volleyball">Volleyball</SelectItem>
                    <SelectItem value="multi-sport">Multi-Sport</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label>Years of Experience</Label>
                <Select
                  value={formData.experience_years}
                  onValueChange={(value) => handleInputChange("experience_years", value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select experience" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1-3">1-3 years</SelectItem>
                    <SelectItem value="4-7">4-7 years</SelectItem>
                    <SelectItem value="8-15">8-15 years</SelectItem>
                    <SelectItem value="15+">15+ years</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label>Coaching Style</Label>
                <Textarea
                  value={formData.coachingStyle}
                  onChange={(e) => handleInputChange("coachingStyle", e.target.value)}
                  placeholder="Describe your coaching philosophy and style..."
                  rows={3}
                />
              </div>
            </div>

            <div className="flex space-x-4">
              <Button variant="outline" onClick={handlePrevious} className="flex-1">
                <ArrowLeft className="mr-2 h-4 w-4" /> Previous
              </Button>
              <Button onClick={handleNext} className="flex-1">
                Next <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </div>
        )

      case 3:
        return (
          <div className="space-y-6">
            <div className="text-center">
              <h2 className="text-2xl font-bold">Talent Requirements</h2>
              <p className="text-gray-600 mt-2">Step 3 of 3: What are you looking for?</p>
            </div>

            <div className="space-y-4">
              <div>
                <Label>Talent Requirements</Label>
                <Textarea
                  value={formData.requirements}
                  onChange={(e) => handleInputChange("requirements", e.target.value)}
                  placeholder="Describe the type of talent you're looking for, age groups, skill levels, positions..."
                  rows={4}
                />
              </div>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Scout Dashboard Features</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span className="text-sm">Browse athlete profiles and videos</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span className="text-sm">Direct messaging with athletes</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span className="text-sm">Advanced search and filtering</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span className="text-sm">Talent tracking and notes</span>
                </div>
              </CardContent>
            </Card>

            <div className="flex space-x-4">
              <Button variant="outline" onClick={handlePrevious} className="flex-1">
                <ArrowLeft className="mr-2 h-4 w-4" /> Previous
              </Button>
              <Button onClick={handleSubmit} className="flex-1 bg-green-600 hover:bg-green-700">
                Start Scouting!
              </Button>
            </div>
          </div>
        )

      default:
        return null
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md max-h-[90vh] overflow-y-auto">
        {type === "signin" && renderSignIn()}
        {type === "athlete" && renderAthleteFlow()}
        {type === "scout" && renderScoutFlow()}
      </DialogContent>
    </Dialog>
  )
}
