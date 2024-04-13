import { generatePrivateKey } from 'viem/accounts';
import { concat, encodeFunctionData, keccak256, toHex } from 'viem';
import { KeystoreABI } from '@/components/actions/constants/ABI/KeystoreABI';
import { StealthSafeFactoryABI } from '@/components/actions/constants/ABI/StealthSafeFactoryABI';
import axios from 'axios';
import { RELAYER } from '@/components/actions/constants/backend';
import { KEYSTORE, STEALTH_SAFE_FACTORY } from '@/components/actions/constants/contractAddress';

/**
 * Generate a stealth zk safe by deploying it on chain, and returns the address along with the secret used to generate it
 */
export const generateStealthZkSafe = async (keyStoreIndex: number): Promise<{
  randomSecret: `0x${string}`,
  safeAddress: `0x${string}`
}> => {

  // prepare the stelathInit
  const randomSecret = generatePrivateKey();
  const stealthInit = keccak256(concat([randomSecret, toHex(keyStoreIndex, {size: 32})]));

  // prepare the calldata
  const contractCallData = encodeFunctionData({
    abi: StealthSafeFactoryABI,
    functionName: 'deploySafe',
    args: [
      stealthInit
    ]
  });

  const response = await axios.post(RELAYER, {
    txData: contractCallData,
    to: STEALTH_SAFE_FACTORY
  });

  return {
    randomSecret,
    safeAddress: response.data.stealthSafeAddress
  };
}
