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
  const createUsersTable = await client.sql`CREATE TABLE IF NOT EXISTS Products(
    Product_ID VARCHAR(255) PRIMARY KEY,
    Category VARCHAR(255),
    Sub_Category VARCHAR(255),
    Product_Name VARCHAR(255)
);`;
  console.log("Created Products table");

  const userData = await parseCSV("C:\\Users\\kauti\\Products_Table.csv");

  console.log(userData);

  const promises = userData.map((user) => {
    return client.sql`INSERT INTO Products (Product_ID, Category, Sub_Category, Product_Name)
    VALUES (${user["Product ID"]} , ${user["Category"]} , ${user["Sub-Category"]},
    ${user["Product Name"]})
    ON CONFLICT (Product_ID) DO NOTHING`;
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
