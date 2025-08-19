import NavBarMenu from "../components/navbar"
import HeroContent from "../components/hero-content"
import { cn } from "@/lib/utils"
import { AnimatedGridPattern } from "@/components/magicui/animated-grid-pattern"
import FeaturesContent from "../components/features-content"
import { Badge } from "@/components/ui/badge"
import PlansContent from "../components/pricing-content"

export default function Landing() {
  return (
    <div className="relative min-h-screen overflow-hidden">
      {/* Background animado global */}
      <AnimatedGridPattern
        numSquares={35}
        maxOpacity={0.08}
        duration={4}
        repeatDelay={1.5}
        className={cn(
          "fixed inset-0 z-0",
          "[mask-image:radial-gradient(1000px_circle_at_center,white,transparent)]"
        )}
      />

      {/* Conteúdo acima do pattern */}
      <div className="relative z-10 flex flex-col">
        <NavBarMenu />

        <HeroContent />

        {/* Features */}
        <div className="flex flex-col items-center justify-center min-h-screen gap-4 text-center w-full pt-20 lg:pt-40">
          <Badge className='bg-accent-foreground'>Recursos</Badge>

          <div className="flex flex-col items-center justify-center gap-2 text-center">
            <h2 className="text-3xl tracking-tighter md:text-5xl font-regular text-secondary-foreground">
              Gestão documental simplificada
            </h2>

            <p className="max-w-xl text-lg leading-relaxed text-center text-muted-foreground">
              Armazene, organize e acompanhe todos os documentos de forma rápida, segura e eficiente.
            </p>
          </div>

          <FeaturesContent />
        </div>

        {/* Pricing */}
        <div className="flex flex-col items-center justify-center min-h-screen gap-4 text-center w-full  pt-20 lg:pt-40">
          <Badge className='bg-accent-foreground'>Pacotes</Badge>

          <div className="flex flex-col items-center justify-center gap-2 text-center">
            <h2 className="text-3xl tracking-tighter md:text-5xl font-regular text-secondary-foreground">
              Preços que fazem sentido!
            </h2>

            <p className="max-w-xl text-lg leading-relaxed text-center text-muted-foreground">
              Planos que cabem no bolso de todos
            </p>
          </div>

          <PlansContent />
        </div>

        {/* Footer */}
        <footer className="py-10 text-sm text-center text-gray-500">
          © {new Date().getFullYear()} DocFlow. Todos os direitos reservados.
        </footer>
      </div>
    </div>
  )
}


