import axios from "axios";
import Web3 from "web3";

export const NativeBalance=async(address, Chain)=>{
    let rpc =  "https://data-seed-prebsc-1-s1.binance.org:8545/"
    if(Chain === 97){
       rpc = "https://data-seed-prebsc-1-s1.binance.org:8545/";
    }else if(Chain === 5){
        rpc = "https://goerli.infura.io/v3/a0c5c687788b471093524af62e5e1cec"
    }else if( Chain === 80001){
        rpc = 'https://rpc-mumbai.matic.today'
    }
    const web3js = new Web3(
        new Web3.providers.HttpProvider(
         rpc
        )
    );
    let balance = await web3js.eth.getBalance(address);
    balance = balance/1e18;
    return balance;
}
