import { Link } from "react-router-dom"
import { Button } from "@/components/ui/button"
import { ChevronLeftIcon, Loader2, Tags } from "lucide-react"
import { useCreateForm } from "@/features/classification/hooks/forms/useCreateForm"
import { ClassificationForm } from "@/features/classification/components/classification-form"

export default function NewClassification() {
  const {
    register,
    handleSubmit,
    setValue,
    onSubmit,
    isPending,
    isLoading,
    temporalidades
  } = useCreateForm()

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
        <Link to='/dashboard/classifications'>
          <Button variant="link" className="gap-1">
            <ChevronLeftIcon className="opacity-60" size={16} />
            Voltar
          </Button>
        </Link>
      </div>

      <div className="space-y-2 text-center">
        <div className="flex items-center justify-center space-x-2">
          <Tags className="w-8 h-8 text-primary" />
          <h1 className="text-3xl font-medium">Criar Nova Classificação</h1>
        </div>
        <p className="text-muted-foreground">
          Preencha os dados abaixo para registrar uma nova classificação no sistema
        </p>
      </div>

      <ClassificationForm
        register={register}
        handleSubmit={handleSubmit}
        setValue={setValue}
        onSubmit={onSubmit}
        isPending={isPending}
        temporalidades={temporalidades}
      />
    </>
  )
}




