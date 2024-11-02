import { db } from "@vercel/postgres";
import fs from "fs";
import path from "path";
import Papa from "papaparse";
import "../envConfig.mjs";

const parseCSV = async (filePath) => {
  const csvFile = fs.readFileSync(path.resolve(filePath), "utf8");
  return new Promise((resolve) => {
    Papa.parse(csvFile, {
      header: true,
      complete: (results) => {
        resolve(results.data);
      },
    });
  });
};

function formatDate(dateStr) {
  if (!dateStr) return null; // Return null for empty or undefined dates
  const [day, month, year] = dateStr.split("-");
  return `${year}-${month}-${day}`;
}

async function seed(client) {
  const createUsersTable = await client.sql`CREATE TABLE IF NOT EXISTS Orders (
    Order_ID VARCHAR(255) PRIMARY KEY,
    Order_Date DATE,
    Ship_Date DATE,
    Ship_Mode VARCHAR(255),
    Customer_ID VARCHAR(255),
    FOREIGN KEY (Customer_ID) REFERENCES Customers(CustomerID)
  );
  `;
  console.log("Created Orders table");

  const userData = await parseCSV("C:\\Users\\kauti\\Orders_Table.csv");

  console.log(userData);

  const promises = userData.map((user) => {
    const formattedOrderDate = formatDate(user["Order Date"]);
    const formattedShipDate = formatDate(user["Ship Date"]);

    return client.sql`INSERT INTO Orders (Order_ID, Order_Date, Ship_Date, Ship_Mode, Customer_ID)
      VALUES (${user["Order ID"]}, ${formattedOrderDate}, ${formattedShipDate},
      ${user["Ship Mode"]}, ${user["Customer ID"]})
      ON CONFLICT (Order_ID) DO NOTHING`;
  });

  const results = await Promise.all(promises);
  console.log(`Seeded ${results.length} customers`);

  return {
    createUsersTable,
    seededUsers: results.length,
  };
}

async function main() {
  const client = await db.connect();

  try {
    await seed(client);
  } finally {
    await client.end();
  }
}

main().catch((err) => {
  console.error(
    "An error occurred while attempting to seed the database : ",
    err
  );
});
