import { useEffect } from 'react'
import { useForm } from "react-hook-form"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Link, useParams } from 'react-router-dom'
import { Textarea } from "@/components/ui/textarea"
import ImageUploader from '@/components/ImageUploader'
import { Card, CardContent } from "@/components/ui/card"
import { Loader2, ChevronLeftIcon, Building2 } from 'lucide-react'
import { useOrganization, useUpdateOrganization } from "@/features/organization/hooks/OrganizationsHooks"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export default function EditOrganization() {
  const { id } = useParams()
  const { organization } = useOrganization(id)
  const { mutate, isPending } = useUpdateOrganization()
  console.log('logo: ', organization.logo_org)
  const { register, handleSubmit, setValue, reset,  } = useForm()
 // const regimeValue = watch('regime_org')

  useEffect(() => {
    if (organization?.encrypted_id) {
      reset({
        encrypted_id: organization.encrypted_id,
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

  const onSubmit = (data) => {
    console.log('data: ', data)
    mutate({ id, formData: data })
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
          <Building2 className="w-8 h-8" />
          <h1 className="text-3xl font-medium">Editar Organização</h1>
        </div>
        <p className="text-muted-foreground">Edite os dados abaixo para actualizar uma nova organização no sistema</p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="w-full h-auto max-w-3xl mx-auto rounded-xl bg-muted/50">
        <Card className='shadow-none'>
          <CardContent className="p-6 pt-1 pb-1">
            <div className="flex flex-col gap-5">
              <div className="grid gap-3">
                <ImageUploader
                  setValue={setValue}
                  defaultImage={organization.logo_org ?
                    `http://localhost:8000/storage/${organization?.logo_org}` : null}
                />
              </div>

              <div className="*:not-first:mt-2">
                <Label htmlFor="name_org">Nome</Label>
                <Input
                  id="name_org"
                  placeholder="Ex: Empresa Kixico"
                  {...register('name_org')}
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="*:not-first:mt-2">
                  <Label htmlFor="nif_org">NIF</Label>
                  <Input
                    type="number"
                    id="nif_org"
                    placeholder="Ex: 5000000000"
                    {...register('nif_org')}
                  />
                </div>

                <div className="*:not-first:mt-2">
                  <Label htmlFor="telefone_org">Telefone</Label>
                  <Input
                    type="number"
                    id="telefone_org"
                    placeholder="Ex: 923000000"
                    {...register('telefone_org')}
                  />
                </div>
              </div>

              <div className="*:not-first:mt-2">
                <Label htmlFor="email_org">E-mail</Label>
                <Input
                  id="email_org"
                  placeholder="Ex: contacto@kixico.ao"
                  {...register('email_org')}
                />
              </div>

              <div className="*:not-first:mt-2">
                <Label htmlFor="provincia_org">Província</Label>
                <Input
                  id="provincia_org"
                  placeholder="Ex: Luanda"
                  {...register('provincia_org')}
                />
              </div>

              <div className="*:not-first:mt-2">
                <Label htmlFor="regime_org">Regime</Label>
                <Select
                  defaultValue={organization?.regime_org}
                  onValueChange={(value) =>
                    setValue("regime_org", value)
                  }
                >
                  <SelectTrigger id="regime_org" className="w-full">
                    <SelectValue placeholder="Selecione o regime" />
                  </SelectTrigger>

                  <SelectContent>
                    <SelectItem value="Regime Geral">Regime Geral</SelectItem>
                    <SelectItem value="Regime Simplificado">Regime Simplificado</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="*:not-first:mt-2">
                <Label htmlFor="descricao_org">Descrição</Label>
                <Textarea
                  id="descricao_org"
                  placeholder="Fale um pouco sobre a organização..."
                  rows={5}
                  {...register('descricao_org')}
                />
              </div>

              <Button type="submit" className="w-full" disabled={isPending}>
                {isPending ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> :
                  "Salvar alterações"}
              </Button>
            </div>
          </CardContent>
        </Card>
      </form>
    </>
  )
}
