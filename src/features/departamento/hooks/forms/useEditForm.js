import { useForm } from "react-hook-form"
import { useDepartamento, useUpdateDepartamento } from "../departamentoHooks"
import { useOrganizations } from "@/features/organization/hooks/OrganizationsHooks"

export function useEditDepartamentoForm(id) {
  const { departamento, isLoading } = useDepartamento(id)
  const { organizations } = useOrganizations()
  const mutation = useUpdateDepartamento()

  const form = useForm({
    values: departamento?.name_departamento ? {
      name_departamento: departamento.name_departamento,
      slogan_departamento: departamento.slogan_departamento,
      telefone_departamento: departamento.telefone_departamento,
      email_departamento: departamento.email_departamento,
      org_id: String(departamento.org_id),
      descricao_departamento: departamento.descricao_departamento,
    } : undefined,
  })

  const onSubmit = form.handleSubmit((formData) => {
    mutation.mutate({ id, formData })
  })

  return {
    isLoading,
    isPending: mutation.isPending,
    onSubmit,
    ...form,
    departamento,
    organizations
  }
}