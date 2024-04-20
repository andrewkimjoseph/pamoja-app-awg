import { providers, Contract } from "ethers";
import { pamojaAppContractABI } from "../utils/abis/pamojaAppContractABI";

import { pamojaAppContractAddress } from "@/utils/addresses/pamojaAppContractAddress";
import { Saving } from "@/utils/types/saving";

type GetSaving = {
  _savingId: number;
  _creatingContributorAddress: string;
};

export const getSaving = async (
  _signerAddress: `0x${string}` | undefined,
  { _savingId, _creatingContributorAddress }: GetSaving
): Promise<Saving | null> => {
  let saving: Saving | null = null;
  if (window.ethereum) {
    const provider = new providers.Web3Provider(window.ethereum);

    const signer = provider.getSigner(_signerAddress);

    const PamojaAppContract = new Contract(
      pamojaAppContractAddress,
      pamojaAppContractABI,
      signer
    );

    try {
      const getSavingTxn = await PamojaAppContract.callStatic.getSaving(
        _savingId,
        _creatingContributorAddress
      );

      saving  = {
        _id: parseInt(getSavingTxn["_id"].toString()),
        _creatingContributor: getSavingTxn["_creatingContributor"],
        _amount: parseInt(getSavingTxn["_amount"].toString()),
      };


      return saving;
    } catch (error) {
      console.log(error);
      return saving;
    }
  }
  return saving;
};
