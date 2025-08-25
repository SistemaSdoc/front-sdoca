import { useNavigate } from "react-router-dom"
import { Button } from "@/components/ui/button"
import { Eye, MoreHorizontal, Trash2, ArrowRightLeft, Edit3 } from "lucide-react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import DeleteDialog from "@/components/dialogs/delete-dialog"
import useModalStore from "@/store/modalStore"
import { useDeleteDepartamento } from "../hooks/departamentoHooks"

export function DepartmentsTable({ departments = [] }) {
  const navigate = useNavigate()
  const deleteMutation = useDeleteDepartamento() // pega o objeto inteiro
  const { isOpen, modalType, data, open, close } = useModalStore()

  return (
    <>
      <div className="border rounded-md">
        <Table>
          <TableHeader>
            <TableRow>
              {/* <TableHead className="px-4">Sigla</TableHead> */}
              <TableHead className="px-4">Nome</TableHead>
              <TableHead className="px-4">E-mail</TableHead>
              <TableHead className="px-4">Telefone </TableHead>
              <TableHead className="px-4">Descrição</TableHead>
              <TableHead className="px-4">Criado em</TableHead>
              <TableHead className="w-[50px] px-4"></TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {departments.map((depart) => (
              <TableRow key={depart.id}>
                <TableCell className="px-4">{depart.name_departamento}</TableCell>
                <TableCell className="px-4">{depart.email_departamento}</TableCell>
                <TableCell className="px-4">{depart.telefone_departamento}</TableCell>
                <TableCell className="px-4">{depart.descricao_departamento}</TableCell>
                <TableCell className="px-4">{depart.created_at || "-"}</TableCell>
                <TableCell className="px-4">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" className="w-8 h-8 p-0">
                        <MoreHorizontal className="w-4 h-4" />
                      </Button>
                    </DropdownMenuTrigger>

                    <DropdownMenuContent align="end">
                      <DropdownMenuItem onClick={() => navigate(`/dashboard/departments/${depart.encrypted_id}`)}>
                        <Eye className="w-4 h-4" />
                        Ver
                      </DropdownMenuItem>

                      <DropdownMenuItem onClick={() => navigate(`/dashboard/departments/edit/${depart.encrypted_id}`)}>
                        <Edit3 className="w-4 h-4" />
                        Editar
                      </DropdownMenuItem>

                      <DropdownMenuItem onClick={() => open("delete", depart.id)}>
                        <Trash2 className="w-4 h-4" />
                        Apagar
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {modalType === "delete" && (
        <DeleteDialog
          showDialog={isOpen}
          onOpenChange={(v) => (v ? null : close())}
          onConfirm={() =>
            deleteMutation.mutate(data, { onSuccess: () => close() })
          }
          isPending={deleteMutation.isPending}
          featureName="departamento"
        />
      )}
    </>
  )
}