import { Sidebar } from "@/components/dashboard/Sidebar";
import { Header } from "@/components/dashboard/Header";
import { StatsGrid } from "@/components/dashboard/StatsGrid";
import { DormantAssets } from "@/components/dashboard/DormantAssets";
import { ProfitabilityLens } from "@/components/dashboard/ProfitabilityLens";
import { MatchingMap } from "@/components/dashboard/MatchingMap";
import { useEffect } from "react";
import { AILiveLog } from "@/components/dashboard/AILiveLog";

const Index = () => {
  useEffect(() => {
    document.title = "Dashboard | LogiShare AI - Intelligent Logistics Management";
  }, []);

  return (
    <div className="min-h-screen bg-background">
        {/* Background Effects */}
        <div className="fixed inset-0 pointer-events-none">
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
          <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-success/5 rounded-full blur-3xl" />
        </div>

        <Sidebar />
        <Header />

        {/* Main Content */}
        <main className="ml-64 pt-16 min-h-screen">
          <div className="p-6 space-y-6">
            {/* Page Title */}
            <div className="mb-2">
              <h1 className="text-2xl font-bold text-foreground">Dashboard</h1>
              <p className="text-sm text-muted-foreground">Welcome back. Here's your fleet overview.</p>
            </div>

            {/* Stats Grid */}
            <StatsGrid />

            {/* Main Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Left Column */}
              <div className="space-y-6">
                <DormantAssets />
                <AILiveLog />
              </div>

              {/* Right Column */}
              <div className="space-y-6">
                <ProfitabilityLens />
                <MatchingMap />
              </div>
            </div>
          </div>
        </main>
      </div>
  );
};

export default Index;
