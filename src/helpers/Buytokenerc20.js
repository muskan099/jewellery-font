import { web3, _switch } from "./Web3Helper";
import { toast } from "react-toastify";

//Presale contract
const address = "0x4cc2A8b6d2B0EFBfB3dA46C1fDd5177e185455E4";
const abi = [{"inputs":[{"internalType":"address payable","name":"wallet","type":"address"},{"internalType":"address","name":"admin","type":"address"},{"internalType":"contract IERC20","name":"token","type":"address"},{"internalType":"contract IERC20","name":"busd","type":"address"},{"internalType":"contract IERC20","name":"eth","type":"address"},{"internalType":"contract IERC20","name":"btc","type":"address"},{"internalType":"contract IERC20","name":"usdc","type":"address"},{"internalType":"contract IERC20","name":"usdt","type":"address"},{"internalType":"contract IProviderPair","name":"_BusdBnb","type":"address"},{"internalType":"contract IProviderPair","name":"_BusdEth","type":"address"},{"internalType":"contract IProviderPair","name":"_BusdBtc","type":"address"},{"internalType":"uint256","name":"_newRate","type":"uint256"}],"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"previousOwner","type":"address"},{"indexed":true,"internalType":"address","name":"newOwner","type":"address"}],"name":"OwnershipTransferred","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"address","name":"purchaser","type":"address"},{"indexed":false,"internalType":"address","name":"beneficiary","type":"address"},{"indexed":false,"internalType":"uint256","name":"value","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"}],"name":"TokensPurchased","type":"event"},{"inputs":[{"internalType":"contract IProviderPair","name":"_BusdBnb","type":"address"},{"internalType":"contract IProviderPair","name":"_BusdEth","type":"address"},{"internalType":"contract IProviderPair","name":"_BusdBtc","type":"address"}],"name":"AddProvider","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"BusdBnb","outputs":[{"internalType":"contract IProviderPair","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"BusdBtc","outputs":[{"internalType":"contract IProviderPair","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"BusdEth","outputs":[{"internalType":"contract IProviderPair","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"TotalTokenDistributed","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"_BTC","outputs":[{"internalType":"contract IERC20","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"_BTCcontributions","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"_BUSD","outputs":[{"internalType":"contract IERC20","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"_BUSDcontributions","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"_ETH","outputs":[{"internalType":"contract IERC20","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"_ETHcontributions","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"_USDC","outputs":[{"internalType":"contract IERC20","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"_USDCcontributions","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"_USDT","outputs":[{"internalType":"contract IERC20","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"_USDTcontributions","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"_admin","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"_bnbRaised","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"_bonusamt","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"_bonuspercent","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"_btcRaised","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"_busdRaised","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"_busdrate","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"_contributions","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"_ethRaised","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"_token","outputs":[{"internalType":"contract IERC20","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"_usdcRaised","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"_usdtRaised","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"_wallet","outputs":[{"internalType":"address payable","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"_beneficiary","type":"address"},{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"adminTransfer","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"availableTokensICO","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"bnbRate","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"_amount","type":"uint256"},{"internalType":"uint256","name":"_percent","type":"uint256"}],"name":"bonusAmount","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"btcRate","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"_beneficiary","type":"address"}],"name":"buyTokens","outputs":[],"stateMutability":"payable","type":"function"},{"inputs":[{"internalType":"address","name":"_beneficiary","type":"address"},{"internalType":"uint256","name":"_BTCAmount","type":"uint256"}],"name":"buyTokensBTC","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"_beneficiary","type":"address"},{"internalType":"uint256","name":"_BUSDAmount","type":"uint256"}],"name":"buyTokensBUSD","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"_beneficiary","type":"address"},{"internalType":"uint256","name":"_ETHAmount","type":"uint256"}],"name":"buyTokensETH","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"_beneficiary","type":"address"},{"internalType":"uint256","name":"_USDCAmount","type":"uint256"}],"name":"buyTokensUSDC","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"_beneficiary","type":"address"},{"internalType":"uint256","name":"_USDTAmount","type":"uint256"}],"name":"buyTokensUSDT","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"endICO","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"ethRate","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"contract IProviderPair","name":"_pairAddress","type":"address"}],"name":"getPriceData","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"hardCap","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"owner","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"contract IERC20","name":"busd","type":"address"},{"internalType":"contract IERC20","name":"eth","type":"address"},{"internalType":"contract IERC20","name":"btc","type":"address"},{"internalType":"contract IERC20","name":"usdc","type":"address"},{"internalType":"contract IERC20","name":"usdt","type":"address"}],"name":"setAddress","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"admin","type":"address"}],"name":"setAdmin","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"_amount","type":"uint256"}],"name":"setAvailableTokens","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"_endICO","type":"uint256"}],"name":"setEndICO","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"_value","type":"uint256"}],"name":"setHardCap","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"_start","type":"uint256"}],"name":"setStartICO","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"contract IERC20","name":"token","type":"address"}],"name":"setToken","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address payable","name":"_newWallet","type":"address"}],"name":"setWalletReceiver","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"_newRate","type":"uint256"}],"name":"setbusdrate","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"_start","type":"uint256"},{"internalType":"uint256","name":"_end","type":"uint256"},{"internalType":"uint256","name":"_hardCap","type":"uint256"}],"name":"startICO","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"startICOTime","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"stopICO","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"contract IERC20","name":"_TokenAddress","type":"address"}],"name":"takeTokens","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"newOwner","type":"address"}],"name":"transferOwnership","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"withdraw","outputs":[],"stateMutability":"nonpayable","type":"function"},{"stateMutability":"payable","type":"receive"}]

