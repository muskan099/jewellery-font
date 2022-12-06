import axios from "axios";
import Web3 from "web3";



const web3js = new Web3(
    new Web3.providers.HttpProvider(
      // "https://bsc-dataseed.binance.org/"
    "https://data-seed-prebsc-1-s1.binance.org:8545/"
    )
);

const contractAddress = '0x106a4afc72D9Dc3026323711c81A84c250fe45fF';


const abi = [
  {
    constant: true,
    inputs: [],
    name: "name",
    outputs: [{ name: "", type: "string" }],
    payable: false,
    stateMutability: "view",
    type: "function",
  },
  {
    constant: false,
    inputs: [
      { name: "_spender", type: "address" },
      { name: "_value", type: "uint256" },
    ],
    name: "approve",
    outputs: [{ name: "", type: "bool" }],
    payable: false,
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    constant: true,
    inputs: [],
    name: "totalSupply",
    outputs: [{ name: "", type: "uint256" }],
    payable: false,
    stateMutability: "view",
    type: "function",
  },
  {
    constant: false,
    inputs: [
      { name: "_from", type: "address" },
      { name: "_to", type: "address" },
      { name: "_value", type: "uint256" },
    ],
    name: "transferFrom",
    outputs: [{ name: "", type: "bool" }],
    payable: false,
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    constant: true,
    inputs: [],
    name: "INITIAL_SUPPLY",
    outputs: [{ name: "", type: "uint256" }],
    payable: false,
    stateMutability: "view",
    type: "function",
  },
  {
    constant: true,
    inputs: [],
    name: "decimals",
    outputs: [{ name: "", type: "uint256" }],
    payable: false,
    stateMutability: "view",
    type: "function",
  },
  {
    constant: false,
    inputs: [{ name: "_value", type: "uint256" }],
    name: "burn",
    outputs: [{ name: "", type: "bool" }],
    payable: false,
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    constant: true,
    inputs: [{ name: "_owner", type: "address" }],
    name: "balanceOf",
    outputs: [{ name: "balance", type: "uint256" }],
    payable: false,
    stateMutability: "view",
    type: "function",
  },
  {
    constant: false,
    inputs: [
      { name: "_from", type: "address" },
      { name: "_value", type: "uint256" },
    ],
    name: "burnFrom",
    outputs: [{ name: "", type: "bool" }],
    payable: false,
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    constant: true,
    inputs: [],
    name: "symbol",
    outputs: [{ name: "", type: "string" }],
    payable: false,
    stateMutability: "view",
    type: "function",
  },
  {
    constant: false,
    inputs: [
      { name: "_to", type: "address" },
      { name: "_value", type: "uint256" },
    ],
    name: "transfer",
    outputs: [{ name: "", type: "bool" }],
    payable: false,
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    constant: true,
    inputs: [
      { name: "_owner", type: "address" },
      { name: "_spender", type: "address" },
    ],
    name: "allowance",
    outputs: [{ name: "remaining", type: "uint256" }],
    payable: false,
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      { name: "_name", type: "string" },
      { name: "_symbol", type: "string" },
      { name: "_decimals", type: "uint256" },
    ],
    payable: false,
    stateMutability: "nonpayable",
    type: "constructor",
  },
  {
    anonymous: false,
    inputs: [
      { indexed: true, name: "_burner", type: "address" },
      { indexed: false, name: "_value", type: "uint256" },
    ],
    name: "Burn",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      { indexed: true, name: "owner", type: "address" },
      { indexed: true, name: "spender", type: "address" },
      { indexed: false, name: "value", type: "uint256" },
    ],
    name: "Approval",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      { indexed: true, name: "from", type: "address" },
      { indexed: true, name: "to", type: "address" },
      { indexed: false, name: "value", type: "uint256" },
    ],
    name: "Transfer",
    type: "event",
  },
];
export const TabooBalance=async(address)=>{
        
    //let web3Connect=await web3();

    const nftContract = new web3js.eth.Contract(abi, contractAddress);

    console.log('data',address);
    
    let balance=0;

    try{
         balance=await nftContract.methods.balanceOf(address).call({
            from :contractAddress
            });
            balance=balance/1000000000000000000;
          // let usd_balance= await tabooRate(balance)
          return balance;
       }catch(e){
        console.log(e);
    }
    return balance;
    
}



const tabooRate=async(taboo)=>{
 
    let response = await axios.get('https://api.coingecko.com/api/v3/simple/price?ids=taboo-token&vs_currencies=usd&include_market_cap=true&include_24hr_vol=true&include_24hr_change=true&include_last_updated_at=true');
  //console.log('response',response)
    if (response) { // if HTTP-status is 200-299
  // get the response body (the method explained below)
  //let data = await response.data();

    console.log('data',response.data['taboo-token'].usd)

  var totalUsd=  response.data['taboo-token'].usd*taboo
  return totalUsd
}
}


export const tabooMarketData=async()=>{

  let res=await axios.get("https://api.coingecko.com/api/v3/coins/taboo-token?market_data=true");

  console.log("market data",res.data.market_data);

  let market_cap=res.data.market_data.market_cap.usd;

  let volume=res.data.market_data.total_volume.usd;

  let price=res.data.market_data.current_price.usd;

  //console.log("market cap",market_cap,volume,price);

  let mObj={market_cap:market_cap,
           volume:volume,
          price:price}

    return mObj;


}