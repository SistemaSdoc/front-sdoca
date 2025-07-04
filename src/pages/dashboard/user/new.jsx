import { useState } from "react"
import { Link } from "react-router-dom"
import { useForm } from "react-hook-form"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import PhotoUploader from "@/components/profile-photo-uploader"
import { useCreateUser, useCreateData } from '@/hooks/usuariosHooks'
import { Loader2, ChevronLeftIcon, Users, EyeIcon, EyeOffIcon, } from "lucide-react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export default function NewUser() {
    const { register, handleSubmit, setValue } = useForm()

    const [showPassword, setShowPassword] = useState(false)
    const [showConfirmPassword, setShowConfirmPassword] = useState(false)

    const { mutate, isPending } = useCreateUser()
    const { data } = useCreateData()

    const onSubmit = (data) => {
        mutate(data)
    }

    return (
        <>
            <div className="pt-2 pl-4">
                <Link to='/dashboard/users'>
                    <Button variant="link" className="gap-1">
                        <ChevronLeftIcon className="opacity-60" size={16} />
                        Voltar
                    </Button>
                </Link>
            </div>

            <div className="space-y-2 text-center">
                <div className="flex items-center justify-center space-x-2">
                    <Users className="w-8 h-8 text-primary" />
                    <h1 className="text-3xl font-medium">Criar Novo Usuário</h1>
                </div>
                <p className="text-muted-foreground">
                    Preencha os dados abaixo para registrar um novo usuário no sistema
                </p>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="w-full max-w-3xl mx-auto rounded-xl bg-muted/50" encType="multipart/form-data">
                <Card className="shadow-none">
                    <CardContent className="p-6 pt-1 pb-1">
                        <div className="flex flex-col gap-5">
                            {/* Foto */}
                            <div className="*:not-first:mt-2">
                                <PhotoUploader />
                            </div>

                            {/* Nome */}
                            <div className="*:not-first:mt-2">
                                <Label htmlFor="name_user">Nome</Label>
                                <Input
                                    type="text"
                                    id="name_user"
                                    placeholder="Ex: Nome Exemplo"
                                    {...register("name_user")}
                                />
                            </div>

                            {/* Email */}
                            <div className="*:not-first:mt-2">
                                <Label htmlFor="email_user">E-mail</Label>
                                <Input
                                    type="email"
                                    id="email_user"
                                    placeholder="Ex: user@exemplo.com"
                                    {...register("email_user")}
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
                                            className="absolute inset-y-0 end-0 flex h-full w-9 items-center justify-center"
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
                                            className="absolute inset-y-0 end-0 flex h-full w-9 items-center justify-center"
                                        >
                                            {showConfirmPassword ? <EyeOffIcon size={16} /> : <EyeIcon size={16} />}
                                        </button>
                                    </div>
                                </div>
                            </div>

                            {/* Área e Permissão */}
                            <div className="grid grid-cols-2 gap-4">
                                <div className="*:not-first:mt-2">
                                    <Label htmlFor="area_user">Área Pertencente</Label>
                                    <Select onValueChange={(value) => setValue("area_user", value)}>
                                        <SelectTrigger id="area_user" className='w-full'>
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
                                    <Select onValueChange={(value) => setValue("tipo_user", value)}>
                                        <SelectTrigger id="tipo_user" className='w-full'>
                                            <SelectValue placeholder="Selecione a permissão" />
                                        </SelectTrigger>

                                        <SelectContent>
                                            {data?.roles?.map((area) => (
                                                <SelectItem key={area.id} value={String(area.id)}>
                                                    {area.name}
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                </div>
                            </div>

                            {/* Botão */}
                            <Button type="submit" className="w-full" disabled={isPending}>
                                {isPending ? <Loader2 className="w-4 h-4 animate-spin" /> : "Criar Usuário"}
                            </Button>
                        </div>
                    </CardContent>
                </Card>
            </form>
        </>
    )
}
