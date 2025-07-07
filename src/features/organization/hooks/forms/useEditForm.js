import { useEffect } from "react"
import { useForm } from "react-hook-form"
import { useOrganization, useUpdateOrganization } from "@/features/organization/hooks/OrganizationsHooks"

export function useEditOrganizationForm(id) {
  const { organization, isLoading } = useOrganization(id)
  const mutation = useUpdateOrganization()

  const form = useForm({
    defaultValues: {
      name_org: "",
      nif_org: "",
      telefone_org: "",
      email_org: "",
      provincia_org: "",
      regime_org: "",
      descricao_org: "",
    }
  })

  const { reset } = form

  // ✅ Quando os dados da org carregarem, reseta o form com eles
  useEffect(() => {
    if (organization?.name_org) {
      reset({
        name_org: organization.name_org,
        nif_org: organization.nif_org,
        telefone_org: organization.telefone_org,
        email_org: organization.email_org,
        provincia_org: organization.provincia_org,
        regime_org: organization.regime_org,
        descricao_org: organization.descricao_org,
      })
    }
  }, [organization, reset])

  const onSubmit = form.handleSubmit((formData) => {
    mutation.mutate({ id, formData })
  })

  return {
    isLoading,
    isPending: mutation.isPending,
    onSubmit,
    ...form,
    organization
  }
}
