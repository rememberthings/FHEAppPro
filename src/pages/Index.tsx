import Header from "@/components/Header";
import WalletComponent from "@/components/WalletComponent";
import KYCDashboard from "@/components/KYCDashboard";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container mx-auto px-6 py-8">
        <div className="grid lg:grid-cols-4 gap-6">
          {/* Sidebar */}
          <div className="lg:col-span-1 space-y-6">
            <WalletComponent />
            
            {/* Quick Stats */}
            <div className="grid gap-4">
              <div className="p-4 rounded-lg bg-card border">
                <div className="text-2xl font-bold text-trust-primary">98.7%</div>
                <div className="text-sm text-muted-foreground">Verification Success Rate</div>
              </div>
              <div className="p-4 rounded-lg bg-card border">
                <div className="text-2xl font-bold text-security-blue">24/7</div>
                <div className="text-sm text-muted-foreground">Processing Uptime</div>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            <KYCDashboard />
          </div>
        </div>
      </main>
    </div>
  );
};

export default Index;
