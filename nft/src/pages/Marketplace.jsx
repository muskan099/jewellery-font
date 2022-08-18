import React from "react";
import Accordion from "react-bootstrap/Accordion";
import ProgressBar from "react-bootstrap/ProgressBar";
import { Row, Col, Container } from "react-bootstrap";
import Layout from "../Components/Layout";

const Marketplace = () => {
  return (
    <>
      <Layout>
         <section className="marketplace-list-sec">
            <Container>
                <Row>
                  <Col lg={3} md={4}>
                    <div className=" new-changes-filter">
                      <div>
                        <Accordion defaultActiveKey="0" className="">
                          <Accordion.Item eventKey="0">
                            <Accordion.Header className="sidebar_names">
                              Sort
                            </Accordion.Header>
                            <Accordion.Body>
                              <div className="radio">
                                <label>
                                  <input type="radio"></input>
                                  <span className="cr">
                                    <i className="cr-icon fa fa-circle"></i>
                                  </span>
                                  Price: High to Low
                                </label>
                              </div>
                              <div className="radio">
                                <label>
                                  <input type="radio"></input>
                                  <span className="cr">
                                    <i className="cr-icon fa fa-circle"></i>
                                  </span>
                                  Price: Low to High
                                </label>
                              </div>
                              <div className="radio">
                                <label>
                                  <input type="radio"></input>
                                  <span className="cr">
                                    <i className="cr-icon fa fa-circle"></i>
                                  </span>
                                  A To Z
                                </label>
                              </div>
                              <div className="radio">
                                <label>
                                  <input type="radio"></input>
                                  <span className="cr">
                                    <i className="cr-icon fa fa-circle"></i>
                                  </span>
                                  Latest
                                </label>
                              </div>
                            </Accordion.Body>
                          </Accordion.Item>
                          <Accordion.Item eventKey="1" className="status">
                            <Accordion.Header className="sidebar_names">
                              Status
                            </Accordion.Header>
                            <Accordion.Body>
                            <div>
                                <div className="checkbox">
                                  <label>
                                    <input type="checkbox" value=""></input>
                                    <span className="cr">
                                      <i className="cr-icon fa fa-check"></i>
                                    </span>
                                    Artist 1
                                  </label>
                                </div>
                                <div className="checkbox">
                                  <label>
                                    <input type="checkbox" value=""></input>
                                    <span className="cr">
                                      <i className="cr-icon fa fa-check"></i>
                                    </span>
                                    Artist 2
                                  </label>
                                </div>
                                <div className="checkbox">
                                  <label>
                                    <input type="checkbox" value=""></input>
                                    <span className="cr">
                                      <i className="cr-icon fa fa-check"></i>
                                    </span>
                                    Artist 3
                                  </label>
                                </div>
                                <div className="checkbox">
                                  <label>
                                    <input type="checkbox" value=""></input>
                                    <span className="cr">
                                      <i className="cr-icon fa fa-check"></i>
                                    </span>
                                    Artist 4
                                  </label>
                                </div>
                                <div className="checkbox">
                                  <label>
                                    <input type="checkbox" value=""></input>
                                    <span className="cr">
                                      <i className="cr-icon fa fa-check"></i>
                                    </span>
                                    Artist 5
                                  </label>
                                </div>

                              </div>
                            </Accordion.Body>
                          </Accordion.Item>
                          <Accordion.Item eventKey="2" className="status">
                            <Accordion.Header className="sidebar_names">
                              Price
                            </Accordion.Header>
                            <Accordion.Body>
                              <div class="slider-box">
                                  <label for="priceRange"></label>
                                  
                                  <div id="price-range" class="slider"></div>
                                  <input type="text" id="priceRange" readonly />
                                </div>
                            
                            </Accordion.Body>
                          </Accordion.Item>
                          <Accordion.Item eventKey="3" className="status">
                            <Accordion.Header className="sidebar_names">
                              Artist
                            </Accordion.Header>
                            <Accordion.Body>
                              <div>
                                <div className="checkbox">
                                  <label>
                                    <input type="checkbox" value=""></input>
                                    <span className="cr">
                                      <i className="cr-icon fa fa-check"></i>
                                    </span>
                                    Artist 1
                                  </label>
                                </div>
                                <div className="checkbox">
                                  <label>
                                    <input type="checkbox" value=""></input>
                                    <span className="cr">
                                      <i className="cr-icon fa fa-check"></i>
                                    </span>
                                    Artist 2
                                  </label>
                                </div>
                                <div className="checkbox">
                                  <label>
                                    <input type="checkbox" value=""></input>
                                    <span className="cr">
                                      <i className="cr-icon fa fa-check"></i>
                                    </span>
                                    Artist 3
                                  </label>
                                </div>
                                <div className="checkbox">
                                  <label>
                                    <input type="checkbox" value=""></input>
                                    <span className="cr">
                                      <i className="cr-icon fa fa-check"></i>
                                    </span>
                                    Artist 4
                                  </label>
                                </div>
                                <div className="checkbox">
                                  <label>
                                    <input type="checkbox" value=""></input>
                                    <span className="cr">
                                      <i className="cr-icon fa fa-check"></i>
                                    </span>
                                    Artist 5
                                  </label>
                                </div>

                              </div>
                            </Accordion.Body>
                          </Accordion.Item>
                          <Accordion.Item eventKey="4" className="status">
                            <Accordion.Header className="sidebar_names">
                              Chain
                            </Accordion.Header>
                            <Accordion.Body>
                            <div>
                                <div className="checkbox">
                                  <label>
                                    <input type="checkbox" value=""></input>
                                    <span className="cr">
                                      <i className="cr-icon fa fa-check"></i>
                                    </span>
                                    Artist 1
                                  </label>
                                </div>
                                <div className="checkbox">
                                  <label>
                                    <input type="checkbox" value=""></input>
                                    <span className="cr">
                                      <i className="cr-icon fa fa-check"></i>
                                    </span>
                                    Artist 2
                                  </label>
                                </div>
                                <div className="checkbox">
                                  <label>
                                    <input type="checkbox" value=""></input>
                                    <span className="cr">
                                      <i className="cr-icon fa fa-check"></i>
                                    </span>
                                    Artist 3
                                  </label>
                                </div>
                                <div className="checkbox">
                                  <label>
                                    <input type="checkbox" value=""></input>
                                    <span className="cr">
                                      <i className="cr-icon fa fa-check"></i>
                                    </span>
                                    Artist 4
                                  </label>
                                </div>
                                <div className="checkbox">
                                  <label>
                                    <input type="checkbox" value=""></input>
                                    <span className="cr">
                                      <i className="cr-icon fa fa-check"></i>
                                    </span>
                                    Artist 5
                                  </label>
                                </div>

                              </div>
                            </Accordion.Body>
                          </Accordion.Item>
                          <Accordion.Item eventKey="5" className="status">
                            <Accordion.Header className="sidebar_names">
                              Categories
                            </Accordion.Header>
                            <Accordion.Body>
                            <div>
                                <div className="checkbox">
                                  <label>
                                    <input type="checkbox" value=""></input>
                                    <span className="cr">
                                      <i className="cr-icon fa fa-check"></i>
                                    </span>
                                    Artist 1
                                  </label>
                                </div>
                                <div className="checkbox">
                                  <label>
                                    <input type="checkbox" value=""></input>
                                    <span className="cr">
                                      <i className="cr-icon fa fa-check"></i>
                                    </span>
                                    Artist 2
                                  </label>
                                </div>
                                <div className="checkbox">
                                  <label>
                                    <input type="checkbox" value=""></input>
                                    <span className="cr">
                                      <i className="cr-icon fa fa-check"></i>
                                    </span>
                                    Artist 3
                                  </label>
                                </div>
                                <div className="checkbox">
                                  <label>
                                    <input type="checkbox" value=""></input>
                                    <span className="cr">
                                      <i className="cr-icon fa fa-check"></i>
                                    </span>
                                    Artist 4
                                  </label>
                                </div>
                                <div className="checkbox">
                                  <label>
                                    <input type="checkbox" value=""></input>
                                    <span className="cr">
                                      <i className="cr-icon fa fa-check"></i>
                                    </span>
                                    Artist 5
                                  </label>
                                </div>

                              </div>
                            </Accordion.Body>
                          </Accordion.Item>
                        </Accordion>
                      </div>
                    </div>
                  </Col>

                  <Col lg={9} md={8}>
                    <Row >
                      <Col lg={4} md={6}>
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
                        <Col lg={4} md={6}>
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
                                <p class="red-text"><span>+1.6%</span></p>
                              </div>
                            </div>
                          </div>
                        </Col>
                        <Col lg={4} md={6}>
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
                        <Col lg={4} md={6}>
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
                        <Col lg={4} md={6}>
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
                                <p class="red-text"><span>+1.6%</span></p>
                              </div>
                            </div>
                          </div>
                        </Col>
                        <Col lg={4} md={6}>
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
                        <Col lg={4} md={6}>
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
                        <Col lg={4} md={6}>
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
                                <p class="red-text"><span>+1.6%</span></p>
                              </div>
                            </div>
                          </div>
                        </Col>
                        <Col lg={4} md={6}>
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
                  </Col> 
                </Row>
              </Container>
         </section>
      </Layout>
    </>
  );
};

export default Marketplace;
