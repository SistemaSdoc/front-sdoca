import { useState } from "react"
import {
  AlertCircleIcon,
  FileArchiveIcon,
  FileIcon,
  FileSpreadsheetIcon,
  FileText,
  FileTextIcon,
  HeadphonesIcon,
  ImageIcon,
  Trash2Icon,
  UploadIcon,
  VideoIcon,
  XIcon,
} from "lucide-react"

import { formatBytes, useFileUpload } from "@/hooks/use-file-upload";
import { Button } from "@/components/ui/button"

// Create some dummy initial files
const initialFiles = [
  {
    name: "intro.zip",
    size: 252873,
    type: "application/zip",
    url: "https://example.com/intro.zip",
    id: "intro.zip-1744638436563-8u5xuls",
  },
  {
    name: "image-01.jpg",
    size: 1528737,
    type: "image/jpeg",
    url: "https://picsum.photos/1000/800?grayscale&random=1",
    id: "image-01-123456789",
  },
  {
    name: "audio.mp3",
    size: 1528737,
    type: "audio/mpeg",
    url: "https://example.com/audio.mp3",
    id: "audio-123456789",
  },
]

const getFileIcon = (file) => {
  const fileType = file.file instanceof File ? file.file.type : file.file.type
  const fileName = file.file instanceof File ? file.file.name : file.file.name

  const iconMap = {
    pdf: {
      icon: FileTextIcon,
      conditions: (type, name) =>
        type.includes("pdf") ||
        name.endsWith(".pdf") ||
        type.includes("word") ||
        name.endsWith(".doc") ||
        name.endsWith(".docx"),
    },
    archive: {
      icon: FileArchiveIcon,
      conditions: (type, name) =>
        type.includes("zip") ||
        type.includes("archive") ||
        name.endsWith(".zip") ||
        name.endsWith(".rar"),
    },
    excel: {
      icon: FileSpreadsheetIcon,
      conditions: (type, name) =>
        type.includes("excel") ||
        name.endsWith(".xls") ||
        name.endsWith(".xlsx"),
    },
    video: {
      icon: VideoIcon,
      conditions: (type) => type.includes("video/"),
    },
    audio: {
      icon: HeadphonesIcon,
      conditions: (type) => type.includes("audio/"),
    },
    image: {
      icon: ImageIcon,
      conditions: (type) => type.startsWith("image/"),
    },
  }

  for (const { icon: Icon, conditions } of Object.values(iconMap)) {
    if (conditions(fileType, fileName)) {
      return <Icon className="size-5 opacity-60" />;
    }
  }

  return <FileIcon className="size-5 opacity-60" />;
}

const getFilePreview = (file) => {
  const fileType = file.file instanceof File ? file.file.type : file.file.type
  const fileName = file.file instanceof File ? file.file.name : file.file.name

  const renderImage = (src) => (
    <img
      src={src}
      alt={fileName}
      className="size-full rounded-t-[inherit] object-cover" />
  )

  return (
    <div
      className="bg-accent flex aspect-square items-center justify-center overflow-hidden rounded-t-[inherit]">
      {fileType.startsWith("image/") ? (
        file.file instanceof File ? (
          (() => {
            const previewUrl = URL.createObjectURL(file.file)
            return renderImage(previewUrl);
          })()
        ) : file.file.url ? (
          renderImage(file.file.url)
        ) : (
          <ImageIcon className="size-5 opacity-60" />
        )
      ) : (
        getFileIcon(file)
      )}
    </div>
  );
}

