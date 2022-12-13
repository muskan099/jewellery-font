import React, { useEffect, useState, useRef } from "react";
import Accordion from "react-bootstrap/Accordion";
import ProgressBar from "react-bootstrap/ProgressBar";
import { Row, Col, Container, FormControl, InputGroup, Button, Form } from "react-bootstrap";
import Layout from "../Components/Layout";
import { useDispatch, useSelector } from "react-redux";
import { getNftSaga } from "../store/reducers/nftReducer";
import { Link, useNavigate } from "react-router-dom"
import axiosMain from "../http/axios/axios_main";
import ReactPaginate from "react-paginate";
const jQuery = window.jQuery;
function enableSlider($, changeStateFn) {

  $("#slider-range").slider({
    range: true,
    min: 0,
    max: 3000000,
    values: [0, 3000000],
    slide: function (event, ui) {
      changeStateFn((p) => ({
        ...p,
        startPrice: Number(ui.values[0]),
        endPrice: Number(ui.values[1]),
      }));
      $("#amount").val("Jewellery" + ui.values[0] + " - Jewellery" + ui.values[1]);
    },
  });
  $("#amount").val(
    "Jewellery" +
    $("#slider-range").slider("values", 0) +
    " - Jewellery" +
    $("#slider-range").slider("values", 1)
  );
}
const Marketplace = () => {

  const { nft, isLoading, totalNfts } = useSelector((state) => state.nft);
  const [currentPage, setCurrentPage] = useState(1);
  const [category, setCategory] = useState("")
  const JwlPrice = 10;
  const [RecentlyAdded, setRecentlyAdded] = useState(false);
  const [paginationData, setPaginationData] = useState({
    skip: 0,
    limit: 60,
    pages: [],
  });

  const [filterSearch, setFilterSearch] = useState({
    A_TO_Z: false,
    status: "",
    price: "",
    letest: false,
    startPrice: 0,
    typeCategory: {
      Ring: false,
      Necklace: false,
      Earings: false,
      Bangel: false,
      Chain: false

    },
    endPrice: 100000000,
  });
  const { startPrice, endPrice, A_TO_Z, status, price, letest, typeCategory } = filterSearch;
  const dispatch = useDispatch();
  const navigate = useNavigate()
  const inputRangeRef = useRef(null);
  const [meta, setMeta] = useState("");

  const { isAuthenticated, walletAddress } = useSelector(
    (state) => state.auth
  );
  useEffect(() => {
    enableSlider(jQuery, setFilterSearch);
  }, []);
  useEffect(() => {
    window.scrollTo(0, 0);
    getData(
      currentPage,
      paginationData.limit,
      paginationData.skip,
      RecentlyAdded,
      startPrice,
      endPrice,
      A_TO_Z,
      status,
      price,
      letest,
      meta,
      typeCategory
    );
  }, [
    RecentlyAdded,
    startPrice,
    endPrice,
    A_TO_Z,
    status,
    price,
    letest,
    currentPage,
    paginationData.limit,
    meta,
    typeCategory
  ], []);
  useEffect(() => {
    setPaginationData((p) => ({
      ...p,
      pages: Array.from(
        { length: Math.ceil(totalNfts / p.limit) },
        (_, i) => i + 1
      ),
    }));
  }, [nft, paginationData.limit]);
  const single_nft_data = (item) => {
    navigate("/nft-detail", { state: { id: item._id } })
  }
  const getData = (
    page,
    limit = 25,
    skip = 0,
    search_tag,
    startPrice,
    endPrice,
    A_TO_Z,
    status,
    price,
    letest,

  ) => {
    let data = {
      page: page,
      skip,
      limit: limit,
      search_tag: meta,
      startPrice,
      endPrice,
      A_TO_Z,
      status,
      price,
      letest,
      typeCategory,
      category: category,
    };
    dispatch(getNftSaga(data));
  };


  const handleSearch = async (e) => {
    let value = e.target.value;
    if (value) {
      setMeta(value);
    }
  };

  const handleTypeCategory = (e) => {
    let value = e.target.value;
    if (value === "Ring") {
      setCategory("Ring");
      setFilterSearch((prev) => ({
        ...prev,
        A_TO_Z: false,
        letest: false,
        price: "",
        status: "",
        typeCategory: {
          Ring: true,
          Necklace: false,
          Earings: false,
          Bangel: false,
          Chain: false
        }
      }));
    } else if (value === "Necklace") {
      setCategory("Necklace");
      setFilterSearch((prev) => ({
        ...prev,
        A_TO_Z: false,
        letest: false,
        price: "",
        status: "",
        typeCategory: {
          Ring: false,
          Necklace: true,
          Earings: false,
          Bangel: false,
          Chain: false
        }
      }));
    } else if (value === "Earings") {
      setCategory("Earings");
      setFilterSearch((prev) => ({
        ...prev,
        A_TO_Z: false,
        letest: false,
        price: "",
        status: "",
        typeCategory: {
          Ring: false,
          Necklace: false,
          Earings: true,
          Bangel: false,
          Chain: false
        }

      }));
    } else if (value === "Bangel") {
      setCategory("Bangel");
      setFilterSearch((prev) => ({
        ...prev,
        A_TO_Z: false,
        letest: false,
        price: "",
        status: "",
        typeCategory: {
          Ring: false,
          Necklace: false,
          Earings: false,
          Bangel: true,
          Chain: false
        }

      }));
    } else if (value === "Chain") {
      setCategory("Chain");
      setFilterSearch((prev) => ({
        ...prev,
        A_TO_Z: false,
        letest: false,
        price: "",
        status: "",
        typeCategory: {
          Ring: false,
          Necklace: false,
          Earings: false,
          Bangel: false,
          Chain: true
        }

      }));
    }
  }
  const handleLikeFilter = (e) => {
    let value = e.target.value;
    if (value === "A_TO_Z") {
      setFilterSearch((prev) => ({
        ...prev,
        A_TO_Z: true,
        letest: false,
        price: "",
        status: "",

      }));
    } else if (value === "letest") {
      setFilterSearch((prev) => ({
        ...prev,
        A_TO_Z: false,
        letest: true,
        price: "",
        status: "",
      }));
    } else if (value === "Auction") {
      setFilterSearch((prev) => ({
        ...prev,
        A_TO_Z: false,
        letest: true,
        price: "",
        status: "auction",
      }));
    } else {
      setFilterSearch((prev) => ({
        ...prev,
        A_TO_Z: false,
        letest: false,
        price: value,
        status: "",
      }));
    }
  };
  const handlePageClick = (data) => {
    const pageClicked = data.selected + 1;

    setCurrentPage(pageClicked);
  };
  return (
    <>
      <Layout>
        <section className="marketplace-list-sec">
          <Container>
            <Row>
              <Col>
                <div className="heading-market">
                  <Row className="justify-content-between">
                    <Col md="6" sm="6">
                      <h2 className="market-head">
                        <a>
                          <i className="fa fa-arrow-left"></i>
                        </a>
                        Marketplace
                      </h2>
                    </Col>
                    <Col md="4" sm="6">
                      <div className="news-search-box m-0">
                        <InputGroup className="news-input">
                          <FormControl
                            placeholder="Search....."
                            aria-label="Recipient's username"
                            aria-describedby="basic-addon2"
                            onKeyUp={(e) => handleSearch(e)}
                            className=" search-explore"
                          />
                          <Button
                            variant="outline-secondary"
                            id="button-addon2"
                          >
                            <i className="fa fa-search" aria-hidden="true"></i>
                          </Button>
                        </InputGroup>
                      </div>
                    </Col>
                  </Row>
                </div>
              </Col>
            </Row>
            {/* <Row className="justify-content-between grid-display">
                  <Col md={3} sm={6} xs={12}>
                    <h3 className="heading-main mb-0">
                      <a href="/">
                        <div className="backward-arrow"></div>
                      </a>{" "}
                      Explore
                    </h3>
                  </Col>
                  <Col lg={5} className="m-0">
                    
                        
                         <InputGroup className="mb-3 " >
                            <Form.Control
                              placeholder="Search....."
                              aria-label="Recipient's username"
                              aria-describedby="basic-addon2"
                              onKeyUp={(e) => handleSearch(e)}
                              className=" search-explore"
                            />
                               {/* <Button>
                          <img
                            className="search-icon"
                            src={"images/icons-Search-Line.png"}
                            alt="logo"
                          />
                        </Button> */}

            {/* </InputGroup>
                      
                  </Col>
                </Row> */}
            {/* <Row className=" pagination-row-explore">
                  <Col
                    className="set-limit"
                    lg={4}
                    md={6}
                    sm={6}
                    xs={12}
                    style={{ display: "flex" }}
                  >
                    <Form.Label style={{ minWidth: "100px" }} className="set-limit">
                      Set Limit
                    </Form.Label>
                    <Form.Select
                    className="form-select-baclground"
                      onChange={(e) => {
                        setPaginationData((p) => ({
                          ...p,
                          limit: e.target.value,
                        }));
                        setCurrentPage(1);
                      }}
                    >
                        <option value="25">25</option>
                      <option value="50">50</option>
                      <option value="100">100</option>
                    </Form.Select>
                  </Col>
                  </Row> */}
            <Row>
              <Col lg={3} md={4}>
                <div className=" new-changes-filter">
                  <div>
                    <Accordion defaultActiveKey="0" className="">
                      <Accordion.Item eventKey="0">
                        <Accordion.Header className="sidebar_names">
                          Sort
                        </Accordion.Header>
                        <Accordion.Body>
                          <div className="radio">
                            <label>
                              <input type="radio" name="o1"
                                value={"high_to_low"}
                                onChange={handleLikeFilter}></input>
                              <span className="cr">
                                <i className="cr-icon fa fa-circle"></i>
                              </span>
                              Price: High to Low
                            </label>
                          </div>
                          <div className="radio">
                            <label>
                              <input type="radio"
                                name="o1"
                                value={"low_to_high"}
                                onChange={handleLikeFilter}></input>
                              <span className="cr">
                                <i className="cr-icon fa fa-circle"></i>
                              </span>
                              Price: Low to High
                            </label>
                          </div>
                          <div className="radio">
                            <label>
                              <input type="radio"
                                name="o1"
                                value={"A_TO_Z"}
                                onChange={handleLikeFilter}></input>
                              <span className="cr">
                                <i className="cr-icon fa fa-circle"></i>
                              </span>
                              A To Z
                            </label>
                          </div>
                          <div className="radio">
                            <label>
                              <input type="radio"
                                name="o1"
                                value={"letest"}
                                onChange={handleLikeFilter}></input>
                              <span className="cr">
                                <i className="cr-icon fa fa-circle"></i>
                              </span>
                              Latest
                            </label>
                          </div>
                        </Accordion.Body>
                      </Accordion.Item>
                      <div className="status">
                        <label className="sidebar_names sidebar-names-border">Price</label>
                        <div className="slider-box">
                          <div id="slider-range" className="slider"></div>
                          <p>
                            <input
                              type="text"
                              id="amount"
                              onChange={(e) => console.log(e.target.value)}
                              ref={inputRangeRef}
                            ></input>
                          </p>
                        </div>
                      </div>

                      <Accordion.Item eventKey="5" className="status">
                        <Accordion.Header className="sidebar_names">
                          Categories
                        </Accordion.Header>
                        <Accordion.Body>
                          <div>
                            <div className="radio">
                              <label>
                                <input checked={filterSearch.typeCategory.Ring} name="o1" type="radio"
                                  value="Ring"

                                  onChange={handleTypeCategory}></input>
                                <span className="cr">
                                  <i className="cr-icon fa fa-check"></i>
                                </span>
                                Ring
                              </label>
                            </div>



                          </div>
                          <div>
                            <div className="radio">
                              <label>
                                <input checked={filterSearch.typeCategory.Necklace} name="o1" type="radio"
                                  value="Necklace"

                                  onChange={handleTypeCategory}></input>
                                <span className="cr">
                                  <i className="cr-icon fa fa-check"></i>
                                </span>
                                Necklace
                              </label>
                            </div>



                          </div>
                          <div>
                            <div className="radio">
                              <label>
                                <input checked={filterSearch.typeCategory.Earings} name="o1" type="radio"
                                  value="Earings"

                                  onChange={handleTypeCategory}></input>
                                <span className="cr">
                                  <i className="cr-icon fa fa-check"></i>
                                </span>
                                Earings
                              </label>
                            </div>



                          </div>

                          <div>
                            <div className="radio">
                              <label>
                                <input checked={filterSearch.typeCategory.Bangel} name="o1" type="radio"
                                  value="Bangel"

                                  onChange={handleTypeCategory}></input>
                                <span className="cr">
                                  <i className="cr-icon fa fa-check"></i>
                                </span>
                                Bangel
                              </label>
                            </div>



                          </div>
                          <div>
                            <div className="radio">
                              <label>
                                <input checked={filterSearch.typeCategory.Chain} name="o1" type="radio"
                                  value="Chain"

                                  onChange={handleTypeCategory}></input>
                                <span className="cr">
                                  <i className="cr-icon fa fa-check"></i>
                                </span>
                                Chain
                              </label>
                            </div>



                          </div>
                        </Accordion.Body>
                      </Accordion.Item>



                      <Accordion.Item eventKey="3" className="status">
                        <Accordion.Header className="sidebar_names">
                          Artist
                        </Accordion.Header>
                        <Accordion.Body>
                          <div>
                            <div className="checkbox">
                              <label>
                                <input type="checkbox" value=""></input>
                                <span className="cr">
                                  <i className="cr-icon fa fa-check"></i>
                                </span>
                                Quest
                              </label>
                            </div>


                          </div>
                        </Accordion.Body>
                      </Accordion.Item>
                      <Accordion.Item eventKey="4" className="status">
                        <Accordion.Header className="sidebar_names">
                          Chain
                        </Accordion.Header>
                        <Accordion.Body>
                          <div>
                            <div className="checkbox">
                              <label>
                                <input type="checkbox" value="" checked></input>
                                <span className="cr">
                                  <i className="cr-icon fa fa-check"></i>
                                </span>
                                BSC
                              </label>
                            </div>




                          </div>
                        </Accordion.Body>
                      </Accordion.Item>



                      <Accordion.Item eventKey="1" className="status">
                        <Accordion.Header className="sidebar_names">
                          Status
                        </Accordion.Header>
                        <Accordion.Body>
                          <div>
                            <div className="radio">
                              <label>
                                <input type="radio" name="o1"
                                  value={"Auction"}
                                  onChange={handleLikeFilter}></input>
                                <span className="cr">
                                  <i className="cr-icon fa fa-circle"></i>
                                </span>
                                Auction
                              </label>
                            </div>





                          </div>
                        </Accordion.Body>
                      </Accordion.Item>
                    </Accordion>
                  </div>
                </div>
              </Col>

              <Col lg={9} md={8}>
                <Row >
                  {!isLoading && nft?.length === 0 && (
                    <div className="text-center">No Record Found</div>
                  )}
                  {!isLoading && nft?.length > 0
                    ? nft.map((item, index) => (
                      <Col lg={4} md={6} key={index}>
                        {/* <Link to="/nft-detail"> */}
                        <div className="product-list-box" onClick={() => {
                          single_nft_data(item)
                        }}>
                          <img src={`https://jewellery.donative.in/NFTImages/${item.images}`} className="img-fluid img-main-box" onError={({ currentTarget }) => {
                            currentTarget.onerror = null; // prevents looping
                            currentTarget.src = "assets/images/img-nft/list-img.png";
                          }} />

                          <div>
                            <h5> </h5>
                            <p>{item.name}</p>
                            <div className="d-flex justify-content-between">
                              {/* <h6>{item}</h6> */}
                              <h6>Price: {(item?.price).toFixed(2)} JWL (${item.price/JwlPrice})</h6>
                              <h6>{item.status}</h6>
                            </div>
                            {/* <div className="d-flex justify-content-between">
                                <p>Floor Price </p>
                                <p className="red-text"><span>+1.6%</span></p>
                              </div> */}
                          </div>
                        </div>
                        {/* </Link> */}
                      </Col>
                    )) : ""}



                </Row>
              </Col>
              <div className="pagination-new-exploror ">
                <Col className="mx-auto">
                  <ReactPaginate
                    previousLabel={"prev"}
                    nextLabel={"next"}
                    breakLabel={"..."}
                    pageCount={totalNfts / 25}
                    marginPagesDisplayed={2}
                    onPageChange={handlePageClick}
                    containerClassName={"pagination"}
                    pageClassName={"page-item"}
                    pageLinkClassName={"page-link"}
                    previousClassName={"page-item"}
                    previousLinkClassName={"page-link"}
                    nextClassName={"page-item"}
                    nextLinkClassName={"page-link"}
                    breakClassName={"page-item"}
                    breakLinkClassName={"page-link"}
                    pageRangeDisplayed={1}
                  />
                </Col>
              </div>
            </Row>
          </Container>
        </section>
      </Layout>
    </>
  );
};

export default Marketplace;
