import { providers, Contract, ethers } from "ethers";
import { pamojaAppContractAddress } from "@/utils/addresses/pamojaAppContractAddress";
import { CreateNewSavingProps } from "@/utils/props/createAmountInSaving";
import { CUSDAlfajoresContractABI } from "@/utils/abis/CUSDAlfajoresContractABI";
import { CUSDAlfajoresContractAddress } from "@/utils/addresses/CUSDAlfajoresContractAddress";
import { parseEther } from "viem";
import { getRecipientContributorOfSaving } from "./getRecipientContributorOfSaving";
import { WithdrawToRecipientContributorProps } from "@/utils/props/withdrawToRecipientContributor";
import { Contributor } from "@/utils/types/contributor";
import { pamojaAppContractABI } from "@/utils/abis/pamojaAppContractABI";
import { getWithdrawalAmountFromSaving } from "./getWithdrawalAmountFromSaving";

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


    const withdrawalTxn =
      await PamojaAppContract.makeWithdrawalToRecipientContributor(
        _savingId
      );

    await withdrawalTxn.wait();

    return true;
  }

  return false;
};
