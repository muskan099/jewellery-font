import React ,  { useEffect ,useState, useRef } from "react";
import Accordion from "react-bootstrap/Accordion";
import ProgressBar from "react-bootstrap/ProgressBar";
import { Row, Col, Container } from "react-bootstrap";
import Layout from "../Components/Layout";
import { useDispatch, useSelector } from "react-redux";
import { getNftSaga } from "../store/reducers/nftReducer";

const Marketplace = () => {
  const dispatch = useDispatch();
  const inputRangeRef = useRef(null);
  const { nft, isLoading, totalNfts, tier } = useSelector((state) => state.nft);
  console.log({nft})
  const [RecentlyAdded, setRecentlyAdded] = useState(false);
  const [filterSearch, setFilterSearch] = useState({
    A_TO_Z: false,
    price: "",
    letest: false,
    startPrice: 0,
    nftTier: {
      tier1: false,
      tier2: false,
      tier3: false,
    },
    endPrice: 100000000,
  });
  const jQuery = window.jQuery;
  const { startPrice, endPrice, A_TO_Z, price, letest, nftTier } = filterSearch;
  const getData = (
    page,
    limit = 25,
    skip = 0,
    tier,
   search_tag,
    startPrice,
    endPrice,
    A_TO_Z,
    price,
    letest
  ) => {
    // console.log("get nft saga function \n");
    // console.log("nft tier inside getNftSaga \n", nftTier);

    let data = {
    page: page,
      skip,
      limit: limit,
      search_tag: search_tag,
     startPrice,
      endPrice,
      A_TO_Z,
      price,
      letest,
      nftTier,
    };

    dispatch(getNftSaga(data));
    console.log({ data });
  };
  const [currentPage, setCurrentPage] = useState(1);
  const [paginationData, setPaginationData] = useState({
    skip: 0,
    limit: 60,
    pages: [],
  });

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
        //   console.log({ range: `${ui.values[0]} - ${ui.values[1]}` });
        $("#amount").val("Taboo " + ui.values[0] + " - Taboo " + ui.values[1]);
      },
    });
    $("#amount").val(
      "Taboo " +
        $("#slider-range").slider("values", 0) +
        " - Taboo " +
        $("#slider-range").slider("values", 1)
    );
  }
  useEffect(() => {
    enableSlider(jQuery, setFilterSearch);
  }, []);
  useEffect(() => {
    window.scrollTo(0, 0);
    // console.log("category", category);
    getData(
      currentPage,
      paginationData.limit,
      paginationData.skip,
     tier,
      RecentlyAdded,
      startPrice,
      endPrice,
      A_TO_Z,
      price,
      letest
    );
  }, [
    
  
    RecentlyAdded,
    startPrice,
    endPrice,
    A_TO_Z,
    price,
    letest,
    nftTier,
    currentPage,
    paginationData.limit,
  ]);
  const handleLikeFilter = (e) => {
    let value = e.target.value;
    if (value === "A_TO_Z") {
      setFilterSearch((prev) => ({
        ...prev,
        A_TO_Z: true,
        letest: false,
        price: "",
      }));
    } else if (value === "letest") {
      setFilterSearch((prev) => ({
        ...prev,
        A_TO_Z: false,
        letest: true,
        price: "",
      }));
    } else {
      setFilterSearch((prev) => ({
        ...prev,
        A_TO_Z: false,
        letest: false,
        price: value,
      }));
    }
  };
  return (
    <>
      <Layout>
         <section className="marketplace-list-sec">
            <Container>
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
                                  <input type="radio"     name="o1"
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
                                  <input type="radio"   type="radio"
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
                                  <input type="radio"  type="radio"
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
                                  <input  type="radio"
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
                          <Accordion.Item eventKey="1" className="status">
                            <Accordion.Header className="sidebar_names">
                              Status
                            </Accordion.Header>
                            <Accordion.Body>
                            <div>
                                <div className="checkbox">
                                  <label>
                                    <input type="checkbox" value=""></input>
                                    <span className="cr">
                                      <i className="cr-icon fa fa-check"></i>
                                    </span>
                                    Artist 1
                                  </label>
                                </div>
                                <div className="checkbox">
                                  <label>
                                    <input type="checkbox" value=""></input>
                                    <span className="cr">
                                      <i className="cr-icon fa fa-check"></i>
                                    </span>
                                    Artist 2
                                  </label>
                                </div>
                                <div className="checkbox">
                                  <label>
                                    <input type="checkbox" value=""></input>
                                    <span className="cr">
                                      <i className="cr-icon fa fa-check"></i>
                                    </span>
                                    Artist 3
                                  </label>
                                </div>
                                <div className="checkbox">
                                  <label>
                                    <input type="checkbox" value=""></input>
                                    <span className="cr">
                                      <i className="cr-icon fa fa-check"></i>
                                    </span>
                                    Artist 4
                                  </label>
                                </div>
                                <div className="checkbox">
                                  <label>
                                    <input type="checkbox" value=""></input>
                                    <span className="cr">
                                      <i className="cr-icon fa fa-check"></i>
                                    </span>
                                    Artist 5
                                  </label>
                                </div>

                              </div>
                            </Accordion.Body>
                          </Accordion.Item>
                          <Accordion.Item eventKey="2" className="status">
                            <Accordion.Header className="sidebar_names">
                              Price
                            </Accordion.Header>
                            <Accordion.Body>
                              <div class="slider-box">
                                
                                  
                                  <div id="price-range" class="slider">
                                  <input  type="text"
                      id="amount"
                      onChange={(e) => console.log(e.target.value)}
                      ref={inputRangeRef} ></input>
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
                                    Artist 1
                                  </label>
                                </div>
                                <div className="checkbox">
                                  <label>
                                    <input type="checkbox" value=""></input>
                                    <span className="cr">
                                      <i className="cr-icon fa fa-check"></i>
                                    </span>
                                    Artist 2
                                  </label>
                                </div>
                                <div className="checkbox">
                                  <label>
                                    <input type="checkbox" value=""></input>
                                    <span className="cr">
                                      <i className="cr-icon fa fa-check"></i>
                                    </span>
                                    Artist 3
                                  </label>
                                </div>
                                <div className="checkbox">
                                  <label>
                                    <input type="checkbox" value=""></input>
                                    <span className="cr">
                                      <i className="cr-icon fa fa-check"></i>
                                    </span>
                                    Artist 4
                                  </label>
                                </div>
                                <div className="checkbox">
                                  <label>
                                    <input type="checkbox" value=""></input>
                                    <span className="cr">
                                      <i className="cr-icon fa fa-check"></i>
                                    </span>
                                    Artist 5
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
                                    <input type="checkbox" value=""></input>
                                    <span className="cr">
                                      <i className="cr-icon fa fa-check"></i>
                                    </span>
                                    Artist 1
                                  </label>
                                </div>
                                <div className="checkbox">
                                  <label>
                                    <input type="checkbox" value=""></input>
                                    <span className="cr">
                                      <i className="cr-icon fa fa-check"></i>
                                    </span>
                                    Artist 2
                                  </label>
                                </div>
                                <div className="checkbox">
                                  <label>
                                    <input type="checkbox" value=""></input>
                                    <span className="cr">
                                      <i className="cr-icon fa fa-check"></i>
                                    </span>
                                    Artist 3
                                  </label>
                                </div>
                                <div className="checkbox">
                                  <label>
                                    <input type="checkbox" value=""></input>
                                    <span className="cr">
                                      <i className="cr-icon fa fa-check"></i>
                                    </span>
                                    Artist 4
                                  </label>
                                </div>
                                <div className="checkbox">
                                  <label>
                                    <input type="checkbox" value=""></input>
                                    <span className="cr">
                                      <i className="cr-icon fa fa-check"></i>
                                    </span>
                                    Artist 5
                                  </label>
                                </div>

                              </div>
                            </Accordion.Body>
                          </Accordion.Item>
                          <Accordion.Item eventKey="5" className="status">
                            <Accordion.Header className="sidebar_names">
                              Categories
                            </Accordion.Header>
                            <Accordion.Body>
                            <div>
                                <div className="checkbox">
                                  <label>
                                    <input type="checkbox" value=""></input>
                                    <span className="cr">
                                      <i className="cr-icon fa fa-check"></i>
                                    </span>
                                    Artist 1
                                  </label>
                                </div>
                                <div className="checkbox">
                                  <label>
                                    <input type="checkbox" value=""></input>
                                    <span className="cr">
                                      <i className="cr-icon fa fa-check"></i>
                                    </span>
                                    Artist 2
                                  </label>
                                </div>
                                <div className="checkbox">
                                  <label>
                                    <input type="checkbox" value=""></input>
                                    <span className="cr">
                                      <i className="cr-icon fa fa-check"></i>
                                    </span>
                                    Artist 3
                                  </label>
                                </div>
                                <div className="checkbox">
                                  <label>
                                    <input type="checkbox" value=""></input>
                                    <span className="cr">
                                      <i className="cr-icon fa fa-check"></i>
                                    </span>
                                    Artist 4
                                  </label>
                                </div>
                                <div className="checkbox">
                                  <label>
                                    <input type="checkbox" value=""></input>
                                    <span className="cr">
                                      <i className="cr-icon fa fa-check"></i>
                                    </span>
                                    Artist 5
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
                     
                        {console.log("data inside nft is",nft)}
                        {nft.map((item,index) => (
                        <Col lg={4} md={6} key={index}>

                          <div class="product-list-box" >
                            <img src={`http://3.110.179.4:3000/NFTImages/${item.images}`} class="img-fluid" />
                          
                            <div>
                              <h5> </h5>
                              <p>{item.name}</p>
                              <div class="d-flex justify-content-between">
                                <h6>1.5 ETH</h6>
                                <h6>{item.price}</h6>
                              </div>
                              <div class="d-flex justify-content-between">
                                <p>Floor Price </p>
                                <p class="red-text"><span>+1.6%</span></p>
                              </div>
                            </div>
                          </div>
                        </Col>
                        ))}
                      
                        
                    </Row>
                  </Col> 
                </Row>
              </Container>
         </section>
      </Layout>
    </>
  );
};

export default Marketplace;
