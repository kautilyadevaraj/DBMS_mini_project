import { fetchTotalUniqueCustomers } from "@/lib/data";
import { TotalUniqueCustomersType } from "@/lib/definitions";

export default async function TotalUniqueCustomers() {
  const { total_unique_customers }: TotalUniqueCustomersType =
    await fetchTotalUniqueCustomers();

  return (
    <div>
      <div className="text-2xl font-bold">{total_unique_customers}</div>
      <p className="text-xs text-muted-foreground">+180.1% from last month</p>
    </div>
  );
}
