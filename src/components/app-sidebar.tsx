"use client"
import { LogOut, Newspaper, Tag } from "lucide-react"

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"
import Link from "next/link"
import { Button } from "./ui/button"
import { useRouter } from "next/navigation"

// Menu items.
const items = [
  {
    title: "Article",
    url: "/",
    icon: Newspaper,
  },
  {
    title: "Category",
    url: "/categories",
    icon: Tag,
  }
]

export function AppSidebar() {
  const router = useRouter();

  const handleLogout = () => {
    localStorage.clear();
    router.push('/auth/sign-in')
  }
  return (
    <Sidebar>
      <SidebarContent className="bg-blue-500 text-white font-bold">
        <SidebarGroup>
          <SidebarGroupLabel className="text-white font-bold text-xl text-center items-center">LogoIpsum</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu className="mt-4">
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <Link href={item.url}>
                      <item.icon />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
              <Button className="text-black bg-transparent cursor-pointer hover:bg-transparent flex flex-row gap-2 items-center" onClick={handleLogout}>
               <LogOut className="text-white font-bold w-10 h-10"/> Logout
              </Button>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  )
}
