import { CheckCircle, Clock, AlertTriangle, FileText, Download, Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

interface VerificationReportDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const VerificationReportDialog = ({ open, onOpenChange }: VerificationReportDialogProps) => {
  const reportData = {
    status: "completed",
    verificationId: "VER-2024-001234",
    completedAt: "2024-01-15 14:30:22 UTC",
    documents: [
      { name: "Passport", status: "verified", confidence: 98.5 },
      { name: "Proof of Address", status: "verified", confidence: 96.2 },
      { name: "Bank Statement", status: "verified", confidence: 94.8 }
    ],
    checks: [
      { name: "Document Authenticity", status: "passed", details: "All security features verified" },
      { name: "Identity Matching", status: "passed", details: "Biometric verification successful" },
      { name: "AML Screening", status: "passed", details: "No sanctions list matches found" },
      { name: "PEP Check", status: "passed", details: "Not a politically exposed person" }
    ]
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "verified":
      case "passed":
        return <CheckCircle className="w-4 h-4 text-trust-primary" />;
      case "processing":
        return <Clock className="w-4 h-4 text-security-blue" />;
      case "failed":
        return <AlertTriangle className="w-4 h-4 text-destructive" />;
      default:
        return <Clock className="w-4 h-4 text-muted-foreground" />;
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "verified":
      case "passed":
        return <Badge className="bg-trust-primary/20 text-trust-primary">Verified</Badge>;
      case "processing":
        return <Badge className="bg-security-blue/20 text-security-blue">Processing</Badge>;
      case "failed":
        return <Badge variant="destructive">Failed</Badge>;
      default:
        return <Badge variant="secondary">Pending</Badge>;
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-4xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <FileText className="w-5 h-5" />
            Verification Report
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-6">
          {/* Report Header */}
          <Card className="bg-gradient-to-r from-trust-primary/5 to-security-blue/5 border-trust-primary/20">
            <CardContent className="pt-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <Label className="text-sm text-muted-foreground">Verification ID</Label>
                  <p className="font-mono text-sm">{reportData.verificationId}</p>
                </div>
                <div>
                  <Label className="text-sm text-muted-foreground">Status</Label>
                  <div className="flex items-center gap-2 mt-1">
                    {getStatusIcon(reportData.status)}
                    {getStatusBadge(reportData.status)}
                  </div>
                </div>
                <div>
                  <Label className="text-sm text-muted-foreground">Completed</Label>
                  <div className="flex items-center gap-2 mt-1">
                    <Calendar className="w-4 h-4 text-muted-foreground" />
                    <span className="text-sm">{reportData.completedAt}</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Document Verification */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Document Verification Results</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Document Type</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Confidence Score</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {reportData.documents.map((doc, index) => (
                    <TableRow key={index}>
                      <TableCell className="font-medium">{doc.name}</TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          {getStatusIcon(doc.status)}
                          {getStatusBadge(doc.status)}
                        </div>
                      </TableCell>
                      <TableCell>
                        <span className="font-medium text-trust-primary">{doc.confidence}%</span>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>

          {/* Compliance Checks */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Compliance Checks</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {reportData.checks.map((check, index) => (
                  <div key={index} className="flex items-center justify-between p-3 bg-muted/30 rounded-lg">
                    <div className="flex items-center gap-3">
                      {getStatusIcon(check.status)}
                      <div>
                        <p className="font-medium">{check.name}</p>
                        <p className="text-sm text-muted-foreground">{check.details}</p>
                      </div>
                    </div>
                    {getStatusBadge(check.status)}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Actions */}
          <div className="flex gap-3">
            <Button variant="outline" className="gap-2">
              <Download className="w-4 h-4" />
              Download PDF Report
            </Button>
            <Button onClick={() => onOpenChange(false)}>
              Close
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

const Label = ({ children, className }: { children: React.ReactNode; className?: string }) => (
  <div className={className}>{children}</div>
);

export default VerificationReportDialog;