import Link from "next/link";
import { WaitlistForm } from "@/components/forms/waitlist-form";
import { Button } from "@/components/ui/button";
import { applicationName } from "@/config";
import { env } from "@/env";

export default async function Home() {
  return (
    <div className="font-sans flex flex-col items-center justify-center min-h-screen p-8 gap-8">
      <div className="flex flex-col items-center gap-4 max-w-lg text-center">
        <h1 className="text-5xl font-bold tracking-tight">{applicationName}</h1>
        <p className="text-muted-foreground text-lg">
          We&apos;re building something new. Join the waitlist to get early access.
        </p>
      </div>
      {env.APP_MODE === "comingSoon" && <WaitlistForm />}
      {env.APP_MODE === "live" && (
        <Button asChild variant="outline">
          <Link href="/sign-in">Sign in</Link>
        </Button>
      )}
    </div>
  );
}
