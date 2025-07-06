import * as React from "react"
import { Eye, MoreHorizontal, Pencil, Trash2, Building2, Edit3 } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { useNavigate } from "react-router-dom"

export function OrganizationsTable({ organizations = [] }) {
  const navigate = useNavigate()

  return (
    <>
      {organizations.length === 0 ? (
        <div className="py-12 text-center">
          <Building2 className="w-12 h-12 mx-auto text-muted-foreground" />
          <h3 className="mt-4 text-lg font-semibold">Nenhuma organização encontrada</h3>
          <p className="text-muted-foreground">Tente ajustar os filtros de busca.</p>
        </div>
      ) : (
        <div className="border rounded-md">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="px-4">Nome</TableHead>
                <TableHead className="px-4">Descrição</TableHead>
                <TableHead className="px-4">Email</TableHead>
                <TableHead className="px-4">Telefone</TableHead>
                <TableHead className="px-4">Província</TableHead>
                <TableHead className="px-4">Regime</TableHead>
                <TableHead className="px-4">NIF</TableHead>
                <TableHead className="w-[50px] px-4"></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {organizations.map((org) => (
                <TableRow key={org.id}>
                  <TableCell className="px-4">
                    <div className="flex items-center space-x-3 font-medium">
                      <Avatar className="w-8 h-8">
                        <AvatarImage src={`http://localhost:8000/storage/${org.logo_org}`} alt={org.name_org} />
                        <AvatarFallback>{org.name_org?.slice(0, 1).toUpperCase() || "?"}</AvatarFallback>
                      </Avatar>
                      <span>{org.name_org}</span>
                    </div>
                  </TableCell>
                  <TableCell className="max-w-[250px] truncate text-muted-foreground px-4">{org.descricao_org}</TableCell>
                  <TableCell className="px-4">{org.email_org}</TableCell>
                  <TableCell className="px-4">{org.telefone_org}</TableCell>
                  <TableCell className="px-4">{org.provincia_org || "-"}</TableCell>
                  <TableCell className="px-4">
                    <Badge variant="outline">{org.regime_org || "N/A"}</Badge>
                  </TableCell>
                  <TableCell className="px-4">{org.nif_org}</TableCell>
                  <TableCell className="px-4">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="w-8 h-8 p-0">
                          <MoreHorizontal className="w-4 h-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem onClick={() => navigate(`/dashboard/organization/${org.encrypted_id}`)}>
                          <Eye className="w-4 h-4" />
                          Visualizar
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => navigate(`/dashboard/organization/edit/${org.encrypted_id}`)}>
                          <Edit3 className="w-4 h-4" />
                          Editar
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      )}
    </>
  )
}
