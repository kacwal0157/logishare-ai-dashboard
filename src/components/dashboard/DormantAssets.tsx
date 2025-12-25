import { motion } from "framer-motion";
import { Truck, User, Clock, Sparkles, AlertTriangle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface DormantAsset {
  id: string;
  type: "truck" | "driver";
  name: string;
  location: string;
  idleSince: string;
  idleHours: number;
  hasAIMatch: boolean;
  potentialValue?: string;
}

const dormantAssets: DormantAsset[] = [
  {
    id: "TRK-2847",
    type: "truck",
    name: "Volvo FH16 750",
    location: "Warsaw, Poland",
    idleSince: "Dec 23, 14:30",
    idleHours: 28,
    hasAIMatch: true,
    potentialValue: "€1,840",
  },
  {
    id: "DRV-0192",
    type: "driver",
    name: "Marek Kowalski",
    location: "Prague, Czech Republic",
    idleSince: "Dec 24, 08:00",
    idleHours: 12,
    hasAIMatch: true,
    potentialValue: "€920",
  },
  {
    id: "TRK-1563",
    type: "truck",
    name: "Mercedes Actros 1845",
    location: "Berlin, Germany",
    idleSince: "Dec 24, 16:00",
    idleHours: 4,
    hasAIMatch: false,
  },
];

export function DormantAssets() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.5 }}
      className="rounded-xl border border-border bg-card overflow-hidden"
    >
      {/* Header */}
      <div className="flex items-center justify-between border-b border-border px-6 py-4">
        <div className="flex items-center gap-3">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-warning/10">
            <AlertTriangle className="h-4 w-4 text-warning" />
          </div>
          <div>
            <h2 className="text-base font-semibold text-foreground">Dormant Assets Alert</h2>
            <p className="text-xs text-muted-foreground">Assets losing potential revenue</p>
          </div>
        </div>
        <span className="rounded-full bg-warning/10 px-3 py-1 text-xs font-medium text-warning">
          {dormantAssets.length} Inactive
        </span>
      </div>

      {/* Asset List */}
      <div className="divide-y divide-border">
        {dormantAssets.map((asset, index) => (
          <motion.div
            key={asset.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 + 0.6 }}
            className="group flex items-center justify-between p-4 hover:bg-muted/30 transition-colors"
          >
            <div className="flex items-center gap-4">
              {/* Icon */}
              <div className={cn(
                "flex h-12 w-12 items-center justify-center rounded-xl",
                asset.type === "truck" ? "bg-primary/10" : "bg-chart-4/10"
              )}>
                {asset.type === "truck" ? (
                  <Truck className={cn(
                    "h-6 w-6",
                    asset.type === "truck" ? "text-primary" : "text-chart-4"
                  )} />
                ) : (
                  <User className="h-6 w-6 text-chart-4" />
                )}
              </div>

              {/* Info */}
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-xs font-medium text-muted-foreground">{asset.id}</span>
                  {asset.hasAIMatch && (
                    <span className="flex items-center gap-1 rounded-full bg-success/10 px-2 py-0.5 text-[10px] font-medium text-success">
                      <Sparkles className="h-3 w-3" />
                      AI Match Found
                    </span>
                  )}
                </div>
                <p className="text-sm font-medium text-foreground mt-0.5">{asset.name}</p>
                <p className="text-xs text-muted-foreground">{asset.location}</p>
              </div>
            </div>

            {/* Idle Info */}
            <div className="hidden md:flex items-center gap-6">
              <div className="text-right">
                <div className="flex items-center gap-1 text-xs text-muted-foreground">
                  <Clock className="h-3 w-3" />
                  <span>Idle since {asset.idleSince}</span>
                </div>
                <p className={cn(
                  "text-sm font-semibold mt-0.5",
                  asset.idleHours > 24 ? "text-destructive" : asset.idleHours > 12 ? "text-warning" : "text-muted-foreground"
                )}>
                  {asset.idleHours}h idle
                </p>
              </div>

              {asset.potentialValue && (
                <div className="text-right">
                  <p className="text-xs text-muted-foreground">Potential</p>
                  <p className="text-sm font-semibold text-success">{asset.potentialValue}</p>
                </div>
              )}
            </div>

            {/* Action */}
            <Button 
              variant={asset.hasAIMatch ? "success" : "outline"} 
              size="sm"
              className="ml-4 gap-2"
            >
              <Sparkles className="h-4 w-4" />
              {asset.hasAIMatch ? "Rescue with AI" : "Find Match"}
            </Button>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}
