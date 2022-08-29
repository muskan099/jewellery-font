import { web3 } from "./Web3Helper";

let wADA="0x3EE2200Efb3400fAbB9AacF31297cBdD1d435D47";

let wBTC="0x7130d2A12B9BCbFAe4f2634d864A1Ee1Ce3Ead9c";

let DogeCoin="0xba2ae424d960c26247dd6c32edc70b295c744c43";

let ChainLink="0x404460c6a5ede2d891e8297795264fde62adbb75";

let Uniswap="0xbf5140a22578168fd562dccf235e5d43a02ce9b1";


let contractAddress = "0x196971133070EC2e0A2Ea6c55d75307A4BF0787e";

const abi =[{"inputs":[{"internalType":"address","name":"_taboo","type":"address"},{"internalType":"address","name":"_wallet","type":"address"},{"internalType":"contract IProviderPair","name":"_tabooBnbPair","type":"address"},{"internalType":"contract IProviderPair","name":"_ethBNBPair","type":"address"},{"internalType":"contract IProviderPair","name":"_maticBNBPair","type":"address"},{"internalType":"contract IProviderPair","name":"_usdtBNBPair","type":"address"},{"internalType":"contract IPancakeFactory","name":"_factory","type":"address"}],"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"previousOwner","type":"address"},{"indexed":true,"internalType":"address","name":"newOwner","type":"address"}],"name":"OwnershipTransferred","type":"event"},{"inputs":[],"name":"ETH","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"USDT","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"buyWithBNB","outputs":[],"stateMutability":"payable","type":"function"},{"inputs":[{"internalType":"uint256","name":"_amount","type":"uint256"}],"name":"buyWithEth","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"_amount","type":"uint256"}],"name":"buyWithMatic","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"_amount","type":"uint256"},{"internalType":"address","name":"_token","type":"address"}],"name":"buyWithTokenX","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"_amount","type":"uint256"}],"name":"buyWithUSDT","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"contract IProviderPair","name":"_provider","type":"address"},{"internalType":"uint256","name":"_amount","type":"uint256"}],"name":"convertToBnb","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"emergencyShutDown","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"ethBNBPair","outputs":[{"internalType":"contract IProviderPair","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"factory","outputs":[{"internalType":"contract IPancakeFactory","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"_token","type":"address"},{"internalType":"address","name":"_user","type":"address"}],"name":"getBalance","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"_bnbAmount","type":"uint256"}],"name":"getTabooAmountForXBNB","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"_ethAmount","type":"uint256"}],"name":"getTabooAmountForXETH","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"_maticAmount","type":"uint256"}],"name":"getTabooAmountForXMatic","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"_USDTAmount","type":"uint256"}],"name":"getTabooAmountForXUSDT","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"getTabooPriceWithBNB","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"_pairAddress","type":"address"}],"name":"getTabooPriceWithX","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"matic","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"maticBNBPair","outputs":[{"internalType":"contract IProviderPair","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"owner","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"renounceOwnership","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"contract IProviderPair","name":"_usdtBNBPair","type":"address"}],"name":"setBNBUSDTPair","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"_ETH","type":"address"}],"name":"setETHAddress","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"contract IProviderPair","name":"_ethBnbPair","type":"address"}],"name":"setEthBNBPair","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"_matic","type":"address"}],"name":"setMaticAddress","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"contract IProviderPair","name":"_maticBnbPair","type":"address"}],"name":"setMaticBNBPair","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"_taboo","type":"address"}],"name":"setTaboo","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"contract IProviderPair","name":"_tabooBnbPair","type":"address"}],"name":"setTabooBNBPair","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"_USDT","type":"address"}],"name":"setUSDTAddress","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"_wallet","type":"address"}],"name":"setWallet","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"taboo","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"tabooBnbPair","outputs":[{"internalType":"contract IProviderPair","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"_pairAddress","type":"address"},{"internalType":"uint256","name":"_amountOfTokens","type":"uint256"}],"name":"tokenToX","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"newOwner","type":"address"}],"name":"transferOwnership","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"usdtBNBPair","outputs":[{"internalType":"contract IProviderPair","name":"","type":"address"}],"stateMutability":"view","type":"function"}]

