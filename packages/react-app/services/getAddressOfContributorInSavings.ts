import { providers, Contract } from "ethers";
import { pamojaAppContractABI } from "../utils/abis/pamojaAppContractABI";

import { Contributor } from "../utils/types/contributor";
import { pamojaAppContractAddress } from "@/utils/addresses/pamojaAppContractAddress";

type GetAddressOfContributorInSavings = {
  _savingId: number;
  _contributorIndex: number;
};
export const getAddressOfContributorInSavings = async (
  _signerAddress: `0x${string}` | undefined,
  { _savingId, _contributorIndex }: GetAddressOfContributorInSavings
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
        PamojaAppContract.callStatic.getAddressOfContributorInSavings(
          _savingId,
          _contributorIndex
        );


      address = getAddressOfContributorInSavingsTxn.toString();

      return getAddressOfContributorInSavingsTxn;
    } catch (error) {
      return address;
    }
  }
  return address;
};
