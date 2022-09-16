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

 
  const [nftName , setNftName] = useState("")
  
  const [nftDesc , setNftDesc] = useState("")
  const [nftTitle , setNftTitle] = useState("")
   const [nftImages , setNftImages] = useState("")

   const[ articleDetail,setArticleDetail] = useState([])
 
  // const [nftName , setNftName] = useState("")


const getArticleDetail = async () => {
  try{
    if(id){

      const res =  await axiosMain.post(`/getArticalById`,{
          id:id
      })
      console.log(res.data.data)
      if(res){
        setNftTitle(res.data.data.title)
        setNftDesc(res.data.data.description)
      
        setNftImages(res.data.data.images)
       
      }
      console.log("offer dtata",res)
      setArticleDetail(res.data.data)
    }
   
   
  }catch(error){
    console.log(error);
  }
}
console.log(articleDetail)
useEffect(()=>{
    getArticleDetail();
  
},[])

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
                    <img src={`https://jewellery.donative.in/Artical/${nftImages}`} class="img-fluid" alt="image"/>
                    {console.log(nftImages)}
                  </div>
                </Col>
                <Col lg={6} md={6} className="ms-auto">
                  <div class="details-side-content">
                    <h4>{nftTitle}</h4>
                   <p>{nftDesc}</p>
                  
            
                   
                  </div>
                </Col>
              </Row>
           </Container>
        </section>

      
       


        
      </div>
    </Layout>
  </>
  )
}

export default NftDetail
