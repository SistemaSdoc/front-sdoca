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
      area_origem_id: "",
      area_destino_id: "",
      descricao_doc: "",
      anexo_docs: [],
    }
  })

  const onSubmit = form.handleSubmit((formData) => {
    const data = new FormData()

    // Campos normais
    data.append("titulo_doc", formData.titulo_doc)
    data.append("tipo_doc_id", formData.tipo_doc_id)
    data.append("area_origem_id", formData.area_origem_id)
    data.append("area_destino_id", formData.area_destino_id)
    data.append("descricao_doc", formData.descricao_doc)

    // ficheiros
    if (formData.anexo_docs?.length > 0) {
      formData.anexo_docs.forEach((file) => {
        data.append("anexo_docs[]", file)
      })
    }

    mutation.mutate(data)
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
