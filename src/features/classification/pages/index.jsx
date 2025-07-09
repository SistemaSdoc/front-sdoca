import { Link } from "react-router-dom"
import { Loader2, Plus } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useSearch } from "@/context/SearchContext"
import { useClassificacoes } from "@/features/classification/hooks/classificationHooks"
import { ClassificationsTable } from "@/features/classification/components/classification-table"

export default function Classifications() {
  const { searchTerm } = useSearch()
  const { classificacoes, isLoading } = useClassificacoes()

  const filtered = classificacoes.filter((classificacao) =>
    classificacao.codigo?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    classificacao.descricao?.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <div className="relative space-y-6">
      <h1 className="text-2xl font-semibold">Classificações</h1>

      {isLoading ? (
        <div className="flex justify-center py-10">
          <Loader2 className="w-6 h-6 animate-spin text-muted-foreground" />
        </div>
      ) : (
        <ClassificationsTable classifications={filtered} />
      )}

      <Link to="/dashboard/classifications/new" className="fixed z-50 bottom-6 right-6 group">
        <Button
          className="flex items-center h-12 gap-2 px-4 text-white transition-all duration-200 rounded-lg shadow-xl bg-primary group-hover:pr-6"
        >
          <Plus className="w-5 h-5 font" />
          <span className="text-sm font-medium transition-opacity duration-200 opacity-0 group-hover:opacity-100">
            Nova Classificação
          </span>
        </Button>
      </Link>
    </div>
  )
}
