import { useForm } from "react-hook-form"
import { useAreas } from "@/features/areas/hooks/areasHooks"
import { useTiposDocumentos } from "@/features/doc-type/hooks/doc-typeHooks"
import { useCreateDocument } from "@/features/documentos/hooks/docHooks"

export function useCreateForm() {
  const { tiposDocumentos } = useTiposDocumentos()
  const { areas, isLoading } = useAreas()
  const mutation = useCreateDocument()

  const form = useForm({
    defaultValues: {
      titulo_doc: "",
      tipo_doc_id: "",
      setor_origem_id: "",
      setor_destino_id: "",
      descricao_doc: "",
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
    areas,
    tiposDocumentos
  }
}
