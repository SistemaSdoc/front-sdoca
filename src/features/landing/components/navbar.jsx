import { FileText } from "lucide-react"
import { Button } from "@/components/ui/button"
import MobileMenu from "./menu/mobile-menu"
import { Link } from "react-router-dom"
import DesktopMenu from "./menu/desktop-menu"

const ListItem = ({ className, title, children, icon: Icon, ...props }) => {
  return (
    <li>
      <NavigationMenuLink asChild>
        <a
          className={`block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground ${className}`}
          {...props}
        >
          <div className="flex items-center gap-2">
            {Icon && <Icon className="w-4 h-4" />}
            <div className="text-sm font-medium leading-none">{title}</div>
          </div>
          <p className="text-sm leading-snug line-clamp-2 text-muted-foreground">{children}</p>
        </a>
      </NavigationMenuLink>
    </li>
  )
}

export default function NavBarMenu() {
  return (
    <>
      <header className="px-4 md:px-6">
        <div className="flex items-center justify-between h-16 gap-4">
          {/* Left side */}
          <div className="flex items-center gap-2">
            {/* Mobile menu */}
            <MobileMenu />

            {/* Logo and navigation menu*/}
            <div className="flex items-center gap-6">
              {/* Logo */}
              <a href="#" className="flex items-center gap-2 text-primary hover:text-primary/90 group">
                <div className="transition-transform duration-200 group-hover:scale-105">
                  <FileText />
                </div>
                <span className="hidden text-lg font-medium sm:block">SDOCA</span>
              </a>

              {/* Navigation menu */}
              <DesktopMenu />
            </div>
          </div>

          {/* Right side */}
          <div className="flex items-center gap-2">
            <Button asChild variant="ghost">
              <a href="/login">Login</a>
            </Button>
            <Button asChild size="sm">
              <a href="#">Teste Grátis</a>
            </Button>
          </div>
        </div>
      </header>
    </>
  )
}
