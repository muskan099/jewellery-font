import { web3, _switch } from "./Web3Helper";
import { toast } from "react-toastify";

const address = "0x4cc2A8b6d2B0EFBfB3dA46C1fDd5177e185455E4";
const abi = [{"inputs":[{"internalType":"address payable","name":"wallet","type":"address"},{"internalType":"address","name":"admin","type":"address"},{"internalType":"contract IERC20","name":"token","type":"address"},{"internalType":"contract IERC20","name":"busd","type":"address"},{"internalType":"contract IERC20","name":"eth","type":"address"},{"internalType":"contract IERC20","name":"btc","type":"address"},{"internalType":"contract IERC20","name":"usdc","type":"address"},{"internalType":"contract IERC20","name":"usdt","type":"address"},{"internalType":"contract IProviderPair","name":"_BusdBnb","type":"address"},{"internalType":"contract IProviderPair","name":"_BusdEth","type":"address"},{"internalType":"contract IProviderPair","name":"_BusdBtc","type":"address"},{"internalType":"uint256","name":"_newRate","type":"uint256"}],"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"previousOwner","type":"address"},{"indexed":true,"internalType":"address","name":"newOwner","type":"address"}],"name":"OwnershipTransferred","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"address","name":"purchaser","type":"address"},{"indexed":false,"internalType":"address","name":"beneficiary","type":"address"},{"indexed":false,"internalType":"uint256","name":"value","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"}],"name":"TokensPurchased","type":"event"},{"inputs":[{"internalType":"contract IProviderPair","name":"_BusdBnb","type":"address"},{"internalType":"contract IProviderPair","name":"_BusdEth","type":"address"},{"internalType":"contract IProviderPair","name":"_BusdBtc","type":"address"}],"name":"AddProvider","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"BusdBnb","outputs":[{"internalType":"contract IProviderPair","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"BusdBtc","outputs":[{"internalType":"contract IProviderPair","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"BusdEth","outputs":[{"internalType":"contract IProviderPair","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"TotalTokenDistributed","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"_BTC","outputs":[{"internalType":"contract IERC20","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"_BTCcontributions","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"_BUSD","outputs":[{"internalType":"contract IERC20","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"_BUSDcontributions","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"_ETH","outputs":[{"internalType":"contract IERC20","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"_ETHcontributions","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"_USDC","outputs":[{"internalType":"contract IERC20","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"_USDCcontributions","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"_USDT","outputs":[{"internalType":"contract IERC20","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"_USDTcontributions","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"_admin","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"_bnbRaised","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"_bonusamt","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"_bonuspercent","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"_btcRaised","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"_busdRaised","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"_busdrate","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"_contributions","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"_ethRaised","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"_token","outputs":[{"internalType":"contract IERC20","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"_usdcRaised","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"_usdtRaised","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"_wallet","outputs":[{"internalType":"address payable","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"_beneficiary","type":"address"},{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"adminTransfer","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"availableTokensICO","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"bnbRate","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"_amount","type":"uint256"},{"internalType":"uint256","name":"_percent","type":"uint256"}],"name":"bonusAmount","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"btcRate","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"_beneficiary","type":"address"}],"name":"buyTokens","outputs":[],"stateMutability":"payable","type":"function"},{"inputs":[{"internalType":"address","name":"_beneficiary","type":"address"},{"internalType":"uint256","name":"_BTCAmount","type":"uint256"}],"name":"buyTokensBTC","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"_beneficiary","type":"address"},{"internalType":"uint256","name":"_BUSDAmount","type":"uint256"}],"name":"buyTokensBUSD","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"_beneficiary","type":"address"},{"internalType":"uint256","name":"_ETHAmount","type":"uint256"}],"name":"buyTokensETH","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"_beneficiary","type":"address"},{"internalType":"uint256","name":"_USDCAmount","type":"uint256"}],"name":"buyTokensUSDC","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"_beneficiary","type":"address"},{"internalType":"uint256","name":"_USDTAmount","type":"uint256"}],"name":"buyTokensUSDT","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"endICO","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"ethRate","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"contract IProviderPair","name":"_pairAddress","type":"address"}],"name":"getPriceData","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"hardCap","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"owner","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"contract IERC20","name":"busd","type":"address"},{"internalType":"contract IERC20","name":"eth","type":"address"},{"internalType":"contract IERC20","name":"btc","type":"address"},{"internalType":"contract IERC20","name":"usdc","type":"address"},{"internalType":"contract IERC20","name":"usdt","type":"address"}],"name":"setAddress","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"admin","type":"address"}],"name":"setAdmin","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"_amount","type":"uint256"}],"name":"setAvailableTokens","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"_endICO","type":"uint256"}],"name":"setEndICO","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"_value","type":"uint256"}],"name":"setHardCap","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"_start","type":"uint256"}],"name":"setStartICO","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"contract IERC20","name":"token","type":"address"}],"name":"setToken","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address payable","name":"_newWallet","type":"address"}],"name":"setWalletReceiver","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"_newRate","type":"uint256"}],"name":"setbusdrate","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"_start","type":"uint256"},{"internalType":"uint256","name":"_end","type":"uint256"},{"internalType":"uint256","name":"_hardCap","type":"uint256"}],"name":"startICO","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"startICOTime","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"stopICO","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"contract IERC20","name":"_TokenAddress","type":"address"}],"name":"takeTokens","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"newOwner","type":"address"}],"name":"transferOwnership","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"withdraw","outputs":[],"stateMutability":"nonpayable","type":"function"},{"stateMutability":"payable","type":"receive"}]

