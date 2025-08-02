import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Loader2, EyeIcon, EyeOffIcon } from "lucide-react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import DocumentUploader from "@/features/documentos/components/document-uploader"
import { Textarea } from "@/components/ui/textarea"

export function DocumentForm({
  register,
  handleSubmit,
  setValue,
  onSubmit,
  isPending,
  doc_types = [],
  areas = [],
  isEdit = false,
  onPreviewPdf
}) {
  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="w-full max-w-3xl mx-auto rounded-xl bg-muted/50"
    >
      <Card className="shadow-none">
        <CardContent className="p-6 pt-1 pb-1">
          <div className="flex flex-col gap-5">
            {/* doc uploader */}
            <div className="*:not-first:mt-2">
              <DocumentUploader
                name="anexo_docs"
                onPreviewPdf={onPreviewPdf}
                onChange={(files) => setValue("anexo_docs", files)}
              />
            </div>

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

            {/* Origem e Destino */}
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
                placeholder="Ex: relatório do de estágio de Stelvio Marques"
              />
            </div>

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
    </form>
  )
}
