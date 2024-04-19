import { providers, Contract } from "ethers";
import { pamojaAppContractABI } from "../utils/abis/pamojaAppContractABI";

import { Contributor } from "../utils/types/contributor";
import { pamojaAppContractAddress } from "@/utils/addresses/pamojaAppContractAddress";
import { Contribution } from "@/utils/types/contributions";

export const checkIfContributorIsCreatingContributor = async (
  _savingId: number,
  _signerAddress: `0x${string}` | undefined
): Promise<boolean> => {
  if (window.ethereum) {
    const provider = new providers.Web3Provider(window.ethereum);

    const signer = provider.getSigner(_signerAddress);

    const PamojaAppContract = new Contract(
      pamojaAppContractAddress,
      pamojaAppContractABI,
      signer
    );

    try {
      const checkIfContributorIsCreatingContributorTxn =
        await PamojaAppContract.callStatic.checkIfContributorIsCreatingContributor(
          _savingId,
          _signerAddress
        );

      return checkIfContributorIsCreatingContributorTxn as boolean;
    } catch (error) {
      console.log(error);
      return false;
    }
  }
  return false;
};