// BUSD Contract
const BusdContractaddress = "0xed24fc36d5ee211ea25a80239fb8c4cfd80f12ee";
const TokenAbi = [
  {
    constant: true,
    inputs: [],
    name: "name",
    outputs: [{ name: "", type: "string" }],
    payable: false,
    stateMutability: "view",
    type: "function",
  },
  {
    constant: false,
    inputs: [
      { name: "_spender", type: "address" },
      { name: "_value", type: "uint256" },
    ],
    name: "approve",
    outputs: [{ name: "", type: "bool" }],
    payable: false,
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    constant: true,
    inputs: [],
    name: "totalSupply",
    outputs: [{ name: "", type: "uint256" }],
    payable: false,
    stateMutability: "view",
    type: "function",
  },
  {
    constant: false,
    inputs: [
      { name: "_from", type: "address" },
      { name: "_to", type: "address" },
      { name: "_value", type: "uint256" },
    ],
    name: "transferFrom",
    outputs: [{ name: "", type: "bool" }],
    payable: false,
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    constant: true,
    inputs: [],
    name: "INITIAL_SUPPLY",
    outputs: [{ name: "", type: "uint256" }],
    payable: false,
    stateMutability: "view",
    type: "function",
  },
  {
    constant: true,
    inputs: [],
    name: "decimals",
    outputs: [{ name: "", type: "uint256" }],
    payable: false,
    stateMutability: "view",
    type: "function",
  },
  {
    constant: false,
    inputs: [{ name: "_value", type: "uint256" }],
    name: "burn",
    outputs: [{ name: "", type: "bool" }],
    payable: false,
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    constant: true,
    inputs: [{ name: "_owner", type: "address" }],
    name: "balanceOf",
    outputs: [{ name: "balance", type: "uint256" }],
    payable: false,
    stateMutability: "view",
    type: "function",
  },
  {
    constant: false,
    inputs: [
      { name: "_from", type: "address" },
      { name: "_value", type: "uint256" },
    ],
    name: "burnFrom",
    outputs: [{ name: "", type: "bool" }],
    payable: false,
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    constant: true,
    inputs: [],
    name: "symbol",
    outputs: [{ name: "", type: "string" }],
    payable: false,
    stateMutability: "view",
    type: "function",
  },
  {
    constant: false,
    inputs: [
      { name: "_to", type: "address" },
      { name: "_value", type: "uint256" },
    ],
    name: "transfer",
    outputs: [{ name: "", type: "bool" }],
    payable: false,
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    constant: true,
    inputs: [
      { name: "_owner", type: "address" },
      { name: "_spender", type: "address" },
    ],
    name: "allowance",
    outputs: [{ name: "remaining", type: "uint256" }],
    payable: false,
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      { name: "_name", type: "string" },
      { name: "_symbol", type: "string" },
      { name: "_decimals", type: "uint256" },
    ],
    payable: false,
    stateMutability: "nonpayable",
    type: "constructor",
  },
  {
    anonymous: false,
    inputs: [
      { indexed: true, name: "_burner", type: "address" },
      { indexed: false, name: "_value", type: "uint256" },
    ],
    name: "Burn",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      { indexed: true, name: "owner", type: "address" },
      { indexed: true, name: "spender", type: "address" },
      { indexed: false, name: "value", type: "uint256" },
    ],
    name: "Approval",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      { indexed: true, name: "from", type: "address" },
      { indexed: true, name: "to", type: "address" },
      { indexed: false, name: "value", type: "uint256" },
    ],
    name: "Transfer",
    type: "event",
  },
];

