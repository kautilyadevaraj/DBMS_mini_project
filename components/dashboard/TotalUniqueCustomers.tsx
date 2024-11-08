import { fetchTotalUniqueCustomers } from "@/lib/data";
import { TotalUniqueCustomersType } from "@/lib/definitions";
import NumberTicker from "../ui/number-ticker";

export default async function TotalUniqueCustomers() {
  const { total_unique_customers }: TotalUniqueCustomersType =
    await fetchTotalUniqueCustomers();

  return (
    <div>
      <div className="text-2xl font-bold"><NumberTicker value={total_unique_customers}/></div>
      <p className="text-sm text-muted-foreground">+180.1% from last month</p>
    </div>
  );
}
