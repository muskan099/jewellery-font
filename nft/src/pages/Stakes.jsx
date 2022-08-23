import React, { useEffect, useState } from "react";
import Container from "react-bootstrap/Container";
import { Row, Col, Modal, Button} from "react-bootstrap";
import Table from "react-bootstrap/Table";
import Layout from '../Components/Layout';

function Stakes() {
  return (

    <Layout>
<div>
 <div className="transactions-section">
   <Container fluid className="p-0">
    <Row>
        <Col md="3" sm="4">
            <div className="transaction-side-image">
               <img src="images/detail-img.png" alt="" className="img-fluid"/>
            </div>
        </Col> 
        <Col md="9" sm="8">
                <div className="transaction-box">
                    <div className="for-image-box1">
                        <img  className="m-0 img-fluid" src="assets/images/detail-img.png" alt=""/>
                        <p className="paragraph-main1 py-2">0x800d9250b9f8f46ef8b</p>
                    </div>
                    <div className="table-responsive">
                      <table className="table transactions-table-new table-order">
                        <thead>
                          <tr className="for-back">
                            <th width="2%">S.No</th>
                            <th width="6%">Image</th>
                            <th width="8%">Name</th>
                            <th width="7%">Buying Price</th>
                            <th width="7%">Creator Address</th>
                            <th width="7%">Transaction hash</th>
                            <th width="5%">Token</th>
                            <th width="5%">Status</th>
                            <th width="18%">Action</th>
                          </tr>
                          </thead>
                          <tbody>
                                <tr className="for-body-tr">
                                  <td  className="td-break">1</td>
                                  <td  className="td-break"><img  className="img-fluid" src="images/detail-img.png" width="40px" alt=""/></td>
                                  <td className="td-break">Hello</td>
                                  <td  className="td-break">35000</td>
                                  <td  className="td-break">0*810214555455454545</td>
                                  <td  className="td-break">0*5654114444444555</td>
                                  <td  className="td-break">9160</td>
                                  <td className="td-break success-green">success</td>
                                  <td className="td-break"><button className="btn-sell1">Sell</button>
                                  <button className="btn-sell1">Cancel</button><button className="btn-sell1">Auction</button>
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

export default Stakes;