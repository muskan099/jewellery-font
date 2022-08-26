import React, { useEffect, useState } from "react";
import Container from "react-bootstrap/Container";
import { useDispatch, useSelector } from "react-redux";

import { Row, Col, Modal, Button } from "react-bootstrap";
import Table from "react-bootstrap/Table";
import Layout from "../Components/Layout";
import axiosMain from "../http/axios/axios_main";
import moment from "moment";

function Stakes() {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const {
    isAuthenticated,
    walletAddress,
  } = useSelector((state) => state.auth);

  const [stakes, setstakes] = useState([]);
const sliceWalletAddress = walletAddress.slice(0,6)+"..."+walletAddress.slice(-5)
  const getStakes = async () => {
    const api = await axiosMain.post("/StakeUser",{wallet_address:walletAddress

  });
  
  console.log({api})
    setstakes(api.data.data[0].list);
    console.log(api.data.data[0].list, "req");
  };
  useEffect(() => {
    if( isAuthenticated){

      getStakes();
    }
  }, [ walletAddress]);


  return (
    <Layout>
      <div>
        <div className="stakes-section">
          <Container>
            <Row>
              <Col md="12">
                <div className="stakes">
                  <div className="for-image-box1">
                    <img src="assets/images/detail-img.png" alt="" />
                    <p className="paragraph-main1 py-2">
                      { isAuthenticated ? sliceWalletAddress:""}
                    </p>
                  </div>
                  <div className="table-responsive">
                    <table className="table table-details">
                      <thead>
                        <tr className="for-back">
                          <th width="10%">Wallet Address</th>
                          <th width="8%">Amount</th>
                          <th width="10%">Total Interest</th>
                          <th width="10%">Total Amount</th>
                          <th width="7%">Start Date</th>
                          <th width="10%">Lockup End</th>
                          <th width="7%">Status</th>
                          <th width="7%">Action</th>
                          <th width="7%">APY(%)</th>
                        </tr>
                      </thead>

                      <tbody>
                        {stakes.map((items, index) => {
                          return (
                            <tr className="for-body-tr">
                              <td className="td-break">
                                {items.wallet_address.slice(0,5)}....  {items.wallet_address.slice(-5)}
                              </td>
                              <td className="td-break">
                                {items.current_balance}
                              </td>
                              <td className="td-break">
                                {items.total_intrest}
                              </td>
                              <td className="td-break">
                                {items.deposit_amount}
                              </td>
                              <td className="td-break">{moment(items.start_date).format("YYYY-MM-DD")}</td>
                              
                              <td className="td-break">{moment(items.end_date).format("YYYY-MM-DD")}</td>
                              <td className="td-break">
                                <button className="btn-active">{items.status}</button>
                              </td>
                              <td className="td-break">
                                <button className="btn-sell1" onClick={handleShow}>Withdraw</button>
                              </td>
                            
                              <td className="td-break">{items.interest_rate}</td>
                            </tr>
                          );
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
    //
  );
}

export default Stakes;
