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

async function seed(client) {
  const createUsersTable = await client.sql`CREATE TABLE IF NOT EXISTS Sales(
    Order_ID VARCHAR(255),
    Product_ID VARCHAR(255),
    Sales DECIMAL(10,2),
    Quantity INT ,
    Discount DECIMAL(10,2),
    Profit DECIMAL(10,2),
    PRIMARY KEY(Order_ID , Product_ID),
    FOREIGN KEY(Order_ID) REFERENCES Orders(Order_ID),
    FOREIGN KEY(Product_ID) REFERENCES Products(Product_ID)
);`;
  console.log("Created Sales table");

  const userData = await parseCSV("C:\\Users\\kauti\\Sales_Table.csv");

  console.log(userData);

  const promises = userData.map((user) => {
    return client.sql`INSERT INTO Sales (Order_ID , Product_ID, Sales, Quantity, Discount , Profit)
    VALUES (${user["Order ID"]} , ${user["Product ID"]} , ${user["Sales"]},
    ${user["Quantity"]} , ${user["Discount"]} , ${user["Profit"]})
    ON CONFLICT (Product_ID , Order_ID) DO NOTHING`;
  });

  const results = await Promise.all(promises);
  console.log(`Seeded ${results.length} Sales`);

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
