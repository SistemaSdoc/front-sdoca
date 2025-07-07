import { useForm } from "react-hook-form"
import { useCreateOrganization } from "@/features/organization/hooks/OrganizationsHooks" 

export function useCreateOrganizationForm() {
  const mutation = useCreateOrganization()

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

  const onSubmit = form.handleSubmit((formData) => {
    mutation.mutate(formData)
  })

  return {
    isPending: mutation.isPending,
    onSubmit,
    ...form,
  }
}
