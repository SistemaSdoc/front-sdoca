import { useForm } from "react-hook-form"
import { useTipoDocumento, useUpdateTipoDocumento } from "@/features/doc-type/hooks/doc-typeHooks"
import { useTemporalidades } from "@/features/temporalidade/hooks/temporalidadeHooks"

export function useEditForm(id) {
  const { temporalidades } = useTemporalidades()
  const { tipoDocumento, isLoading } = useTipoDocumento(id)
  const mutation = useUpdateTipoDocumento(id)

  const form = useForm({
    values: tipoDocumento?.nome ? {
      nome: tipoDocumento.nome,
      nivel: tipoDocumento.nivel,
      temporalidade_id: String(tipoDocumento.temporalidade_id),
      descricao: tipoDocumento.descricao,
    } : undefined
  })

  const onSubmit = form.handleSubmit((formData) => {
    mutation.mutate({ id, formData })
  })

  return {
    isLoading,
    isPending: mutation.isPending,
    onSubmit,
    ...form,
    tipoDocumento,
    temporalidades
  }
}
