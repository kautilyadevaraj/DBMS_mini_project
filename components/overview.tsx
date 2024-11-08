"use client";

import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis  } from "recharts";

const data = [
  {
    name: "Jan",
    total: 95365.98,
  },
  {
    name: "Feb",
    total: 60172.66,
  },
  {
    name: "Mar",
    total: 199207.33,
  },
  {
    name: "Apr",
    total: 141278.26,
  },
  {
    name: "May",
    total: 156122.31,
  },
  {
    name: "Jun",
    total: 147082.66,
  },
  {
    name: "Jul",
    total: 149490.78,
  },
  {
    name: "Aug",
    total: 159589.38,
  },
  {
    name: "Sep",
    total: 309721.0,
  },
  {
    name: "Oct",
    total: 197115.24,
  },
  {
    name: "Nov",
    total: 348575.7,
  },
  {
    name: "Dec",
    total: 331788.48,
  },
];

export function Overview() {
  return (
    <ResponsiveContainer width="100%" height={350}>
      <BarChart data={data}>
        <XAxis
          dataKey="name"
          stroke="#888888"
          fontSize={12}
          tickLine={false}
          axisLine={false}
        />
        <YAxis
          stroke="#888888"
          fontSize={13}
          tickLine={false}
          axisLine={false}
          tickFormatter={(value) => `$${value}`}
        />
        <Bar
          dataKey="total"
          fill="currentColor"
          radius={[4, 4, 0, 0]}
          className="fill-primary"
        />
      </BarChart>
    </ResponsiveContainer>
  );
}
