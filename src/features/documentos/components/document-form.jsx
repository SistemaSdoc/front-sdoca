import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import DocumentUploader from "@/features/documentos/components/document-uploader"
import { Card, CardContent } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useScanMutation } from "@/lib/scan"
import { Loader2 } from "lucide-react"
import { useState, useCallback } from "react"
import { Controller } from "react-hook-form"

export function DocumentForm({
  watch,
  register,
  setValue,
  onSubmit,
  control,
  isPending,
  handleSubmit,
  onPreviewPdf,
  areas = [],
  doc_types = [],
  cabinets = [],
  drawers = [],
  processCovers = [],
  isEdit = false
}) {
  const currentFiles = watch("anexo_docs") || []
  const [uploaderFiles, setUploaderFiles] = useState([])

  // Função para adicionar arquivos ao uploader
  const addFileToUploader = useCallback((file) => {
    // Força uma atualização do estado com um novo array para garantir que o useEffect no DocumentUploader seja acionado
    setUploaderFiles(prev => {
      // Verifica se o arquivo já existe no array para evitar duplicatas
      const fileExists = prev.some(f => f.name === file.name)
      if (fileExists) return prev
      return [...prev, file]
    })
  }, [])

  const { mutate, isPending: isScanning } = useScanMutation({
    currentFiles,
    setValue,
    onScanComplete: (file) => {
      // Adiciona o arquivo escaneado ao estado do uploader
      addFileToUploader(file)

      // Atualiza o estado do React Hook Form diretamente
      const updatedFiles = [...currentFiles, file]
      const deduplicated = Array.from(new Map(updatedFiles.map(f => [f.name, f])).values())
      setValue("anexo_docs", deduplicated)
    }
  })

  const selectedCabinet = watch('armario_id')

  const filteredDrawers = drawers.filter((drawer) => {
    return String(drawer.armario_id) === String(selectedCabinet)
  })

  const selectedDrawer = watch('gaveta_id')

  const filteredProcessCovers = processCovers.filter((cover) => {
    return String(cover.gaveta_id) === String(selectedDrawer)
  })


  return (
    <form onSubmit={handleSubmit(onSubmit)} className="w-full max-w-3xl mx-auto rounded-xl bg-muted/50">
      <Tabs defaultValue='utentes' className='bg-background'>
        <TabsList className='w-full'>
          <TabsTrigger value='utentes'>
            Dados do utentes
          </TabsTrigger>

          <TabsTrigger value='info'>
            Informações do documento
          </TabsTrigger>

          <TabsTrigger value='uploads'>
            Ficheiros
          </TabsTrigger>
        </TabsList>

        {/* Tab utente data */}
        <TabsContent value='utentes' forceMount>
          <Card className="shadow-none">
            <CardContent className="p-6 pt-1 pb-1">
              <div className="flex flex-col gap-5">
                {/* nº bi*/}
                <div className="*:not-first:mt-2">
                  <Label htmlFor="n_bi">Nº Bilhete</Label>
                  <Input
                    readOnly={isEdit}
                    {...register("n_bi")}
                    id="n_bi"
                    placeholder="Ex: 021986560LA054"
                  />
                </div>

                {/* Nome */}
                <div className="*:not-first:mt-2">
                  <Label htmlFor="nome">Nome</Label>
                  <Input
                    readOnly={isEdit}
                    {...register("nome")}
                    id="nome"
                    placeholder="Ex: João Silva"
                  />
                </div>

                {/* email*/}
                <div className="*:not-first:mt-2">
                  <Label htmlFor="email">E-mail</Label>
                  <Input
                    readOnly={isEdit}
                    {...register("email")}
                    id="email"
                    placeholder="Ex: exemplo@email.com"
                  />
                </div>

                {/* nº telefone */}
                <div className="*:not-first:mt-2">
                  <Label htmlFor="telefone">Telefone</Label>
                  <Input
                    readOnly={isEdit}
                    type='number'
                    {...register("telefone")}
                    id="telefone"
                    placeholder="Ex: 923000000"
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

        {/* Tab doc data */}
        <TabsContent value='info' forceMount>
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

                <div className="grid grid-cols-2 gap-4">
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

                  {/* Privacidade */}
                  <div className="*:not-first:mt-2">
                    <Label htmlFor="privacidade">Nível de privacidade</Label>

                    <Controller
                      name="privacidade"
                      control={control} // vem do useForm()
                      defaultValue="0"
                      render={({ field }) => (
                        <Select onValueChange={field.onChange} value={field.value}>
                          <SelectTrigger id="privacidade" className="w-full">
                            <SelectValue placeholder="Selecione o nível" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="0">Público</SelectItem>
                            <SelectItem value="1">Secreto</SelectItem>
                            <SelectItem value="2">Ultra secreto</SelectItem>
                          </SelectContent>
                        </Select>
                      )}
                    />
                  </div>
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

                {/* Mapeamento Físico */}
                <div className="grid gap-4 md:grid-cols-3">
                  <div className="*:not-first:mt-2">
                    <Label htmlFor="armario_id">Armário</Label>
                    <Select
                      defaultValue={document?.armario_id ? String(document.armario_id) : ""}
                      onValueChange={(value) => {
                        setValue("armario_id", value)
                        setValue("gaveta_id", "")
                        setValue("capa_processo_id", "")
                      }}
                    >
                      <SelectTrigger id="armario_id" className="w-full">
                        <SelectValue placeholder="Selecione o armário" />
                      </SelectTrigger>
                      <SelectContent>
                        {cabinets.map((cabinet) => (
                          <SelectItem key={cabinet.id} value={String(cabinet.id)}>
                            Armário {cabinet.num_armario}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  {/* gaveta */}
                  <div className="*:not-first:mt-2">
                    <Label htmlFor="gaveta_id">Gaveta</Label>
                    <Select
                      defaultValue={document?.gaveta_id ? String(document.gaveta_id) : ""}
                      value={watch("gaveta_id") || ""}
                      onValueChange={(value) => {
                        setValue("gaveta_id", value);
                        setValue("capa_processo_id", ""); // reset capa ao trocar gaveta
                      }}
                      disabled={!selectedCabinet || filteredDrawers.length === 0} // só habilita se escolheu armário
                    >
                      <SelectTrigger id="gaveta_id" className="w-full">
                        <SelectValue
                          placeholder={
                            !selectedCabinet
                              ? "Selecione um armário primeiro"
                              : filteredDrawers.length === 0
                                ? "Nenhuma gaveta disponível"
                                : "Selecione a gaveta"
                          }
                        />
                      </SelectTrigger>

                      <SelectContent>
                        {filteredDrawers.map((drawer) => (
                          <SelectItem key={drawer.id} value={String(drawer.id)}>
                            Gaveta {drawer.num_gaveta} - {drawer.titulo}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  {/* capa */}
                  <div className="*:not-first:mt-2">
                    <Label htmlFor="capa_processo_id">Capa de Processo</Label>
                    <Select
                      defaultValue={document?.capa_processo_id ? String(document.capa_processo_id) : ""}
                      value={watch("capa_processo_id") || ""}
                      onValueChange={(value) => setValue("capa_processo_id", value)}
                      disabled={!selectedDrawer || filteredProcessCovers.length === 0} // só habilita se escolheu gaveta
                    >
                      <SelectTrigger id="capa_processo_id" className="w-full">
                        <SelectValue
                          placeholder={
                            !selectedDrawer
                              ? "Selecione uma gaveta primeiro"
                              : filteredProcessCovers.length === 0
                                ? "Nenhuma capa disponível"
                                : "Selecione a capa"
                          }
                        />
                      </SelectTrigger>

                      <SelectContent>
                        {filteredProcessCovers.map((cover) => (
                          <SelectItem key={cover.id} value={String(cover.id)}>
                            {cover.num_capa_processo} - {cover.nome_tipo}
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
        <TabsContent value='uploads' forceMount>
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
                    name="anexo_docs"
                    onPreviewPdf={onPreviewPdf}
                    initialFiles={uploaderFiles}
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
