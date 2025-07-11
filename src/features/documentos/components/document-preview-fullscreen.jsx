"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
  DropdownMenuLabel,
} from "@/components/ui/dropdown-menu"
import {
  X,
  Download,
  ZoomIn,
  ZoomOut,
  RotateCw,
  RotateCcw,
  Maximize2,
  Minimize2,
  ChevronLeft,
  ChevronRight,
  FileText,
  ImageIcon,
  Scissors,
  Merge,
  FileArchiveIcon as Compress,
  Lock,
  Unlock,
  Copy,
  Trash2,
  Settings,
  Share2,
  Printer,
  Info,
  Loader2,
} from "lucide-react"
import { toast } from "sonner"

export function DocumentPreviewFullscreen({ isOpen, onClose, file, allFiles = [], currentIndex = 0, onNavigate }) {
  const [zoom, setZoom] = useState(100)
  const [isFullscreen, setIsFullscreen] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [previewUrl, setPreviewUrl] = useState(null)

  // Estados para dialogs de operações
  const [showSplitDialog, setShowSplitDialog] = useState(false)
  const [showMergeDialog, setShowMergeDialog] = useState(false)
  const [showProtectDialog, setShowProtectDialog] = useState(false)
  const [splitPages, setSplitPages] = useState("")
  const [password, setPassword] = useState("")

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

  // Bloquear scroll da página quando modal estiver aberto
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden"
      document.documentElement.style.overflow = "hidden"
    } else {
      document.body.style.overflow = ""
      document.documentElement.style.overflow = ""
    }

    return () => {
      document.body.style.overflow = ""
      document.documentElement.style.overflow = ""
    }
  }, [isOpen])

  // Controle de teclado
  useEffect(() => {
    if (!isOpen) return

    const handleKeyPress = (e) => {
      switch (e.key) {
        case "Escape":
          onClose()
          break
        case "ArrowLeft":
          if (currentIndex > 0) onNavigate?.(currentIndex - 1)
          break
        case "ArrowRight":
          if (currentIndex < allFiles.length - 1) onNavigate?.(currentIndex + 1)
          break
        case "+":
        case "=":
          setZoom((prev) => Math.min(300, prev + 25))
          break
        case "-":
          setZoom((prev) => Math.max(25, prev - 25))
          break
        case "0":
          setZoom(100)
          break
      }
    }

    document.addEventListener("keydown", handleKeyPress)
    return () => document.removeEventListener("keydown", handleKeyPress)
  }, [isOpen, currentIndex, allFiles.length, onNavigate, onClose])

  if (!isOpen || !file) return null

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

  const handleOperation = async (operation, options = {}) => {
    setIsLoading(true)

    try {
      // Simular operação
      await new Promise((resolve) => setTimeout(resolve, 2000))

      toast.success(`Operação "${operation}" executada com sucesso!`)
      console.log(`Executando operação: ${operation}`, { file: fileName, options })

      // Aqui você faria a chamada real para o backend
    } catch (error) {
      toast.error(`Erro ao executar "${operation}": ${error.message}`)
    } finally {
      setIsLoading(false)
    }
  }

  const handleSplit = () => {
    if (!splitPages.trim()) {
      toast.error("Por favor, informe as páginas para separar")
      return
    }

    handleOperation("split", { pages: splitPages })
    setShowSplitDialog(false)
    setSplitPages("")
  }

  const handleMerge = () => {
    handleOperation("merge", { files: allFiles.map((f) => f.id) })
    setShowMergeDialog(false)
  }

  const handleProtect = () => {
    if (!password.trim()) {
      toast.error("Por favor, informe uma senha")
      return
    }

    handleOperation("protect", { password })
    setShowProtectDialog(false)
    setPassword("")
  }

  const handleDownload = () => {
    if (previewUrl) {
      const link = document.createElement("a")
      link.href = previewUrl
      link.download = fileName
      link.click()
    }
  }

  const toggleFullscreen = () => {
    setIsFullscreen(!isFullscreen)
  }

  const zoomLevels = [25, 50, 75, 100, 125, 150, 200, 300]

  return (
    <>
      {/* Overlay de fundo */}
      <div className={`fixed inset-0 z-50 ${isOpen ? "block" : "hidden"}`}>
        {/* Header/Toolbar */}
        <div className="relative z-10 flex items-center justify-between p-4 bg-white border-b shadow-sm">
          {/* Left Section - Navigation & File Info */}
          <div className="flex items-center gap-4">
            <Button type="button" variant="ghost" size="icon" onClick={onClose} title="Fechar (Esc)">
              <X className="w-5 h-5" />
            </Button>

            {allFiles.length > 1 && (
              <div className="flex items-center gap-2">
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  onClick={() => onNavigate?.(currentIndex - 1)}
                  disabled={currentIndex === 0}
                  title="Arquivo anterior (←)"
                >
                  <ChevronLeft className="w-5 h-5" />
                </Button>

                <span className="text-sm text-muted-foreground">
                  {currentIndex + 1} de {allFiles.length}
                </span>

                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  onClick={() => onNavigate?.(currentIndex + 1)}
                  disabled={currentIndex === allFiles.length - 1}
                  title="Próximo arquivo (→)"
                >
                  <ChevronRight className="w-5 h-5" />
                </Button>
              </div>
            )}

            <Separator orientation="vertical" className="h-6" />

            <div className="flex items-center gap-3">
              {isPDF ? (
                <FileText className="w-5 h-5 text-red-500" />
              ) : isImage ? (
                <ImageIcon className="w-5 h-5 text-blue-500" />
              ) : (
                <FileText className="w-5 h-5 text-gray-500" />
              )}

              <div>
                <h1 className="max-w-md text-lg font-medium truncate" title={fileName}>
                  {fileName}
                </h1>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Badge variant="outline">{formatFileSize(fileSize)}</Badge>
                  <Badge variant="secondary">{fileType.split("/")[1]?.toUpperCase()}</Badge>
                </div>
              </div>
            </div>
          </div>

          {/* Center Section - Operations */}
          <div className="flex items-center gap-2">
            {/* Operações PDF */}
            {isPDF && (
              <>
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  disabled={isLoading}
                  onClick={() => setShowSplitDialog(true)}
                >
                  <Scissors className="w-4 h-4 mr-2" />
                  Dividir
                </Button>

                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  disabled={isLoading}
                  onClick={() => setShowMergeDialog(true)}
                >
                  <Merge className="w-4 h-4 mr-2" />
                  Juntar
                </Button>

                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button type="button" variant="outline" size="sm" disabled={isLoading}>
                      <RotateCw className="w-4 h-4 mr-2" />
                      Rotacionar
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent>
                    <DropdownMenuItem onClick={() => handleOperation("rotate_right")}>
                      <RotateCw className="w-4 h-4 mr-2" />
                      90° para direita
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => handleOperation("rotate_left")}>
                      <RotateCcw className="w-4 h-4 mr-2" />
                      90° para esquerda
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => handleOperation("rotate_180")}>
                      <RotateCw className="w-4 h-4 mr-2" />
                      180°
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </>
            )}

            {/* Operações Imagem */}
            {isImage && (
              <Button
                type="button"
                variant="outline"
                size="sm"
                disabled={isLoading}
                onClick={() => handleOperation("rotate_right")}
              >
                <RotateCw className="w-4 h-4 mr-2" />
                Rotacionar
              </Button>
            )}

            {/* Operações Gerais */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button type="button" variant="outline" size="sm" disabled={isLoading}>
                  <Settings className="w-4 h-4 mr-2" />
                  Mais
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <DropdownMenuLabel>Operações Avançadas</DropdownMenuLabel>

                {isPDF && (
                  <>
                    <DropdownMenuItem onClick={() => handleOperation("compress")}>
                      <Compress className="w-4 h-4 mr-2" />
                      Comprimir PDF
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => setShowProtectDialog(true)}>
                      <Lock className="w-4 h-4 mr-2" />
                      Proteger com senha
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => handleOperation("unlock")}>
                      <Unlock className="w-4 h-4 mr-2" />
                      Remover proteção
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                  </>
                )}

                <DropdownMenuItem onClick={() => handleOperation("duplicate")}>
                  <Copy className="w-4 h-4 mr-2" />
                  Duplicar arquivo
                </DropdownMenuItem>

                <DropdownMenuItem onClick={() => handleOperation("share")}>
                  <Share2 className="w-4 h-4 mr-2" />
                  Compartilhar
                </DropdownMenuItem>

                <DropdownMenuItem onClick={() => handleOperation("print")}>
                  <Printer className="w-4 h-4 mr-2" />
                  Imprimir
                </DropdownMenuItem>

                <DropdownMenuSeparator />

                <DropdownMenuItem onClick={() => handleOperation("delete")} className="text-red-600">
                  <Trash2 className="w-4 h-4 mr-2" />
                  Excluir arquivo
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

          {/* Right Section - View Controls */}
          <div className="flex items-center gap-2">
            {/* Zoom Controls */}
            <div className="flex items-center gap-1 p-1 border rounded-lg">
              <Button
                type="button"
                variant="ghost"
                size="icon"
                className="w-8 h-8"
                onClick={() => setZoom(Math.max(25, zoom - 25))}
                disabled={zoom <= 25}
                title="Diminuir zoom (-)"
              >
                <ZoomOut className="w-4 h-4" />
              </Button>

              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button type="button" variant="ghost" className="h-8 px-3 text-sm min-w-16">
                    {zoom}%
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  {zoomLevels.map((level) => (
                    <DropdownMenuItem
                      key={level}
                      onClick={() => setZoom(level)}
                      className={zoom === level ? "bg-accent" : ""}
                    >
                      {level}%
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>

              <Button
                type="button"
                variant="ghost"
                size="icon"
                className="w-8 h-8"
                onClick={() => setZoom(Math.min(300, zoom + 25))}
                disabled={zoom >= 300}
                title="Aumentar zoom (+)"
              >
                <ZoomIn className="w-4 h-4" />
              </Button>
            </div>

            <Separator orientation="vertical" className="h-6" />

            <Button
              type="button"
              variant="ghost"
              size="icon"
              onClick={toggleFullscreen}
              title={isFullscreen ? "Sair tela cheia" : "Tela cheia"}
            >
              {isFullscreen ? <Minimize2 className="w-5 h-5" /> : <Maximize2 className="w-5 h-5" />}
            </Button>

            <Button type="button" variant="outline" size="sm" onClick={handleDownload}>
              <Download className="w-4 h-4 mr-2" />
              Download
            </Button>
          </div>
        </div>

        {/* Main Preview Area - Fundo cinza claro como Chrome */}
        <div className="relative h-[calc(100vh-80px)] bg-gray-200 overflow-hidden">
          <div className="h-full overflow-auto">
            <div className="flex items-start justify-center min-h-full p-8">
              {previewUrl && (
                <div className="flex justify-center">
                  {isImage ? (
                    <img
                      src={previewUrl || "/placeholder.svg"}
                      alt={fileName}
                      className="shadow-lg"
                      style={{
                        transform: `scale(${zoom / 100})`,
                        transformOrigin: "center top",
                        transition: "transform 0.2s ease-in-out",
                        maxWidth: "none",
                        height: "auto",
                      }}
                    />
                  ) : isPDF ? (
                    <div
                      style={{
                        transform: `scale(${zoom / 100})`,
                        transformOrigin: "center top",
                        transition: "transform 0.2s ease-in-out",
                      }}
                    >
                      <iframe
                        src={`${previewUrl}#toolbar=0&navpanes=0&scrollbar=1`}
                        className="shadow-lg"
                        style={{
                          width: "210mm",
                          height: "297mm",
                          border: "none",
                          backgroundColor: "white",
                        }}
                        title={fileName}
                      />
                    </div>
                  ) : (
                    <div className="flex items-center justify-center max-w-md p-16 bg-white rounded-lg shadow-lg">
                      <div className="text-center">
                        <FileText className="w-24 h-24 mx-auto mb-6 text-gray-400" />
                        <h3 className="mb-2 text-xl font-medium text-gray-900">Pré-visualização não disponível</h3>
                        <p className="mb-6 text-gray-600">
                          Este tipo de arquivo não pode ser visualizado no navegador.
                        </p>
                        <div className="space-y-3">
                          <Button type="button" onClick={handleDownload} className="w-full">
                            <Download className="w-4 h-4 mr-2" />
                            Baixar arquivo
                          </Button>
                          <div className="text-sm text-gray-500">
                            <div className="flex items-center justify-center gap-2">
                              <Info className="w-4 h-4" />
                              <span>
                                {fileName} • {formatFileSize(fileSize)}
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Footer Info */}
        <div className="absolute bottom-0 left-0 right-0 flex items-center justify-between px-4 py-2 text-xs bg-white border-t text-muted-foreground">
          <div className="flex items-center gap-4">
            <span>Use as setas ← → para navegar</span>
            <span>ESC para fechar</span>
            <span>+ - para zoom</span>
          </div>
          <div className="flex items-center gap-2">
            <Info className="w-3 h-3" />
            <span>
              Arquivo {currentIndex + 1} de {allFiles.length}
            </span>
          </div>
        </div>

        {/* Loading Overlay - SEM fundo branco no topo */}
        {isLoading && (
          <div className="absolute inset-0 z-20 flex items-center justify-center bg-black/30">
            <div className="flex items-center gap-3 p-6 bg-white rounded-lg shadow-lg">
              <Loader2 className="w-6 h-6 text-gray-600 animate-spin" />
              <span className="text-lg text-gray-800">Processando...</span>
            </div>
          </div>
        )}
      </div>

      {/* Dialog para Dividir PDF */}
      <Dialog open={showSplitDialog} onOpenChange={setShowSplitDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Dividir PDF</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <Label htmlFor="split-pages">Páginas para separar</Label>
              <Input
                id="split-pages"
                placeholder="Ex: 1-3, 5, 7-10"
                value={splitPages}
                onChange={(e) => setSplitPages(e.target.value)}
              />
              <p className="mt-1 text-sm text-muted-foreground">
                Use vírgulas para separar páginas individuais ou hífens para intervalos
              </p>
            </div>
          </div>
          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => setShowSplitDialog(false)}>
              Cancelar
            </Button>
            <Button type="button" onClick={handleSplit}>
              Dividir PDF
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Dialog para Juntar PDFs */}
      <Dialog open={showMergeDialog} onOpenChange={setShowMergeDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Juntar PDFs</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <p>Deseja juntar todos os arquivos PDF selecionados?</p>
            <div className="text-sm text-muted-foreground">
              Arquivos que serão unidos: {allFiles.filter((f) => f.file.type?.includes("pdf")).length} PDFs
            </div>
          </div>
          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => setShowMergeDialog(false)}>
              Cancelar
            </Button>
            <Button type="button" onClick={handleMerge}>
              Juntar PDFs
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Dialog para Proteger PDF */}
      <Dialog open={showProtectDialog} onOpenChange={setShowProtectDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Proteger PDF com Senha</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <Label htmlFor="password">Senha</Label>
              <Input
                id="password"
                type="password"
                placeholder="Digite a senha"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </div>
          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => setShowProtectDialog(false)}>
              Cancelar
            </Button>
            <Button type="button" onClick={handleProtect}>
              Proteger PDF
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  )
}
