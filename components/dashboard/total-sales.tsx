import { fetchTotalSales } from "@/lib/data";

function formatNumberWithCommas(num: number): string {
  return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

export default async function TotalSales() {
    const totSales = await fetchTotalSales();
    return (
      <div>
            <div className="text-2xl font-bold">{ formatNumberWithCommas(totSales)}</div>
        <p className="text-xs text-muted-foreground">+19% from last month</p>
      </div>
    );
}