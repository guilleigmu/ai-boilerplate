import { getAllItems } from "@/data-access/items";

export default async function DashboardPage() {
  const items = await getAllItems();

  return (
    <div className="flex flex-col gap-8">
      {items.map((item) => (
        <div key={item.id}>{item.task}</div>
      ))}
    </div>
  );
}
