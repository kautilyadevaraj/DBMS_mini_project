import { sql } from "@vercel/postgres";
import { totalProfitType } from "./definitions";
import { totalSalesType } from "./definitions";
import { LatestOrderInfo } from "./definitions";
import { TotalUniqueCustomersType } from "./definitions";
import { MonthlySales } from "./definitions";
import { MonthlyRevenue } from "./definitions";
import { NewCustomer } from "./definitions";

export async function fetchTotalProfit() {
  try {
    const data =
      await sql<totalProfitType>`SELECT SUM(Profit) AS sum FROM Sales;`;

    if (data.rows.length === 0 || data.rows[0].sum === null) {
      return 0;
    }

    return data.rows[0].sum;
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export async function fetchTotalSales() {
  try {
    const data =
      await sql<totalSalesType>`SELECT SUM(Sales) AS totalSales FROM Sales;`;

    if (data.rows.length === 0 || data.rows[0].totalsales === null) {
      return 0;
    }

    return data.rows[0].totalsales;
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export async function fetchLatestOrderInfo(): Promise<LatestOrderInfo[]> {
  try {
    const result = await sql<LatestOrderInfo>`
      SELECT Customers.CustomerName, Products.Product_Name, Sales.Profit
      FROM Orders
      INNER JOIN Sales ON Orders.Order_ID = Sales.Order_ID
      INNER JOIN Customers ON Orders.Customer_ID = Customers.CustomerID
      INNER JOIN Products ON Sales.Product_ID = Products.Product_ID
      ORDER BY Orders.Order_Date DESC
      LIMIT 5;
    `;
    return result.rows;
  } catch (error) {
    console.error("Error fetching latest order information:", error);
    throw error;
  }
}

export async function fetchTotalUniqueCustomers(): Promise<TotalUniqueCustomersType> {
  try {
    const data =
      await sql<TotalUniqueCustomersType>`SELECT COUNT(DISTINCT CustomerID) AS total_unique_customers FROM Customers;`;

    if (
      data.rows.length === 0 ||
      data.rows[0].total_unique_customers === null
    ) {
      return { total_unique_customers: 0 };
    }
    return data.rows[0];
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export async function fetchTotalSalesLatestMonth(): Promise<MonthlySales> {
  const result = await sql<MonthlySales>`
   SELECT 
    DATE_TRUNC('month', O.Order_Date) AS order_month,
    SUM(S.Sales) AS total_sales
FROM 
    Orders O
JOIN 
    Sales S ON O.Order_ID = S.Order_ID
GROUP BY 
    order_month
ORDER BY 
    order_month DESC;

  `;
  fetchMonthlyRevenue();
  return {
    total_sales: result.rows[0]?.total_sales || 0,
  };
}

export async function fetchMonthlyRevenue(): Promise<MonthlyRevenue[]> {
  const result = await sql<MonthlyRevenue>`
        SELECT 
    TO_CHAR(Order_Date, 'Month') AS month,
    SUM(Sales) AS total_revenue
FROM 
    Sales
JOIN 
    Orders ON Sales.Order_ID = Orders.Order_ID
GROUP BY 
    month
ORDER BY 
    MIN(Order_Date);

        `;
  return result.rows;
}

export async function addCustomer(customerData: NewCustomer): Promise<void> {
  try {
    console.log(customerData);
    await sql`
      INSERT INTO Customers (CustomerID, CustomerName, Segment, Country, City, State, PostalCode)
      VALUES (${customerData.customerID}, ${customerData.name}, 
              ${customerData.country}, ${customerData.city}, ${customerData.state}, ${customerData.postalCode});
    `;
  } catch (error) {
    console.error("Error adding new customer:", error);
    throw error;
  }
}

export async function findCustomers(customerName : string): Promise<NewCustomer[]> {
  try {
    const result = await sql<NewCustomer>`SELECT * FROM Customers WHERE CustomerName LIKE ${customerName}%`;
    return result.rows;
  } catch (error) {
    console.log(error);
    throw error;
  }
}