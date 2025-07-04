import { Loader2, Plus } from "lucide-react"
import { OrganizationsTable } from "@/components/tables/organizations-table"
import { useOrganizations } from "@/hooks/OrganizationsHooks"
import { useSearch } from "@/context/SearchContext"
import { Link } from "react-router-dom"
import { Button } from "@/components/ui/button"

export default function Organization() {
    const { organizations, isLoading } = useOrganizations()
    const { searchTerm } = useSearch()

    const filtered = organizations.filter((org) =>
        org.name_org?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        org.email_org?.toLowerCase().includes(searchTerm.toLowerCase())
    )

    return (
        <div className="relative space-y-6">
            <h1 className="pl-4 text-2xl font-semibold">Organizações</h1>

            {isLoading ? (
                <div className="flex justify-center py-10">
                    <Loader2 className="w-6 h-6 animate-spin text-muted-foreground" />
                </div>
            ) : (
                <OrganizationsTable organizations={filtered} />
            )}

            <Link to="/dashboard/organization/new" className="fixed z-50 bottom-6 right-6 group">
                <Button
                    className="flex items-center h-12 gap-2 px-4 text-white transition-all duration-200 rounded-lg shadow-xl bg-primary group-hover:pr-6"
                >
                    <Plus className="w-5 h-5 font" />
                    <span className="text-sm font-medium transition-opacity duration-200 opacity-0 group-hover:opacity-100">
                        Criar organização
                    </span>
                </Button>
            </Link>
        </div>
    )
}
