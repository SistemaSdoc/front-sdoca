import { useParams, Link } from "react-router-dom"
import { ChevronLeftIcon, Building2, Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { OrganizationForm } from "@/features/organization/components/OrganizationForm"
import { useEditOrganizationForm } from "@/features/organization/hooks/forms/useEditForm"

export default function EditOrganization() {
  const { id } = useParams()

  const {
    register,
    handleSubmit,
    setValue,
    onSubmit,
    isPending,
    isLoading,
    organization
  } = useEditOrganizationForm(id)

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-40">
        <Loader2 className="w-6 h-6 animate-spin" />
      </div>
    )
  }

  return (
    <>
      <div className="pt-2 pl-4">
        <Link to='/dashboard/organizations'>
          <Button variant="link" className="gap-1">
            <ChevronLeftIcon className="opacity-60" size={16} />
            Voltar
          </Button>
        </Link>
      </div>

      <div className="space-y-2 text-center">
        <div className="flex items-center justify-center space-x-2">
          <Building2 className="w-8 h-8 text-primary" />
          <h1 className="text-3xl font-medium">Editar Organização</h1>
        </div>
        <p className="text-muted-foreground">
          Atualize os dados abaixo para editar a organização no sistema
        </p>
      </div>

      <OrganizationForm
        register={register}
        handleSubmit={handleSubmit}
        setValue={setValue}
        onSubmit={onSubmit}
        isPending={isPending}
        organization={organization}
        isEdit={true}
      />
    </>
  )
}
