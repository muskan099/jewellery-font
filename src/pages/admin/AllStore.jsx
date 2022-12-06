import React, { useEffect, useState } from "react";
import Container from "react-bootstrap/Container";
import {
  Row,
  Col,
  Modal,
  Button,
  Form,
  FormControl,
  InputGroup,
  Dropdown,
  Accordion,
} from "react-bootstrap";
import Table from "react-bootstrap/Table";
import Layout from "../../Components/Layout";
import { useSelector } from "react-redux";
import { toast, useToast } from "react-toastify";
import axiosMain from "../../http/axios/axios_main";
import { axios } from "../../http";
import { CreateReSale, WithdrawSale } from "../../helpers/CreateResale";
import { createNFTAuction } from "../../helpers/AuctionHelper";
import { Transaction } from "../../helpers/Transaction";
import { useLocation } from "react-router";
import { NavLink } from "react-router-dom";
import Pagination from "./Pagination";
import ExportToExcel from "../../Components/UI/ExportToExcel";
import ExportToCSV from "../../Components/UI/ExportToCSV";
function Transactions() {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [saleData, setSaleData] = useState();
  const [id, setId] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const [minPrice, setMinPrice] = useState("");
  const [ANft, setANft] = useState("");
  const [name, setName] = useState(false);
  const [category, setCategory] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("");
  const [price, setPrice] = useState(false);
  const [search, setSearch] = useState("");
  const [nft, setNft] = useState("");
  const [result, setResult] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [status, setStatus] = useState("");
  const [totalCount, setTotalCount] = useState();
  const { isAuthenticated, walletAddress } = useSelector((state) => state.auth);
  const { state } = useLocation("/marketplace");

  console.log(walletAddress, "check");
  const [auctionData, setAuctionData] = useState({
    minPrice: 0,
    startTime: "",
    endTime: "",
    buttonMessage: "",
  });
  const { buttonMessage } = auctionData;

  const [data, setdata] = useState([]);

  const updateNft = async () => {
    const res = axiosMain.post("/UpdateNFT", {
      name: name,
      category: category,
      price: price,
      id: id,
    });
    handleClose();
  };

  const handleName = (e) => {
    let value = e.target.value;
    if (value) {
      setName(value);
    }
  };

  const handleCategory = (e) => {
    let value = e.target.value;
    if (value) {
      setCategory(value);
    }
  };
  const handlePrice = (e) => {
    let value = e.target.value;
    if (value) {
      setPrice(value);
    }
  };
  console.log(isAuthenticated, "isauth");

  const getData = async (currentPage, limit, search) => {

    const res = await axios.post("https://jewellery.donative.in/getAllStore", {
      search_tag: search,
      limit: limit,
      page: currentPage,
      skip: 6,
    });
    console.log(res.data.data.totalRecords.count);
    if (res.data) {
      setdata(res.data.data.list);
      setTotalCount(res.data.data.totalRecords.count);
    }
  };
  console.log(data);
  useEffect(() => {
    getData(currentPage, 6, search);
  }, [search, currentPage]);
  return (
    <Layout>
      <div>
        <section className="artist-main-sec1">
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
                        <img
                          className="img-fluid m-0"
                          src={"assets/images/list.png"}
                        />
                      </a>
                    </li>
                    <li>
                      <a href="/admin-store">
                        <img
                          className="img-fluid m-0"
                          src={"assets/images/list22.png"}
                        />
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
                  <Col className="m-container">
                    <Row>
                      <Row>
                        <div className="nft-list-btn-row grid-col">
                          <h2 className="heading-nft-list transaction-heading1">All Stores</h2>

                          <ExportToExcel
                            className="nav-btn gradient-btn"
                              csvData={data}
                              fileName={"StackList.js"}
                            />
                            <ExportToCSV className="nav-btn gradient-btn" nft={data} />
                        </div>
                      </Row>
                      <Row>
                          <div className="filer-right-box allcategory-filter filter-nft-list">
                            <div className="news-search-box m-0 ">
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
                                  <i
                                    class="fa fa-search"
                                    aria-hidden="true"
                                  ></i>
                                </Button>
                              </InputGroup>
                            </div>
                          </div>
                      </Row>
                    </Row>
                  </Col>
                </Row>
                <div className="transactions-section">
                  <Row>
                    <Col className="mb-top">
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
                                <th>Email</th>
                                <th>Mobile Number</th>

                                <th>Status</th>
                                <th width="20%">Action</th>
                              </tr>
                            </thead>
                            <tbody>
                              {console.log(data)}
                              {data.map((items, index) => {
                                return (
                                  <tr className="for-body-tr">
                                    <td className="td-break">{index + 1}</td>
                                    <td className="td-break">
                                      <img
                                        className="img-fluid"
                                        src={items.StoreImages}
                                        width="40px"
                                        alt=""
                                        onError={({ currentTarget }) => {
                                          currentTarget.onerror = null; // prevents looping
                                          currentTarget.src =
                                            "assets/images/img-nft/list-img.png";
                                        }}
                                      />
                                    </td>
                                    <td className="td-break">
                                      {items.storeName}
                                    </td>
                                    <td className="td-break">
                                      {items.storeEmail}
                                    </td>

                                    <td className="td-break">
                                      {items.mobile_no}
                                    </td>
                                    <td className="td-break success-green">
                                      {items.status ? "success" : "success"}
                                    </td>
                                    <td className="td-break"></td>
                                  </tr>
                                );
                              })}
                            </tbody>
                          </table>
                          {console.log("i am total nft", nft)}
                        </div>
                      </div>
                      <Pagination
                        nftPerPage={6}
                        totalNft={totalCount}
                        nft={data}
                        getData={getData}
                        limit={6}
                      />
                    </Col>
                  </Row>
                </div>
              </Col>
            </Row>
          </Container>
        </section>
      </div>
    </Layout>
  );
}

export default Transactions;
