// components/FilePreviewModal.jsx
import { Dialog } from "@headlessui/react";
import { X } from "lucide-react";
import { useEffect, useState } from "react";
import { Document, Page, pdfjs } from "react-pdf";

pdfjs.GlobalWorkerOptions.workerSrc = `https://unpkg.com/pdfjs-dist@3.11.174/build/pdf.worker.min.js`;

export default function FilePreviewModal({ file, onClose }) {
  const [url, setUrl] = useState(null);

  useEffect(() => {
    if (file?.file instanceof File) {
      const objectUrl = URL.createObjectURL(file.file);
      setUrl(objectUrl);
      return () => URL.revokeObjectURL(objectUrl);
    } else if (file?.file?.url) {
      setUrl(file.file.url);
    }
  }, [file]);

  if (!file) return null;

  const type = file.file.type;

  return (
    <Dialog open={!!file} onClose={onClose} className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <Dialog.Panel className="relative bg-white rounded-lg shadow-xl max-w-4xl w-full max-h-[90vh] overflow-auto p-4">
        <button onClick={onClose} className="absolute text-gray-500 top-3 right-3 hover:text-black">
          <X className="w-5 h-5" />
        </button>

        <Dialog.Title className="mb-4 text-lg font-semibold">
          Previsualização de: {file.file.name}
        </Dialog.Title>

        {type === "application/pdf" ? (
          <Document file={url}>
            <Page pageNumber={1} width={700} />
          </Document>
        ) : type.startsWith("image/") ? (
          <img src={url} alt="preview" className="h-auto max-w-full rounded-lg" />
        ) : (
          <p className="text-sm text-gray-500">Preview não disponível para este tipo de ficheiro.</p>
        )}
      </Dialog.Panel>
    </Dialog>
  );
}
