import { providers, Contract, ethers } from "ethers";
import { parseEther } from "ethers/lib/utils";
import React, { MouseEventHandler, useEffect, useState } from "react";
const CUSD_ALFAJORES_TOKEN_CONTRACT_ADDRESS =
  "0x874069fa1eb16d44d622f2e0ca25eea172369bc1";
import { useAccount } from "wagmi";
import BalancePage from "./balance";
import { pamojaAppContractAddress } from "@/utils/addresses/pamojaAppContractAddress";
import { CUSDAlfajoresContractABI } from "@/utils/abis/CUSDAlfajoresContractABI";
import { addContributorToDirectory } from "@/services/addContributorToDirectory";
import { getContributionsOfContributor } from "@/services/getContributionsOfContributor";
import { createAmountInSaving } from "@/services/createAmountInSaving";

// interface SendCUSDProps {
//   _amount: number;
//   _address: `0x${string}` | undefined;
// }
// export const _approveCUSDToPamojaContract = async (
//   _signerAddress: `0x${string}` | undefined
// ) => {
//   if (window.ethereum) {
//     const provider = new providers.Web3Provider(window.ethereum);

//     const signer = provider.getSigner(_signerAddress);

//     const CUSDAlfajoresContract = new Contract(
//       CUSD_ALFAJORES_TOKEN_CONTRACT_ADDRESS,
//       CUSDAlfajoresContractABI,
//       signer
//     );

//     const approvalTxn = await CUSDAlfajoresContract.approve(
//       pamojaAppContractAddress,
//       parseEther("250")
//     );

//     const receipt = await approvalTxn.wait();
//   }
// };

// export const _sendCUSD = async (_signerAddress:`0x${string}` | undefined, {
//   _amount,
//   _address
// }: SendCUSDProps) => {
//   if (window.ethereum) {
//     const provider = new providers.Web3Provider(window.ethereum);

//     const signer = provider.getSigner(_signerAddress);

//     const PamojaAppContract = new Contract(
//       PAMOJA_APP_CONTRACT_ADDRESS,
//       pamojaAppContractABI,
//       signer
//     );

//     const CUSDAlfajoresContract = new Contract(
//       CUSD_ALFAJORES_TOKEN_CONTRACT_ADDRESS,
//       CUSDAlfajoresContractABI,
//       signer
//     );

//     const sendCUSDTxn = await PamojaAppContract.sendCUSD(_amount, _address);

//     // const approvalTxn = await CUSDAlfajoresContract.transfer(
//     //   PAMOJA_APP_CONTRACT_ADDRESS,
//     //   parseEther("1")
//     // );

//     const receipt = await sendCUSDTxn.wait();

//   }
// };

const SendCUSD: React.FC = () => {
  const { address } = useAccount();

  return (
    <div>
      {/* <button
        className="bg-pa_one text-pa_two font-bold py-2 px-4 rounded mb-4"
        onClick={approvePamojaContract}
      >
        Approve 250 CUSD
      </button>
      <br /> */}

      <button
        className="bg-pa_two text-first font-bold py-2 px-4 rounded mb-4 border border-pa_one"
        onClick={(event: React.MouseEvent<HTMLButtonElement>) =>
          addContributorToDirectory(address, {
            _username: "chrisbakke",
            _contributorAddress: "0xE49B05F2c7DD51f61E415E1DFAc10B80074B001A",
          })
        }
      >
        Add contributor
      </button>
      <br />
      <button
        className="bg-pa_two text-first font-bold py-2 px-4 rounded mb-4 border border-pa_one"
        onClick={(event: React.MouseEvent<HTMLButtonElement>) =>
          createAmountInSaving(address, {_amount: 5, _creatingContributor: address})
        }
      >
        Create amount in saving
      </button>
      <br />
      <button
        className="bg-pa_two text-first font-bold py-2 px-4 rounded mb-4 border border-pa_one"
        onClick={(event: React.MouseEvent<HTMLButtonElement>) =>
          getContributionsOfContributor(address)
        }
      >
        Get contributions
      </button>
      <BalancePage></BalancePage>
    </div>
  );
};

export default SendCUSD;
