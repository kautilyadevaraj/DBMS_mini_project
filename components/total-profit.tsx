import { fetchTotalProfit } from "@/lib/data";

function formatNumberWithCommas(num: number): string {
  return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

export default async function TotalProfit() {
    const totalProfit : number = await fetchTotalProfit();
    return (
      <div>
            <div className="text-2xl font-bold">{formatNumberWithCommas(totalProfit)}</div>
        <p className="text-xs text-muted-foreground">+20.1% from last month</p>
      </div>
    );
}