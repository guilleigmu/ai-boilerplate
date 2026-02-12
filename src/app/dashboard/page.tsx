import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { getAllItems } from "@/data-access/items";
import { auth } from "@/lib/auth";
import { cn } from "@/lib/utils";
import { ItemCheckbox } from "./item-checkbox";
import { SignOutButton } from "./sign-out-button";

export default async function DashboardPage() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    redirect("/sign-in");
  }

  const items = await getAllItems();
  const todoItems = items.filter((item) => !item.isCompleted);
  const completedItems = items.filter((item) => item.isCompleted);

  return (
    <div className="flex flex-col gap-8">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Welcome, {session.user.name}</h1>
        <SignOutButton />
      </div>

      <div className="flex flex-col gap-6">
        <section className="flex flex-col gap-3">
          <h2 className="text-lg font-semibold">Todo</h2>
          {todoItems.length === 0 ? (
            <p className="text-muted-foreground text-sm">No tasks to do</p>
          ) : (
            <div className="flex flex-col gap-2">
              {todoItems.map((item) => (
                <div key={item.id} className="flex items-center gap-3">
                  <ItemCheckbox itemId={item.id} isCompleted={item.isCompleted} />
                  <span>{item.task}</span>
                </div>
              ))}
            </div>
          )}
        </section>

        <section className="flex flex-col gap-3">
          <h2 className="text-lg font-semibold">Completed</h2>
          {completedItems.length === 0 ? (
            <p className="text-muted-foreground text-sm">No completed tasks</p>
          ) : (
            <div className="flex flex-col gap-2">
              {completedItems.map((item) => (
                <div key={item.id} className="flex items-center gap-3">
                  <ItemCheckbox itemId={item.id} isCompleted={item.isCompleted} />
                  <span className={cn("text-muted-foreground line-through")}>{item.task}</span>
                </div>
              ))}
            </div>
          )}
        </section>
      </div>
    </div>
  );
}
