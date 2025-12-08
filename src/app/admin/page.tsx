import { UserIcon } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { getRegistrationsCount } from "@/data-access/registrations";

export default async function HomePage() {
  const totalAlumnxs = await getRegistrationsCount();

  return (
    <div className="flex flex-col gap-8">
      <div className="flex items-center justify-between min-h-9">
        <h2 className="text-2xl font-bold">Inicio</h2>
      </div>

      <Card className="from-muted/50 to-background bg-linear-to-b from-50%">
        <CardHeader>
          <CardTitle>Estadísticas de la escuela</CardTitle>
          <CardDescription>
            Vista general del rendimiento de la escuela
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-3">
            <Card className="gap-0">
              <CardHeader>
                <UserIcon className="size-8" />
              </CardHeader>
              <CardContent className="flex flex-col items-end">
                <p className="text-sm text-muted-foreground">
                  Total de Alumnxs
                </p>
                <p className="text-3xl font-bold">{totalAlumnxs}</p>
              </CardContent>
            </Card>
          </div>
        </CardContent>
      </Card>

      {/* <div className="grid gap-4 md:grid-cols-2">
        <div className="rounded-lg border border-gray-200 bg-muted/50 p-6 dark:border-gray-800">
          <h3 className="mb-2 text-lg font-semibold">Acceso Rápido</h3>
          <div className="space-y-2">
            <a
              href="/admin/alumnxs"
              className="block rounded-md p-3 transition-colors hover:bg-accent"
            >
              <p className="font-medium">Registros</p>
              <p className="text-sm text-muted-foreground">
                Ver y gestionar registros de clientes
              </p>
            </a>
            <a
              href="/admin/bonos"
              className="block rounded-md p-3 transition-colors hover:bg-accent"
            >
              <p className="font-medium">Bonos</p>
              <p className="text-sm text-muted-foreground">
                Gestionar bonos de clientes
              </p>
            </a>
          </div>
        </div>

        <div className="rounded-lg border border-gray-200 bg-muted/50 p-6 dark:border-gray-800">
          <h3 className="mb-2 text-lg font-semibold">Actividad Reciente</h3>
          <div className="space-y-3 text-sm">
            <div className="flex items-center justify-between rounded-md p-2 hover:bg-accent">
              <span className="text-muted-foreground">Nuevo registro</span>
              <span className="font-medium">Hace 2 horas</span>
            </div>
            <div className="flex items-center justify-between rounded-md p-2 hover:bg-accent">
              <span className="text-muted-foreground">Bono canjeado</span>
              <span className="font-medium">Hace 5 horas</span>
            </div>
            <div className="flex items-center justify-between rounded-md p-2 hover:bg-accent">
              <span className="text-muted-foreground">Nueva invitación</span>
              <span className="font-medium">Ayer</span>
            </div>
          </div>
        </div>
      </div> */}
    </div>
  );
}
