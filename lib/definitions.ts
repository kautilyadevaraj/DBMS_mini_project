export type totalProfitType = {
  sum: number;
};

export type totalSalesType = {
    totalsales : number
}

export type LatestOrderInfo = {
  customername: string;
  product_name: string;
  profit: number;
};

export type TotalUniqueCustomersType = {
  total_unique_customers: number;
};


export interface MonthlySales {
  total_sales: number;
}

export type MonthlyRevenue = {
  month: string; 
  total_revenue: number;
};

export type NewCustomer = {
  customerID: string;
  name: string;
  sector: string;
  country: string;
  city: string;
  state: string;
  postalCode: number;
};