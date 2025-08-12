import { FileText } from "lucide-react"
import { Button } from "@/components/ui/button"
import MobileMenu from "./mobile-menu"
import DesktopMenu from "./desktop-menu"

const navigationLinks = [
  { href: "/", label: "Home" },
  {
    label: "Funcionalidades",
    submenu: true,
    type: "description",
    items: [
      { href: "#", label: "Components", description: "Browse all components in the library." },
      { href: "#", label: "Documentation", description: "Learn how to use the library." },
      { href: "#", label: "Templates", description: "Pre-built layouts for common use cases." },
    ],
  },
  {
    label: "Pricing",
    submenu: true,
    type: "simple",
    items: [
      { href: "#", label: "Product A" },
      { href: "#", label: "Product B" },
      { href: "#", label: "Product C" },
      { href: "#", label: "Product D" },
    ],
  },
  {
    label: "About",
    submenu: true,
    type: "icon",
    items: [
      { href: "#", label: "Getting Started", icon: "BookOpenIcon" },
      { href: "#", label: "Tutorials", icon: "LifeBuoyIcon" },
      { href: "#", label: "About Us", icon: "InfoIcon" },
    ],
  },
]

export default function NavBarLanding() {
  return (
    <header className="px-4 bg-white border-b md:px-6">
      {/* Grid com 3 colunas: [esquerda | centro | direita] */}
      <div className="grid grid-cols-[auto_1fr_auto] items-center h-16 gap-4">
        
        {/* ESQUERDA: MobileMenu + Logo */}
        <div className="flex items-center gap-3">
          <MobileMenu navigationLinks={navigationLinks} />
          <a href="#" className="flex items-center gap-3 text-primary hover:text-primary/90">
            <FileText />
            <div className="hidden sm:block">
              <span className="text-xl font-medium text-slate-800">SDOCA</span>
              <div className="-mt-1 text-xs text-slate-500">Gestão documental e arquivos</div>
            </div>
          </a>
        </div>

        {/* CENTRO: Links Desktop centralizados */}
        <div className="w-full">
          <DesktopMenu navigationLinks={navigationLinks} />
        </div>

        {/* DIREITA: CTAs alinhados à direita */}
        <div className="flex items-center justify-end gap-2">
          <Button asChild variant="ghost" size="sm" className="text-sm">
            <a href="#">Sign In</a>
          </Button>
          <Button asChild size="sm" className="text-sm">
            <a href="#">Get Started</a>
          </Button>
        </div>

      </div>
    </header>
  )
}
