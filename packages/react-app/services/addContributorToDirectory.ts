
import { providers, Contract, ethers, BigNumber } from "ethers";
import { pamojaAppContractABI } from "../utils/abis/pamojaAppContractABI";

import { AddContributorToDirectoryProps } from "../utils/props/addContributorToDirectory";

import { Contributor } from "../utils/types/contributor";
import { pamojaAppContractAddress } from "@/utils/addresses/pamojaAppContractAddress";


export const addContributorToDirectory = async (
  _signerAddress: `0x${string}` | undefined,
  { _username, _contributorAddress }: AddContributorToDirectoryProps
) => {
  if (window.ethereum) {
    const provider = new providers.Web3Provider(window.ethereum);

    const signer = provider.getSigner(_signerAddress);

    const PamojaAppContract = new Contract(
      pamojaAppContractAddress,
      pamojaAppContractABI,
      signer
    );

    const createContributorTxn =
      await PamojaAppContract.addContributorToDirectory(_username, _signerAddress);

    await createContributorTxn.wait();

  }
};