import { useForm } from "react-hook-form"
import { useTemporalidade, useUpdateTemporalidade } from "@/features/temporalidade/hooks/temporalidadeHooks"

export function useEditForm(id) {
  const { temporalidade, isLoading } = useTemporalidade(id)
  const mutation = useUpdateTemporalidade(id)

  const form = useForm({
    values: temporalidade?.nome_fase ? {
      nome_fase: temporalidade.nome_fase,
      prazo_guarda: temporalidade.prazo_guarda,
      destino_final: temporalidade.destino_final,
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
    temporalidade
  }
}
