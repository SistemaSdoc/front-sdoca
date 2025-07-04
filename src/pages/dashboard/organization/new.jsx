import { Loader2, ChevronLeftIcon, Building2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import ImageUploader from '@/components/ImageUploader'
import { useCreateOrganization } from '@/hooks/OrganizationsHooks'
import { Link } from 'react-router-dom'
import { useState } from "react"

export default function NewOrganization() {
    const { mutate, isPending } = useCreateOrganization()

    const [formData, setFormData] = useState({
        name_org: "",
        nif_org: "",
        telefone_org: "",
        email_org: "",
        provincia_org: "",
        regime_org: "",
        descricao_org: ""
    })

    function handleChange(e) {
        const { name, value } = e.target
        setFormData((prev) => ({ ...prev, [name]: value }))
    }

    function handleSubmit(e) {
        e.preventDefault()
        console.log("📦 Enviando dados:", formData)
        mutate({ formData })
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

            <form onSubmit={handleSubmit} className="w-full h-auto max-w-3xl mx-auto rounded-xl bg-muted/50">
                <Card className='shadow-none'>
                    <CardContent className="p-6 pt-1 pb-1">
                        <div className="flex flex-col gap-5">
                            <ImageUploader />

                            <div className="*:not-first:mt-2">
                                <Label htmlFor="name_org">Nome</Label>
                                <Input
                                    id="name_org"
                                    name="name_org"
                                    placeholder="Ex: Empresa Kixico"
                                    value={formData.name_org}
                                    onChange={handleChange}
                                />
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div className="*:not-first:mt-2">
                                    <Label htmlFor="nif_org">NIF</Label>
                                    <Input
                                        type="number"
                                        id="nif_org"
                                        name="nif_org"
                                        placeholder="Ex: 5000000000"
                                        value={formData.nif_org}
                                        onChange={handleChange}
                                    />
                                </div>

                                <div className="*:not-first:mt-2">
                                    <Label htmlFor="telefone_org">Telefone</Label>
                                    <Input
                                        type="number"
                                        id="telefone_org"
                                        name="telefone_org"
                                        placeholder="Ex: 923000000"
                                        value={formData.telefone_org}
                                        onChange={handleChange}
                                    />
                                </div>
                            </div>

                            <div className="*:not-first:mt-2">
                                <Label htmlFor="email_org">E-mail</Label>
                                <Input
                                    id="email_org"
                                    name="email_org"
                                    placeholder="Ex: contacto@kixico.ao"
                                    value={formData.email_org}
                                    onChange={handleChange}
                                />
                            </div>

                            <div className="*:not-first:mt-2">
                                <Label htmlFor="provincia_org">Província</Label>
                                <Input
                                    id="provincia_org"
                                    name="provincia_org"
                                    placeholder="Ex: Luanda"
                                    value={formData.provincia_org}
                                    onChange={handleChange}
                                />
                            </div>

                            <div className="*:not-first:mt-2">
                                <Label htmlFor="regime_org">Regime</Label>
                                <Select
                                    value={formData.regime_org}
                                    onValueChange={(value) =>
                                        setFormData((prev) => ({ ...prev, regime_org: value }))
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
                                    name="descricao_org"
                                    placeholder="Fale um pouco sobre a organização..."
                                    rows={5}
                                    value={formData.descricao_org}
                                    onChange={handleChange}
                                />
                            </div>

                            <Button type="submit" className="w-full" disabled={isPending}>
                                {isPending ? (
                                    <>
                                        <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                                    </>
                                ) : (
                                    "Criar organização"
                                )}
                            </Button>
                        </div>
                    </CardContent>
                </Card>
            </form>
        </>
    )
}
