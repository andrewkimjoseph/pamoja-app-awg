import { providers, Contract, ethers } from "ethers";
import { pamojaAppContractABI } from "../utils/abis/pamojaAppContractABI";
import { pamojaAppContractAddress } from "@/utils/addresses/pamojaAppContractAddress";
import { CreateNewSavingProps } from "@/utils/props/createAmountInSaving";
import { _fundAmountInSaving } from "./fundAmountInSaving";


type UpdateAmountForNewContributorInSaving = {
  _amount: number;
  _savingId: number;
  _newContributorAddress: string;

}
export const updateAmountForNewContributorInSaving = async (
  _signerAddress: `0x${string}` | undefined,
  { _amount, _savingId, _newContributorAddress }: UpdateAmountForNewContributorInSaving
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
      const updateAmountForNewContributorInSavingTxn =
        await PamojaAppContract.updateAmountForNewContributorInSaving(
          _amount,
          _savingId,
          _newContributorAddress
        );

      await updateAmountForNewContributorInSavingTxn.wait();
      return true;
    } catch (error) {
      return false;
    }
  } else {
    return false;
  }
};
