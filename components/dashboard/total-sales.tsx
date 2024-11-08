import { fetchTotalSales } from "@/lib/data";
import NumberTicker from "../ui/number-ticker";



export default async function TotalSales() {
    const totSales = await fetchTotalSales();
    return (
      <div>
            <div className="text-2xl font-bold"><NumberTicker value={totSales}/></div>
        <p className="text-sm text-muted-foreground">+19% from last month</p>
      </div>
    );
}