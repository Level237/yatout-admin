import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { ArrowUpDown, Filter } from "lucide-react";

const products = [
  {
    id: "1",
    name: "iPhone 15 Pro",
    icon: "📱",
    stocks: 8200,
    price: 999,
    sales: 4800,
    earnings: 4795200,
  },
  {
    id: "2",
    name: "MacBook Air M2",
    icon: "💻",
    stocks: 1020,
    price: 1299,
    sales: 3200,
    earnings: 4156800,
  },
  {
    id: "3",
    name: "Google Pixel 8",
    icon: "📱",
    stocks: 1600,
    price: 699,
    sales: 800,
    earnings: 559200,
  },
  {
    id: "4",
    name: "Nike Air Max 90",
    icon: "👟",
    stocks: 2400,
    price: 130,
    sales: 1800,
    earnings: 234000,
  },
  {
    id: "5",
    name: "Galaxy Buds Pro",
    icon: "🎧",
    stocks: 850,
    price: 199,
    sales: 1000,
    earnings: 199000,
  },
];

export function TopProductsTable() {
  return (
    <Card className="border-gray-100 shadow-sm rounded-2xl bg-white/50 backdrop-blur-sm">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-lg font-semibold">Top Products</CardTitle>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" className="text-xs gap-1">
            <ArrowUpDown className="h-3 w-3" />
            Sort
          </Button>
          <Button variant="outline" size="sm" className="text-xs gap-1">
            <Filter className="h-3 w-3" />
            Filter
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Product</TableHead>
              <TableHead className="text-right">Stocks</TableHead>
              <TableHead className="text-right">Price</TableHead>
              <TableHead className="text-right">Sales</TableHead>
              <TableHead className="text-right">Earnings</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {products.map((product) => (
              <TableRow key={product.id}>
                <TableCell>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-gray-100 flex items-center justify-center text-xl">
                      {product.icon}
                    </div>
                    <span className="font-medium text-gray-900">
                      {product.name}
                    </span>
                  </div>
                </TableCell>
                <TableCell className="text-right text-gray-700">
                  {product.stocks.toLocaleString()}
                </TableCell>
                <TableCell className="text-right text-gray-700">
                  ${product.price.toLocaleString()}
                </TableCell>
                <TableCell className="text-right text-gray-700">
                  {product.sales.toLocaleString()}
                </TableCell>
                <TableCell className="text-right font-semibold text-gray-900">
                  ${product.earnings.toLocaleString()}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
