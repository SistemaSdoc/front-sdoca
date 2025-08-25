import { Link } from "react-router-dom"
import { Button } from "@/components/ui/button"
import { ChevronLeftIcon, Loader2, Layers } from "lucide-react"
import { useCreateDepartamentoForm } from "../hooks/forms/useCreateForm"
import { DepartamentoForm } from "../components/departamento-form"

export default function NewDepartamento() {
  const {
    register,
    handleSubmit,
    setValue,
    onSubmit,
    isPending,
    isLoading,
    organizations
  } = useCreateDepartamentoForm()

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
        <Link to='/dashboard/departments'>
          <Button variant="link" className="gap-1">
            <ChevronLeftIcon className="opacity-60" size={16} />
            Voltar
          </Button>
        </Link>
      </div>

      <div className="space-y-2 text-center">
        <div className="flex items-center justify-center space-x-2">
          <Layers className="w-8 h-8 text-primary" />
          <h1 className="text-3xl font-medium">Criar Novo Departamento</h1>
        </div>
        <p className="text-muted-foreground">
          Preencha os dados abaixo para registrar um novo departamento no sistema
        </p>
      </div>

      <DepartamentoForm
        register={register}
        handleSubmit={handleSubmit}
        setValue={setValue}
        onSubmit={onSubmit}
        isPending={isPending}
        organizations={organizations}
      />
    </>
  )
}