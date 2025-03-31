"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Plus, Clock, Check, X } from "lucide-react"
import { ReminderForm } from "@/components/reminders/reminder-form"
import { mockReminders } from "@/lib/mock-data"
import { format, isSameDay } from "date-fns"
import { es } from "date-fns/locale"

export function RemindersPanel() {
  const [reminders, setReminders] = useState(mockReminders)
  const [date, setDate] = useState(new Date())
  const [isAddReminderOpen, setIsAddReminderOpen] = useState(false)

  const handleAddReminder = (newReminder) => {
    setReminders([
      ...reminders,
      {
        id: reminders.length + 1,
        ...newReminder,
        completed: false,
      },
    ])
    setIsAddReminderOpen(false)
  }

  const toggleReminderStatus = (id) => {
    setReminders(
      reminders.map((reminder) => (reminder.id === id ? { ...reminder, completed: !reminder.completed } : reminder)),
    )
  }

  const deleteReminder = (id) => {
    setReminders(reminders.filter((reminder) => reminder.id !== id))
  }

  const todayReminders = reminders.filter((reminder) => isSameDay(new Date(reminder.date), new Date()))

  const upcomingReminders = reminders.filter(
    (reminder) => new Date(reminder.date) > new Date() && !isSameDay(new Date(reminder.date), new Date()),
  )

  const selectedDateReminders = reminders.filter((reminder) => isSameDay(new Date(reminder.date), date))

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold">Recordatorios</h2>
        <Dialog open={isAddReminderOpen} onOpenChange={setIsAddReminderOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Nuevo Recordatorio
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Crear Nuevo Recordatorio</DialogTitle>
              <DialogDescription>Programa un nuevo recordatorio para seguimiento.</DialogDescription>
            </DialogHeader>
            <ReminderForm onSubmit={handleAddReminder} onCancel={() => setIsAddReminderOpen(false)} />
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="md:col-span-2">
          <Tabs defaultValue="today" className="space-y-4">
            <TabsList>
              <TabsTrigger value="today">Hoy</TabsTrigger>
              <TabsTrigger value="upcoming">Próximos</TabsTrigger>
              <TabsTrigger value="calendar">Calendario</TabsTrigger>
            </TabsList>

            <TabsContent value="today" className="space-y-4">
              {todayReminders.length === 0 ? (
                <Card>
                  <CardContent className="pt-6 text-center text-muted-foreground">
                    No hay recordatorios para hoy.
                  </CardContent>
                </Card>
              ) : (
                todayReminders.map((reminder) => (
                  <ReminderCard
                    key={reminder.id}
                    reminder={reminder}
                    onToggle={toggleReminderStatus}
                    onDelete={deleteReminder}
                  />
                ))
              )}
            </TabsContent>

            <TabsContent value="upcoming" className="space-y-4">
              {upcomingReminders.length === 0 ? (
                <Card>
                  <CardContent className="pt-6 text-center text-muted-foreground">
                    No hay recordatorios próximos.
                  </CardContent>
                </Card>
              ) : (
                upcomingReminders.map((reminder) => (
                  <ReminderCard
                    key={reminder.id}
                    reminder={reminder}
                    onToggle={toggleReminderStatus}
                    onDelete={deleteReminder}
                  />
                ))
              )}
            </TabsContent>

            <TabsContent value="calendar" className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Card>
                  <CardContent className="pt-6">
                    <Calendar mode="single" selected={date} onSelect={setDate} className="mx-auto" locale={es} />
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">{format(date, "d 'de' MMMM, yyyy", { locale: es })}</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-2">
                    {selectedDateReminders.length === 0 ? (
                      <p className="text-center text-muted-foreground">No hay recordatorios para esta fecha.</p>
                    ) : (
                      selectedDateReminders.map((reminder) => (
                        <div key={reminder.id} className="flex items-center justify-between p-2 border rounded-md">
                          <div className="flex items-center gap-2">
                            <Clock className="h-4 w-4 text-muted-foreground" />
                            <span className={reminder.completed ? "line-through text-muted-foreground" : ""}>
                              {reminder.title}
                            </span>
                          </div>
                          <div className="flex gap-1">
                            <Button
                              variant="ghost"
                              size="sm"
                              className="h-6 w-6 p-0"
                              onClick={() => toggleReminderStatus(reminder.id)}
                            >
                              <Check className="h-4 w-4" />
                            </Button>
                            <Button
                              variant="ghost"
                              size="sm"
                              className="h-6 w-6 p-0 text-red-500"
                              onClick={() => deleteReminder(reminder.id)}
                            >
                              <X className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                      ))
                    )}
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          </Tabs>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Estadísticas</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span>Recordatorios para hoy:</span>
                <span className="font-bold">{todayReminders.length}</span>
              </div>
              <div className="flex justify-between items-center">
                <span>Recordatorios próximos:</span>
                <span className="font-bold">{upcomingReminders.length}</span>
              </div>
              <div className="flex justify-between items-center">
                <span>Recordatorios completados:</span>
                <span className="font-bold">{reminders.filter((r) => r.completed).length}</span>
              </div>
              <div className="flex justify-between items-center">
                <span>Total de recordatorios:</span>
                <span className="font-bold">{reminders.length}</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

function ReminderCard({ reminder, onToggle, onDelete }) {
  return (
    <Card>
      <CardContent className="p-4">
        <div className="flex items-start justify-between">
          <div className="space-y-1">
            <h3 className={`font-medium ${reminder.completed ? "line-through text-muted-foreground" : ""}`}>
              {reminder.title}
            </h3>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Clock className="h-3 w-3" />
              <span>{format(new Date(reminder.date), "d MMM yyyy, HH:mm", { locale: es })}</span>
            </div>
            {reminder.client && <p className="text-sm">Cliente: {reminder.client}</p>}
            {reminder.notes && <p className="text-sm mt-2">{reminder.notes}</p>}
          </div>
          <div className="flex gap-1">
            <Button
              variant={reminder.completed ? "outline" : "default"}
              size="sm"
              onClick={() => onToggle(reminder.id)}
            >
              {reminder.completed ? "Reabrir" : "Completar"}
            </Button>
            <Button variant="ghost" size="sm" className="text-red-500" onClick={() => onDelete(reminder.id)}>
              <X className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

