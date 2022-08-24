import React, { useEffect, useState } from "react";
import Container from "react-bootstrap/Container";
import { Row, Col, Modal, Button } from "react-bootstrap";
import Table from "react-bootstrap/Table";
import Layout from "../Components/Layout";
import axiosMain from "../http/axios/axios_main";

function Stakes() {

  const [stakes, setstakes] = useState([]);
  const getStakes = async () => {
    const api = await axiosMain.get("/Stakeget");
    setstakes(api.data.datas[0].list);
    console.log(api.data.datas[0].list, "req");
  };
  useEffect(() => {
    getStakes();
  }, []);

  
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
                      0x800d9250b9f8f46eef7317988c4b547b781f1af170f8b
                    </p>
                  </div>
                  <div className="table-responsive">
                    <table className="table table-borderless transactions-table-new table-order">
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
                                {items.wallet_address}
                              </td>
                              <td className="td-break">
                                {items.current_balance}
                              </td>
                              <td className="td-break">
                                {items.interest_rate}
                              </td>
                              <td className="td-break">
                                {items.deposit_amount}
                              </td>
                              <td className="td-break">{items.start_date}</td>
                              <td className="td-break">{items.end_date}</td>
                              <td className="td-break">
                                <button className="btn-active">Active</button>
                              </td>
                              <td className="td-break">
                                <button className="btn-sell1">Closed</button>
                              </td>
                              <td className="td-break">12</td>
                            </tr>
                          );
                        })}
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
    //
  );
}

export default Stakes;
