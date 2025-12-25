import { motion } from "framer-motion";
import { MapPin, Truck, ArrowRight, Clock, Star } from "lucide-react";
import { Button } from "@/components/ui/button";

interface NearbyTruck {
  id: string;
  company: string;
  distance: string;
  eta: string;
  rating: number;
  pricePerKm: string;
  available: boolean;
}

const nearbyTrucks: NearbyTruck[] = [
  { id: "PL-4821", company: "TransEuropa GmbH", distance: "23 km", eta: "25 min", rating: 4.8, pricePerKm: "€1.12", available: true },
  { id: "DE-1937", company: "Baltic Freight", distance: "41 km", eta: "45 min", rating: 4.5, pricePerKm: "€1.08", available: true },
  { id: "CZ-7742", company: "Nord Logistics", distance: "67 km", eta: "1h 10m", rating: 4.9, pricePerKm: "€1.15", available: false },
];

export function MatchingMap() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.9 }}
      className="rounded-xl border border-border bg-card overflow-hidden h-full"
    >
      {/* Header */}
      <div className="flex items-center justify-between border-b border-border px-6 py-4">
        <div className="flex items-center gap-3">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-chart-5/10">
            <MapPin className="h-4 w-4 text-chart-5" />
          </div>
          <div>
            <h2 className="text-base font-semibold text-foreground">Matching Map</h2>
            <p className="text-xs text-muted-foreground">Nearby available trucks</p>
          </div>
        </div>
        <span className="rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary">
          {nearbyTrucks.filter(t => t.available).length} Available
        </span>
      </div>

      {/* Map Placeholder */}
      <div className="relative h-48 bg-muted/30 overflow-hidden">
        {/* Grid Background */}
        <div 
          className="absolute inset-0 opacity-30"
          style={{
            backgroundImage: 'linear-gradient(hsl(var(--border) / 0.5) 1px, transparent 1px), linear-gradient(90deg, hsl(var(--border) / 0.5) 1px, transparent 1px)',
            backgroundSize: '20px 20px',
          }}
        />

        {/* Animated Route */}
        <svg className="absolute inset-0 w-full h-full" viewBox="0 0 400 200">
          <motion.path
            d="M 50 100 Q 150 50, 200 100 T 350 100"
            fill="none"
            stroke="hsl(var(--primary))"
            strokeWidth="2"
            strokeDasharray="8 4"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 0.6 }}
            transition={{ duration: 2, delay: 1 }}
          />
        </svg>

        {/* Truck Markers */}
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 1.2, type: "spring" }}
          className="absolute left-[15%] top-[45%] flex h-8 w-8 items-center justify-center rounded-full bg-primary shadow-lg shadow-primary/30"
        >
          <Truck className="h-4 w-4 text-primary-foreground" />
        </motion.div>

        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 1.3, type: "spring" }}
          className="absolute left-[35%] top-[30%] flex h-6 w-6 items-center justify-center rounded-full bg-success shadow-lg shadow-success/30"
        >
          <Truck className="h-3 w-3 text-success-foreground" />
        </motion.div>

        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 1.4, type: "spring" }}
          className="absolute left-[55%] top-[55%] flex h-6 w-6 items-center justify-center rounded-full bg-success shadow-lg shadow-success/30"
        >
          <Truck className="h-3 w-3 text-success-foreground" />
        </motion.div>

        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 1.5, type: "spring" }}
          className="absolute left-[75%] top-[40%] flex h-6 w-6 items-center justify-center rounded-full bg-muted shadow-lg"
        >
          <Truck className="h-3 w-3 text-muted-foreground" />
        </motion.div>

        {/* Location Pin */}
        <motion.div
          initial={{ scale: 0, y: -20 }}
          animate={{ scale: 1, y: 0 }}
          transition={{ delay: 1.1, type: "spring" }}
          className="absolute right-[20%] top-[45%] flex flex-col items-center"
        >
          <MapPin className="h-8 w-8 text-chart-5 fill-chart-5" />
          <div className="h-2 w-2 rounded-full bg-chart-5/50 animate-ping" />
        </motion.div>
      </div>

      {/* Truck List */}
      <div className="divide-y divide-border">
        {nearbyTrucks.map((truck, index) => (
          <motion.div
            key={truck.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 + 1.2 }}
            className="flex items-center justify-between p-4 hover:bg-muted/30 transition-colors"
          >
            <div className="flex items-center gap-3">
              <div className={`flex h-10 w-10 items-center justify-center rounded-lg ${truck.available ? 'bg-success/10' : 'bg-muted'}`}>
                <Truck className={`h-5 w-5 ${truck.available ? 'text-success' : 'text-muted-foreground'}`} />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-xs font-medium text-muted-foreground">{truck.id}</span>
                  <div className="flex items-center gap-0.5">
                    <Star className="h-3 w-3 fill-warning text-warning" />
                    <span className="text-xs text-muted-foreground">{truck.rating}</span>
                  </div>
                </div>
                <p className="text-sm font-medium text-foreground">{truck.company}</p>
              </div>
            </div>

            <div className="hidden sm:flex items-center gap-4 text-xs text-muted-foreground">
              <div className="flex items-center gap-1">
                <ArrowRight className="h-3 w-3" />
                {truck.distance}
              </div>
              <div className="flex items-center gap-1">
                <Clock className="h-3 w-3" />
                {truck.eta}
              </div>
              <span className="font-medium text-foreground">{truck.pricePerKm}/km</span>
            </div>

            <Button 
              variant={truck.available ? "outline" : "ghost"} 
              size="sm"
              disabled={!truck.available}
            >
              {truck.available ? "Rent Truck" : "Unavailable"}
            </Button>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}
