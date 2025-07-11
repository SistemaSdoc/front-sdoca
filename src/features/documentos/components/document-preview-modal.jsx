"use client"

import { useState, useEffect } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { ScrollArea } from "@/components/ui/scroll-area"
import {
  X,
  Download,
  ZoomIn,
  ZoomOut,
  Loader2,
  FileText,
  ImageIcon,
  Scissors,
  Merge,
  RotateCw,
  FileArchiveIcon as Compress,
  Lock,
} from "lucide-react"

export function DocumentPreviewModal({ isOpen, onClose, file }) {
  const [zoom, setZoom] = useState(100)
  const [isLoading, setIsLoading] = useState(false)
  const [previewUrl, setPreviewUrl] = useState(null)

  useEffect(() => {
    if (file) {
      if (file.file instanceof File) {
        const url = URL.createObjectURL(file.file)
        setPreviewUrl(url)
        return () => URL.revokeObjectURL(url)
      } else if (file.file.url) {
        setPreviewUrl(file.file.url)
      }
    }
  }, [file])

  if (!file) return null

  const fileName = file.file instanceof File ? file.file.name : file.file.name
  const fileType = file.file instanceof File ? file.file.type : file.file.type
  const fileSize = file.file instanceof File ? file.file.size : file.file.size

  const isPDF = fileType.includes("pdf")
  const isImage = fileType.startsWith("image/")

  const formatFileSize = (bytes) => {
    if (bytes === 0) return "0 Bytes"
    const k = 1024
    const sizes = ["Bytes", "KB", "MB", "GB"]
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return Number.parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i]
  }

  const handleOperation = async (operation) => {
    setIsLoading(true)
    try {
      // Simular operação
      await new Promise((resolve) => setTimeout(resolve, 2000))
      console.log(`Executando operação: ${operation} no arquivo: ${fileName}`)
      // Aqui você faria a chamada real para o backend
      alert(`Operação "${operation}" executada no arquivo: ${fileName}`)
    } finally {
      setIsLoading(false)
    }
  }

  const handleDownload = () => {
    if (previewUrl) {
      const link = document.createElement("a")
      link.href = previewUrl
      link.download = fileName
      link.click()
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-6xl h-[90vh] flex flex-col">
        <DialogHeader className="flex-shrink-0">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-2">
                {isPDF ? (
                  <FileText className="w-5 h-5 text-red-500" />
                ) : isImage ? (
                  <ImageIcon className="w-5 h-5 text-blue-500" />
                ) : (
                  <FileText className="w-5 h-5 text-gray-500" />
                )}
                <DialogTitle className="max-w-md truncate">{fileName}</DialogTitle>
              </div>
              <Badge variant="secondary">{formatFileSize(fileSize)}</Badge>
            </div>
            <Button variant="ghost" type="button" size="icon" onClick={onClose}>
              <X className="w-4 h-4" />
            </Button>
          </div>
        </DialogHeader>

        <Separator />

        {/* Operations Toolbar */}
        <div className="flex items-center gap-2 p-3 rounded-lg bg-gray-50">
          <div className="flex items-center gap-2">
            <span className="text-sm font-medium">Operações:</span>
          </div>

          <Separator orientation="vertical" className="h-6" />

          <div className="flex flex-wrap items-center gap-1">
            {isPDF && (
              <>
                <Button variant="outline" type="button" size="sm" disabled={isLoading} onClick={() => handleOperation("separar")}>
                  {isLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Scissors className="w-4 h-4" />}
                  <span className="hidden ml-2 sm:inline">Separar</span>
                </Button>

                <Button variant="outline" type="button" size="sm" disabled={isLoading} onClick={() => handleOperation("juntar")}>
                  <Merge className="w-4 h-4" />
                  <span className="hidden ml-2 sm:inline">Juntar</span>
                </Button>

                <Button variant="outline" type="button" size="sm" disabled={isLoading} onClick={() => handleOperation("rotacionar")}>
                  <RotateCw className="w-4 h-4" />
                  <span className="hidden ml-2 sm:inline">Rotacionar</span>
                </Button>

                <Button variant="outline" type="button" size="sm" disabled={isLoading} onClick={() => handleOperation("comprimir")}>
                  <Compress className="w-4 h-4" />
                  <span className="hidden ml-2 sm:inline">Comprimir</span>
                </Button>

                <Button variant="outline" type="button" size="sm" disabled={isLoading} onClick={() => handleOperation("proteger")}>
                  <Lock className="w-4 h-4" />
                  <span className="hidden ml-2 sm:inline">Proteger</span>
                </Button>
              </>
            )}

            {isImage && (
              <>
                <Button variant="outline" type="button" size="sm" disabled={isLoading} onClick={() => handleOperation("rotacionar")}>
                  <RotateCw className="w-4 h-4" />
                  <span className="hidden ml-2 sm:inline">Rotacionar</span>
                </Button>

                <Button variant="outline" type="button" size="sm" disabled={isLoading} onClick={() => handleOperation("comprimir")}>
                  <Compress className="w-4 h-4" />
                  <span className="hidden ml-2 sm:inline">Comprimir</span>
                </Button>
              </>
            )}

            {!isPDF && !isImage && (
              <div className="text-sm text-muted-foreground">Operações não disponíveis para este tipo de arquivo</div>
            )}
          </div>
        </div>

        {/* Preview Area */}
        <div className="flex flex-col flex-1 min-w-0">
          {/* Zoom Controls */}
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="sm"
                type="button"
                onClick={() => setZoom(Math.max(25, zoom - 25))}
                disabled={zoom <= 25}
              >
                <ZoomOut className="w-4 h-4" />
              </Button>
              <span className="w-16 text-sm font-medium text-center">{zoom}%</span>
              <Button
                variant="outline"
                size="sm"
                type="button"
                onClick={() => setZoom(Math.min(200, zoom + 25))}
                disabled={zoom >= 200}
              >
                <ZoomIn className="w-4 h-4" />
              </Button>
            </div>
            <Button variant="outline" type="button" size="sm" onClick={handleDownload}>
              <Download className="w-4 h-4 mr-2" />
              Download
            </Button>
          </div>

          {/* Preview Content */}
          <ScrollArea className="flex-1 border rounded-lg">
            <div className="flex justify-center p-4">
              {previewUrl && (
                <div style={{ transform: `scale(${zoom / 100})`, transformOrigin: "top center" }}>
                  {isImage ? (
                    <img
                      src={previewUrl || "/placeholder.svg"}
                      alt={fileName}
                      className="h-auto max-w-full rounded shadow-lg"
                    />
                  ) : isPDF ? (
                    <iframe
                      src={`${previewUrl}#toolbar=0`}
                      className="w-[800px] h-[1000px] border-0 shadow-lg rounded"
                      title={fileName}
                    />
                  ) : (
                    <div className="flex items-center justify-center rounded-lg h-96 bg-gray-50">
                      <div className="text-center">
                        <FileText className="w-16 h-16 mx-auto mb-4 text-gray-400" />
                        <p className="text-gray-600">Pré-visualização não disponível para este tipo de arquivo</p>
                        <p className="mt-2 text-sm text-gray-500">Clique em Download para baixar o arquivo</p>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          </ScrollArea>
        </div>
      </DialogContent>
    </Dialog>
  )
}
