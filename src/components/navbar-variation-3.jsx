import { FileTextIcon, WorkflowIcon, HelpCircleIcon, SearchIcon, BellIcon } from "lucide-react"

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
  { href: "#", label: "Início" },
  {
    label: "Plataforma",
    submenu: true,
    type: "description",
    items: [
      {
        href: "#",
        label: "Gestão de Documentos",
        description: "Organize, versione e compartilhe documentos com segurança.",
      },
      {
        href: "#",
        label: "Automação de Processos",
        description: "Crie workflows inteligentes para otimizar operações.",
      },
      {
        href: "#",
        label: "Assinatura Digital",
        description: "Assine documentos com validade jurídica completa.",
      },
      {
        href: "#",
        label: "Analytics & Relatórios",
        description: "Insights detalhados sobre uso e performance.",
      },
    ],
  },
  {
    label: "Soluções",
    submenu: true,
    type: "simple",
    items: [
      { href: "#", label: "Para Empresas" },
      { href: "#", label: "Para Escritórios" },
      { href: "#", label: "Para Governo" },
      { href: "#", label: "Para Educação" },
    ],
  },
  { href: "#", label: "Preços" },
  {
    label: "Recursos",
    submenu: true,
    type: "icon",
    items: [
      { href: "#", label: "Blog", icon: "FileTextIcon" },
      { href: "#", label: "Webinars", icon: "WorkflowIcon" },
      { href: "#", label: "Suporte", icon: "HelpCircleIcon" },
    ],
  },
]

export default function NavbarVariation3() {
  return (
    <header className="border-b border-slate-200 px-4 md:px-6 bg-white shadow-sm">
      <div className="flex h-18 items-center justify-between gap-4 py-2">
        {/* Left side - Logo and Brand */}
        <div className="flex items-center gap-4">
          <a
            href="#"
            className="text-primary hover:text-primary/90 flex items-center gap-3">
            <div className="p-2 bg-blue-50 rounded-lg">
              <DocumentLogo />
            </div>
            <div className="hidden lg:block">
              <span className="font-bold text-xl text-slate-900">DocFlow Pro</span>
              <div className="text-xs text-blue-600 font-medium -mt-1">Sistema de Gestão Documental</div>
            </div>
          </a>
        </div>

        {/* Center - Navigation menu */}
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

          <NavigationMenu viewport={false} className="max-md:hidden">
            <NavigationMenuList className="gap-1">
              {navigationLinks.map((link, index) => (
                <NavigationMenuItem key={index}>
                  {link.submenu ? (
                    <>
                      <NavigationMenuTrigger
                        className="text-slate-700 hover:text-blue-600 bg-transparent px-4 py-2 font-medium text-sm *:[svg]:-me-0.5 *:[svg]:size-3.5">
                        {link.label}
                      </NavigationMenuTrigger>
                      <NavigationMenuContent
                        className="data-[motion=from-end]:slide-in-from-right-16! data-[motion=from-start]:slide-in-from-left-16! data-[motion=to-end]:slide-out-to-right-16! data-[motion=to-start]:slide-out-to-left-16! z-50 p-1">
                        <ul className={cn(link.type === "description" ? "min-w-80" : "min-w-48")}>
                          {link.items.map((item, itemIndex) => (
                            <li key={itemIndex}>
                              <NavigationMenuLink href={item.href} className="py-2">
                                {link.type === "icon" && "icon" in item && (
                                  <div className="flex items-center gap-3">
                                    {item.icon === "FileTextIcon" && (
                                      <FileTextIcon size={18} className="text-blue-500" aria-hidden="true" />
                                    )}
                                    {item.icon === "WorkflowIcon" && (
                                      <WorkflowIcon size={18} className="text-blue-500" aria-hidden="true" />
                                    )}
                                    {item.icon === "HelpCircleIcon" && (
                                      <HelpCircleIcon size={18} className="text-blue-500" aria-hidden="true" />
                                    )}
                                    <span className="font-medium">{item.label}</span>
                                  </div>
                                )}

                                {link.type === "description" && "description" in item ? (
                                  <div className="space-y-1">
                                    <div className="font-semibold text-slate-900">{item.label}</div>
                                    <p className="text-slate-600 line-clamp-2 text-sm">{item.description}</p>
                                  </div>
                                ) : (
                                  !link.type ||
                                  (link.type !== "icon" && link.type !== "description" && (
                                    <span className="font-medium">{item.label}</span>
                                  ))
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
                      className="text-slate-700 hover:text-blue-600 py-2 px-4 font-medium text-sm">
                      {link.label}
                    </NavigationMenuLink>
                  )}
                </NavigationMenuItem>
              ))}
            </NavigationMenuList>
          </NavigationMenu>
        </div>

        {/* Right side - Actions */}
        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="icon"
            className="hidden md:flex text-slate-600 hover:text-slate-900">
            <SearchIcon size={18} />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="hidden md:flex text-slate-600 hover:text-slate-900">
            <BellIcon size={18} />
          </Button>
          <div className="w-px h-6 bg-slate-300 mx-2 hidden md:block" />
          <Button
            asChild
            variant="outline"
            size="sm"
            className="text-sm border-slate-300 text-slate-700 hover:bg-slate-50 bg-transparent">
            <a href="#">Fazer Login</a>
          </Button>
          <Button
            asChild
            size="sm"
            className="text-sm bg-blue-600 hover:bg-blue-700 shadow-sm">
            <a href="#">Demonstração Gratuita</a>
          </Button>
        </div>
      </div>
    </header>
  );
}
