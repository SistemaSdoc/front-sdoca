import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { Button } from "@/components/ui/button"
import { useDeleteDocument } from "@/features/documentos/hooks/docHooks"
import { Eye, MoreHorizontal, Edit3, Trash2, Users, Loader2, Tags, Clock2 } from "lucide-react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "@/components/ui/alert-dialog"
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"


export function ClassificationsTable({ classifications = [] }) {
  const navigate = useNavigate()
  const deleteMutation = useDeleteDocument()
  const [classificationId, setClassificationId] = useState(null)
  const [showDeleteDialog, setShowDeleteDialog] = useState(false)

  function confirmDelete() {
    if (classificationId) {
      deleteMutation.mutate(classificationId, {
        onSuccess: () => {
          setShowDeleteDialog(false)
          setClassificationId(null)
        },
      })
    }
  }

  return (
    <>
      {classifications.length === 0 ? (
        <div className="py-12 text-center">
          <Tags className="w-12 h-12 mx-auto text-muted-foreground" />
          <h3 className="mt-4 text-lg font-semibold">Nenhuma classificações encontrada</h3>
          <p className="text-muted-foreground">Tente ajustar os filtros de busca.</p>
        </div>
      ) : (
        <div className="border rounded-md">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="px-4">Código</TableHead>
               {/*  <TableHead className="px-4">Temporalidade</TableHead> */}
                <TableHead className="px-4">descricao</TableHead>
                <TableHead className="px-4">Criado em</TableHead>
                <TableHead className="w-[50px] px-4"></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {classifications.map((classification) => (
                <TableRow key={classification.id}>
                  <TableCell className="px-4">{classification.codigo}</TableCell>
                  {/* <TableCell className="px-4">{classification.destino_final}</TableCell> */}
                  <TableCell className="px-4">{classification.descricao}</TableCell>
                  <TableCell className="px-4">{classification.created_at || "-"}</TableCell>
                  <TableCell className="px-4">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="w-8 h-8 p-0">
                          <MoreHorizontal className="w-4 h-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem onClick={() => navigate(`/dashboard/classifications/${classification.encrypted_id}`)}>
                          <Eye className="w-4 h-4" />
                          Visualizar
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => navigate(`/dashboard/classifications/edit/${classification.encrypted_id}`)}>
                          <Edit3 className="w-4 h-4" />
                          Editar
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          onClick={() => {
                            setClassificationId(classification.id)
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
            <AlertDialogTitle>Apagar Classificação</AlertDialogTitle>
            <AlertDialogDescription>
              Tem certeza que deseja apagar esta classificação? Essa acção é irreversível.
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