// Function to simulate file upload with more realistic timing and progress
const simulateUpload = (
  totalBytes,
  onProgress,
  onComplete
) => {
  let timeoutId
  let uploadedBytes = 0
  let lastProgressReport = 0

  const simulateChunk = () => {
    // Simulate variable network conditions with random chunk sizes
    const chunkSize = Math.floor(Math.random() * 300000) + 2000
    uploadedBytes = Math.min(totalBytes, uploadedBytes + chunkSize)

    // Calculate progress percentage (0-100)
    const progressPercent = Math.floor((uploadedBytes / totalBytes) * 100)

    // Only report progress if it's changed by at least 1%
    if (progressPercent > lastProgressReport) {
      lastProgressReport = progressPercent
      onProgress(progressPercent)
    }

    // Continue simulation if not complete
    if (uploadedBytes < totalBytes) {
      // Variable delay between 50ms and 500ms to simulate network fluctuations (reduced for faster uploads)
      const delay = Math.floor(Math.random() * 450) + 50

      // Occasionally add a longer pause to simulate network congestion (5% chance, shorter duration)
      const extraDelay = Math.random() < 0.05 ? 500 : 0

      timeoutId = setTimeout(simulateChunk, delay + extraDelay)
    } else {
      // Upload complete
      onComplete()
    }
  }

  // Start the simulation
  timeoutId = setTimeout(simulateChunk, 100)

  // Return a cleanup function to cancel the simulation
  return () => {
    if (timeoutId) {
      clearTimeout(timeoutId)
    }
  };
}

