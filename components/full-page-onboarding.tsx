"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { ArrowRight, ArrowLeft, TrendingUp, CheckCircle } from "lucide-react"
import { useAuth } from "@/hooks/use-auth"

interface FullPageOnboardingProps {
  type: "athlete" | "scout"
  onComplete: () => void
  onBack: () => void
}

export default function FullPageOnboarding({ type, onComplete, onBack }: FullPageOnboardingProps) {
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

  const totalSteps = type === "athlete" ? 4 : 3
  const progress = (currentStep / totalSteps) * 100

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const handleNext = () => {
    setCurrentStep((prev) => prev + 1)
  }

  const handlePrevious = () => {
    setCurrentStep((prev) => prev - 1)
  }

  const handleComplete = () => {
    // Create user object based on type
    const userData = {
      id: Date.now().toString(),
      name: formData.name,
      email: formData.email,
      type: type,
      ...formData,
    }

    // Save to localStorage and login
    localStorage.setItem("gamechangerUser", JSON.stringify(userData))
    login(userData)
    onComplete()
  }

  const renderAthleteStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="max-w-md mx-auto space-y-6">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold mb-2">Personal Details</h2>
              <p className="text-gray-600">Let's start with the basics</p>
            </div>

            <div className="space-y-4">
              <div>
                <Label htmlFor="name">Full Name *</Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) => handleInputChange("name", e.target.value)}
                  placeholder="Enter your full name"
                  className="mt-1"
                />
              </div>
              <div>
                <Label htmlFor="email">Email Address *</Label>
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => handleInputChange("email", e.target.value)}
                  placeholder="Enter your email"
                  className="mt-1"
                />
              </div>
              <div>
                <Label htmlFor="phone">Phone Number</Label>
                <Input
                  id="phone"
                  value={formData.phone}
                  onChange={(e) => handleInputChange("phone", e.target.value)}
                  placeholder="Enter your phone number"
                  className="mt-1"
                />
              </div>
              <div>
                <Label htmlFor="location">Location *</Label>
                <Input
                  id="location"
                  value={formData.location}
                  onChange={(e) => handleInputChange("location", e.target.value)}
                  placeholder="City, State"
                  className="mt-1"
                />
              </div>
            </div>
          </div>
        )

      case 2:
        return (
          <div className="max-w-md mx-auto space-y-6">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold mb-2">Game Details</h2>
              <p className="text-gray-600">Tell us about your sport</p>
            </div>

            <div className="space-y-4">
              <div>
                <Label>Sport *</Label>
                <Select value={formData.sport} onValueChange={(value) => handleInputChange("sport", value)}>
                  <SelectTrigger className="mt-1">
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
                <Label>Position *</Label>
                <Input
                  value={formData.position}
                  onChange={(e) => handleInputChange("position", e.target.value)}
                  placeholder="e.g., Forward, Midfielder, Goalkeeper"
                  className="mt-1"
                />
              </div>
              <div>
                <Label>Experience Level</Label>
                <Select value={formData.experience} onValueChange={(value) => handleInputChange("experience", value)}>
                  <SelectTrigger className="mt-1">
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
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label>Height (cm)</Label>
                  <Input
                    value={formData.height}
                    onChange={(e) => handleInputChange("height", e.target.value)}
                    placeholder="170"
                    className="mt-1"
                  />
                </div>
                <div>
                  <Label>Weight (kg)</Label>
                  <Input
                    value={formData.weight}
                    onChange={(e) => handleInputChange("weight", e.target.value)}
                    placeholder="65"
                    className="mt-1"
                  />
                </div>
              </div>
            </div>
          </div>
        )

      case 3:
        return (
          <div className="max-w-md mx-auto space-y-6">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold mb-2">Achievements & Stats</h2>
              <p className="text-gray-600">Showcase your accomplishments</p>
            </div>

            <div className="space-y-4">
              <div>
                <Label>Achievements</Label>
                <Textarea
                  value={formData.achievements}
                  onChange={(e) => handleInputChange("achievements", e.target.value)}
                  placeholder="List your major achievements, awards, tournaments won..."
                  rows={4}
                  className="mt-1"
                />
              </div>
              <div>
                <Label>Career Stats</Label>
                <Textarea
                  value={formData.stats}
                  onChange={(e) => handleInputChange("stats", e.target.value)}
                  placeholder="Share your key statistics (goals scored, matches played, etc.)"
                  rows={3}
                  className="mt-1"
                />
              </div>
            </div>
          </div>
        )

      case 4:
        return (
          <div className="max-w-lg mx-auto space-y-8">
            <div className="text-center">
              <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-4" />
              <h2 className="text-3xl font-bold mb-2">Welcome to GameChanger!</h2>
              <p className="text-gray-600">You're all set to start your journey</p>
            </div>

            <Card className="border-2 border-green-200 bg-green-50">
              <CardHeader>
                <CardTitle className="text-center text-green-800">What's Next?</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-start space-x-3">
                  <div className="w-8 h-8 bg-green-500 text-white rounded-full flex items-center justify-center text-sm font-bold">
                    1
                  </div>
                  <div>
                    <h4 className="font-semibold">Complete Your Profile</h4>
                    <p className="text-sm text-gray-600">Add photos, videos, and more details</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-8 h-8 bg-green-500 text-white rounded-full flex items-center justify-center text-sm font-bold">
                    2
                  </div>
                  <div>
                    <h4 className="font-semibold">Share Your Journey</h4>
                    <p className="text-sm text-gray-600">Post training videos and match highlights</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-8 h-8 bg-green-500 text-white rounded-full flex items-center justify-center text-sm font-bold">
                    3
                  </div>
                  <div>
                    <h4 className="font-semibold">Connect & Get Discovered</h4>
                    <p className="text-sm text-gray-600">Network with scouts and other athletes</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        )

      default:
        return null
    }
  }

  const renderScoutStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="max-w-md mx-auto space-y-6">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold mb-2">Scout Details</h2>
              <p className="text-gray-600">Tell us about yourself</p>
            </div>

            <div className="space-y-4">
              <div>
                <Label htmlFor="name">Full Name *</Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) => handleInputChange("name", e.target.value)}
                  placeholder="Enter your full name"
                  className="mt-1"
                />
              </div>
              <div>
                <Label htmlFor="email">Email Address *</Label>
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => handleInputChange("email", e.target.value)}
                  placeholder="Enter your email"
                  className="mt-1"
                />
              </div>
              <div>
                <Label htmlFor="clubName">Club/Organization *</Label>
                <Input
                  id="clubName"
                  value={formData.clubName}
                  onChange={(e) => handleInputChange("clubName", e.target.value)}
                  placeholder="Enter your club or organization name"
                  className="mt-1"
                />
              </div>
              <div>
                <Label htmlFor="location">Location *</Label>
                <Input
                  id="location"
                  value={formData.location}
                  onChange={(e) => handleInputChange("location", e.target.value)}
                  placeholder="City, State"
                  className="mt-1"
                />
              </div>
            </div>
          </div>
        )

      case 2:
        return (
          <div className="max-w-md mx-auto space-y-6">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold mb-2">Expertise & Requirements</h2>
              <p className="text-gray-600">What talent are you looking for?</p>
            </div>

            <div className="space-y-4">
              <div>
                <Label>Specialization *</Label>
                <Select
                  value={formData.specialization}
                  onValueChange={(value) => handleInputChange("specialization", value)}
                >
                  <SelectTrigger className="mt-1">
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
                  <SelectTrigger className="mt-1">
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
                <Label>Talent Requirements</Label>
                <Textarea
                  value={formData.requirements}
                  onChange={(e) => handleInputChange("requirements", e.target.value)}
                  placeholder="Describe the type of talent you're looking for..."
                  rows={4}
                  className="mt-1"
                />
              </div>
            </div>
          </div>
        )

      case 3:
        return (
          <div className="max-w-lg mx-auto space-y-8">
            <div className="text-center">
              <CheckCircle className="h-16 w-16 text-purple-500 mx-auto mb-4" />
              <h2 className="text-3xl font-bold mb-2">Ready to Scout!</h2>
              <p className="text-gray-600">Your scout profile is complete</p>
            </div>

            <Card className="border-2 border-purple-200 bg-purple-50">
              <CardHeader>
                <CardTitle className="text-center text-purple-800">Scout Dashboard Features</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center space-x-3">
                  <CheckCircle className="h-5 w-5 text-green-500" />
                  <span className="text-sm">Browse athlete profiles and videos</span>
                </div>
                <div className="flex items-center space-x-3">
                  <CheckCircle className="h-5 w-5 text-green-500" />
                  <span className="text-sm">Advanced search and filtering</span>
                </div>
                <div className="flex items-center space-x-3">
                  <CheckCircle className="h-5 w-5 text-green-500" />
                  <span className="text-sm">Direct messaging with athletes</span>
                </div>
                <div className="flex items-center space-x-3">
                  <CheckCircle className="h-5 w-5 text-green-500" />
                  <span className="text-sm">Talent tracking and notes</span>
                </div>
              </CardContent>
            </Card>
          </div>
        )

      default:
        return null
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex flex-col">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 px-6 py-4">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <button onClick={onBack} className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
              <ArrowLeft className="h-5 w-5" />
            </button>
            <div className="flex items-center space-x-3">
              <TrendingUp className="h-8 w-8 text-blue-600" />
              <h1 className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                GAMECHANGER
              </h1>
            </div>
          </div>
          <div className="text-sm text-gray-600">
            Step {currentStep} of {totalSteps}
          </div>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="bg-white px-6 py-2 border-b border-gray-100">
        <div className="max-w-4xl mx-auto">
          <Progress value={progress} className="h-2" />
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex items-center justify-center p-6">
        <div className="w-full max-w-4xl">{type === "athlete" ? renderAthleteStep() : renderScoutStep()}</div>
      </div>

      {/* Footer Navigation */}
      <div className="bg-white border-t border-gray-200 px-6 py-6">
        <div className="max-w-4xl mx-auto flex justify-between">
          <Button
            variant="outline"
            onClick={currentStep === 1 ? onBack : handlePrevious}
            className="flex items-center space-x-2"
          >
            <ArrowLeft className="h-4 w-4" />
            <span>{currentStep === 1 ? "Back" : "Previous"}</span>
          </Button>

          <Button
            onClick={currentStep === totalSteps ? handleComplete : handleNext}
            className="flex items-center space-x-2 bg-blue-600 hover:bg-blue-700"
          >
            <span>{currentStep === totalSteps ? "Complete Setup" : "Continue"}</span>
            {currentStep !== totalSteps && <ArrowRight className="h-4 w-4" />}
          </Button>
        </div>
      </div>
    </div>
  )
}
