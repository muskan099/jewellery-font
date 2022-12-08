import { web3 } from "./Web3Helper";
import { toast } from "react-toastify";

const contractAddress = "0xc24d2E07715b11b8E01CA57d3d63a4F6E2F9f3e1";

const abi = 
  [{"anonymous":false,"inputs":[{"indexed":true,"internalType":"uint256","name":"tokenID","type":"uint256"},{"indexed":false,"internalType":"address","name":"nftContract","type":"address"},{"indexed":false,"internalType":"address","name":"seller","type":"address"},{"indexed":false,"internalType":"uint256","name":"minPrice","type":"uint256"}],"name":"CreateAuction","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"previousOwner","type":"address"},{"indexed":true,"internalType":"address","name":"newOwner","type":"address"}],"name":"OwnershipTransferred","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"uint256","name":"tokenID","type":"uint256"},{"indexed":false,"internalType":"address","name":"nftContract","type":"address"},{"indexed":false,"internalType":"address","name":"seller","type":"address"},{"indexed":false,"internalType":"uint256","name":"buyNowPrice","type":"uint256"}],"name":"SaleCreated","type":"event"},{"inputs":[{"internalType":"address","name":"_nftContractAddress","type":"address"},{"internalType":"uint256","name":"_tokenId","type":"uint256"},{"internalType":"uint256","name":"_proposedPrice","type":"uint256"},{"internalType":"address","name":"_proposingBuyer","type":"address"}],"name":"acceptBuyProposal","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"_nftContractAddress","type":"address"},{"internalType":"uint256","name":"_tokenId","type":"uint256"}],"name":"buyFromProposal","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"_nftContractAddress","type":"address"},{"internalType":"uint256","name":"_tokenId","type":"uint256"}],"name":"buyNFT","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"","type":"address"},{"internalType":"uint256","name":"","type":"uint256"}],"name":"buyProposal","outputs":[{"internalType":"address","name":"buyer","type":"address"},{"internalType":"uint256","name":"price","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"_nftContractAddress","type":"address"},{"internalType":"uint256","name":"_tokenId","type":"uint256"},{"internalType":"uint256","name":"_minPrice","type":"uint256"},{"internalType":"int256","name":"_duration","type":"int256"},{"internalType":"uint256","name":"_royaltyPercentage","type":"uint256"}],"name":"changeAuction","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"_nftContractAddress","type":"address"},{"internalType":"uint256","name":"_tokenId","type":"uint256"},{"internalType":"uint256","name":"_buyNowPrice","type":"uint256"},{"internalType":"uint256","name":"_royaltyPercentage","type":"uint256"}],"name":"changeSale","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"_nftContractAddress","type":"address"},{"internalType":"uint256[]","name":"_batchTokenIds","type":"uint256[]"},{"internalType":"uint256[]","name":"_batchTokenPrices","type":"uint256[]"},{"internalType":"uint32[]","name":"_royaltyPercentage","type":"uint32[]"},{"internalType":"uint32","name":"_ownerPercentage","type":"uint32"},{"internalType":"uint32","name":"_platformPercentage","type":"uint32"},{"internalType":"address","name":"_erc20Token","type":"address"},{"internalType":"uint256","name":"_auctionStartTime","type":"uint256"},{"internalType":"uint256","name":"_auctionBidPeriod","type":"uint256"},{"internalType":"uint32","name":"_bidIncreasePercentage","type":"uint32"},{"internalType":"string[]","name":"_uri","type":"string[]"}],"name":"createBatchNftAuction","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"_nftContractAddress","type":"address"},{"internalType":"address","name":"_erc20Token","type":"address"},{"internalType":"uint256[]","name":"_tokenId","type":"uint256[]"},{"internalType":"uint256[]","name":"_buyNowPrice","type":"uint256[]"},{"internalType":"uint32","name":"_ownerPercentage","type":"uint32"},{"internalType":"uint32","name":"_platformPercentage","type":"uint32"},{"internalType":"uint32","name":"_royaltyPercentage","type":"uint32"}],"name":"createBatchResale","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"_nftContractAddress","type":"address"},{"internalType":"uint256","name":"_tokenId","type":"uint256"},{"internalType":"address","name":"_erc20Token","type":"address"},{"internalType":"uint256","name":"_minPrice","type":"uint256"},{"internalType":"uint32","name":"_royaltyPercentage","type":"uint32"},{"internalType":"uint32","name":"_ownerPercentage","type":"uint32"},{"internalType":"uint32","name":"_platformPercentage","type":"uint32"},{"internalType":"uint256","name":"_auctionEndTime","type":"uint256"},{"internalType":"uint32","name":"_bidIncreasePercentage","type":"uint32"},{"internalType":"uint256","name":"_auctionStartTime","type":"uint256"},{"internalType":"string","name":"_uri","type":"string"}],"name":"createNewNFTAuction","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"_nftContractAddress","type":"address"},{"internalType":"uint256","name":"_tokenId","type":"uint256"},{"internalType":"address","name":"_erc20Token","type":"address"},{"internalType":"uint32","name":"_ownerPercentage","type":"uint32"},{"internalType":"uint32","name":"_platformPercentage","type":"uint32"},{"internalType":"uint256","name":"_buyNowPrice","type":"uint256"},{"internalType":"uint32","name":"_royaltyPercentage","type":"uint32"}],"name":"createResale","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"jwlPercentageCut","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"_nftContractAddress","type":"address"},{"internalType":"uint256","name":"_tokenId","type":"uint256"},{"internalType":"uint256","name":"_tokenAmount","type":"uint256"}],"name":"makeBid","outputs":[],"stateMutability":"payable","type":"function"},{"inputs":[{"internalType":"address","name":"","type":"address"},{"internalType":"uint256","name":"","type":"uint256"}],"name":"nftContractAuctions","outputs":[{"internalType":"uint256","name":"minPrice","type":"uint256"},{"internalType":"uint256","name":"auctionBidPeriod","type":"uint256"},{"internalType":"uint256","name":"auctionEnd","type":"uint256"},{"internalType":"uint256","name":"nftHighestBid","type":"uint256"},{"internalType":"uint256","name":"auctionStartTime","type":"uint256"},{"internalType":"uint32","name":"bidIncreasePercentage","type":"uint32"},{"internalType":"uint32","name":"ownerPercentage","type":"uint32"},{"internalType":"uint32","name":"platformPercentage","type":"uint32"},{"internalType":"address","name":"nftHighestBidder","type":"address"},{"internalType":"address","name":"nftSeller","type":"address"},{"internalType":"address","name":"ERC20Token","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"","type":"address"},{"internalType":"uint256","name":"","type":"uint256"}],"name":"nftContractSale","outputs":[{"internalType":"address","name":"nftSeller","type":"address"},{"internalType":"address","name":"ERC20Token","type":"address"},{"internalType":"uint32","name":"ownerPercentage","type":"uint32"},{"internalType":"uint32","name":"platformPercentage","type":"uint32"},{"internalType":"uint256","name":"buyNowPrice","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"","type":"address"},{"internalType":"address","name":"","type":"address"},{"internalType":"uint256","name":"","type":"uint256"},{"internalType":"bytes","name":"","type":"bytes"}],"name":"onERC721Received","outputs":[{"internalType":"bytes4","name":"","type":"bytes4"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"owner","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"platformLazyNFT","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"renounceOwnership","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"royaltyStorage","outputs":[{"internalType":"contract IRoyaltyStorage","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"_platformLazyNFT","type":"address"},{"internalType":"contract IRoyaltyStorage","name":"_royaltyStorage","type":"address"},{"internalType":"uint256","name":"_jwlPercentageCut","type":"uint256"}],"name":"setInitData","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"_jwlPercentageCut","type":"uint256"}],"name":"setJwlPercentageCut","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"_platformLazyNFT","type":"address"}],"name":"setPlatformNFTContract","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"_tokenId","type":"uint256"},{"internalType":"uint256","name":"_royaltyPercentage","type":"uint256"},{"internalType":"address","name":"_royaltyOwner","type":"address"}],"name":"setRoyaltyData","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"_nftContractAddress","type":"address"},{"internalType":"uint256","name":"_tokenId","type":"uint256"}],"name":"settleAuction","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"newOwner","type":"address"}],"name":"transferOwnership","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"_nftContractAddress","type":"address"},{"internalType":"uint256","name":"_tokenId","type":"uint256"}],"name":"withdrawAuction","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"_nftContractAddress","type":"address"},{"internalType":"uint256","name":"_tokenId","type":"uint256"}],"name":"withdrawSale","outputs":[],"stateMutability":"nonpayable","type":"function"}]
