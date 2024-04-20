import { providers, Contract } from "ethers";
import { pamojaAppContractABI } from "../utils/abis/pamojaAppContractABI";

import { Contributor } from "../utils/types/contributor";
import { pamojaAppContractAddress } from "@/utils/addresses/pamojaAppContractAddress";

export const getCreatingContributor = async (
  _signerAddress: `0x${string}` | undefined,
  _savingId: number
): Promise<string | null> => {
  let address: string | null = null;

  if (window.ethereum) {
    const provider = new providers.Web3Provider(window.ethereum);

    const signer = provider.getSigner(_signerAddress);

    const PamojaAppContract = new Contract(
      pamojaAppContractAddress,
      pamojaAppContractABI,
      signer
    );

    try {
      const getAddressOfContributorInSavingsTxn =
        PamojaAppContract.callStatic.getCreatingContributor(
          _savingId,
        );


      address = getAddressOfContributorInSavingsTxn.toString();

      return getAddressOfContributorInSavingsTxn;
    } catch (error) {
      return address;
    }
  }
  return address;
};
