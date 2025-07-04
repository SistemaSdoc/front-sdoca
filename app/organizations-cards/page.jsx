import { AppSidebar } from "@/components/app-sidebar"
import { NotificationsPanel } from "@/components/notifications-panel"
import { OrganizationsCards } from "@/components/organizations-cards"
import { UserNav } from "@/components/user-nav"
import { Breadcrumb, BreadcrumbItem, BreadcrumbList, BreadcrumbPage } from "@/components/ui/breadcrumb"
import { Separator } from "@/components/ui/separator"
import { SidebarInset, SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"

export default function OrganizationsCardsPage() {
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <header className="flex h-14 shrink-0 items-center gap-2">
          <div className="flex flex-1 items-center gap-2 px-3">
            <SidebarTrigger />
            <Separator orientation="vertical" className="mr-2 h-4" />
            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem>
                  <BreadcrumbPage className="line-clamp-1">Organizações - Cards</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </div>
          <div className="ml-auto flex items-center gap-2 px-3">
            <NotificationsPanel />
            <UserNav />
          </div>
        </header>
        <div className="flex flex-1 flex-col gap-4 p-4">
          <OrganizationsCards />
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
