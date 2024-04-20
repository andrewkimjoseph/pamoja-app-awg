import { providers, Contract } from "ethers";
import { pamojaAppContractABI } from "../utils/abis/pamojaAppContractABI";

import { Contributor } from "../utils/types/contributor";
import { pamojaAppContractAddress } from "@/utils/addresses/pamojaAppContractAddress";

export const getContributor = async (
  _signerAddress: `0x${string}` | undefined, _contributorAddress: string
): Promise<Contributor | null> => {
  let contributor: Contributor | null = null;

  if (window.ethereum) {
    const provider = new providers.Web3Provider(window.ethereum);

    const signer = provider.getSigner(_signerAddress);

    const PamojaAppContract = new Contract(
      pamojaAppContractAddress,
      pamojaAppContractABI,
      signer
    );

    try {

        const checkIfContributorExists : boolean =
        await PamojaAppContract.callStatic.checkIfContributorExists(_contributorAddress);

        if (checkIfContributorExists) {

            const getContributorTxn =
            await PamojaAppContract.callStatic.getContributor(_contributorAddress);
    
          contributor = {
            _id: parseInt(getContributorTxn["_id"].toString()),
            _address: getContributorTxn["_address"],
            _username: getContributorTxn["_username"],
          };
    
          return contributor;

        }

        return contributor;




    } catch (error) {
      return contributor;
    }
  }
  return contributor;
};
