import { providers, Contract, ethers, BigNumber } from "ethers";
import { pamojaAppContractABI } from "../utils/abis/pamojaAppContractABI";

import { pamojaAppContractAddress } from "@/utils/addresses/pamojaAppContractAddress";
import { GetRecipientContributorOfSaving } from "@/utils/props/getRecipientContributorOfSaving";
import { Contribution } from "@/utils/types/contributions";
import { Contributor } from "@/utils/types/contributor";

export const getRecipientContributorOfSaving = async (
  _signerAddress: `0x${string}` | undefined,
  { _savingId }: GetRecipientContributorOfSaving
): Promise<`0x${string}` | undefined> => {

  let recipientAddress: `0x${string}` | undefined = undefined;

  if (window.ethereum) {
    const provider = new providers.Web3Provider(window.ethereum);

    const signer = provider.getSigner(_signerAddress);

    const PamojaAppContract = new Contract(
      pamojaAppContractAddress,
      pamojaAppContractABI,
      signer
    );

    try {
      const recipientContributorAddressOfSaving=
        await PamojaAppContract.callStatic.getRecipientContributorAddressOfSaving(
          _savingId
        );

      recipientAddress = recipientContributorAddressOfSaving;

      return recipientAddress;
    } catch (error) {
      console.log(error);


      return recipientAddress;
    }
  }

  return recipientAddress;
};
