"use client"

import { Link } from "react-router-dom"
import { Building2, ChevronRight, Command, FileArchive, FileText, FolderOpen, Home, Layers, Users } from "lucide-react"
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuAction,
  SidebarMenuButton,
  SidebarMenuItem,

  SidebarRail,
} from "@/components/ui/sidebar"

// This is sample data.
const data = {
  navMain: [
    {
      title: "Home",
      url: "/dashboard",
      icon: Home,
    },
    {
      title: "Organizações",
      url: "/dashboard/organizations",
      icon: Building2,
    },
    {
      title: "Áreas",
      url: "/dashboard/areas",
      icon: Layers,
    },
    {
      title: "Usuários",
      url: "/dashboard/users",
      icon: Users,
    },
    {
      title: "Documentos",
      url: "/dashboard/documents",
      icon: FileText,
    },
    {
      title: "Arquivos",
      url: "/dashboard/archives",
      icon: FolderOpen,
    },
  ],
}

export function AppSidebar({ ...props }) {
  return (
    <Sidebar className="border-r-0" {...props}>
      <SidebarHeader>
        <div className="flex items-center gap-2 px-2 py-2">
          <div
            className="flex size-5 items-center justify-center rounded-md text-black">
            <FileArchive className="size-5" />
          </div>
          <span className="truncate font-semibold">SDOCA</span>
        </div>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {data.navMain.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild isActive={item.isActive}>
                    <Link to={item.url}>
                      {item.icon && <item.icon className="h-4 w-4" />}
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarHeader>
      <SidebarContent>{/* Content area - can be used for additional navigation or content */}</SidebarContent>
      <SidebarRail />
    </Sidebar>
  );
}
