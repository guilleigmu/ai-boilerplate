import "dotenv/config";

import { db, pg } from "@/db/index";
import { items } from "./schema";

async function seed() {
  console.log("🌱 Starting database seed...\n");

  const createdItems = await db
    .insert(items)
    .values([
      { task: "Set up project structure" },
      { task: "Configure database connection", isCompleted: true },
      { task: "Create API endpoints" },
      { task: "Write unit tests", isCompleted: true },
      { task: "Deploy to production" },
    ])
    .returning();

  console.log(`Inserted ${createdItems.length} items:`);
  console.log(createdItems);

  await pg.end();
  console.log("Seeding complete!");
}

seed().catch((error) => {
  console.error("Seeding failed:", error);
  process.exit(1);
});
