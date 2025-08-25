import { useForm } from "react-hook-form"
import { useOrganizations } from "@/features/organization/hooks/OrganizationsHooks"
import { useCreateArea } from "../areasHooks"
import { useDepartamentos } from "./useDepartamentos"

export function useCreateAreaForm() {
  const { organizations, isLoading: isLoadingOrgs } = useOrganizations()
  const { departamentos, isLoading: isLoadingDeps } = useDepartamentos()
  const mutation = useCreateArea()

  const form = useForm({
    defaultValues: {
      name_area: "",
      slogan_area: "",
      telefone_area: "",
      email_area: "",
      descricao_area: "",
    }
  })

  const onSubmit = form.handleSubmit((formData) => {
    mutation.mutate(formData)
  })

  return {
    isLoading: isLoadingOrgs || isLoadingDeps,
    isPending: mutation.isPending,
    onSubmit,
    ...form,
    organizations,
    departamentos
  }
}