// ETH Contract
const EthContractaddress = "0xd66c6B4F0be8CE5b39D52E0Fd1344c389929B378";

// BTC Contract
const BtcContractaddress = "0x6ce8da28e2f864420840cf74474eff5fd80e65b8";

export const buyApproveERC20 = async (amount, contract) => {
  contract = contract.toString();
  let cAmount = amount;
  const web3connect = await web3();

  const accounts = await web3connect.eth.getAccounts();

  let selectedAccount = accounts[0];

  const chainId = await web3connect.eth.getChainId();

  if (chainId != 97) {
    // alert('Please Switch To BSC Network');
    _switch();
    return false;
  }

  let Bamount = "0x" + (amount * 1000000000000000000).toString(16);
  let Aamount = "0x" + (amount * 100000000000000000000).toString(16);
  // amount = BigInt(amount * 1000000000000000000).toString();
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

  if (cAmount > Hardcap) {
    toast.error("Can not buy more than the limit");
    window.location.reload();
    return false;
  }

  // const web3 = new Web3(provider);

  const nonce = await web3connect.eth.getTransactionCount(
    selectedAccount,
    "latest"
  ); //get latest nonce
  const from_account = web3connect.utils.toChecksumAddress(selectedAccount);

  let ERCTokenAddress;
  let allowance;
  let Balance;
  let Data;
  let ApproveData;
  let approveContract;

  if (contract == "BUSD") {
    ERCTokenAddress = web3connect.utils.toChecksumAddress(BusdContractaddress);
    approveContract = new web3connect.eth.Contract(TokenAbi, ERCTokenAddress);
    allowance =
      (await approveContract.methods.allowance(from_account, caddress).call()) /
      1e18;
    Balance =
      (await approveContract.methods.balanceOf(from_account).call()) / 1e18;
    Data = presaleContract.methods
      .buyTokensBUSD(from_account, Bamount)
      .encodeABI();
    ApproveData = approveContract.methods
      .approve(caddress, Aamount)
      .encodeABI();
  } else if (contract == "BETH") {
    ERCTokenAddress = web3connect.utils.toChecksumAddress(EthContractaddress);
    approveContract = new web3connect.eth.Contract(TokenAbi, ERCTokenAddress);
    allowance =
      (await approveContract.methods.allowance(from_account, caddress).call()) /
      1e18;
    Balance =
      (await approveContract.methods.balanceOf(from_account).call()) / 1e18;
    Data = presaleContract.methods
      .buyTokensETH(from_account, Bamount)
      .encodeABI();
    ApproveData = approveContract.methods
      .approve(caddress, Aamount)
      .encodeABI();
  } else if (contract == "BTCB") {
    ERCTokenAddress = web3connect.utils.toChecksumAddress(BtcContractaddress);
    approveContract = new web3connect.eth.Contract(TokenAbi, ERCTokenAddress);
    allowance =
      (await approveContract.methods.allowance(from_account, caddress).call()) /
      1e18;
    Balance =
      (await approveContract.methods.balanceOf(from_account).call()) / 1e18;
    Data = presaleContract.methods
      .buyTokensBTC(from_account, Bamount)
      .encodeABI();
    ApproveData = approveContract.methods
      .approve(caddress, Aamount)
      .encodeABI();
  }

  if (allowance >= cAmount) {
    if (Balance < cAmount) {
      var answer = window.confirm(
        `You dont have enough ${contract} to proceed, do you want to buy it now?`
      );
      if (answer) {
        window.open("https://cbridge.celer.network/#/transfer", "_blank");
        window.location.reload();
        return false;
      } else {
        return false;
      }
    }

    let tx = {
      from: from_account,
      to: caddress,
      nonce: nonce,
      gas: 500000,
      // 'maxPriorityFeePerGas': 1999999987,
      data: Data,
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
            toast.success("Transaction Success");
            toast.update(id, {
              render: "Transaction Success",
              type: "success",
              isLoading: false,
              autoClose: 2000,
            });
          } else {
            toast.update(id, {
              render: "Transaction Reverted",
              type: "error",
              isLoading: false,
              autoClose: 2000,
            });
            // toast.error('Transaction Reverted');
            window.location.reload();
          }
        })();
      } else {
        toast.error("Transaction Reverted");
        window.location.reload();

      }
    });
  } else {
    let tx = {
      from: from_account,
      to: ERCTokenAddress,
      nonce: nonce,
      gas: 500000,
      // 'maxPriorityFeePerGas': 1999999987,
      data: ApproveData,
    };

    web3connect.eth.sendTransaction(tx, function (err, hash) {
      if (!err) {
        const ids = toast.loading(
          "Please Check your Metamask for any Pending Transaction"
        );
        // toast.success('Please Wait Till Your Transaction is Success')
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
            toast.update(ids, {
              render: "Transaction Success",
              type: "success",
              isLoading: false,
              autoClose: 2000,
            });
            window.location.reload();

            // toast.success('Transaction Success')
          } else {
            toast.update(ids, {
              render: "Transaction Reverted",
              type: "error",
              isLoading: false,
              autoClose: 2000,
            });
            // toast.error('Transaction Reverted');
            window.location.reload();
          }
        })();
      } else {
        toast.error("Transaction Reverted");
        window.location.reload();
      }
    });
  }
};

