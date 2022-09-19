import { web3 } from "./Web3Helper";
export const Connect = async () => {
  try {
    const web3Connect = await web3();
    console.log("web3", web3Connect);

    let chainId = await web3Connect.eth.getChainId();
    console.log("chainId", chainId);

    if (chainId === 97) {
      const accounts = await web3Connect.eth.getAccounts();

      console.log("accounts", accounts);

      return accounts;
    } else {
      return false;
    }
  } catch (err) {
    console.log("in cathc block", err.message);
  }
};

export default Connect;
