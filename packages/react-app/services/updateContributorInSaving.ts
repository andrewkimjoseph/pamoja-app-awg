import { providers, Contract, ethers } from "ethers";
import { pamojaAppContractABI } from "../utils/abis/pamojaAppContractABI";
import { pamojaAppContractAddress } from "@/utils/addresses/pamojaAppContractAddress";
import { CreateAmountInSavingsProps } from "@/utils/props/createAmountInSaving";
import { _fundAmountInSaving } from "./_fundAmountInSaving";
import { UpdateContributorInSavingProps } from "@/utils/props/updateContributorInSaving";

export const updateContributorInSavings = async (
  _signerAddress: `0x${string}` | undefined,
  {
    _savingId,
    _creatingContributor,
    _newContributor,
    _amount,
  }: UpdateContributorInSavingProps
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
          await PamojaAppContract.updateContributorInSavings(
            _savingId,
            _creatingContributor,
            _newContributor,
            _amount
          );

        await createAmountInSavingTxn.wait();
      }
    } catch (error) {
      console.log(error);
    }
  }
};

const hash =
  "0x66f0f4ba04c503c0503bfe0b9e878ed384c6873b53cfba15412a4ad214345b08";
