import React, { useEffect } from "react";
import StoreLayout from "../Components/StoreLayout";
import { Row, Col, Container,Tab, Tabs,Button,Form,FormGroup,Table } from "react-bootstrap";
import Layout from "../Components/Layout";
import { useDispatch, useSelector } from "react-redux";
import { getNftSaga } from "../store/reducers/nftReducer";

const StoreOverview = () => {
  const dispatch = useDispatch();
  const { nft, isLoading, totalNfts } = useSelector((state) => state.nft);
  useEffect(() => {

    dispatch(getNftSaga());
   
  },[])
  return (
    <>
    
      <div>
        {/* <StoreLayout /> */}

      <Layout>
      <section className="artist-main-sec">
           <Container fluid className="p-0">
              <Row>
                  <Col>
                     <div>
                        <img src="assets/images/ArtistCover_img.png" class="img-fluid" />
                        <div className="artist-profile-box">
                           <img src="assets/images/image 3.png" class="img-fluid artist-img" />
                           <div>
                              <h2>Metamarse</h2>
                              <p>@marse_meta00</p>
                           </div>
                        </div>
                     </div>
                  </Col> 
              </Row>
           </Container>
      </section> 
      <section className="trending-sec-new pb-2 artist-tranding-sec">
           <Container>
              <Row>
                  <Col>
                     <div className="outer-collection-tab">
                            <Tabs
                              defaultActiveKey="Overview"
                              className="mt-0 mb-3 collection-tab"
                            >
                              <Tab eventKey="Overview" title="Overview">
                                 <div>
                                 <h3 class="heading-box-new"><span>Overview Tranding NFT</span> <a href="">See all <img src="assets/images/img-nft/arrow-gred.png" /></a></h3>
                                    <Row>
                                      <Col lg={3} md={6} sm={6}>
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
                                      <Col lg={3} md={6} sm={6}>
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
                                                <p class="red-text">+1.6%</p>
                                              </div>
                                            </div>
                                          </div>
                                      </Col>
                                      <Col lg={3} md={6} sm={6}>
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
                                                <p class="green-text"><span>+1.6%</span></p>
                                              </div>
                                            </div>
                                          </div>
                                      </Col>
                                      <Col lg={3} md={6} sm={6}>
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
                                      <Col lg={3} md={6} sm={6}>
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
                                      <Col lg={3} md={6} sm={6}>
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
                                      <Col lg={3} md={6} sm={6}>
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
                                      <Col lg={3} md={6} sm={6}>
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
                                 </div>
                              </Tab>
                              <Tab eventKey="Purchased NFTs" title="Purchased NFTs">
                              <div>
                              <h3 class="heading-box-new"><span>Purchased Tranding NFT</span> <a href="">See all <img src="assets/images/img-nft/arrow-gred.png" /></a></h3>
                                    <Row>
                                      <Col lg={3} md={6} sm={6}>
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
                                      <Col lg={3} md={6} sm={6}>
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
                                                <p class="red-text">+1.6%</p>
                                              </div>
                                            </div>
                                          </div>
                                      </Col>
                                      <Col lg={3} md={6} sm={6}>
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
                                                <p class="green-text"><span>+1.6%</span></p>
                                              </div>
                                            </div>
                                          </div>
                                      </Col>
                                      <Col lg={3} md={6} sm={6}>
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
                                      <Col lg={3} md={6} sm={6}>
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
                                      <Col lg={3} md={6} sm={6}>
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
                                      <Col lg={3} md={6} sm={6}>
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
                                      <Col lg={3} md={6} sm={6}>
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
                                 </div>
                              </Tab>
                              <Tab eventKey="On Sell NFTs" title="On Sell NFTs">
                              <div>
                              <h3 class="heading-box-new"><span>On Sell Tranding NFT</span> <a href="">See all <img src="assets/images/img-nft/arrow-gred.png" /></a></h3>
                                    <Row>
                                      <Col lg={3} md={6} sm={6}>
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
                                      <Col lg={3} md={6} sm={6}>
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
                                                <p class="red-text">+1.6%</p>
                                              </div>
                                            </div>
                                          </div>
                                      </Col>
                                      <Col lg={3} md={6} sm={6}>
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
                                                <p class="green-text"><span>+1.6%</span></p>
                                              </div>
                                            </div>
                                          </div>
                                      </Col>
                                      <Col lg={3} md={6} sm={6}>
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
                                      <Col lg={3} md={6} sm={6}>
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
                                      <Col lg={3} md={6} sm={6}>
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
                                      <Col lg={3} md={6} sm={6}>
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
                                      <Col lg={3} md={6} sm={6}>
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
                                 </div>
                              </Tab>
                             
                            </Tabs>
                      </div>   
                  </Col>
              </Row>
           </Container>
        </section>

        <section className="trending-sec-new category-slider-sec pt-0">
           <Container>
              <Row>
                  <Col>
                     <div className="">
                     <h3 class="heading-box-new"><span>Top Collections</span> <a href="">See all <img src="assets/images/img-nft/arrow-gred.png" /></a></h3>
                         <Row>
                             <Col lg={4} md={6} sm={6}>
                                <div className="category-slider">
                                    <div className="cat-slide-inner">
                                       <div className="left-box">
                                            <img src="assets/images/image 8.png" class="img-fluid first-box" />
                                            <img src="assets/images/image 6.png" class="img-fluid second-box" />
                                       </div>
                                       <div className="right-box">
                                       <img src="assets/images/image 14.png" class="img-fluid right-img" />
                                       </div>
                                    </div>
                                    <h5>Golden Necklace</h5>
                                  </div>
                             </Col>
                             <Col lg={4} md={6} sm={6}>
                                 <div className="category-slider">
                                    <div className="cat-slide-inner">
                                       <div className="left-box">
                                            <img src="assets/images/image 13.png" class="img-fluid first-box" />
                                            <img src="assets/images/image 12.png" class="img-fluid second-box" />
                                       </div>
                                       <div className="right-box">
                                       <img src="assets/images/nft-image-1.png" class="img-fluid right-img" />
                                       </div>
                                    </div>
                                    <h5>Golden Necklace</h5>
                                  </div>
                             </Col>
                             <Col lg={4} md={6} sm={6}>
                                <div className="category-slider">
                                    <div className="cat-slide-inner">
                                       <div className="left-box">
                                            <img src="assets/images/image 11.png" class="img-fluid first-box" />
                                            <img src="assets/images/image 10.png" class="img-fluid second-box" />
                                       </div>
                                       <div className="right-box">
                                       <img src="assets/images/image 9.png" class="img-fluid right-img" />
                                       </div>
                                    </div>
                                    <h5>Golden Necklace</h5>
                                  </div>
                             </Col>
                        </Row>
                        </div>
                        
                  </Col>
              </Row>
           </Container>
        </section>
      </Layout>
       
      </div>
    </>
  );
};

export default StoreOverview;
