import { FileTextIcon, BarChart3Icon, ShieldCheckIcon, UserIcon } from "lucide-react"

import DocumentLogo from "@/components/document-logo"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"

// Navigation links for document management system
const navigationLinks = [
  {
    label: "Gestão",
    submenu: true,
    type: "description",
    items: [
      {
        href: "#",
        label: "Documentos",
        description: "Gerencie todos os seus documentos em um só lugar.",
      },
      {
        href: "#",
        label: "Workflows",
        description: "Configure e monitore processos automatizados.",
      },
      {
        href: "#",
        label: "Usuários",
        description: "Controle de acesso e permissões de usuários.",
      },
    ],
  },
  {
    label: "Análises",
    submenu: true,
    type: "icon",
    items: [
      { href: "#", label: "Dashboard", icon: "BarChart3Icon" },
      { href: "#", label: "Relatórios", icon: "FileTextIcon" },
      { href: "#", label: "Auditoria", icon: "ShieldCheckIcon" },
    ],
  },
  { href: "#", label: "Integrações" },
  {
    label: "Suporte",
    submenu: true,
    type: "simple",
    items: [
      { href: "#", label: "Central de Ajuda" },
      { href: "#", label: "Documentação" },
      { href: "#", label: "Contato" },
      { href: "#", label: "Status do Sistema" },
    ],
  },
]

