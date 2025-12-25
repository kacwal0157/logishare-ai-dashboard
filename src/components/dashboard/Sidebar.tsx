import { motion } from "framer-motion";
import { 
  LayoutDashboard, 
  Truck, 
  Brain, 
  TrendingUp, 
  Settings,
  Zap
} from "lucide-react";
import { cn } from "@/lib/utils";

interface NavItem {
  icon: React.ElementType;
  label: string;
  active?: boolean;
  badge?: string;
}

const navItems: NavItem[] = [
  { icon: LayoutDashboard, label: "Dashboard", active: true },
  { icon: Truck, label: "Fleet Status", badge: "3" },
  { icon: Brain, label: "Intelligent Matching" },
  { icon: TrendingUp, label: "Market Insights" },
  { icon: Settings, label: "Settings" },
];

export function Sidebar() {
  return (
    <motion.aside
      initial={{ x: -20, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ duration: 0.4 }}
      className="fixed left-0 top-0 z-40 flex h-screen w-64 flex-col border-r border-border bg-sidebar"
    >
      {/* Logo */}
      <div className="flex h-16 items-center gap-3 border-b border-border px-6">
        <div className="flex h-9 w-9 items-center justify-center rounded-xl gradient-primary">
          <Zap className="h-5 w-5 text-primary-foreground" />
        </div>
        <div className="flex flex-col">
          <span className="text-base font-bold text-foreground">LogiShare</span>
          <span className="text-xs font-medium text-primary">AI</span>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 space-y-1 p-4">
        {navItems.map((item, index) => (
          <motion.button
            key={item.label}
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: index * 0.05 + 0.2 }}
            className={cn(
              "group flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-all duration-200",
              item.active
                ? "bg-primary/10 text-primary"
                : "text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
            )}
          >
            <item.icon className={cn(
              "h-5 w-5 transition-colors",
              item.active ? "text-primary" : "text-sidebar-foreground group-hover:text-sidebar-accent-foreground"
            )} />
            <span className="flex-1 text-left">{item.label}</span>
            {item.badge && (
              <span className="flex h-5 min-w-5 items-center justify-center rounded-full bg-destructive px-1.5 text-xs font-semibold text-destructive-foreground">
                {item.badge}
              </span>
            )}
            {item.active && (
              <motion.div
                layoutId="activeIndicator"
                className="absolute left-0 h-8 w-1 rounded-r-full bg-primary"
              />
            )}
          </motion.button>
        ))}
      </nav>

      {/* AI Status */}
      <div className="border-t border-border p-4">
        <div className="glass-subtle rounded-xl p-4">
          <div className="flex items-center gap-2 mb-2">
            <div className="relative">
              <div className="h-2 w-2 rounded-full bg-success animate-pulse" />
              <div className="absolute inset-0 h-2 w-2 rounded-full bg-success animate-ping" />
            </div>
            <span className="text-xs font-medium text-success">Agentforce Active</span>
          </div>
          <p className="text-xs text-muted-foreground">
            AI is monitoring 24 loads and 8 fleet vehicles
          </p>
        </div>
      </div>
    </motion.aside>
  );
}
