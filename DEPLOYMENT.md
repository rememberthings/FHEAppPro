# Deployment Guide

## Prerequisites

1. **Node.js** (v18 or higher)
2. **npm** or **yarn**
3. **Git**
4. **Vercel account** (for frontend deployment)
5. **Infura/Alchemy account** (for blockchain access)
6. **WalletConnect Project ID** (for wallet integration)

## Environment Setup

1. Copy the environment example file:
```bash
cp env.example .env
```

2. Fill in the required environment variables:
```bash
# Network Configuration
SEPOLIA_RPC_URL=https://sepolia.infura.io/v3/YOUR_INFURA_KEY
PRIVATE_KEY=your_private_key_here

# Contract Addresses (will be set after deployment)
VERIFIER_ROLE=0x742d35Cc6Ebb9B4B8A8B4B8A8B4B8A8B4B8A4A8B
COMPLIANCE_OFFICER=0x742d35Cc6Ebb9B4B8A8B4B8A8B4B8A8B4B8A4A8B

# API Keys
ETHERSCAN_API_KEY=your_etherscan_api_key_here

# WalletConnect Project ID (for RainbowKit)
NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID=your_walletconnect_project_id_here
```

## Smart Contract Deployment

### 1. Install Dependencies
```bash
npm install
```

### 2. Compile Contracts
```bash
npm run compile
```

### 3. Run Tests
```bash
npm run test
```

### 4. Deploy to Sepolia Testnet
```bash
npm run deploy
```

### 5. Verify Contract (Optional)
```bash
npx hardhat verify --network sepolia <CONTRACT_ADDRESS> <VERIFIER_ROLE> <COMPLIANCE_OFFICER>
```

## Frontend Deployment

### 1. Build the Project
```bash
npm run build
```

### 2. Deploy to Vercel

#### Option A: Using Vercel CLI
```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel

# Follow the prompts to configure your project
```

#### Option B: Using Vercel Dashboard
1. Go to [Vercel Dashboard](https://vercel.com/dashboard)
2. Click "New Project"
3. Import your GitHub repository
4. Configure build settings:
   - **Framework Preset**: Vite
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
   - **Install Command**: `npm install`

### 3. Environment Variables in Vercel
Add the following environment variables in your Vercel project settings:

- `NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID`: Your WalletConnect Project ID
- `NEXT_PUBLIC_CONTRACT_ADDRESS`: Your deployed contract address

## Post-Deployment Configuration

### 1. Update Contract Address
After deploying the smart contract, update the contract address in:
- Vercel environment variables
- Frontend configuration files

### 2. Set Verifier Roles
Update the verifier and compliance officer addresses in the smart contract:
```bash
# Set verifier role
npx hardhat run scripts/set-verifier.js --network sepolia

# Set compliance officer
npx hardhat run scripts/set-compliance-officer.js --network sepolia
```

### 3. Test the Deployment
1. Visit your deployed frontend URL
2. Connect a wallet
3. Test the KYC record creation
4. Verify that transactions are being recorded on-chain

## Troubleshooting

### Common Issues

1. **Build Failures**
   - Check Node.js version (should be v18+)
   - Clear node_modules and reinstall: `rm -rf node_modules && npm install`

2. **Contract Deployment Issues**
   - Verify RPC URL and private key
   - Ensure sufficient Sepolia ETH for gas fees
   - Check network connectivity

3. **Frontend Issues**
   - Verify environment variables are set correctly
   - Check browser console for errors
   - Ensure WalletConnect Project ID is valid

4. **Wallet Connection Issues**
   - Verify WalletConnect Project ID
   - Check network configuration
   - Ensure contract address is correct

### Support

For additional support:
- Check the project README
- Review the smart contract documentation
- Open an issue on GitHub

## Security Considerations

1. **Private Keys**: Never commit private keys to version control
2. **Environment Variables**: Use Vercel's environment variable system
3. **Contract Verification**: Always verify deployed contracts
4. **Access Control**: Regularly review and update verifier roles
5. **FHE Implementation**: Ensure proper FHE encryption for sensitive data

## Monitoring

1. **Contract Events**: Monitor contract events for verification requests
2. **Frontend Analytics**: Use Vercel Analytics for frontend monitoring
3. **Error Tracking**: Implement error tracking for production issues
4. **Performance**: Monitor gas usage and transaction costs
