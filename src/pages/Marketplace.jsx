import React ,  { useEffect ,useState, useRef } from "react";
import Accordion from "react-bootstrap/Accordion";
import ProgressBar from "react-bootstrap/ProgressBar";
import { Row, Col, Container,FormControl,InputGroup,Button,Form } from "react-bootstrap";
import Layout from "../Components/Layout";
import { useDispatch, useSelector } from "react-redux";
import { getNftSaga } from "../store/reducers/nftReducer";
import { Link, useNavigate }  from "react-router-dom"
import axiosMain from "../http/axios/axios_main";
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
      //   console.log({ range: `${ui.values[0]} - ${ui.values[1]}` });
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
  
  const [filterSearch, setFilterSearch] = useState({
    A_TO_Z: false,
    price: "",
    letest: false,
    startPrice: 0,
    typeCategory: {
      Ring: false,
      Necklace:false,
      Earings:false
      
    },
    nftTier: {
      tier1: false,
      tier2: false,
      tier3: false,
    },
    endPrice: 100000000,
  });
  const { startPrice, endPrice, A_TO_Z, price, letest, typeCategory,nftTier } = filterSearch;
  const dispatch = useDispatch();
  const navigate = useNavigate()
  const inputRangeRef = useRef(null);
  const [meta, setMeta] = useState("");
  const { nft, isLoading, totalNfts } = useSelector((state) => state.nft);
  console.log(totalNfts)
  console.log({nft})
  const { isAuthenticated, walletAddress, tier } = useSelector(
    (state) => state.auth
  );
  const single_nft_data =  (item) =>{
    console.log(item, "items");
    navigate("/nft-detail", {state:{id : item._id}})
  }


  const [RecentlyAdded, setRecentlyAdded] = useState(false);
  
 
  
  
  console.log({typeCategory})
  
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
    letest,
   
  ) => {
    // console.log("get nft saga function \n");
    // console.log("nft tier inside getNftSaga \n", nftTier);

    let data = {
    page: page,
      skip,
      limit: limit,
      search_tag: meta,
     startPrice,
      endPrice,
      A_TO_Z,
      price,
      letest,
      tier: tier,
      typeCategory ,
      category :  category,
      nftTier,
    };

    dispatch(getNftSaga(data));
    console.log({ data });
  };
  const [currentPage, setCurrentPage] = useState(1);
  const[category,setCategory] = useState("")
  const [paginationData, setPaginationData] = useState({
    skip: 0,
    limit: 60,
    pages: [],
  });

 
  const handleSearch = async (e) => {
    let value = e.target.value;

    if (value) {
      setMeta(value);
     
    }
  };
  useEffect(() => {
    enableSlider(jQuery, setFilterSearch);
  }, []);
  useEffect(() => {
    window.scrollTo(0, 0);
    // console.log("typeCategory", typeCategory);
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
      letest,
      meta,
      typeCategory
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
    meta,
    typeCategory
  ],[]);
  
  
  const handleTypeCategory = (e) => {
    let value = e.target.value;
    console.log("the value of slider", value)
    if (value === "Ring") {
      setCategory("Ring");
     
      setFilterSearch((prev) => ({
        ...prev,
        A_TO_Z: false,
        letest: false,
        price: "",
         typeCategory:{
          Ring:true,
          Necklace:false,
          Earings:false
        }
        
      }));
    } else  if (value === "Necklace") {
      setCategory("Necklace");
     
      setFilterSearch((prev) => ({
        ...prev,
        A_TO_Z: false,
        letest: false,
        price: "",
        typeCategory:{
          Ring:false,
          Necklace:true,
          Earings:false
          
        }
        
      }));
    } else  if (value === "Earings") {
      setCategory("Earings");
      setFilterSearch((prev) => ({
        ...prev,
        A_TO_Z: false,
        letest: false,
        price: "",
        typeCategory:{
          Ring:false,
          Necklace:false,
          Earings:true
        }
        
      }));
    } 
  }
  console.log(typeCategory ,"typeCategory");
  const handleLikeFilter = (e) => {
    let value = e.target.value;
    console.log("the value of slider", value)
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
              <Col>
                <div className="heading-market">
                  <Row className="justify-content-between">
                    <Col md="6" sm="6">
                      <h2 className="market-head">
                        <a>
                         <i class="fa fa-arrow-left"></i>
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
                            <i class="fa fa-search" aria-hidden="true"></i>
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
                          <div className="status">
                <label className="sidebar_names sidebar-names-border">Price</label>
                <div class="slider-box">
                  <div id="slider-range" class="slider"></div>
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
                                    <input     checked={filterSearch.typeCategory.Ring}name="o1" type="radio"
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
                                    <input     checked={filterSearch.typeCategory.Necklace}name="o1" type="radio"
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
                                    <input     checked={filterSearch.typeCategory.Earings}name="o1" type="radio"
                            value="Earings"
                         
                            onChange={handleTypeCategory}></input>
                                    <span className="cr">
                                      <i className="cr-icon fa fa-check"></i>
                                    </span>
                                    Earings
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
                                    <input type="checkbox" value=""></input>
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
                                <div className="checkbox">
                                  <label>
                                    <input type="checkbox" value=""></input>
                                    <span className="cr">
                                      <i className="cr-icon fa fa-check"></i>
                                    </span>
                                    Auction
                                  </label>
                                </div>
                                <div className="checkbox">
                                  <label>
                                    <input type="checkbox" value=""></input>
                                    <span className="cr">
                                      <i className="cr-icon fa fa-check"></i>
                                    </span>
                                    Sell
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
                       
                  {!isLoading && nft?.length === 0 && (
                    <div className="text-center">No Record Found</div>
                  )}
                  {!isLoading && nft?.length > 0
                    ?nft.map((item,index) => (
                        <Col lg={4} md={6} key={index}>
                          {/* <Link to="/nft-detail"> */}
                          <div class="product-list-box" onClick={()=>{
                            single_nft_data(item)
                          }}>
                            <img src={`https://jewellery.donative.in/NFTImages/${item.images}`} class="img-fluid img-main-box" onError={({ currentTarget }) => {
    currentTarget.onerror = null; // prevents looping
    currentTarget.src="assets/images/img-nft/list-img.png";
  }} />
                          
                            <div>
                              <h5> </h5>
                              <p>{item.name}</p>
                              <div class="d-flex justify-content-between">
                                {/* <h6>{item}</h6> */}
                                <h6>Price:{item.price}JWL</h6>
                                <h6>{item.status == "sold"? "Sold" : "InStock" }</h6>
                              </div>
                              {/* <div class="d-flex justify-content-between">
                                <p>Floor Price </p>
                                <p class="red-text"><span>+1.6%</span></p>
                              </div> */}
                            </div>
                          </div>
                          {/* </Link> */}
                        </Col>
                        ))  : ""}
                      
                        
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
