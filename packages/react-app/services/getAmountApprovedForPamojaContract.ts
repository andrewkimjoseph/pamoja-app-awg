import { providers, Contract } from "ethers";
import { pamojaAppContractABI } from "../utils/abis/pamojaAppContractABI";

import { Contributor } from "../utils/types/contributor";
import { pamojaAppContractAddress } from "@/utils/addresses/pamojaAppContractAddress";
import { CUSDAlfajoresContractAddress } from "@/utils/addresses/CUSDAlfajoresContractAddress";
import { CUSDAlfajoresContractABI } from "@/utils/abis/CUSDAlfajoresContractABI";

export const getAmountApprovedForPamojaContract = async (
  _signerAddress: `0x${string}` | undefined
): Promise<number> => {
  let approvedAmount: number = 0;

  if (window.ethereum) {
    const provider = new providers.Web3Provider(window.ethereum);

    const signer = provider.getSigner(_signerAddress);

    const CUSDAlfajoresContract = new Contract(
      CUSDAlfajoresContractAddress,
      CUSDAlfajoresContractABI,
      signer
    );

    try {
      approvedAmount = await CUSDAlfajoresContract.callStatic.allowance(
        _signerAddress,
        pamojaAppContractAddress,
      );

      return parseInt(approvedAmount.toString());
    } catch (error) {
      return approvedAmount;
    }
  }
  return approvedAmount;
};
