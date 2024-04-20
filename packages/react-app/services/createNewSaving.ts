import { providers, Contract, ethers } from "ethers";
import { pamojaAppContractABI } from "../utils/abis/pamojaAppContractABI";
import { pamojaAppContractAddress } from "@/utils/addresses/pamojaAppContractAddress";
import { CreateNewSavingProps } from "@/utils/props/createAmountInSaving";
import { _fundAmountInSaving } from "./fundAmountInSaving";

export const createNewSaving = async (
  _signerAddress: `0x${string}` | undefined,
  { _amount, _creatingContributor }: CreateNewSavingProps
) => {
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
        await PamojaAppContract.createNewSaving(
          _amount,
          _creatingContributor
        );

      await createAmountInSavingTxn.wait();
    } catch (error) {}
  }
};
