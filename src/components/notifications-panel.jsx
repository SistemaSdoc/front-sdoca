"use client"

import * as React from "react"
import { Bell, Check, CheckCheck, Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"

import { useNotificacoes, useUpdateNotificacao } from "@/hooks/useNotificationsHooks"

export function NotificationsPanel() {
  const [open, setOpen] = React.useState(false)
  const { notificacoes = [], isLoading } = useNotificacoes()
  const updateNotificacao = useUpdateNotificacao()

  const unreadCount = notificacoes.filter(n => !n.read).length

  function markAsRead(id) {
    updateNotificacao.mutate({ id })
  }

  function markAllAsRead() {
    notificacoes.forEach(n => {
      if (!n.read) markAsRead(n.id)
    })
  }

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="relative w-8 h-8">
          <Bell className="w-4 h-4" />
          {unreadCount > 0 && (
            <span className="absolute w-1 h-1 bg-red-500 rounded-full top-1 right-2" />
          )}
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
          <div className="flex flex-col px-3 space-y-4">
            {isLoading && (
              <div className="flex items-center justify-center w-full py-20">
                <Loader2 className="w-6 h-6 animate-spin" />
              </div>
            )}
            
            {!isLoading && notificacoes.length === 0 && (
              <div className="flex flex-col items-center justify-center w-full gap-2 py-20 text-sm text-muted-foreground">
                <Bell />
                Nenhuma notificação no momento
              </div>
            )}
            
            {!isLoading && notificacoes.map(notification => (
              <div
                key={notification.id}
                className={`flex gap-3 p-4 rounded-lg  ${!notification.read ? "bg-muted/50" : "bg-background"}`}>
                <div className="flex-1 space-y-1">
                  <div className="flex items-start justify-between">
                    <p className="text-sm font-medium">{notification.titulo}</p>
                    
                    {!notification.read && (
                      <Button
                        title='Marcar como lida'
                        variant="ghost"
                        size="icon"
                        className="w-6 h-6"
                        onClick={() => markAsRead(notification.id)}
                      >
                        <CheckCheck className="w-3 h-3" />
                      </Button>
                    )}
                  </div>
                  
                  <p className="text-sm text-muted-foreground">{notification.mensagem}</p>
                  <p className="text-xs text-muted-foreground">{notification.created_at}</p>
                </div>
              </div>
            ))}
          </div>
        </ScrollArea>
      </SheetContent>
    </Sheet>
  )
}
