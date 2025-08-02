import { Link } from "react-router-dom"
import { Loader2, Plus } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useSearch } from "@/context/SearchContext"
import { useDrawers } from "@/features/drawer/hooks/drawerHooks"
import { DrawersTable } from "@/features/drawer/components/drawer-table"

export default function Drawers() {
  const { searchTerm } = useSearch()
  const { drawers, isLoading } = useDrawers()

  const filtered = drawers.filter((drawer) =>
    drawer.num_gaveta?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    drawer.num_processos?.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <div className="relative space-y-6">
      <h1 className="text-2xl font-semibold">Gavetas</h1>

      {isLoading ? (
        <div className="flex justify-center py-10">
          <Loader2 className="w-6 h-6 animate-spin text-muted-foreground" />
        </div>
      ) : (
        <DrawersTable drawers={filtered} />
      )}

      <Link to="/dashboard/drawers/new" className="fixed z-50 bottom-6 right-6 group">
        <Button
          className="flex items-center h-12 gap-2 px-4 text-white transition-all duration-200 rounded-lg shadow-xl bg-primary group-hover:pr-6"
        >
          <Plus className="w-5 h-5 font" />
          <span className="text-sm font-medium transition-opacity duration-200 opacity-0 group-hover:opacity-100">
            Adicionar gaveta
          </span>
        </Button>
      </Link>
    </div>
  )
}
