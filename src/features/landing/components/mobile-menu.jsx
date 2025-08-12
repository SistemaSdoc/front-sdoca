import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "@/components/ui/navigation-menu"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { Button } from "@/components/ui/button"

export default function MobileMenu({ navigationLinks = [] }) {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button className="group size-8 md:hidden" variant="ghost" size="icon" aria-label="Abrir menu">
          <svg
            className="pointer-events-none"
            width={16}
            height={16}
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round">
            <path d="M4 12L20 12" className="origin-center -translate-y-[7px] transition-all duration-300 group-aria-expanded:translate-y-0 group-aria-expanded:rotate-[315deg]" />
            <path d="M4 12H20" className="transition-all duration-300 origin-center group-aria-expanded:rotate-45" />
            <path d="M4 12H20" className="origin-center translate-y-[7px] transition-all duration-300 group-aria-expanded:translate-y-0 group-aria-expanded:rotate-[135deg]" />
          </svg>
        </Button>
      </PopoverTrigger>

      <PopoverContent align="start" className="w-64 p-1 md:hidden">
        <NavigationMenu className="max-w-none *:w-full">
          <NavigationMenuList className="flex-col items-start gap-0">
            {navigationLinks.map((link, index) => (
              <NavigationMenuItem key={index} className="w-full">
                {link.submenu ? (
                  <>
                    <div className="text-muted-foreground px-2 py-1.5 text-xs font-medium">
                      {link.label}
                    </div>
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

                {index < navigationLinks.length - 1 && (
                  <div role="separator" className="w-full h-px my-1 -mx-1 bg-border" />
                )}
              </NavigationMenuItem>
            ))}
          </NavigationMenuList>
        </NavigationMenu>
      </PopoverContent>
    </Popover>
  )
}
