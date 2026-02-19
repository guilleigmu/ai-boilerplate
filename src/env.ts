import { createEnv } from "@t3-oss/env-nextjs";
import { z } from "zod";

export const env = createEnv({
  server: {
    NODE_ENV: z.enum(["development", "test", "production"]).default("development"),
    APP_MODE: z.enum(["comingSoon", "maintenance", "live"]).default("comingSoon"),
    DATABASE_URL: z.url(),
    BETTER_AUTH_SECRET: z.string().optional(),
    // RESEND_API_KEY: z.string(),
  },
  client: {
    NEXT_PUBLIC_APP_URL: z.url().optional().default("http://localhost:3000"),
  },
  runtimeEnv: {
    NODE_ENV: process.env.NODE_ENV,
    APP_MODE: process.env.APP_MODE,
    DATABASE_URL: process.env.DATABASE_URL,
    BETTER_AUTH_SECRET: process.env.BETTER_AUTH_SECRET,
    NEXT_PUBLIC_APP_URL: process.env.NEXT_PUBLIC_APP_URL,
    // RESEND_API_KEY: process.env.RESEND_API_KEY,
  },
});
