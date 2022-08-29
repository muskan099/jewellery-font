import axios from'axios'
export const BNBTOTAboo=async(bnbAmount)=>{


    let currencyType="bnb";

    let res= await axios.get(`https://api.coingecko.com/api/v3/simple/price?ids=taboo-token&vs_currencies=${currencyType}&include_market_cap=true&include_24hr_vol=true&include_24hr_change=true&include_last_updated_at=true%27`)
    
   let price= res.data['taboo-token'][`bnb`];

   let taboo=(1/price)*bnbAmount;

   return taboo;

}