import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { MoveRight, PhoneCall } from "lucide-react";

export default function CTAContent() {

  return (
      <div className="container mx-auto">
        <div className="flex flex-col items-center gap-8 p-4 text-center rounded-md lg:p-14">
          <div>
            <Badge>Começar</Badge>
          </div>
          <div className="flex flex-col gap-2">
            <h3 className="text-3xl tracking-tighter  md:text-5xl font-regular">
              Esperimente a nossa plataforma hoje!
            </h3>
            <p className="max-w-xl text-lg leading-relaxed tracking-tight text-muted-foreground">
              Managing a small business today is already tough. Avoid further
              complications by ditching outdated, tedious trade methods. Our goal
              is to streamline SMB trade, making it easier and faster than ever.
            </p>
          </div>
          <div className="flex flex-row gap-4">
            <Button className="gap-4" variant="outline">
              Agendar Demonstração <PhoneCall className="w-4 h-4" />
            </Button>
            <Button className="gap-4">
              Começar Agora <MoveRight className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </div>
  )
}