export const buyTokensERC20 = async (
  amount,
  beneficiary,
  contract,
  navigate
) => {
  contract = contract.toString();
  let cAmount = amount;
  const web3connect = await web3();

  const accounts = await web3connect.eth.getAccounts();

  let selectedAccount = accounts[0];

  const chainId = await web3connect.eth.getChainId();

  if (chainId != 97) {
    // alert('Please Switch To BSC Testnet Network');
    _switch();
    return false;
  }

  // amount = amount*Math.pow(10,18);
  let Bamount = "0x" + (amount * 1000000000000000000).toString(16);
  let Aamount = "0x" + (amount * 100000000000000000000).toString(16);
  // amount = BigInt(amount * 1000000000000000000).toString();
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

  if (cAmount > Hardcap) {
    toast.error("Can not buy more than the limit");
    window.location.reload();
    return false;
  }

  // const web3 = new Web3(provider);

  const nonce = await web3connect.eth.getTransactionCount(
    selectedAccount,
    "latest"
  ); //get latest nonce
  const from_account = web3connect.utils.toChecksumAddress(selectedAccount);

  beneficiary = web3connect.utils.toChecksumAddress(beneficiary);

  let ERCTokenAddress;
  let allowance;
  let Balance;
  let Data;
  let ApproveData;
  let approveContract;

  if (contract == "BUSD") {
    ERCTokenAddress = web3connect.utils.toChecksumAddress(BusdContractaddress);
    approveContract = new web3connect.eth.Contract(TokenAbi, ERCTokenAddress);
    allowance =
      (await approveContract.methods.allowance(from_account, caddress).call()) /
      1e18;
    Balance =
      (await approveContract.methods.balanceOf(from_account).call()) / 1e18;
    Data = presaleContract.methods
      .buyTokensBUSD(beneficiary, Bamount)
      .encodeABI();
    ApproveData = approveContract.methods
      .approve(caddress, Aamount)
      .encodeABI();
  } else if (contract == "BETH") {
    ERCTokenAddress = web3connect.utils.toChecksumAddress(EthContractaddress);
    approveContract = new web3connect.eth.Contract(TokenAbi, ERCTokenAddress);
    allowance =
      (await approveContract.methods.allowance(from_account, caddress).call()) /
      1e18;
    Balance =
      (await approveContract.methods.balanceOf(from_account).call()) / 1e18;
    Data = presaleContract.methods
      .buyTokensETH(beneficiary, Bamount)
      .encodeABI();
    ApproveData = approveContract.methods
      .approve(caddress, Aamount)
      .encodeABI();
  } else if (contract == "BTCB") {
    ERCTokenAddress = web3connect.utils.toChecksumAddress(BtcContractaddress);
    approveContract = new web3connect.eth.Contract(TokenAbi, ERCTokenAddress);
    allowance =
      (await approveContract.methods.allowance(from_account, caddress).call()) /
      1e18;
    Balance =
      (await approveContract.methods.balanceOf(from_account).call()) / 1e18;
    Data = presaleContract.methods
      .buyTokensBTC(beneficiary, Bamount)
      .encodeABI();
    ApproveData = approveContract.methods
      .approve(caddress, Aamount)
      .encodeABI();
  }

  if (allowance >= cAmount) {
    if (Balance < cAmount) {
      var answer = window.confirm(
        `You dont have enough ${contract} to proceed, do you want to buy it now?`
      );
      if (answer) {
        window.open("https://cbridge.celer.network/#/transfer", "_blank");
        window.location.reload();
        return false;
      } else {
        return false;
      }
    }

    let tx = {
      from: from_account,
      to: caddress,
      nonce: nonce,
      gas: 500000,
      // 'maxPriorityFeePerGas': 1999999987,
      data: Data,
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
              autoClose: 5000,
            });
            // navigate("/dashboard_home");
            // toast.success('Transaction Success')
          } else {
            toast.update(id, {
              render: "Transaction Reverted",
              type: "error",
              isLoading: false,
              autoClose: 2000,
            });
            // toast.error('Transaction Reverted');
            window.location.reload();
          }
        })();
      } else {
        toast.error("Transaction Reverted");
        window.location.reload();

      }
    });
  } else {
    let tx = {
      from: from_account,
      to: ERCTokenAddress,
      nonce: nonce,
      gas: 500000,
      // 'maxPriorityFeePerGas': 1999999987,
      data: ApproveData,
    };

    web3connect.eth.sendTransaction(tx, function (err, hash) {
      if (!err) {
        const ids = toast.loading(
          "Please Check your Metamask for any Pending Transaction"
        );
        // show modal
        // toast.success('Please Wait Till Your Transaction is Success')
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
            toast.update(ids, {
              render: "Transaction Success",
              type: "success",
              isLoading: false,
              autoClose: 2000,
            });
            window.location.reload();

          } else {
            toast.update(ids, {
              render: "Transaction Reverted",
              type: "error",
              isLoading: false,
              autoClose: 2000,
            });
            window.location.reload();
          }
        })();
      } else {
        toast.error("Transaction Reverted");
        window.location.reload();
      }
    });
  }
};

