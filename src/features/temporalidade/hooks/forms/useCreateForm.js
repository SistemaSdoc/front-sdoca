import { useForm } from "react-hook-form"
import { useCreateTemporalidade } from "@/features/temporalidade/hooks/temporalidadeHooks"

export function useCreateForm() {
  const mutation = useCreateTemporalidade()

  const form = useForm({
    defaultValues: {
      nome_fase: "",
      prazo_guarda: "",
      destino_final: "",
    }
  })

  const onSubmit = form.handleSubmit((formData) => {
    mutation.mutate(formData)
  })

  return {
    isLoading: false,
    isPending: mutation.isPending,
    onSubmit,
    ...form,
  }
}
