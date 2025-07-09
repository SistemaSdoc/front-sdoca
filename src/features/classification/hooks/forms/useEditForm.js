import { useForm } from "react-hook-form"
import { useTemporalidades } from "@/features/temporalidade/hooks/temporalidadeHooks"
import { useUpdateClassificacao, useClassificacao } from "@/features/classification/hooks/classificationHooks"

export function useEditForm(id) {
  const { temporalidades } = useTemporalidades()
  const { classificacao, isLoading } = useClassificacao(id)
  const mutation = useUpdateClassificacao(id)

  const form = useForm({
    values: classificacao?.codigo ? {
      codigo: classificacao.codigo,
      temporalidade_id: String(classificacao.temporalidade_id),
      descricao: classificacao.descricao,
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
    classificacao,
    temporalidades
  }
}
