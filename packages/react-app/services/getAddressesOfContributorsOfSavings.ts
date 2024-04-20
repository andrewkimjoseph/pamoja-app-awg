
import { providers, Contract } from "ethers";
import { pamojaAppContractABI } from "../utils/abis/pamojaAppContractABI";

import { Contributor } from "../utils/types/contributor";
import { pamojaAppContractAddress } from "@/utils/addresses/pamojaAppContractAddress";
import { Contribution } from "@/utils/types/contributions";



export const getAddressesOfContributorsOfSaving = async (
    _signerAddress: `0x${string}` | undefined, _savingId: number

): Promise<[]> => {
    if (window.ethereum) {
        const provider = new providers.Web3Provider(window.ethereum);

        const signer = provider.getSigner(_signerAddress);

        const PamojaAppContract = new Contract(
            pamojaAppContractAddress,
            pamojaAppContractABI,
            signer
        );

        try {


            const createContributorTxn: [] =
                await PamojaAppContract.callStatic.getAddressesOfContributorsOfSaving(_savingId);



            return createContributorTxn;
        } catch (error) {

            console.log(error);
            return [];

        }

    }
    return [];
};