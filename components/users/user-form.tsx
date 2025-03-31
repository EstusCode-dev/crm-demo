"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { DialogFooter } from "@/components/ui/dialog"
import { Checkbox } from "@/components/ui/checkbox"

interface UserFormProps {
  onSubmit: (user: any) => void
  onCancel: () => void
  initialData?: any
}

export function UserForm({ onSubmit, onCancel, initialData }: UserFormProps) {
  const [formData, setFormData] = useState({
    name: initialData?.name || "",
    email: initialData?.email || "",
    role: initialData?.role || "Usuario",
    status: initialData?.status || "Activo",
    permissions: {
      clients: initialData?.permissions?.clients || true,
      interactions: initialData?.permissions?.interactions || true,
      sales: initialData?.permissions?.sales || false,
      reminders: initialData?.permissions?.reminders || true,
      users: initialData?.permissions?.users || false,
    },
  })

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSelectChange = (name, value) => {
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handlePermissionChange = (permission, checked) => {
    setFormData((prev) => ({
      ...prev,
      permissions: {
        ...prev.permissions,
        [permission]: checked,
      },
    }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    onSubmit(formData)
  }

  return (
    <form onSubmit={handleSubmit}>
      <div className="grid gap-4 py-4">
        <div className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor="name" className="text-right">
            Nombre
          </Label>
          <Input id="name" name="name" value={formData.name} onChange={handleChange} className="col-span-3" required />
        </div>
        <div className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor="email" className="text-right">
            Email
          </Label>
          <Input
            id="email"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            className="col-span-3"
            required
          />
        </div>
        <div className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor="role" className="text-right">
            Rol
          </Label>
          <Select value={formData.role} onValueChange={(value) => handleSelectChange("role", value)}>
            <SelectTrigger className="col-span-3">
              <SelectValue placeholder="Seleccionar rol" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Administrador">Administrador</SelectItem>
              <SelectItem value="Gerente">Gerente</SelectItem>
              <SelectItem value="Usuario">Usuario</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor="status" className="text-right">
            Estado
          </Label>
          <Select value={formData.status} onValueChange={(value) => handleSelectChange("status", value)}>
            <SelectTrigger className="col-span-3">
              <SelectValue placeholder="Seleccionar estado" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Activo">Activo</SelectItem>
              <SelectItem value="Inactivo">Inactivo</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="grid grid-cols-4 items-start gap-4 pt-2">
          <Label className="text-right pt-2">Permisos</Label>
          <div className="col-span-3 space-y-2">
            <div className="flex items-center space-x-2">
              <Checkbox
                id="clients-permission"
                checked={formData.permissions.clients}
                onCheckedChange={(checked) => handlePermissionChange("clients", checked)}
              />
              <Label htmlFor="clients-permission">Gestión de Clientes</Label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox
                id="interactions-permission"
                checked={formData.permissions.interactions}
                onCheckedChange={(checked) => handlePermissionChange("interactions", checked)}
              />
              <Label htmlFor="interactions-permission">Registro de Interacciones</Label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox
                id="sales-permission"
                checked={formData.permissions.sales}
                onCheckedChange={(checked) => handlePermissionChange("sales", checked)}
              />
              <Label htmlFor="sales-permission">Pipeline de Ventas</Label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox
                id="reminders-permission"
                checked={formData.permissions.reminders}
                onCheckedChange={(checked) => handlePermissionChange("reminders", checked)}
              />
              <Label htmlFor="reminders-permission">Recordatorios</Label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox
                id="users-permission"
                checked={formData.permissions.users}
                onCheckedChange={(checked) => handlePermissionChange("users", checked)}
              />
              <Label htmlFor="users-permission">Gestión de Usuarios</Label>
            </div>
          </div>
        </div>
      </div>
      <DialogFooter>
        <Button type="button" variant="outline" onClick={onCancel}>
          Cancelar
        </Button>
        <Button type="submit">Guardar</Button>
      </DialogFooter>
    </form>
  )
}

