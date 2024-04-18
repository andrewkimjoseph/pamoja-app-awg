
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

    const pamojaContractInterface = new ethers.utils.Interface(pamojaAppContractABI);

    // try {
      // const createContributorTxn =
      //   await PamojaAppContract.addContributorToDirectory(_username, _contributorAddress);


      // const createContributorTxnResult = await createContributorTxn.wait();

      // console.log(createContributorTxnResult["transactionHash"]);

      const returnValue = ethers.utils.defaultAbiCoder.decode(["bool"], "0xc1d6b30e302d33c8b84dfaa2882518c45cf9db85d6f471665f3088b1fdb1a8be");


      console.log(returnValue.at(0) as boolean) ;

      // return returnValue.at(0) as BigInt;



    //   // // const contributors: Contributor[] = [];



    //   // // pendingTx.data

    //   // for (let index = 0; index < createContributorTxn.length; index++) {
    //   //   const fetchedContributor: any = createContributorTxn[index];


    //   // console.log(returnedValue);

    // } catch (error) {


    // }





    //   const txData = PamojaAppContract.interface.encodeFunctionData("newToken");


    // const txResult = await provider.call({
    //   to: sumOfTokens.address,
    //   data: txData
    // });
    // const decodedResult = ethers.utils.defaultAbiCoder.decode("uint256", txResult);

    //   // returnedValue.functionFragment.outputs?.at(0)?.components.at(0)?.components;

    //   // const contributor: Contributor = {
    //   //   _id: parseInt(
    //   //     returnedValue.outputs["_id"].toString()
    //   //   ),
    //   //   _address: createContributorTxnResult["_address"],
    //   //   _username: createContributorTxnResult["_username"],
    //   // };


    //   //   contributors.push(contributor);
    //   // }

    //   // console.log(contributors);

  }
};