export const BuyTaboo = async (BNBAmount,tabooAmount) => {


  const Web3 = await web3();

  const accounts = await Web3.eth.getAccounts();

  let selectedAccount = accounts[0];

  
  let hashObj=false;



  
  try {
    const nftcontract = new Web3.eth.Contract(abi, contractAddress);

     let taboo_amount=tabooAmount*1000000000;

     //BNBAmount=await TabooToBNB(taboo_amount);

     //BNBAmount=BNBAmount/1000000000000000000;
     //BNBAmount=BNBAmount.toFixed(3);
     console.log("bnb balance",BNBAmount)

     

    let amount = "0x" + (BNBAmount*1000000000000000000).toString(16);

     tabooAmount = "0x" + (tabooAmount*1000000000).toString(16);


    //tabooAmount="0x"+(tabooAmount*1000000000000000000).toString(18);

   

    const nonce = await Web3.eth.getTransactionCount(selectedAccount, "latest");

      

    let estimates_gas = await Web3.eth.estimateGas({
      from: selectedAccount,
      to: contractAddress,
      value:amount,
      // value:'1'
      // value: BigInt(0 * 1000000000000000000).toString(),
      data: nftcontract.methods.buyWithBNB(
            
        )
        .encodeABI(),
    });

  

    let gasLimit = Web3.utils.toHex(estimates_gas * 2);
    let gasPrice_bal = await Web3.eth.getGasPrice();
    let gasPrice = Web3.utils.toHex(gasPrice_bal * 2);

    const tx = {
      from: selectedAccount,
      to: contractAddress,
      nonce: nonce,
      gasPrice: gasPrice,
      gasLimit: gasLimit,
      value:amount,
      //'maxPriorityFeePerGas': 1999999987,
      data: nftcontract.methods.buyWithBNB(
           
        )
        .encodeABI(),
    };

   
    let hash = await Web3.eth.sendTransaction(tx);


    hashObj={hash:hash,
            }

  } catch (error) {
    console.error(error.message);
  }

  return  hashObj;
};






export const BuyTabooByETH = async (BNBAmount,tabooAmount) => {


  const Web3 = await web3();

  const accounts = await Web3.eth.getAccounts();

  let selectedAccount = accounts[0];

  
  let hashObj=false;



  
  try {
    const nftcontract = new Web3.eth.Contract(abi, contractAddress);

   
   
    let amount = "0x" + (BNBAmount*1000000000000000000).toString(16);

     tabooAmount = "0x" + (tabooAmount*1000000000).toString(16);


    //tabooAmount="0x"+(tabooAmount*1000000000000000000).toString(18);

   

    const nonce = await Web3.eth.getTransactionCount(selectedAccount, "latest");

      

    let estimates_gas = await Web3.eth.estimateGas({
      from: selectedAccount,
      to: contractAddress,
     // value:amount,
      // value:'1'
      // value: BigInt(0 * 1000000000000000000).toString(),
      data: nftcontract.methods.buyWithEth(
           amount
        )
        .encodeABI(),
    });

  

    let gasLimit = Web3.utils.toHex(estimates_gas * 2);
    let gasPrice_bal = await Web3.eth.getGasPrice();
    let gasPrice = Web3.utils.toHex(gasPrice_bal * 2);

    const tx = {
      from: selectedAccount,
      to: contractAddress,
      nonce: nonce,
      gasPrice: gasPrice,
      gasLimit: gasLimit,
      //value:amount,
      //'maxPriorityFeePerGas': 1999999987,
      data: nftcontract.methods.buyWithEth(
            amount
        )
        .encodeABI(),
    };

   
    let hash = await Web3.eth.sendTransaction(tx);


    hashObj={hash:hash,
            }

  } catch (error) {
    console.error(error.message);
  }

  return  hashObj;
};







