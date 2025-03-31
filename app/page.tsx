import { redirect } from "next/navigation"
import { DashboardPage } from "@/components/dashboard/dashboard-page"

export default function Home() {
  // En una aplicación real, verificaríamos la autenticación aquí
  // Si el usuario no está autenticado, redirigir a login
  // const isAuthenticated = checkAuth();
  const isAuthenticated = true

  if (!isAuthenticated) {
    redirect("/login")
  }

  return <DashboardPage />
}

