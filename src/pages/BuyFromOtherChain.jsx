import React, { useState, useEffect } from "react";
import { Container, Row, Col, Button, Modal } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import HomeHeaderOther from "../Components/UI/HomeHeaderOther";
import { toast, ToastContainer } from "react-toastify";
import Layout from "../Components/Layout";
import { Connect } from "../helpers/Connect";
import {
  buyInfo,
  buyTokensERC20,
  buyApproveERC20,
} from "../helpers/Buytokenerc20";
import { changecontract, logout } from "../store/reducers/authReducer";
import { Notification } from "../Components/Notification";
import { Details } from "../helpers/RateHelper";
import useAuth from "../hooks/useAuth";
import { buyFromOtherChain } from "../helpers/Buyfromotherchain";
import { _switch, _switchETH, _switchMATIC } from "../helpers/Web3Helper";
import { buytoken } from "../helpers/Buytoken";


export default function BuyfromOtherChain() {

  const { walletAddress } = useAuth();
  const {
    value: {user,  isAuthenticated },
    metaMaskWallet
  } = useSelector((state) => state.auth);
  const auth = useSelector((state) => state.auth.isChangeContract);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [openModel, setOpenModel] = useState(false)
  const [modelMessage, setModelMessage] = useState("")
  const [randomVal, setRandomVal] = useState("")
  const [buyValue, setBuyValue] = useState(0)
  const [amount, setAmount] = useState(0);
  const [rates, setRates] = useState(null);
  const [disable, setDisable] = useState(false);
  const [TokenBalance, setBalance] = useState(0);
  const [Allowance, setAllowance] = useState(0);
  const [Sender, setSender] = useState(metaMaskWallet, "");
  const [contract, setInputNetwork] = useState(auth)
  const [Chain, setChain] = useState(97);
  const [Rate, setRate] = useState(0);
  const [showModal, setShowModal] = useState(false);
  const [showModal2, setShowModal2] = useState(false);
  
  const AllowanceHandler = async (e) => {
    let detail = await buyInfo(contract);
    let MaxAllowance = detail.allowance;
    let Balance = detail.Balance;
    setAllowance(MaxAllowance);
    setBalance(Balance);
  };
  const ChainHandler = async (e) => {
    let detail = await Connect();
    let chain = detail.chainId;
    let SenderAddress = detail.selectedAccount;
    setChain(chain);
    setSender(SenderAddress);
  };

  const RateWithToken = async (e) => {
    let rate = 0;
    if (contract == "BNB") {
      rate = rates?.rateBNB;
      rate = 1 / (rate * 1e9);
    } else if (contract == "BUSD") {
      rate = rates?.rateBUSD;
      rate = 1 / (rate * 1e9);
    } else if (contract == "ETH") {
      rate = rates?.rateEtH;
      rate = 1 / (rate * 1e9);
    } else if (contract == "BTCB") {
      rate = rates?.rateBTC;
      rate = 1 / (rate * 1e9);
    } else if (contract == "MATIC") {
      rate = rates?.rateBUSD;
      rate = 1 / (rate * 1e9);
    }
    rate = rate * amount;
    setRate(rate);
  };

  const getRates = async () => {
    const api = await Details();
    setRates(api);
  };

  const buyModel = async () => {
    ChainHandler();
    getRates();
    if (amount < 1) {
      setModelMessage("Minimum buy amount - 1 JWL coin")
      setOpenModel(true)
      setTimeout(() => {
        setRandomVal(Math.floor((Math.random() * 100) + 1))
      }, 500);
      // toast.warn("Minimum buy amount - 10 Qcoin")
    } else {
      setShowModal(true);
    }
  };

  useEffect(() => {
    getRates();
  }, []);

  useEffect(() => {
    if (Sender) {
      AllowanceHandler();
      ChainHandler();
    }
  }, [Sender]);

  useEffect(() => {
    RateWithToken();
    if (Sender) {
      AllowanceHandler();
    }
  }, [contract, amount]);

  useEffect(() => {
    RateWithToken();
  }, [amount])

  // useEffect(() => {
  //   if (Sender) {
  //     if (contract !== "ETH" && contract !== "MATIC") {
  //       // if (Chain !== 97) {
  //       //  _switch();
  //       // } 
  //     } else {
  //       AllowanceHandler();
  //     }
  //   }
  // }, [contract]);

  const logoutModel = async () => {
    setShowModal2(true);
  };

  const handleModalClose2 = () => {
    setShowModal2(false);
  };

  const handleAmount = (e) => {
    let value = e.target.value;
    setAmount(value);
  };

  const handleModalClose = () => {
    setShowModal(false);
  };

  const handleContract = (e) => {
    let value = e.target.value;
    dispatch(
      changecontract({
        isChangeContract: value
      })
    )
    if (value === "ETH") {
      if (Chain !== 5) {
        _switchETH();
      }
    } else if (value === "MATIC") {
      if (Chain !== 80001) {
        _switchMATIC();
      }
    } else {
      if (Chain !== 97) {
        _switch();
      }
    }
    setInputNetwork(value)
  };

  async function buyHandler() {
    if (amount >= buyValue) {
      if (contract === "BNB") {
        if (Chain == 97) {
          await buytoken(Rate, walletAddress, navigate);
        } else {
         _switch();
        }
      } else if (contract === "ETH") {
        if (Chain == 5) {
          await buyFromOtherChain(Rate, walletAddress, navigate, amount , user._id);
        } else {
          _switchETH();
        }
      } else if (contract === "MATIC") {
        if (Chain == 80001) {
         await buyFromOtherChain(Rate, walletAddress, navigate, amount , user._id);
        }else {
          _switchMATIC();
        }
      } else if (Number(Rate) <= Allowance) {
        if(Chain == 97){
          await buyTokensERC20(Rate, walletAddress, contract, navigate);
        } else {
         _switch();
        }
      } else {
        if(Chain == 97){
         await buyApproveERC20(Rate, contract, navigate);
        } else {
          _switch();
         }
      }
    } else {
      setModelMessage(`Please buy with minimum amount ${buyValue}`)
      setOpenModel(true)
      setTimeout(() => {
        setRandomVal(Math.floor((Math.random() * 100) + 1))
      }, 500);
      setTimeout(() => {
        window.location.reload()
      }, 1000);
    }
  }

  const finalAmt = parseFloat(amount)
  return (
   <>
    <Layout>
      <section id="dash_home" className="buy-metamask-sec">
        <Notification message_mo={modelMessage} action_mo={openModel} random_val={randomVal} />
        <ToastContainer />
        <Container>
          <Row>
            <Col lg={6} className="m-auto">
              <div className="">
                <div className="buy-coin-inner">
                  <div className="buy-coin-one">
                    <h2 className="text-center">Buy JWL Coin</h2>
                    <div className="form-group  mt-5">
                      <label className="d-flex justify-content-between">
                        <span>Quantity of Coins</span>
                        <span>
                          Price Per Coin: 0.1 USD
                        </span>
                      </label>
                      <div className="input-group align-items-center">
                        <div className="input-group-prepend">
                          <span
                            className="input-group-text d-block"
                          >
                            <img
                              style={{ width: "60px" }}
                              src="assets/images/Homeimg/logo1.png"
                              alt=""
                            />
                          </span>
                        </div>
                        <input
                          onChange={(e) => handleAmount(e)}
                          type="number"
                          name=""
                          value={amount}
                          className="form-control buynow_form-text scroll_none"
                          placeholder="No. of coins"
                          // defaultValue
                          min="0"
                        />
                      </div>
                    </div>
                    <div className="form-group mb-1">
                      <label className="d-flex justify-content-between">
                        <span>Total Amount</span>
                        <span>
                          Balance:{" "}
                          {TokenBalance && TokenBalance !== undefined
                            ? TokenBalance.toFixed(6)
                            : 0}{" "}
                          {contract}
                        </span>
                      </label>
                      <div className="input-group align-items-center">
                        <div className="input-group-prepend">
                          <select
                            className="input-group-text d-block BuyCoin_amount_type background-scroll-class"
                            id="basic-addon1"
                            onChange={handleContract}
                            value={contract}
                          >
                            <option value="BNB">BNB</option>
                            <option value="ETH">ETH</option>
                            <option value="BTCB">BTCB</option>
                            <option value="BUSD">BUSD</option>
                            <option value="MATIC">MATIC</option>
                          </select>
                        </div>
                        <input
                          type="number"
                          className="form-control buynow_form-text"
                          placeholder="Total amount"
                          // defaultValue
                          // disabled
                          value={(Rate).toFixed(6)}
                          disabled
                        />
                      </div>
                    </div>
                    <div className="mt-2  d-flex">

                      <button
                        className="btn common-btn m-2"
                        onClick={() => {
                          if (!walletAddress || walletAddress === "") {
                            logoutModel();
                          } else {
                            buyModel();
                          }
                        }}
                      >
                        Buy JWL coin
                      </button>

                      <button
                        className="btn common-btn m-2"
                        onClick={() => {
                          navigate("/dashboard_home")
                        }}
                      >
                        Cancel
                      </button>

                    </div>
                    <div className="recieve-coin-row">
                      <ul>
                        {Sender ? <li> <span>{Rate ? (Rate).toFixed(6) : 0} {contract} </span> will be debited from {Sender.replace(Sender.substring(5, 35), "....")}</li> : <li> <span>{Rate ? (Rate).toFixed(4) : 0} {contract} </span> will be debited </li>}
                        <li><span>{finalAmt} JWL coin </span>will be credited in {walletAddress.replace(walletAddress.substring(5, 35), "....")}</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </Col>
          </Row>
          {Sender && amount !== 0 && Rate !== undefined ? (
            <Modal
              size="sm"
              show={showModal}
              onHide={handleModalClose}
              backdrop="static"
              keyboard={false}
              animation={false}
              aria-labelledby="contained-modal-title-vcenter" z
              centered
            >
              <Modal.Header closeButton={handleModalClose}>
                <Modal.Title>
                  <h1>Confirm Buy</h1>
                </Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <div className="input-modal-data">
                  <div className="form-group ">
                    <p>
                      {Rate.toFixed(5)} <span>{contract}</span>
                    </p>
                  </div>
                  <div className="form-group">
                    <p>
                      {amount} <span>JWL coin</span>
                    </p>
                  </div>
                  <div className="form-group">
                    <p>
                      Price{" "}
                      <span>
                        {(Rate / amount).toFixed(6)} {contract}/Qcoin
                      </span>
                    </p>
                  </div>
                </div>
              </Modal.Body>
              <Modal.Footer>
                <Button
                  onClick={() => {
                    buyHandler();
                    setDisable(true);
                  }}
                  disabled={disable}
                  className="btn common-btn popup-btn"
                  type="submit"
                  style={{ color: "black" }}
                >
                  {Rate && Rate !== undefined
                    ? Number(Rate) > Allowance
                      ? `Approve ${contract}`
                      : `Buy`
                    : "Buy"}
                </Button>
                {/* <Button className="button-footer1" variant="primary" type="submit" >
              Submit
          </Button> */}
              </Modal.Footer>
            </Modal>
          ) : !Sender && amount !== undefined ? (
            <Modal
              size="sm"
              show={showModal}
              onHide={handleModalClose}
              backdrop="static"
              keyboard={false}
              animation={false}
              aria-labelledby="contained-modal-title-vcenter"
              centered
            >
              <Modal.Header closeButton={handleModalClose}>
                <Modal.Title>
                  <h1>Confirm Buy</h1>
                </Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <div className="input-modal-data">
                  <div className="form-group ">
                    <p>Connect to your wallet</p>
                  </div>
                </div>
              </Modal.Body>
            </Modal>
          ) : (
            <Modal
              size="sm"
              show={showModal}
              onHide={handleModalClose}
              backdrop="static"
              keyboard={false}
              animation={false}
              aria-labelledby="contained-modal-title-vcenter"
              centered
            >
              <Modal.Header closeButton={handleModalClose}>
                <Modal.Title>
                  <h1>Confirm Buy</h1>
                </Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <div className="input-modal-data">
                  <div className="form-group ">
                    <p>Please Enter Some Amount</p>
                  </div>
                </div>
              </Modal.Body>
            </Modal>
          )}

          <Modal
            size="sm"
            show={showModal2}
            onHide={handleModalClose2}
            backdrop="static"
            keyboard={false}
            animation={false}
            aria-labelledby="contained-modal-title-vcenter"
            centered
          >
            <Modal.Header closeButton={handleModalClose2}>
              <Modal.Title>
                <h1>Qwallet</h1>
              </Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <div className="input-modal-data">
                <div className="form-group">
                  <p>
                    Qwallet creation is under process please login again after some time.
                  </p>
                </div>
              </div>
            </Modal.Body>
            <Modal.Footer>
              <Button
                onClick={() => dispatch(logout())}
                className="btn common-btn popup-btn"
                type="submit"
                style={{ color: "black" }}
              >
                Ok
              </Button>
            </Modal.Footer>
          </Modal>
        </Container>
        </section>
        </Layout>
   
   </>
  )
}

