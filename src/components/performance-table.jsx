import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { TrendingUp, TrendingDown, Minus } from "lucide-react"

export function PerformanceTable() {
  const performanceData = [
    {
      area: "Recursos Humanos",
      totalDocs: 342,
      pendentes: 12,
      processados: 330,
      tempoMedio: "2.3 dias",
      eficiencia: 96.5,
      tendencia: "up",
    },
    {
      area: "Financeiro",
      totalDocs: 567,
      pendentes: 23,
      processados: 544,
      tempoMedio: "1.8 dias",
      eficiencia: 95.9,
      tendencia: "up",
    },
    {
      area: "Jurídico",
      totalDocs: 189,
      pendentes: 8,
      processados: 181,
      tempoMedio: "4.2 dias",
      eficiencia: 95.8,
      tendencia: "down",
    },
    {
      area: "Compras",
      totalDocs: 423,
      pendentes: 31,
      processados: 392,
      tempoMedio: "3.1 dias",
      eficiencia: 92.7,
      tendencia: "stable",
    },
    {
      area: "TI",
      totalDocs: 156,
      pendentes: 5,
      processados: 151,
      tempoMedio: "1.5 dias",
      eficiencia: 96.8,
      tendencia: "up",
    },
    {
      area: "Marketing",
      totalDocs: 234,
      pendentes: 18,
      processados: 216,
      tempoMedio: "2.7 dias",
      eficiencia: 92.3,
      tendencia: "down",
    },
  ]

  const getTrendIcon = (trend) => {
    switch (trend) {
      case "up":
        return <TrendingUp className="w-4 h-4 text-green-500" />;
      case "down":
        return <TrendingDown className="w-4 h-4 text-red-500" />;
      default:
        return <Minus className="w-4 h-4 text-gray-500" />;
    }
  }

  const getEfficiencyBadge = (efficiency) => {
    if (efficiency >= 95) {
      return <Badge className="text-green-800 bg-green-100 hover:bg-green-100">Excelente</Badge>;
    } else if (efficiency >= 90) {
      return <Badge className="text-yellow-800 bg-yellow-100 hover:bg-yellow-100">Bom</Badge>;
    } else {
      return <Badge className="text-red-800 bg-red-100 hover:bg-red-100">Atenção</Badge>;
    }
  }

  return (
    <div
      className="p-6 mb-10 bg-white border rounded-md dark:bg-neutral-900 border-neutral-200 dark:border-neutral-800">
      <div className="mb-6">
        <h3
          className="mb-2 text-xl font-semibold text-neutral-900 dark:text-neutral-100">Desempenho por Área</h3>
        <p className="text-sm text-neutral-600 dark:text-neutral-400">
          Acompanhe o desempenho de cada área na tramitação de documentos
        </p>
      </div>
      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Área</TableHead>
              <TableHead className="text-center">Total Docs</TableHead>
              <TableHead className="text-center">Pendentes</TableHead>
              <TableHead className="text-center">Processados</TableHead>
              <TableHead className="text-center">Tempo Médio</TableHead>
              <TableHead className="text-center">Eficiência</TableHead>
              <TableHead className="text-center">Tendência</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {performanceData.map((area) => (
              <TableRow
                key={area.area}
                className="hover:bg-neutral-50 dark:hover:bg-neutral-800/50">
                <TableCell className="font-medium">{area.area}</TableCell>
                <TableCell className="text-center">{area.totalDocs}</TableCell>
                <TableCell className="text-center">
                  <span className={area.pendentes > 20 ? "text-red-600 font-medium" : ""}>{area.pendentes}</span>
                </TableCell>
                <TableCell className="text-center">{area.processados}</TableCell>
                <TableCell className="text-center">{area.tempoMedio}</TableCell>
                <TableCell className="text-center">
                  <div className="flex items-center justify-center gap-2">
                    <span className="font-medium">{area.eficiencia}%</span>
                    {getEfficiencyBadge(area.eficiencia)}
                  </div>
                </TableCell>
                <TableCell className="text-center">
                  <div className="flex justify-center">{getTrendIcon(area.tendencia)}</div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
