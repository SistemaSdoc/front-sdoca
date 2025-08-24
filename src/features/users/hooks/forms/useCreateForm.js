import { useForm } from "react-hook-form"
import { useCreateUser, useCreateData } from "@/features/users/hooks/usuariosHooks"

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
      profile_photo_path: null,
      assinatura_path: null,
    }
  })

  // helper interno p/ lidar com arquivos
  const appendFile = (fd, key, value) => {
    if (!value) return
    if (value instanceof File) {
      fd.append(key, value)
    } else if (value instanceof FileList && value.length > 0) {
      fd.append(key, value[0])
    }
  }

  const onSubmit = form.handleSubmit((values) => {
    const fd = new FormData()

    // campos normais
    fd.append("name_user", values.name_user)
    fd.append("email_user", values.email_user)
    fd.append("password_user", values.password_user)
    fd.append("password_user_confirmation", values.password_user_confirmation)
    fd.append("area_user", values.area_user)
    fd.append("tipo_user", values.tipo_user)

    // arquivos
    appendFile(fd, "profile_photo_path", values.profile_photo_path)
    appendFile(fd, "assinatura_path", values.assinatura_path)

    console.log("📦 payload ->", Object.fromEntries(fd)) // debug
    mutation.mutate(fd)
  })

  return {
    isLoading,
    isPending: mutation.isPending,
    onSubmit,
    ...form,
    data,
  }
}
