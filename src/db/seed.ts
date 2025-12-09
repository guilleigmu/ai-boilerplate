import "dotenv/config";

import { db, pg } from "@/db/index";
import { items } from "@/db/schema";

async function main() {
  console.log("Seeding database...\n");

  const itemsData = [
    { name: "First Item", description: "This is the first example item" },
    { name: "Second Item", description: "Another item for demonstration" },
    { name: "Third Item", description: null },
  ];

  const createdItems = await db.insert(items).values(itemsData).returning();

  console.log(`Created ${createdItems.length} items\n`);
  console.log("Seed completed successfully!");

  await pg.end();
}

main();
