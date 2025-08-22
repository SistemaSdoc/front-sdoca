import { useForm } from "react-hook-form"
import { useDrawers } from "@/features/drawer/hooks/drawerHooks"
import { useProcessCover, useUpdateProcessCover } from "../process-coverHooks"
import { useTiposDocumentos } from "@/features/doc-type/hooks/doc-typeHooks"

export function useEditForm(id) {
  const { drawers } = useDrawers()
  const { tiposDocumentos } = useTiposDocumentos()
  const { processCover, isLoading } = useProcessCover(id)
  const { mutate, isPending } = useUpdateProcessCover(id)

  const form = useForm({
    values: processCover?.id ? {
      num_capa_processo: processCover.num_capa_processo,
      num_documentos: processCover.num_documentos,
      gaveta_id: processCover.gaveta_id,
      tipo_doc_id: processCover.tipo_doc_id,
    } : undefined
  })

  const onSubmit = form.handleSubmit((formData) => {
    mutate({ id, formData })
  })

  return {
    isLoading,
    isPending,
    onSubmit,
    ...form,
    drawers,
    tiposDocumentos,
    processCover,
  }
}
