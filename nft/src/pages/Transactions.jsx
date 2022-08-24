import React, { useEffect, useState } from "react";
import Container from "react-bootstrap/Container";
import { Row, Col, Modal, Button} from "react-bootstrap";
import Table from "react-bootstrap/Table";
import Layout from '../Components/Layout';

function Transactions() {
  return (

    <Layout>
<div>
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
                              <p>0x800d9250b9f8f46ef8b</p>
                           </div>
                        </div>
                     </div>
                  </Col> 
              </Row>
           </Container>
      </section> 
 <div className="transactions-section">
   <Container>
    <Row>
        <Col md="12">
                <div className="transaction-box pt-4">
                    {/* <div className="for-image-box1">
                        <img  className="m-0 img-fluid" src="assets/images/detail-img.png" alt=""/>
                        <p className="paragraph-main1 py-2">0x800d9250b9f8f46ef8b</p>
                    </div> */}
                    <div className="table-responsive">
                      <table className="table table-details">
                        <thead>
                          <tr className="for-back">
                            <th>S.No</th>
                            <th>Image</th>
                            <th>Name</th>
                            <th >Buying Price</th>
                            <th>Creator Address</th>
                            <th>Transaction hash</th>
                            <th>Token</th>
                            <th>Status</th>
                            <th width="20%">Action</th>
                          </tr>
                          </thead>
                          <tbody>
                                <tr className="for-body-tr">
                                  <td  className="td-break">1</td>
                                  <td  className="td-break"><img  className="img-fluid" src="assets/images/detail-img.png" width="40px" alt=""/></td>
                                  <td className="td-break">Hello</td>
                                  <td  className="td-break">35000</td>
                                  <td  className="td-break">0*81021455545545</td>
                                  <td  className="td-break">0*5654114444444555</td>
                                  <td  className="td-break">9160</td>
                                  <td className="td-break success-green">success</td>
                                  <td className="td-break"><div className="btn-flex-btn"><button className="btn-sell1">Sell</button>
                                  <button className="btn-sell1">Cancel</button><button className="btn-sell1">Auction</button></div>
                                  </td>
                                </tr>
                        </tbody>
                      </table>
                    </div>
                </div>
        </Col>
    </Row>
   </Container>
 </div>
</div>
</Layout>
    );
}

export default Transactions;