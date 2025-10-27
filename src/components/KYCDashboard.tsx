import { useState, useEffect } from "react";
import { Shield, Upload, FileCheck, Clock, CheckCircle, AlertTriangle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { useAccount } from "wagmi";
import { useCreateKYCRecord, useGetKYCRecord, useGetUserReputation } from "@/hooks/useContract";
import DocumentUploadDialog from "@/components/DocumentUploadDialog";
import VerificationReportDialog from "@/components/VerificationReportDialog";

interface VerificationStep {
  id: string;
  title: string;
  status: "pending" | "processing" | "completed" | "failed";
  description: string;
}

const KYCDashboard = () => {
  const { address, isConnected } = useAccount();
  const { createRecord, isLoading: isCreatingRecord } = useCreateKYCRecord();
  const { reputation, isLoading: isLoadingReputation } = useGetUserReputation(address || "0x0");
  
  const [uploadDialogOpen, setUploadDialogOpen] = useState(false);
  const [reportDialogOpen, setReportDialogOpen] = useState(false);
  const [kycRecordId, setKycRecordId] = useState<number | null>(null);
  
  const [verificationSteps, setVerificationSteps] = useState<VerificationStep[]>([
    {
      id: "upload",
      title: "Document Upload",
      status: "completed",
      description: "Identity documents encrypted and uploaded"
    },
    {
      id: "fhe",
      title: "FHE Processing",
      status: "processing", 
      description: "Homomorphic encryption verification in progress"
    },
    {
      id: "verification",
      title: "Identity Verification",
      status: "pending",
      description: "Awaiting FHE computation results"
    },
    {
      id: "compliance",
      title: "Compliance Check",
      status: "pending",
      description: "AML and sanctions screening"
    }
  ]);

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "completed":
        return <CheckCircle className="w-4 h-4 text-trust-primary" />;
      case "processing":
        return <Clock className="w-4 h-4 text-security-blue animate-spin" />;
      case "failed":
        return <AlertTriangle className="w-4 h-4 text-destructive" />;
      default:
        return <Clock className="w-4 h-4 text-muted-foreground" />;
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "completed":
        return <Badge className="bg-trust-primary/20 text-trust-primary">Completed</Badge>;
      case "processing":
        return <Badge className="bg-security-blue/20 text-security-blue">Processing</Badge>;
      case "failed":
        return <Badge variant="destructive">Failed</Badge>;
      default:
        return <Badge variant="secondary">Pending</Badge>;
    }
  };

  const handleCreateKYC = async () => {
    if (!isConnected || !address) {
      alert("Please connect your wallet first");
      return;
    }

    try {
      // In a real implementation, you would encrypt the data using FHE
      // For now, we'll use placeholder values
      const metadataHash = `0x${Math.random().toString(16).substr(2, 8)}`;
      const complianceLevel = "0x0000000000000000000000000000000000000000000000000000000000000001"; // Level 1
      const verificationScore = "0x0000000000000000000000000000000000000000000000000000000000000080"; // Score 80
      const riskRating = "0x0000000000000000000000000000000000000000000000000000000000000000"; // Low risk
      const inputProof = "0x"; // Placeholder proof

      await createRecord({
        args: [metadataHash, complianceLevel, verificationScore, riskRating, inputProof]
      });

      // Update verification steps to show completion
      setVerificationSteps(prev => prev.map(step => 
        step.id === "verification" ? { ...step, status: "completed" as const } : step
      ));
    } catch (error) {
      console.error("Error creating KYC record:", error);
      alert("Failed to create KYC record. Please try again.");
    }
  };

  const completedSteps = verificationSteps.filter(step => step.status === "completed").length;
  const progressPercentage = (completedSteps / verificationSteps.length) * 100;

  return (
    <div className="space-y-6">
      {/* Verification Overview */}
      <Card className="bg-gradient-to-r from-card to-primary/5 border-primary/20">
        <CardHeader>
          <CardTitle className="flex items-center gap-3">
            <Shield className="w-6 h-6 text-primary" />
            KYC Verification Status
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-sm text-muted-foreground">Overall Progress</span>
            <span className="text-sm font-semibold">{completedSteps}/{verificationSteps.length} steps</span>
          </div>
          <Progress value={progressPercentage} className="h-2" />
          <p className="text-sm text-muted-foreground">
            Your identity verification is being processed using Fully Homomorphic Encryption to ensure 
            your documents remain private throughout the verification process.
          </p>
        </CardContent>
      </Card>

      {/* Verification Steps */}
      <div className="grid gap-4">
        <h3 className="text-lg font-semibold">Verification Steps</h3>
        {verificationSteps.map((step, index) => (
          <Card key={step.id} className="bg-card/50">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="flex items-center justify-center w-8 h-8 rounded-full bg-muted">
                    {getStatusIcon(step.status)}
                  </div>
                  <div>
                    <h4 className="font-medium">{step.title}</h4>
                    <p className="text-sm text-muted-foreground">{step.description}</p>
                  </div>
                </div>
                {getStatusBadge(step.status)}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Action Buttons */}
      <div className="flex gap-3 flex-wrap">
        <Button variant="premium" className="gap-2" onClick={() => setUploadDialogOpen(true)}>
          <Upload className="w-4 h-4" />
          Upload New Documents
        </Button>
        <Button 
          variant="outline" 
          className="gap-2" 
          onClick={handleCreateKYC}
          disabled={!isConnected || isCreatingRecord}
        >
          <Shield className="w-4 h-4" />
          {isCreatingRecord ? "Creating KYC..." : "Create KYC Record"}
        </Button>
        <Button variant="outline" className="gap-2" onClick={() => setReportDialogOpen(true)}>
          <FileCheck className="w-4 h-4" />
          View Verification Report
        </Button>
      </div>

      {/* Wallet Connection Status */}
      {!isConnected && (
        <Card className="bg-yellow-50 border-yellow-200">
          <CardContent className="pt-6">
            <div className="flex items-center gap-3">
              <AlertTriangle className="w-5 h-5 text-yellow-600" />
              <div>
                <p className="font-medium text-yellow-800">Wallet Not Connected</p>
                <p className="text-sm text-yellow-700">
                  Please connect your wallet to create KYC records and interact with the smart contract.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Dialogs */}
      <DocumentUploadDialog 
        open={uploadDialogOpen} 
        onOpenChange={setUploadDialogOpen} 
      />
      <VerificationReportDialog 
        open={reportDialogOpen} 
        onOpenChange={setReportDialogOpen} 
      />
    </div>
  );
};

export default KYCDashboard;