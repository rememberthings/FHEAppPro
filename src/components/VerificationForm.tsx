import { useState } from "react";
import { Upload, FileText, Shield, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";

const VerificationForm = () => {
  const [uploadedFiles, setUploadedFiles] = useState<File[]>([]);
  const [isProcessing, setIsProcessing] = useState(false);
  const { toast } = useToast();

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files || []);
    setUploadedFiles([...uploadedFiles, ...files]);
    
    toast({
      title: "Files uploaded successfully",
      description: `${files.length} file(s) have been encrypted and uploaded securely.`,
    });
  };

  const handleStartVerification = () => {
    if (uploadedFiles.length === 0) {
      toast({
        title: "No files uploaded",
        description: "Please upload at least one document to start verification.",
        variant: "destructive",
      });
      return;
    }

    setIsProcessing(true);
    
    toast({
      title: "Verification started",
      description: "Your documents are being processed using FHE encryption.",
    });

    // Simulate processing
    setTimeout(() => {
      setIsProcessing(false);
      toast({
        title: "Verification initiated",
        description: "You can track progress in your dashboard.",
      });
    }, 3000);
  };

  return (
    <div className="space-y-6">
      {/* Upload Section */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Upload className="w-5 h-5" />
            Document Upload
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="border-2 border-dashed border-muted-foreground/25 rounded-lg p-8 text-center">
            <Upload className="w-12 h-12 mx-auto mb-4 text-muted-foreground" />
            <Label htmlFor="file-upload" className="cursor-pointer">
              <span className="text-lg font-medium text-primary hover:text-primary/80">
                Click to upload documents
              </span>
              <p className="text-sm text-muted-foreground mt-2">
                Supported formats: PDF, JPG, PNG (Max 10MB per file)
              </p>
            </Label>
            <Input
              id="file-upload"
              type="file"
              multiple
              accept=".pdf,.jpg,.jpeg,.png"
              onChange={handleFileUpload}
              className="hidden"
            />
          </div>
          
          {uploadedFiles.length > 0 && (
            <div className="space-y-2">
              <Label className="text-sm font-medium">Uploaded Files:</Label>
              {uploadedFiles.map((file, index) => (
                <div key={index} className="flex items-center gap-2 p-2 bg-muted/50 rounded">
                  <FileText className="w-4 h-4 text-trust-primary" />
                  <span className="text-sm">{file.name}</span>
                  <Check className="w-4 h-4 text-trust-primary ml-auto" />
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Security Info */}
      <Card className="bg-gradient-to-r from-trust-primary/5 to-security-blue/5 border-trust-primary/20">
        <CardContent className="pt-6">
          <div className="flex items-start gap-3">
            <Shield className="w-5 h-5 text-trust-primary mt-0.5" />
            <div>
              <h3 className="font-semibold text-trust-primary mb-2">Fully Homomorphic Encryption</h3>
              <p className="text-sm text-muted-foreground">
                Your documents are encrypted using advanced FHE technology, ensuring they remain completely 
                private throughout the verification process. Even our servers cannot see your unencrypted data.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Action Button */}
      <div className="flex justify-center">
        <Button 
          size="lg" 
          className="gap-2 min-w-48" 
          onClick={handleStartVerification}
          disabled={isProcessing}
        >
          {isProcessing ? (
            <>
              <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              Processing...
            </>
          ) : (
            <>
              <Shield className="w-4 h-4" />
              Start Verification
            </>
          )}
        </Button>
      </div>
    </div>
  );
};

export default VerificationForm;