export const buytoken = async (amount,beneficiary, navigate,setIsLoading) => {
  let camount = amount;
  const web3connect = await web3();

  const accounts = await web3connect.eth.getAccounts();

  const chainId = await web3connect.eth.getChainId();

  if (chainId != 97) {
    // alert('Please Switch To BSC Network');
    _switch();
    // toast.success('You have succefully switched to Binance Test network');
    return false;
  }
  // toast.info("www.facebook.com");
  // return false;

  let selectedAccount = accounts[0];

  const Balance = await web3connect.eth.getBalance(selectedAccount);
  const balance = parseFloat(Balance);
  amount = amount * Math.pow(10, 18);
  amount = amount.toFixed(0);
  const caddress = web3connect.utils.toChecksumAddress(address);
  const presaleContract = new web3connect.eth.Contract(abi, caddress);

  let hardcap = await presaleContract.methods.hardCap().call();
  let TotalDistributed = await presaleContract.methods
    .TotalTokenDistributed()
    .call();

  TotalDistributed = parseFloat(TotalDistributed);
  TotalDistributed = TotalDistributed / Math.pow(10, 18);

  hardcap = parseFloat(hardcap);
  hardcap = hardcap / Math.pow(10, 18);

  let Hardcap = hardcap - TotalDistributed;
  if (camount > Hardcap) {
    toast.error("Can not buy more than the limit");
    window.location.reload();
    return false;
  }
  const difference = balance - amount;
  if (difference < 0) {
    toast.error("Your Account Balance is Insufficient");
    setTimeout(() => {
      window.location.reload();
    }, 1000);
    return false;
  }

  const nonce = await web3connect.eth.getTransactionCount(
    selectedAccount,
    "latest"
  ); //get latest nonce
  const from_account = web3connect.utils.toChecksumAddress(selectedAccount);
  
  beneficiary = web3connect.utils.toChecksumAddress(beneficiary);

  // let estimates_gas = await web3connect.eth.estimateGas({
  //     'from':from_account,
  //     'to':caddress,
  //     'value' : amount,
  //     "data": presaleContract.methods.buyTokens(from_account).encodeABI(),
  //   });

  //   let gasLimit =web3connect.utils.toHex(estimates_gas *2);
  //   let gasPrice_bal = await web3connect.eth.getGasPrice();
  //   let gasPrice =web3connect.utils.toHex(gasPrice_bal*2);
  // camount = camount.toFixed(17)
  // let Payamount =  "0x" + (camount * 1000000000000000000).toString(16);
  let tx = {
    from: from_account,
    to: caddress,
    value: amount,
    nonce: nonce,
    gas: 250000,
    // 'maxPriorityFeePerGas': 1999999987,
    data: presaleContract.methods.buyTokens(beneficiary).encodeABI(),
  };

  web3connect.eth.sendTransaction(tx, function (err, hash) {
    if (!err) {
      const id = toast.loading(
        "Please Check your Metamask for any Pending Transaction"
      );
      // toast.success('Wait For transaction to Success')
      // show modal
      const expectedBlockTime = 1000; // 1sec
      const sleep = (milliseconds) => {
        return new Promise((resolve) => setTimeout(resolve, milliseconds));
      };
      (async function () {
        let transactionReceipt = null;
        while (transactionReceipt == null) {
          // Waiting expectedBlockTime until the transaction is mined
          transactionReceipt = await web3connect.eth.getTransactionReceipt(
            hash
          );
          await sleep(expectedBlockTime);
        }
        if (transactionReceipt.status) {
          toast.update(id, {
            render: "Transaction Success",
            type: "success",
            isLoading: false,
            autoClose: 2000,
          });
          setIsLoading(false);
          // navigate("/dashboard_home");
        } else {
          toast.update(id, {
            render: "Transaction Reverted",
            type: "error",
            isLoading: false,
            autoClose: 2000,
          });
          window.location.reload();

          // toast.error('Transaction Reverted');
        }
      })();
    } else {
      toast.error("Transaction Reverted");
      window.location.reload();
    }
  });
};
