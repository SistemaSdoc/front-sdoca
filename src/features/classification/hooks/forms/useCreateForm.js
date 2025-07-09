import { useForm } from "react-hook-form"
import { useTemporalidades } from "@/features/temporalidade/hooks/temporalidadeHooks"
import { useCreateClassificacao } from "@/features/classification/hooks/classificationHooks"

export function useCreateForm() {
  const { temporalidades, isLoading } = useTemporalidades()
  const mutation = useCreateClassificacao()

  const form = useForm({
    defaultValues: {
      codigo: "",
      temporalidade_id: "",
      descricao: "",
    }
  })

  const onSubmit = form.handleSubmit((formData) => {
    mutation.mutate(formData)
  })

  return {
    isLoading,
    isPending: mutation.isPending,
    onSubmit,
    ...form,
    temporalidades
  }
}