export const BuyTabooByMatic = async (BNBAmount,tabooAmount) => {


  const Web3 = await web3();

  const accounts = await Web3.eth.getAccounts();

  let selectedAccount = accounts[0];

  
  let hashObj=false;



  
  try {
    const nftcontract = new Web3.eth.Contract(abi, contractAddress);

   
   
    let amount = "0x" + (BNBAmount*1000000000000000000).toString(16);

     tabooAmount = "0x" + (tabooAmount*1000000000).toString(16);


    //tabooAmount="0x"+(tabooAmount*1000000000000000000).toString(18);

   

    const nonce = await Web3.eth.getTransactionCount(selectedAccount, "latest");

      

    let estimates_gas = await Web3.eth.estimateGas({
      from: selectedAccount,
      to: contractAddress,
     // value:amount,
      // value:'1'
      // value: BigInt(0 * 1000000000000000000).toString(),
      data: nftcontract.methods.buyWithMatic(
            amount
        )
        .encodeABI(),
    });

  

    let gasLimit = Web3.utils.toHex(estimates_gas * 2);
    let gasPrice_bal = await Web3.eth.getGasPrice();
    let gasPrice = Web3.utils.toHex(gasPrice_bal * 2);

    const tx = {
      from: selectedAccount,
      to: contractAddress,
      nonce: nonce,
      gasPrice: gasPrice,
      gasLimit: gasLimit,
     // value:amount,
      //'maxPriorityFeePerGas': 1999999987,
      data: nftcontract.methods.buyWithMatic(
            amount
        )
        .encodeABI(),
    };

   
    let hash = await Web3.eth.sendTransaction(tx);


    hashObj={hash:hash,
            }

  } catch (error) {
    console.error(error.message);
  }

  return  hashObj;
};






export const BuyTabooByUSDT = async (BNBAmount,tabooAmount,type) => {


  const Web3 = await web3();

  const accounts = await Web3.eth.getAccounts();

  let selectedAccount = accounts[0];

  
  let hashObj=false;


  if(type=="wADA"){
    contractAddress=wADA;
  }else if(type=="wBTC"){
    contractAddress=wBTC;

  }else if(type=="DogeCoin"){
    contractAddress=DogeCoin;
  }else if(type=="ChainLink"){
    contractAddress=ChainLink;
  }else if(type=="Uniswap"){
    contractAddress=Uniswap;
  }else{
    contractAddress=contractAddress;
  }



  
  try {
    const nftcontract = new Web3.eth.Contract(abi, contractAddress);

   
   
    let amount = "0x" + (BNBAmount*1000000000000000000).toString(16);

     tabooAmount = "0x" + (tabooAmount*1000000000).toString(16);


    //tabooAmount="0x"+(tabooAmount*1000000000000000000).toString(18);

   

    const nonce = await Web3.eth.getTransactionCount(selectedAccount, "latest");

      

    let estimates_gas = await Web3.eth.estimateGas({
      from: selectedAccount,
      to: contractAddress,
     // value:amount,
      // value:'1'
      // value: BigInt(0 * 1000000000000000000).toString(),
      data: nftcontract.methods.buyWithUSDT(
          amount
        )
        .encodeABI(),
    });

  

    let gasLimit = Web3.utils.toHex(estimates_gas * 2);
    let gasPrice_bal = await Web3.eth.getGasPrice();
    let gasPrice = Web3.utils.toHex(gasPrice_bal * 2);

    const tx = {
      from: selectedAccount,
      to: contractAddress,
      nonce: nonce,
      gasPrice: gasPrice,
      gasLimit: gasLimit,
      // value:amount,
      //'maxPriorityFeePerGas': 1999999987,
      data: nftcontract.methods.buyWithUSDT(
           amount
        )
        .encodeABI(),
    };

   
    let hash = await Web3.eth.sendTransaction(tx);


    hashObj={hash:hash,
            }

  } catch (error) {
    console.error(error.message);
  }

  return  hashObj;
};







