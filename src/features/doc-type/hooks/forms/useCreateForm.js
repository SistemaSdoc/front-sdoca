import { useForm } from "react-hook-form"
import { useCreateTipoDocumento } from "@/features/doc-type/hooks/doc-typeHooks"
import { useTemporalidades } from "@/features/temporalidade/hooks/temporalidadeHooks"

export function useCreateForm() {
  const { temporalidades, isLoading } = useTemporalidades()
  const mutation = useCreateTipoDocumento()

  const form = useForm({
    defaultValues: {
      nome: "",
      nivel: "",
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
