import { Loader2, Plus } from "lucide-react"
import { AreasTable } from "@/components/tables/areas-table"
import { Link } from "react-router-dom"
import { Button } from "@/components/ui/button"
import { useSearch } from "@/context/SearchContext"
import { useAreas } from "@/hooks/areasHooks"

export default function Areas() {
    const { areas, isLoading } = useAreas()
    const { searchTerm } = useSearch()

    const filtered = areas.filter((area) =>
        area.name_area?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        area.email_area?.toLowerCase().includes(searchTerm.toLowerCase())
    )

    return (
        <div className="relative space-y-6">
            <h1 className="pl-4 text-2xl font-semibold">Areas</h1>

            {isLoading ? (
                <div className="flex justify-center py-10">
                    <Loader2 className="w-6 h-6 animate-spin text-muted-foreground" />
                </div>
            ) : (
                <AreasTable areas={filtered} />
            )}

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
