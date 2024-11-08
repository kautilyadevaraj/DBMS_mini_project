import { fetchTotalProfit } from "@/lib/data";
import NumberTicker from "../ui/number-ticker";


export default async function TotalProfit() {
    const totalProfit : number = await fetchTotalProfit();
    return (
      <div>
        <div className="text-xl font-bold">
          <NumberTicker value={totalProfit} />
        </div>
        <p className="text-xs text-muted-foreground">+20.1% from last month</p>
      </div>
    );
}