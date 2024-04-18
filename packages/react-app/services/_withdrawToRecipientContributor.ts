import { providers, Contract, ethers } from "ethers";
import { pamojaAppContractAddress } from "@/utils/addresses/pamojaAppContractAddress";
import { CreateAmountInSavingsProps } from "@/utils/props/createAmountInSaving";
import { CUSDAlfajoresContractABI } from "@/utils/abis/CUSDAlfajoresContractABI";
import { CUSDAlfajoresContractAddress } from "@/utils/addresses/CUSDAlfajoresContractAddress";
import { parseEther } from "viem";
import { _getRecipientContributorOfSaving } from "./getRecipientContributorOfSaving";
import { WithdrawToRecipientContributorProps } from "@/utils/props/withdrawToRecipientContributor";
import { Contributor } from "@/utils/types/contributor";
import { _getWithdrawalAmountFromSaving } from "./getWithdrawalAmountFromSaving";
import { pamojaAppContractABI } from "@/utils/abis/pamojaAppContractABI";
import { _updateSavingAfterWithdrawal } from "./updateSavingAfterWithdrawal";

export const withdrawToRecipientContributor = async (
  _signerAddress: `0x${string}` | undefined,
  { _savingId }: WithdrawToRecipientContributorProps
): Promise<boolean> => {
  if (window.ethereum) {
    const provider = new providers.Web3Provider(window.ethereum);

    const signer = provider.getSigner(_signerAddress);

    const PamojaAppContract = new Contract(
      pamojaAppContractAddress,
      pamojaAppContractABI,
      signer
    );

    const CUSDAlfajoresContract = new Contract(
      CUSDAlfajoresContractAddress,
      CUSDAlfajoresContractABI,
      signer
    );

    // Get recipient contributor
    const receipientAddress: `0x${string}` | undefined =
      await _getRecipientContributorOfSaving(_signerAddress, { _savingId });

    if (receipientAddress) {
      const withdrawalAmount: number | null =
        await _getWithdrawalAmountFromSaving(_signerAddress, { _savingId });

      if (withdrawalAmount) {

        console.log(receipientAddress);
        console.log(withdrawalAmount);
        try {

          const withdrawalTxn = await PamojaAppContract.makeWithdrawalToRecipientContributor(
            _savingId,)


          await withdrawalTxn.wait();

          await _updateSavingAfterWithdrawal(_signerAddress, {_savingId});


        } catch (error) {
          console.log(error);
        }
      }
    }

  }

  return false;
};
