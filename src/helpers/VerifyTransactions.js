import { web3 } from "../helpers/Web3Helper";

export const VerifyTransactions = async (hash, amount) => {
  let web3js = await web3();

  //let transactionData=await web3js.eth.getTransaction(hash.transactionHash);
  let hash1 = false;
  try {
    let transactionData = await web3js.eth.getTransactionReceipt(
      hash.transactionHash
    );
    let receiverWallet = web3js.eth.abi.decodeParameter(
      "address",
      transactionData.logs[0].topics[2]
    );
    let txData1 = web3js.eth.abi.decodeParameter(
      "uint256",
      transactionData.logs[0].data
    );
    let txAmount = web3js.utils.fromWei(txData1, "ether");

    receiverWallet = receiverWallet.toLowerCase();

    let adminWalletAddress = "0x8768EA5bB7144c39EC3Df69406DcA255d06ac4fC";
    adminWalletAddress = adminWalletAddress.toLowerCase();

    if (amount === txAmount && receiverWallet === adminWalletAddress) {
      hash1 = true;
    }
  } catch (e) {
    return hash1;
  }
};

export default VerifyTransactions;
