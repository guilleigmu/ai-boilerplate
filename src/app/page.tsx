import { applicationName } from "@/config";
import { WaitlistForm } from "./waitlist-form";

export default function Home() {
  return (
    <div className="font-sans flex flex-col items-center justify-center min-h-screen p-8 gap-8">
      <div className="flex flex-col items-center gap-4 max-w-lg text-center">
        <h1 className="text-5xl font-bold tracking-tight">{applicationName}</h1>
        <p className="text-muted-foreground text-lg">
          We&apos;re building something new. Join the waitlist to get early
          access.
        </p>
      </div>
      <WaitlistForm />
    </div>
  );
}
