import { providers, Contract, ethers } from "ethers";
import { pamojaAppContractAddress } from "@/utils/addresses/pamojaAppContractAddress";
import { UpdateSavingAfterWithdrawal } from "@/utils/props/updateSavingAfterWithdrawal";
import { pamojaAppContractABI } from "@/utils/abis/pamojaAppContractABI";

export const _updateSavingAfterWithdrawal = async (
    _signerAddress: `0x${string}` | undefined,
    { _savingId }: UpdateSavingAfterWithdrawal
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
            const updateSavingAfterWithdrawalTxn =
                await PamojaAppContract.updateSavingAfterWithdrawal(_savingId);

            await updateSavingAfterWithdrawalTxn.wait();


        } catch (error) {
            console.log(error);
        }
    }
};
