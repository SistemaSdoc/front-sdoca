import { useForm } from "react-hook-form"
import { useCreateTipoDocumento } from "@/features/doc-type/hooks/doc-typeHooks"
import { useClassificacoes } from "@/features/classification/hooks/classificationHooks"

export function useCreateForm() {
  const { classificacoes, isLoading } = useClassificacoes()
  const mutation = useCreateTipoDocumento()

  const form = useForm({
    defaultValues: {
      nome: "",
      classificacao_id: "",
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
    classificacoes
  }
}
