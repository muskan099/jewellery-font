import React, { useEffect, useState } from "react";
import Container from "react-bootstrap/Container";
import { Row, Col, Modal, Button, Form,FormControl,InputGroup,Dropdown, Accordion } from "react-bootstrap";
import Table from "react-bootstrap/Table";
import Layout from "../../Components/Layout";
import { useSelector } from "react-redux";
import { toast, useToast } from "react-toastify";
import axiosMain from "../../http/axios/axios_main";
import { axios } from "../../http";
import { CreateReSale, WithdrawSale } from "../../helpers/CreateResale";
import { createNFTAuction } from "../../helpers/AuctionHelper";
import { Transaction } from "../../helpers/Transaction";
import { useNavigate } from "react-router-dom";
import {NavLink } from "react-router-dom";
function Transactions() {
  const navigate = useNavigate();
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [saleData, setSaleData] = useState();
  const [total, setTotal] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [minPrice, setMinPrice] = useState("");
  const [ANft, setANft] = useState("");
  const [showSale, setShowSale] = useState(false);
  const [status, setStatus] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("");
  const [showAuction, setShowAuction] = useState(false);
  const [search, setSearch] = useState("");
  const { isAuthenticated, walletAddress } = useSelector((state) => state.auth);
const[handleTab,setHandleTab] = useState("")
  console.log(walletAddress, "check");
  const [auctionData, setAuctionData] = useState({
    minPrice: 0,
    startTime: "",
    endTime: "",
    buttonMessage: "",
  });
  const { buttonMessage } = auctionData;
  const [trandata, settrandata] = useState([]);
  const handleAuctionInput = (e) => {
    let value = e.target.value;
    if (e.target.name === "minPrice") {
      if (!isNaN(value)) {
        setAuctionData((p) => ({ ...p, [e.target.name]: value }));
      }
    } else {
      setAuctionData((p) => ({ ...p, [e.target.name]: value }));
    }
  };
  const [data, setdata] = useState([]);

  const handleCreateSale = async (data) => {
    console.log("data sale", data);

    setSaleData(data);

    setShow(true);
  };

  const gettransaction = async () => {
    let inputdata = {
      // "wallet_address": "wwffvvvvvgdyymkf",
      wallet_address: walletAddress,
    };
    const api = await axiosMain.post("/TranssactionUser", inputdata);

    settrandata(api.data.data[0].list);
    setdata(api.data.data[0].list);

    console.log(api.data.data[0].list, "req");
  };
  const submitSale = async () => {
    console.log("sale Data", saleData);
    let price = parseFloat(saleData.buying_Price);

    if (minPrice > 0) {
      setIsLoading(true);
      let tx = await CreateReSale(walletAddress, saleData.token, minPrice);
      console.log("this is tx", tx);
      if (tx) {
        let res = await axios.post("/update-content", {
          content_id: saleData.content_id,
          price: minPrice,
          forsale: "yes",
        });
        console.log("api called");
        handleClose();

        setIsLoading(false);
        window.location.reload(true);
        toast.success("Sale created successfully!");
      } else {
        setIsLoading(false);
        toast.warn("Sale failed. Please contact support with NFT deatils.");
      }
    } else {
      toast.warn("Please enter price");
    }
  };
  useEffect(() => {
    if (isAuthenticated) {
      gettransaction();
    }
  }, [walletAddress]);
  const handleMinPrice = (e) => {
    let value = e.target.value;

    if (isNaN(value)) {
      e.target.value = "";
      setTotal(0);
    } else {
      setMinPrice(value);

      let platform_fees = (parseFloat(value) * 15) / 100;

      let rest_amount = parseFloat(value) - platform_fees;

      let royalty = (parseFloat(value) * 2) / 100;

      let total_amount = parseFloat(value) - royalty;
      setTotal(total_amount);
    }
  };
  console.log(isAuthenticated, "isauth");
  const handleAuction = async () => {
    if (auctionData.minPrice == "" || auctionData.minPrice == 0) {
      toast.warn("Min price is required!");
    } else if (auctionData.startTime == "") {
      toast.warn("Start time is required!");
    } else if (auctionData.endTime == "") {
      toast.warn("End time is required");
    } else {
      setAuctionData((p) => ({
        ...p,
        isLoading: true,
        buttonMessage: "Processing Please Wait...",
      }));
      //let address = walletAddress;

      //let approveToken=await ApproveTabooNFT(ANft.token_id,walletAddress);

      console.log("anft", auctionData);
      let tx = await createNFTAuction(
        ANft.token_id,
        auctionData.minPrice,
        200,
        0,
        1500,
        auctionData.endTime,
        0,
        auctionData.startTime,
        ANft.ipfs,
        walletAddress
      );
      console.log("tx", tx);
      let data = { tx: tx };
      try {
        let trx = await Transaction(data);
        if (trx) {
          let token = ANft.token_id;
          console.log("token", token);
          let res = await axios.post("/Auction", {
            content_id: ANft._id,
            status: "auction",
            token: token,
            bid_price: auctionData.minPrice,
            bid_end: auctionData.endTime,
          });

          toast.success("Auction Started Successfully!");
          setAuctionData((p) => ({
            ...p,
            isLoading: false,
            buttonMessage: "",
          }));
          setShowAuction(false);
          handleClose();
        } else {
          toast.warn("Auction failed.Please contact support with NFT details");

          setAuctionData((p) => ({
            ...p,
            isLoading: false,
            buttonMessage: "",
          }));
          handleClose();
        }
      } catch (error) {
        toast.error(error.message);
        setAuctionData((p) => ({ ...p, isLoading: false, buttonMessage: "" }));
      }
    }
  };

  const handleWithdrawSale = async (data) => {
    console.log("the data is", data);
    setSaleData(data);

    setShowSale(true);
  };

  const submitWithdrawSale = async () => {
    console.log({ setSaleData });
    let hash = await WithdrawSale(walletAddress, saleData.token_id);

    if (hash) {
      let res = await axios.post("/cancleSellNFT", {
        content_id: saleData._id,
        status: "sold",
        forsale: "no",
      });

      setShowSale(false);

      toast.success("Transaction submitted successfully!");
      window.location.reload(true);
    }
  };
  const handleStartAuction = (value) => {
    setShowAuction(true);

    setANft(value);
  };
  const single_nft_data = (item) => {
    console.log(item, "items");
    navigate("/nft-detail", { state: { id: item._id } });
  };
  
  return (
    <Layout>
      <div>
        <section className="artist-main-sec">
          <Container fluid className="p-0">
            <Row>
            <Col lg={1} md={12} sm={12} xs={12}>
              <div className="sidemenu-creater">
                <ul>
                  <li className="active">
                    <NavLink to="/admin-dashboard">
                      <img
                        className="img-fluid m-0"
                        src={"assets/images/dashboard.png"}
                      />
                    </NavLink>
                  </li>
                  <li>
                  <a href="/admin-transactions">
                      <img className="img-fluid m-0" src={"assets/images/list.png"} />
                    </a>
                  </li>
                 
                  <li>
                    <a href="/nft-list">
                      <img
                        className="img-fluid m-0"
                        src={"assets/images/list22.png"}
                      />
                    </a>
                  </li>
               
                 
                </ul>
              </div>
            </Col>
            <Col lg={11} md={12} sm={12} xs={12}>
            <Row>

          
<Col  className="m-container">
  <Row>
    <Row>
    
    <div className="nft-list-btn-row grid-col">
    <Col>
    <h2 className="heading-nft-list">Transaction List</h2>
      </Col>
<Col >
<a className="nav-btn gradient-btn" href="">
      Export to Exel
    </a>
    <a className="nav-btn gradient-btn" href="">
      Export to CSV
    </a>
</Col>
   
  </div>
    </Row>
    <Row>
      <div className="grid-col">
<Col md="8" className="grid-col col-space">
       
      <Dropdown>
        <Dropdown.Toggle className=" gradient-btn   creater-dash-sec">
          Status
        </Dropdown.Toggle>

        <Dropdown.Menu>
          <Dropdown.Item href="#/action-1" onClick={(e) => {
            setStatus("Auction");
          }}>Auction</Dropdown.Item>
       
       <Dropdown.Item href="#/action-1" onClick={(e) => {
            setStatus("Sold");
          }}>Sold</Dropdown.Item>
          
        
        </Dropdown.Menu>
        
      </Dropdown>



   
     </Col>
      <Col md="4">

            <div className="news-search-box m-0 search-box-position" >
          <InputGroup className="news-input">
            <FormControl
              placeholder="Search....."
              aria-label="Recipient's username"
              aria-describedby="basic-addon2"
              onChange={(e) => {
                setSearch(e.target.value);
              }}
              className=" search-explore"
            />
            <Button
              variant="outline-secondary"
              id="button-addon2"
            >
              <i class="fa fa-search" aria-hidden="true"></i>
            </Button>
          </InputGroup>
        </div>
</Col>
        </div>
    </Row>
    </Row>





</Col>

  </Row>
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
                          <th>Buying Price</th>
                          <th>Creator Address</th>
                          <th>Transaction hash</th>
                          <th>Token</th>
                          <th>Status</th>
                          <th width="20%">Action</th>
                        </tr>
                      </thead>
                      <tbody>
                        {console.log({handleTab})}
                        {handleTab == "active" ? data.filter((item) => item.contentInfo.status == "active" ).map((items, index) => {
                          return (
                            <tr className="for-body-tr" key={index}>
                              <td className="td-break">{index + 1}</td>
                              <td className="td-break">
                                <div
                                  onClick={() => {
                                    single_nft_data(items.contentInfo);
                                  }}
                                >
                                  <img
                                    className="img-fluid"
                                    src={items.nftImage}
                                    width="40px"
                                    alt=""
                                    onError={({ currentTarget }) => {
                                      currentTarget.onerror = null; // prevents looping
                                      currentTarget.src =
                                        "assets/images/img-nft/list-img.png";
                                    }}
                                  />
                                </div>
                              </td>
                              <td className="td-break">{items.nftName}</td>
                              <td className="td-break">{items.total}</td>
                              <td className="td-break">
                                {items.wallet_address.slice(0, 3)}....{" "}
                                {items.wallet_address.slice(-3)}
                              </td>
                              <td className="td-break">
                                <a
                                  className="hash-color"
                                  href={`https://testnet.bscscan.com/tx/${items.hash}`}
                                  target="_blank"
                                >
                                  {`${items.hash?.slice(
                                    0,
                                    3
                                  )}...${items.hash?.slice(-5)}`}
                                </a>
                              </td>
                              <td className="td-break">{items.token}</td>
                              <td className="td-break success-green">
                                {items.status ? "success" : "success"}
                              </td>
                              <td className="td-break">
                                {items.contentInfo.owner == walletAddress ? (
                                  <div className="btn-flex-btn">
                                    <button
                                      className="btn-sell1"
                                      disabled={
                                        items.contentInfo.forsale == "yes"
                                          ? true
                                          : false
                                      }
                                      onClick={() => handleCreateSale(items)}
                                    >
                                      {items.isOwner == "no" ? "Sold" : "Sell"}
                                    </button>
                                    <button
                                      className="btn-sell1 "
                                      disabled={
                                        items.contentInfo.forsale == "no"
                                          ? true
                                          : false
                                      }
                                      onClick={() =>
                                        handleWithdrawSale(items.contentInfo)
                                      }
                                    >
                                      Cancel
                                    </button>
                                    <button
                                      className="btn-sell1"
                                      disabled={
                                        items.contentInfo.forsale == "yes" ||
                                        items.contentInfo.status == "auction"
                                          ? true
                                          : false
                                      }
                                      onClick={() =>
                                        handleStartAuction(items.contentInfo)
                                      }
                                    >
                                      Auction
                                    </button>
                                  </div>
                                ) : (
                                  <button className="btn-sell1" disabled>
                                    Sold
                                  </button>
                                )}
                              </td>
                            </tr>
                          );
                        }): handleTab == "sold" ? data.map((items, index) => {
                          return (
                            <tr className="for-body-tr" key={index}>
                              <td className="td-break">{index + 1}</td>
                              <td className="td-break">
                                <div
                                  onClick={() => {
                                    single_nft_data(items.contentInfo);
                                  }}
                                >
                                  <img
                                    className="img-fluid"
                                    src={items.nftImage}
                                    width="40px"
                                    alt=""
                                    onError={({ currentTarget }) => {
                                      currentTarget.onerror = null; // prevents looping
                                      currentTarget.src =
                                        "assets/images/img-nft/list-img.png";
                                    }}
                                  />
                                </div>
                              </td>
                              <td className="td-break">{items.nftName}</td>
                              <td className="td-break">{items.total}</td>
                              <td className="td-break">
                                {items.wallet_address.slice(0, 3)}....{" "}
                                {items.wallet_address.slice(-3)}
                              </td>
                              <td className="td-break">
                                <a
                                  className="hash-color"
                                  href={`https://testnet.bscscan.com/tx/${items.hash}`}
                                  target="_blank"
                                >
                                  {`${items.hash?.slice(
                                    0,
                                    3
                                  )}...${items.hash?.slice(-5)}`}
                                </a>
                              </td>
                              <td className="td-break">{items.token}</td>
                              <td className="td-break success-green">
                                {items.status ? "success" : "success"}
                              </td>
                              <td className="td-break">
                                {items.contentInfo.owner == walletAddress ? (
                                  <div className="btn-flex-btn">
                                    <button
                                      className="btn-sell1"
                                      disabled={
                                        items.contentInfo.forsale == "yes"
                                          ? true
                                          : false
                                      }
                                      onClick={() => handleCreateSale(items)}
                                    >
                                      {items.isOwner == "no" ? "Sold" : "Sell"}
                                    </button>
                                    <button
                                      className="btn-sell1 "
                                      disabled={
                                        items.contentInfo.forsale == "no"
                                          ? true
                                          : false
                                      }
                                      onClick={() =>
                                        handleWithdrawSale(items.contentInfo)
                                      }
                                    >
                                      Cancel
                                    </button>
                                    <button
                                      className="btn-sell1"
                                      disabled={
                                        items.contentInfo.forsale == "yes" ||
                                        items.contentInfo.status == "auction"
                                          ? true
                                          : false
                                      }
                                      onClick={() =>
                                        handleStartAuction(items.contentInfo)
                                      }
                                    >
                                      Auction
                                    </button>
                                  </div>
                                ) : (
                                  <button className="btn-sell1" disabled>
                                    Sold
                                  </button>
                                )}
                              </td>
                            </tr>
                          );
                        }):data.map((items, index) => {
                          return (
                            <tr className="for-body-tr" key={index}>
                              <td className="td-break">{index + 1}</td>
                              <td className="td-break">
                                <div
                                  onClick={() => {
                                    single_nft_data(items.contentInfo);
                                  }}
                                >
                                  <img
                                    className="img-fluid"
                                    src={items.nftImage}
                                    width="40px"
                                    alt=""
                                    onError={({ currentTarget }) => {
                                      currentTarget.onerror = null; // prevents looping
                                      currentTarget.src =
                                        "assets/images/img-nft/list-img.png";
                                    }}
                                  />
                                </div>
                              </td>
                              <td className="td-break">{items.nftName}</td>
                              <td className="td-break">{items.total}</td>
                              <td className="td-break">
                                {items.wallet_address.slice(0, 3)}....{" "}
                                {items.wallet_address.slice(-3)}
                              </td>
                              <td className="td-break">
                                <a
                                  className="hash-color"
                                  href={`https://testnet.bscscan.com/tx/${items.hash}`}
                                  target="_blank"
                                >
                                  {`${items.hash?.slice(
                                    0,
                                    3
                                  )}...${items.hash?.slice(-5)}`}
                                </a>
                              </td>
                              <td className="td-break">{items.token}</td>
                              <td className="td-break success-green">
                                {items.status ? "success" : "success"}
                              </td>
                              <td className="td-break">
                              
                                   
                              </td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                    <Modal
                      show={show}
                      className="modal-comming-soon bid-modal transaction-page-modal"
                      backdrop="static"
                      keyboard={false}
                      onHide={handleClose}
                      centered
                    >
                      <Modal.Header
                        closeButton
                        className="border-none p-0"
                        style={{ zIndex: "10000000" }}
                      >
                        <h3 className="modal-header-h3">Create a Sell</h3>
                      </Modal.Header>
                      <Modal.Body className="modal-background">
                        <div class="bid-modal-box">
                          <Form>
                            <Form.Group className="mb-3">
                              <Form.Label>Min Price (in jewellery)</Form.Label>
                              <Form.Control
                                type="text"
                                placeholder="min price"
                                name="minPrice"
                                onChange={(e) => handleMinPrice(e)}
                                value={minPrice}
                                className="input-box-auction"
                              />
                            </Form.Group>
                          </Form>

                          <Form>
                            <Form.Group className="mb-3 d-none">
                              <Form.Label>Platform Fee(%)</Form.Label>
                              <Form.Control
                                type="text"
                                placeholder="Platform Fee"
                                name="minPrice"
                                value="15"
                                readOnly
                                className="input-box-auction"
                              />
                            </Form.Group>
                          </Form>

                          <Form>
                            <Form.Group className="mb-3">
                              <Form.Label>Royalty(%)</Form.Label>
                              <Form.Control
                                type="text"
                                placeholder="min price"
                                name="minPrice"
                                value="2"
                                readOnly
                                className="input-box-auction"
                              />
                            </Form.Group>
                          </Form>

                          <Form>
                            <Form.Group className="mb-3">
                              <Form.Label>You get</Form.Label>
                              <Form.Control
                                type="text"
                                placeholder="min price"
                                name="minPrice"
                                value={total}
                                className="input-box-auction"
                              />
                            </Form.Group>
                          </Form>

                          <div class="btn-sell-container">
                            <a
                              href="#"
                              className="blue-btn"
                              onClick={() => {
                                if (!isLoading) {
                                  submitSale();
                                }
                              }}
                              disabled={isLoading}
                              style={{
                                cursor: isLoading ? "no-drop" : "pointer",
                              }}
                            >
                              {isLoading ? "Processing" : "Submit"}
                            </a>

                            <a href="" className="border-btn">
                              Cancel
                            </a>
                          </div>
                        </div>
                      </Modal.Body>
                    </Modal>

                    <Modal
                      show={showAuction}
                      className="modal-comming-soon bid-modal transaction-page-modal"
                      backdrop="static"
                      keyboard={false}
                      onHide={() => setShowAuction(false)}
                      centered
                    >
                      <Modal.Header
                        closeButton
                        className="border-none p-0"
                        style={{ zIndex: "10000000" }}
                      ></Modal.Header>
                      <Modal.Body className="modal-background">
                        <div class="bid-modal-box">
                          <h3>Create an Auction</h3>
                          <p className="bid-modal-box-p">
                            {" "}
                            you will not be able to edit the price, start and
                            end date once auction is created.
                          </p>

                          <p className="bid-modal-box-p">
                            You should have bnb for gas fee in the wallet
                          </p>

                          <Form>
                            <Form.Group className="mb-3">
                              <Form.Label>Min Price (in JWL)</Form.Label>
                              <Form.Control
                                type="text"
                                placeholder="min price"
                                name="minPrice"
                                onChange={handleAuctionInput}
                                value={auctionData.minPrice}
                                className="input-box-auction"
                              />
                            </Form.Group>

                            <Form.Group className="mb-3">
                              <Form.Label>Start Time</Form.Label>
                              <Form.Control
                                type="date"
                                placeholder="start time"
                                name="startTime"
                                onChange={handleAuctionInput}
                                value={auctionData.startTime}
                                className="input-box-auction"
                              />
                            </Form.Group>

                            <Form.Group className="mb-3">
                              <Form.Label>End Time</Form.Label>
                              <Form.Control
                                type="date"
                                placeholder="end date"
                                name="endTime"
                                onChange={handleAuctionInput}
                                value={auctionData.endTime}
                                className="input-box-auction"
                              />
                            </Form.Group>
                          </Form>

                          <div class="btn-sell-container">
                            <button
                              className="blue-btn"
                              onClick={() => {
                                if (!isLoading) {
                                  handleAuction();
                                }
                              }}
                              disabled={isLoading}
                              style={{
                                cursor: isLoading ? "no-drop" : "pointer",
                              }}
                            >
                              {buttonMessage ? buttonMessage : "Start Auction"}
                            </button>

                            <a href="" className="border-btn">
                              Cancel
                            </a>
                          </div>
                        </div>
                      </Modal.Body>
                    </Modal>

                    <Modal
                      size="lg"
                      aria-labelledby="contained-modal-title-vcenter"
                      centered
                      className="modal-comming-soon below-18-popup"
                      backdrop="static"
                      keyboard={false}
                      show={showSale}
                      onHide={() => setShowSale(false)}
                    >
                      <Modal.Header className="border-none p-0"></Modal.Header>
                      <Modal.Body className="outer-age-box">
                        <div className="outer-div">
                          Are You sure you want to withdraw your Sale.
                        </div>
                        <div>
                          <a
                            className="blue-btn"
                            onClick={() => submitWithdrawSale()}
                            disabled={isLoading}
                          >
                            {" "}
                            {isLoading ? "Processing" : "Submit"}
                          </a>
                          <a
                            className="btn-text-color"
                            onClick={() => setShowSale(false)}
                          >
                            Cancel
                          </a>
                        </div>
                      </Modal.Body>
                    </Modal>
                  </div>
                </div>
              </Col>
            </Row>
          </Container>
        </div>
            </Col>
            </Row>
          </Container>
        </section>
        <div>
        
        </div>
      
      </div>
    </Layout>
  );
}

export default Transactions;
