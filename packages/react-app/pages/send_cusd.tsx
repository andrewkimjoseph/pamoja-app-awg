import { providers, Contract, ethers } from "ethers";
import { parseEther } from "ethers/lib/utils";
import React, { MouseEventHandler, useEffect, useState } from "react";
const CUSD_ALFAJORES_TOKEN_CONTRACT_ADDRESS =
  "0x874069fa1eb16d44d622f2e0ca25eea172369bc1";
import { useAccount } from "wagmi";
import BalancePage from "./balance";
import { addContributorToDirectory } from "@/services/addContributorToDirectory";
import { getContributionsOfContributor } from "@/services/getContributionsOfContributor";
import { createAmountInSaving } from "@/services/createAmountInSaving";
import { approvePamojaAppContractToWithdrawFunds } from "@/services/approvePamojaAppContractToWithdrawFunds";
import { _getWithdrawalAmountFromSaving } from "@/services/getWithdrawalAmountFromSaving";
import { withdrawToRecipientContributor } from "@/services/_withdrawToRecipientContributor";


const SendCUSD: React.FC = () => {
  const { address } = useAccount();


  return (
    <div>
      <button
        className="bg-pa_two text-first font-bold py-2 px-4 rounded mb-4 border border-pa_one"
        onClick={(event: React.MouseEvent<HTMLButtonElement>) =>
          addContributorToDirectory(address, {
            _username: "andrewkimjoseph",
            _contributorAddress: address,
          })
        }
      >
        Add contributor
      </button>
      <br />
      <button
        className="bg-pa_two text-first font-bold py-2 px-4 rounded mb-4 border border-pa_one"
        onClick={(event: React.MouseEvent<HTMLButtonElement>) =>
          approvePamojaAppContractToWithdrawFunds(address, {
           _amount: 250
          })
        }
      >
        Approve contract
      </button>
      <br />
      <button
        className="bg-pa_two text-first font-bold py-2 px-4 rounded mb-4 border border-pa_one"
        onClick={(event: React.MouseEvent<HTMLButtonElement>) =>
          createAmountInSaving(address, {_amount: 1, _creatingContributor: address})
        }
      >
        Create amount in saving
      </button>
      <br />
      <button
        className="bg-pa_two text-first font-bold py-2 px-4 rounded mb-4 border border-pa_one"
        onClick={(event: React.MouseEvent<HTMLButtonElement>) =>
          withdrawToRecipientContributor(address, {_savingId: 0})
       
        }
      >
        Withdraw to myself
      </button>
      <BalancePage></BalancePage>
    </div>
  );
};

export default SendCUSD;
