import { motion } from "framer-motion";
import { MapPin, Fuel, Coins, User, Zap, ArrowRight, TrendingUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";

interface CostBreakdown {
  label: string;
  value: string;
  icon: React.ElementType;
  percentage: number;
}

const costs: CostBreakdown[] = [
  { label: "Fuel Cost", value: "€287", icon: Fuel, percentage: 45 },
  { label: "Toll Fees", value: "€124", icon: Coins, percentage: 19 },
  { label: "Driver Cost", value: "€230", icon: User, percentage: 36 },
];

export function ProfitabilityLens() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.7 }}
      className="rounded-xl border border-border bg-card overflow-hidden"
    >
      {/* Header */}
      <div className="flex items-center justify-between border-b border-border px-6 py-4">
        <div className="flex items-center gap-3">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg gradient-primary">
            <TrendingUp className="h-4 w-4 text-primary-foreground" />
          </div>
          <div>
            <h2 className="text-base font-semibold text-foreground">Profitability Lens</h2>
            <p className="text-xs text-muted-foreground">AI-analyzed route opportunity</p>
          </div>
        </div>
      </div>

      <div className="p-6 space-y-6">
        {/* Route */}
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-3 flex-1">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-chart-5/10">
              <MapPin className="h-5 w-5 text-chart-5" />
            </div>
            <div>
              <p className="text-xs text-muted-foreground">Origin</p>
              <p className="text-sm font-semibold text-foreground">Warsaw, PL</p>
            </div>
          </div>

          <div className="flex-shrink-0 flex flex-col items-center gap-1">
            <div className="flex items-center gap-2 px-4">
              <div className="h-px w-8 bg-border" />
              <ArrowRight className="h-4 w-4 text-primary" />
              <div className="h-px w-8 bg-border" />
            </div>
            <span className="text-[10px] text-muted-foreground">573 km • 6h 20m</span>
          </div>

          <div className="flex items-center gap-3 flex-1 justify-end">
            <div className="text-right">
              <p className="text-xs text-muted-foreground">Destination</p>
              <p className="text-sm font-semibold text-foreground">Berlin, DE</p>
            </div>
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-success/10">
              <MapPin className="h-5 w-5 text-success" />
            </div>
          </div>
        </div>

        {/* Cost Breakdown */}
        <div className="space-y-3">
          <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider">Cost Breakdown</p>
          <div className="space-y-3">
            {costs.map((cost, index) => (
              <motion.div
                key={cost.label}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 + 0.8 }}
                className="space-y-2"
              >
                <div className="flex items-center justify-between text-sm">
                  <div className="flex items-center gap-2">
                    <cost.icon className="h-4 w-4 text-muted-foreground" />
                    <span className="text-muted-foreground">{cost.label}</span>
                  </div>
                  <span className="font-medium text-foreground">{cost.value}</span>
                </div>
                <Progress value={cost.percentage} className="h-1.5" />
              </motion.div>
            ))}
          </div>

          <div className="flex items-center justify-between pt-3 border-t border-border">
            <span className="text-sm text-muted-foreground">Total Costs</span>
            <span className="text-lg font-bold text-foreground">€641</span>
          </div>
        </div>

        {/* AI Score */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 1 }}
          className="rounded-xl glass-subtle p-4"
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="relative">
                <div className="flex h-14 w-14 items-center justify-center rounded-xl gradient-success">
                  <Zap className="h-7 w-7 text-success-foreground" />
                </div>
                <div className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-success text-[10px] font-bold text-success-foreground">
                  ✓
                </div>
              </div>
              <div>
                <p className="text-xs text-muted-foreground">AI Profitability Score</p>
                <p className="text-2xl font-bold text-success">92/100</p>
                <p className="text-xs text-success">Highly Recommended</p>
              </div>
            </div>

            <div className="text-right">
              <p className="text-xs text-muted-foreground">Expected Profit</p>
              <p className="text-xl font-bold text-success">+€459</p>
              <p className="text-xs text-muted-foreground">after all costs</p>
            </div>
          </div>
        </motion.div>

        {/* Action */}
        <div className="flex gap-3">
          <Button variant="outline" className="flex-1">
            View Details
          </Button>
          <Button variant="success" className="flex-1 gap-2">
            <Zap className="h-4 w-4" />
            Accept Route
          </Button>
        </div>
      </div>
    </motion.div>
  );
}
