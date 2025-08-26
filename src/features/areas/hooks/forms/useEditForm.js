import { useForm } from "react-hook-form"
import { useArea, useUpdateArea } from "@/features/areas/hooks/areasHooks"
import { useDepartamentos } from "./useDepartamentos"

export function useEditAreaForm(id) {
  const { area, isLoading } = useArea(id)
  const { departamentos } = useDepartamentos()
  const mutation = useUpdateArea(id)

  const form = useForm({
    values: area?.name_area ? {
      name_area: area.name_area,
      slogan_area: area.slogan_area,
      telefone_area: area.telefone_area,
      email_area: area.email_area,
      descricao_area: area.descricao_area,
      depart_id: String(area.depart_id),
    } : undefined,
  })

  const onSubmit = form.handleSubmit((formData) => {
    mutation.mutate({ id, formData })
  })

  return {
    isLoading,
    isPending: mutation.isPending,
    onSubmit,
    ...form,
    area,
    departamentos
  }
}
