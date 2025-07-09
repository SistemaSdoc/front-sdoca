import { useForm } from "react-hook-form"
import { useTipoDocumento, useUpdateTipoDocumento } from "@/features/doc-type/hooks/doc-typeHooks"
import { useClassificacoes } from "@/features/classification/hooks/classificationHooks"

export function useEditForm(id) {
  const { classificacoes } = useClassificacoes()
  const { tipoDocumento, isLoading } = useTipoDocumento(id)
  const mutation = useUpdateTipoDocumento(id)

  const form = useForm({
    values: tipoDocumento?.nome ? {
      nome: tipoDocumento.nome,
      classificacao_id: String(tipoDocumento.temporalidade_id),
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
    classificacoes
  }
}
