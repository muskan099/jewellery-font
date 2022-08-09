import React from 'react'
import Header from '../Components/UI/Header';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

function Homepage() {
  
  return (
    <div>
      <Header/>
      <section id='banner'>
      <Container>
      <Row>
        <Col sm={6}>
          <div className="banner-txt">
            <h2>Discover collect, & sell <span>Extraordinary</span> NFTs </h2>
            <p>the leading NFT Marketplace on Ethereum Home to the next generation of digital creators. Discover the best NFT collections.</p>
          </div>
        </Col>
        <Col sm={6}>
          <div className="banner-img">
            <img src="assets\images\banner-img.png" alt="new" />
          </div>
        </Col>
      </Row>
      </Container>
      </section>
    </div>
  )
}

export default Homepage