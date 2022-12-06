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
        
    //let web3Connect=await web3();
 
    let balance = await web3js.eth.getBalance(address);

 
    
    balance = balance/1e18;
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