import { useForm } from "react-hook-form"
import { useCreateDrawer } from "@/features/drawer/hooks/drawerHooks"
import { useCabinets } from "@/features/cabinet/hooks/cabinetHooks"

export function useCreateForm() {
  const { cabinets, isLoading } = useCabinets()
  const { mutate, isPending } = useCreateDrawer()

  const form = useForm({
    defaultValues: {
      titulo: "",
      armario_id: "",
      num_gaveta: "",
      num_processos: "",
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
    cabinets
  }
}
