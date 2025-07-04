"use client"

import * as React from "react"
import { Bell, Check, FileText, MessageSquare, Users } from "lucide-react"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"

// Exemplos de notificações
const notifications = [
  {
    id: 1,
    type: "document",
    icon: FileText,
    title: "Novo documento compartilhado",
    message: "João Silva compartilhou o documento 'Relatório Mensal' com você",
    time: "2 min atrás",
    read: false,
  },
  {
    id: 2,
    type: "user",
    icon: Users,
    title: "Novo usuário adicionado",
    message: "Maria Santos foi adicionada à organização TechCorp",
    time: "15 min atrás",
    read: false,
  },
  {
    id: 3,
    type: "message",
    icon: MessageSquare,
    title: "Nova mensagem",
    message: "Carlos Oliveira comentou no documento 'Projeto Alpha'",
    time: "1 hora atrás",
    read: true,
  },
  {
    id: 4,
    type: "document",
    icon: FileText,
    title: "Documento aprovado",
    message: "O documento 'Proposta Comercial' foi aprovado pela diretoria",
    time: "2 horas atrás",
    read: true,
  },
  {
    id: 5,
    type: "user",
    icon: Users,
    title: "Permissões atualizadas",
    message: "Suas permissões na área 'Financeiro' foram atualizadas",
    time: "1 dia atrás",
    read: true,
  },
  {
    id: 6,
    type: "document",
    icon: FileText,
    title: "Documento expirado",
    message: "O documento 'Contrato de Serviços' expira em 3 dias",
    time: "2 dias atrás",
    read: false,
  },
]

export function NotificationsPanel() {
  const [open, setOpen] = React.useState(false)
  const unreadCount = notifications.filter((n) => !n.read).length

  const markAsRead = (id) => {
    // Aqui você implementaria a lógica para marcar como lida
    console.log("Marcar como lida:", id)
  }

  const markAllAsRead = () => {
    // Aqui você implementaria a lógica para marcar todas como lidas
    console.log("Marcar todas como lidas")
  }

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="relative h-8 w-8">
          <Bell className="h-4 w-4" />
        </Button>
      </SheetTrigger>
      <SheetContent className="w-80 sm:w-96 md:pt-5">
        <SheetHeader>
          <div className="flex items-center justify-between">
            <SheetTitle>Notificações</SheetTitle>
            {unreadCount > 0 && (
              <Button variant="ghost" size="sm" onClick={markAllAsRead}>
                Marcar todas como lidas
              </Button>
            )}
          </div>
        </SheetHeader>
        <ScrollArea className="h-full mt-6">
          <div className="space-y-4 px-3">
            {notifications.map((notification) => (
              <div
                key={notification.id}
                className={`flex gap-3 p-3 rounded-lg border ${!notification.read ? "bg-muted/50 border-primary/20" : "bg-background"
                  }`}>
                <div className="flex-shrink-0">
                  <div
                    className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10">
                    <notification.icon className="h-4 w-4 text-primary" />
                  </div>
                </div>
                <div className="flex-1 space-y-1">
                  <div className="flex items-start justify-between">
                    <p className="text-sm font-medium">{notification.title}</p>
                    {!notification.read && (
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-6 w-6"
                        onClick={() => markAsRead(notification.id)}>
                        <Check className="h-3 w-3" />
                      </Button>
                    )}
                  </div>
                  <p className="text-sm text-muted-foreground">{notification.message}</p>
                  <p className="text-xs text-muted-foreground">{notification.time}</p>
                </div>
              </div>
            ))}
          </div>
        </ScrollArea>
      </SheetContent>
    </Sheet>
  );
}
