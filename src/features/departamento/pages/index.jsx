import { Link } from "react-router-dom"
import { Loader2, Plus } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useSearch } from "@/context/SearchContext"
import ListContent from "@/components/List-content"
import { useDepartamentos } from "../hooks/departamentoHooks"
import { DepartmentsTable } from "../components/departamentos-table"

export default function Departamentos() {
  const { searchTerm } = useSearch()
  const { departamentos, isLoading } = useDepartamentos()

  const filtered = departamentos.filter((departamento) =>
    departamento.name_departamento?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    departamento.descricao_departamento?.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <div className="relative space-y-4">
      <h1 className="text-2xl font-semibold">Distrito</h1>

      <ListContent
        isLoading={isLoading}
        data={departamentos}
        filtered={filtered}
        resource="distrito"
      >
        <DepartmentsTable departments={filtered} />
      </ListContent>

      <Link to="/dashboard/departments/new" className="fixed z-50 bottom-6 right-6 group">
        <Button
          className="flex items-center h-12 gap-2 px-4 text-white transition-all duration-200 rounded-lg shadow-xl bg-primary group-hover:pr-6"
        >
          <Plus className="w-5 h-5 font" />
          <span className="text-sm font-medium transition-opacity duration-200 opacity-0 group-hover:opacity-100">
            Criar Distrito
          </span>
        </Button>
      </Link>
    </div>
  )
}