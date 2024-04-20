import { providers, Contract, ethers, BigNumber } from "ethers";
import { pamojaAppContractABI } from "../utils/abis/pamojaAppContractABI";

import { pamojaAppContractAddress } from "@/utils/addresses/pamojaAppContractAddress";
import { GetWithdrawalAmountFromSavingProps } from "@/utils/props/getWithdrawalAmountFromSaving";

export const getWithdrawalAmountFromSaving = async (
  _signerAddress: `0x${string}` | undefined,
  { _savingId }: GetWithdrawalAmountFromSavingProps
): Promise<number | null>  => {



  let withdrawalAmount: number | null = null;


  if (window.ethereum) {
    const provider = new providers.Web3Provider(window.ethereum);

    const signer = provider.getSigner(_signerAddress);

    const PamojaAppContract = new Contract(
      pamojaAppContractAddress,
      pamojaAppContractABI,
      signer
    );

    try {
      const createContributorTxn =
        await PamojaAppContract.callStatic.getWithdrawalAmountFromSaving(_savingId);

      withdrawalAmount = parseInt(createContributorTxn.toString());
      return withdrawalAmount;
    } catch (error) {
      console.log(error);
    }
  }
  return withdrawalAmount;
};
