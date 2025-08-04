"use client"

import {
  Archive,
  Boxes,
  Clock,
  FileText,
  FolderOpen,
  Layers,
  Settings,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs"
import { useNavigate } from "react-router-dom"

export function Settingss() {
  const navigate = useNavigate()

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="space-y-2 text-center">
        <h1 className="text-3xl font-bold tracking-tight">Configurações do Sistema</h1>
        <p className="text-muted-foreground">
          Personalize o comportamento do sistema de gestão documental
        </p>
      </div>

      {/* Tabs */}
      <Tabs defaultValue="documents" className="space-y-6">
        <TabsList className="grid w-full grid-cols-1 sm:grid-cols-2">
          <TabsTrigger value="documents" className="flex items-center space-x-2">
            <FileText className="w-4 h-4" />
            <span>Documentos</span>
          </TabsTrigger>
          <TabsTrigger value="others" className="flex items-center space-x-2">
            <Settings className="w-4 h-4" />
            <span>Outras</span>
          </TabsTrigger>
        </TabsList>

        {/* Tab: Documentos */}
        <TabsContent value="documents" className="space-y-10">
          {/* Seção 1: Definições Lógicas */}
          <div className="space-y-4">
            <h2 className="text-lg font-semibold">Tipologia e Retenção</h2>

            <div className="grid gap-4 lg:grid-cols-2">
              {/* Temporalidades */}
              <Card className='shadow-none'>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Clock className="w-5 h-5 text-icon-foreground" />
                    <span>Temporalidades</span>
                  </CardTitle>
                  <CardDescription>
                    Gerencie os prazos de guarda e destino dos documentos.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Button onClick={() => navigate("/dashboard/temps")}>
                    Gerenciar
                  </Button>
                </CardContent>
              </Card>

              {/* Tipos de Documentos */}
              <Card className='shadow-none'>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <FileText className="w-5 h-5 text-icon-foreground" />
                    <span>Tipos de Documentos</span>
                  </CardTitle>
                  <CardDescription>
                    Classifique os documentos por tipo ou categoria.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Button onClick={() => navigate("/dashboard/doc-types")}>
                    Gerenciar
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Seção 2: Mapeamento Físico */}
          <div className="space-y-4">
            <h2 className="text-lg font-semibold">Mapeamento Físico</h2>

            <div className="grid gap-4 lg:grid-cols-3">
              {/* Armários */}
              <Card className='shadow-none'>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Boxes className="w-5 h-5 text-icon-foreground" />
                    <span>Armários</span>
                  </CardTitle>
                  <CardDescription>
                    Gerencie os armários físicos usados para arquivamento.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Button onClick={() => navigate("/dashboard/cabinets")}>
                    Gerenciar
                  </Button>
                </CardContent>
              </Card>

              {/* Gavetas */}
              <Card className='shadow-none'>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Archive className="w-5 h-5 text-icon-foreground" />
                    <span>Gavetas</span>
                  </CardTitle>
                  <CardDescription>
                    Defina a estrutura de gavetas dentro dos armários.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Button onClick={() => navigate("/dashboard/drawers")}>
                    Gerenciar
                  </Button>
                </CardContent>
              </Card>

              {/* Capas de Processo */}
              <Card className='shadow-none'>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <FolderOpen className="w-5 h-5 text-icon-foreground" />
                    <span>Capas de Processo</span>
                  </CardTitle>
                  <CardDescription>
                    Organize as capas dentro das gavetas físicas.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Button onClick={() => navigate("/dashboard/capas-processo")}>
                    Gerenciar
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </TabsContent>

        {/* Tab: Outras Configurações */}
        <TabsContent value="others" className="space-y-6">
          <Card className='shadow-none'>
            <CardHeader>
              <CardTitle>Outras Configurações</CardTitle>
              <CardDescription>
                Configurações gerais do sistema
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="py-12 text-center">
                <Settings className="w-12 h-12 mx-auto mb-4 text-icon-foreground" />
                <h3 className="mb-2 text-lg font-semibold">
                  Em breve
                </h3>
                <p className="text-muted-foreground">
                  Outras opções estarão disponíveis aqui.
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
