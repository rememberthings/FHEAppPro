import Header from "@/components/Header";
import VerificationForm from "@/components/VerificationForm";

const Verify = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container mx-auto px-6 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold mb-4 bg-gradient-to-r from-primary to-trust-primary bg-clip-text text-transparent">
              Identity Verification
            </h1>
            <p className="text-muted-foreground text-lg">
              Upload your documents for secure FHE-powered verification
            </p>
          </div>
          <VerificationForm />
        </div>
      </main>
    </div>
  );
};

export default Verify;