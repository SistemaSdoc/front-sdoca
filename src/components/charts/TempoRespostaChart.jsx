import { Bar } from "react-chartjs-2";
import { tempoRespostaData, tempoRespostaOptions } from "./options/tempo-resposta";

export function TempoRespostaChart() {
  return (
    <div className="p-4 bg-white border border-gray-200 rounded-md">
      <p className="mb-2 text-sm text-gray-600">Tempo de Resposta por Área</p>
      <div className="relative h-[300px]">
        <Bar
          data={tempoRespostaData}
          options={{ ...tempoRespostaOptions, }}
          key={JSON.stringify(tempoRespostaData)}
        />
      </div>
    </div>
  );
}
