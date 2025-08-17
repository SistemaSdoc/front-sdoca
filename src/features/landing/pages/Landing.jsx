import { Link } from "react-router-dom"
import NavBarMenu from "../components/navbar"
import { cn } from "@/lib/utils"
import { AnimatedGridPattern } from "@/components/magicui/animated-grid-pattern"
import { Button } from "@/components/ui/button"
import { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import { ChevronRight, MoveRight, PhoneCall } from "lucide-react";
import * as React from "react";

export default function Landing() {
  const [titleNumber, setTitleNumber] = useState(0);
  const titles = useMemo(() => ["eficiente", "inteligente", "segura", "moderna", "completa"], []);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      if (titleNumber === titles.length - 1) {
        setTitleNumber(0);
      } else {
        setTitleNumber(titleNumber + 1);
      }
    }, 2000);

    return () => clearTimeout(timeoutId);
  }, [titleNumber, titles]);

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
        {/* Header */}

        <div className="container mx-auto">
          <div className="flex gap-8 py-20 lg:py-20 items-center justify-center flex-col">
            <div className="flex gap-4 flex-col">
              <h1 className="text-5xl md:text-7xl max-w-2xl tracking-tighter text-center font-regular">
                <span className="text-secondary-foreground">Gestão documental</span>
                <span className="relative flex w-full justify-center overflow-hidden text-center md:pb-4 md:pt-1">
                  &nbsp;
                  {titles.map((title, index) => (
                    <motion.span
                      key={index}
                      className="absolute font-semibold text-accent-foreground"
                      initial={{ opacity: 0, y: "-100" }}
                      transition={{ type: "spring", stiffness: 50 }}
                      animate={
                        titleNumber === index
                          ? {
                            y: 0,
                            opacity: 1,
                          }
                          : {
                            y: titleNumber > index ? -150 : 150,
                            opacity: 0,
                          }
                      }
                    >
                      {title}
                    </motion.span>
                  ))}
                </span>
              </h1>

              <p className="text-lg md:text-xl leading-relaxed tracking-tight text-muted-foreground max-w-2xl text-center">
                Transforme a gestão de documentos da sua empresa com nossa plataforma
                avançada. Organize, compartilhe e controle todos os seus documentos
                de forma segura e eficiente, garantindo compliance e produtividade.
              </p>
            </div>

            <div className="flex flex-row gap-3">
              <Button size="lg" className="gap-4" variant="outline">
                Agendar demonstração
              </Button>
              <Button size="lg" className="gap-4">
                Começar agora <ChevronRight className="" />
              </Button>
            </div>
          </div>
        </div>

        {/* Features */}
        <section className="container px-4 py-20 mx-auto">
          <div className="grid gap-10 md:grid-cols-3">
            <div className="p-6 bg-white/80 backdrop-blur-md rounded-xl shadow-sm border">
              <h3 className="text-lg font-semibold mb-2">📂 Organização Inteligente</h3>
              <p className="text-gray-700">
                Categorize e pesquise documentos com facilidade usando tags e filtros avançados.
              </p>
            </div>
            <div className="p-6 bg-white/80 backdrop-blur-md rounded-xl shadow-sm border">
              <h3 className="text-lg font-semibold mb-2">🤝 Colaboração em Tempo Real</h3>
              <p className="text-gray-700">
                Trabalhe junto com sua equipe em tempo real, com comentários e versões automáticas.
              </p>
            </div>
            <div className="p-6 bg-white/80 backdrop-blur-md rounded-xl shadow-sm border">
              <h3 className="text-lg font-semibold mb-2">🔒 Segurança de Primeira</h3>
              <p className="text-gray-700">
                Seus arquivos protegidos com criptografia ponta a ponta e backups automáticos.
              </p>
            </div>
          </div>

          <div className="mt-20 text-center">
            <h2 className="text-3xl font-bold mb-6">Pronto pra simplificar sua vida?</h2>
            <Button size="lg" className="px-8">
              Criar Conta Grátis
            </Button>
          </div>
        </section>

        <br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br />
        {/* Footer */}
        <footer className="py-10 text-center text-gray-500 text-sm">
          © {new Date().getFullYear()} DocFlow. Todos os direitos reservados.
        </footer>
      </div>
    </div>
  )
}


