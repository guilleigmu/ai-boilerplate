import { applicationName } from "@/config";

export default function Home() {
  return (
    <div className="font-sans flex flex-col items-center justify-center min-h-screen p-8 gap-6">
      <h1 className="text-4xl font-bold tracking-tight">
        Welcome to {applicationName}
      </h1>
      <p className="text-muted-foreground text-lg text-center max-w-md">
        Start building by editing{" "}
        <code className="bg-muted px-1.5 py-0.5 rounded text-sm font-mono">
          src/app/page.tsx
        </code>
      </p>
    </div>
  );
}
