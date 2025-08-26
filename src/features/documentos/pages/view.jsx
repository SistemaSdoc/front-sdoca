import { Link, useParams } from "react-router-dom"
import { Loader2, Plus } from "lucide-react"
import { Button } from "@/components/ui/button"
import { AnexosTable } from "@/features/documentos/components/anexos-table"
import { useDocument } from "@/features/documentos/hooks/docHooks"
import { Separator } from "@/components/ui/separator"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import QRCode from "@/components/qr-code"
import DetailsContent from "../components/details-content"
import HistoryContent from "../components/history-content"

export default function ViewAnexos() {
  const { id } = useParams()
  const { data, isLoading } = useDocument(id)

  return (
    <div className="relative space-y-6">

      {isLoading ? (
        <div className="flex justify-center py-10">
          <Loader2 className="w-6 h-6 animate-spin text-muted-foreground" />
        </div>
      ) : (
        <>
          {/* Header */}
          <div className="flex flex-col items-center w-full md:px-3 md:justify-between md:flex-row">
            <div className="order-2 text-center md:order-1 md:text-start">
              <h1 className="text-2xl font-medium text-accent-foreground">
                {data.documento.titulo_doc} 
              </h1>

              <p className="text-sm md:max-w-3xl text-muted-foreground">
                {data.documento.descricao_doc} Lorem ipsum dolor sit amet consectetur adipisicing elit. Odit dicta sequi animi beatae sapiente dolorem blanditiis ut
              </p>
            </div>

            <QRCode link={data.documento.qrcode_doc} />
          </div>

          <Separator />

          {/* Tabs Content */}
          <Tabs defaultValue="details" className="space-y-6">
            <TabsList className="grid w-full grid-cols-1 md:grid-cols-3">
              <TabsTrigger value="details">Detalhes</TabsTrigger>
              <TabsTrigger value="attachments">Ficheiros Anexados</TabsTrigger>
              <TabsTrigger value="history">Histórico</TabsTrigger>
            </TabsList>

            <TabsContent value="details" className="space-y-6">
              <DetailsContent data={data.documento} />
            </TabsContent>

            <TabsContent value="attachments" className="space-y-6">
              <AnexosTable Anexos={data.anexo_docs} />
            </TabsContent>

            <TabsContent value="history" className="space-y-6">
              <HistoryContent data={data} />
            </TabsContent>
          </Tabs>
        </>
      )}

      {/* <Link to="/dashboard/documents/new" className="fixed z-50 bottom-6 right-6 group">
        <Button className="flex items-center h-12 gap-2 px-4 text-white transition-all duration-200 rounded-lg shadow-xl bg-primary group-hover:pr-6">
          <Plus className="w-5 h-5 font" />
          <span className="text-sm font-medium transition-opacity duration-200 opacity-0 group-hover:opacity-100">
            Criar Documento
          </span>
        </Button>
      </Link> */}
    </div>
  )
}


