import React, { useEffect, useState } from "react";
import Container from "react-bootstrap/Container";
import { Row, Col, Modal, Button } from "react-bootstrap";
import Table from "react-bootstrap/Table";
import Layout from '../Components/Layout';
import { useSelector } from "react-redux";

import axiosMain from "../http/axios/axios_main";

function Transactions() {

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);


  const {
    isAuthenticated,
    walletAddress,
  } = useSelector((state) => state.auth);

  console.log(walletAddress, 'check');

  const [trandata, settrandata] = useState([]);

  const [data, setdata] = useState([]);

  const gettransaction = async () => {

    let inputdata = {
      // "wallet_address": "wwffvvvvvgdyymkf",
      "wallet_address":walletAddress


    }
    const api = await axiosMain.post("/TranssactionUser", inputdata);

    settrandata(api.data.data[0].list);
    setdata(api.data.data[0].list);

    console.log(api.data.data[0].list, 'req');
  };
  useEffect(() => {

    if (isAuthenticated) {
      gettransaction();
    }

  }, [walletAddress]);

  console.log(isAuthenticated, 'isauth');
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
                      <p>{isAuthenticated ? walletAddress.slice(0,6)+"...."+walletAddress.slice(-6) : ''}</p>
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
                        {data.map((items, index) => {
                          return (
                            <tr className="for-body-tr">
                              <td className="td-break">{index + 1}</td>
                              <td className="td-break"><img className="img-fluid" src={items.nftImage} width="40px" alt="" /></td>
                              <td className="td-break">{items.nftName}</td>
                              <td className="td-break">{items.buying_Price}</td>
                              <td className="td-break">{items.wallet_address.slice(0,3)}....  {items.wallet_address.slice(-3)}</td>
                              <td className="td-break">{items.hash.slice(0,3)}....  {items.hash.slice(-3)}</td>
                              <td className="td-break">{items.token}</td>
                              <td className="td-break success-green">{items.status ? 'success' : 'pending'}</td>
                              <td className="td-break"><div className="btn-flex-btn"><button className="btn-sell1" onClick={handleShow}>Sell</button>
                                <button className="btn-sell1" onClick={handleShow}>Cancel</button><button className="btn-sell1" onClick={handleShow}>Auction </button></div>
                              </td>
                            </tr>
                          )
                        })}
                      </tbody>
                    </table>
                    <Modal
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
        className="modal-comming-soon "
        show={show}
        onHide={handleClose}
      >
        <Modal.Header closeButton className="border-none"></Modal.Header>
        <Modal.Body>
          <div className="outer-div">
            <img src="assets/images/coming-soon.png" className="img-fluid" />
            <h5>This page will be Added Soon</h5>
          </div>
        </Modal.Body>
      </Modal>
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