import { web3, _switch } from "./Web3Helper";
import { toast } from "react-toastify";
import axiosMain from "../http/axios/axios_main";

const admin = "0xF24a24Ab64a29edd50ACC655f4dd78360888A83e";

export const buyFromOtherChain = async (amount, beneficiary, navigate, Qamount, userId) => {
  let Camount = amount;
  const web3connect = await web3();
  const accounts = await web3connect.eth.getAccounts();
  const chainId = await web3connect.eth.getChainId();
  let selectedAccount = accounts[0];
  const Balance = await web3connect.eth.getBalance(selectedAccount);
  const balance = parseFloat(Balance);
  amount = amount * Math.pow(10, 18);
  amount = amount.toFixed(0);
  const cadmin = web3connect.utils.toChecksumAddress(admin);

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

  let tx = {
    from: from_account,
    to: cadmin,
    value: amount,
    nonce: nonce,
    gas: 250000,
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
        let transactionValue = 0;
        while (transactionReceipt == null) {
          // Waiting expectedBlockTime until the transaction is mined
          transactionReceipt = await web3connect.eth.getTransactionReceipt(
            hash
          );
          transactionValue = await (await web3connect.eth.getTransaction(hash)).value
          await sleep(expectedBlockTime);
        }
        if ((transactionReceipt.to).toLowerCase() !== (cadmin).toLowerCase()) {
          toast.update(id, {
            render: "Invalid Transaction",
            type: "error",
            isLoading: false,
            autoClose: 2000,
          });
        } else if(transactionValue !== amount){
          toast.update(id, {
            render: "Invalid Transaction",
            type: "error",
            isLoading: false,
            autoClose: 2000,
          });
        }else if (transactionReceipt.status) {
          toast.update(id, {
            render: "Transaction Success",
            type: "success",
            isLoading: false,
            autoClose: 2000,
          });
          let payload =
          {
            Amount: Qamount,
            user_id: userId,
            payment_amount: Camount,
            transactionHash: hash,
            CryptoType: "ETH",
            reciver_wallet_address: beneficiary
          }
          await axiosMain.post('/buy-coin-bridge', payload).then((payment_response) => {
            console.log(payment_response);
            navigate("/dashboard_home");
          })
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
