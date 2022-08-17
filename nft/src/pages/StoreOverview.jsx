import React from "react";
import StoreLayout from "../Components/StoreLayout";
import { Row, Col } from "react-bootstrap";

const StoreOverview = () => {
  return (
    <>
      <div>
        <StoreLayout />
        <div>
          <div className="store_name">
            <h1>Tranding NFT</h1>
            <span>See all →</span>
          </div>
          <div>
            {" "}
            <Row className="store-slot">
              <Col md={3}>
                <div className="store_box">
                  <img
                    className="store_img"
                    src="assets\images\image 4.png"
                    alt="new"
                  />
                  <h6 className="name11">COOLGUYZZ</h6>
                  <p className="name22">Coolguyzz.io</p>
                  <div className="name33">
                    <h6>1.5 ETH</h6>
                    <h6>$1790</h6>
                  </div>
                  <div className="name44">
                    <p>Floor Price</p>
                    <p>+34.5%</p>
                  </div>
                </div>
              </Col>

              <Col md={3}>
                <div className="store_box">
                  <img
                    className="store_img"
                    src="assets\images\image 5.png"
                    alt="new"
                  />
                  <h6 className="name11">COOLGUYZZ</h6>
                  <p className="name22">Coolguyzz.io</p>
                  <div className="name33">
                    <h6>1.5 ETH</h6>
                    <h6>$1790</h6>
                  </div>
                  <div className="name44">
                    <p>Floor Price</p>
                    <p>+34.5%</p>
                  </div>
                </div>
              </Col>
              <Col md={3}>
                <div className="store_box">
                  <img
                    className="store_img"
                    src="assets\images\image 6.png"
                    alt="new"
                  />
                  <h6 className="name11">COOLGUYZZ</h6>
                  <p className="name22">Coolguyzz.io</p>
                  <div className="name33">
                    <h6>1.5 ETH</h6>
                    <h6>$1790</h6>
                  </div>
                  <div className="name44">
                    <p>Floor Price</p>
                    <p>+34.5%</p>
                  </div>
                </div>
              </Col>
              <Col md={3}>
                <div className="store_box">
                  <img
                    className="store_img"
                    src="assets\images\image 1.png"
                    alt="new"
                  />
                  <h6 className="name11">COOLGUYZZ</h6>
                  <p className="name22">Coolguyzz.io</p>
                  <div className="name33">
                    <h6>1.5 ETH</h6>
                    <h6>$1790</h6>
                  </div>
                  <div className="name44">
                    <p>Floor Price</p>
                    <p>+34.5%</p>
                  </div>
                </div>
              </Col>
            </Row>
          </div>
          <div className="store_name">
            <h1>Top Collections</h1>
            <span>See all →</span>
          </div>
          <div>
          
            <Row className="over_slot">
              <Col md={4}>
                <div className="over_slotbox">
                    <Row>
                        <Col md={3}>
                            <div className="over_col">
                            <img className="over_img" src="assets\images\image 6.png"  alt="new" />
                            <img className="over_img" style={{"margin-top":"5px"}} src="assets\images\image 8.png"  alt="new" />
                            </div>
                        </Col>
                        <Col md={9} >
                        <img className="over_bigimg" src="assets\images\image 14.png"  alt="new" />
                        </Col>
                        <h2>Golden Necklace</h2>
                    </Row>
                </div>
              </Col>
              <Col md={4}>
                <div className="over_slotbox">
                <Row>
                        <Col md={3}>
                            <div className="over_col">
                            <img className="over_img" src="assets\images\image 13.png"  alt="new" />
                            <img className="over_img" style={{"margin-top":"5px"}} src="assets\images\image 12.png"  alt="new" />
                            </div>
                        </Col>
                        <Col md={9} >
                        <img className="over_bigimg" src="assets\images\image 1.png"  alt="new" />
                        </Col>
                        <h2>Golden Rings</h2>
                    </Row>
                </div>
              </Col>
              <Col md={4}>
                <div className="over_slotbox">
                <Row>
                        <Col md={3}>
                            <div className="over_col">
                            <img className="over_img" src="assets\images\image 11.png"  alt="new" />
                            <img className="over_img" style={{"margin-top":"5px"}} src="assets\images\image 10.png"  alt="new" />
                            </div>
                        </Col>
                        <Col md={9} >
                        <img className="over_bigimg" src="assets\images\image 9.png"  alt="new" />
                        </Col>
                        <h2>Golden Bangles</h2>
                    </Row>
                </div>
              </Col>
            </Row>
          </div>
        </div>
      </div>
    </>
  );
};

export default StoreOverview;
