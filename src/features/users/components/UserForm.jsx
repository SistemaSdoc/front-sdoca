import { Card, CardContent } from "@/components/ui/card"
import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Loader2, EyeIcon, EyeOffIcon } from "lucide-react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import PhotoUploader from "@/components/profile-photo-uploader"

export function UserForm({
  register,
  handleSubmit,
  setValue,
  onSubmit,
  isPending,
  data,
  isEdit = false,
}) {
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="w-full max-w-3xl mx-auto rounded-xl bg-muted/50"
    >
      <Card className="shadow-none">
        <CardContent className="p-6 pt-1 pb-1">
          <div className="flex flex-col gap-5">
            {/* Foto */}
            <div className="*:not-first:mt-2">
              <PhotoUploader setValue={setValue} />
            </div>

            {/* Nome */}
            <div className="*:not-first:mt-2">
              <Label htmlFor="name_user">Nome</Label>
              <Input
                readOnly={isEdit}
                {...register("name_user")}
                id="name_user"
                placeholder="Ex: Nome Exemplo"
              />
            </div>

            {/* Email */}
            <div className="*:not-first:mt-2">
              <Label htmlFor="email_user">E-mail</Label>
              <Input
                /* readOnly={isEdit} */
                {...register("email_user")}
                id="email_user"
                placeholder="Ex: user@exemplo.com"
              />
            </div>

            {/* Senhas */}
            <div className="grid grid-cols-2 gap-4">
              <div className="*:not-first:mt-2">
                <Label htmlFor="password_user">Senha</Label>
                <div className="relative">
                  <Input
                    type={showPassword ? "text" : "password"}
                    id="password_user"
                    placeholder="Senha"
                    {...register("password_user")}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 flex items-center justify-center end-0 w-9"
                  >
                    {showPassword ? <EyeOffIcon size={16} /> : <EyeIcon size={16} />}
                  </button>
                </div>
              </div>

              <div className="*:not-first:mt-2">
                <Label htmlFor="password_user_confirmation">Confirmar Senha</Label>
                <div className="relative">
                  <Input
                    type={showConfirmPassword ? "text" : "password"}
                    id="password_user_confirmation"
                    placeholder="Confirme a senha"
                    {...register("password_user_confirmation")}
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute inset-y-0 flex items-center justify-center end-0 w-9"
                  >
                    {showConfirmPassword ? <EyeOffIcon size={16} /> : <EyeIcon size={16} />}
                  </button>
                </div>
              </div>
            </div>

            {/* Área e Permissão */}
            <div className="grid grid-cols-2 gap-4">
              <div className="*:not-first:mt-2">
                <Label htmlFor="area_user">Área</Label>
                <Select
                  defaultValue={data?.user?.id_area ? String(data.user.id_area) : ""}
                  onValueChange={(value) => setValue("area_user", value)}
                >
                  <SelectTrigger id="area_user" className="w-full">
                    <SelectValue placeholder="Selecione a área" />
                  </SelectTrigger>
                  <SelectContent>
                    {data?.areas?.map((area) => (
                      <SelectItem key={area.id} value={String(area.id)}>
                        {area.area}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="*:not-first:mt-2">
                <Label htmlFor="tipo_user">Permissão</Label>
                <Select
                  defaultValue={data?.user?.id_role ? String(data.user.id_role) : ""}
                  onValueChange={(value) => setValue("tipo_user", value)}
                >
                  <SelectTrigger id="tipo_user" className="w-full">
                    <SelectValue placeholder="Selecione a permissão" />
                  </SelectTrigger>
                  <SelectContent>
                    {data?.roles?.map((role) => (
                      <SelectItem key={role.id} value={String(role.id)}>
                        {role.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="*:not-first:mt-2">
              <Label htmlFor='assinatura_path'>Imagem da assinatura</Label>
              <Input
                {...register("assinatura_path")}
                id='assinatura_path'
                className=" pe-3 file:me-3 file:border-0 file:border-e"
                type="file"
              />
            </div>

            <Button type="submit" className="w-full" disabled={isPending}>
              {isPending ? (
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
              ) : isEdit ? (
                "Atualizar Usuário"
              ) : (
                "Criar Usuário"
              )}
            </Button>
          </div>
        </CardContent>
      </Card>
    </form>
  )
}
