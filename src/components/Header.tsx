import { Shield, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import trustSeal from "@/assets/trust-seal.png";

const Header = () => {
  return (
    <header className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-50">
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Logo and Trust Badge */}
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-3">
              <img src={trustSeal} alt="Trust Seal" className="w-8 h-8" />
              <div>
                <h1 className="text-xl font-bold bg-gradient-to-r from-primary to-trust-primary bg-clip-text text-transparent">
                  PrivateKYC
                </h1>
                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                  <Shield className="w-3 h-3" />
                  <span>FHE Confidential Verification</span>
                </div>
              </div>
            </div>
          </div>

          {/* Navigation */}
          <nav className="hidden md:flex items-center gap-6">
            <a href="/dashboard" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              Dashboard
            </a>
            <a href="/verify" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              Verify
            </a>
            <a href="/settings" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              Settings
            </a>
          </nav>

          {/* User Actions */}
          <div className="flex items-center gap-3">
            <Button variant="ghost" size="icon">
              <User className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;