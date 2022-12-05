import moment, { min } from "moment";
import { web3 } from "./Web3Helper";

const contractAddress = "0xc24d2E07715b11b8E01CA57d3d63a4F6E2F9f3e1";

const abi = [{"inputs":[{"internalType":"address payable","name":"minter","type":"address"},{"internalType":"address","name":"_jwlToken","type":"address"},{"internalType":"contract IMarketplace","name":"_nftAuctionContract","type":"address"},{"internalType":"contract IRoyaltyStorage","name":"_royaltyStorage","type":"address"}],"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"owner","type":"address"},{"indexed":true,"internalType":"address","name":"approved","type":"address"},{"indexed":true,"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"Approval","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"owner","type":"address"},{"indexed":true,"internalType":"address","name":"operator","type":"address"},{"indexed":false,"internalType":"bool","name":"approved","type":"bool"}],"name":"ApprovalForAll","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"previousOwner","type":"address"},{"indexed":true,"internalType":"address","name":"newOwner","type":"address"}],"name":"OwnershipTransferred","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"bytes32","name":"role","type":"bytes32"},{"indexed":true,"internalType":"bytes32","name":"previousAdminRole","type":"bytes32"},{"indexed":true,"internalType":"bytes32","name":"newAdminRole","type":"bytes32"}],"name":"RoleAdminChanged","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"bytes32","name":"role","type":"bytes32"},{"indexed":true,"internalType":"address","name":"account","type":"address"},{"indexed":true,"internalType":"address","name":"sender","type":"address"}],"name":"RoleGranted","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"bytes32","name":"role","type":"bytes32"},{"indexed":true,"internalType":"address","name":"account","type":"address"},{"indexed":true,"internalType":"address","name":"sender","type":"address"}],"name":"RoleRevoked","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"from","type":"address"},{"indexed":true,"internalType":"address","name":"to","type":"address"},{"indexed":true,"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"Transfer","type":"event"},{"inputs":[],"name":"CANNOT_TRANSFER_TO_ZERO_ADDRESS","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"DEFAULT_ADMIN_ROLE","outputs":[{"internalType":"bytes32","name":"","type":"bytes32"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"MINTER_ROLE","outputs":[{"internalType":"bytes32","name":"","type":"bytes32"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"NOT_CURRENT_OWNER","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[{"components":[{"internalType":"uint256","name":"minPrice","type":"uint256"},{"internalType":"string","name":"uri","type":"string"},{"internalType":"bytes","name":"signature","type":"bytes"}],"internalType":"struct JewelleryNFT.NFTVoucher","name":"voucher","type":"tuple"}],"name":"_verify","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"approve","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"owner","type":"address"}],"name":"balanceOf","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"_from","type":"address"},{"internalType":"address","name":"_to","type":"address"},{"internalType":"uint256","name":"_tokenId","type":"uint256"}],"name":"contractSafeTransferFrom","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"getApproved","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"getChainID","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"bytes32","name":"role","type":"bytes32"}],"name":"getRoleAdmin","outputs":[{"internalType":"bytes32","name":"","type":"bytes32"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"getetherbalance","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"account","type":"address"}],"name":"grantMinter","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"bytes32","name":"role","type":"bytes32"},{"internalType":"address","name":"account","type":"address"}],"name":"grantRole","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"bytes32","name":"role","type":"bytes32"},{"internalType":"address","name":"account","type":"address"}],"name":"hasRole","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"owner","type":"address"},{"internalType":"address","name":"operator","type":"address"}],"name":"isApprovedForAll","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"_to","type":"address"},{"internalType":"uint256","name":"_amount","type":"uint256"},{"internalType":"string","name":"_uri","type":"string"}],"name":"mint","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"name","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"nftAuctionContract","outputs":[{"internalType":"contract IMarketplace","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"owner","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"ownerOf","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"_redeemer","type":"address"},{"components":[{"internalType":"uint256","name":"minPrice","type":"uint256"},{"internalType":"string","name":"uri","type":"string"},{"internalType":"bytes","name":"signature","type":"bytes"}],"internalType":"struct JewelleryNFT.NFTVoucher","name":"_voucher","type":"tuple"},{"internalType":"address","name":"_creator","type":"address"},{"internalType":"address","name":"_admin","type":"address"},{"internalType":"uint256","name":"_adminPercent","type":"uint256"},{"internalType":"uint256","name":"_royaltyPercentage","type":"uint256"},{"internalType":"uint256","name":"_platformPercentage","type":"uint256"}],"name":"redeem","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"bytes32","name":"role","type":"bytes32"},{"internalType":"address","name":"account","type":"address"}],"name":"renounceRole","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"bytes32","name":"role","type":"bytes32"},{"internalType":"address","name":"account","type":"address"}],"name":"revokeRole","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"royaltyStorage","outputs":[{"internalType":"contract IRoyaltyStorage","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"from","type":"address"},{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"safeTransferFrom","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"from","type":"address"},{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"tokenId","type":"uint256"},{"internalType":"bytes","name":"_data","type":"bytes"}],"name":"safeTransferFrom","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"operator","type":"address"},{"internalType":"bool","name":"approved","type":"bool"}],"name":"setApprovalForAll","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"contract IMarketplace","name":"_nftAuctionContract","type":"address"},{"internalType":"contract IRoyaltyStorage","name":"_royaltyStorage","type":"address"}],"name":"setMarketplaceContract","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"_tokenId","type":"uint256"},{"internalType":"string","name":"_uri","type":"string"}],"name":"setTokenURI","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"bytes4","name":"interfaceId","type":"bytes4"}],"name":"supportsInterface","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"symbol","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"tokenURI","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"holder","type":"address"}],"name":"tokensOwned","outputs":[{"internalType":"uint256[]","name":"","type":"uint256[]"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"totalSupply","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"from","type":"address"},{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"transferFrom","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"_newOwner","type":"address"}],"name":"transferOwnership","outputs":[],"stateMutability":"nonpayable","type":"function"},{"stateMutability":"payable","type":"receive"}]

const NftContractAddress = "0x0000000000000000000000000000000000000000";

const tabooAddress = "0x106a4afc72D9Dc3026323711c81A84c250fe45fF";

const NftContract = "0x296F47de09A37f1c67B081afA0F88aed37566d67";

export const createAuction = async (
  token,
  minPrice,
  rPercentage,
  oPercentage,
  pPercentage,
  timePeriod,
  biPercentage,
  startTime,
  uri,
  from_account
) => {
  console.log("start time", startTime);

  startTime = new Date();
  timePeriod = new Date(timePeriod);
  let end_date = moment(timePeriod, "YYYY-MM-DD HH:mm:ss", true).format();

  let start_time = moment(startTime, "YYYY-MM-DD HH:mm:ss", true).format();

  timePeriod = timePeriod.getTime() / 1000; //moment(end_date,"YY-MM-DD").valueOf()

  //startTime=new Date(startTime);

  startTime.setMinutes(startTime.getMinutes() + 10 );

  startTime = Math.floor(startTime.getTime()/1000); //moment(start_time,"YY-MM-DD").valueOf();

  token = 0;

  console.log("start time", startTime);

  let web3js = await web3();

  const nftContract = new web3js.eth.Contract(abi, contractAddress);

  const nonce = await web3js.eth.getTransactionCount(from_account, "latest");

  let tx = 0;
  minPrice = "0x" + (minPrice * 1000000000000000000).toString(16);

  console.log("uri", uri);

  try {
    let estimates_gas = await web3js.eth.estimateGas({
      from: from_account,
      to: contractAddress,
      data: nftContract.methods
        .createNewNFTAuction(
          NftContractAddress,
          token,
          tabooAddress,
          minPrice,
          rPercentage,
          oPercentage,
          pPercentage,
          timePeriod,
          biPercentage,
          startTime,
          uri
        )
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
      //'maxPriorityFeePerGas': 1999999987,
      data: nftContract.methods
        .createNewNFTAuction(
          NftContractAddress,
          token,
          tabooAddress,
          minPrice,
          rPercentage,
          oPercentage,
          pPercentage,
          timePeriod,
          biPercentage,
          startTime,
          uri
        )
        .encodeABI(),
    };

    return tx;
  } catch (e) {
    console.log(e);
  }
  return tx;
};




export const createNFTAuction = async (
  token,
  minPrice,
  rPercentage,
  oPercentage,
  pPercentage,
  timePeriod,
  biPercentage,
  startTime,
  uri,
  from_account
) => {
  console.log("start time", startTime);

  startTime = new Date();
  timePeriod = new Date(timePeriod);
  let end_date = moment(timePeriod, "YYYY-MM-DD HH:mm:ss", true).format();

  let start_time = moment(startTime, "YYYY-MM-DD HH:mm:ss", true).format();

  timePeriod = timePeriod.getTime() / 1000; //moment(end_date,"YY-MM-DD").valueOf()

  startTime.setMinutes(startTime.getMinutes() + 10 );

  startTime = startTime.getTime() / 1000; //moment(start_time,"YY-MM-DD").valueOf();

  startTime=Math.ceil(startTime);

  timePeriod=Math.ceil(timePeriod);

 console.log('address',from_account)
 
  console.log("start time", startTime);

  let web3js = await web3();

  const nftContract = new web3js.eth.Contract(abi, contractAddress);

  const nonce = await web3js.eth.getTransactionCount(from_account, "latest");

  console.log("token",token)

  console.log("price",minPrice)

  let tx = 0;
  minPrice = "0x" + (minPrice * 1000000000000000000).toString(16);

  console.log("price",minPrice)

  console.log("uri", uri);

  //token="0x" + (token).toString(16)
  console.log("from_account",from_account);


  try {
    let estimates_gas = await web3js.eth.estimateGas({
      from: from_account,
      to: contractAddress,
      data: nftContract.methods
        .createNewNFTAuction(
          NftContract,
          token,
          tabooAddress,
          minPrice,
          rPercentage,
          oPercentage,
          pPercentage,
          timePeriod,
          biPercentage,
          startTime,
          uri
        )
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
      //'maxPriorityFeePerGas': 1999999987,
      data: nftContract.methods
        .createNewNFTAuction(
          NftContract,
          token,
          tabooAddress,
          minPrice,
          rPercentage,
          oPercentage,
          pPercentage,
          timePeriod,
          biPercentage,
          startTime,
          uri
        )
        .encodeABI(),
    };

    return tx;
  } catch (e) {
    console.log(e);
  }
  return tx;
};

