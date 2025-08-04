"use client"
import { useRouter } from "next/navigation"
import { Home, Search, Plus, User, Bell, MessageSquare, TrendingUp, Info, Trophy } from "lucide-react"
import { useAuth } from "@/hooks/use-auth"
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"

export function AppSidebar() {
  const router = useRouter()
  const { isAuthenticated } = useAuth()

  const handleNavigation = (path: string) => {
    if (!isAuthenticated && path !== "/" && path !== "/about" && path !== "/success-stories") {
      return
    }
    router.push(path)
  }

  const navItems = [
    { icon: Home, label: "Home", path: "/" },
    { icon: Search, label: "Search", path: "/search" },
    { icon: Plus, label: "Create", path: "/create-post" },
    { icon: User, label: "Profile", path: "/profile" },
    { icon: Bell, label: "Notifications", path: "/notifications" },
    { icon: MessageSquare, label: "Messages", path: "/messages" },
    { icon: Info, label: "About", path: "/about" },
    { icon: Trophy, label: "Success Stories", path: "/success-stories" },
  ]

  return (
    <Sidebar variant="floating" collapsible="icon" className="border-none bg-transparent shadow-none">
      <SidebarHeader className="py-4">
        <div className="flex items-center justify-center">
          <div className="flex items-center justify-center w-12 h-12 bg-gradient-to-br from-blue-600 to-purple-600 rounded-2xl shadow-lg">
            <TrendingUp className="h-6 w-6 text-white" />
          </div>
        </div>
      </SidebarHeader>
      <SidebarContent className="border-none bg-transparent shadow-none">
        <SidebarMenu className="space-y-2 px-3">
          {navItems.map((item) => (
            <SidebarMenuItem key={item.label}>
              <SidebarMenuButton
                tooltip={item.label}
                onClick={() => handleNavigation(item.path)}
                className="flex items-center justify-center w-12 h-12 rounded-xl hover:bg-gray-100 transition-colors duration-200 border-none shadow-none bg-transparent"
              >
                <item.icon className="h-7 w-7 text-gray-700" />
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarContent>
    </Sidebar>
  )
}
