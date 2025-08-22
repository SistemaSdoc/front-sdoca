import { useForm } from "react-hook-form"
import { useCreateProcessCover } from "@/features/process-cover/hooks/process-coverHooks"
import { useTiposDocumentos } from "@/features/doc-type/hooks/doc-typeHooks"
import { useDrawers } from "@/features/drawer/hooks/drawerHooks"

export function useCreateForm() {
  const { drawers, isLoading } = useDrawers()
  const { tiposDocumentos } = useTiposDocumentos()
  const { mutate, isPending } = useCreateProcessCover()

  const form = useForm({
    defaultValues: {
      num_capa_processo: "",
      num_documentos: "",
      gaveta_id: "",
      tipo_doc_id: "",
    }
  })

  const onSubmit = form.handleSubmit((formData) => {
    mutate(formData)
  })

  return {
    isLoading,
    isPending,
    onSubmit,
    ...form,
    drawers,
    tiposDocumentos,
  }
}
