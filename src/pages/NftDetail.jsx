import React, { useEffect, useState } from "react";
import Layout from "../Components/Layout";
import { Row, Col, Container, Modal, Table, Form } from "react-bootstrap";
import StoreLayout from "../Components/StoreLayout";
import Footer from "../Components/UI/Footer"
import CountDownTimer from "../Components/UI/CountDownTimer";
import axiosMain from "../http/axios/axios_main";
import { useLocation, useNavigate } from "react-router";
import { toast ,ToastContainer } from "react-toastify";
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

function NftDetail() {
  const dispatch = useDispatch();

  const navigate = useNavigate()
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

  const { nftDetail: nft,alloffer, isLoading, totalNfts, tier } = useSelector((state) => state.nft);

  let { transactions } = useSelector((state) => state.transactions);

  console.log(nft , "nft ka data");
 console.log(alloffer , "all")
  // console.log(totalNfts , "nft ka data");
  const { state } = useLocation("/marketplace");
  const { id } = state || "";
  console.log(id , "Id");
  const [commonModel , setCommonModel] = useState(false)
  const [commonModel1 , setCommonModel1] = useState(false)
  const handleCommonModel = () =>{
    setCommonModel(false)
  }
  const handleCommonModel1 = () =>{
    setCommonModel1(false)
  }

  const getData = () => {
    // let userTier = tier ? tier : "1 Tier";
    const data = { id: id };

    dispatch(getNftDetailSaga(data));
  };
//  console.log(id , "id yha aa rhi h");

  const [inputdata , setInputdata] = useState({
    id: id || ""
  })
  const [buyStart, setBuyStart] = useState(false);
  const [nftHash, setNftHash] = useState("");
  const [nftName , setNftName] = useState("")
  const [nftStatus , setNftStatus] = useState("")
  const [nftDesc , setNftDesc] = useState("")
  const [nftPrice , setNftPrice] = useState("")
   const [nftImages , setNftImages] = useState("")
   const [allOffers , setAllOffers] = useState("")
   const [punk,setPunk]=useState(0);
   const[ makeOfferDetails,setMakeOfferDetails] = useState([])
   const handleOfferStart = () => setOfferStart(false);
  // const [nftName , setNftName] = useState("")

const getData1 = async () =>{
  try{
    const api =  await axiosMain.post("/nftDetailById", inputdata)
    if(api){
    
      setNftName(api.data.name)
      setNftDesc(api.data.description)
      setNftPrice(api.data.price)
      setNftImages(api.data.images)
      setAllOffers(api.data.allOffer)
      setNftStatus(api.data.status)

    }
   
  }catch(error){
    console.log(error);
  }
}
const getOffers = async () => {
  try{
    if(id){

      const res =  await axiosMain.get(`/getOffer?content_id=${id}`)
      console.log("offer dtata",res)
      setMakeOfferDetails(res.data)
    }
   
   
  }catch(error){
    console.log(error);
  }
}
console.log({makeOfferDetails})
useEffect(()=>{
  getData1();
  getData();
  getOffers();
  
},[])



const handleBuy = async (e) => {
  
  let price = parseFloat(nftPrice);
  

  if (!isAuthenticated) {
      toast.warn("Please connect wallet!");
   }
    else if (balance<price) {
     toast.warn("You don't have sufficient amount");
  
   }
    else {
    setBuyStart(true);
    const for_sale = nft.forsale === "false" ? true : false;

    if (for_sale) {
      
      let approveData = await TokenApproval(
        price,
        walletAddress,
        nft.forsale
      );

      let tx = await Transaction({ tx: approveData });
      if (tx) {
       
        // let {tx}=transactions;
        let taboo_hash = true;
        try {
          // taboo_hash = await Transaction(tx.data);
        } catch (e) {
          setBuyStart(false);
         
        }

        if (taboo_hash) {
          // let token = await NFTBalance();

          // console.log("ss",token)
        
          let hash = await BuyNFT(
            nft.token_id,
            nft.ipfs,
            price,
            nft.signature,
            tier,
            punk,
            nft.wallet_address
          );

          if (hash) {
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
              status : "",
              refund_status:"",
              total : price,
              type :"creator",
               to_address: "0x9632a9b8afe7CbA98236bCc66b4C019EDC1CD1Cc",
              // amount: nft.price,
              // tx_id: Nft_hash,
              hash: Nft_hash,
               tokenUrl: nft.ipfs,
               token: hashNFT.token,
               
            });

            

            // handleClose2();
            // handleShow1();

            setBuyStart(false);

            getData();

            // setTimeout(handleClose1, 3000);

            navigate("/transactions");
          }
        } else {
          setBuyStart(false);
        }
      }
    } else 
    {
      let approveData = await TokenApproval(
        price,
        walletAddress,
        nft.forsale
      );

      let tx = await Transaction({ tx: approveData });

     

      if (tx) {
      
          let hash = await Sale(walletAddress, nft.token_id, "1");

         if (hash) {
          setNftHash(hash.transactionHash);
          
          let orderObj = { id: nft._id, status: "sold" };

          dispatch(updateNftStatusSaga(orderObj));

          let order = await axiosMain.post("/transactionCreater", {
            content_id: nft._id,
            to_account: "0x9632a9b8afe7CbA98236bCc66b4C019EDC1CD1Cc",
            amount: nft.price,
            address: walletAddress,
            hash: hash.transactionHash,
            tokenUrl: nft.ipfs,
            token: nft.token_id,
          });
          if (order) {
             navigate("/transactions");
           }
        } else {
          setBuyStart(false);
        }
      }
    }
  }
};
const [time, setTime] = useState(false);

