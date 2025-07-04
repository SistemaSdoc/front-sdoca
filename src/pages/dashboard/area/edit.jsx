import { Loader2, ChevronLeftIcon, Layers } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue
} from "@/components/ui/select"
import { Link, useParams } from 'react-router-dom'
import { useArea, useUpdateArea } from '@/hooks/areasHooks'
import { useOrganizations } from "@/hooks/OrganizationsHooks"

export default function EditArea() {
    const { id } = useParams()
    const { area, isLoading } = useArea(id)
    const { organizations } = useOrganizations()
    const updateArea = useUpdateArea()

    async function handleSubmit(e) {
        e.preventDefault()
        const form = new FormData(e.target)
        const data = {
            name_area: form.get("name_area"),
            slogan_area: form.get("slogan_area"),
            telefone_area: form.get("telefone_area"),
            email_area: form.get("email_area"),
            org_id: parseInt(form.get("org_id")),
            descricao_area: form.get("descricao_area"),
        }

        updateArea.mutate({ id, formData: data })
    }

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
                    <Layers className="w-8 h-8" />
                    <h1 className="text-3xl font-medium">Editar Área</h1>
                </div>
                <p className="text-muted-foreground">Edite os dados abaixo para actualizar a área no sistema</p>
            </div>

            <form onSubmit={handleSubmit} className="w-full h-auto max-w-3xl mx-auto rounded-xl bg-muted/50">
                <Card className='shadow-none'>
                    <CardContent className="p-6 pt-1 pb-1">
                        <div className="flex flex-col gap-5">
                            <div className="grid grid-cols-2 gap-4">
                                <div className="*:not-first:mt-2">
                                    <Label htmlFor="name_area">Nome</Label>
                                    <Input
                                        type="text"
                                        id="name_area"
                                        name="name_area"
                                        defaultValue={area?.name_area}
                                        placeholder="Ex: área de desenvolvimento"
                                    />
                                </div>

                                <div className="*:not-first:mt-2">
                                    <Label htmlFor="slogan_area">Sigla</Label>
                                    <Input
                                        type="text"
                                        id="slogan_area"
                                        name="slogan_area"
                                        defaultValue={area?.slogan_area}
                                        placeholder="Ex: AD"
                                    />
                                </div>
                            </div>

                            <div className="*:not-first:mt-2">
                                <Label htmlFor="telefone_area">Telefone</Label>
                                <Input
                                    type='number'
                                    id="telefone_area"
                                    name="telefone_area"
                                    defaultValue={area?.telefone_area}
                                    placeholder="Ex: 923000000"
                                />
                            </div>

                            <div className="*:not-first:mt-2">
                                <Label htmlFor="email_area">E-mail</Label>
                                <Input
                                    type="email"
                                    id="email_area"
                                    name="email_area"
                                    defaultValue={area?.email_area}
                                    placeholder="Ex: desenvolvimento@area.ao"
                                />
                            </div>

                            <div className="*:not-first:mt-2">
                                <Label htmlFor="org_id">Organização Pertencente</Label>
                                <Select
                                    defaultValue={area?.org_id?.toString()}
                                    name="org_id"
                                    onValueChange={(value) => {
                                        const input = document.querySelector("input[name=org_id]")
                                        if (input) input.value = value
                                    }}
                                >
                                    <SelectTrigger id="org_id" className="w-full">
                                        <SelectValue placeholder="Selecione a organização" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {organizations.map((org) => (
                                            <SelectItem key={org.id} value={org.id.toString()}>
                                                {org.name_org}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                                <input type="hidden" name="org_id" defaultValue={area?.org_id?.toString()} />
                            </div>

                            <div className="*:not-first:mt-2">
                                <Label htmlFor="descricao_area">Descrição</Label>
                                <Textarea
                                    id="descricao_area"
                                    name="descricao_area"
                                    rows={5}
                                    defaultValue={area?.descricao_area}
                                    placeholder="Insira um descrição sobre a área..."
                                />
                            </div>

                            <Button type="submit" className="w-full" disabled={updateArea.isPending}>
                                {updateArea.isPending ? (
                                    <>
                                        <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                                        Salvando...
                                    </>
                                ) : (
                                    "Actualizar Área"
                                )}
                            </Button>
                        </div>
                    </CardContent>
                </Card>
            </form>
        </>
    )
}
