import React from 'react'
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Layout from '../Components/Layout';

function Homepage() {
  
  return (
    <div>
      <Layout>
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
      </Layout>
    </div>
  )
}

export default Homepage