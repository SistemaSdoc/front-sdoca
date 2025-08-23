import { useNavigate } from "react-router-dom"
import { Button } from "@/components/ui/button"
import { Eye, MoreHorizontal, Edit3, FileText } from "lucide-react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import {
  FilePdf,
  MicrosoftWordLogo,
  MicrosoftExcelLogo,
  FileImage,
  FileZip,
  File,
} from 'phosphor-react'

// Função para retornar o ícone conforme a extensão
/* const getFileIcon = (ext) => {
  const f = ext?.toLowerCase()

  if (f === 'pdf') return <FilePdf className="text-red-500" size={22} weight="light" />
  if (['doc', 'docx'].includes(f)) return <MicrosoftWordLogo className="text-blue-600" size={22} weight="light" />
  if (['xls', 'xlsx', 'csv'].includes(f)) return <MicrosoftExcelLogo className="text-green-600" size={22} weight="light" />
  if (['png', 'jpg', 'jpeg', 'gif'].includes(f)) return <FileImage className="text-yellow-500" size={22} weight="light" />
  if (['zip', 'rar', '7z'].includes(f)) return <FileZip className="text-orange-500" size={22} weight="light" />

  return <File className="text-gray-500" size={22} weight="light" />
}
 */


export function AnexosTable({ Anexos = [] }) {
  const navigate = useNavigate()

  return (
    <>
      {Anexos.length === 0 ? (
        <div className="py-12 text-center">
          <FileText className="w-12 h-12 mx-auto text-muted-foreground" />
          <h3 className="mt-4 text-lg font-semibold">Nenhum ficheiro anexado nesta entrada.</h3>
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
                        <DropdownMenuItem onClick={() => navigate(`/dashboard/documents/${doc.encrypted_id}`)}>
                          <Eye className="w-4 h-4" />
                          Visualizar
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => console.log('Assinado!')}>
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
    </>
  )
}
