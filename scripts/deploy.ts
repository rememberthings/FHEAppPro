import { ethers } from "hardhat";

async function main() {
  console.log("Deploying TrustConfidentialVerify contract...");

  // Get the contract factory
  const TrustConfidentialVerify = await ethers.getContractFactory("TrustConfidentialVerify");

  // Deploy the contract
  // You can set different verifier and compliance officer addresses
  const verifierRole = process.env.VERIFIER_ROLE || "0x742d35Cc6Ebb9B4B8A8B4B8A8B4B8A8B4B8A4A8B";
  const complianceOfficer = process.env.COMPLIANCE_OFFICER || "0x742d35Cc6Ebb9B4B8A8B4B8A8B4B8A8B4B8A4A8B";

  const contract = await TrustConfidentialVerify.deploy(verifierRole, complianceOfficer);

  await contract.waitForDeployment();

  const contractAddress = await contract.getAddress();
  console.log("TrustConfidentialVerify deployed to:", contractAddress);

  // Verify the deployment
  console.log("Contract deployed successfully!");
  console.log("Verifier Role:", verifierRole);
  console.log("Compliance Officer:", complianceOfficer);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
