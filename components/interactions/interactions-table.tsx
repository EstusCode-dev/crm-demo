"use client"

import { useState } from "react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Plus, MoreHorizontal, Search, Phone, Mail, Calendar } from "lucide-react"
import { InteractionForm } from "@/components/interactions/interaction-form"
import { mockInteractions } from "@/lib/mock-data"
import { format } from "date-fns"
import { es } from "date-fns/locale"

export function InteractionsTable() {
  const [interactions, setInteractions] = useState(mockInteractions)
  const [searchTerm, setSearchTerm] = useState("")
  const [isAddInteractionOpen, setIsAddInteractionOpen] = useState(false)

  const filteredInteractions = interactions.filter(
    (interaction) =>
      interaction.client.toLowerCase().includes(searchTerm.toLowerCase()) ||
      interaction.type.toLowerCase().includes(searchTerm.toLowerCase()) ||
      interaction.notes.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const handleAddInteraction = (newInteraction) => {
    setInteractions([
      ...interactions,
      {
        id: interactions.length + 1,
        ...newInteraction,
        date: new Date().toISOString(),
      },
    ])
    setIsAddInteractionOpen(false)
  }

  const getInteractionIcon = (type) => {
    switch (type) {
      case "Llamada":
        return <Phone className="h-4 w-4 text-blue-500" />
      case "Email":
        return <Mail className="h-4 w-4 text-green-500" />
      case "Reunión":
        return <Calendar className="h-4 w-4 text-purple-500" />
      default:
        return null
    }
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <h2 className="text-xl font-bold">Interacciones</h2>
          <div className="relative w-64">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Buscar interacciones..."
              className="pl-8"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>
        <Dialog open={isAddInteractionOpen} onOpenChange={setIsAddInteractionOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Nueva Interacción
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Registrar Nueva Interacción</DialogTitle>
              <DialogDescription>Registra una nueva interacción con un cliente.</DialogDescription>
            </DialogHeader>
            <InteractionForm onSubmit={handleAddInteraction} onCancel={() => setIsAddInteractionOpen(false)} />
          </DialogContent>
        </Dialog>
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Fecha</TableHead>
              <TableHead>Cliente</TableHead>
              <TableHead>Tipo</TableHead>
              <TableHead>Notas</TableHead>
              <TableHead>Usuario</TableHead>
              <TableHead className="text-right">Acciones</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredInteractions.length === 0 ? (
              <TableRow>
                <TableCell colSpan={6} className="h-24 text-center">
                  No se encontraron interacciones.
                </TableCell>
              </TableRow>
            ) : (
              filteredInteractions.map((interaction) => (
                <TableRow key={interaction.id}>
                  <TableCell>{format(new Date(interaction.date), "dd MMM yyyy", { locale: es })}</TableCell>
                  <TableCell className="font-medium">{interaction.client}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      {getInteractionIcon(interaction.type)}
                      {interaction.type}
                    </div>
                  </TableCell>
                  <TableCell className="max-w-xs truncate">{interaction.notes}</TableCell>
                  <TableCell>{interaction.user}</TableCell>
                  <TableCell className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0">
                          <span className="sr-only">Abrir menú</span>
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Acciones</DropdownMenuLabel>
                        <DropdownMenuItem>Ver detalles</DropdownMenuItem>
                        <DropdownMenuItem>Editar interacción</DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem>Crear recordatorio</DropdownMenuItem>
                        <DropdownMenuItem>Crear oportunidad</DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem className="text-red-600">Eliminar</DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}

