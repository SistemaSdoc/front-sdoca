import { 
  BarChart3Icon, 
  HelpCircleIcon, 
  ShieldCheckIcon, 
  FileTextIcon, 
  UsersIcon, 
  SettingsIcon 
} from "lucide-react"

export const navigationLinks = [
  { href: "/", label: "Home" },
  {
    label: "Documentos",
    submenu: true,
    type: "icon",
    items: [
      {
        href: "/",
        label: "Gestão Documental",
        icon: FileTextIcon,
        description: "Sistema completo para organização e controle de documentos empresariais."
      },
      {
        href: "/docs",
        label: "Meus Documentos",
        icon: FileTextIcon,
        description: "Visualize e gerencie seus documentos pessoais com controle de versão."
      },
      {
        href: "/docs/installation",
        label: "Documentos Compartilhados",
        icon: UsersIcon,
        description: "Acesse documentos compartilhados pela equipe com permissões específicas."
      },
      {
        href: "/docs/primitives/typography",
        label: "Arquivo Morto",
        icon: SettingsIcon,
        description: "Documentos arquivados e histórico completo de alterações."
      }
    ]
  },
  {
    label: "Workflows",
    submenu: true,
    type: "description",
    items: [
      {
        href: "/docs/primitives/alert-dialog",
        label: "Aprovações Pendentes",
        description: "Gerencie processos que aguardam sua aprovação ou revisão."
      },
      {
        href: "/docs/primitives/hover-card",
        label: "Processos Ativos",
        description: "Acompanhe workflows em andamento e seus status atuais."
      },
      {
        href: "/docs/primitives/progress",
        label: "Histórico de Workflows",
        description: "Consulte o histórico completo de todos os processos executados."
      },
      {
        href: "/docs/primitives/scroll-area",
        label: "Criar Workflow",
        description: "Configure novos fluxos de trabalho automatizados."
      }
    ]
  },
  {
    label: "Relatórios",
    submenu: true,
    type: "icon",
    items: [
      {
        href: "/docs/primitives/alert-dialog",
        label: "Relatórios de Uso",
        icon: BarChart3Icon,
        description: "Análise detalhada do uso do sistema e produtividade da equipe."
      },
      {
        href: "/docs/primitives/hover-card",
        label: "Auditoria",
        icon: ShieldCheckIcon,
        description: "Logs de segurança e rastreamento de todas as ações no sistema."
      },
      {
        href: "/docs/primitives/progress",
        label: "Ajuda",
        icon: HelpCircleIcon,
        description: "Central de ajuda, tutoriais e documentação do sistema."
      }
    ]
  }
]
