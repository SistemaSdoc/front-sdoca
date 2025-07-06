import { Link } from 'react-router-dom'
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import ImageUploader from '@/components/ImageUploader'
import { useForm } from "react-hook-form"
import { Card, CardContent } from "@/components/ui/card"
import { useCreateOrganization } from '@/features/organization/hooks/OrganizationsHooks'
import { Loader2, ChevronLeftIcon, Building2 } from "lucide-react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export default function NewOrganization() {
    const { register, handleSubmit, setValue } = useForm()
    const { mutate, isPending } = useCreateOrganization()

    function onSubmit(data) {
        mutate(data)
    }

    return (
        <>
            <div className="pt-2 pl-4">
                <Link to='/dashboard/organizations'>
                    <Button variant="link" className="gap-1">
                        <ChevronLeftIcon className="opacity-60" size={16} aria-hidden="true" />
                        Voltar
                    </Button>
                </Link>
            </div>

            <div className="space-y-2 text-center">
                <div className="flex items-center justify-center space-x-2">
                    <Building2 className="w-8 h-8 text-primary" />
                    <h1 className="text-3xl font-medium">Criar Nova Organização</h1>
                </div>
                <p className="text-muted-foreground">Preencha os dados abaixo para registrar uma nova organização no sistema</p>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="w-full h-auto max-w-3xl mx-auto rounded-xl bg-muted/50" encType="multipart/form-data">
                <Card className='shadow-none'>
                    <CardContent className="p-6 pt-1 pb-1">
                        <div className="flex flex-col gap-5">
                            <ImageUploader setValue={setValue} />

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
                                    placeholder="Fale um pouco sobre a organização..."
                                    rows={5}
                                    {...register('descricao_org')}
                                />
                            </div>

                            <Button type="submit" className="w-full" disabled={isPending}>
                                {isPending ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> :
                                    "Criar organização"}
                            </Button>
                        </div>
                    </CardContent>
                </Card>
            </form>
        </>
    )
}
