import { Link } from "react-router-dom"
import { Loader2, Plus } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useSearch } from "@/context/SearchContext"
import { useTemporalidades } from "@/features/temporalidade/hooks/temporalidadeHooks"
import { TemporalidadesTable } from "@/features/temporalidade/components/temporalidades-table"

export default function Temporalidades() {
  const { searchTerm } = useSearch()
  const { temporalidades, isLoading } = useTemporalidades()

  const filtered = temporalidades.filter((temporalidade) =>
    temporalidade.prazo_guarda?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    temporalidade.destino_final?.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <div className="relative space-y-6">
      <h1 className="text-2xl font-semibold">Temporalidades</h1>

      {isLoading ? (
        <div className="flex justify-center py-10">
          <Loader2 className="w-6 h-6 animate-spin text-muted-foreground" />
        </div>
      ) : (
        <TemporalidadesTable temporalidades={filtered} />
      )}

      <Link to="/dashboard/temps/new" className="fixed z-50 bottom-6 right-6 group">
        <Button
          className="flex items-center h-12 gap-2 px-4 text-white transition-all duration-200 rounded-lg shadow-xl bg-primary group-hover:pr-6"
        >
          <Plus className="w-5 h-5 font" />
          <span className="text-sm font-medium transition-opacity duration-200 opacity-0 group-hover:opacity-100">
            Nova Temporalidade
          </span>
        </Button>
      </Link>
    </div>
  )
}
