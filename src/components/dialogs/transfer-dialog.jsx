import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Loader2 } from "lucide-react"
import { useTransferForm } from '@/features/documentos/hooks/forms/useTransferForm'
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogCancel,
  AlertDialogAction
} from "@/components/ui/alert-dialog"

export default function TransferDialog({
  showDialog = false,
  onOpenChange,
  onConfirm,
  isPending = false,
  featureID,
}) {

  const {
    register,
    areas,
    tiposDocumentos,
    setValue,
    data,
    user
  } = useTransferForm(featureID)

  return (
    <AlertDialog open={showDialog} onOpenChange={onOpenChange}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Transferência</AlertDialogTitle>
          <AlertDialogDescription>
            Informe para onde deseja transferir essa entrada
          </AlertDialogDescription>
        </AlertDialogHeader>

        <form /* onSubmit={handleSubmit(onSubmit)} */ className="w-full">
          <div className="flex flex-col gap-5">
            {/* título */}
            <div className="*:not-first:mt-2">
              <Label htmlFor="titulo_doc">Título do documento</Label>
              <Input
                readOnly
                {...register("titulo_doc")}
                id="titulo_doc"
                placeholder="Ex: Relatório de estágio"
              />
            </div>

            {/* tipo de documento */}
            <div className="*:not-first:mt-2">
              <Label htmlFor="tipo_doc_id">Tipo de documento</Label>
              <Select
                defaultValue={data.documento?.tipo_doc_id ? String(data.documento.tipo_doc_id) : ""}
                onValueChange={(value) => setValue("tipo_doc_id", value)}
              >
                <SelectTrigger id="tipo_doc_id" className="w-full">
                  <SelectValue placeholder="Selecione o tipo de documento" />
                </SelectTrigger>
                <SelectContent>
                  {tiposDocumentos.map((doc_type) => (
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
                  defaultValue={user?.id_area ? String(user.id_area) : ""}
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
                {...register("descricao_doc")}
                id="descricao_doc"
                placeholder="Ex: relatório do estágio de Stelvio Marques"
              />
            </div>
          </div>
        </form>

        <AlertDialogFooter>
          <AlertDialogCancel disabled={isPending}>Cancelar</AlertDialogCancel>

          <AlertDialogAction onClick={onConfirm} disabled={isPending}>
            {isPending
              ? <Loader2 className="w-4 h-4 mr-2 animate-spin" />
              : "Transferir"
            }
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}

