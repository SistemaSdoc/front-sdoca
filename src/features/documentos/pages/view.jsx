import { Link, useParams } from "react-router-dom"
import { Loader2, Plus } from "lucide-react"
import { Button } from "@/components/ui/button"
import { AnexosTable } from "@/features/documentos/components/anexos-table"
import { useDocument } from "@/features/documentos/hooks/docHooks"

import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import DocumentTimeline from "@/components/document-timeline"
import { Download, Eye, FileText, Calendar, User, Building, Tag, Archive } from "lucide-react"

export default function ViewAnexos() {
  const { id } = useParams()
  const { document, isLoading } = useDocument(id)

  return (
    <div className="relative space-y-6">


      {isLoading ? (
        <div className="flex justify-center py-10">
          <Loader2 className="w-6 h-6 animate-spin text-muted-foreground" />
        </div>
      ) : (
        <>
          {/* Header */}
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <FileText className="w-6 h-6 text-muted-foreground" />
              <h1 className="text-3xl font-bold tracking-tight">{document.nome}</h1>
            </div>
            <p className="max-w-2xl text-lg text-muted-foreground">{document.descricao}</p>
          </div>

          <Separator />

          {/* Tabs Content */}
          <Tabs defaultValue="details" className="space-y-6">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="details">Detalhes</TabsTrigger>
              <TabsTrigger value="attachments">Ficheiros Anexados</TabsTrigger>
              <TabsTrigger value="history">Histórico</TabsTrigger>
            </TabsList>

            <TabsContent value="details" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Informações do Documento</CardTitle>
                  <CardDescription>Detalhes completos sobre o documento</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                    <div className="space-y-4">
                      <div>
                        <label className="text-sm font-medium text-muted-foreground">ID do Documento</label>
                        <p className="px-2 py-1 mt-1 font-mono text-sm rounded bg-muted">{document.id}</p>
                      </div>
                      <div>
                        <label className="text-sm font-medium text-muted-foreground">Categoria</label>
                        <p className="mt-1 text-sm">{document.category}</p>
                      </div>
                      <div>
                        <label className="text-sm font-medium text-muted-foreground">Tamanho</label>
                        <p className="mt-1 text-sm">{document.size}</p>
                      </div>
                    </div>
                    <div className="space-y-4">
                      <div>
                        <label className="text-sm font-medium text-muted-foreground">Última Atualização</label>
                        <p className="mt-1 text-sm">(document.updatedAt)</p>
                      </div>
                      <div>
                        <label className="text-sm font-medium text-muted-foreground">Tags</label>
                        <div className="flex flex-wrap gap-1 mt-1">
                          {/*  {document.tags.map((tag, index) => (
                        <Badge key={index} variant="secondary" className="text-xs">
                          <Tag className="w-3 h-3 mr-1" />
                          {tag}
                        </Badge>
                      ))} */}
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="attachments" className="space-y-6">
              <AnexosTable Anexos={document} />
            </TabsContent>

            <TabsContent value="history" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Histórico do Documento</CardTitle>
                  <CardDescription>Cronologia completa de todas as alterações e ações</CardDescription>
                </CardHeader>
                <CardContent>
                  <DocumentTimeline />
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </>
      )}

      <Link to="/dashboard/documents/new" className="fixed z-50 bottom-6 right-6 group">
        <Button className="flex items-center h-12 gap-2 px-4 text-white transition-all duration-200 rounded-lg shadow-xl bg-primary group-hover:pr-6">
          <Plus className="w-5 h-5 font" />
          <span className="text-sm font-medium transition-opacity duration-200 opacity-0 group-hover:opacity-100">
            Criar Documento
          </span>
        </Button>
      </Link>
    </div>
  )
}


