import { cn } from "@/lib/utils"
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu"
import { BookOpenIcon, LifeBuoyIcon, InfoIcon } from "lucide-react"

export default function DesktopMenu({ navigationLinks = [], className }) {
  return (
    <div className={cn("hidden md:flex w-full justify-center", className)}>
      <NavigationMenu viewport={false}>
        <NavigationMenuList className="gap-2">
          {navigationLinks.map((link, index) => (
            <NavigationMenuItem key={index}>
              {link.submenu ? (
                <>
                  <NavigationMenuTrigger className="text-muted-foreground hover:text-primary bg-transparent px-2 py-1.5 font-medium">
                    {link.label}
                  </NavigationMenuTrigger>
                  <NavigationMenuContent className="z-50 p-1">
                    <ul className={cn(link.type === "description" ? "min-w-64" : "min-w-48")}>
                      {link.items.map((item, i) => (
                        <li key={i}>
                          <NavigationMenuLink href={item.href} className="py-1.5">
                            {link.type === "icon" && item.icon ? (
                              <div className="flex items-center gap-2">
                                {item.icon === "BookOpenIcon" && <BookOpenIcon size={16} className="opacity-70" />}
                                {item.icon === "LifeBuoyIcon" && <LifeBuoyIcon size={16} className="opacity-70" />}
                                {item.icon === "InfoIcon" && <InfoIcon size={16} className="opacity-70" />}
                                <span>{item.label}</span>
                              </div>
                            ) : link.type === "description" && item.description ? (
                              <div className="space-y-1">
                                <div className="font-medium">{item.label}</div>
                                <p className="text-xs text-muted-foreground line-clamp-2">{item.description}</p>
                              </div>
                            ) : (
                              <span>{item.label}</span>
                            )}
                          </NavigationMenuLink>
                        </li>
                      ))}
                    </ul>
                  </NavigationMenuContent>
                </>
              ) : (
                <NavigationMenuLink href={link.href} className="text-muted-foreground hover:text-primary py-1.5 font-medium">
                  {link.label}
                </NavigationMenuLink>
              )}
            </NavigationMenuItem>
          ))}
        </NavigationMenuList>
      </NavigationMenu>
    </div>
  )
}
