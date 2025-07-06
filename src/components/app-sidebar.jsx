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
            className="flex items-center justify-center text-black rounded-md size-5">
            <FileArchive className="size-5" />
          </div>
          <span className="font-semibold truncate">SDOCA</span>
        </div>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {data.navMain.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild isActive={item.isActive}>
                    <Link to={item.url}>
                      {item.icon && <item.icon className="w-4 h-4" />}
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


// com drop
/* import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuAction,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
  SidebarRail,
} from "@/components/ui/sidebar"
import {
  ChevronRight,
  FileArchive,
  FileText,
  Home,
  Building2,
  Layers,
  Users,
  FolderOpen,
} from "lucide-react"
import { Link } from "react-router-dom"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"

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
      items: [
        {
          title: "Entradas",
          url: "/dashboard/documents/entries",
        },
        {
          title: "Saídas",
          url: "/dashboard/documents/outputs",
        },
      ],
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
          <div className="flex items-center justify-center text-black rounded-md size-5">
            <FileArchive className="size-5" />
          </div>
          <span className="font-semibold truncate">SDOCA</span>
        </div>

        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {data.navMain.map((item) =>
                item.items ? (
                  <Collapsible key={item.title} asChild>
                    <SidebarMenuItem>
                      <SidebarMenuButton asChild>
                        <Link to={item.url}>
                          {item.icon && <item.icon className="w-4 h-4" />}
                          <span>{item.title}</span>
                        </Link>
                      </SidebarMenuButton>

                      <CollapsibleTrigger asChild>
                        <SidebarMenuAction className="data-[state=open]:rotate-90">
                          <ChevronRight />
                        </SidebarMenuAction>
                      </CollapsibleTrigger>

                      <CollapsibleContent>
                        <SidebarMenuSub>
                          {item.items.map((subItem) => (
                            <SidebarMenuSubItem key={subItem.title}>
                              <SidebarMenuSubButton asChild>
                                <Link to={subItem.url}>
                                  <span>{subItem.title}</span>
                                </Link>
                              </SidebarMenuSubButton>
                            </SidebarMenuSubItem>
                          ))}
                        </SidebarMenuSub>
                      </CollapsibleContent>
                    </SidebarMenuItem>
                  </Collapsible>
                ) : (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton asChild>
                      <Link to={item.url}>
                        {item.icon && <item.icon className="w-4 h-4" />}
                        <span>{item.title}</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                )
              )}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarHeader>

      <SidebarContent />
      <SidebarRail />
    </Sidebar>
  )
}
 */