export default function NavbarVariation2() {
  return (
    <header className="px-4 md:px-6 bg-gradient-to-r from-slate-50 to-gray-50">
      <div className="flex h-16 items-center justify-between gap-4">
        {/* Left side */}
        <div className="flex items-center gap-2">
          {/* Mobile menu trigger */}
          <Popover>
            <PopoverTrigger asChild>
              <Button className="group size-8 md:hidden" variant="ghost" size="icon">
                <svg
                  className="pointer-events-none"
                  width={16}
                  height={16}
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  xmlns="http://www.w3.org/2000/svg">
                  <path
                    d="M4 12L20 12"
                    className="origin-center -translate-y-[7px] transition-all duration-300 ease-[cubic-bezier(.5,.85,.25,1.1)] group-aria-expanded:translate-x-0 group-aria-expanded:translate-y-0 group-aria-expanded:rotate-[315deg]" />
                  <path
                    d="M4 12H20"
                    className="origin-center transition-all duration-300 ease-[cubic-bezier(.5,.85,.25,1.8)] group-aria-expanded:rotate-45" />
                  <path
                    d="M4 12H20"
                    className="origin-center translate-y-[7px] transition-all duration-300 ease-[cubic-bezier(.5,.85,.25,1.1)] group-aria-expanded:translate-y-0 group-aria-expanded:rotate-[135deg]" />
                </svg>
              </Button>
            </PopoverTrigger>
            <PopoverContent align="start" className="w-64 p-1 md:hidden">
              <NavigationMenu className="max-w-none *:w-full">
                <NavigationMenuList className="flex-col items-start gap-0 md:gap-2">
                  {navigationLinks.map((link, index) => (
                    <NavigationMenuItem key={index} className="w-full">
                      {link.submenu ? (
                        <>
                          <div className="text-muted-foreground px-2 py-1.5 text-xs font-medium">{link.label}</div>
                          <ul>
                            {link.items.map((item, itemIndex) => (
                              <li key={itemIndex}>
                                <NavigationMenuLink href={item.href} className="py-1.5">
                                  {item.label}
                                </NavigationMenuLink>
                              </li>
                            ))}
                          </ul>
                        </>
                      ) : (
                        <NavigationMenuLink href={link.href} className="py-1.5">
                          {link.label}
                        </NavigationMenuLink>
                      )}
                      {index < navigationLinks.length - 1 &&
                        ((!link.submenu && navigationLinks[index + 1].submenu) ||
                          (link.submenu && !navigationLinks[index + 1].submenu) ||
                          (link.submenu &&
                            navigationLinks[index + 1].submenu &&
                            link.type !== navigationLinks[index + 1].type)) && (
                          <div
                            role="separator"
                            aria-orientation="horizontal"
                            className="bg-border -mx-1 my-1 h-px w-full" />
                        )}
                    </NavigationMenuItem>
                  ))}
                </NavigationMenuList>
              </NavigationMenu>
            </PopoverContent>
          </Popover>
          {/* Logo */}
          <a
            href="#"
            className="text-primary hover:text-primary/90 flex items-center gap-3">
            <DocumentLogo />
            <div className="hidden sm:block">
              <span className="font-bold text-xl text-slate-800">DocFlow</span>
              <div className="text-xs text-slate-500 -mt-1">Gestão Documental</div>
            </div>
          </a>
        </div>

        {/* Center - Navigation menu */}
        <NavigationMenu viewport={false} className="max-md:hidden">
          <NavigationMenuList className="gap-1">
            {navigationLinks.map((link, index) => (
              <NavigationMenuItem key={index}>
                {link.submenu ? (
                  <>
                    <NavigationMenuTrigger
                      className="text-slate-600 hover:text-slate-900 bg-transparent px-3 py-2 font-medium text-sm *:[svg]:-me-0.5 *:[svg]:size-3.5">
                      {link.label}
                    </NavigationMenuTrigger>
                    <NavigationMenuContent
                      className="data-[motion=from-end]:slide-in-from-right-16! data-[motion=from-start]:slide-in-from-left-16! data-[motion=to-end]:slide-out-to-right-16! data-[motion=to-start]:slide-out-to-left-16! z-50 p-1">
                      <ul className={cn(link.type === "description" ? "min-w-72" : "min-w-48")}>
                        {link.items.map((item, itemIndex) => (
                          <li key={itemIndex}>
                            <NavigationMenuLink href={item.href} className="py-1.5">
                              {link.type === "icon" && "icon" in item && (
                                <div className="flex items-center gap-2">
                                  {item.icon === "BarChart3Icon" && (
                                    <BarChart3Icon size={16} className="text-foreground opacity-60" aria-hidden="true" />
                                  )}
                                  {item.icon === "FileTextIcon" && (
                                    <FileTextIcon size={16} className="text-foreground opacity-60" aria-hidden="true" />
                                  )}
                                  {item.icon === "ShieldCheckIcon" && (
                                    <ShieldCheckIcon size={16} className="text-foreground opacity-60" aria-hidden="true" />
                                  )}
                                  <span>{item.label}</span>
                                </div>
                              )}

                              {link.type === "description" && "description" in item ? (
                                <div className="space-y-1">
                                  <div className="font-medium">{item.label}</div>
                                  <p className="text-muted-foreground line-clamp-2 text-xs">{item.description}</p>
                                </div>
                              ) : (
                                !link.type ||
                                (link.type !== "icon" && link.type !== "description" && <span>{item.label}</span>)
                              )}
                            </NavigationMenuLink>
                          </li>
                        ))}
                      </ul>
                    </NavigationMenuContent>
                  </>
                ) : (
                  <NavigationMenuLink
                    href={link.href}
                    className="text-slate-600 hover:text-slate-900 py-2 px-3 font-medium text-sm">
                    {link.label}
                  </NavigationMenuLink>
                )}
              </NavigationMenuItem>
            ))}
          </NavigationMenuList>
        </NavigationMenu>

        {/* Right side */}
        <div className="flex items-center gap-3">
          <Button
            asChild
            variant="ghost"
            size="sm"
            className="text-sm text-slate-600 hover:text-slate-900">
            <a href="#" className="flex items-center gap-2">
              <UserIcon size={16} />
              <span className="hidden sm:inline">Entrar</span>
            </a>
          </Button>
          <Button asChild size="sm" className="text-sm bg-blue-600 hover:bg-blue-700">
            <a href="#">Começar Agora</a>
          </Button>
        </div>
      </div>
    </header>
  );
}
