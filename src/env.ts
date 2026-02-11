import { createEnv } from "@t3-oss/env-nextjs";
import { z } from "zod";

const appModeSchema = z.enum(["comingSoon", "maintenance", "live"]).default("comingSoon");
const appMode = process.env.APP_MODE as z.infer<typeof appModeSchema>;

const databaseUrlSchema =
  process.env.NODE_ENV === "production" && appMode === "comingSoon"
    ? z.url().optional().default("")
    : z.url();

export const env = createEnv({
  server: {
    NODE_ENV: z.enum(["development", "test", "production"]).default("development"),
    APP_MODE: appModeSchema,
    DATABASE_URL: databaseUrlSchema,
    // RESEND_API_KEY: z.string(),
  },
  client: {},
  runtimeEnv: {
    NODE_ENV: process.env.NODE_ENV,
    APP_MODE: process.env.APP_MODE,
    DATABASE_URL: process.env.DATABASE_URL,
    // RESEND_API_KEY: process.env.RESEND_API_KEY,
  },
});
