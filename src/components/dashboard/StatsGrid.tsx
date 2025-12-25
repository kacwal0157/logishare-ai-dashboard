import { motion } from "framer-motion";
import { TrendingUp, TrendingDown, Gauge, DollarSign, Truck, Zap } from "lucide-react";
import { cn } from "@/lib/utils";

interface StatCard {
  title: string;
  value: string;
  change: string;
  trend: "up" | "down";
  icon: React.ElementType;
  color: "primary" | "success" | "warning" | "destructive";
}

const stats: StatCard[] = [
  {
    title: "Fleet Efficiency",
    value: "87.3%",
    change: "+4.2% from last week",
    trend: "up",
    icon: Gauge,
    color: "primary",
  },
  {
    title: "Projected Monthly Profit",
    value: "€47,280",
    change: "+12.5% vs forecast",
    trend: "up",
    icon: DollarSign,
    color: "success",
  },
  {
    title: "Dormant Trucks",
    value: "3",
    change: "2 have AI matches",
    trend: "down",
    icon: Truck,
    color: "warning",
  },
  {
    title: "Money Saved via AI",
    value: "€8,420",
    change: "This month",
    trend: "up",
    icon: Zap,
    color: "success",
  },
];

const colorClasses = {
  primary: {
    bg: "bg-primary/10",
    text: "text-primary",
    icon: "text-primary",
  },
  success: {
    bg: "bg-success/10",
    text: "text-success",
    icon: "text-success",
  },
  warning: {
    bg: "bg-warning/10",
    text: "text-warning",
    icon: "text-warning",
  },
  destructive: {
    bg: "bg-destructive/10",
    text: "text-destructive",
    icon: "text-destructive",
  },
};

export function StatsGrid() {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
      {stats.map((stat, index) => (
        <motion.div
          key={stat.title}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 + 0.3 }}
          className="group relative overflow-hidden rounded-xl border border-border bg-card p-6 shadow-card transition-all duration-300 hover:border-primary/50 hover:shadow-elevated"
        >
          {/* Background glow effect */}
          <div className={cn(
            "absolute -right-8 -top-8 h-24 w-24 rounded-full opacity-0 blur-2xl transition-opacity group-hover:opacity-100",
            colorClasses[stat.color].bg
          )} />

          <div className="relative flex items-start justify-between">
            <div className="space-y-3">
              <div className={cn(
                "inline-flex h-10 w-10 items-center justify-center rounded-xl",
                colorClasses[stat.color].bg
              )}>
                <stat.icon className={cn("h-5 w-5", colorClasses[stat.color].icon)} />
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground">{stat.title}</p>
                <p className="text-2xl font-bold text-foreground mt-1">{stat.value}</p>
              </div>
            </div>
          </div>

          <div className="mt-4 flex items-center gap-2">
            {stat.trend === "up" ? (
              <TrendingUp className="h-4 w-4 text-success" />
            ) : (
              <TrendingDown className="h-4 w-4 text-warning" />
            )}
            <span className={cn(
              "text-xs font-medium",
              stat.trend === "up" ? "text-success" : "text-warning"
            )}>
              {stat.change}
            </span>
          </div>
        </motion.div>
      ))}
    </div>
  );
}
