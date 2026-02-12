import { redirect } from "next/navigation";
import { env } from "@/env";

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  if (env.APP_MODE !== "live") {
    redirect("/");
  }

  return (
    <div className="flex min-h-svh items-center justify-center bg-muted p-6 md:p-10">
      <div className="w-full max-w-sm">{children}</div>
    </div>
  );
}
