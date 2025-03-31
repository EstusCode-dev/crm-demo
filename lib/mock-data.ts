// Datos de clientes de ejemplo
export const mockClients = [
  {
    id: 1,
    name: "Juan Pérez",
    company: "Tecnología Innovadora S.A.",
    email: "juan.perez@tecinnova.com",
    phone: "+34 612 345 678",
    status: "Activo",
  },
  {
    id: 2,
    name: "María González",
    company: "Consultores Asociados",
    email: "maria.gonzalez@consultores.com",
    phone: "+34 623 456 789",
    status: "Activo",
  },
  {
    id: 3,
    name: "Carlos Rodríguez",
    company: "Distribuciones Rápidas",
    email: "carlos.rodriguez@distribuciones.com",
    phone: "+34 634 567 890",
    status: "Inactivo",
  },
  {
    id: 4,
    name: "Ana Martínez",
    company: "Soluciones Digitales",
    email: "ana.martinez@soluciones.com",
    phone: "+34 645 678 901",
    status: "Potencial",
  },
  {
    id: 5,
    name: "Roberto Fernández",
    company: "Manufacturas del Este",
    email: "roberto.fernandez@manufacturas.com",
    phone: "+34 656 789 012",
    status: "Activo",
  },
]

// Datos de interacciones de ejemplo
export const mockInteractions = [
  {
    id: 1,
    client: "Juan Pérez",
    type: "Llamada",
    date: "2023-06-15T10:30:00.000Z",
    notes: "Llamada de seguimiento sobre la propuesta enviada. Interesado en el paquete premium.",
    user: "Admin",
  },
  {
    id: 2,
    client: "María González",
    type: "Email",
    date: "2023-06-14T14:45:00.000Z",
    notes:
      "Envío de información adicional sobre servicios de consultoría. Solicita una reunión para la próxima semana.",
    user: "Admin",
  },
  {
    id: 3,
    client: "Carlos Rodríguez",
    type: "Reunión",
    date: "2023-06-12T09:00:00.000Z",
    notes: "Reunión inicial para presentar servicios. Mostró interés en la solución logística.",
    user: "Admin",
  },
  {
    id: 4,
    client: "Ana Martínez",
    type: "Llamada",
    date: "2023-06-10T16:15:00.000Z",
    notes: "Llamada para resolver dudas sobre el presupuesto enviado. Solicita un descuento del 10%.",
    user: "Admin",
  },
  {
    id: 5,
    client: "Roberto Fernández",
    type: "Email",
    date: "2023-06-08T11:20:00.000Z",
    notes: "Confirmación de recepción de contrato firmado. Inicio de proyecto programado para el próximo mes.",
    user: "Admin",
  },
]

// Datos de pipeline de ventas de ejemplo
export const mockPipeline = [
  {
    id: "stage-1",
    name: "Prospección",
    deals: [
      {
        id: "deal-1",
        title: "Implementación CRM",
        client: "Ana Martínez",
        value: 5000,
        stage: "Prospección",
      },
      {
        id: "deal-2",
        title: "Consultoría Estratégica",
        client: "Carlos Rodríguez",
        value: 3500,
        stage: "Prospección",
      },
    ],
  },
  {
    id: "stage-2",
    name: "Propuesta",
    deals: [
      {
        id: "deal-3",
        title: "Desarrollo Web",
        client: "Juan Pérez",
        value: 8000,
        stage: "Propuesta",
      },
      {
        id: "deal-4",
        title: "Campaña Marketing",
        client: "María González",
        value: 4500,
        stage: "Propuesta",
      },
    ],
  },
  {
    id: "stage-3",
    name: "Negociación",
    deals: [
      {
        id: "deal-5",
        title: "Servicio Mantenimiento",
        client: "Roberto Fernández",
        value: 12000,
        stage: "Negociación",
      },
    ],
  },
  {
    id: "stage-4",
    name: "Cerrado",
    deals: [
      {
        id: "deal-6",
        title: "Licencias Software",
        client: "Juan Pérez",
        value: 6500,
        stage: "Cerrado",
      },
    ],
  },
]

// Datos de recordatorios de ejemplo
export const mockReminders = [
  {
    id: 1,
    title: "Llamar a Juan Pérez",
    date: new Date().toISOString(), // Hoy
    client: "Juan Pérez",
    notes: "Seguimiento de la propuesta enviada",
    completed: false,
  },
  {
    id: 2,
    title: "Enviar presupuesto actualizado",
    date: new Date().toISOString(), // Hoy
    client: "María González",
    notes: "Incluir descuento del 5% como acordado",
    completed: true,
  },
  {
    id: 3,
    title: "Reunión de presentación",
    date: new Date(new Date().setDate(new Date().getDate() + 2)).toISOString(), // En 2 días
    client: "Carlos Rodríguez",
    notes: "Preparar demo del producto",
    completed: false,
  },
  {
    id: 4,
    title: "Seguimiento de contrato",
    date: new Date(new Date().setDate(new Date().getDate() + 5)).toISOString(), // En 5 días
    client: "Ana Martínez",
    notes: "Verificar si ya firmaron el contrato",
    completed: false,
  },
  {
    id: 5,
    title: "Revisar propuesta técnica",
    date: new Date(new Date().setDate(new Date().getDate() + 7)).toISOString(), // En 7 días
    client: "Roberto Fernández",
    notes: "Actualizar especificaciones según feedback",
    completed: false,
  },
]

// Datos de usuarios de ejemplo
export const mockUsers = [
  {
    id: 1,
    name: "Admin",
    email: "admin@empresa.com",
    role: "Administrador",
    status: "Activo",
    permissions: {
      clients: true,
      interactions: true,
      sales: true,
      reminders: true,
      users: true,
    },
  },
  {
    id: 2,
    name: "Laura Sánchez",
    email: "laura.sanchez@empresa.com",
    role: "Gerente",
    status: "Activo",
    permissions: {
      clients: true,
      interactions: true,
      sales: true,
      reminders: true,
      users: false,
    },
  },
  {
    id: 3,
    name: "Miguel Torres",
    email: "miguel.torres@empresa.com",
    role: "Usuario",
    status: "Activo",
    permissions: {
      clients: true,
      interactions: true,
      sales: false,
      reminders: true,
      users: false,
    },
  },
  {
    id: 4,
    name: "Elena Navarro",
    email: "elena.navarro@empresa.com",
    role: "Usuario",
    status: "Inactivo",
    permissions: {
      clients: true,
      interactions: true,
      sales: false,
      reminders: true,
      users: false,
    },
  },
]

