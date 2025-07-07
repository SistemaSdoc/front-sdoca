// components/AreaForm.jsx
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Loader2 } from "lucide-react"

export function AreaForm({
  register,
  handleSubmit,
  setValue,
  onSubmit,
  isPending,
  isEdit = false,
  area = null,
  organizations = []
}) {


  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="w-full max-w-3xl mx-auto rounded-xl bg-muted/50"
    >
      <Card className="shadow-none">
        <CardContent className="p-6 pt-1 pb-1">
          <div className="flex flex-col gap-5">
            <div className="grid grid-cols-2 gap-4">
              <div className="*:not-first:mt-2">
                <Label htmlFor="name_area">Nome</Label>
                <Input
                  id="name_area"
                  placeholder="Ex: área de desenvolvimento"
                  {...register("name_area")}
                />
              </div>

              <div className="*:not-first:mt-2">
                <Label htmlFor="slogan_area">Sigla</Label>
                <Input
                  id="slogan_area"
                  placeholder="Ex: AD"
                  {...register("slogan_area")}
                />
              </div>
            </div>

            <div className="*:not-first:mt-2">
              <Label htmlFor="telefone_area">Telefone</Label>
              <Input
                id="telefone_area"
                placeholder="Ex: 923000000"
                {...register("telefone_area")}
              />
            </div>

            <div className="*:not-first:mt-2">
              <Label htmlFor="email_area">E-mail</Label>
              <Input
                id="email_area"
                placeholder="Ex: desenvolvimento@area.ao"
                {...register("email_area")}
              />
            </div>

            <div className="*:not-first:mt-2">
              <Label htmlFor="org_id">Organização Pertencente</Label>
              <Select
                defaultValue={String(area.org_id)}
                onValueChange={(value) => setValue("org_id", value)}>
                <SelectTrigger id="org_id" className="w-full">
                  <SelectValue
                    placeholder="Selecione a organização"
                  />
                </SelectTrigger>
                <SelectContent>
                  {organizations.map((org) => (
                    <SelectItem key={org.id} value={String(org.id)}>
                      {org.name_org}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="*:not-first:mt-2">
              <Label htmlFor="descricao_area">Descrição</Label>
              <Textarea
                id="descricao_area"
                placeholder="Insira uma descrição sobre a área..."
                rows={5}
                {...register("descricao_area")}
              />
            </div>

            <Button type="submit" className="w-full" disabled={isPending}>
              {isPending ? (
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
              ) : isEdit ? (
                "Atualizar Área"
              ) : (
                "Criar Área"
              )}
            </Button>
          </div>
        </CardContent>
      </Card>
    </form>
  )
}
