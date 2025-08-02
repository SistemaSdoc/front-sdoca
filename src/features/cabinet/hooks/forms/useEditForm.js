import { useForm } from "react-hook-form"
import { useCabinet, useUpdateCabinet } from "@/features/cabinet/hooks/cabinetHooks"

export function useEditForm(id) {
  const { cabinet, isLoading } = useCabinet(id)
  const { mutate, isPending } = useUpdateCabinet(id)

  const form = useForm({
    values: cabinet?.num_armario ? {
      num_armario: cabinet.num_armario,
      num_gavetas: cabinet.num_gavetas,
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
    cabinet,
  }
}
