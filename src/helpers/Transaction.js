import { toast } from "react-toastify";
import { web3 } from "./Web3Helper"
export const Transaction=async(data)=>{
    let web3Connect=await web3();
    let hash;
    console.log('data in transaction',data);
    try{
         hash = await web3Connect.eth.sendTransaction(data.tx);
         console.log('data in transaction',hash);
       }catch(e){
        console.log(e);
        toast.error("Something Went Wrong")
    }
    return hash;
    
}