export const buyInfo = async (contract) => {
  contract = contract.toString();
  const web3connect = await web3();

  const accounts = await web3connect.eth.getAccounts();

  let selectedAccount = accounts[0];

  const chainId = await web3connect.eth.getChainId();

  if (contract !== "ETH" && contract !== "MATIC") {
    if (chainId != 97) {
      // window.location.reload();
      // alert('Please Switch To BSC Testnet Network');
      // _switch();
      return false;
    }
  }

  const caddress = web3connect.utils.toChecksumAddress(address);

  const from_account = web3connect.utils.toChecksumAddress(selectedAccount);

  const Busdaddress = web3connect.utils.toChecksumAddress(BusdContractaddress);
  const Ethaddress = web3connect.utils.toChecksumAddress(EthContractaddress);
  const Btcaddress = web3connect.utils.toChecksumAddress(BtcContractaddress);

  const busdcontract = new web3connect.eth.Contract(TokenAbi, Busdaddress);
  const ethcontract = new web3connect.eth.Contract(TokenAbi, Ethaddress);
  const btccontract = new web3connect.eth.Contract(TokenAbi, Btcaddress);
  let allowance;
  let Balance;

  if (contract == "BUSD") {
    allowance =
      (await busdcontract.methods.allowance(from_account, caddress).call()) /
      1e18;
    Balance =
      (await busdcontract.methods.balanceOf(from_account).call()) / 1e18;
  } else if (contract == "BETH") {
    allowance =
      (await ethcontract.methods.allowance(from_account, caddress).call()) /
      1e18;
    Balance = (await ethcontract.methods.balanceOf(from_account).call()) / 1e18;
  } else if (contract == "BTCB") {
    allowance =
      (await btccontract.methods.allowance(from_account, caddress).call()) /
      1e18;
    Balance = (await btccontract.methods.balanceOf(from_account).call()) / 1e18;
  } else if (contract == "ETH") {
    allowance = 100000000;
    Balance = (await web3connect.eth.getBalance(selectedAccount)) / 1e18;
  } else if (contract == "MATIC") {
    allowance = 100000000;
    Balance = (await web3connect.eth.getBalance(selectedAccount)) / 1e18;
  } else {
    allowance = 100000000;
    Balance = (await web3connect.eth.getBalance(selectedAccount)) / 1e18;
  }

  return {
    allowance: allowance,
    Balance: Balance,
  };
};
