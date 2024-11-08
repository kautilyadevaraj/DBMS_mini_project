import { fetchTotalSalesLatestMonth } from "@/lib/data";
import NumberTicker from "../ui/number-ticker";


export default async function TotalSalesLatestMonth() {
  const totalSales= await fetchTotalSalesLatestMonth();

  return (
    <div>

      <div className="text-xl font-bold">
        <NumberTicker value={totalSales.total_sales} />
      </div>
      <p className="text-xs text-muted-foreground">+2,010 since previous month</p>
    </div>
  );
}
