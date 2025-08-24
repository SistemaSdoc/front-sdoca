import { Button } from "@/components/ui/button"
import { Eye, MoreHorizontal, Edit3, FileText } from "lucide-react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import PdfViewer from "@/components/pdf-viewer"
import { useViewAttachment } from "../hooks/docHooks"
import { useState } from "react"

export function AnexosTable({ Anexos = [] }) {
  const [selectedId, setSelectedId] = useState(null)
  const { fileUrl, isLoading } = useViewAttachment(selectedId)

  return (
    <>
      {Anexos.length === 0 ? (
        <div className="py-12 text-center">
          <FileText className="w-12 h-12 mx-auto text-muted-foreground" />
          <h3 className="mt-4 text-lg font-semibold">
            Nenhum ficheiro anexado nesta entrada.
          </h3>
        </div>
      ) : (
        <div className="border rounded-md">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="px-4">Nome do ficheiro</TableHead>
                <TableHead className="px-4 text-end">Acções</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {Anexos.map((doc) => (
                <TableRow key={doc.id}>
                  <TableCell className="px-4">{doc.nome}</TableCell>
                  <TableCell className="px-4 text-end">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="w-8 h-8 p-0">
                          <MoreHorizontal className="w-4 h-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem onClick={() => setSelectedId(doc.id)}>
                          <Eye className="w-4 h-4" />
                          Visualizar
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          onClick={() => console.log("Assinado!")}
                        >
                          <Edit3 className="w-4 h-4" />
                          Assinar
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

      {/* PDF Viewer */}
      {fileUrl && !isLoading && (
        <PdfViewer
          selectedPdfUrl={fileUrl}
          setSelectedPdfUrl={() => setSelectedId(null)}
        />
      )}
    </>
  )
}
