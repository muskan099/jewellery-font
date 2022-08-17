import React from "react";
import Accordion from "react-bootstrap/Accordion";
import ProgressBar from "react-bootstrap/ProgressBar";
import { Row, Col, Container } from "react-bootstrap";
import Layout from "../Components/Layout";

const Marketplace = () => {
  return (
    <>
      <Layout>
      <Container>
        <Row>
          <Col md={3}>
            <div className="marketplace_main">
              <div>
                <Accordion defaultActiveKey="0" className="marketplace_sidebar">
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
                    <Accordion.Body></Accordion.Body>
                  </Accordion.Item>
                  <Accordion.Item eventKey="2" className="status">
                    <Accordion.Header className="sidebar_names">
                      Price
                    </Accordion.Header>
                    <Accordion.Body>
                      <ProgressBar className="price" now={40} />
                    </Accordion.Body>
                  </Accordion.Item>
                  <Accordion.Item eventKey="3" className="status">
                    <Accordion.Header className="sidebar_names">
                      Artist
                    </Accordion.Header>
                    <Accordion.Body></Accordion.Body>
                  </Accordion.Item>
                  <Accordion.Item eventKey="4" className="status">
                    <Accordion.Header className="sidebar_names">
                      Chain
                    </Accordion.Header>
                    <Accordion.Body></Accordion.Body>
                  </Accordion.Item>
                  <Accordion.Item eventKey="5" className="status">
                    <Accordion.Header className="sidebar_names">
                      Categories
                    </Accordion.Header>
                    <Accordion.Body></Accordion.Body>
                  </Accordion.Item>
                </Accordion>
              </div>
            </div>
          </Col>

          <Col md={9}>
            <Row className="slot">
              <Col md={4}>
                <div className="slot_box">
                  <img
                    className="slot-img"
                    src="assets\images\image 1.png"
                    alt="new"
                  />
                  <h6 className="name1">COOLGUYZZ</h6>
                  <p className="name2">Coolguyzz.io</p>
                  <div className="name3">
                    <h6>1.5 ETH</h6>
                    <h6>$1790</h6>
                  </div>
                  <div className="name4">
                    <p>Floor Price</p>
                    <p>+34.5%</p>
                  </div>
                </div>
              </Col>
              <Col md={4}>
                <div className="slot_box">
                  <img
                    className="slot-img"
                    src="assets\images\image 2.png"
                    alt="new"
                  />
                  <h6 className="name1">COOLGUYZZ</h6>
                  <p className="name2">Coolguyzz.io</p>
                  <div className="name3">
                    <h6>1.5 ETH</h6>
                    <h6>$1790</h6>
                  </div>
                  <div className="name4">
                    <p>Floor Price</p>
                    <p>+34.5%</p>
                  </div>
                </div>
              </Col>
              <Col md={4}>
                <div className="slot_box">
                  <img
                    className="slot-img"
                    src="assets\images\image 3.png"
                    alt="new"
                  />
                  <h6 className="name1">COOLGUYZZ</h6>
                  <p className="name2">Coolguyzz.io</p>
                  <div className="name3">
                    <h6>1.5 ETH</h6>
                    <h6>$1790</h6>
                  </div>
                  <div className="name4">
                    <p>Floor Price</p>
                    <p>+34.5%</p>
                  </div>
                </div>
              </Col>
              <Col md={4}>
                <div className="slot_box">
                  <img
                    className="slot-img"
                    src="assets\images\image 4.png"
                    alt="new"
                  />
                  <h6 className="name1">COOLGUYZZ</h6>
                  <p className="name2">Coolguyzz.io</p>
                  <div className="name3">
                    <h6>1.5 ETH</h6>
                    <h6>$1790</h6>
                  </div>
                  <div className="name4">
                    <p>Floor Price</p>
                    <p>+34.5%</p>
                  </div>
                </div>
              </Col>
              <Col md={4}>
                <div className="slot_box">
                  <img
                    className="slot-img"
                    src="assets\images\image 5.png"
                    alt="new"
                  />
                  <h6 className="name1">COOLGUYZZ</h6>
                  <p className="name2">Coolguyzz.io</p>
                  <div className="name3">
                    <h6>1.5 ETH</h6>
                    <h6>$1790</h6>
                  </div>
                  <div className="name4">
                    <p>Floor Price</p>
                    <p>+34.5%</p>
                  </div>
                </div>
              </Col>
              <Col md={4}>
                <div className="slot_box">
                  <img
                    className="slot-img"
                    src="assets\images\image 6.png"
                    alt="new"
                  />
                  <h6 className="name1">COOLGUYZZ</h6>
                  <p className="name2">Coolguyzz.io</p>
                  <div className="name3">
                    <h6>1.5 ETH</h6>
                    <h6>$1790</h6>
                  </div>
                  <div className="name4">
                    <p>Floor Price</p>
                    <p>+34.5%</p>
                  </div>
                </div>
              </Col>
              <Col md={4}>
                <div className="slot_box">
                  <img
                    className="slot-img"
                    src="assets\images\image 1.png"
                    alt="new"
                  />
                  <h6 className="name1">COOLGUYZZ</h6>
                  <p className="name2">Coolguyzz.io</p>
                  <div className="name3">
                    <h6>1.5 ETH</h6>
                    <h6>$1790</h6>
                  </div>
                  <div className="name4">
                    <p>Floor Price</p>
                    <p>+34.5%</p>
                  </div>
                </div>
              </Col>
              <Col md={4}>
                <div className="slot_box">
                  <img
                    className="slot-img"
                    src="assets\images\image 2.png"
                    alt="new"
                  />
                  <h6 className="name1">COOLGUYZZ</h6>
                  <p className="name2">Coolguyzz.io</p>
                  <div className="name3">
                    <h6>1.5 ETH</h6>
                    <h6>$1790</h6>
                  </div>
                  <div className="name4">
                    <p>Floor Price</p>
                    <p>+34.5%</p>
                  </div>
                </div>
              </Col>
              <Col md={4}>
                <div className="slot_box">
                  <img
                    className="slot-img"
                    src="assets\images\image 3.png"
                    alt="new"
                  />
                  <h6 className="name1">COOLGUYZZ</h6>
                  <p className="name2">Coolguyzz.io</p>
                  <div className="name3">
                    <h6>1.5 ETH</h6>
                    <h6>$1790</h6>
                  </div>
                  <div className="name4">
                    <p>Floor Price</p>
                    <p>+34.5%</p>
                  </div>
                </div>
              </Col>
            </Row>
          </Col>
        </Row>
      </Container>
      </Layout>
    </>
  );
};

export default Marketplace;
