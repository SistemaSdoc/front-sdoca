import { Button } from "@/components/ui/button"
import MobileMenu from "./menu/mobile-menu"
import { Link } from "react-router-dom"
import DesktopMenu from "./menu/desktop-menu"
import Logo from "./logo"

export default function NavBarMenu() {
  return (
    <>
      <header className="px-4 md:px-6">
        <div className="flex items-center justify-between h-16 gap-10 md:justify-around">
          {/* Left side */}
          <div className="flex items-center gap-2">
            {/* Mobile menu */}
            <MobileMenu />

            {/* Logo and navigation menu*/}
            <div className="flex items-center gap-10">
              <Logo />
              <DesktopMenu />
            </div>
          </div>

          {/* Right side */}
          <div className="flex items-center gap-2">
            <Button asChild variant="ghost">
              <Link to="/login">Login</Link>
            </Button>

            <Button asChild size="sm">
              <Link to="#">Teste Grátis</Link>
            </Button>
          </div>
        </div>
      </header>
    </>
  )
}
