import { useWriteContract, useReadContract } from 'wagmi';
import { TrustConfidentialVerifyABI } from '../lib/contract';

const CONTRACT_ADDRESS = '0x0000000000000000000000000000000000000000' as `0x${string}`; // Will be set after deployment

export const useSubmitVerificationRequest = () => {
  const { writeContract, isPending, error } = useWriteContract();

  const submitRequest = async (args: any[]) => {
    writeContract({
      address: CONTRACT_ADDRESS,
      abi: TrustConfidentialVerifyABI,
      functionName: 'submitVerificationRequest',
      args,
    });
  };

  return { submitRequest, isLoading: isPending, error };
};

export const useCreateKYCRecord = () => {
  const { writeContract, isPending, error } = useWriteContract();

  const createRecord = async (args: any[]) => {
    writeContract({
      address: CONTRACT_ADDRESS,
      abi: TrustConfidentialVerifyABI,
      functionName: 'createKYCRecord',
      args,
    });
  };

  return { createRecord, isLoading: isPending, error };
};

export const useCreateDocumentProof = () => {
  const { writeContract, isPending, error } = useWriteContract();

  const createProof = async (args: any[]) => {
    writeContract({
      address: CONTRACT_ADDRESS,
      abi: TrustConfidentialVerifyABI,
      functionName: 'createDocumentProof',
      args,
    });
  };

  return { createProof, isLoading: isPending, error };
};

export const useGetVerificationRequest = (requestId: number) => {
  const { data, isLoading, error } = useReadContract({
    address: CONTRACT_ADDRESS,
    abi: TrustConfidentialVerifyABI,
    functionName: 'getVerificationRequestInfo',
    args: [BigInt(requestId)],
  });

  return { requestInfo: data, isLoading, error };
};

export const useGetKYCRecord = (recordId: number) => {
  const { data, isLoading, error } = useReadContract({
    address: CONTRACT_ADDRESS,
    abi: TrustConfidentialVerifyABI,
    functionName: 'getKYCRecordInfo',
    args: [BigInt(recordId)],
  });

  return { recordInfo: data, isLoading, error };
};

export const useGetUserReputation = (userAddress: string) => {
  const { data, isLoading, error } = useReadContract({
    address: CONTRACT_ADDRESS,
    abi: TrustConfidentialVerifyABI,
    functionName: 'getUserReputation',
    args: [userAddress as `0x${string}`],
  });

  return { reputation: data, isLoading, error };
};
