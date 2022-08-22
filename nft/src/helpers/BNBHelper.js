import { web3 } from "./Web3Helper"

export const BNBBalance=async(account)=>{


    let web3js= await web3();

    let balance = await web3js.eth.getBalance(account);

    console.log("balanceBNB",balance)
    
    if(balance){
        balance = balance / Math.pow(10,18);

       
        return balance;
    }

}
