import { Check, Minus, MoveRight, PhoneCall } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

export default function PricingContent() {
  return (
    <div className="w-full py-20 lg:py-40">
      <div className="container mx-auto">
        <div className="flex flex-col items-center justify-center gap-4 text-center">
          <Badge>Pricing</Badge>
          
          <div className="flex flex-col gap-2">
            <h2 className="max-w-xl text-3xl tracking-tighter text-center md:text-5xl font-regular">
              Prices that make sense!
            </h2>
            <p className="max-w-xl text-lg leading-relaxed tracking-tight text-center text-muted-foreground">
              Managing a small business today is already tough.
            </p>
          </div>
          
          <div className="grid w-full grid-cols-3 pt-20 text-left divide-x lg:grid-cols-4">
            <div className="col-span-3 lg:col-span-1"></div>
            <div className="flex flex-col gap-2 px-3 py-1 md:px-6 md:py-4">
              <p className="text-2xl">Startup</p>
              <p className="text-sm text-muted-foreground">
                Our goal is to streamline SMB trade, making it easier and faster
                than ever for everyone and everywhere.
              </p>
              <p className="flex flex-col gap-2 mt-8 text-xl lg:flex-row lg:items-center">
                <span className="text-4xl">$40</span>
                <span className="text-sm text-muted-foreground"> / month</span>
              </p>
              <Button variant="outline" className="gap-4 mt-8">
                Try it <MoveRight className="w-4 h-4" />
              </Button>
            </div>
            <div className="flex flex-col gap-2 px-3 py-1 md:px-6 md:py-4">
              <p className="text-2xl">Growth</p>
              <p className="text-sm text-muted-foreground">
                Our goal is to streamline SMB trade, making it easier and faster
                than ever for everyone and everywhere.
              </p>
              <p className="flex flex-col gap-2 mt-8 text-xl lg:flex-row lg:items-center">
                <span className="text-4xl">$40</span>
                <span className="text-sm text-muted-foreground"> / month</span>
              </p>
              <Button className="gap-4 mt-8">
                Try it <MoveRight className="w-4 h-4" />
              </Button>
            </div>
            <div className="flex flex-col gap-2 px-3 py-1 md:px-6 md:py-4">
              <p className="text-2xl">Enterprise</p>
              <p className="text-sm text-muted-foreground">
                Our goal is to streamline SMB trade, making it easier and faster
                than ever for everyone and everywhere.
              </p>
              <p className="flex flex-col gap-2 mt-8 text-xl lg:flex-row lg:items-center">
                <span className="text-4xl">$40</span>
                <span className="text-sm text-muted-foreground"> / month</span>
              </p>
              <Button variant="outline" className="gap-4 mt-8">
                Contact us <PhoneCall className="w-4 h-4" />
              </Button>
            </div>
            <div className="col-span-3 px-3 py-4 lg:px-6 lg:col-span-1">
              <b>Features</b>
            </div>
            <div></div>
            <div></div>
            <div></div>
            <div className="col-span-3 px-3 py-4 lg:px-6 lg:col-span-1">SSO</div>
            <div className="flex justify-center px-3 py-1 md:px-6 md:py-4">
              <Check className="w-4 h-4 text-primary" />
            </div>
            <div className="flex justify-center px-3 py-1 md:px-6 md:py-4">
              <Check className="w-4 h-4 text-primary" />
            </div>
            <div className="flex justify-center px-3 py-1 md:px-6 md:py-4">
              <Check className="w-4 h-4 text-primary" />
            </div>
            <div className="col-span-3 px-3 py-4 lg:px-6 lg:col-span-1">
              AI Assistant
            </div>
            <div className="flex justify-center px-3 py-1 md:px-6 md:py-4">
              <Minus className="w-4 h-4 text-muted-foreground" />
            </div>
            <div className="flex justify-center px-3 py-1 md:px-6 md:py-4">
              <Check className="w-4 h-4 text-primary" />
            </div>
            <div className="flex justify-center px-3 py-1 md:px-6 md:py-4">
              <Check className="w-4 h-4 text-primary" />
            </div>
            <div className="col-span-3 px-3 py-4 lg:px-6 lg:col-span-1">
              Version Control
            </div>
            <div className="flex justify-center px-3 py-1 md:px-6 md:py-4">
              <Minus className="w-4 h-4 text-muted-foreground" />
            </div>
            <div className="flex justify-center px-3 py-1 md:px-6 md:py-4">
              <Check className="w-4 h-4 text-primary" />
            </div>
            <div className="flex justify-center px-3 py-1 md:px-6 md:py-4">
              <Check className="w-4 h-4 text-primary" />
            </div>
            <div className="col-span-3 px-3 py-4 lg:px-6 lg:col-span-1">
              Members
            </div>
            <div className="flex justify-center px-3 py-1 md:px-6 md:py-4">
              <p className="text-sm text-muted-foreground">5 members</p>
            </div>
            <div className="flex justify-center px-3 py-1 md:px-6 md:py-4">
              <p className="text-sm text-muted-foreground">25 members</p>
            </div>
            <div className="flex justify-center px-3 py-1 md:px-6 md:py-4">
              <p className="text-sm text-muted-foreground">100+ members</p>
            </div>
            <div className="col-span-3 px-3 py-4 lg:px-6 lg:col-span-1">
              Multiplayer Mode
            </div>
            <div className="flex justify-center px-3 py-1 md:px-6 md:py-4">
              <Minus className="w-4 h-4 text-muted-foreground" />
            </div>
            <div className="flex justify-center px-3 py-1 md:px-6 md:py-4">
              <Check className="w-4 h-4 text-primary" />
            </div>
            <div className="flex justify-center px-3 py-1 md:px-6 md:py-4">
              <Check className="w-4 h-4 text-primary" />
            </div>
            <div className="col-span-3 px-3 py-4 lg:px-6 lg:col-span-1">
              Orchestration
            </div>
            <div className="flex justify-center px-3 py-1 md:px-6 md:py-4">
              <Minus className="w-4 h-4 text-muted-foreground" />
            </div>
            <div className="flex justify-center px-3 py-1 md:px-6 md:py-4">
              <Check className="w-4 h-4 text-primary" />
            </div>
            <div className="flex justify-center px-3 py-1 md:px-6 md:py-4">
              <Check className="w-4 h-4 text-primary" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}