export interface StatCard {
  label: string;
  value: string | number;
  icon: React.ReactNode;
  trend?: {
    value: number;
    isPositive: boolean;
  };
}

export interface Activity {
  id: string;
  type: "order" | "stock" | "campaign" | "system";
  title: string;
  description: string;
  date: string;
  badge: {
    label: string;
    variant: "info" | "destructive" | "default" | "secondary";
  };
}

export interface Product {
  id: string;
  name: string;
  icon: string;
  stocks: number;
  price: number;
  sales: number;
  earnings: number;
}

export interface ChartDataPoint {
  month: string;
  oneTime: number;
  recurring: number;
}

export interface CategoryData {
  name: string;
  value: number;
  percentage: number;
  color: string;
}
