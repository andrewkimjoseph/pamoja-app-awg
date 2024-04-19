
import React, { useEffect, useState } from "react";
import { getContract, formatEther, createPublicClient, http } from "viem";
import { celoAlfajores } from "viem/chains";
import { stableTokenABI } from "@celo/abis";
import { useAccount } from "wagmi";

// Define the address of the stable token contract
const STABLE_TOKEN_ADDRESS = "0x874069fa1eb16d44d622f2e0ca25eea172369bc1";

async function checkCUSDBalance(address: `0x${string}`) {
  const publicClient = createPublicClient({
    chain: celoAlfajores,
    transport: http(),
  });
  let StableTokenContract = getContract({
    address: STABLE_TOKEN_ADDRESS,
    abi: stableTokenABI,
    client: publicClient,

  });

  let balanceInBigNumber = await StableTokenContract.read.balanceOf([address]);

  let balanceInEthers = formatEther(balanceInBigNumber);

  return balanceInEthers;
}

const AboutPage: React.FC = () => {
  const [balance, setBalance] = useState<string | null>(null);
  const { address } = useAccount();

  useEffect(() => {
    const fetchBalance = async () => {
      try {
        const balance = await checkCUSDBalance(
          address as `0x${string}`
        );
        setBalance(balance);
      } catch (error) {
        console.error("Error fetching CUSD balance:", error);
      }
    };

    fetchBalance();
  }, []);

  const handleClick = async () => {
    try {
      const newBalance = await checkCUSDBalance(address as `0x${string}`);
      setBalance(newBalance);
    } catch (error) {
      console.error("Error fetching CUSD balance:", error);
    }
  };

  return (
    <div className="flex justify-center items-center h-screen flex-col">
      {balance && (
        <button
          className="bg-pa_one text-pa_two font-bold py-2 px-4 rounded mb-4"
          onClick={handleClick}
        >
          Check CUSD Balance
        </button>
      )}

      {balance && (
        <div className="text-center">Your CUSD balance: {balance} CUSD</div>
      )}
    </div>
  );
};

export default AboutPage;
