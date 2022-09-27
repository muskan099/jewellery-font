import { toast } from "react-toastify";
import { web3 } from "./Web3Helper"
export const Transaction=async(data)=>{
    console.log('data in transaction',data);
    let web3Connect=await web3();

    console.log({web3Connect});
    
    let hash=false;

    console.log('data in transaction',data);
    try{
         hash=await web3Connect.eth.sendTransaction(data.tx);
         console.log('data in transaction',data);
       }catch(e){
        console.log(e);
        toast.error("Reconnect wallet")
    }
    return hash;
    
}