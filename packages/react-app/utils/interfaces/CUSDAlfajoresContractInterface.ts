import { ethers } from "ethers";
import { CUSDAlfajoresContractABI } from "../abis/CUSDAlfajoresContractABI";

export const CUSDAlfajoresContractInterface = new ethers.utils.Interface(CUSDAlfajoresContractABI);
