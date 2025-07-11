import { useForm } from "react-hook-form"
import { useAreas } from "@/features/areas/hooks/areasHooks"
import { useTiposDocumentos } from "@/features/doc-type/hooks/doc-typeHooks"
import { useDocument, useUpdateDocument } from "@/features/documentos/hooks/docHooks"

export function useEditForm(id) {
  const { areas } = useAreas()
  const { tiposDocumentos } = useTiposDocumentos()
  const { document, isLoading } = useDocument(id)
  const mutation = useUpdateDocument(id)

  const form = useForm({
    values: document?.id ? {
      titulo_doc: document.titulo_doc,
      tipo_doc_id: document.tipo_doc_id,
      setor_origem_id: document.setor_origem_id,
      setor_destino_id: document.setor_destino_id,
      descricao_doc: document.descricao_doc,
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
    document,
    areas,
    tiposDocumentos
  }
}
