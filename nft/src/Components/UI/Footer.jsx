import React from 'react'
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import InputGroup from 'react-bootstrap/InputGroup';
import FormControl from 'react-bootstrap/FormControl';
import { Link } from "react-router-dom";

function Footer() {
  return (
      <footer>
        <Container>
        <Row>
          <Col>
            <div className="footer-new-outer">
               <Row className="">
                  <Col md={4} sm={4}>
                    <div className="footer-logo-container">
                      <img
                        src="assets/images/logo/logo.png"
                        className="foot-logo"
                        alt="logo"
                      />
                      <p className="footer-aboutUs">the leading NFT Marketplace on EthereumHome to the next generation of digital creators.Discover the best NFT collections.</p>
                      <div className="social-links">
                        <a href="" target={'_blank'}><img src="assets/images/twitter-icon.png" width={'40'} /></a>
                        <a href="" target={'_blank'} className="telegram-link"><img src="assets/images/instagram.png" width={'40'} /></a>
                        <a href="" target={'_blank'} className="insta-link"><img src="assets/images/youtube.png" width={'40'} /></a>
                        <a href="" target={'_blank'} className="insta-link"><img src="assets/images/social-media-icon-1.png" width={'40'} /></a>
                      </div>
                    </div>
                  </Col>
                  <Col md={3} sm={4} className="ms-auto me-auto">
                    <div>
                      <h6 className="footer-links-heading">Marketplace</h6>
                      <div className="footer-links">
                          <a
                            href="/explore"
                            className="footer-link"
                          >
                            Discover
                          </a>
                          <a
                            href="/explore"
                            className="footer-link"
                          >
                            Articles
                          </a>
                          <a
                            href="/explore"
                            className="footer-link"
                          >
                          How it Works
                          </a>
                          <a
                            href="/explore"
                            className="footer-link"
                          >
                          Help
                          </a>
                          </div>
                    </div>
                  </Col>
                  <Col md={3} sm={4}>
                    <div>
                      <h6 className="footer-links-heading">Links</h6>
                    
                      <div className="footer-links">
                          <a
                            href="/explore"
                            className="footer-link"
                          >
                          Tokens
                          </a>
                          <a
                            href="/explore"
                            className="footer-link"
                          >
                            API
                          </a>
                          <a
                            href="/explore"
                            className="footer-link"
                          >
                        Big Bounty
                          </a>
                          <a
                            href="/explore"
                            className="footer-link"
                          >
                        Become Partners
                          </a>
                          </div>
                    </div>
                  </Col>
                </Row>
                <div className="copyright-line">
                  <div className="copyright-line-container">
                    <p className="copyright">© 2022 <a href="" className="copyright-text">Quest</a> .all Right Reserved </p>
                  </div>
                </div>
            </div>
          </Col>
        </Row>
      </Container>
      </footer>
  )
}

export default Footer
