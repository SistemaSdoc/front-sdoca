import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarGroup,
  SidebarGroupLabel,
} from "@/components/ui/sidebar"
import { Link, useLocation } from "react-router-dom"
import { Building2, FileText, Home, Layers, Users } from "lucide-react"
import { useAuth } from "@/context/AuthContext"

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
      permissions: ["super-admin-post", "admin-post"],
    },
    {
      title: "Áreas",
      url: "/dashboard/areas",
      icon: Layers,
      permissions: ["admin-post", "supervi-post"],
    },
    {
      title: "Usuários",
      url: "/dashboard/users",
      icon: Users,
      permissions: ["admin-post"],
    },
    {
      title: "Documentos",
      url: "/dashboard/documents",
      icon: FileText,
      permissions: ["user-post"],
    },
  ],
}

export function AppSidebar({ ...props }) {
  const { canAny } = useAuth()
  const location = useLocation()

  return (
    <Sidebar variant="inset" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <Link to="/dashboard">
              <div className="grid flex-1 text-sm leading-tight text-left">
                <span className="text-lg font-semibold truncate">SDOCA</span>
                <span className="text-xs truncate text-muted-foreground">Gestão documental e arquivos</span>
              </div>
            </Link>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Menu Principal</SidebarGroupLabel>
          <SidebarMenu>
            {data.navMain.filter((item) => !item.permissions || canAny(item.permissions)).map((item) => {
              const isHome = item.url === "/dashboard"
              const isActive = isHome
                ? location.pathname === item.url
                : location.pathname.startsWith(item.url)

              return (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild isActive={isActive}>
                    <Link to={item.url} className="hover:[&>svg]:text-sidebar-icon-hover">
                      {item.icon && <item.icon className="w-4 h-4" />}
                      <span className="font-medium">{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              )
            })}
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  )
}
