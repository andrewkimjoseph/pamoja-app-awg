import { providers, Contract, ethers } from "ethers";
import { pamojaAppContractABI } from "../utils/abis/pamojaAppContractABI";
import { pamojaAppContractAddress } from "@/utils/addresses/pamojaAppContractAddress";
import { CreateAmountInSavingsProps } from "@/utils/props/createAmountInSaving";
import { _fundAmountInSaving } from "./_fundAmountInSaving";

export const createAmountInSaving = async (
  _signerAddress: `0x${string}` | undefined,
  { _amount, _creatingContributor }: CreateAmountInSavingsProps
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
      const fundingSuccessful = await _fundAmountInSaving(_signerAddress, {
        _amount: _amount,
        _creatingContributor: _creatingContributor,
      });

      if (fundingSuccessful) {
        const createAmountInSavingTxn =
          await PamojaAppContract.createAmountInSaving(
            _amount,
            _creatingContributor
          );

        const createAmountInSavingTxnResult = createAmountInSavingTxn.wait();
      }
    } catch (error) {}
  }
};
