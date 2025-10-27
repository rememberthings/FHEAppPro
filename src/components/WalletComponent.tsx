import { useState, useEffect } from "react";
import { Wallet, Check, AlertCircle, Copy } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useAccount, useBalance, useConnect, useDisconnect } from "wagmi";
import walletIcon from "@/assets/wallet-icon.png";

const WalletComponent = () => {
  const { address, isConnected } = useAccount();
  const { data: balance } = useBalance({
    address: address,
  });
  const { connect, connectors } = useConnect();
  const { disconnect } = useDisconnect();

  const copyAddress = () => {
    if (address) {
      navigator.clipboard.writeText(address);
    }
  };

  const formatAddress = (addr: string) => {
    return `${addr.slice(0, 6)}...${addr.slice(-4)}`;
  };

  const handleConnect = () => {
    if (isConnected) {
      disconnect();
    } else {
      connect({ connector: connectors[0] });
    }
  };

  return (
    <Card className="bg-gradient-to-br from-card to-card/80 border-border/50">
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center gap-3 text-lg">
          <img src={walletIcon} alt="Wallet" className="w-6 h-6" />
          Wallet Connection
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className={`w-3 h-3 rounded-full ${isConnected ? 'bg-trust-primary' : 'bg-muted-foreground'}`} />
            <span className="text-sm text-muted-foreground">
              {isConnected ? 'Connected' : 'Not Connected'}
            </span>
          </div>
          <Badge variant={isConnected ? "default" : "secondary"} className="gap-1">
            {isConnected ? (
              <>
                <Check className="w-3 h-3" />
                Active
              </>
            ) : (
              <>
                <AlertCircle className="w-3 h-3" />
                Inactive
              </>
            )}
          </Badge>
        </div>

        {isConnected && address && (
          <div className="space-y-3">
            <div className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
              <div>
                <p className="text-xs text-muted-foreground">Address</p>
                <p className="text-sm font-mono">{formatAddress(address)}</p>
              </div>
              <Button variant="ghost" size="icon" onClick={copyAddress}>
                <Copy className="w-4 h-4" />
              </Button>
            </div>
            
            {balance && (
              <div className="grid grid-cols-2 gap-3 text-center">
                <div className="p-3 rounded-lg bg-muted/30">
                  <p className="text-lg font-semibold text-trust-primary">
                    {parseFloat(balance.formatted).toFixed(4)}
                  </p>
                  <p className="text-xs text-muted-foreground">{balance.symbol}</p>
                </div>
                <div className="p-3 rounded-lg bg-muted/30">
                  <p className="text-lg font-semibold text-premium-gold">
                    ${(parseFloat(balance.formatted) * 3000).toFixed(2)}
                  </p>
                  <p className="text-xs text-muted-foreground">USD</p>
                </div>
              </div>
            )}
          </div>
        )}

        <Button 
          onClick={handleConnect} 
          variant={isConnected ? "outline" : "default"}
          className="w-full gap-2"
        >
          <Wallet className="w-4 h-4" />
          {isConnected ? "Disconnect" : "Connect Wallet"}
        </Button>
      </CardContent>
    </Card>
  );
};

export default WalletComponent;