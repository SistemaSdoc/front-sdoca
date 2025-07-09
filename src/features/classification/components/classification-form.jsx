// components/AreaForm.jsx
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Loader2 } from "lucide-react"

export function ClassificationForm({
	register,
	handleSubmit,
	onSubmit,
	isPending,
	setValue,
	temporalidades = [],
	classification = null,
	isEdit = false,
}) {
console.log(temporalidades)
	return (
		<form
			onSubmit={handleSubmit(onSubmit)}
			className="w-full max-w-3xl mx-auto rounded-xl bg-muted/50"
		>
			<Card className="shadow-none">
				<CardContent className="p-6 pt-1 pb-1">
					<div className="flex flex-col gap-5">
						<div className="*:not-first:mt-2">
							<Label htmlFor="codigo">Código</Label>
							<Input
								id="codigo"
								placeholder="Ex: 5 anos"
								{...register("codigo")}
							/>
						</div>

						<div className="*:not-first:mt-2">
							<Label htmlFor="temporalidade_id">Temporalidade</Label>
							<Select
								defaultValue={classification?.temporalidade_id ? String(classification?.temporalidade_id) : ""}
								onValueChange={(value) => setValue("temporalidade_id", value)}>
								<SelectTrigger id="temporalidade_id" className="w-full">
									<SelectValue
										placeholder="Selecione a temporalidade"
									/>
								</SelectTrigger>
								<SelectContent>
									{temporalidades.map((temp) => (
										<SelectItem key={temp.id} value={String(temp.id)}>
											{temp.prazo_guarda}
										</SelectItem>
									))}
								</SelectContent>
							</Select>
						</div>

						<div className="*:not-first:mt-2">
							<Label htmlFor="descricao">Descrição</Label>
							<Textarea
								id="descricao"
								placeholder="Ex: esta classificação tem x anos"
								{...register("descricao")}
							/>
						</div>

						<Button type="submit" className="w-full" disabled={isPending}>
							{isPending ? (
								<Loader2 className="w-4 h-4 mr-2 animate-spin" />
							) : isEdit ? (
								"Atualizar Classificação"
							) : (
								"Criar Classificação"
							)}
						</Button>
					</div>
				</CardContent>
			</Card>
		</form>
	)
}
