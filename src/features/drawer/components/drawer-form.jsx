import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Loader2 } from "lucide-react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export function DrawerForm({
  register,
  handleSubmit,
  onSubmit,
  isPending,
  setValue,
  drawer = null,
  cabinets = [],
  isEdit = false,
}) {

  return (
    <form onSubmit={handleSubmit(onSubmit)}
      className="w-full max-w-3xl mx-auto rounded-xl bg-muted/50"
    >
      <Card className="shadow-none">
        <CardContent className="p-6 pt-1 pb-1">
          <div className="flex flex-col gap-5">
            <div className="*:not-first:mt-2">
              <Label htmlFor="armario_id">Armário</Label>
              <Select
                defaultValue={drawer?.armario_id ? String(drawer?.armario_id) : ""}
                onValueChange={(value) => setValue("armario_id", value)}>
                <SelectTrigger id="armario_id" className="w-full">
                  <SelectValue
                    placeholder="Selecione o armário"
                  />
                </SelectTrigger>
                <SelectContent>
                  {cabinets.map((cabinet) => (
                    <SelectItem key={cabinet.id} value={String(cabinet.id)}>
                      Armário - {cabinet.num_armario}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="*:not-first:mt-2">
              <Label htmlFor="titulo">Título</Label>
              <Input
                type='text'
                id="titulo"
                placeholder="Ex: xxxx"
                {...register("titulo")}
              />
            </div>

            <div className="*:not-first:mt-2">
              <Label htmlFor="num_gaveta">Número da gaveta</Label>
              <Input
                type='number'
                id="num_gaveta"
                placeholder="Ex: 1"
                {...register("num_gaveta")}
              />
            </div>

            <div className="*:not-first:mt-2">
              <Label htmlFor="num_processos">Número de processos</Label>
              <Input
                type='number'
                id="num_processos"
                placeholder="Ex: 5"
                {...register("num_processos")}
              />
            </div>

            <Button type="submit" className="w-full" disabled={isPending}>
              {isPending ? (
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
              ) : isEdit ? (
                "Atualizar gaveta"
              ) : (
                "Criar gaveta"
              )}
            </Button>
          </div>
        </CardContent>
      </Card>
    </form>
  )
}
