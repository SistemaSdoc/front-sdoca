import { Card } from "@/components/CardSwap";
import { CardContent, CardHeader } from "@/components/ui/card";
import { useQrCodeData } from "@/hooks/QRcodeHooks";
import { Badge, CalendarDays, Check, Clock1, FileText, User, CreditCard } from "lucide-react";
import { Separator } from "@/components/ui/separator";

export default function QrCodePage() {
  const { data } = useQrCodeData();


  if (data) {

    return (
      <div className="min-h-screen bg-background">
        {/* Header */}
        <div className="border-b bg-card/50 backdrop-blur-sm">
          <div className="container px-4 py-6 mx-auto">
            <div className="space-y-2 text-center">
              <h1 className="text-2xl font-semibold text-foreground">Consulta de Documento</h1>
              <p className="text-sm text-muted-foreground">Status e informações do seu documento</p>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="container max-w-2xl px-4 py-8 mx-auto">
          <div className="space-y-6">
            {/* Status Card */}
            <Card className="border-0 shadow-sm">
              <CardHeader className="pb-4 text-center">
                <div className="flex flex-col items-center space-y-4">
                  <div className="p-3 rounded-full bg-primary/10">
                    {data.status_tramitacao === '5' ? <Check /> : <Clock1 />}
                  </div>
                  <div className="space-y-2">
                    <Badge >{data.status_tramitacao === '5' ? 'Pendente' : 'Finalizado'}</Badge>
                    <p className="max-w-sm text-sm text-muted-foreground">{data.descricao_tramitacao}</p>
                  </div>
                </div>
              </CardHeader>
            </Card>

            {/* Document Info */}
            <Card className="border-0 shadow-sm">
              <CardHeader>
                <div className="flex items-center space-x-2">
                  <FileText className="w-5 h-5 text-primary" />
                  <h2 className="text-lg font-medium">Informações do Documento</h2>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid gap-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">Tipo</span>
                    <span className="text-sm font-medium">{data.tipo_documento}</span>
                  </div>
                  <Separator />
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">Nº Processo</span>
                    <span className="font-mono text-sm">{data.codigo_documento}</span>
                  </div>
                  <Separator />
                  <div className="flex items-center justify-between">
                    <span className="flex items-center gap-1 text-sm text-muted-foreground">
                      <CalendarDays className="w-3 h-3" />
                      Data Solicitação
                    </span>
                    <span className="text-sm font-medium">
                      {new Date(data.created_at).toLocaleDateString("pt-PT")}
                    </span>
                  </div>
                  <Separator />
                  <div className="flex items-center justify-between">
                    <span className="flex items-center gap-1 text-sm text-muted-foreground">
                      <CalendarDays className="w-3 h-3" />
                      Data Emissão
                    </span>
                    <span className="text-sm font-medium">
                      {new Date(data.created_at).toLocaleDateString("pt-PT")}
                    </span>
                  </div>
                  <Separator />
                  <div className="flex items-center justify-between">
                    <span className="flex items-center gap-1 text-sm text-muted-foreground">
                      <CalendarDays className="w-3 h-3" />
                      Data Validade
                    </span>
                    <span className="text-sm font-medium">
                      {new Date(data.created_at).toLocaleDateString("pt-PT")}
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* User Info */}
            <Card className="border-0 shadow-sm">
              <CardHeader>
                <div className="flex items-center space-x-2">
                  <User className="w-5 h-5 text-primary" />
                  <h2 className="text-lg font-medium">Dados do Utente</h2>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid gap-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">Nome Completo</span>
                    <span className="text-sm font-medium">{data.nome}</span>
                  </div>
                  <Separator />
                  <div className="flex items-center justify-between">
                    <span className="flex items-center gap-1 text-sm text-muted-foreground">
                      <CreditCard className="w-3 h-3" />
                      Nº Bilhete Identidade
                    </span>
                    <span className="font-mono text-sm">{data.n_bi}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Footer */}
          <div className="mt-12 text-center">
            <p className="text-xs text-muted-foreground">Para questões ou suporte, contacte os nossos serviços</p>
          </div>
        </div>
      </div>
    )
    /*     return (
          <div className="flex p-4 ">
            <h1 className="mb-4 text-xl font-bold">Dados do Documento</h1>
            <p><strong>Código:</strong> {data.codigo_documento}</p>
            <p><strong>Título:</strong> {data.titulo_doc}</p>
            <p><strong>Descrição:</strong> {data.descricao_doc}</p>
          </div>
        ); */
  }

}