useEffect(() => {
  

  if (nft && nft.bid_end) {
    let end_Date = nft.bid_end;

    // let time = new Date(end_Date);
    console.log(`end date is ${end_Date}`);
    let current_time = moment(end_Date, "YYYY-MM-DD HH:mm:ss").format();
    // current_time.setSeconds(current_time.getSeconds() + 600); // 10 minutes timer
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
            toast.success("Offer Created");
            setOfferStart(false)
          } else {
            toast.warn("Transaction Failed!");
          }
        } else {
          toast.warn("Auction is ended!.");
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




  return (
    <>
    <Layout>
      <div>
      <section className="details-page">
        <ToastContainer/>
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
                    <h6> Price: {nftPrice} JWL</h6>
                    <p>{nftDesc}</p>
                    <div>
                    {console.log(nftStatus == 'sold')}
                    {time && nft.status == "auction" ? <CountDownTimer expiryTimestamp={time} /> : ""}
                      <button class="gradient-btn"  
                      disabled={
                          isLoading ||
                          nft.status == "sold" ||
                          nft.status == "auction"
                            ? true
                            : false
                        }
                      
                      onClick={()=>{
                        setCommonModel(true)
                      }}>    {nft.status == "sold" ? "Sold Out" : "Buy Now"}</button>
                      <a class="border-btn" 
onClick={() => 
 nft.status == "sold"?
  setOfferStart(true):""}
  disabled={
                        nft.status == "Active" ? true
                           : false
                       }
                      ><span>Make Offer</span></a>

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
                        <p>{walletAddress}</p>
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
                      { makeOfferDetails.map((items, index) => {
                            return (
                        <tr>
                          
                          <td>{items.wallet_address.slice(0,5)}....{items.wallet_address.slice(-5)}</td>
                          <td>{moment(items.created_at).format("lll")}</td>
                          <td>Price:{items.offer_price} JWL</td>
                        </tr>
                          )
                        }) } 
                         
                      

                      </tbody>
                    </table>
                    </div>
                </Col>
              </Row>
           </Container>
        </section>

        <section className="details-table-sec d-none">
           <Container>
              <Row>
                <Col md={12}>
                <h3 class="heading-box-new"><span>Pricing History</span> <a href="">See all <img src="assets/images/img-nft/arrow-gred.png" /></a></h3>
                <div>
                  <img src="assets/images/img-nft/graph.png" class="img-fluid" />
                </div>
                </Col>
              </Row>
           </Container>
        </section>


        <section className="details-table-sec product-list-sec d-none">
           <Container>
           <h3 class="heading-box-new"><span>Releted NFTs</span> <a href="">See all <img src="assets/images/img-nft/arrow-gred.png" /></a></h3>
              <Row>
                <Col lg={3} md={6}>
                  <div class="product-list-box">
                    <img src="assets/images/img-nft/list-img.png" class="img-fluid" />
                    <div>
                      <h5>Azuki 3D </h5>
                      <p>AZUKI.JP</p>
                      <div class="d-flex justify-content-between">
                        <h6>1.5 ETH</h6>
                        <h6>$1907</h6>
                      </div>
                      <div class="d-flex justify-content-between">
                        <p>Floor Price </p>
                        <p class="green-color"><span>+1.6%</span></p>
                      </div>
                    </div>
                  </div>
                </Col>
                <Col lg={3} md={6}>
                  <div class="product-list-box">
                    <img src="assets/images/img-nft/list-img.png" class="img-fluid" />
                    <div>
                      <h5>Azuki 3D </h5>
                      <p>AZUKI.JP</p>
                      <div class="d-flex justify-content-between">
                        <h6>1.5 ETH</h6>
                        <h6>$1907</h6>
                      </div>
                      <div class="d-flex justify-content-between">
                        <p>Floor Price </p>
                        <p class="green-color"><span>+1.6%</span></p>
                      </div>
                    </div>
                  </div>
                </Col>
                <Col lg={3} md={6}>
                <div class="product-list-box">
  								<img src="assets/images/img-nft/list-img.png" class="img-fluid" />
  								<div>
  									<h5>Azuki 3D </h5>
  									<p>AZUKI.JP</p>
  									<div class="d-flex justify-content-between">
  										<h6>1.5 ETH</h6>
  										<h6>$1907</h6>
  									</div>
  									<div class="d-flex justify-content-between">
  										<p>Floor Price </p>
  										<p class="green-color"><span>+1.6%</span></p>
  									</div>
  								</div>
  							</div>
                </Col>
                <Col lg={3} md={6}>
                <div class="product-list-box">
  								<img src="assets/images/img-nft/list-img.png" class="img-fluid" />
  								<div>
  									<h5>Azuki 3D </h5>
  									<p>AZUKI.JP</p>
  									<div class="d-flex justify-content-between">
  										<h6>1.5 ETH</h6>
  										<h6>$1907</h6>
  									</div>
  									<div class="d-flex justify-content-between">
  										<p>Floor Price </p>
  										<p class="green-color"><span>+1.6%</span></p>
  									</div>
  								</div>
  							</div>
                </Col>
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
          <Modal.Header style={{borderBottom:"1px solid #a77327"}} closeButton={handleCommonModel}></Modal.Header>
          <Modal.Body>
          <div class="bid-modal-box">
              <h3>Checkout</h3>

              <br />

              <Table>
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
                    <td> 0 %</td>
                  </tr>
                  <tr>
                    <td>Total will Pay</td>

                    <td>
                      {/* {nft &&
                        parseFloat(nft.price) +
                          (parseFloat(nft.price) *fees) / 100}{" "} */}
                    {nftPrice} JWL
                      JWL
                    </td>
                  </tr>
                </tbody>
              </Table>
              <div style={{display:"flex",justifyContent:"center"}}>
              

              <a class="gradient-btn1 m-1" disabled={buyStart ? true : false} onClick={()=>{
                       handleBuy()
                      }}>{buyStart ? "Processing" : "Continue"}</a>
                          <a class="gradient-btn1 m-1" onClick={()=>{
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
          <Modal.Header style={{borderBottom:"1px solid #a77327"}} closeButton={handleCommonModel}></Modal.Header>
          <Modal.Body>
          <div class="bid-modal-box">
              <h3>Checkout</h3>

              <br />

              <Table>
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
                    <td> 0 %</td>
                  </tr>
                  <tr>
                    <td>Total will Pay</td>

                    <td>
                      {/* {nft &&
                        parseFloat(nft.price) +
                          (parseFloat(nft.price) *fees) / 100}{" "} */}
                    {nftPrice} JWL
                      JWL
                    </td>
                  </tr>
                </tbody>
              </Table>
              <div style={{display:"flex",justifyContent:"center"}}>

              <a class="gradient-btn1 m-1" onClick={()=>{
                       toast.warn("Coming Soon")
                      }}> continue</a>
                          <a class="gradient-btn1 m-1" onClick={()=>{
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
            className="border-none p-0"
            style={{ zIndex: "10000000" }}
          ></Modal.Header>
          <Modal.Body>
            <div class="bid-modal-box">
              <h3>Create a Auction</h3>
              <p>You are about to place a bit for </p>

              <Form>
                <Form.Group className="mb-3">
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
              </Form>

              <div className="make-offer-container">
                <button
                  className="blue-btn"
                  onClick={() => {
                    if (!auctionProcessing) handleOffer();
                  }}
                  disabled={auctionProcessing}
                  style={{ cursor: auctionProcessing ? "no-drop" : "pointer" }}
                >
                  {buttonMessage ? buttonMessage : "Start Bid"}
                </button>

                <a href="" className="border-btn-1" onClick={handleOfferStart}>
                  Cancel
                </a>
              </div>
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