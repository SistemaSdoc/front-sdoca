import { useState } from "react"
import { Link } from "react-router-dom"
import { Button } from "@/components/ui/button"
import { ChevronLeftIcon, FileText, Loader2 } from "lucide-react"
import { useCreateForm } from "@/features/documentos/hooks/forms/useCreateForm"
import { DocumentForm } from "@/features/documentos/components/document-form"
import { Viewer } from '@react-pdf-viewer/core';
import '@react-pdf-viewer/core/lib/styles/index.css';


// layout padrão plugin
import { defaultLayoutPlugin } from '@react-pdf-viewer/default-layout';
import '@react-pdf-viewer/default-layout/lib/styles/index.css';




export default function NewDocument() {
  const [selectedPdfUrl, setSelectedPdfUrl] = useState(null)

  // Adiciona o que tu quiser aqui
  const renderToolbar = (Toolbar) => (
    <>
      <Toolbar />
      <div className="p-2 text-sm border-t text-muted-foreground">
        <button onClick={() => { alert('Ação personalizada') }} className="px-3 py-1 text-white rounded bg-primary">
          Ação personalizada
        </button>
      </div>
    </>
  );

  const defaultLayoutPluginInstance = defaultLayoutPlugin({
    renderToolbar,
  });


  const {
    register,
    handleSubmit,
    setValue,
    onSubmit,
    isPending,
    isLoading,
    areas,
    tiposDocumentos
  } = useCreateForm()

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-40">
        <Loader2 className="w-6 h-6 animate-spin" />
      </div>
    )
  }

  return (
    <>
      {/* PDF Viewer em tela cheia */}
      {selectedPdfUrl && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-background">
          <div className="absolute z-50 top-4 right-4">
            <Button variant="outline" onClick={() => setSelectedPdfUrl(null)}>
              Fechar
            </Button>
          </div>

          <div className="w-full h-[99.9vh] flex flex-col md:flex-row bg-white border shadow rounded overflow-hidden">
            {/* PDF Viewer */}
            <div className="flex-1 overflow-hidden">
              <Viewer
                fileUrl={selectedPdfUrl}
                defaultScale="PageFit"
                initialPage={0}
                theme="light"
                plugins={[defaultLayoutPluginInstance]}

              />
            </div>
          </div>
        </div>
      )}


      <div className="pt-2 pl-4">
        <Link to='/dashboard/documents'>
          <Button variant="link" className="gap-1">
            <ChevronLeftIcon className="opacity-60" size={16} />
            Voltar
          </Button>
        </Link>
      </div>

      <div className="space-y-2 text-center">
        <div className="flex items-center justify-center space-x-2">
          <FileText className="w-8 h-8 text-primary" />
          <h1 className="text-3xl font-medium">Criar Novo Documento</h1>
        </div>
        <p className="text-muted-foreground">
          Preencha os dados abaixo para registrar um novo documento no sistema
        </p>
      </div>

      <DocumentForm
        register={register}
        handleSubmit={handleSubmit}
        setValue={setValue}
        onSubmit={onSubmit}
        isPending={isPending}
        areas={areas}
        doc_types={tiposDocumentos}
        onPreviewPdf={setSelectedPdfUrl}
      />
    </>
  )
}
