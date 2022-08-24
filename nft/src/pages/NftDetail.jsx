import React, { useEffect, useState } from "react";
import Layout from "../Components/Layout";
import { Row, Col, Container, Modal, Table } from "react-bootstrap";
import StoreLayout from "../Components/StoreLayout";
import Footer from "../Components/UI/Footer"

import axiosMain from "../http/axios/axios_main";
import { useLocation } from "react-router";
import { toast ,ToastContainer } from "react-toastify";

function NftDetail() {
  const { state } = useLocation("/marketplace");
  const { id } = state;
const [nftId , setNftId] = useState()
  useEffect(()=>{
    setNftId(id)
  },[])
  const [commonModel , setCommonModel] = useState(false)
  const handleCommonModel = () =>{
    setCommonModel(false)
  }
//  console.log(id , "id yha aa rhi h");

  const [inputdata , setInputdata] = useState({
    id: id
  })

  const [nftName , setNftName] = useState("")
  const [nftDesc , setNftDesc] = useState("")
  const [nftPrice , setNftPrice] = useState("")
   const [nftImages , setNftImages] = useState("")
  // const [nftName , setNftName] = useState("")

const getData = async () =>{
  try{
    const api =  await axiosMain.post("/nftDetailById", inputdata)
    if(api){
      setNftName(api.data.datas.name)
      setNftDesc(api.data.datas.description)
      setNftPrice(api.data.datas.price)
      setNftImages(api.data.datas.images)

    }
    console.log(api);
  }catch(error){
    console.log(error);
  }
}

useEffect(()=>{
  getData()
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
                    <img src={nftImages} class="img-fluid" />
                  </div>
                </Col>
                <Col lg={6} md={6} className="ms-auto">
                  <div class="details-side-content">
                    <h4>{nftName}</h4>
                    <h6>{nftPrice}</h6>
                    <p>{nftDesc}</p>
                    <div>
                      <a class="gradient-btn" onClick={()=>{
                        setCommonModel(true)
                      }}>Buy Now</a>
                      <a class="border-btn" onClick={()=>{
                        toast.error("Coming Soon")
                      }}><span>Make Offer</span></a>
                    </div>
                    <h5>About Creator :</h5>
                    <div class="fex-box-user">
                      <img src="assets/images/img-nft/user.png" />
                      <div>
                        <h6>Metamarse</h6>
                        <p>@marse_meta00</p>
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
                      {/* {nft.map((items, index) => {
                            return (
                        <tr>
                          <td><span><img src="assets/images/img-nft/user.png" />Metamarse</span> </td>
                          <td>{items.wallet_address}</td>
                          <td>{items.created_at}</td>
                          <td>{items.amount}</td>
                        </tr>
                          )
                        })} */}
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

        <section className="details-table-sec">
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


        <section className="details-table-sec product-list-sec">
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
          size="sm"
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

              <a class="gradient-btn p-2 m-1" onClick={()=>{
                       toast.error("insufficient amount")
                      }}> continue</a>
                          <a class="gradient-btn p-2 m-1" onClick={()=>{
                            setCommonModel(false)
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
