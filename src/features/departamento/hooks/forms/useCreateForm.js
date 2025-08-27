import { useForm } from "react-hook-form"
import { useOrganizations } from "@/features/organization/hooks/OrganizationsHooks"
import { useCreateDepartamento } from "../departamentoHooks"

export function useCreateDepartamentoForm() {
  const { organizations, isLoading } = useOrganizations()
  const mutation = useCreateDepartamento()

  const form = useForm({
    defaultValues: {
      name_departamento: "",
      sigla_departamento: "",
      telefone_departamento: "",
      email_departamento: "",
      org_id: "",
      descricao_departamento: "",
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
    organizations
  }
}