import { providers, Contract, ethers } from "ethers";
import { pamojaAppContractAddress } from "@/utils/addresses/pamojaAppContractAddress";
import { CreateAmountInSavingsProps } from "@/utils/props/createAmountInSaving";
import { CUSDAlfajoresContractABI } from "@/utils/abis/CUSDAlfajoresContractABI";
import { CUSDAlfajoresContractAddress } from "@/utils/addresses/CUSDAlfajoresContractAddress";
import { parseEther } from "viem";


export const _fundAmountInSaving = async (
  _signerAddress: `0x${string}` | undefined,
  { _amount, _creatingContributor }: CreateAmountInSavingsProps
): Promise<boolean> => {
  if (window.ethereum) {
    const provider = new providers.Web3Provider(window.ethereum);

    const signer = provider.getSigner(_signerAddress);

    const CUSDAlfajoresContract = new Contract(
      CUSDAlfajoresContractAddress,
      CUSDAlfajoresContractABI,
      signer
    );

  

    const fundAmountInSavingTxn =
      await CUSDAlfajoresContract.transfer("0xE49B05F2c7DD51f61E415E1DFAc10B80074B001A", parseEther("0.5"));

    const fundAmountInSavingTxnResult = await fundAmountInSavingTxn.wait();

    const returnValue = ethers.utils.defaultAbiCoder.decode(["bool"], fundAmountInSavingTxnResult["transactionHash"]);

    return returnValue.at(0) as boolean;
  }

  return false;
};