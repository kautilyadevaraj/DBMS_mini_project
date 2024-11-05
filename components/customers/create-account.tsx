"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export function DemoCreateAccount() {
  return (
    <Card>
      <CardHeader className="space-y-1">
        <CardTitle className="text-2xl">Add a customer</CardTitle>
        <CardDescription>
          Enter the details below to add a new customer
        </CardDescription>
      </CardHeader>
      <CardContent className="grid gap-4">
        <div className="grid gap-2">
          <Label htmlFor="customerID">Customer ID</Label>
          <Input id="customerID" type="text" />
        </div>
        <div className="grid gap-2">
          <Label htmlFor="name">Name</Label>
          <Input id="name" type="text" />
        </div>
        <div className="grid gap-2">
          <Label htmlFor="sector">Sector</Label>
          <div id="sector">
            <Select>
              <SelectTrigger>
                <SelectValue placeholder="Theme" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Corporate">Corporate</SelectItem>
                <SelectItem value="Consumer">Consumer</SelectItem>
                <SelectItem value="Home Office">Home Office</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        <div className="grid gap-2">
          <Label htmlFor="country">Country</Label>
          <Input id="country" type="text" />
        </div>
        <div className="grid gap-2">
          <Label htmlFor="city">City</Label>
          <Input id="city" type="text" />
        </div>
        <div className="grid gap-2">
          <Label htmlFor="state">State</Label>
          <Input id="state" type="text" />
        </div>
        <div className="grid gap-2">
          <Label htmlFor="postalCode">Postal Code</Label>
          <Input id="postalCode" type="text" />
        </div>
      </CardContent>
      <CardFooter>
        <Button className="w-full">Add Customer</Button>
      </CardFooter>
    </Card>
  );
}
