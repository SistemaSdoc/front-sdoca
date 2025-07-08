import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { Button } from "@/components/ui/button"
import { useDeleteDocument } from "@/features/documentos/hooks/docHooks"
import { Eye, MoreHorizontal, Edit3, Trash2, Users, Loader2, FileText } from "lucide-react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "@/components/ui/alert-dialog"
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"


export function DocumentsTable({ documents = [] }) {
  const navigate = useNavigate()
  const deleteMutation = useDeleteDocument()
  const [docId, setDocId] = useState(null)
  const [showDeleteDialog, setShowDeleteDialog] = useState(false)

  function confirmDelete() {
    if (docId) {
      deleteMutation.mutate(docId, {
        onSuccess: () => {
          setShowDeleteDialog(false)
          setDocId(null)
        },
      })
    }
  }

  return (
    <>
      {documents.length === 0 ? (
        <div className="py-12 text-center">
          <FileText className="w-12 h-12 mx-auto text-muted-foreground" />
          <h3 className="mt-4 text-lg font-semibold">Nenhum documento encontrado</h3>
          <p className="text-muted-foreground">Tente ajustar os filtros de busca.</p>
        </div>
      ) : (
        <div className="border rounded-md">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="px-4">Nome</TableHead>
                <TableHead className="px-4">Email</TableHead>
                <TableHead className="px-4">Área pertencente</TableHead>
                <TableHead className="px-4">Papel no sistema</TableHead>
                <TableHead className="px-4">Criado em</TableHead>
                <TableHead className="w-[50px] px-4"></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {documents.map((doc) => (
                <TableRow key={doc.id}>
                  <TableCell className="px-4">
                    <div className="flex items-center space-x-3 font-medium">
                      <Avatar className="w-8 h-8">
                        <AvatarImage src={`http://localhost:8000/storage/${doc.profile_photo_path}`} alt={doc.name} />
                        <AvatarFallback>{doc.name?.slice(0, 1).toUpperCase() || "?"}</AvatarFallback>
                      </Avatar>
                      <span>{doc.name}</span>
                    </div>
                  </TableCell>
                  <TableCell className="px-4">{doc.email}</TableCell>
                  <TableCell className="px-4">{doc.area}</TableCell>
                  <TableCell className="px-4">{doc.role || "-"}</TableCell>
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
                          Visualizar
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => navigate(`/dashboard/documents/edit/${doc.encrypted_id}`)}>
                          <Edit3 className="w-4 h-4" />
                          Editar
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          onClick={() => {
                            setDocId(doc.id)
                            setShowDeleteDialog(true)
                          }}
                        >
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
      )}

      {/* ALERT MODAL */}
      <AlertDialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Apagar Documento</AlertDialogTitle>
            <AlertDialogDescription>
              Tem certeza que deseja apagar este documento? Essa acção é irreversível.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel disabled={deleteMutation.isPending}>Cancelar</AlertDialogCancel>
            <AlertDialogAction
              onClick={confirmDelete}
              disabled={deleteMutation.isPending}
            >
              {deleteMutation.isPending ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                </>
              ) : (
                "Apagar"
              )}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  )
}
