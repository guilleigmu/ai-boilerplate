import { redirect } from "next/navigation";
import { env } from "@/env";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  if (env.APP_MODE !== "live") {
    redirect("/");
  }

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b">
        <div className="container mx-auto px-4 py-4">
          <h1 className="text-xl font-semibold">Dashboard</h1>
        </div>
      </header>
      <main className="container mx-auto px-4 py-8">{children}</main>
    </div>
  );
}
