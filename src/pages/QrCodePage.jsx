import { useQrCodeData } from "@/hooks/QRcodeHooks";

export default function QrCodePage() {
  const { data, isLoading } = useQrCodeData();

  if (isLoading) return <p>Carregando...</p>;

  if (data) {
    return (
      <div className="p-4">
        <h1 className="text-xl font-bold mb-4">Dados do Documento</h1>
        <p><strong>Código:</strong> {data.codigo_documento}</p>
        <p><strong>Título:</strong> {data.titulo_doc}</p>
        <p><strong>Descrição:</strong> {data.descricao_doc}</p>
        {/* adiciona outros campos que quiser exibir */}
      </div>
    );
  }

}
