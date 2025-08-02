import { useForm } from "react-hook-form"
import { useCreateCabinet } from "@/features/cabinet/hooks/cabinetHooks"

export function useCreateForm() {
  const { mutate, isPending } = useCreateCabinet()

  const form = useForm({
    defaultValues: {
      num_armario: "",
      num_gavetas: "",
    }
  })

  const onSubmit = form.handleSubmit((formData) => {
    mutate(formData)
  })

  return {
    isPending,
    onSubmit,
    ...form,
  }
}
