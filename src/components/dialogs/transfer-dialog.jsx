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
  featureID,
}) {

  const {
    register,
    handleSubmit,
    areas,
    setValue,
    isLoading,
    isPending,
    onSubmit,
    watch
  } = useTransferForm(featureID)

  const watchAreaDestino = watch("area_destino_id")

  return (
    <AlertDialog open={showDialog} onOpenChange={onOpenChange && isPending}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Transferência</AlertDialogTitle>
          <AlertDialogDescription>
            Informe para onde deseja transferir essa entrada
          </AlertDialogDescription>
        </AlertDialogHeader>

        {isLoading ? (
          <div className="flex items-center justify-center py-8">
            <Loader2 className="w-8 h-8 animate-spin text-primary" />
          </div>
        ) : (
          <form onSubmit={onSubmit} className="w-full">
            <div className="flex flex-col gap-5">
              {/* destino */}
              <div className="*:not-first:mt-2">
                <Label htmlFor="area_destino_id">Área de destino</Label>
                <Select
                  value={watchAreaDestino}
                  onValueChange={(value) => setValue("area_destino_id", value)}
                  disabled={areas.length === 0}
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

              {/* descrição */}
              <div className="*:not-first:mt-2">
                <Label htmlFor="descricao_doc">Descrição</Label>
                <Textarea
                  {...register("descricao_doc")}
                  id="descricao_doc"
                  rows={4}
                  placeholder="Insira o motivo que o levou a tranferir documento..."
                />
              </div>
            </div>
          </form>
        )}

        <AlertDialogFooter>
          <AlertDialogCancel
            disabled={isPending}
            onClick={() => onOpenChange(false)}
          >
            Cancelar
          </AlertDialogCancel>

          <AlertDialogAction onClick={handleSubmit(onSubmit)} disabled={isPending || isLoading}>
            {isPending
              ? <><Loader2 className="w-4 h-4 mr-2 animate-spin" />Transferindo...</>
              : "Transferir"
            }
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}

