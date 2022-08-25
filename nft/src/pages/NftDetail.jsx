import React, { useEffect, useState } from "react";
import Layout from "../Components/Layout";
import { Row, Col, Container, Modal, Table } from "react-bootstrap";
import StoreLayout from "../Components/StoreLayout";
import Footer from "../Components/UI/Footer"

import axiosMain from "../http/axios/axios_main";
import { useLocation, useNavigate } from "react-router";
import { toast ,ToastContainer } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { TokenApproval } from "../helpers/TokenApproval";
import { BuyNFT } from "../helpers/BuyNFT";
import { Transaction } from "../helpers/Transaction";
import { updateNftStatusSaga } from "../store/reducers/nftReducer";
import { Sale } from "../helpers/Sale";
import { clearNftDetail, getNftDetailSaga } from "../store/reducers/nftReducer";
import moment from "moment";

function NftDetail() {
  const dispatch = useDispatch();

  const navigate = useNavigate()

  const {
    isAuthenticated,
    walletAddress,
    balance,
    hasWebsiteAccess: hasWebsiteAccessRedux,
  } = useSelector((state) => state.auth);

  const { nft,alloffer, isLoading, totalNfts, tier } = useSelector((state) => state.nft);

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
  const [nftDesc , setNftDesc] = useState("")
  const [nftPrice , setNftPrice] = useState("")
   const [nftImages , setNftImages] = useState("")
   const [allOffers , setAllOffers] = useState("")
   const [punk,setPunk]=useState(0);
  // const [nftName , setNftName] = useState("")

const getData1 = async () =>{
  try{
    const api =  await axiosMain.post("/nftDetailById", inputdata)
    if(api){
      console.log(api,"api data");
      setNftName(api.data.datas.name)
      setNftDesc(api.data.datas.description)
      setNftPrice(api.data.datas.price)
      setNftImages(api.data.datas.images)
      setAllOffers(api.data.allOffer)

    }
    console.log(api);
  }catch(error){
    console.log(error);
  }
}

useEffect(()=>{
  getData1();

  getData();
  
},[])



const handleBuy = async (e) => {
  console.log(nft.price," nft price");
  let price = parseFloat(nftPrice);
  console.log(price,"price");
  console.log(balance , "balance");

  if (!isAuthenticated) {
      toast.warn("Please connect wallet!");
   }
    else if (balance<price) {
     toast.warn("You don't have sufficient amount");
  
   }
    else {
    setBuyStart(true);
    const for_sale = nft.forsale == "no" ? true : false;

    if (for_sale) {
      
      let approveData = await TokenApproval(
        price,
        walletAddress,
        nft.forsale
      );

      let tx = await Transaction({ tx: approveData });
      if (tx) {
        console.log("tx", tx);
        // let {tx}=transactions;
        let taboo_hash = true;
        try {
          // taboo_hash = await Transaction(tx.data);
        } catch (e) {
          setBuyStart(false);
          console.log(e);
        }

        if (taboo_hash) {
          // let token = await NFTBalance();

          // console.log("ss",token)
          console.log(nft.token_id , "nftId");
          let hash = await BuyNFT(
            nft.token_id,
            nft.ipfs,
            price,
            nft.signature,
            tier,
            punk
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
              type :"",
               to_account: "0x9632a9b8afe7CbA98236bCc66b4C019EDC1CD1Cc",
              // amount: nft.price,
              // tx_id: Nft_hash,
              // nft_hash: Nft_hash,
               tokenUrl: nft.ipfs,
               token: hashNFT.token,
            });

            console.log("order", order);

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

      console.log("nft token", nft.token_id);

      if (tx) {
      
          let hash = await Sale(walletAddress, nft.token_id, "1");

         if (hash) {
          setNftHash(hash.transactionHash);
          
          let orderObj = { id: nft._id, status: "sold" };

          dispatch(updateNftStatusSaga(orderObj));

          let order = await axiosMain.post("/create-order", {
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
                    <h6>{nftPrice} JWL</h6>
                    <p>{nftDesc}</p>
                    <div>
                      <a class="gradient-btn" onClick={()=>{
                        setCommonModel(true)
                      }}>Buy Now</a>
                      <a class="border-btn" onClick={()=>{
                        setCommonModel1(true)
                      }}><span>Make Offer</span></a>
                    </div>
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
                          <th>Offer By</th>
                          <th>Wallet Address</th>
                          <th>Date</th>
                          <th>Offer Price</th>
                        </tr>
                      </thead>
                      <tbody>
                      {allOffers.length > 0 ? allOffers.map((items, index) => {
                            return (
                        <tr>
                          <td><span><img src="assets/images/img-nft/user.png" />Quest</span> </td>
                          <td>{items.wallet_address}</td>
                          <td>{moment(items.created_at).format("lll")}</td>
                          <td>{items.offer_price} JWL</td>
                        </tr>
                          )
                        }) : <p style={{color:"white"}}>Not data found</p>}
                        {/* <tr>
                          <td><span><img src="assets/images/img-nft/user.png" />Metamarse</span> </td>
                          <td>21652cda2dcc4a1sc84a584dc</td>
                          <td>14 Mar 2022 12:03 PM</td>
                          <td>0.70ETH</td>
                        </tr>
                        <tr>
                          <td><span><img src="assets/images/img-nft/user.png" />Metamarse</span> </td>
                          <td>21652cda2dcc4a1sc84a584dc</td>
                          <td>14 Mar 2022 12:03 PM</td>
                          <td>0.70ETH</td>
                        </tr>
                        <tr>
                          <td><span><img src="assets/images/img-nft/user.png" />Metamarse</span> </td>
                          <td>21652cda2dcc4a1sc84a584dc</td>
                          <td>14 Mar 2022 12:03 PM</td>
                          <td>0.70ETH</td>
                        </tr> */}

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

              <a class="gradient-btn1 m-1" onClick={()=>{
                       handleBuy()
                      }}> continue</a>
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
        </section>
      </div>
    </Layout>
  </>
  )
}

export default NftDetail
