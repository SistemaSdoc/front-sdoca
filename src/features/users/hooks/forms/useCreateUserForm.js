import { useForm } from "react-hook-form"
import { useCreateUser } from "@/features/users/hooks/usuariosHooks"
import { useCreateData } from "@/features/users/hooks/usuariosHooks"

export function useCreateUserForm() {
  const { data, isLoading } = useCreateData()
  const mutation = useCreateUser()

  const form = useForm({
    defaultValues: {
      name_user: "",
      email_user: "",
      password_user: "",
      password_user_confirmation: "",
      area_user: "",
      tipo_user: "",
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
    data
  }
}
