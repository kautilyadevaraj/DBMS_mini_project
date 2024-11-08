import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { fetchLatestOrderInfo } from "@/lib/data";

export async function RecentSales() {
  const latestOrders = await fetchLatestOrderInfo();

  return (
    <div className="space-y-8">
      {latestOrders.map((order, index) => (
        <div key={index} className="flex items-center">
          <Avatar className="h-8 w-8">
            <AvatarImage src="/avatars/01.png" alt="Avatar" />
            <AvatarFallback>
              {order.customername?.slice(0, 2).toUpperCase()}
            </AvatarFallback>
          </Avatar>
          <div className="ml-4 space-y-1">
            <p className="text-sm font-medium leading-none">
              {order.customername}
            </p>
            <p className="text-sm text-muted-foreground">
              {order.product_name}
            </p>
          </div>
          <div className="ml-auto font-medium">+${order.profit}</div>
        </div>
      ))}
    </div>
  );
}

export default RecentSales;
