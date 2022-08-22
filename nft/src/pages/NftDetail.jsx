import React from "react";
import Layout from "../Components/Layout";
import { Row, Col, Container } from "react-bootstrap";
import StoreLayout from "../Components/StoreLayout";
import Footer from "../Components/UI/Footer"

function NftDetail() {
  return (
    <>
    <Layout>
      <div>
      <section className="details-page">
           <Container>
              <Row className="align-items-center">
                <Col lg={5} md={6}>
                  <div>
                    <img src="assets/images/img-nft/detail-img.png" class="img-fluid" />
                  </div>
                </Col>
                <Col lg={6} md={6} className="ms-auto">
                  <div class="details-side-content">
                    <h4>Goldern Diamond Ring</h4>
                    <h6>1.5ETH ($2045.12)</h6>
                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque congue quam id nulla venenatis, non interdum felis tempus.</p>
                    <div>
                      <a class="gradient-btn" href="">Buy Now</a>
                      <a class="border-btn" href=""><span>Make Offer</span></a>
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
                        </tr>

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
        </section>
      </div>
    </Layout>
  </>
  )
}

export default NftDetail
