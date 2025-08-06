import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import DocumentUploader from "@/features/documentos/components/document-uploader"
import { Card, CardContent } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Loader2 } from "lucide-react"
import { useScanMutation } from "@/lib/scan"

export function DocumentForm({
  register,
  handleSubmit,
  setValue,
  watch,
  onSubmit,
  isPending,
  areas = [],
  doc_types = [],
  isEdit = false,
  onPreviewPdf
}) {
  const currentFiles = watch("anexo_docs") || []
  const { mutate, isPending: isScanning } = useScanMutation({ currentFiles, setValue })

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="w-full max-w-3xl mx-auto rounded-xl bg-muted/50">
      <Tabs defaultValue='info' className='bg-background'>
        <TabsList className='w-full'>
          <TabsTrigger value='info'>
            Informações do documento
          </TabsTrigger>

          <TabsTrigger value='uploads'>
            Ficheiros
          </TabsTrigger>
        </TabsList>

        {/* Tab doc data */}
        <TabsContent value='info'>
          <Card className="shadow-none">
            <CardContent className="p-6 pt-1 pb-1">
              <div className="flex flex-col gap-5">
                {/* título */}
                <div className="*:not-first:mt-2">
                  <Label htmlFor="titulo_doc">Título do documento</Label>
                  <Input
                    readOnly={isEdit}
                    {...register("titulo_doc")}
                    id="titulo_doc"
                    placeholder="Ex: Relatório de estágio"
                  />
                </div>

                {/* tipo de documento */}
                <div className="*:not-first:mt-2">
                  <Label htmlFor="tipo_doc_id">Tipo de documento</Label>
                  <Select
                    defaultValue={doc_types?.id ? String(doc_types.id) : ""}
                    onValueChange={(value) => setValue("tipo_doc_id", value)}
                  >
                    <SelectTrigger id="tipo_doc_id" className="w-full">
                      <SelectValue placeholder="Selecione o tipo de documento" />
                    </SelectTrigger>
                    <SelectContent>
                      {doc_types.map((doc_type) => (
                        <SelectItem key={doc_type.id} value={String(doc_type.id)}>
                          {doc_type.nome}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* origem e destino */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="*:not-first:mt-2">
                    <Label htmlFor="area_origem_id">Área de origem</Label>
                    <Select
                      defaultValue={areas?.id ? String(areas.id) : ""}
                      onValueChange={(value) => setValue("area_origem_id", value)}
                    >
                      <SelectTrigger id="area_origem_id" className="w-full">
                        <SelectValue placeholder="Selecione a área de origem" />
                      </SelectTrigger>
                      <SelectContent>
                        {areas.map((area) => (
                          <SelectItem key={area.id} value={String(area.id)}>
                            {area.name_area}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="*:not-first:mt-2">
                    <Label htmlFor="area_destino_id">Área de destino</Label>
                    <Select
                      defaultValue={areas?.id ? String(areas.id) : ""}
                      onValueChange={(value) => setValue("area_destino_id", value)}
                    >
                      <SelectTrigger id="area_destino_id" className="w-full">
                        <SelectValue placeholder="Selecione a área de destino" />
                      </SelectTrigger>
                      <SelectContent>
                        {areas.map((area) => (
                          <SelectItem key={area.id} value={String(area.id)}>
                            {area.name_area}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                {/* descrição */}
                <div className="*:not-first:mt-2">
                  <Label htmlFor="descricao_doc">Descrição</Label>
                  <Textarea
                    readOnly={isEdit}
                    {...register("descricao_doc")}
                    id="descricao_doc"
                    placeholder="Ex: relatório do estágio de Stelvio Marques"
                  />
                </div>

                {/* submit button */}
                <Button type="submit" className="w-full" disabled={isPending}>
                  {isPending ? (
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  ) : isEdit ? (
                    "Atualizar Documento"
                  ) : (
                    "Criar Documento"
                  )}
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Tab doc files uploader */}
        <TabsContent value='uploads'>
          <Card className="shadow-none">
            <CardContent className="p-6 pt-1 pb-1">
              <div className="flex flex-col gap-5">
                {/* Scan button */}
                <Button
                  type="button"
                  variant="outline"
                  className="mt-2"
                  onClick={() => mutate()}
                  disabled={isScanning}
                >
                  {isScanning ? (
                    <>
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                      Escaneando...
                    </>
                  ) :
                    'Escanear Documento'
                  }
                </Button>

                <div className="flex items-center gap-2">
                  <div className="flex-grow h-px bg-border" />
                  <span className="text-sm text-muted-foreground">ou</span>
                  <div className="flex-grow h-px bg-border" />
                </div>

                {/* Document uploader */}
                <div className="*:not-first:mt-2">
                  <DocumentUploader
                    key={JSON.stringify(currentFiles.map(f => f.name))}
                    name="anexo_docs"
                    initialFiles={currentFiles}
                    onPreviewPdf={onPreviewPdf}
                    onChange={(newFiles) => {
                      const updated = [...currentFiles, ...newFiles]
                      const deduplicated = Array.from(new Map(updated.map(f => [f.name, f])).values())
                      setValue("anexo_docs", deduplicated)
                    }}
                  />
                </div>

                {/* submit button */}
                <Button type="submit" className="w-full" disabled={isPending}>
                  {isPending ? (
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  ) : isEdit ? (
                    "Atualizar Documento"
                  ) : (
                    "Criar Documento"
                  )}
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </form>
  )
}
