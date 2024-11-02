import { fetchTotalSalesLatestMonth } from "@/lib/data";

function formatNumberWithCommas(num: number): string {
  return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

export default async function TotalSalesLatestMonth() {
  const totalSales= await fetchTotalSalesLatestMonth();

  return (
    <div>
      <div className="text-2xl font-bold">
        {formatNumberWithCommas(totalSales.total_sales)}
      </div>
      <p className="text-xs text-muted-foreground">+201 since last hour</p>
    </div>
  );
}
