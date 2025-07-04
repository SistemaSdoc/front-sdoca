import { Loader2, ChevronLeftIcon, Layers } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useCreateArea } from '@/hooks/areasHooks'
import { useOrganizations } from "@/hooks/OrganizationsHooks"
import { Link } from 'react-router-dom'
import { useState } from "react"

export default function NewArea() {
    const { mutate, isPending } = useCreateArea()
    const { organizations } = useOrganizations()

    const [formData, setFormData] = useState({
        name_area: "",
        slogan_area: "",
        telefone_area: "",
        email_area: "",
        org_id: "",
        descricao_area: "",
    })

    function handleChange(e) {
        const { name, value } = e.target
        setFormData((prev) => ({ ...prev, [name]: value }))
    }

    function handleSubmit(e) {
        e.preventDefault()

        mutate({
            ...formData,
            org_id: parseInt(formData.org_id),
        })
    }

    return (
        <>
            <div className="pt-2 pl-4">
                <Link to='/dashboard/areas'>
                    <Button variant="link" className="gap-1">
                        <ChevronLeftIcon className="opacity-60" size={16} aria-hidden="true" />
                        Voltar
                    </Button>
                </Link>
            </div>

            <div className="space-y-2 text-center">
                <div className="flex items-center justify-center space-x-2">
                    <Layers className="w-8 h-8 text-primary" />
                    <h1 className="text-3xl font-medium">Criar Nova Área</h1>
                </div>
                <p className="text-muted-foreground">Preencha os dados abaixo para registrar uma nova área no sistema</p>
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
                                        placeholder="Ex: área de desenvolvimento"
                                        value={formData.name_area}
                                        onChange={handleChange}
                                    />
                                </div>

                                <div className="*:not-first:mt-2">
                                    <Label htmlFor="slogan_area">Sigla</Label>
                                    <Input
                                        type="text"
                                        id="slogan_area"
                                        name="slogan_area"
                                        placeholder="Ex: AD"
                                        value={formData.slogan_area}
                                        onChange={handleChange}
                                    />
                                </div>
                            </div>

                            <div className="*:not-first:mt-2">
                                <Label htmlFor="telefone_area">Telefone</Label>
                                <Input
                                    type='number'
                                    id="telefone_area"
                                    name="telefone_area"
                                    placeholder="Ex: 923000000"
                                    value={formData.telefone_area}
                                    onChange={handleChange}
                                />
                            </div>

                            <div className="*:not-first:mt-2">
                                <Label htmlFor="email_area">E-mail</Label>
                                <Input
                                    type="email"
                                    id="email_area"
                                    name="email_area"
                                    placeholder="Ex: desenvolvimento@area.ao"
                                    value={formData.email_area}
                                    onChange={handleChange}
                                />
                            </div>

                            <div className="*:not-first:mt-2">
                                <Label htmlFor="org_id">Organização Pertencente</Label>
                                <Select
                                    value={formData.org_id}
                                    onValueChange={(value) =>
                                        setFormData((prev) => ({ ...prev, org_id: parseInt(value) }))
                                    }
                                >
                                    <SelectTrigger id="org_id" className="w-full">
                                        <SelectValue placeholder="Selecione a organização" />
                                    </SelectTrigger>

                                    <SelectContent>
                                        {organizations.map((org) => (
                                            <SelectItem key={org.id} value={org.id}>
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
                                    name="descricao_area"
                                    placeholder="Insira um descrição sobre a area..."
                                    rows={5}
                                    value={formData.descricao_area}
                                    onChange={handleChange}
                                />
                            </div>

                            <Button type="submit" className="w-full" disabled={isPending}>
                                {isPending ? (
                                    <>
                                        <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                                    </>
                                ) : (
                                    "Criar Área"
                                )}
                            </Button>
                        </div>
                    </CardContent>
                </Card>
            </form>
        </>
    )
}
