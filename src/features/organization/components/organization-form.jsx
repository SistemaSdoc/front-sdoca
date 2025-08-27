import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import ImageUploader from '@/components/ImageUploader'
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Loader2 } from "lucide-react"

export function OrganizationForm({
  register,
  handleSubmit,
  setValue,
  onSubmit,
  isPending,
  organization,
  isEdit = false,
}) {
  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="w-full max-w-3xl mx-auto rounded-xl bg-muted/50"
      encType="multipart/form-data"
    >
      <Card className="shadow-none">
        <CardContent className="p-6 pt-1 pb-1">
          <div className="flex flex-col gap-5">
            <ImageUploader setValue={setValue} />

            <div className="*:not-first:mt-2">
              <Label htmlFor="name_org">Nome</Label>
              <Input
                id="name_org"
                placeholder="Ex: Cazenga"
                {...register('name_org')}
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="*:not-first:mt-2">
                <Label htmlFor="nif_org">NIF</Label>
                <Input
                 /*  type="number" */
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
                defaultValue={isEdit ? organization.regime_org : undefined}
                onValueChange={(value) => setValue('regime_org', value)}
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
                placeholder="Fale um pouco sobre a município..."
                rows={5}
                {...register('descricao_org')}
              />
            </div>

            <Button type="submit" className="w-full" disabled={isPending}>
              {isPending ? (
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
              ) : isEdit ? (
                "Atualizar Município"
              ) : (
                "Criar Município"
              )}
            </Button>
          </div>
        </CardContent>
      </Card>
    </form>
  )
}
