"use client"

import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { TrendingUp } from "lucide-react"
import { useRouter } from "next/navigation"
import Layout from "@/components/layout"

export default function NotFound() {
  const router = useRouter()

  return (
    <Layout>
      <div className="max-w-2xl mx-auto">
        <Card className="p-8 text-center">
          <TrendingUp className="h-16 w-16 mx-auto mb-6 text-gray-400" />
          <h1 className="text-2xl font-bold mb-4">Page Not Found</h1>
          <p className="text-gray-600 mb-8">The page you're looking for doesn't exist or has been moved.</p>
          <div className="flex justify-center space-x-4">
            <Button onClick={() => router.push("/")} className="bg-blue-600 hover:bg-blue-700">
              Go Home
            </Button>
            <Button onClick={() => router.back()} variant="outline">
              Go Back
            </Button>
          </div>
        </Card>
      </div>
    </Layout>
  )
}
