import { web3 } from "../helpers/Web3Helper";

export const FindNFTToken = async (hash, amount) => {
  let web3js = await web3();

  //let transactionData=await web3js.eth.getTransaction(hash.transactionHash);
  let hash1 = false;
  try {
    let transactionData = await web3js.eth.getTransactionReceipt(
      hash.transactionHash
    );

    let txData1 = web3js.eth.abi.decodeParameter(
      "uint256",
      transactionData.logs[0].topics[3]
    );
    return txData1;
  } catch (e) {
    console.log("error", e);
    return hash1;
  }
};

export default FindNFTToken;
