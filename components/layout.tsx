"use client"

import type React from "react"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { useAuth } from "@/hooks/use-auth"
import JoinPopup from "./join-popup"
import FullPageOnboarding from "./full-page-onboarding"
import { useRouter } from "next/navigation"
import { AppSidebar } from "./app-sidebar"
import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar"

interface LayoutProps {
  children: React.ReactNode
}

export default function Layout({ children }: LayoutProps) {
  const { user, isAuthenticated, logout } = useAuth()
  const [showJoinPopup, setShowJoinPopup] = useState(false)
  const [showOnboarding, setShowOnboarding] = useState(false)
  const [onboardingType, setOnboardingType] = useState<"athlete" | "scout">("athlete")
  const router = useRouter()

  const handleJoinSelect = (type: "athlete" | "scout") => {
    setOnboardingType(type)
    setShowJoinPopup(false)
    setShowOnboarding(true)
  }

  const handleSignIn = () => {
    setShowJoinPopup(false)
    // Simple demo login
    const demoUser = {
      id: "demo",
      name: "Demo User",
      email: "demo@gamechanger.com",
      type: "athlete" as const,
    }
    // In real app, this would be proper authentication
    localStorage.setItem("gamechangerUser", JSON.stringify(demoUser))
    window.location.reload()
  }

  return (
    <>
      {showOnboarding ? (
        <FullPageOnboarding
          type={onboardingType}
          onComplete={() => setShowOnboarding(false)}
          onBack={() => {
            setShowOnboarding(false)
            setShowJoinPopup(true)
          }}
        />
      ) : (
        <div className="min-h-screen bg-gray-50">
          <SidebarProvider>
            <AppSidebar />
            <SidebarInset>
              {/* Top Header */}
              <header className="sticky top-0 bg-white/95 backdrop-blur-md border-b border-gray-200 px-6 py-4 z-10">
                <div className="flex items-center justify-between max-w-6xl mx-auto">
                  <div className="flex items-center space-x-4">
                    <h1 className="text-2xl font-semibold text-gray-800 tracking-wide">GameChanger</h1>
                  </div>

                  <div className="flex items-center space-x-4">
                    {isAuthenticated ? (
                      <div className="flex items-center space-x-4">
                        <span className="text-sm text-gray-600">Welcome, {user?.name}</span>
                        <Button variant="outline" size="sm" onClick={logout}>
                          Sign Out
                        </Button>
                      </div>
                    ) : (
                      <div className="flex items-center space-x-3">
                        <Button variant="outline" size="sm" onClick={handleSignIn}>
                          Sign In
                        </Button>
                        <Button
                          size="lg"
                          onClick={() => setShowJoinPopup(true)}
                          className="bg-gradient-to-r from-blue-600 to-gamechanger-purple hover:from-blue-700 hover:bg-gamechanger-purple-hover text-white font-bold px-6 py-3 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
                        >
                          Become a GameChanger
                        </Button>
                      </div>
                    )}
                  </div>
                </div>
              </header>

              {/* Content Area */}
              <div className="flex max-w-6xl mx-auto">
                {/* Main Content */}
                <main className="flex-1 px-6 py-8">{children}</main>

                {/* Right Sidebar */}
                <aside className="w-80 p-6">
                  <div className="sticky top-24 space-y-6">
                    {!isAuthenticated && (
                      <div className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-2xl p-6 border-2 border-blue-200 shadow-lg">
                        <h3 className="font-bold text-xl mb-4 text-center">Join GameChanger</h3>
                        <div className="space-y-4">
                          <Button
                            className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-bold py-3 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
                            onClick={() => handleJoinSelect("athlete")}
                          >
                            🚀 Start Your Journey
                          </Button>
                          <Button
                            variant="outline"
                            className="w-full border-2 border-gamechanger-purple hover:bg-gamechanger-purple-light font-semibold py-3 rounded-xl transition-all duration-300"
                            onClick={() => handleJoinSelect("scout")}
                          >
                            🎯 Find Talent
                          </Button>
                        </div>
                        <p className="text-xs text-gray-600 mt-4 text-center leading-relaxed">
                          Connect with scouts, showcase your skills, and take your athletic career to the next level.
                        </p>
                      </div>
                    )}

                    {/* Trending Athletes */}
                      <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm">
                        <h3 className="font-bold text-lg mb-4">Trending Athletes</h3>
                        <div className="space-y-4">
                          {[
                            { name: "Rahul Sharma", sport: "Football", position: "Forward" },
                            { name: "Priya Patel", sport: "Cricket", position: "All-rounder" },
                            { name: "Arjun Singh", sport: "Kabaddi", position: "Raider" },
                          ].map((athlete, i) => (
                            <div
                              key={i}
                              className="flex items-center space-x-3 cursor-pointer hover:bg-gray-50 p-2 rounded-lg transition-colors"
                            >
                              <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white font-bold text-sm">
                                {athlete.name
                                  .split(" ")
                                  .map((n) => n[0])
                                  .join("")}
                              </div>
                              <div className="flex-1">
                                <p className="font-medium text-sm">{athlete.name}</p>
                                <p className="text-xs text-gray-500">
                                  {athlete.sport} • {athlete.position}
                                </p>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Quick Stats */}
                      <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm">
                        <h3 className="font-bold text-lg mb-4">Platform Stats</h3>
                        <div className="space-y-3">
                          <div className="flex justify-between">
                            <span className="text-gray-600">Athletes</span>
                            <span className="font-semibold">12,450+</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-600">Scouts</span>
                            <span className="font-semibold">2,340+</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-600">Success Stories</span>
                            <span className="font-semibold">890+</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </aside>
                </div>
              </SidebarInset>
            </SidebarProvider>

            {/* Join Popup */}
            <JoinPopup isOpen={showJoinPopup} onClose={() => setShowJoinPopup(false)} onSelectType={handleJoinSelect} />
          </div>
      )}
    </>
  )
}
