import { useForm } from "react-hook-form"
import { useDrawer, useUpdateDrawer } from "@/features/drawer/hooks/drawerHooks"
import { useCabinets } from "@/features/cabinet/hooks/cabinetHooks"

export function useEditForm(id) {
  const { cabinets } = useCabinets()
  const { drawer, isLoading } = useDrawer(id)
  const { mutate, isPending } = useUpdateDrawer(id)

  const form = useForm({
    values: drawer?.num_gaveta ? {
      titulo: drawer.titulo,
      armario_id: drawer.armario_id,
      num_gaveta: drawer.num_gaveta,
      num_processos: drawer.num_processos,
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
    drawer,
    cabinets,
  }
}
