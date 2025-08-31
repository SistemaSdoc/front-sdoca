import { useAuth } from '@/context/AuthContext'
import { Loader2 } from 'lucide-react'


import { DashboardCards } from "@/components/dashboard-cards-v1"
import { PerformanceTable } from "@/components/performance-table"
import { DocumentosBarChart } from '@/components/charts/DocumentosBarChart'
import { TempoRespostaChart } from '@/components/charts/TempoRespostaChart'
import axios from 'axios'

async function cardData() {
  const cardData = await axios.get('/dashboard-data')
  console.log('dados dos cards: ', cardData)
}

export default function DashboardDemo() {
  const { loading } = useAuth()
  cardData()

  if (loading) return (
    <div className="fixed inset-0 flex items-center justify-center bg-white">
      <Loader2 className="w-8 h-8 text-gray-500 animate-spin" />
    </div>
  )
  return (
    <>
      <>
        {/* Cards de Estatísticas */}
        <DashboardCards />

        {/* Tabela de Desempenho */}
        <PerformanceTable />

        {/* Gráficos */}
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          <DocumentosBarChart />
          <TempoRespostaChart />
        </div>
      </>
    </>
  )
}
