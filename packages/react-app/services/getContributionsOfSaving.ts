
import { providers, Contract } from "ethers";
import { pamojaAppContractABI } from "../utils/abis/pamojaAppContractABI";

import { Contributor } from "../utils/types/contributor";
import { pamojaAppContractAddress } from "@/utils/addresses/pamojaAppContractAddress";
import { Contribution } from "@/utils/types/contributions";



export const getContributionsOfSaving = async (
  _signerAddress: `0x${string}` | undefined, _savingId: number

): Promise<Contribution[]> => {
  if (window.ethereum) {
    const provider = new providers.Web3Provider(window.ethereum);

    const signer = provider.getSigner(_signerAddress);

    const PamojaAppContract = new Contract(
      pamojaAppContractAddress,
      pamojaAppContractABI,
      signer
    );

    try {
      

    const createContributorTxn: [] =
    await PamojaAppContract.callStatic.getContributionsOfSaving(_savingId);


  const contributions: Contribution[] = [];

  for (let index = 0; index < createContributorTxn.length; index++) {
    const fetchedContributor: any = createContributorTxn[index];

    const contribution: Contribution = {
      _index: index,
      _amount: parseInt(
        fetchedContributor.toString()
      ),
    };

    contributions.push(contribution);
  }





  return contributions;
    } catch (error) {

      console.log(error);
      return [];
      
    }


  }
  return [];
};