export const TabooPrice=async(bnb)=>{

  const Web3 = await web3();

  const nftcontract = new Web3.eth.Contract(abi, contractAddress);
  let amount = "0x" + (bnb*1000000000000000000).toString(16);
  try{
        

   let balance=await nftcontract.methods.getTabooAmountForXBNB(amount).call({
      from :contractAddress
      });


      console.log("bnb to taboo",balance)

   //let taboo=bnb*balance;
   
   return balance;
  }catch(e){
    console.log("hello",e);

      let balance=0;

      return balance;
  }


}



export const TabooPriceByEth=async(bnb)=>{

  const Web3 = await web3();

  const nftcontract = new Web3.eth.Contract(abi, contractAddress);
  let amount = "0x" + (bnb*1000000000000000000).toString(16);
  try{
        

   let balance=await nftcontract.methods.getTabooAmountForXETH(amount).call({
      from :contractAddress
      });


      console.log("eth to taboo",balance)

   //let taboo=bnb*balance;
   
   return balance;
  }catch(e){
    console.log("hello",e);

    let balance=0;

      return balance;
  }


}




export const TabooPriceByMatic=async(bnb)=>{

  const Web3 = await web3();

  const nftcontract = new Web3.eth.Contract(abi, contractAddress);
  let amount = "0x" + (bnb*1000000000000000000).toString(16);
  try{
        

   let balance=await nftcontract.methods.getTabooAmountForXMatic(amount).call({
      from :contractAddress
      });


    console.log("matic to taboo",balance)

  // let taboo=bnb*balance;
   
   return balance;
  }catch(e){
    console.log("hello",e);

    let balance=0;

      return balance;
  }


}




export const TabooPriceByUSDT=async(bnb)=>{

  const Web3 = await web3();

  const nftcontract = new Web3.eth.Contract(abi, contractAddress);

  let amount = "0x" + (bnb*1000000000000000000).toString(16);

  try{
        

   let balance=await nftcontract.methods.getTabooAmountForXUSDT(amount).call({
      from :contractAddress
      });


      console.log("usdt to taboo",balance)

  // let taboo=bnb*balance;
   
   return balance;
  }catch(e){
    console.log("hello",e);

    let balance=0;

    return balance;
  }


}





export const TabooToBNB=async(taboo)=>{

  const Web3 = await web3();

  const nftcontract = new Web3.eth.Contract(abi, contractAddress);

  try{
        

   let balance=await nftcontract.methods.tokenToBNB(taboo).call({
      from :contractAddress
      });


      console.log("taboo rate",balance)

   
   
   return balance;

  }catch(e){
    console.log("hello",e);
  }


}



export const getBalance=async(address,currencyType)=>{

const usdtAddress="0x7ef95a0FEE0Dd31b22626fA2e10Ee6A223F8a684";

const ethAddress="0x8babbb98678facc7342735486c851abd7a0d17ca";

const Web3 = await web3();

 let tokenAddress="0x8babbb98678facc7342735486c851abd7a0d17ca";

  if(currencyType=="USDT"){
    
      tokenAddress=usdtAddress;

    }else if(currencyType=="ETH"){
      tokenAddress=ethAddress
    }


    console.log("address",address);

    console.log("token address",tokenAddress)

  const nftcontract = new Web3.eth.Contract(abi, contractAddress);

  try{
        

   let balance=await nftcontract.methods.getBalance(tokenAddress,address).call({
      from :contractAddress
      });

      balance=balance/1000000000000000000;
      
      console.log("crypto balance",balance)

     
   
        return balance;

    }catch(e){
      console.log(e)
      let balance=0;

      return balance;
    }
}