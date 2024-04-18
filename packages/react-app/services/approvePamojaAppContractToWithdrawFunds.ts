import { CUSDAlfajoresContractABI } from "@/utils/abis/CUSDAlfajoresContractABI";
import { pamojaAppContractABI } from "@/utils/abis/pamojaAppContractABI";
import { CUSDAlfajoresContractAddress } from "@/utils/addresses/CUSDAlfajoresContractAddress";
import { pamojaAppContractAddress } from "@/utils/addresses/pamojaAppContractAddress";
import { ApprovePamojaAppContractToWithdrawFunds } from "@/utils/props/approveToWithdrawFunds";
import { Contract, ethers, providers } from "ethers";

export const approvePamojaAppContractToWithdrawFunds = async (
  _signerAddress: `0x${string}` | undefined,
  { _amount }: ApprovePamojaAppContractToWithdrawFunds
) => {
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

    const approvePamojaAppContractToWithdrawFundsTxn =
      await CUSDAlfajoresContract.approve(PamojaAppContract, _amount);

    const approvePamojaAppContractToWithdrawFundsTxnResult =
      await approvePamojaAppContractToWithdrawFundsTxn.wait();

    const success = ethers.utils.defaultAbiCoder.decode(
      ["bool"],
      approvePamojaAppContractToWithdrawFundsTxnResult["transactionHash"]
    );

    return success.at(0) as boolean;
  }
};