export default function DocumentUploader() {
  const maxSizeMB = 5
  const maxSize = maxSizeMB * 1024 * 1024 // 5MB default
  const maxFiles = 6

  // State to track upload progress for each file
  const [uploadProgress, setUploadProgress] = useState([])

  // Function to handle newly added files
  const handleFilesAdded = (addedFiles) => {
    // Initialize progress tracking for each new file
    const newProgressItems = addedFiles.map((file) => ({
      fileId: file.id,
      progress: 0,
      completed: false,
    }))

    // Add new progress items to state
    setUploadProgress((prev) => [...prev, ...newProgressItems])

    // Store cleanup functions
    const cleanupFunctions = []

    // Start simulated upload for each file
    addedFiles.forEach((file) => {
      const fileSize =
        file.file instanceof File ? file.file.size : file.file.size

      // Start the upload simulation and store the cleanup function
      const cleanup = simulateUpload(fileSize, // Progress callback
      (progress) => {
        setUploadProgress((prev) =>
          prev.map((item) =>
            item.fileId === file.id ? { ...item, progress } : item))
      }, // Complete callback
      () => {
        setUploadProgress((prev) =>
          prev.map((item) =>
            item.fileId === file.id ? { ...item, completed: true } : item))
      })

      cleanupFunctions.push(cleanup)
    })

    // Return a cleanup function that cancels all animations
    return () => {
      cleanupFunctions.forEach((cleanup) => cleanup())
    };
  }

  // Remove the progress tracking for the file
  const handleFileRemoved = (fileId) => {
    setUploadProgress((prev) => prev.filter((item) => item.fileId !== fileId))
  }

  const [
    { files, isDragging, errors },
    {
      handleDragEnter,
      handleDragLeave,
      handleDragOver,
      handleDrop,
      openFileDialog,
      removeFile,
      clearFiles,
      getInputProps,
    },
  ] = useFileUpload({
    multiple: true,
    maxFiles,
    maxSize,
    initialFiles,
    onFilesAdded: handleFilesAdded,
  })

  return (
    <div className="flex flex-col gap-2">
      {/* Drop area */}
      <div
        onDragEnter={handleDragEnter}
        onDragLeave={handleDragLeave}
        onDragOver={handleDragOver}
        onDrop={handleDrop}
        data-dragging={isDragging || undefined}
        data-files={files.length > 0 || undefined}
        className="border-input data-[dragging=true]:bg-accent/50 has-[input:focus]:border-ring has-[input:focus]:ring-ring/50 relative flex min-h-52 flex-col items-center overflow-hidden rounded-xl border border-dashed p-4 transition-colors not-data-[files]:justify-center has-[input:focus]:ring-[3px]">
        <input {...getInputProps()} className="sr-only" aria-label="Upload image file" />
        {files.length > 0 ? (
          <div className="flex flex-col w-full gap-3">
            <div className="flex items-center justify-between gap-2">
              <h3 className="text-sm font-medium truncate">
                Ficheiros ({files.length})
              </h3>
              <div className="flex gap-2">
                <Button variant="outline" type="button" size="sm" onClick={openFileDialog}>
                  <UploadIcon className="-ms-0.5 size-3.5 opacity-60" aria-hidden="true" />
                  Adicionar ficheiros
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  type="button"
                  onClick={() => {
                    // Clear all progress tracking
                    setUploadProgress([])
                    clearFiles()
                  }}>
                  <Trash2Icon className="-ms-0.5 size-3.5 opacity-60" aria-hidden="true" />
                  Remover tudo
                </Button>
              </div>
            </div>

            <div className="w-full space-y-2">
              {files.map((file) => {
                // Find the upload progress for this file once to avoid repeated lookups
                const fileProgress = uploadProgress.find((p) => p.fileId === file.id)
                const isUploading = fileProgress && !fileProgress.completed

                return (
                  <div
                    key={file.id}
                    data-uploading={isUploading || undefined}
                    className="flex flex-col gap-1 p-2 transition-opacity duration-300 border rounded-lg bg-background pe-3">
                    <div className="flex items-center justify-between gap-2">
                      <div
                        className="flex items-center gap-3 overflow-hidden in-data-[uploading=true]:opacity-50">
                        <div
                          className="flex items-center justify-center border rounded aspect-square size-10 shrink-0">
                          {getFileIcon(file)}
                        </div>
                        <div className="flex min-w-0 flex-col gap-0.5">
                          <p className="truncate text-[13px] font-medium">
                            {file.file instanceof File
                              ? file.file.name
                              : file.file.name}
                          </p>
                          <p className="text-xs text-muted-foreground">
                            {formatBytes(file.file instanceof File
                              ? file.file.size
                              : file.file.size)}
                          </p>
                        </div>
                      </div>
                      <Button
                        size="icon"
                        variant="ghost"
                        type="button"
                        className="text-muted-foreground/80 hover:text-foreground -me-2 size-8 hover:bg-transparent"
                        onClick={() => {
                          handleFileRemoved(file.id)
                          removeFile(file.id)
                        }}
                        aria-label="Remove file">
                        <XIcon className="size-4" aria-hidden="true" />
                      </Button>
                    </div>
                    {/* Upload progress bar */}
                    {fileProgress &&
                      (() => {
                        const progress = fileProgress.progress || 0
                        const completed = fileProgress.completed || false

                        if (completed) return null

                        return (
                          <div className="flex items-center gap-2 mt-1">
                            <div className="h-1.5 w-full overflow-hidden rounded-full bg-gray-100">
                              <div
                                className="h-full transition-all duration-300 ease-out bg-primary"
                                style={{ width: `${progress}%` }} />
                            </div>
                            <span className="w-10 text-xs text-muted-foreground tabular-nums">
                              {progress}%
                            </span>
                          </div>
                        );
                      })()}
                  </div>
                );
              })}
            </div>
          </div>
        ) : (
          <div
            className="flex flex-col items-center justify-center px-4 py-3 text-center">
            <div
              className="flex items-center justify-center mb-2 border rounded-full bg-background size-11 shrink-0"
              aria-hidden="true">
              <FileText className="size-4 opacity-60" />
            </div>
            <p className="mb-1.5 text-sm font-medium">Arraste seus ficheiros aqui</p>
            <p className="text-xs text-muted-foreground">
              No Máximo {maxFiles} ficheiros ∙ Até {maxSizeMB}MB
            </p>
            <Button variant="outline" type="button" className="mt-4" onClick={openFileDialog}>
              <UploadIcon className="-ms-1 opacity-60" aria-hidden="true" />
              Selecionar ficheiros
            </Button>
          </div>
        )}
      </div>
      {errors.length > 0 && (
        <div className="flex items-center gap-1 text-xs text-destructive" role="alert">
          <AlertCircleIcon className="size-3 shrink-0" />
          <span>{errors[0]}</span>
        </div>
      )}
    </div>
  );
}
