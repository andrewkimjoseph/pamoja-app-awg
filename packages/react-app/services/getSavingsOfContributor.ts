import { providers, Contract } from "ethers";
import { pamojaAppContractABI } from "../utils/abis/pamojaAppContractABI";

import { Contributor } from "../utils/types/contributor";
import { pamojaAppContractAddress } from "@/utils/addresses/pamojaAppContractAddress";
import { Contribution } from "@/utils/types/contributions";
import { Saving } from "@/utils/types/saving";

export const getSavingsOfContributor = async (
  _signerAddress: `0x${string}` | undefined,   _contributorAddress: `0x${string}` | undefined
): Promise <Saving[] > => {
  let savings: Saving[] = [];
  if (window.ethereum) {
    const provider = new providers.Web3Provider(window.ethereum);

    const signer = provider.getSigner(_signerAddress);

    const PamojaAppContract = new Contract(
      pamojaAppContractAddress,
      pamojaAppContractABI,
      signer
    );

    try {
      const getSavingsOfContributorTxn: [] =
        await PamojaAppContract.callStatic.getSavingsOfContributor(
          _contributorAddress
        );

      

      for (let index = 0; index < getSavingsOfContributorTxn.length; index++) {
        const fetchedSaving: any = getSavingsOfContributorTxn[index];

        const saving: Saving = {
          _id: parseInt(fetchedSaving["_id"].toString()),
          _creatingContributor: fetchedSaving["_creatingContributor"],
        };

        savings.push(saving);
      }


      return savings;
    } catch (error) {
      console.log(error);
      return [];
    }
  }
  return [];
};
