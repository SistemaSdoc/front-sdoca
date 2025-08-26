import { useNavigate } from "react-router-dom"
import { Button } from "@/components/ui/button"
import { useDeleteDocument } from "@/features/documentos/hooks/docHooks"
import { Eye, MoreHorizontal, Trash2, ArrowRightLeft, Printer } from "lucide-react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import DeleteDialog from "@/components/dialogs/delete-dialog"
import useModalStore from "@/store/modalStore"
import TransferDialog from "@/components/dialogs/transfer-dialog"
import { printProtocolo } from "@/lib/printProtocolo"

export function DocumentsTable({ documents = [] }) {
  const navigate = useNavigate()
  const deleteMutation = useDeleteDocument() // pega o objeto inteiro
  const { isOpen, modalType, data, open, close } = useModalStore()

  return (
    <>
      <div className="border rounded-md">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="px-4">Título</TableHead>
              <TableHead className="px-4">Tipo</TableHead>
              <TableHead className="px-4">Área de origem</TableHead>
              <TableHead className="px-4">Área de destino</TableHead>
              <TableHead className="px-4">Criado em</TableHead>
              <TableHead className="w-[50px] px-4"></TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {documents.map((doc) => (
              <TableRow key={doc.id}>
                <TableCell className="px-4">{doc.titulo_doc}</TableCell>
                <TableCell className="px-4">{doc.tipo}</TableCell>
                <TableCell className="px-4">{doc.area_origem}</TableCell>
                <TableCell className="px-4">{doc.area_destino}</TableCell>
                <TableCell className="px-4">{doc.created_at || "-"}</TableCell>
                <TableCell className="px-4">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" className="w-8 h-8 p-0">
                        <MoreHorizontal className="w-4 h-4" />
                      </Button>
                    </DropdownMenuTrigger>

                    <DropdownMenuContent align="end">
                      <DropdownMenuItem onClick={() => navigate(`/dashboard/documents/${doc.encrypted_id}`)}>
                        <Eye className="w-4 h-4" />
                        Ver anexos
                      </DropdownMenuItem>

                      <DropdownMenuItem onClick={() => printProtocolo(doc.encrypted_id)}>
                        <Printer className="w-4 h-4" />
                        Imprimir protocolo
                      </DropdownMenuItem>

                      <DropdownMenuItem onClick={() => open("transfer", doc.id)}>
                        <ArrowRightLeft className="w-4 h-4" />
                        Transferir
                      </DropdownMenuItem>

                      <DropdownMenuItem onClick={() => open("delete", doc.id)}>
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
          featureName="documento"
        />
      )}

      {modalType === "transfer" && (
        <TransferDialog
          showDialog={isOpen}
          onOpenChange={(v) => (v ? null : close())}
          featureID={data}
          isPending={false}
          featureName="documento"
        />
      )}
    </>
  )
}