;

const NftContractAddress = "0x296F47de09A37f1c67B081afA0F88aed37566d67";

const tabooAddress = "0xE7a9b31D284d524e87BF002D85Acfcf5d1c9EA67";

export const MakeOffer = async (minPrice, token, from_account) => {
  let web3js = await web3();

  const nftContract = new web3js.eth.Contract(abi, contractAddress);
  const nonce = await web3js.eth.getTransactionCount(from_account, "latest");

  // token="10"
  let amount = minPrice * Math.pow(10, 18);
  amount = amount.toFixed(0);

  let tx;

  try {
    let estimates_gas = await web3js.eth.estimateGas({
      from: from_account,
      to: contractAddress,
      value: web3js.utils.toHex(web3js.utils.toWei("0", "gwei")),
      data: nftContract.methods
        .makeBid(NftContractAddress, token,amount)
        .encodeABI(),
    });

    let gasLimit = web3js.utils.toHex(estimates_gas * 6);
    let gasPrice_bal = await web3js.eth.getGasPrice();
    let gasPrice = web3js.utils.toHex(gasPrice_bal * 2);

    tx = {
      from: from_account,
      to: contractAddress,
      nonce: nonce,
      gasPrice: gasPrice,
      gasLimit: gasLimit,
      value: web3js.utils.toHex(web3js.utils.toWei("0", "gwei")),
      //'maxPriorityFeePerGas': 1999999987,
      data: nftContract.methods
        .makeBid(NftContractAddress, token,amount)
        .encodeABI(),
    };

    return tx;
  } catch (e) {
    toast.error("Execution reverted");
    console.log(e.message)
    console.log(e.message["message"])
    console.log(e.message.message)
    console.log(e)
    
  }
  return tx;
};
