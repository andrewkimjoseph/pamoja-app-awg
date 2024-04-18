
import { providers, Contract, ethers } from "ethers";
import { pamojaAppContractABI } from "../utils/abis/pamojaAppContractABI";

import { AddContributorToDirectoryProps } from "../utils/props/addContributorToDirectory";

import { Contributor } from "../utils/types/contributor";
import { pamojaAppContractAddress } from "@/utils/addresses/pamojaAppContractAddress";
import { CreateAmountInSavingsProps } from "@/utils/props/createAmountInSaving";
import { Saving } from "@/utils/types/saving";
import { _fundAmountInSaving } from "./_fundAmountInSaving";
import { pamojaAppContractInterface } from "@/utils/interfaces/pamojaAppContractInterface";
import { CUSDAlfajoresContractInterface } from "@/utils/interfaces/CUSDAlfajoresContractInterface";


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

    const fundingSuccessful = await _fundAmountInSaving(_signerAddress, {_amount: _amount, _creatingContributor: _creatingContributor});



    console.log(fundingSuccessful);

    // if (fundingSuccessful) {


    //   const createAmountInSavingTxn =
    //   await PamojaAppContract.callStatic.createAmountInSaving(_amount, _creatingContributor);


    // const createAmountInSavingTxnResult = createAmountInSavingTxn.wait();


    // const saving: Saving = {
    //   _id: parseInt(
    //     createAmountInSavingTxnResult["_id"].toString()
    //   ),
    //   _creatingContributor: createAmountInSavingTxnResult["_creatingContributor"],
    // };

    // console.log(saving);


    // }





  }
};

const hash = "0x66f0f4ba04c503c0503bfe0b9e878ed384c6873b53cfba15412a4ad214345b08";