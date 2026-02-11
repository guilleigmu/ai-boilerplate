import { createEnv } from "@t3-oss/env-nextjs";
import { z } from "zod";
import { appMode } from "./config";

export const env = createEnv({
  server: {
    NODE_ENV: z
      .enum(["development", "test", "production"])
      .default("development"),
    DATABASE_URL: appMode === "comingSoon" ? z.url().optional() : z.url(),
    RESEND_API_KEY: z.string(),
  },
  client: {},
  runtimeEnv: {
    NODE_ENV: process.env.NODE_ENV,
    DATABASE_URL: process.env.DATABASE_URL,
    RESEND_API_KEY: process.env.RESEND_API_KEY,
  },
});
