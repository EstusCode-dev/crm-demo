"use client"

import { useState } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Overview } from "@/components/dashboard/overview"
import { ClientsTable } from "@/components/clients/clients-table"
import { InteractionsTable } from "@/components/interactions/interactions-table"
import { SalesPipeline } from "@/components/sales/sales-pipeline"
import { RemindersPanel } from "@/components/reminders/reminders-panel"
import { UserManagement } from "@/components/users/user-management"
import { DashboardHeader } from "@/components/dashboard/dashboard-header"
import { DashboardShell } from "@/components/dashboard/dashboard-shell"

export function DashboardPage() {
  const [activeTab, setActiveTab] = useState("overview")

  return (
    <DashboardShell>
      <DashboardHeader heading="CRM Dashboard" text="Gestiona tus clientes, ventas y actividades en un solo lugar." />
      <Tabs defaultValue="overview" className="space-y-4" onValueChange={setActiveTab}>
        <TabsList>
          <TabsTrigger value="overview">Resumen</TabsTrigger>
          <TabsTrigger value="clients">Clientes</TabsTrigger>
          <TabsTrigger value="interactions">Interacciones</TabsTrigger>
          <TabsTrigger value="sales">Pipeline de Ventas</TabsTrigger>
          <TabsTrigger value="reminders">Recordatorios</TabsTrigger>
          <TabsTrigger value="users">Usuarios</TabsTrigger>
        </TabsList>
        <TabsContent value="overview" className="space-y-4">
          <Overview />
        </TabsContent>
        <TabsContent value="clients" className="space-y-4">
          <ClientsTable />
        </TabsContent>
        <TabsContent value="interactions" className="space-y-4">
          <InteractionsTable />
        </TabsContent>
        <TabsContent value="sales" className="space-y-4">
          <SalesPipeline />
        </TabsContent>
        <TabsContent value="reminders" className="space-y-4">
          <RemindersPanel />
        </TabsContent>
        <TabsContent value="users" className="space-y-4">
          <UserManagement />
        </TabsContent>
      </Tabs>
    </DashboardShell>
  )
}

