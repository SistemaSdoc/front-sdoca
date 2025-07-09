// components/AreaForm.jsx
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Loader2 } from "lucide-react"

export function DocTypeForm({
	register,
	handleSubmit,
	onSubmit,
	isPending,
	setValue,
	classifications = [],
	doc_type = null,
	isEdit = false,
}) {
	return (
		<form
			onSubmit={handleSubmit(onSubmit)}
			className="w-full max-w-3xl mx-auto rounded-xl bg-muted/50"
		>
			<Card className="shadow-none">
				<CardContent className="p-6 pt-1 pb-1">
					<div className="flex flex-col gap-5">
						<div className="*:not-first:mt-2">
							<Label htmlFor="nome">Nome</Label>
							<Input
								id="nome"
								placeholder="Ex: certificado"
								{...register("nome")}
							/>
						</div>

						<div className="*:not-first:mt-2">
							<Label htmlFor="classificacao_id">Classificação</Label>
							<Select
								defaultValue={doc_type?.classificacao_id ? String(doc_type?.classificacao_id) : ""}
								onValueChange={(value) => setValue("classificacao_id", value)}>
								<SelectTrigger id="classificacao_id" className="w-full">
									<SelectValue
										placeholder="Selecione a classificação deste tipo"
									/>
								</SelectTrigger>
								<SelectContent>
									{classifications.map((classification) => (
										<SelectItem key={classification.id} value={String(classification.id)}>
											{classification.codigo} - {classification.descricao}

										</SelectItem>
									))}
								</SelectContent>
							</Select>
						</div>

						<div className="*:not-first:mt-2">
							<Label htmlFor="descricao">Descrição</Label>
							<Textarea
								id="descricao"
								placeholder="Ex: xxxx..."
								{...register("descricao")}
							/>
						</div>

						<Button type="submit" className="w-full" disabled={isPending}>
							{isPending ? (
								<Loader2 className="w-4 h-4 mr-2 animate-spin" />
							) : isEdit ? (
								"Atualizar Tipo de Documento"
							) : (
								"Criar Tipo de Documento"
							)}
						</Button>
					</div>
				</CardContent>
			</Card>
		</form>
	)
}
