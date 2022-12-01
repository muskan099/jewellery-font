import { web3 } from "./Web3Helper";
export const Connect = async () => {
  try {
    const web3Connect = await web3();
    console.log("web3", web3Connect);

    let chainId = await web3Connect.eth.getChainId();
    console.log("chainId", chainId);

    if (chainId === 97 || chainId === 5 || chainId === 80001) {
      const accounts = await web3Connect.eth.getAccounts();
      let selectedAccount = accounts[0];
      console.log("accounts", accounts);

      return {
        accounts,
        selectedAccount: selectedAccount,
        chainId: chainId,
      };
    } else {
      return false;
    }
  } catch (err) {
    console.log("in cathc block", err.message);
  }
};

export default Connect;
