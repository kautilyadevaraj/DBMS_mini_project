# Personal Finance Manager Dashboard

This project is a web-based personal finance manager dashboard built using Next.js and Vercel PostgreSQL. The dashboard aggregates essential financial data to help users track metrics like profits, sales, and customer activity, and it provides easy-to-read visualizations to support data-driven decision-making.

**[View the live application here](https://dbms-mini-project-pi.vercel.app/dashboard)**

## Table of Contents

- [Features](#features)
- [Database Schema](#database-schema)
- [Getting Started](#getting-started)
- [Installation](#installation)
- [Usage](#usage)
- [Technologies Used](#technologies-used)
- [Contributing](#contributing)

## Features

**Total Profit & Sales:** View cumulative financial data, including total profits and sales.
**Monthly Sales Breakdown:** See month-wise sales trends in a bar graph.
**Customer Insights:** Track total customer count and view recent customer transactions.
**Recent Sales:** A list of the latest transactions for quick reference.

## Database Schema

The project uses four main tables in the Vercel PostgreSQL database:

    Customers
        CustomerID (Primary Key): Unique identifier for each customer.
        CustomerName, Segment, Country, City, State, PostalCode.

    Orders
        Order_ID (Primary Key): Unique identifier for each order.
        Order_Date, Ship_Date, Ship_Mode, Customer_ID (Foreign Key referencing Customers).

    Products
        Product_ID (Primary Key): Unique identifier for each product.
        Category, Sub_Category, Product_Name.

    Sales
        Composite primary key: Order_ID, Product_ID.
        Sales, Quantity, Discount, Profit.
        Foreign keys: Order_ID (references Orders), Product_ID (references Products).

## Getting Started

These instructions will help you set up and run the project locally.
### Prerequisites

Node.js: Version 14 or higher
PostgreSQL: Version compatible with Vercel PostgreSQL

### Installation

Clone the Repository

```bash
git clone https://github.com/kautilyadevaraj/DBMS_mini_project.git
cd finance-manager-dashboard
```

### Install Dependencies
```bash
npm install
```

### Set Up the Database

Create a PostgreSQL database and add the four tables using the provided schema.
Update the database connection information in your environment file .env.local.

### Run the Development Server
```bash
    npm run dev
```
Open http://localhost:3000 to view the dashboard in your browser.

## Usage

**Dashboard Overview:** The main dashboard displays total profits, sales, and customers.
**Visualizations:** Monthly sales are shown in a bar graph for easy trend analysis.
**Recent Sales:** Access a list of recent transactions, providing quick insights into recent customer activity.

## Technologies Used

Frontend: Next.js, React, Tailwind CSS
Backend: Vercel PostgreSQL
Database: PostgreSQL

## Contributing

Contributions are welcome! Please open an issue or submit a pull request.
