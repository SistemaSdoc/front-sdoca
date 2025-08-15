import { Link } from "react-router-dom"
import NavBarMenu from "../components/navbar"

export default function Landing() {
  return (
    <div className="min-h-screen">
      {/* Header (Navigation menu) */}
      <NavBarMenu />

      {/* Hero Container */}
      <div className="container px-4 py-16 mx-auto">
        <div className="p-12 text-center bg-white border-2 border-gray-300 border-dashed rounded-lg">
          <div className="max-w-3xl mx-auto">
            <h1 className="mb-6 text-4xl font-bold text-gray-900">Variação 1 - Layout Clássico</h1>
            <p className="mb-8 text-xl text-gray-600">
              Header limpo sem borda inferior, navegação com dropdowns estilo shadcn/ui com ícones e descrições
              detalhadas. Animações sutis para melhor experiência de navegação.
            </p>
            <div className="p-4 text-sm text-gray-500 rounded-lg bg-gray-50">
              <strong>Container preparado para o hero:</strong> Este espaço está pronto para receber o conteúdo
              principal da página. Você pode substituir este conteúdo pelo seu hero personalizado.
            </div>
          </div>
        </div>
      </div>

      {/* Content adicional */}
      <div className="container px-4 pb-16 mx-auto">
        <div className="mb-6">
          <Link
            href="/"
            className="inline-flex items-center gap-1 text-sm font-medium text-blue-600 hover:text-blue-800"
          >
            ← Voltar para todas as variações
          </Link>
        </div>

        <div className="p-6 bg-white border rounded-lg shadow-sm">
          <h2 className="mb-4 text-xl font-semibold text-gray-900">Características desta variação:</h2>
          <ul className="space-y-2 text-gray-600">
            <li>• Header sem borda inferior para visual mais limpo</li>
            <li>• Logo com ícone de documento e nome "DocFlow"</li>
            <li>• Navegação com dropdowns no estilo shadcn/ui</li>
            <li>• Ícones e descrições detalhadas nos menus</li>
            <li>• Animações sutis e não intrusivas</li>
            <li>• Container hero preparado com border</li>
            <li>• Design responsivo para mobile e desktop</li>
          </ul>
        </div>
      </div>
    </div>
  )
}
