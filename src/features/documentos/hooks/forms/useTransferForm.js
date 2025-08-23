import { useForm } from "react-hook-form"
import { useTranferData, useCreateTransfer } from "@/features/documentos/hooks/docHooks"
import { useAreas } from "@/features/areas/hooks/areasHooks"
import { useTiposDocumentos } from "@/features/doc-type/hooks/doc-typeHooks"
import { useAuth } from "@/context/AuthContext"

export function useTransferForm(id) {
  const { data, isLoading } = useTranferData(id)
  const { areas } = useAreas()
  const { user } = useAuth()
  console.log('dados user: ', user)
  const { tiposDocumentos } = useTiposDocumentos()
  const { mutate, isPending } = useCreateTransfer(id)

  const form = useForm({
    defaultValues: data?.documento ? {
      titulo_doc: data.documento.titulo_doc,
      tipo_doc_id: String(data.documento.tipo_doc_id),
      area_origem_id: String(user?.id_area),
      area_destino_id: "",
      descricao_doc: data.documento.descricao_doc,
    } : {}
  })
  

  const onSubmit = form.handleSubmit((formData) => {
    mutate({ id, formData })
  })

  return {
    isLoading,
    isPending,
    onSubmit,
    ...form,
    data,
    areas,
    user,
    tiposDocumentos
  }
}
