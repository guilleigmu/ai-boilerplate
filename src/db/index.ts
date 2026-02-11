import { drizzle, type PostgresJsDatabase } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import { env } from "@/env";
import * as schema from "./schema";

declare global {
  var _db: PostgresJsDatabase<typeof schema> | undefined;
  var _pg: ReturnType<typeof postgres> | undefined;
}

function createClient() {
  const pg = postgres(env.DATABASE_URL);
  const db = drizzle(pg, { schema });
  return { pg, db };
}

// Reuse connections in development to survive hot reloads
const { pg, db } =
  env.NODE_ENV === "production"
    ? createClient()
    : (() => {
        if (!globalThis._pg || !globalThis._db) {
          const client = createClient();
          globalThis._pg = client.pg;
          globalThis._db = client.db;
        }
        return { pg: globalThis._pg, db: globalThis._db };
      })();

export { db, pg };
