import { Link } from "react-router-dom"
import { Loader2, Plus } from "lucide-react"
import { useAreas } from "@/features/areas/hooks/areasHooks"
import { Button } from "@/components/ui/button"
import { useSearch } from "@/context/SearchContext"
import { AreasTable } from "@/features/areas/components/areas-table"
import ListContent from "@/components/List-content"

export default function Areas() {
  const { searchTerm } = useSearch()
  const { areas, isLoading } = useAreas()

  const filtered = areas.filter((area) =>
    area.name_area?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    area.email_area?.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <div className="relative space-y-4">
      <h1 className="text-2xl font-semibold">Áreas</h1>

      <ListContent
        isLoading={isLoading}
        data={areas}
        filtered={filtered}
        resource="área"
      >
        <AreasTable areas={filtered} />
      </ListContent>

      <Link to="/dashboard/areas/new" className="fixed z-50 bottom-6 right-6 group">
        <Button
          className="flex items-center h-12 gap-2 px-4 text-white transition-all duration-200 rounded-lg shadow-xl bg-primary group-hover:pr-6"
        >
          <Plus className="w-5 h-5 font" />
          <span className="text-sm font-medium transition-opacity duration-200 opacity-0 group-hover:opacity-100">
            Criar Área
          </span>
        </Button>
      </Link>
    </div>
  )
}
