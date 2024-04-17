
import { providers, Contract } from "ethers";
import { pamojaAppContractABI } from "../utils/abis/pamojaAppContractABI";

import { Contributor } from "../utils/types/contributor";
import { pamojaAppContractAddress } from "@/utils/addresses/pamojaAppContractAddress";
import { Contributions } from "@/utils/types/contributions";



export const getContributionsOfContributor = async (
  _signerAddress: `0x${string}` | undefined,

): Promise<Contributions[]> => {
  if (window.ethereum) {
    const provider = new providers.Web3Provider(window.ethereum);

    const signer = provider.getSigner(_signerAddress);

    const PamojaAppContract = new Contract(
      pamojaAppContractAddress,
      pamojaAppContractABI,
      signer
    );

    const createContributorTxn: [] =
      await PamojaAppContract.callStatic.getContributionsOfContributor(_signerAddress);


    const contributions: Contributions[] = [];

    for (let index = 0; index < createContributorTxn.length; index++) {
      const fetchedContributor: any = createContributorTxn[index];

      const contribution: Contributions = {
        _index: index,
        _amount: parseInt(
          fetchedContributor.toString()
        ),
      };

      contributions.push(contribution);
    }




    return contributions;

  }
  return [];
};