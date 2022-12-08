import React, { useEffect, useState } from "react";
import Layout from "../Components/Layout";
import { Row, Col, Container, Modal, Table, Form } from "react-bootstrap";
import StoreLayout from "../Components/StoreLayout";
import Footer from "../Components/UI/Footer"
import CountDownTimer from "../Components/UI/CountDownTimer";
import axiosMain from "../http/axios/axios_main";
import { useLocation, useNavigate } from "react-router";
import { toast, ToastContainer } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { TokenApproval } from "../helpers/TokenApproval";
import { MakeOffer } from "../helpers/MakeOffer";
import { BuyNFT } from "../helpers/BuyNFT";
import { Transaction } from "../helpers/Transaction";
import { updateNftStatusSaga } from "../store/reducers/nftReducer";
import { Sale } from "../helpers/Sale";
import { clearNftDetail, getNftDetailSaga } from "../store/reducers/nftReducer";
import moment from "moment";
import { ApproveTaboo } from "../helpers/Approve";
import { axios } from "../http";
import FindNFTToken from "../helpers/FindNFTToken";
import { TabooBalance } from "../helpers/TabooHelper";
import { loginSaga, logout } from "../store/reducers/authReducer";
import Connect from "../helpers/Connect";
import calculateDays from "../helpers/CalculateDays"
import GraphRepresantation from "../Components/GraphRepresantation";
function NftDetail() {
  const dispatch = useDispatch();

  const navigate = useNavigate()
  const JwlPrice = 10;
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [auctionData, setAuctionData] = useState({
    offerPrice: "",
    auctionProcessing: false,
    buttonMessage: "",
  });

  const { offerPrice, auctionProcessing, buttonMessage } = auctionData;
  const [offerStart, setOfferStart] = useState(false);

  const {
    isAuthenticated,
    walletAddress,
    balance,
    hasWebsiteAccess: hasWebsiteAccessRedux,
  } = useSelector((state) => state.auth);

  const { nftDetail: nft, alloffer, isLoading, totalNfts } = useSelector((state) => state.nft);

  let { transactions } = useSelector((state) => state.transactions);

  const { state } = useLocation("/marketplace");
  const { id } = state || "";

  const [commonModel, setCommonModel] = useState(false)
  const [commonModel1, setCommonModel1] = useState(false)
  const handleCommonModel = () => {
    setCommonModel(false)
  }
  const handleCommonModel1 = () => {
    setCommonModel1(false)
  }

  const getData = () => {
    const data = { id: id };

    dispatch(getNftDetailSaga(data));
  };
  const [inputdata, setInputdata] = useState({
    id: id || ""
  })
  const [buyStart, setBuyStart] = useState(false);
  const [nftHash, setNftHash] = useState("");
  const [nftName, setNftName] = useState("")
  const [nftStatus, setNftStatus] = useState("")
  const [nftDesc, setNftDesc] = useState("")
  const [nftPrice, setNftPrice] = useState("")
  const [nftWalletAdress, setNftWalletAdress] = useState("")
  const [nftBalance, setBalance] = useState("")
  const [nftImages, setNftImages] = useState("")
  const [nftId, setNftId] = useState(false)
  const [allOffers, setAllOffers] = useState("")
  const [makeOfferDetails, setMakeOfferDetails] = useState([])
  const handleOfferStart = () => setOfferStart(false);
  const [relatedNFT, setRelatedNFT] = useState()
  const [category, setCategory] = useState();
  const [showDescription, setShowDescription] = useState(false)
  const [width, setWidth] = useState();
  const [height, setHeight] = useState();
  const [purity, setPurity] = useState();
  const [grossWeight, setGrossWeight] = useState();
  const [size, setSize] = useState();
  const [daimondType, setDaimondType] = useState();
  const [settingType, setSettingType] = useState();
  const [totalNumber, setTotalNumber] = useState();
  const [totalWeight, setTotalWeight] = useState();
  const[processOngoing,setprocessOngoing] = useState(false)
  // const [nftName , setNftName] = useState("")
  const endBid = moment(new Date(), "YYYY-MM-DD").format();
  const endBidNew = endBid.slice(0, 10)

  const getData1 = async () => {
    try {
      const api = await axiosMain.post("/nftDetailById", inputdata)
      if (api) {

        setNftName(api.data.name)
        setNftDesc(api.data.description)
        setNftPrice(api.data.price)
        setBalance(balance)
        setNftImages(api.data.images)
        setAllOffers(api.data.allOffer)
        setNftStatus(api.data.status)
        setNftId(api.data._id)
        setCategory(api.data.category)
        setNftWalletAdress(api.data.wallet_address)
        setWidth(api.data.width)
        setHeight(api.data.height)
        setPurity(api.data.purity)
        setGrossWeight(api.data.grossWeight)
        setSize(api.data.size)
        setDaimondType(api.data.daimondType)
        setSettingType(api.data.settingType)
        setTotalNumber(api.data.totalNumber)
        setTotalWeight(api.data.totalWeight)
      }

    } catch (error) {
      console.log(error);
    }
  }
  const getOffers = async () => {
    try {
      if (id) {
        const res = await axiosMain.get(`/getOffer?content_id=${id}`)
        setMakeOfferDetails(res.data)
      }
    } catch (error) {
      console.log(error);
    }
  }
  const getRelated = async (category) => {

    if (category) {

      const res = await axiosMain.post('/getNFTByCategory', {
        category: category
      })
      setRelatedNFT(res.data)
    }
  }
  useEffect(() => {
    getData1();
    getData();
    getOffers();
    getRelated(category)
  }, [category])
  const [isLoginStart, setIsLoginStart] = useState(false);
  let address;

  const single_nft_data = (items) => {
    navigate("/nft-detail", { state: { id: items._id } })
    window.onbeforeunload = function () {
      window.scrollTo(0, 0);
    }
    window.location.reload(true)
  }

  const handleBuy = async (e) => {
    try {
      setprocessOngoing(true);
      let price = parseFloat(nftPrice);
      if (!isAuthenticated) {
        toast.warn("Please connect wallet!");
      }
      else if (balance < price) {
        toast.warn("You don't have sufficient amount");
      }
      else {
        setBuyStart(true);
        const for_sale = nft.forsale === "no" ? true : false;
        if (for_sale) {
          let approveData = await TokenApproval(
            price,
            walletAddress,
            nft.forsale
          );
          
          let tx;
          if(approveData !== false ){
            tx = await Transaction({ tx: approveData });
          }
          setCommonModel(false)
          toast.warn("Your Request is Processing Please Wait")
          if (tx) {
            let hash = await BuyNFT(
              nft.token_id,
              nft.ipfs,
              price,
              nft.signature,
              nft.wallet_address
            );
            if (hash) {
              let tokenId = await FindNFTToken(hash.hash, price);
              // token=token+1;
              //toast.success("Order placed successfully!")
              let hashNFT = hash;
              let Nft_hash = hash.hash.transactionHash;
              hash = hash.hash.transactionHash;
              hash = hash.substring(0, 5) + "....." + hash.substring(38, 42);
              setNftHash(hash);
              let orderObj = { id: nft._id, status: "sold" };
              dispatch(updateNftStatusSaga(orderObj));
              let order = await axiosMain.post("/transactionCreater", {
                content_id: nft._id,
                wallet_address: walletAddress,
                status: "",
                refund_status: "",
                total: price,
                type: "creator",
                to_address: "0x9632a9b8afe7CbA98236bCc66b4C019EDC1CD1Cc",
                hash: Nft_hash,
                tokenUrl: nft.ipfs,
                token: tokenId
              });
              await handleBalance(walletAddress);
              setprocessOngoing(false);
              getData();
              navigate("/collections");
            }
          } else {
          
              let taboo_hash = true;
              if (taboo_hash) {
                let hash = await BuyNFT(
                  nft.token_id,
                  nft.ipfs,
                  price,
                  nft.signature,
                  nft.wallet_address
                );
                if (hash) {
                  let tokenId = await FindNFTToken(hash.hash, price);
                  // token=token+1;
                  //toast.success("Order placed successfully!")
                  let hashNFT = hash;
                  let Nft_hash = hash.hash.transactionHash;
                  hash = hash.hash.transactionHash;
                  hash = hash.substring(0, 5) + "....." + hash.substring(38, 42);
                  setNftHash(hash);
                  let orderObj = { id: nft._id, status: "sold" };
                  dispatch(updateNftStatusSaga(orderObj));
                  let order = await axiosMain.post("/transactionCreater", {
                    content_id: nft._id,
                    wallet_address: walletAddress,
                    status: "",
                    refund_status: "",
                    total: price,
                    type: "creator",
                    to_address: "0x9632a9b8afe7CbA98236bCc66b4C019EDC1CD1Cc",
                    hash: Nft_hash,
                    tokenUrl: nft.ipfs,
                    token: tokenId

                  });
                  await handleBalance(walletAddress);
                  setBuyStart(false);
                  getData();
                  navigate("/collections");
                }
              } else if (!tx) {
                setBuyStart(false);
              }
            }
          

        } else {
          let approveData1 = await TokenApproval(
            price,
            walletAddress,
            nft.forsale
          );
          
          console.log("approveData",approveData1);
          let tx = true;
          if(approveData1 !== false ){
            tx = await Transaction({ tx: approveData1 });
          }
          if (tx.status || tx) {
            try {
              let hash = await Sale(walletAddress, nft.token_id, "1");
              if (hash) {
                setNftHash(hash.transactionHash);
                let orderObj = { id: nft._id, status: "sold" };
                let hashNFT = hash;
                let Nft_hash = hash.transactionHash;
                dispatch(updateNftStatusSaga(orderObj));
                let order = await axiosMain.post("/transactionCreater", {
                  content_id: nft._id,
                  wallet_address: walletAddress,
                  status: "",
                  refund_status: "",
                  total: price,
                  type: "creator",
                  to_address: "0x9632a9b8afe7CbA98236bCc66b4C019EDC1CD1Cc",
                  // amount: nft.price,
                  // tx_id: Nft_hash,
                  hash: Nft_hash,
                  tokenUrl: nft.ipfs,
                  token: nft.token_id,

                });
                await handleBalance(walletAddress);
                 toast.success("NFT bought Successfully")
                 isLoading(false);
                if (order) {
                  navigate("/collections");
                }
              } else {
                setBuyStart(false);
                toast.error("Owner cannot purchase his own NFT")
              }
            } catch (e) {
              toast.error("Transaction Failed")
            }
          }

        }
      }
    } catch (e) {
      toast.error("Buying Failed")
    }
  };
  const [time, setTime] = useState(false);
  const handleBalance = async (address) => {
    //let address = await Connect();
    let balance = await TabooBalance(address)
    setBalance(balance)
    if (address && address.length) {
      dispatch(loginSaga({ address: address, balance: balance}));
    }
  };
  useEffect(() => {


    if (nft && nft.bid_end) {
      let end_Date = nft.bid_end;
      let current_time = moment(end_Date, "YYYY-MM-DD HH:mm:ss").format();
      current_time = new Date(current_time);
      current_time.setSeconds(current_time.getSeconds() + 600);
      setTime(current_time);

    }


  }, [nft]);


  const handleOfferPrice = (e) => {
    let value = e.target.value;

    if (isNaN(value)) {
      e.target.value = "";
    } else {
      // setOffferPrice(value);
    }
  };



  const handleOffer = async () => {
    if (offerPrice == "") {
      toast.warn("Offer price is required!");
    } else {
      setAuctionData((p) => ({
        ...p,
        auctionProcessing: true,
        buttonMessage: "Processing Please Wait...",
      }));
      let approve = await ApproveTaboo(offerPrice, walletAddress);

      if (approve) {
        let txra = await Transaction({ tx: approve });

        if (txra) {
          
          
          
          let tx = await MakeOffer(offerPrice, nft.token_id, walletAddress); //axios.post('/make-offer',{address:walletAddress,taboo_amount:offerPrice});
         console.log('tx',tx)
          if (tx) {
            let txObj = { tx: tx };

            let txdd = await Transaction(txObj);

            if (txdd) {
              let res = await axios.post("/createOffer", {
                content_id: nft._id,
                wallet_address: walletAddress,
                price: offerPrice,

              });
              setAuctionData((p) => ({
                ...p,
                auctionProcessing: false,
                buttonMessage: "",
              }));
              getOffers();
              toast.success("Offer Created");

              setOfferStart(false)

            } else {
              toast.warn("Transaction Failed!");
            }
          } else {
            toast.warn("Bidding Failed");
          }
        } else {
          toast.warn("Amount approval failed!");
        }
      }
      setAuctionData((p) => ({
        ...p,
        auctionProcessing: false,
        buttonMessage: "",
      }));
      handleOfferStart();
    }
  };

const updateStatus = async() => {
  const res = await axios.post('/updateContentStatus',{id: id ,
    status:'active'})
}
useEffect(() => {
  if(nft.status == 'auction' && calculateDays(nft.bid_end, endBidNew) > 0){

    updateStatus();
  }
},[])

  return (
    <>
      <Layout>
        <div>
          <section className="details-page">
            <ToastContainer />
            <Container>
              <Row className="align-items-center">
                <Col lg={5} md={6}>
                  <div>
                    <img src={nftImages} class="img-fluid" />
                  </div>
                </Col>
                <Col lg={6} md={6} className="ms-auto">
                  <div class="details-side-content">
                    <h4>{nftName}</h4>
                    <button className="view-description" onClick={() => setShowDescription(true)}>View Description</button>
                    <Modal
                      show={showDescription}
                      className="desc-modal transaction-page-modal"
                      backdrop="static"
                      keyboard={false}
                      onHide={() => { setShowDescription(false) }}
                      size="lg"
                      aria-labelledby="contained-modal-title-vcenter"
                    >
                      <Modal.Header
                        closeButton
                        className="modal-header-background-desc desc-background"
                        style={{ zIndex: "10000000" }}
                      >
                        Quest Jewellers
                      </Modal.Header>
                      <Modal.Body className="modal-background background-color">

                        <div class="bid-modal-box">
                          <h3 className="modal-header-h3">{nftName}</h3>
                          <Row className="desc-row">
                            <Col lg={5} md={6} className="div-border">
                              <div>
                                <img src={nftImages} className="desc-border img-fluid img-main-box" />
                              </div>

                            </Col>
                            <Col lg={7} md={6} >
                              <Row className="desc-row2">
                                <h4 className="modal-header-h4">Main GemStones</h4>
                                <Row>
                                  <Col lg={6} md={6}>
                                    <div className="list-col">
                                      <p>Size</p>
                                      <p className="desc-values">{size}</p>
                                    </div>
                                    <div className="list-col">
                                      <p>Daimond Type</p>
                                      <p className="desc-values">{daimondType}</p>
                                    </div>

                                    <div className="list-col">
                                      <p>Total Number</p>
                                      <p className="desc-values">{totalNumber}</p>
                                    </div>
                                  </Col>
                                  <Col lg={6} md={6}>
                                    <div className="list-col">
                                      <p>Total Weight</p>
                                      <p className="desc-values">{totalWeight} ct</p>
                                    </div>
                                    <div className="list-col">
                                      <p>Setting Type</p>
                                      <p className="desc-values">{settingType}</p>
                                    </div>
                                  </Col>
                                </Row>
                                <Row>
                                  <h4 className="modal-header-h4">Summary</h4>
                                  <Col lg={6} md={6}>

                                    <div className="list-col">
                                      <p>{nftName} Weight</p>
                                      <p className="desc-values">{width} mm</p>
                                    </div>
                                    <div className="list-col">
                                      <p>Height</p>
                                      <p className="desc-values">{height} mm</p>
                                    </div>

                                  </Col>
                                  <Col lg={6} md={6}>
                                    <div className="list-col">
                                      <p>Purity</p>
                                      <p className="desc-values">{purity} KT</p>
                                    </div>
                                    <div className="list-col">
                                      <p>Gross Weight</p>
                                      <p className="desc-values">{grossWeight} g</p>
                                    </div>

                                  </Col>
                                </Row>
                              </Row>


                            </Col>

                          </Row>
                        </div>
                      </Modal.Body>
                    </Modal>
                    <h6> Price: {parseFloat(nftPrice).toFixed(2)}JWL ($ {nftPrice / JwlPrice})</h6>
                    <h6> </h6>
                    <p>{nftDesc}</p>
                    <div>
                      {time && nft.status == "auction" && calculateDays(nft.bid_end, endBidNew) < 0 ? <CountDownTimer expiryTimestamp={time} /> : ""}
                    
                      <button class="gradient-btn"
                        disabled={
                          isLoading ||
                            nft.status == "sold" ||
                            nft.status == "auction"
                            ? true
                            : false
                        }

                        onClick={() => {
                          setCommonModel(true)
                        }}>   {nft.status == "auction" ? "Wait for Auction To End" : nft.status == "sold" ? "Sold Out" : processOngoing ? "Processing ": "Buy Now"}</button>

                      <button class={nft.status == "auction" ? "gradient-btn" : "offer-disable"}
                        onClick={() =>
                          nft.status == "auction" ?
                            setOfferStart(true) : ""}
                        disabled={nft.status == "sold" || nft.status == "active" || calculateDays(nft.bid_end, endBidNew) >= 0 ? true : false}>Make Offer</button>
                    </div>
                    <Modal
                      size="lg"
                      aria-labelledby="contained-modal-title-vcenter"
                      centered
                      className="modal-comming-soon "
                      show={show}
                      onHide={handleClose}
                    >
                      <Modal.Header closeButton className="border-none"></Modal.Header>
                      <Modal.Body>
                        <div className="outer-div">
                          <img src="assets/images/coming-soon.png" className="img-fluid" />
                          <h5>This page will be Added Soon</h5>
                        </div>
                      </Modal.Body>
                    </Modal>
                    <h5>About Creator :</h5>
                    <div class="fex-box-user">
                      <img src="assets/images/img-nft/user.png" />
                      <div>
                        {/* <h6>{nftName}</h6> */}
                        <p>{nftWalletAdress}</p>
                      </div>
                    </div>
                  </div>
                </Col>
              </Row>
            </Container>
          </section>
          <section className="details-table-sec">
            <Container>
              <Row>
                <Col md={12}>
                  <h3 class="heading-box-new"><span>Current offers</span> <a href="">See all <img src="assets/images/img-nft/arrow-gred.png" /></a></h3>
                  <div class="table-responsive">
                    <table class="table table-details">
                      <thead>
                        <tr>
                          <th>Wallet Address</th>
                          <th>Date</th>
                          <th>Offer Price</th>
                        </tr>
                      </thead>
                      <tbody>
                        {makeOfferDetails.map((items, index) => {
                          return (
                            <tr>
                              <td>{items.wallet_address.slice(0, 5)}....{items.wallet_address.slice(-5)}</td>
                              <td>{moment(items.created_at).format("lll")}</td>
                              <td>Price:{items.offer_price} JWL</td>
                            </tr>
                          )
                        })}
                      </tbody>
                    </table>
                  </div>
                </Col>
              </Row>
            </Container>
          </section>
          <section className="details-table-sec ">
            <Container>
              <Row>
                <Col md={12}>
                  <h3 class="heading-box-new"><span>Pricing History</span> </h3>
                  <div class="graph-dimensions">

                    {nftId ? <GraphRepresantation id={nftId} /> : ""}
                  </div>
                </Col>
              </Row>
            </Container>
          </section>
          <section className="details-table-sec product-list-sec ">
            <Container>
              <h3 class="heading-box-new"><span>Releted NFTs</span> <a href="/marketplace">See all <img src="assets/images/img-nft/arrow-gred.png" /></a></h3>
              <Row>
                {relatedNFT ? relatedNFT.map((items, index) => {
                  return (
                    <Col lg={3} md={6} key={index}>
                      <div class="product-list-box">
                        <div onClick={() => {
                          single_nft_data(items)
                        }}>
                          <img src={items.images} class="img-fluid img-main-box" />
                        </div>
                        <div>
                          <h5>{items.name}</h5>

                          <div class="d-flex justify-content-between">
                            <h6>Price:   {items.price}JWL (${parseFloat(items.price) * 0.01})</h6>

                          </div>

                        </div>
                      </div>
                    </Col>
                  )
                }) : ""}


              </Row>
            </Container>
            <Modal
              show={commonModel}
              onHide={handleCommonModel}
              backdrop="static"
              keyboard={false}
              aria-labelledby="contained-modal-title-vcenter"
              centered
              size="md"
              className="modal-comming-soon"
            >
              <Modal.Header style={{ borderBottom: "1px solid #a77327" }} closeButton={handleCommonModel}></Modal.Header>
              <Modal.Body>
                <div class="bid-modal-box">
                  <h3>Checkout</h3>
                  <br />
                  <Table className="table-your-balance">
                    <thead>
                      <tr>
                        <th>Your Balance</th>
                        <th>{(parseFloat(balance)).toFixed(3)}JWL</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>Price</td>
                        <td>{parseFloat(nftPrice).toFixed(3)} JWL</td>
                      </tr>
                      <tr>
                        <td>Service Fee</td>
                        <td> 5 %</td>
                      </tr>
                      <tr>
                        <td>Total will Pay</td>
                        <td>
                          {nft &&
                            (parseFloat(nftPrice) +
                              (parseFloat(nftPrice) * 5) / 100).toFixed(3)}{" "}
                          JWL
                        </td>
                      </tr>
                    </tbody>
                  </Table>
                  <div style={{ display: "flex", justifyContent: "center" }}>
                    <a class="gradient-btn1 m-1" disabled={buyStart ? true : false} onClick={() => {
                      handleBuy()
                    }}>{buyStart ? "Processing" : "Continue"}</a>
                    <a class="gradient-btn1 m-1" onClick={() => {
                      setCommonModel(false)
                    }}>cancel</a>
                  </div>
                </div>
              </Modal.Body>
            </Modal>
            <Modal
              show={commonModel1}
              onHide={handleCommonModel1}
              backdrop="static"
              keyboard={false}
              aria-labelledby="contained-modal-title-vcenter"
              centered
              size="md"
              className="modal-comming-soon"
            >
              <Modal.Header style={{ borderBottom: "1px solid #a77327" }} closeButton={handleCommonModel}></Modal.Header>
              <Modal.Body>
                <div class="bid-modal-box">
                  <h3>Checkout</h3>
                  <br />
                  <Table className="table-your-balance">
                    <thead>
                      <tr>
                        <th>Your Balance</th>
                        <th>JWL</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>Price</td>
                        <td>{nftPrice} JWL</td>
                      </tr>
                      <tr>
                        <td>Service Fee</td>
                        <td> 5 %</td>
                      </tr>
                      <tr>
                        <td>Total will Pay</td>
                        <td>
                          {nft &&
                            parseFloat(nftPrice) +
                            (parseFloat(nftPrice) * 5) / 100}
                          JWL
                        </td>
                      </tr>
                    </tbody>
                  </Table>
                  <div style={{ display: "flex", justifyContent: "center" }}>
                    <a class="gradient-btn1 m-1" onClick={() => {
                      toast.warn("Coming Soon")
                    }}> continue</a>
                    <a class="gradient-btn1 m-1" onClick={() => {
                      setCommonModel1(false)
                    }}>cancel</a>
                  </div>
                </div>
              </Modal.Body>
            </Modal>
            <Modal
              show={offerStart}
              className="modal-comming-soon bid-modal"
              backdrop="static"
              keyboard={false}
              onHide={handleOfferStart}
              centered
            >
              <Modal.Header
                closeButton
                className=""
                style={{ borderBottom: "1px solid #a77327" }}
              ></Modal.Header>
              <Modal.Body>
                <div class="bid-modal-box">
                  <h3>Create an Offer</h3>
                  <p className="about-bid-pera">You are about to place a bid for </p>
                  <Form>
                    <Form.Group className="mb-3 min-price-box">
                      <Form.Label>Min Price</Form.Label>
                      <Form.Control
                        type="text"
                        onChange={(e) => {
                          let inputValue = e.target.value;
                          setAuctionData((prev) => {
                            if (!isNaN(inputValue)) {
                              return { ...prev, offerPrice: inputValue };
                            }
                          });
                        }}
                        value={offerPrice}
                        placeholder="min price"
                      />
                    </Form.Group>
                    <div style={{ display: "flex", justifyContent: "center" }}>
                      <button
                        className="gradient-btn1 m-1"
                        onClick={() => {
                          if (!auctionProcessing) handleOffer();
                        }}
                        disabled={auctionProcessing}
                        style={{ cursor: auctionProcessing ? "no-drop" : "pointer" }}
                      >
                        {buttonMessage ? buttonMessage : "Start Bid"}
                      </button>
                      <a href="" className="gradient-btn1 m-1" onClick={handleOfferStart}>
                        Cancel
                      </a>
                  </div>
                  </Form>
                
                </div>
              </Modal.Body>
            </Modal>
          </section>
        </div>
      </Layout>
    </>
  )
}

export default NftDetail
