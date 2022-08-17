import React, {useState} from 'react'
import Header from '../Components/UI/Header';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Footer from "../Components/UI/Footer"
import Card from 'react-bootstrap/Card';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import CardGroup from 'react-bootstrap/CardGroup';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';


function Homepage() {
  const responsive = {
    superLargeDesktop: {
      // the naming can be any, depends on you.
      breakpoint: { max: 4000, min: 3000 },
      items: 5
    },
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 3
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 2
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1
    }
  };
  
  return (
    <div>
      <Header/>
      <section id='banner'>
      <div>
      <Container>
        <Col sm={6}>
          <div className="banner-txt">
            <h2>Discover collect, & sell <span>Extraordinary</span> NFTs </h2>
            
            <p className="banner-content">the leading NFT Marketplace on Ethereum Home to the next generation of digital creators. Discover the best NFT collections.</p>
          <Col sm={6} className="banner-btn-container">
         

          <a href="/"className='banner-btn-gradient'>Explore</a>
      <a href="/" className='banner-btn-simple'>Create</a>
            
          </Col>
          <Row sm={6} className="banner-analysis">
            <Row>
              <h4 className="banner-analysis-number">432K+</h4>
              <p className="banner-analysis-quantity">Collections</p>
            </Row>
            <Row>
              <h4 className="banner-analysis-number">200K+</h4>
              <p className="banner-analysis-quantity">Artists</p>
            </Row>
            <Row>
              <h4 className="banner-analysis-number">10K+</h4>
              <p className="banner-analysis-quantity">Community</p>
            </Row>
          </Row>
          </div>
        </Col>
        <Col sm={6}>
          <div className="banner-img">
            <img src="assets\images\banner-img.png" alt="new" />
          </div>
        </Col>
      </Container>
      <Container className="wallet-container">
      <Row className="wallet-container-row1">
        <Col>
        <img src="assets\images\metamask-img.png" alt="metamask" />
        </Col>
        <Col>
        
        <img src="assets\images\trustWallet-img.png" alt="metamask" /></Col>
        <Col>  <img src="assets\images\WalletConnect-img.png" alt="metamask" /></Col>
      </Row>
      <Row className="justify-content-md-center wallet-container-row2">
        <Col xs lg="4">
        <img src="assets\images\exodus-img.png" alt="metamask" />
        </Col>
      
        <Col xs lg="4">
        <img src="assets\images\exodus-img.png" alt="metamask" />
        </Col>
      </Row>
     
    </Container>
    <div className="homePage-slider">
<h2 className="homePage-slider-heading">Trending NFTs</h2>
    <Carousel responsive={responsive} className="crousel-container " >
  <div>
  <Card style={{ width: '350px' }} className="card-container " onClick={() => {
    console.log("second slide clicked")
  }}>
      <Card.Img variant="top" className="card-container-image" src="assets\images\nft-image-1.png" />
      <Card.Body>
        <Row lg={6} className="card-container-row">
        <img className="card-container-avatar"src="assets\images\avatar.png" alt="avatar"/>
     <Col lg={10}>
     <h2 className="card-container-title">CryptoPunk 3D #13</h2>
     <p className="card-container-subTitle">3D cryptopunk</p>
     </Col>
        <img className="card-container-eth" src="assets\images\ETH-logo.png" alt="avatar"/>
        </Row >
      
       <Row className="eth-values">
         <Col>
         <h2 className="card-container-title">9.61 ETH</h2>
     <p className="card-container-subTitle-price">latest Bid</p>
         </Col>
         <Col>
         <h2 className="card-container-title"> 4.12 ETH</h2>
     <p className="card-container-subTitle-price"> from</p>
         </Col>
         <Col>
         <h2 className="card-container-title">$103,025</h2>
     <p className="card-container-subTitle-red">-2.25%</p>
         </Col>
       </Row>
      </Card.Body>
    </Card>
  </div>
  <div><Card style={{ width: '350px' }} className="card-container card-active">
      <Card.Img variant="top" className="card-container-image" src="assets\images\nft-image-2.png" />
      <Card.Body>
        <Row lg={6} className="card-container-row">
        <img className="card-container-avatar"src="assets\images\avatar.png" alt="avatar"/>
     <Col lg={10}>
     <h2 className="card-container-title">CryptoPunk 3D #13</h2>
     <p className="card-container-subTitle">3D cryptopunk</p>
     </Col>
        <img className="card-container-eth" src="assets\images\ETH-logo.png" alt="avatar"/>
        </Row >
      
       <Row className="eth-values-btn">
         <Col>
         <h2 className="card-container-title">9.61 ETH</h2>
     <p className="card-container-subTitle-price">latest Bid</p>
         </Col>
         <Col>
         <h2 className="card-container-title"> 4.12 ETH</h2>
     <p className="card-container-subTitle-price"> from</p>
         </Col>
         <Col>
         <h2 className="card-container-title text-right">$103,025</h2>
     <p className="card-container-subTitle-red">-2.25%</p>
         </Col>
       </Row>
       <Row>

       <a href="" className='card-container-button'>Connect Wallet</a>
       </Row>
      </Card.Body>
    </Card></div>
  <div><Card style={{ width: '350px' }} className="card-container">
      <Card.Img variant="top" className="card-container-image" src="assets\images\nft-image-3.png" />
      <Card.Body>
        <Row lg={6} className="card-container-row">
        <img className="card-container-avatar"src="assets\images\avatar.png" alt="avatar"/>
     <Col lg={10}>
     <h2 className="card-container-title">CryptoPunk 3D #13</h2>
     <p className="card-container-subTitle">3D cryptopunk</p>
     </Col>
        <img className="card-container-eth" src="assets\images\ETH-logo.png" alt="avatar"/>
        </Row >
      
       <Row className="eth-values">
         <Col>
         <h2 className="card-container-title">9.61 ETH</h2>
     <p className="card-container-subTitle-price">latest Bid</p>
         </Col>
         <Col>
         <h2 className="card-container-title"> 4.12 ETH</h2>
     <p className="card-container-subTitle-price"> from</p>
         </Col>
         <Col>
         <h2 className="card-container-title text-right">$103,025</h2>
     <p className="card-container-subTitle-red">-2.25%</p>
         </Col>
       </Row>
      </Card.Body>
    </Card></div>
  <div><Card style={{ width: '350px' }} className="card-container">
      <Card.Img variant="top" className="card-container-image" src="assets\images\nft-image-1.png" />
      <Card.Body>
        <Row lg={6} className="card-container-row">
        <img className="card-container-avatar"src="assets\images\avatar.png" alt="avatar"/>
     <Col lg={10}>
     <h2 className="card-container-title">CryptoPunk 3D #13</h2>
     <p className="card-container-subTitle">3D cryptopunk</p>
     </Col>
        <img className="card-container-eth" src="assets\images\ETH-logo.png" alt="avatar"/>
        </Row >
      
       <Row className="eth-values">
         <Col>
         <h2 className="card-container-title">9.61 ETH</h2>
     <p className="card-container-subTitle-price">latest Bid</p>
         </Col>
         <Col>
         <h2 className="card-container-title"> 4.12 ETH</h2>
     <p className="card-container-subTitle-price"> from</p>
         </Col>
         <Col>
         <h2 className="card-container-title text-right">$103,025</h2>
     <p className="card-container-subTitle-red">-2.25%</p>
         </Col>
       </Row>
      </Card.Body>
    </Card></div>
    <div><Card style={{ width: '350px' }} className="card-container">
      <Card.Img variant="top" className="card-container-image" src="assets\images\nft-image-1.png" />
      <Card.Body>
        <Row lg={6} className="card-container-row">
        <img className="card-container-avatar"src="assets\images\avatar.png" alt="avatar"/>
     <Col lg={10}>
     <h2 className="card-container-title">CryptoPunk 3D #13</h2>
     <p className="card-container-subTitle">3D cryptopunk</p>
     </Col>
        <img className="card-container-eth" src="assets\images\ETH-logo.png" alt="avatar"/>
        </Row >
      
       <Row className="eth-values">
         <Col>
         <h2 className="card-container-title">9.61 ETH</h2>
     <p className="card-container-subTitle-price">latest Bid</p>
         </Col>
         <Col>
         <h2 className="card-container-title"> 4.12 ETH</h2>
     <p className="card-container-subTitle-price"> from</p>
         </Col>
         <Col>
         <h2 className="card-container-title text-right">$103,025</h2>
     <p className="card-container-subTitle-red">-2.25%</p>
         </Col>
       </Row>
      </Card.Body>
    </Card></div>
</Carousel>
<div className="btn-container">
<a href="/" className='banner-btn-simple'>See More</a>
</div>
      </div>
      <Container className="top-collection">
      <h2 className="homePage-slider-heading">Top Collections</h2>
      <Col className="top-collection-selection-bar">
      <a href="" className='top-collection-active'>All</a>
      <a href="/" className='top-collection-state'>Collectibles</a>
      <a href="/" className='top-collection-state'>Metaverse</a>
      <a href="/" className='top-collection-state'>Virtual Worlds</a>
      <a href="/" className='top-collection-state'>Sports</a>
      <a href="/" className='top-collection-state'>Music</a>
      </Col>
      </Container>
      <div className="top-collection-container container-grid">
      <Row className="top-collection-container-row">
        <Col><div><Card style={{ width: '326px' }} className="card-container card-active card-background">
          <div>

      <Card.Img variant="top" className="card-container-topSelection-image" src="assets\images\top-selection-image-1.png" />
          </div>
      <Card.Body className="top-collection-nft-container">
      
       
     <Col  >
     <h2 className="card-container-title">COOLGUYZZ </h2>
     <p className="card-container-subTitle">Coolguyzz.io</p>
     </Col>
       
       
      
       <Row className="eth-values-btn">
         <Col>
         <h2 className="card-container-title">9.61 ETH</h2>
     <p className="card-container-subTitle-price">latest Bid</p>
         </Col>
       
         <Col>
         <h2 className="card-container-title text-right">$103,025</h2>
     <p className="card-container-subTitle-red">-2.25%</p>
         </Col>
       </Row>
       <Row>

    
       </Row>
      </Card.Body>
    </Card></div></Col>
        <Col ><div><Card style={{ width: '326px' }} className="card-container card-active card-background">
          <div>

      <Card.Img variant="top" className="card-container-topSelection-image" src="assets\images\top-selection-image-1.png" />
          </div>
      <Card.Body className="top-collection-nft-container">
      
       
     <Col  >
     <h2 className="card-container-title">COOLGUYZZ </h2>
     <p className="card-container-subTitle">Coolguyzz.io</p>
     </Col>
       
       
      
       <Row className="eth-values-btn">
         <Col>
         <h2 className="card-container-title">9.61 ETH</h2>
     <p className="card-container-subTitle-price">latest Bid</p>
         </Col>
       
         <Col>
         <h2 className="card-container-title text-right">$103,025</h2>
     <p className="card-container-subTitle-red">-2.25%</p>
         </Col>
       </Row>
       <Row>

    
       </Row>
      </Card.Body>
    </Card></div></Col>
        <Col><div><Card style={{ width: '326px' }} className="card-container card-active card-background">
          <div>

      <Card.Img variant="top" className="card-container-topSelection-image" src="assets\images\top-selection-image-1.png" />
          </div>
      <Card.Body className="top-collection-nft-container">
      
       
     <Col  >
     <h2 className="card-container-title">COOLGUYZZ </h2>
     <p className="card-container-subTitle">Coolguyzz.io</p>
     </Col>
       
       
      
       <Row className="eth-values-btn">
         <Col>
         <h2 className="card-container-title">9.61 ETH</h2>
     <p className="card-container-subTitle-price">latest Bid</p>
         </Col>
       
         <Col>
         <h2 className="card-container-title text-right">$103,025</h2>
     <p className="card-container-subTitle-red">-2.25%</p>
         </Col>
       </Row>
       <Row>

    
       </Row>
      </Card.Body>
    </Card></div></Col>
    <Col><div><Card style={{ width: '326px' }} className="card-container card-active card-background">
          <div>

      <Card.Img variant="top" className="card-container-topSelection-image" src="assets\images\top-selection-image-1.png" />
          </div>
      <Card.Body className="top-collection-nft-container">
      
       
     <Col  >
     <h2 className="card-container-title">COOLGUYZZ </h2>
     <p className="card-container-subTitle">Coolguyzz.io</p>
     </Col>
       
       
      
       <Row className="eth-values-btn">
         <Col>
         <h2 className="card-container-title">9.61 ETH</h2>
     <p className="card-container-subTitle-price">latest Bid</p>
         </Col>
       
         <Col>
         <h2 className="card-container-title text-right">$103,025</h2>
     <p className="card-container-subTitle-red">-2.25%</p>
         </Col>
       </Row>
       <Row>

    
       </Row>
      </Card.Body>
    </Card></div></Col>
      </Row>
      <Row className="top-collection-container-row1">
        <Col><div><Card style={{ width: '326px' }} className="card-container card-active card-background">
          <div>

      <Card.Img variant="top" className="card-container-topSelection-image" src="assets\images\top-selection-image-1.png" />
          </div>
      <Card.Body className="top-collection-nft-container">
      
       
     <Col  >
     <h2 className="card-container-title">COOLGUYZZ </h2>
     <p className="card-container-subTitle">Coolguyzz.io</p>
     </Col>
       
       
      
       <Row className="eth-values-btn">
         <Col>
         <h2 className="card-container-title">9.61 ETH</h2>
     <p className="card-container-subTitle-price">latest Bid</p>
         </Col>
       
         <Col>
         <h2 className="card-container-title text-right">$103,025</h2>
     <p className="card-container-subTitle-red">-2.25%</p>
         </Col>
       </Row>
       <Row>

    
       </Row>
      </Card.Body>
    </Card></div></Col>
        <Col ><div><Card style={{ width: '326px' }} className="card-container card-active card-background">
          <div>

      <Card.Img variant="top" className="card-container-topSelection-image" src="assets\images\top-selection-image-1.png" />
          </div>
      <Card.Body className="top-collection-nft-container">
      
       
     <Col  >
     <h2 className="card-container-title">COOLGUYZZ </h2>
     <p className="card-container-subTitle">Coolguyzz.io</p>
     </Col>
       
       
      
       <Row className="eth-values-btn">
         <Col>
         <h2 className="card-container-title">9.61 ETH</h2>
     <p className="card-container-subTitle-price">latest Bid</p>
         </Col>
       
         <Col>
         <h2 className="card-container-title text-right">$103,025</h2>
     <p className="card-container-subTitle-red">-2.25%</p>
         </Col>
       </Row>
       <Row>

    
       </Row>
      </Card.Body>
    </Card></div></Col>
        <Col><div><Card style={{ width: '326px' }} className="card-container card-active card-background">
          <div>

      <Card.Img variant="top" className="card-container-topSelection-image" src="assets\images\top-selection-image-1.png" />
          </div>
      <Card.Body className="top-collection-nft-container">
      
       
     <Col  >
     <h2 className="card-container-title">COOLGUYZZ </h2>
     <p className="card-container-subTitle">Coolguyzz.io</p>
     </Col>
       
       
      
       <Row className="eth-values-btn">
         <Col>
         <h2 className="card-container-title">9.61 ETH</h2>
     <p className="card-container-subTitle-price">latest Bid</p>
         </Col>
       
         <Col>
         <h2 className="card-container-title text-right">$103,025</h2>
     <p className="card-container-subTitle-red">-2.25%</p>
         </Col>
       </Row>
       <Row>

    
       </Row>
      </Card.Body>
    </Card></div></Col>
    <Col><div><Card style={{ width: '326px' }} className="card-container card-active card-background">
          <div>

      <Card.Img variant="top" className="card-container-topSelection-image" src="assets\images\top-selection-image-1.png" />
          </div>
      <Card.Body className="top-collection-nft-container">
      
       
     <Col  >
     <h2 className="card-container-title">COOLGUYZZ </h2>
     <p className="card-container-subTitle">Coolguyzz.io</p>
     </Col>
       
       
      
       <Row className="eth-values-btn">
         <Col>
         <h2 className="card-container-title">9.61 ETH</h2>
     <p className="card-container-subTitle-price">latest Bid</p>
         </Col>
       
         <Col>
         <h2 className="card-container-title text-right">$103,025</h2>
     <p className="card-container-subTitle-red">-2.25%</p>
         </Col>
       </Row>
       <Row>

    
       </Row>
      </Card.Body>
    </Card></div></Col>
      </Row>
      <div className="btn-container">
<a href="/" className='banner-btn-simple'>See More</a>
</div>
    </div>
      <Container>
      <h2 className="homePage-slider-heading">Top Categories</h2>
      <Carousel responsive={responsive}>
  <div><Card style={{ width: '446px'  }} className="top-category-card">
    <Row className="big-image-container">
    <Row className="small-image-container">
    <Card.Img variant="top" className="top-category-smallImage" src="assets\images\category-img-1.png" />
    <Card.Img variant="top" className="top-category-smallImage" src="assets\images\category-img-1.png" />
    </Row>
    <Card.Img variant="top" className="top-category-bigImage"src="assets\images\top-selection-image-1.png" />
    </Row>
      <Card.Body>
        <Card.Title className="category-card-title">Golden Necklace</Card.Title>
      
      </Card.Body>
    </Card></div>
  <div><Card style={{ width: '446px'  }} className="top-category-card">
    <Row className="big-image-container">
    <Row className="small-image-container">
    <Card.Img variant="top" className="top-category-smallImage" src="assets\images\category-img-1.png" />
    <Card.Img variant="top" className="top-category-smallImage" src="assets\images\category-img-1.png" />
    </Row>
    <Card.Img variant="top" className="top-category-bigImage"src="assets\images\top-selection-image-1.png" />
    </Row>
      <Card.Body>
        <Card.Title className="category-card-title">Golden Necklace</Card.Title>
      
      </Card.Body>
    </Card></div>
  <div><Card style={{ width: '446px'  }} className="top-category-card">
    <Row className="big-image-container">
    <Row className="small-image-container">
    <Card.Img variant="top" className="top-category-smallImage" src="assets\images\category-img-1.png" />
    <Card.Img variant="top" className="top-category-smallImage" src="assets\images\category-img-1.png" />
    </Row>
    <Card.Img variant="top" className="top-category-bigImage"src="assets\images\top-selection-image-1.png" />
    </Row>
      <Card.Body>
        <Card.Title className="category-card-title">Golden Necklace</Card.Title>
      
      </Card.Body>
    </Card></div>
  <div>Item 4</div>

</Carousel>;
<div className="btn-container">
<a href="/" className='banner-btn-simple'>See More</a>
</div>
    

      </Container>
      <Container className="sellYourNft">
<div>
<h2 className="homePage-slider-heading">Create and sell your NFTs</h2>
      <CardGroup className="sellYourNft-container">
    
      <div className="sellYourNft-card">
        <Card.Img className="sellYourNft-image" variant="top" src="assets\images\sell-nft-image1.png" />
        <Card.Body>
          <Card.Title>Card title</Card.Title>
          <Card.Text>
            This is a wider card with supporting text below as a natural lead-in
            to additional content. This content is a little bit longer.
          </Card.Text>
        </Card.Body>
      
      </div>
      <div className="sellYourNft-card">
        <Card.Img className="sellYourNft-image" variant="top" src="assets\images\sell-nft-image2.png" />
        <Card.Body>
          <Card.Title>Card title</Card.Title>
          <Card.Text>
            This card has supporting text below as a natural lead-in to
            additional content.{' '}
          </Card.Text>
        </Card.Body>
      
      </div>
      <div className="sellYourNft-card">
        <Card.Img className="sellYourNft-image"variant="top" src="assets\images\sell-nft-image3.png" />
        <Card.Body>
          <Card.Title>Card title</Card.Title>
          <Card.Text>
            This is a wider card with supporting text below as a natural lead-in
            to additional content. This card has even longer content than the
            first to show that equal height action.
          </Card.Text>
        </Card.Body>
      
      </div>
    </CardGroup>
</div>
      </Container>
      <Container className="articles">

<h2 className="homePage-slider-heading">Create and sell your NFTs</h2>
      
<CardGroup className="articles-cards">
      <Card className="articles-card">
        <Card.Img variant="top" className="article-img"src="assets\images\article-image-1.png" />
        <Card.Body>
         
          <Card.Text className="articleText">
            This is a wider card with supporting text below as a natural lead-in
            to additional content. This content is a little bit longer.
          </Card.Text>
        </Card.Body>
        <Card.Footer>
          <small className="text-muted article-footer">Last updated 3 mins ago</small>
        </Card.Footer>
      </Card>
      <Card className="articles-card">
        <Card.Img variant="top" className="article-img" src="assets\images\article-image-2.png" />
        <Card.Body>
         
          <Card.Text className="articleText">
            This card has supporting text below as a natural lead-in to
            additional content.{' '}
          </Card.Text>
        </Card.Body>
        <Card.Footer>
          <small className="text-muted article-footer">Last updated 3 mins ago</small>
        </Card.Footer>
      </Card>
      <Card className="articles-card">
        <Card.Img variant="top" className="article-img" src="assets\images\article-image-3.png" />
        <Card.Body>
         
          <Card.Text className="articleText">
            This is a wider card with supporting text below as a natural lead-in
            to additional content. This card has even longer content than the
            first to show that equal height action.
          </Card.Text>
        </Card.Body>
        <Card.Footer>
          <small className="text-muted article-footer">Last updated 3 mins ago</small>
        </Card.Footer>
      </Card>
    </CardGroup>
    <div className="btn-container">
<a href="/" className='banner-btn-simple'>See More</a>
</div>
      </Container>
      <Container className="articles">

<h2 className="homePage-slider-heading">Get More Updates</h2>
<p className="update-text">Join our mailing list to stay in the loop with our newest feature releases, NFT drops, and tips and tricks </p>
<InputGroup className="mb-3 input-box">
        <Form.Control
        className="input-container"
          placeholder="Recipient's username"
          aria-label="Recipient's username"
          aria-describedby="basic-addon2"
        />
        <InputGroup.Text id="basic-addon2" className="input-button">I'm in</InputGroup.Text>
      </InputGroup>

</Container>
      <Container>
        <div className="footer-homepage"></div>
      </Container>
      
      </div>
      </section>
      <Footer />
    </div>
  )
}

export default Homepage