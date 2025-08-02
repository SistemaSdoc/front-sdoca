import { useState } from "react"
import { Link } from "react-router-dom"
import { Loader2, Plus } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useAuth } from '@/context/AuthContext'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { DocumentsTable } from "@/features/documentos/components/documents-table"
import { useDocuments } from "@/features/documentos/hooks/docHooks"

export default function Documents() {
  const { user } = useAuth()
  const areaId = user?.id_area
  const [filter, setFilter] = useState("entradas")
  const { documents, isLoading } = useDocuments(filter, areaId)

  return (
    <div className="relative space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold">Documentos</h1>

        <Select onValueChange={setFilter}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Filtrar por tipo" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="entradas">Entradas</SelectItem>
            <SelectItem value="saidas">Saídas</SelectItem>
            <SelectItem value="finalizados">Finalizados</SelectItem>
            <SelectItem value="arquivados">Arquivados</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {isLoading ? (
        <div className="flex justify-center py-10">
          <Loader2 className="w-6 h-6 animate-spin text-muted-foreground" />
        </div>
      ) : (
        <DocumentsTable documents={documents} />
      )}

      <Link to="/dashboard/documents/new" className="fixed z-50 bottom-6 right-6 group">
        <Button className="flex items-center h-12 gap-2 px-4 text-white transition-all duration-200 rounded-lg shadow-xl bg-primary group-hover:pr-6">
          <Plus className="w-5 h-5 font" />
          <span className="text-sm font-medium transition-opacity duration-200 opacity-0 group-hover:opacity-100">
            Criar Documento
          </span>
        </Button>
      </Link>
    </div>
  )
}
