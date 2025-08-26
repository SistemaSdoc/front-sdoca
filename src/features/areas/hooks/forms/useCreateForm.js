import { useForm } from "react-hook-form"
import { useCreateArea } from "../areasHooks"
import { useDepartamentos } from "./useDepartamentos"

export function useCreateAreaForm() {
  const { departamentos, isLoading } = useDepartamentos()
  const mutation = useCreateArea()

  const form = useForm({
    defaultValues: {
      name_area: "",
      slogan_area: "",
      telefone_area: "",
      email_area: "",
      descricao_area: "",
      depart_id: ""
    }
  })

  const onSubmit = form.handleSubmit((formData) => {
    mutation.mutate(formData)
  })

  return {
    isLoading,
    isPending: mutation.isPending,
    onSubmit,
    ...form,
    departamentos
  }
}
