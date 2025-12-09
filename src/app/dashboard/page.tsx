import { getItems } from "@/data-access/items";
import { CreateItemForm } from "./create-item-form";
import { ItemList } from "./item-list";

export default async function DashboardPage() {
  const items = await getItems();

  return (
    <div className="space-y-8">
      <section>
        <h2 className="text-lg font-medium mb-4">Create New Item</h2>
        <CreateItemForm />
      </section>

      <section>
        <h2 className="text-lg font-medium mb-4">Items ({items.length})</h2>
        <ItemList items={items} />
      </section>
    </div>
  );
}
