import { ethers } from "ethers";
import { getWeb3 } from "./connectors";
import { contract, DEFAULT_CHAIN } from "./constant";
import multiCallAbi from '../json/multicall.json';
import gameAbi from '../json/game.json';


export const getContract = (abi, address, library) => {
  try {
    return new ethers.Contract(address, abi, library)
  }
  catch {
    return false;
  }
}

export const getWeb3Contract = (abi, address) => {
  let web3 = getWeb3();
  return new web3.eth.Contract(abi, address);
}


export const multiCallContractConnect = () => {
  let multicallAddress = contract[DEFAULT_CHAIN].MULTICALL_ADDRESS;
  let web3 = getWeb3();
  return new web3.eth.Contract(multiCallAbi, multicallAddress);
}

export const getNftContract = () => {
  let web3 = getWeb3();
  return new web3.eth.Contract(gameAbi, contract[DEFAULT_CHAIN].NFT_ADDRESS);

}

export const formatPrice = (num) => {
  try{
    if(parseFloat(num) > 999){
      return new Intl.NumberFormat('en-US' , { maximumSignificantDigits: 10 }).format(num);
    }
    else{
      return parseFloat(parseFloat(num).toFixed(8));
    }
  }
  catch(err){
    console.log(err.message);
    return 0;
  }
}
