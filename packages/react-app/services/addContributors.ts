
import { providers, Contract, ethers } from "ethers";
import { pamojaAppContractABI } from "./../utils/pamojaAppContractABI";

import { AddContributor } from "./props/addContributor";

import { Contributor } from "./props/contributor";


const PAMOJA_APP_CONTRACT_ADDRESS: `0x${string}` | undefined =
  "0xa50EB108e96461e3519829abd897F184b32d29ce";


export const addContributorToDirectory = async (
    _signerAddress: `0x${string}` | undefined,
    { _username, _contributorAddress }: AddContributor
  ) => {
    if (window.ethereum) {
      const provider = new providers.Web3Provider(window.ethereum);
  
      const signer = provider.getSigner(_signerAddress);
  
      const PamojaAppContract = new Contract(
        PAMOJA_APP_CONTRACT_ADDRESS,
        pamojaAppContractABI,
        signer
      );
    
      const createContributorTxn: [] =
        await PamojaAppContract.callStatic.getAllContributors();
  
  
      const contributors: Contributor[] = [];
  
      for (let index = 0; index < createContributorTxn.length; index++) {
        const fetchedContributor: any = createContributorTxn[index];
  
        const contributor: Contributor = {
          _id: parseInt(
           fetchedContributor["_id"].toString()
          ),
          _address: fetchedContributor["_address"],
          _username: fetchedContributor["_username"],
        };
  
        contributors.push(contributor);
      }
  
      console.log(contributors);
  
    }
  };