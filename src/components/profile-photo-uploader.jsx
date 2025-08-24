import { CircleUserRoundIcon, XIcon } from "lucide-react"
import { useEffect } from "react"
import { useFileUpload } from "@/hooks/use-file-upload"
import { Button } from "@/components/ui/button"

export default function PhotoUploader({ setValue }) {
  const [{ files }, { removeFile, openFileDialog, getInputProps }] =
    useFileUpload({
      accept: "image/*",
    })

  useEffect(() => {
    if (files.length > 0) {
      setValue("profile_photo_path", files[0].file)
    }
  }, [files, setValue])

  const previewUrl = files[0]?.preview || null
  const fileName = files[0]?.file.name || null

  return (
    <div className="flex flex-col items-center gap-2">
      <div className="relative inline-flex">
        <Button
          type="button"
          variant="outline"
          className="relative p-0 overflow-hidden rounded-full shadow-none size-26"
          onClick={openFileDialog}
          aria-label={previewUrl ? "Change image" : "Upload image"}>
          {previewUrl ? (
            <img
              className="object-cover size-full"
              src={previewUrl}
              alt="Preview of uploaded image"
              width={104}
              height={104}
              style={{ objectFit: "cover" }} />
          ) : (
            <div aria-hidden="true">
              <CircleUserRoundIcon className="size-4 opacity-60" />
            </div>
          )}
        </Button>
        {previewUrl && (
          <Button
            onClick={() => removeFile(files[0]?.id)}
            size="icon"
            className="absolute border-2 rounded-full shadow-none border-background focus-visible:border-background -top-2 -right-2 size-6"
            aria-label="Remove image">
            <XIcon className="size-3.5" />
          </Button>
        )}
        <input
          {...getInputProps()}
          name="profile_photo_path"
          className="sr-only"
          aria-label="Upload image file"
          tabIndex={-1} />
      </div>
      {fileName && <p className="text-xs text-muted-foreground">{fileName}</p>}
    </div>
  );
}
