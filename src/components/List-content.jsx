import { Loader2, FileText, Search, List, } from "lucide-react"
import { useSearch } from "@/context/SearchContext" // ou o caminho certo pro teu hook

export default function ListContent({
  isLoading,
  data = [],
  filtered,
  children,
  resource = "item",
  icon = List
}) {
  const { searchTerm } = useSearch()
  const EmptyIcon = icon

  if (isLoading) {
    return (
      <div className="flex justify-center py-10">
        <Loader2 className="w-6 h-6 animate-spin text-muted-foreground" />
      </div>
    )
  }

  if (data.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center gap-2 py-10 text-muted-foreground">
        <EmptyIcon className="w-10 h-10" />
        <p className="text-sm">Nenhum {resource} cadastrado ainda.</p>
      </div>
    )
  }

  if (filtered.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center gap-2 py-10 text-muted-foreground">
        <Search className="w-8 h-8 text-icon-foreground" />
        <p className="text-sm">
          Nenhum resultado encontrado para
          <span className="font-semibold text-secondary-foreground"> "{searchTerm}"</span>.
        </p>
      </div>
    )
  }

  return children
}
