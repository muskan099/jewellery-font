import axios from "axios";
import { toast } from "react-toastify";
import Web3 from "web3";
import { web3 } from "./Web3Helper"


const web3js = new Web3(
  new Web3.providers.HttpProvider(
    "https://data-seed-prebsc-1-s1.binance.org:8545"
  )
);

const contractAddress = "0x106a4afc72D9Dc3026323711c81A84c250fe45fF";

const spender = "0xc24d2E07715b11b8E01CA57d3d63a4F6E2F9f3e1";

const spenderFirst = "0x296F47de09A37f1c67B081afA0F88aed37566d67";

const spenderSecond = "0xc24d2E07715b11b8E01CA57d3d63a4F6E2F9f3e1";

const abi = [{ "inputs": [], "stateMutability": "nonpayable", "type": "constructor" }, { "anonymous": false, "inputs": [{ "indexed": true, "internalType": "address", "name": "owner", "type": "address" }, { "indexed": true, "internalType": "address", "name": "spender", "type": "address" }, { "indexed": false, "internalType": "uint256", "name": "value", "type": "uint256" }], "name": "Approval", "type": "event" }, { "anonymous": false, "inputs": [{ "indexed": true, "internalType": "address", "name": "previousOwner", "type": "address" }, { "indexed": true, "internalType": "address", "name": "newOwner", "type": "address" }], "name": "OwnershipTransferred", "type": "event" }, { "anonymous": false, "inputs": [{ "indexed": true, "internalType": "address", "name": "from", "type": "address" }, { "indexed": true, "internalType": "address", "name": "to", "type": "address" }, { "indexed": false, "internalType": "uint256", "name": "value", "type": "uint256" }], "name": "Transfer", "type": "event" }, { "inputs": [{ "internalType": "address", "name": "owner", "type": "address" }, { "internalType": "address", "name": "spender", "type": "address" }], "name": "allowance", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "spender", "type": "address" }, { "internalType": "uint256", "name": "amount", "type": "uint256" }], "name": "approve", "outputs": [{ "internalType": "bool", "name": "", "type": "bool" }], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "account", "type": "address" }], "name": "balanceOf", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "account", "type": "address" }, { "internalType": "uint256", "name": "amount", "type": "uint256" }], "name": "burn", "outputs": [{ "internalType": "bool", "name": "", "type": "bool" }], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [], "name": "decimals", "outputs": [{ "internalType": "uint8", "name": "", "type": "uint8" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "spender", "type": "address" }, { "internalType": "uint256", "name": "subtractedValue", "type": "uint256" }], "name": "decreaseAllowance", "outputs": [{ "internalType": "bool", "name": "", "type": "bool" }], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [], "name": "getOwner", "outputs": [{ "internalType": "address", "name": "", "type": "address" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "spender", "type": "address" }, { "internalType": "uint256", "name": "addedValue", "type": "uint256" }], "name": "increaseAllowance", "outputs": [{ "internalType": "bool", "name": "", "type": "bool" }], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "account", "type": "address" }, { "internalType": "uint256", "name": "amount", "type": "uint256" }], "name": "mint", "outputs": [{ "internalType": "bool", "name": "", "type": "bool" }], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [], "name": "name", "outputs": [{ "internalType": "string", "name": "", "type": "string" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "owner", "outputs": [{ "internalType": "address", "name": "", "type": "address" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "renounceOwnership", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [], "name": "symbol", "outputs": [{ "internalType": "string", "name": "", "type": "string" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "totalSupply", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "recipient", "type": "address" }, { "internalType": "uint256", "name": "amount", "type": "uint256" }], "name": "transfer", "outputs": [{ "internalType": "bool", "name": "", "type": "bool" }], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "sender", "type": "address" }, { "internalType": "address", "name": "recipient", "type": "address" }, { "internalType": "uint256", "name": "amount", "type": "uint256" }], "name": "transferFrom", "outputs": [{ "internalType": "bool", "name": "", "type": "bool" }], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "newOwner", "type": "address" }], "name": "transferOwnership", "outputs": [], "stateMutability": "nonpayable", "type": "function" }]

export const Allowance = async (address) => {
  const nftContract = new web3js.eth.Contract(abi, contractAddress);
  let allowance = (await nftContract.methods.allowance(address, spender).call()) / 1e18
  return allowance;
};

export const AllowanceSale = async (address, forsale) => {
  let spender = spenderFirst;

  if (forsale == "yes") {
    spender = spenderSecond;
  }
  const nftContract = new web3js.eth.Contract(abi, contractAddress);
  let allowance = (await nftContract.methods.allowance(address, spender).call()) / 1e18
  return allowance;
};

export const ApproveJWL = async (price, address, forsale) => {
  let web3Connect = await web3();

  let spender = spenderFirst;

  if (forsale == "yes") {
    spender = spenderSecond;
  }
  address = web3Connect.utils.toChecksumAddress(address);
  spender = web3Connect.utils.toChecksumAddress(spender);

  const JWLContract = new web3Connect.eth.Contract(abi, contractAddress);
  const nonce = await web3Connect.eth.getTransactionCount(address, "latest");
  price = price+price;
  price = "0x" + (price * 1000000000000000000).toString(16);

  try {
    let estimates_gas = await web3Connect.eth.estimateGas({
      from: address,
      to: contractAddress,
      data: JWLContract.methods.approve(spender, price).encodeABI(),
    });
    let gasLimit = web3Connect.utils.toHex(estimates_gas * 6);
    let gasPrice_bal = await web3Connect.eth.getGasPrice();
    let gasPrice = web3Connect.utils.toHex(gasPrice_bal * 2);

    let tx = {
      from: address,
      to: contractAddress,
      nonce: nonce,
      gasPrice: gasPrice,
      gasLimit: gasLimit,
      data: JWLContract.methods.approve(spender, price).encodeABI()
    };
    let hash = await web3Connect.eth.sendTransaction(tx);

    return hash;
  } catch (e) {
    console.log(e);
    return false;
  }
};

export const ApproveJWL1 = async (price, address) => {
  let web3Connect = await web3();
  const nftContract = new web3Connect.eth.Contract(abi, contractAddress);
  const nonce = await web3Connect.eth.getTransactionCount(address, "latest");
  price = price+price;
  price = "0x" + (price * 1000000000000000000).toString(16);

  try {
    let estimates_gas = await web3Connect.eth.estimateGas({
      from: address,
      to: contractAddress,
      data: nftContract.methods.approve(spender, price).encodeABI(),
    });

    let gasLimit = web3Connect.utils.toHex(estimates_gas * 6);

    let gasPrice_bal = await web3Connect.eth.getGasPrice();

    let gasPrice = web3Connect.utils.toHex(gasPrice_bal * 2);
    let tx = {
      from: address,
      to: contractAddress,
      nonce: nonce,
      gasPrice: gasPrice,
      gasLimit: gasLimit,
      //'maxPriorityFeePerGas': 1999999987,
      data: nftContract.methods.approve(spender, price).encodeABI(),
    };
    let hash = await web3Connect.eth.sendTransaction(tx);
    return hash;
  } catch (e) {
    console.log(e);
    return false;
  }
};
