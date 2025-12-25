import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Terminal, Circle, Zap, CheckCircle2, Clock, Send } from "lucide-react";

interface LogEntry {
  id: number;
  timestamp: string;
  message: string;
  type: "info" | "success" | "pending" | "action";
}

const initialLogs: LogEntry[] = [
  { id: 1, timestamp: "14:32:01", message: "Agentforce initialized. Scanning market...", type: "info" },
  { id: 2, timestamp: "14:32:04", message: "Found 3 matching loads for TRK-2847", type: "info" },
  { id: 3, timestamp: "14:32:08", message: "Negotiating load #4402 with broker...", type: "pending" },
  { id: 4, timestamp: "14:32:15", message: "Offer sent: €1,100 EUR for Warsaw→Berlin", type: "action" },
  { id: 5, timestamp: "14:32:28", message: "Counter-offer received: €1,050 EUR", type: "info" },
  { id: 6, timestamp: "14:32:31", message: "Analyzing profitability... Score: 88/100", type: "info" },
  { id: 7, timestamp: "14:32:35", message: "Counter-counter offer: €1,080 EUR", type: "action" },
];

const newLogsQueue: Omit<LogEntry, "id">[] = [
  { timestamp: "14:32:42", message: "Broker accepted! Deal confirmed ✓", type: "success" },
  { timestamp: "14:32:45", message: "Notifying driver Marek K. via SMS...", type: "action" },
  { timestamp: "14:32:48", message: "Route optimization in progress...", type: "pending" },
  { timestamp: "14:32:52", message: "Fuel stop recommendation: Poznań A2", type: "info" },
  { timestamp: "14:32:58", message: "ETA to Berlin: 6h 12m (optimized)", type: "success" },
  { timestamp: "14:33:01", message: "Scanning for return load opportunities...", type: "pending" },
];

const typeConfig = {
  info: { icon: Circle, color: "text-muted-foreground", bg: "bg-muted" },
  success: { icon: CheckCircle2, color: "text-success", bg: "bg-success/10" },
  pending: { icon: Clock, color: "text-warning", bg: "bg-warning/10" },
  action: { icon: Send, color: "text-primary", bg: "bg-primary/10" },
};

export function AILiveLog() {
  const [logs, setLogs] = useState<LogEntry[]>(initialLogs);
  const [queueIndex, setQueueIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      if (queueIndex < newLogsQueue.length) {
        const newLog = { ...newLogsQueue[queueIndex], id: Date.now() };
        setLogs(prev => [...prev.slice(-8), newLog]);
        setQueueIndex(prev => prev + 1);
      } else {
        // Reset and cycle
        setQueueIndex(0);
      }
    }, 3000);

    return () => clearInterval(interval);
  }, [queueIndex]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 1.1 }}
      className="rounded-xl border border-border bg-card overflow-hidden"
    >
      {/* Header */}
      <div className="flex items-center justify-between border-b border-border px-6 py-4">
        <div className="flex items-center gap-3">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10">
            <Terminal className="h-4 w-4 text-primary" />
          </div>
          <div>
            <h2 className="text-base font-semibold text-foreground">AI Live Log</h2>
            <p className="text-xs text-muted-foreground">Agentforce activity stream</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <div className="relative">
            <div className="h-2 w-2 rounded-full bg-success" />
            <div className="absolute inset-0 h-2 w-2 rounded-full bg-success animate-ping" />
          </div>
          <span className="text-xs font-medium text-success">Live</span>
        </div>
      </div>

      {/* Terminal Body */}
      <div className="bg-sidebar p-4 font-mono text-xs h-64 overflow-hidden">
        <AnimatePresence mode="popLayout">
          {logs.map((log) => {
            const config = typeConfig[log.type];
            const Icon = config.icon;
            
            return (
              <motion.div
                key={log.id}
                initial={{ opacity: 0, y: 20, height: 0 }}
                animate={{ opacity: 1, y: 0, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3 }}
                className="flex items-start gap-3 py-1.5"
              >
                <span className="text-muted-foreground shrink-0">{log.timestamp}</span>
                <div className={`flex h-4 w-4 items-center justify-center rounded shrink-0 ${config.bg}`}>
                  <Icon className={`h-3 w-3 ${config.color}`} />
                </div>
                <span className={config.color}>{log.message}</span>
              </motion.div>
            );
          })}
        </AnimatePresence>

        {/* Cursor */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="flex items-center gap-2 mt-2"
        >
          <Zap className="h-3 w-3 text-primary animate-pulse" />
          <span className="text-primary">agentforce</span>
          <span className="text-muted-foreground">›</span>
          <motion.span
            animate={{ opacity: [1, 0] }}
            transition={{ duration: 0.8, repeat: Infinity }}
            className="w-2 h-4 bg-primary"
          />
        </motion.div>
      </div>
    </motion.div>
  );
}
