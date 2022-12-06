import { web3 } from "./Web3Helper";
export const Connect = async () => {
  try {
    const web3Connect = await web3();

    let chainId = await web3Connect.eth.getChainId();

    if (chainId === 97 || chainId === 5 || chainId === 80001) {
      const accounts = await web3Connect.eth.getAccounts();
      let selectedAccount = accounts[0];

      return {
        accounts,
        selectedAccount: selectedAccount,
        chainId: chainId,
      };
    } else {
      return false;
    }
  } catch (err) {
    console.log(err.message);
  }
};

export default Connect;
