import React from 'react'
import Layout from '../Layout'
import Nav from "react-bootstrap/Nav";

const Store = () => {
  return (
    <div>
      <>
        <Layout>
            <div>
            <div className="ban">
            <img
              className="store-banner"
              src="assets\images\ArtistCover_img.png"
              alt="new"
            />

            <img
              className="banner-round"
              src="assets\images\Artist_profile.png"
              alt="new"
            />
          </div>
          <div className="ban-text">
            <h1>Metamarse</h1>
            <span>@marse_meta00</span>
          </div>
          <div className="nav">
            {/* <Nav defaultActiveKey="#" as="ul"> */}
              <Nav.Item as="li">
                <Nav.Link href="/overview" style={{"color":"white"}}>Overview</Nav.Link>
              </Nav.Item>
              <Nav.Item as="li">
                <Nav.Link href="/store" style={{"color":"white"}}>Purchased NFTs</Nav.Link>
              </Nav.Item>
              <Nav.Item as="li">
                <Nav.Link href="/sell" style={{"color":"white"}}>On Sell NFTs</Nav.Link>
              </Nav.Item>
            {/* </Nav> */}
          </div>
            </div>
        </Layout>
      </>
    </div>
  )
}

export default Store
