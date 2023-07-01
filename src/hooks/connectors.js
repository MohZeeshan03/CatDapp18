import Web3 from "web3";
import { RPC } from "./constant";



export const getWeb3 = () => {
  return new Web3(RPC);
}



