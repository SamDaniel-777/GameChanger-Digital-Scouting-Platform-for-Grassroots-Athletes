"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Upload, ImageIcon, Video, MapPin, Users } from "lucide-react"
import Layout from "@/components/layout"
import { useAuth } from "@/hooks/use-auth"
import { useRouter } from "next/navigation"

export default function CreatePostPage() {
  const { user, isAuthenticated } = useAuth()
  const router = useRouter()
  const [postContent, setPostContent] = useState("")
  const [selectedFiles, setSelectedFiles] = useState<File[]>([])
  const [isPosting, setIsPosting] = useState(false)

  if (!isAuthenticated) {
    return (
      <Layout>
        <div className="text-center py-12">
          <h1 className="text-2xl font-bold mb-4">Please sign in to create posts</h1>
          <p className="text-gray-600">You need to be logged in to share your journey.</p>
        </div>
      </Layout>
    )
  }

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files || [])
    setSelectedFiles((prev) => [...prev, ...files])
  }

  const removeFile = (index: number) => {
    setSelectedFiles((prev) => prev.filter((_, i) => i !== index))
  }

  const handlePost = async () => {
    if (!postContent.trim() && selectedFiles.length === 0) return

    setIsPosting(true)

    // Simulate posting delay
    await new Promise((resolve) => setTimeout(resolve, 2000))

    // In a real app, you would upload files and save the post
    console.log("Posting:", { content: postContent, files: selectedFiles })

    setIsPosting(false)
    setPostContent("")
    setSelectedFiles([])

    // Redirect to home feed
    router.push("/")
  }

  return (
    <Layout>
      <div className="max-w-2xl mx-auto">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-3">
              <Avatar className="h-10 w-10">
                <AvatarImage src="/placeholder.svg?height=40&width=40" alt={user?.name} />
                <AvatarFallback>
                  {user?.name
                    ?.split(" ")
                    .map((n) => n[0])
                    .join("")}
                </AvatarFallback>
              </Avatar>
              <div>
                <h2 className="text-xl font-bold">Share Your Journey</h2>
                <p className="text-sm text-gray-600">What's happening in your athletic journey?</p>
              </div>
            </CardTitle>
          </CardHeader>

          <CardContent className="space-y-6">
            {/* Post Content */}
            <div>
              <Label htmlFor="content">What's on your mind?</Label>
              <Textarea
                id="content"
                placeholder="Share your training updates, match highlights, achievements, or thoughts..."
                value={postContent}
                onChange={(e) => setPostContent(e.target.value)}
                rows={4}
                className="mt-2"
              />
            </div>

            {/* File Upload */}
            <div>
              <Label>Add Media</Label>
              <div className="mt-2 space-y-4">
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-gray-400 transition-colors">
                  <Upload className="h-8 w-8 mx-auto mb-2 text-gray-400" />
                  <p className="text-sm text-gray-600 mb-2">
                    Drag and drop your photos or videos here, or click to browse
                  </p>
                  <div className="flex justify-center space-x-4">
                    <label className="cursor-pointer">
                      <input type="file" accept="image/*" multiple className="hidden" onChange={handleFileUpload} />
                      <Button variant="outline" size="sm" className="flex items-center space-x-2">
                        <ImageIcon className="h-4 w-4" />
                        <span>Photos</span>
                      </Button>
                    </label>
                    <label className="cursor-pointer">
                      <input type="file" accept="video/*" multiple className="hidden" onChange={handleFileUpload} />
                      <Button variant="outline" size="sm" className="flex items-center space-x-2">
                        <Video className="h-4 w-4" />
                        <span>Videos</span>
                      </Button>
                    </label>
                  </div>
                </div>

                {/* Selected Files Preview */}
                {selectedFiles.length > 0 && (
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    {selectedFiles.map((file, index) => (
                      <div key={index} className="relative group">
                        <div className="aspect-square bg-gray-100 rounded-lg overflow-hidden">
                          {file.type.startsWith("image/") ? (
                            <img
                              src={URL.createObjectURL(file) || "/placeholder.svg"}
                              alt={`Upload ${index + 1}`}
                              className="w-full h-full object-cover"
                            />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center">
                              <Video className="h-8 w-8 text-gray-400" />
                            </div>
                          )}
                        </div>
                        <Button
                          variant="destructive"
                          size="sm"
                          className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity"
                          onClick={() => removeFile(index)}
                        >
                          ×
                        </Button>
                        <p className="text-xs text-gray-600 mt-1 truncate">{file.name}</p>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Post Options */}
            <div className="flex items-center justify-between pt-4 border-t border-gray-200">
              <div className="flex items-center space-x-4">
                <Button variant="ghost" size="sm" className="flex items-center space-x-2">
                  <MapPin className="h-4 w-4" />
                  <span>Add Location</span>
                </Button>
                <Button variant="ghost" size="sm" className="flex items-center space-x-2">
                  <Users className="h-4 w-4" />
                  <span>Tag People</span>
                </Button>
              </div>

              <div className="flex items-center space-x-3">
                <Button variant="outline" onClick={() => router.push("/")}>
                  Cancel
                </Button>
                <Button
                  onClick={handlePost}
                  disabled={(!postContent.trim() && selectedFiles.length === 0) || isPosting}
                  className="bg-blue-600 hover:bg-blue-700"
                >
                  {isPosting ? "Posting..." : "Share Post"}
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Post Tips */}
        <Card className="mt-6">
          <CardHeader>
            <CardTitle className="text-lg">Tips for Great Posts</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3 text-sm text-gray-600">
              <div className="flex items-start space-x-2">
                <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
                <p>Share your training routines, match highlights, and progress updates</p>
              </div>
              <div className="flex items-start space-x-2">
                <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
                <p>Use high-quality photos and videos to showcase your skills</p>
              </div>
              <div className="flex items-start space-x-2">
                <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
                <p>Include relevant details about your achievements and goals</p>
              </div>
              <div className="flex items-start space-x-2">
                <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
                <p>Engage with the community by commenting and supporting other athletes</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </Layout>
  )
}
