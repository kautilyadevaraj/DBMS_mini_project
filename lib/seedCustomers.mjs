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
  const createUsersTable =
    await client.sql`CREATE TABLE IF NOT EXISTS Customers (
    CustomerID VARCHAR(20) PRIMARY KEY,
    CustomerName VARCHAR(100),
    Segment VARCHAR(50),
    Country VARCHAR(50),
    City VARCHAR(50),
    State VARCHAR(50),
    PostalCode INT
);
`;
  console.log("Created Customers table");

  const userData = await parseCSV("C:\\Users\\kauti\\Customers_Table.csv");

  console.log(userData);

  const promises = userData.map((user) => {
    return client.sql`INSERT INTO Customers (CustomerID, CustomerName, Segment, Country, City, State, PostalCode)
    VALUES (${user["Customer ID"]} , ${user["CustomerName"]} , ${user["Segment"]},
    ${user["Country"]} , ${user["City"]} , ${user["State"]} , ${user["PostalCode"]})
    ON CONFLICT (customerID) DO NOTHING`;
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
  console.error('An error occurred while attempting to seed the database : ', err);
})
