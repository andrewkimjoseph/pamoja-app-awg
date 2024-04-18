import { ethers } from "ethers";
import { pamojaAppContractABI } from "../abis/pamojaAppContractABI";

export const pamojaAppContractInterface = new ethers.utils.Interface(pamojaAppContractABI);
