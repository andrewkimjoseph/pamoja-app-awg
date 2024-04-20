import { providers, Contract, ethers } from "ethers";
import { pamojaAppContractABI } from "../utils/abis/pamojaAppContractABI";
import { pamojaAppContractAddress } from "@/utils/addresses/pamojaAppContractAddress";
import { CreateNewSavingProps } from "@/utils/props/createAmountInSaving";
import { _fundAmountInSaving } from "./fundAmountInSaving";
import { AddNewContributorToSavingProps } from "@/utils/props/updateContributorInSaving";

export const addNewContributorToSaving = async (
  _signerAddress: `0x${string}` | undefined,
  { _savingId, _newContributorAddress }: AddNewContributorToSavingProps
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
      const createAmountInSavingTxn =
        await PamojaAppContract.addNewContributorToSaving(
          _savingId,
          _newContributorAddress
        );

      return true;
    } catch (error) {
      console.log(error);
      return false;
    }
  } else {
    return false;

  }

};
