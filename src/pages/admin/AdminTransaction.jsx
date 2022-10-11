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
import { useNavigate } from "react-router-dom";
import { NavLink } from "react-router-dom";
import Pagination from "./Pagination";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import moment from "moment";
import ExportToExcel from "../../Components/UI/ExportToExcel";
import ExportToCSV from "../../Components/UI/ExportToCSV";
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
  const [isVisible, setIsVisible] = useState(false);
  const [isVisible1, setIsVisible1] = useState(false);
  const [submit, setSubmit] = useState(false);
  const [handleTab, setHandleTab] = useState("");
  const [totalCount, setTotalCount] = useState();
  const [currentPage, setCurrentPage] = useState(1);
  const [startDate, setStartDate] = useState();
  const [current_date, setcurrent_date] = useState(null);
  const [current_date1, setcurrent_date1] = useState(null);

  console.log({ current_date });
  const [endDate, setEndDate] = useState();
  const [searchByDate, setSearchByDate] = useState(false);

  console.log("the current date1", { current_date1 });
  console.log("the current date", { current_date });

  console.log(walletAddress, "check");
  const [auctionData, setAuctionData] = useState({
    minPrice: 0,
    startTime: "",
    endTime: "",
    buttonMessage: "",
  });
  const { buttonMessage } = auctionData;

  const [data, setdata] = useState([]);

  const gettransaction = async (currentPage, limit, status) => {
    const api = await axiosMain.post("/GetAllTransaction", {
      startDate: current_date,
      endDate: current_date1,
      status: status,
      limit: limit,
      page: currentPage,
      skip: 6,
      name: "muskan",
    });

    setdata(api.data.data[0].list);
    setTotalCount(api.data.data[0].totalRecords[0].count);
    console.log(api.data.data[0].list, "req");
  };

  useEffect(() => {
    if (isAuthenticated) {
      gettransaction(currentPage, 6, status);
    }
  }, [status, currentPage, current_date, current_date1]);

  const single_nft_data = (item) => {
    console.log(item, "items");
    navigate("/nft-detail", { state: { id: item._id } });
  };

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
                            <h2 className="heading-nft-list transaction-heading1">
                              Transaction List
                            </h2>
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
                          <div className="outer-multiple-drop">
                            <Dropdown>
                              <Dropdown.Toggle  className=" create-button">
                                Status
                              </Dropdown.Toggle>

                              <Dropdown.Menu>
                                <Dropdown.Item
                                  href="#/action-1"
                                  onClick={(e) => {
                                    setStatus("Auction");
                                  }}
                                >
                                  Auction
                                </Dropdown.Item>

                                <Dropdown.Item
                                  href="#/action-1"
                                  onClick={(e) => {
                                    setStatus("Sold");
                                  }}
                                >
                                  Sold
                                </Dropdown.Item>
                              </Dropdown.Menu>
                            </Dropdown>
                            </div>
                            <div className="news-search-box m-0 ">
                                <InputGroup className="news-input">
                                  <FormControl
                                    placeholder="Start Date....."
                                    aria-label="Recipient's username"
                                    aria-describedby="basic-addon2"
                                    value={current_date}
                                    onClick={() => {
                                      setIsVisible(true);
                                    }}
                                  />
                                  <FormControl
                                    placeholder="End Date....."
                                    aria-label="Recipient's username"
                                    aria-describedby="basic-addon2"
                                    value={current_date1}
                                    onClick={() => {
                                      setIsVisible1(true);
                                      setIsVisible(false);
                                    }}
                                  />
                                  <div
                                    className="nav-btn gradient-btn"
                                    onClick={(e) => {
                                      e.preventDefault();
                                      setSubmit(true);
                                      setIsVisible(false);
                                      setIsVisible1(false);
                                      setcurrent_date(
                                        moment(startDate, "YYYY-MM-DD")
                                          .format()
                                          .slice(0, 10)
                                      );
                                      setcurrent_date1(
                                        moment(endDate, "YYYY-MM-DD")
                                          .format()
                                          .slice(0, 10)
                                      );
                                    }}
                                  >
                                    Search
                                  </div>
                                </InputGroup>
                            </div>
                          
                        </div>
                      </Row>
                      <Col lg={4} md={4} sm={4} xs={4} className="calendar">
                        {isVisible ? (
                          <Calendar
                            value={startDate}
                            onChange={(startDate) => {
                              setStartDate(startDate);

                              setSearchByDate(true);
                            }}
                          />
                        ) : (
                          ""
                        )}
                        {isVisible1 ? (
                          <Calendar
                            value={endDate}
                            onChange={(endDate) => {
                              setIsVisible(false);
                              setEndDate(endDate);
                              {
                                console.log({ isVisible });
                              }
                              setSearchByDate(true);
                            }}
                          />
                        ) : (
                          ""
                        )}
                      </Col>
                    </Row>
                  </Col>
                </Row>
                <div className="transactions-section">
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
                                </tr>
                              </thead>
                              <tbody>
                                {console.log({ handleTab })}
                                {handleTab == "active"
                                  ? data
                                      .filter(
                                        (item) =>
                                          item.contentInfo.status == "active"
                                      )
                                      .map((items, index) => {
                                        return (
                                          <tr
                                            className="for-body-tr"
                                            key={index}
                                          >
                                            <td className="td-break">
                                              {index + 1}
                                            </td>
                                            <td className="td-break">
                                              <div
                                                onClick={() => {
                                                  single_nft_data(
                                                    items.contentInfo
                                                  );
                                                }}
                                              >
                                                <img
                                                  className="img-fluid"
                                                  src={items.nftImage}
                                                  width="40px"
                                                  alt=""
                                                  onError={({
                                                    currentTarget,
                                                  }) => {
                                                    currentTarget.onerror =
                                                      null; // prevents looping
                                                    currentTarget.src =
                                                      "assets/images/img-nft/list-img.png";
                                                  }}
                                                />
                                              </div>
                                            </td>
                                            <td className="td-break">
                                              {items.nftName}
                                            </td>
                                            <td className="td-break">
                                              {items.total}
                                            </td>
                                            <td className="td-break">
                                              {items.wallet_address.slice(0, 3)}
                                              ....{" "}
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
                                            <td className="td-break">
                                              {items.token}
                                            </td>
                                            <td className="td-break success-green">
                                              {items.status
                                                ? "success"
                                                : "success"}
                                            </td>
                                            <td className="td-break">
                                              {items.contentInfo.owner ==
                                              walletAddress ? (
                                                <div className="btn-flex-btn"></div>
                                              ) : (
                                                <button
                                                  className="btn-sell1"
                                                  disabled
                                                >
                                                  Sold
                                                </button>
                                              )}
                                            </td>
                                          </tr>
                                        );
                                      })
                                  : handleTab == "sold"
                                  ? data.map((items, index) => {
                                      return (
                                        <tr className="for-body-tr" key={index}>
                                          <td className="td-break">
                                            {index + 1}
                                          </td>
                                          <td className="td-break">
                                            <div
                                              onClick={() => {
                                                single_nft_data(
                                                  items.contentInfo
                                                );
                                              }}
                                            >
                                              <img
                                                className="img-fluid"
                                                src={items.nftImage}
                                                width="40px"
                                                alt=""
                                                onError={({
                                                  currentTarget,
                                                }) => {
                                                  currentTarget.onerror = null; // prevents looping
                                                  currentTarget.src =
                                                    "assets/images/img-nft/list-img.png";
                                                }}
                                              />
                                            </div>
                                          </td>
                                          <td className="td-break">
                                            {items.nftName}
                                          </td>
                                          <td className="td-break">
                                            {items.total}
                                          </td>
                                          <td className="td-break">
                                            {items.wallet_address.slice(0, 3)}
                                            ....{" "}
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
                                          <td className="td-break">
                                            {items.token}
                                          </td>
                                          <td className="td-break success-green">
                                            {items.status
                                              ? "success"
                                              : "success"}
                                          </td>
                                          <td className="td-break">
                                            {items.contentInfo.owner ==
                                            walletAddress ? (
                                              <div className="btn-flex-btn"></div>
                                            ) : (
                                              <button
                                                className="btn-sell1"
                                                disabled
                                              >
                                                Sold
                                              </button>
                                            )}
                                          </td>
                                        </tr>
                                      );
                                    })
                                  : data.map((items, index) => {
                                      return (
                                        <tr className="for-body-tr" key={index}>
                                          <td className="td-break">
                                            {index + 1}
                                          </td>
                                          <td className="td-break">
                                            <div
                                              onClick={() => {
                                                single_nft_data(
                                                  items.contentInfo
                                                );
                                              }}
                                            >
                                              <img
                                                className="img-fluid"
                                                src={items.nftImage}
                                                width="40px"
                                                alt=""
                                                onError={({
                                                  currentTarget,
                                                }) => {
                                                  currentTarget.onerror = null; // prevents looping
                                                  currentTarget.src =
                                                    "assets/images/img-nft/list-img.png";
                                                }}
                                              />
                                            </div>
                                          </td>
                                          <td className="td-break">
                                            {items.nftName}
                                          </td>
                                          <td className="td-break">
                                            {items.total}
                                          </td>
                                          <td className="td-break">
                                            {items.wallet_address.slice(0, 3)}
                                            ....{" "}
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
                                          <td className="td-break">
                                            {items.token}
                                          </td>
                                          <td className="td-break success-green">
                                            {items.status
                                              ? "success"
                                              : "success"}
                                          </td>
                                        </tr>
                                      );
                                    })}
                              </tbody>
                            </table>
                            
                          </div>
                        </div>
                        <Pagination
                              nftPerPage={6}
                              totalNft={totalCount}
                              nft={data}
                              getData={gettransaction}
                              limit={6}
                            />
                      </Col>
                    </Row>
                </div>
              </Col>
            </Row>
          </Container>
        </section>
        <div></div>
      </div>
    </Layout>
  );
}

export default Transactions;
