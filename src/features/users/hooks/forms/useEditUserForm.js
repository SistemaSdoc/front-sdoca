import { useForm } from "react-hook-form"
import { useEditUser, useUpdateUser } from "@/features/users/hooks/usuariosHooks"

export function useEditUserForm(id) {
  const { data, isLoading } = useEditUser(id)
  const mutation = useUpdateUser(id)

  const form = useForm({
    values: data?.user ? {
      name_user: data.user.name,
      email_user: data.user.email,
      password_user: "",
      password_user_confirmation: "",
      area_user: String(data.user.id_area),
      tipo_user: String(data.user.id_role),
    } : undefined
  })

  const onSubmit = form.handleSubmit((formData) => {
    mutation.mutate({ id, formData })
  })

  return {
    isLoading,
    isPending: mutation.isPending,
    onSubmit,
    ...form,
    data
  }
}
