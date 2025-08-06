import { useMutation } from "@tanstack/react-query"
import { scanAPI } from "./axios"
import { toast } from "sonner"


export function useScanMutation({ currentFiles, setValue }) {
  return useMutation({
    mutationFn: async () => {
      const response = await scanAPI.get('/scan', { responseType: 'blob' })
      return response.data
    },
    onSuccess: (blob) => {
      const now = new Date()
      const formattedDate = now.toLocaleString('pt-BR', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        hour12: false,
      })

      const scannedFile = new File([blob], `Documento escaneado - ${formattedDate}.pdf`, {
        type: 'application/pdf',
      })

      const updatedFiles = [...currentFiles, scannedFile]
      const deduplicated = Array.from(new Map(updatedFiles.map(f => [f.name, f])).values())

      setValue('anexo_docs', deduplicated)

      toast.success("Documento escaneado com sucesso!")
    },
    onError: () => {
      toast.error("Falha ao escanear documento!")
    }
  })
}
