import { toast } from "react-toastify";
import { web3 } from "./Web3Helper"
export const Transaction=async(data)=>{
    let web3Connect=await web3();
    let hash=false;
    console.log('data in transaction',data);
    try{
         hash = await web3Connect.eth.sendTransaction(data.tx);
       }catch(e){
        console.log(e);
        toast.error("Something Went Wrong")
    }
    return hash;
    
}