import { ArrowUpDown, Filter, MoreHorizontal } from "lucide-react";
import { cn } from "@/lib/utils";

const products = [
  {
    id: "1",
    name: "Abonnement Premium",
    icon: "💎",
    stocks: "Illimité",
    price: 99,
    sales: 4800,
    earnings: 475200,
    status: "Actif",
  },
  {
    id: "2",
    name: "Mise en avant",
    icon: "⭐",
    stocks: 1020,
    price: 129,
    sales: 3200,
    earnings: 412800,
    status: "Actif",
  },
  {
    id: "3",
    name: "Pack Visibilité",
    icon: "🚀",
    stocks: 1600,
    price: 69,
    sales: 800,
    earnings: 55200,
    status: "Rupture",
  },
  {
    id: "4",
    name: "Certification Pro",
    icon: "✅",
    stocks: "Illimité",
    price: 130,
    sales: 1800,
    earnings: 234000,
    status: "Actif",
  },
  {
    id: "5",
    name: "Bannière Accueil",
    icon: "🖼️",
    stocks: 850,
    price: 199,
    sales: 1000,
    earnings: 199000,
    status: "Bientôt épuisé",
  },
];

export function TopProductsTable() {
  return (
    <div className="bg-background/60 backdrop-blur-xl border border-border/50 rounded-3xl p-6 shadow-sm overflow-hidden flex flex-col h-full">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-6 gap-4">
        <div>
          <h2 className="text-xl font-bold tracking-tight text-foreground">Top Services Vendus</h2>
          <p className="text-sm font-medium text-muted-foreground mt-1">Les services les plus performants</p>
        </div>
        <div className="flex gap-2">
          <button className="flex items-center gap-1.5 px-3 py-2 bg-muted/40 hover:bg-muted/80 text-foreground font-semibold text-xs rounded-xl transition-all border border-border/50">
            <ArrowUpDown className="h-3.5 w-3.5" />
            Trier
          </button>
          <button className="flex items-center gap-1.5 px-3 py-2 bg-muted/40 hover:bg-muted/80 text-foreground font-semibold text-xs rounded-xl transition-all border border-border/50">
            <Filter className="h-3.5 w-3.5" />
            Filtrer
          </button>
        </div>
      </div>

      <div className="w-full overflow-x-auto custom-scrollbar flex-1">
        <table className="w-full text-sm text-left">
          <thead>
            <tr className="border-b border-border/50">
              <th className="py-4 px-4 font-semibold text-muted-foreground whitespace-nowrap">Service</th>
              <th className="py-4 px-4 font-semibold text-muted-foreground text-right whitespace-nowrap">Status</th>
              <th className="py-4 px-4 font-semibold text-muted-foreground text-right whitespace-nowrap hidden sm:table-cell">Prix</th>
              <th className="py-4 px-4 font-semibold text-muted-foreground text-right whitespace-nowrap">Ventes</th>
              <th className="py-4 px-4 font-semibold text-muted-foreground text-right whitespace-nowrap">Revenus</th>
              <th className="py-4 px-4 font-semibold text-muted-foreground text-right whitespace-nowrap w-10"></th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr
                key={product.id}
                className="border-b border-border/30 last:border-0 hover:bg-muted/30 transition-colors group"
              >
                <td className="py-3 px-4">
                  <div className="flex items-center gap-4">
                    <div className="w-11 h-11 rounded-2xl bg-gradient-to-br from-muted/80 to-muted flex items-center justify-center text-xl shadow-inner border border-border/50 group-hover:scale-105 transition-transform duration-300">
                      {product.icon}
                    </div>
                    <div>
                      <span className="font-bold tracking-tight text-foreground block">
                        {product.name}
                      </span>
                      <span className="text-xs font-medium text-muted-foreground">
                        Modèle de vente
                      </span>
                    </div>
                  </div>
                </td>
                <td className="py-3 px-4 text-right">
                  <span className={cn(
                    "inline-flex items-center justify-center px-2.5 py-1 text-[10px] uppercase tracking-widest font-bold rounded-lg border",
                    product.status === "Actif" ? "bg-emerald-500/10 text-emerald-600 border-emerald-500/20" :
                      product.status === "Rupture" ? "bg-rose-500/10 text-rose-600 border-rose-500/20" :
                        "bg-amber-500/10 text-amber-600 border-amber-500/20"
                  )}>
                    {product.status}
                  </span>
                </td>
                <td className="py-3 px-4 text-right font-medium text-muted-foreground hidden sm:table-cell">
                  ${product.price.toLocaleString()}
                </td>
                <td className="py-3 px-4 text-right font-semibold text-foreground">
                  {product.sales.toLocaleString()}
                </td>
                <td className="py-3 px-4 text-right">
                  <span className="font-extrabold text-foreground bg-primary/10 text-primary px-3 py-1.5 rounded-xl">
                    ${product.earnings.toLocaleString()}
                  </span>
                </td>
                <td className="py-3 px-4 text-right">
                  <button className="p-2 text-muted-foreground hover:text-foreground hover:bg-muted/80 rounded-xl transition-colors opacity-0 group-hover:opacity-100 focus:opacity-100">
                    <MoreHorizontal className="w-4 h-4" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
