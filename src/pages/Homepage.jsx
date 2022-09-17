import React, { useEffect, useState } from "react";
import Header from "../Components/UI/Header";
import { Row, Col, Container, Tab, Tabs, Button } from "react-bootstrap";
import Footer from "../Components/UI/Footer";
import Card from "react-bootstrap/Card";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import CardGroup from "react-bootstrap/CardGroup";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import Layout from "../Components/Layout";
import Slider from "react-slick";
import { toast, ToastContainer } from "react-toastify";
import axiosMain from "../http/axios/axios_main";
import moment from "moment/moment";
import { Link, useNavigate }  from "react-router-dom"
import axios from "axios";
import CountUp from "react-countup";
import Connect from "../helpers/Connect";
import { TabooBalance } from "../helpers/TabooHelper";
import {
  grantWebsiteAccessAction,
  loginSaga,
  logout,
} from "../store/reducers/authReducer";
import { useDispatch, useSelector } from "react-redux";
function Homepage() {

  const [article, setArticle] = useState([]);
  const navigate = useNavigate()
  const trendingslide = {
    centerMode: true,
    centerPadding: "30px",
    slidesToShow: 3,
    slidesToScroll: 1,
    arrows: true,
    dots: false,
    speed: 300,
    infinite: true,
    autoplaySpeed: 5000,
    autoplay: false,
    responsive: [
      {
        breakpoint: 992,
        settings: {
          slidesToShow: 1,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };
  const categorieslide = {
    slidesToShow: 3,
    slidesToScroll: 1,
    arrows: true,
    dots: false,
    speed: 300,
    infinite: true,
    autoplaySpeed: 5000,
    autoplay: false,
    responsive: [
      {
        breakpoint: 992,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };
  const responsive = {
    superLargeDesktop: {
      // the naming can be any, depends on you.
      breakpoint: { max: 4000, min: 3000 },
      items: 5,
    },
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 3,
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 2,
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1,
    },
  };
  const[userData,setUserData] = useState()
  const[artistCount,setArtistCount] = useState()
  const[collectionCount,setCollectionCount] = useState()
  const[totalUserCount,settotalUserCount] = useState()
  const [formError, setFormError] = useState("");
  const [inputdata, setInputdata] = useState({
    email: "",
  });
  const formdata = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setInputdata({ ...inputdata, [name]: value });
  };

  const HandleSubmit = async (e) => {
    let regex = new RegExp("[a-z0-9]+@[a-z]+.[a-z]{2,3}");
    if (!inputdata.email) {
      setFormError("Please enter Email");
    } else if (!regex.test(inputdata.email)) {
      setFormError("please enter  valid email");
    } else {
      setFormError("");
      try {
        const response = await axiosMain.post("/subscribNow", inputdata);

        if (response?.data.status) {
          console.log("true");
          toast.success(response?.data.message);
        } else {
          toast.warning(response?.data.message);
        }
        setInputdata({
          email: "",
        });
      } catch (error) {
        console.log("false");
        toast.error(error.response.message);
        console.log(error);
      }
    }
  };
  const dispatch = useDispatch();
  const[isLoginStart,setIsLoginStart]=useState(false);
  const handleLogin = async () => {

    setIsLoginStart(true)
   let address = await Connect();
console.log({address})
   
   if (address && address.length) {
    let punk = 0;
    // console.log("punks",punk)
    //let tier=punk>0?"3 Tier":"1 Tier"
    let balance = await TabooBalance(address[0]);
    let tier = 0;
    console.log("balance", balance);
 
     dispatch(
       loginSaga({
         address: address[0],
         balance: balance,
         tabooPunk: punk,
         tier: tier,
       })
     );

     setIsLoginStart(false)
   }else{
       handleLogout();
       setIsLoginStart(false)
       toast.warn("Please connect to binance smart chain!")
   }
 };
 const handleLogout = async () => {
  dispatch(logout({}));
};


  const getData = async () => {
    const res = await axiosMain.get("/getAllArtical");
    
    if (res?.data.status) {
      setArticle(res.data.data);
      console.log(res,"article")
    }
  };
const userData1 = async() => {
  const res = await axiosMain.get('/gethomeData') 
  setUserData(res);
  setArtistCount(res.data.data.artistCount)
  setCollectionCount(res.data.data.collectionCount)
  settotalUserCount(res.data.data.totalUserCount)
}
console.log({userData})
console.log({artistCount})
console.log({collectionCount})
console.log({totalUserCount})
  const single_nft_data =  (item) =>{
    console.log(item, "items");
    navigate("/article-detail", {state:{id : item._id}})
  }
  useEffect(() => {
    userData1();
    getData();
  },[]);





  return (
    <>
      <Layout>
        <div className="home-outer-div">
          <section className="banner-home-page">
            <ToastContainer />
            <Container>
              <Row className="banner-margin">
                <Col lg={5} md={6}>
                  <div className="banner-txt">
                    <h2>
                      Discover collect, & sell <span>Extraordinary</span> NFTs{" "}
                    </h2>
                    <p className="banner-content">
                      the leading NFT Marketplace on Ethereum Home to the next
                      generation of digital creators. Discover the best NFT
                      collections.
                    </p>
                    <div className="banner-btn">
                      <a href="/marketplace" className="gradient-btn">
                        Explore
                      </a>
                      <a href="/create-nft" className="border-btn">
                        <span>Create</span>
                      </a>
                    </div>
                    <Row>
                      <Col md={4} sm={4} xs={4}>
                        <div>
                        <CountUp
                            className="banner-analysis-number"
                              end={collectionCount}
                              duration={10}
                              id="plus"
                            />
                         
                          <p className="banner-analysis-quantity">
                            Collections
                          </p>
                        </div>
                      </Col>
                      <Col md={4} sm={4} xs={4}>
                        <div>
                         
                          <CountUp
                            className="banner-analysis-number"
                              end={artistCount}
                              duration={10}
                              id="plus"
                            />
                          <p className="banner-analysis-quantity">Artists</p>
                        </div>
                      </Col>
                      <Col md={4} sm={4} xs={4}>
                        <div>
                        <CountUp
                            className="banner-analysis-number"
                              end={totalUserCount}
                              duration={10}
                              id="plus"
                            />
                         
                          <p className="banner-analysis-quantity">Community</p>
                        </div>
                      </Col>
                    </Row>
                  </div>
                </Col>
                <Col lg={7} md={6}>
                  <div>
                    <img src="assets/images/banner-img.png" class="img-fluid" />
                  </div>
                </Col>
              </Row>
            </Container>
          </section>

          <section className="wallet-conect-logo">
            <Container>
              <Row>
                <Col>
                  <div className="group-logo">
                    <img src="assets\images\metamask-img.png" alt="metamask" onClick={handleLogin}/>
                    <img
                      src="assets\images\trustWallet-img.png"
                      alt="metamask"
                      onClick={handleLogin}
                    />
                    <img
                      src="assets\images\WalletConnect-img.png"
                      alt="metamask"
                      onClick={handleLogin}
                    />
                    
                  </div>
                </Col>
              </Row>
            </Container>
          </section>

          <section className="trending-sec-new">
            <Container>
              <Row>
                <Col>
                  <div>
                    <h2 className="heading-main">Trending NFTs</h2>
                    <Slider {...trendingslide}>
                      <div className="items">
                        <div className="trending-item-box">
                          <img
                            className="product-main-img"
                            src="assets\images\nft-image-1.png"
                            alt="prodiuct"
                          />
                          <div className="product-name-box">
                            <div className="product-name-inner">
                              <img
                                src="assets\images\avatar.png"
                                alt="avatar"
                              />
                              <div>
                                <h5>CryptoPunk 3D #13</h5>
                                <p>3D cryptopunk</p>
                              </div>
                            </div>
                            <img
                              className="eth-icon"
                              src="assets\images\ETH-logo.png"
                              alt="avatar"
                            />
                          </div>
                          <div className="outer-box-price">
                            <div className="inner-price">
                              <h6>9.61 ETH</h6>
                              <p>latest Bid</p>
                            </div>
                            <div className="inner-price">
                              <h6>4.12 ETH</h6>
                              <p>from</p>
                            </div>
                            <div className="inner-price">
                              <h6>$103,025</h6>
                              <p className="red-text">-2.25%</p>
                            </div>
                          </div>

                          <div className="btn-collect">
                            <a href="" className="gradient-btn">
                              Collect Now{" "}
                            </a>
                          </div>
                        </div>
                      </div>
                      <div className="items">
                        <div className="trending-item-box">
                          <img
                            className="product-main-img"
                            src="assets\images\nft-image-1.png"
                            alt="prodiuct"
                          />
                          <div className="product-name-box">
                            <div className="product-name-inner">
                              <img
                                src="assets\images\avatar.png"
                                alt="avatar"
                              />
                              <div>
                                <h5>CryptoPunk 3D #13</h5>
                                <p>3D cryptopunk</p>
                              </div>
                            </div>
                            <img
                              className="eth-icon"
                              src="assets\images\ETH-logo.png"
                              alt="avatar"
                            />
                          </div>
                          <div className="outer-box-price">
                            <div className="inner-price">
                              <h6>9.61 ETH</h6>
                              <p>latest Bid</p>
                            </div>
                            <div className="inner-price">
                              <h6>4.12 ETH</h6>
                              <p>from</p>
                            </div>
                            <div className="inner-price">
                              <h6>$103,025</h6>
                              <p className="green-text">+2.25%</p>
                            </div>
                          </div>
                          <div className="btn-collect">
                            <a href="" className="gradient-btn">
                              Collect Now{" "}
                            </a>
                          </div>
                        </div>
                      </div>
                      <div className="items">
                        <div className="trending-item-box">
                          <img
                            className="product-main-img"
                            src="assets\images\nft-image-1.png"
                            alt="prodiuct"
                          />
                          <div className="product-name-box">
                            <div className="product-name-inner">
                              <img
                                src="assets\images\avatar.png"
                                alt="avatar"
                              />
                              <div>
                                <h5>CryptoPunk 3D #13</h5>
                                <p>3D cryptopunk</p>
                              </div>
                            </div>
                            <img
                              className="eth-icon"
                              src="assets\images\ETH-logo.png"
                              alt="avatar"
                            />
                          </div>
                          <div className="outer-box-price">
                            <div className="inner-price">
                              <h6>9.61 ETH</h6>
                              <p>latest Bid</p>
                            </div>
                            <div className="inner-price">
                              <h6>4.12 ETH</h6>
                              <p>from</p>
                            </div>
                            <div className="inner-price">
                              <h6>$103,025</h6>
                              <p className="red-text">-2.25%</p>
                            </div>
                          </div>
                          <div className="btn-collect">
                            <a href="" className="gradient-btn">
                              Collect Now{" "}
                            </a>
                          </div>
                        </div>
                      </div>
                      <div className="items">
                        <div className="trending-item-box">
                          <img
                            className="product-main-img"
                            src="assets\images\nft-image-1.png"
                            alt="prodiuct"
                          />
                          <div className="product-name-box">
                            <div className="product-name-inner">
                              <img
                                src="assets\images\avatar.png"
                                alt="avatar"
                              />
                              <div>
                                <h5>CryptoPunk 3D #13</h5>
                                <p>3D cryptopunk</p>
                              </div>
                            </div>
                            <img
                              className="eth-icon"
                              src="assets\images\ETH-logo.png"
                              alt="avatar"
                            />
                          </div>
                          <div className="outer-box-price">
                            <div className="inner-price">
                              <h6>9.61 ETH</h6>
                              <p>latest Bid</p>
                            </div>
                            <div className="inner-price">
                              <h6>4.12 ETH</h6>
                              <p>from</p>
                            </div>
                            <div className="inner-price">
                              <h6>$103,025</h6>
                              <p className="red-text">-2.25%</p>
                            </div>
                          </div>
                          <div className="btn-collect">
                            <a href="" className="gradient-btn">
                              Collect Now{" "}
                            </a>
                          </div>
                        </div>
                      </div>
                      <div className="items">
                        <div className="trending-item-box">
                          <img
                            className="product-main-img"
                            src="assets\images\nft-image-1.png"
                            alt="prodiuct"
                          />
                          <div className="product-name-box">
                            <div className="product-name-inner">
                              <img
                                src="assets\images\avatar.png"
                                alt="avatar"
                              />
                              <div>
                                <h5>CryptoPunk 3D #13</h5>
                                <p>3D cryptopunk</p>
                              </div>
                            </div>
                            <img
                              className="eth-icon"
                              src="assets\images\ETH-logo.png"
                              alt="avatar"
                            />
                          </div>
                          <div className="outer-box-price">
                            <div className="inner-price">
                              <h6>9.61 ETH</h6>
                              <p>latest Bid</p>
                            </div>
                            <div className="inner-price">
                              <h6>4.12 ETH</h6>
                              <p>from</p>
                            </div>
                            <div className="inner-price">
                              <h6>$103,025</h6>
                              <p className="red-text">-2.25%</p>
                            </div>
                          </div>
                          <div className="btn-collect">
                            <a href="" className="gradient-btn">
                              Collect Now{" "}
                            </a>
                          </div>
                        </div>
                      </div>
                    </Slider>
                    <div className="text-center">
                      <a href="/" className="border-btn">
                        <span>see more</span>
                      </a>
                    </div>
                  </div>
                </Col>
              </Row>
            </Container>
          </section>

          <section className="trending-sec-new">
            <Container>
              <Row>
                <Col>
                  <div className="outer-collection-tab">
                    <h2 className="heading-main">Top Collections</h2>
                    <Tabs
                      defaultActiveKey="Art"
                      className=" mb-3 collection-tab"
                    >
                      <Tab eventKey="Art" title="Art">
                        <div>
                          <Row>
                            <Col lg={3} md={6} sm={6}>
                              <div class="product-list-box">
                                <img
                                  src="assets/images/img-nft/list-img.png"
                                  class="img-fluid"
                                />
                                <div>
                                  <h5>Azuki 3D </h5>
                                  <p>AZUKI.JP</p>
                                  <div class="d-flex justify-content-between">
                                    <h6>1.5 ETH</h6>
                                    <h6>$1907</h6>
                                  </div>
                                  <div class="d-flex justify-content-between">
                                    <p>Floor Price </p>
                                    <p class="green-color">
                                      <span>+1.6%</span>
                                    </p>
                                  </div>
                                </div>
                              </div>
                            </Col>
                            <Col lg={3} md={6} sm={6}>
                              <div class="product-list-box">
                                <img
                                  src="assets/images/img-nft/list-img.png"
                                  class="img-fluid"
                                />
                                <div>
                                  <h5>Azuki 3D </h5>
                                  <p>AZUKI.JP</p>
                                  <div class="d-flex justify-content-between">
                                    <h6>1.5 ETH</h6>
                                    <h6>$1907</h6>
                                  </div>
                                  <div class="d-flex justify-content-between">
                                    <p>Floor Price </p>
                                    <p class="red-text">+1.6%</p>
                                  </div>
                                </div>
                              </div>
                            </Col>
                            <Col lg={3} md={6} sm={6}>
                              <div class="product-list-box">
                                <img
                                  src="assets/images/img-nft/list-img.png"
                                  class="img-fluid"
                                />
                                <div>
                                  <h5>Azuki 3D </h5>
                                  <p>AZUKI.JP</p>
                                  <div class="d-flex justify-content-between">
                                    <h6>1.5 ETH</h6>
                                    <h6>$1907</h6>
                                  </div>
                                  <div class="d-flex justify-content-between">
                                    <p>Floor Price </p>
                                    <p class="green-text">
                                      <span>+1.6%</span>
                                    </p>
                                  </div>
                                </div>
                              </div>
                            </Col>
                            <Col lg={3} md={6} sm={6}>
                              <div class="product-list-box">
                                <img
                                  src="assets/images/img-nft/list-img.png"
                                  class="img-fluid"
                                />
                                <div>
                                  <h5>Azuki 3D </h5>
                                  <p>AZUKI.JP</p>
                                  <div class="d-flex justify-content-between">
                                    <h6>1.5 ETH</h6>
                                    <h6>$1907</h6>
                                  </div>
                                  <div class="d-flex justify-content-between">
                                    <p>Floor Price </p>
                                    <p class="green-color">
                                      <span>+1.6%</span>
                                    </p>
                                  </div>
                                </div>
                              </div>
                            </Col>
                            <Col lg={3} md={6} sm={6}>
                              <div class="product-list-box">
                                <img
                                  src="assets/images/img-nft/list-img.png"
                                  class="img-fluid"
                                />
                                <div>
                                  <h5>Azuki 3D </h5>
                                  <p>AZUKI.JP</p>
                                  <div class="d-flex justify-content-between">
                                    <h6>1.5 ETH</h6>
                                    <h6>$1907</h6>
                                  </div>
                                  <div class="d-flex justify-content-between">
                                    <p>Floor Price </p>
                                    <p class="green-color">
                                      <span>+1.6%</span>
                                    </p>
                                  </div>
                                </div>
                              </div>
                            </Col>
                            <Col lg={3} md={6} sm={6}>
                              <div class="product-list-box">
                                <img
                                  src="assets/images/img-nft/list-img.png"
                                  class="img-fluid"
                                />
                                <div>
                                  <h5>Azuki 3D </h5>
                                  <p>AZUKI.JP</p>
                                  <div class="d-flex justify-content-between">
                                    <h6>1.5 ETH</h6>
                                    <h6>$1907</h6>
                                  </div>
                                  <div class="d-flex justify-content-between">
                                    <p>Floor Price </p>
                                    <p class="green-color">
                                      <span>+1.6%</span>
                                    </p>
                                  </div>
                                </div>
                              </div>
                            </Col>
                            <Col lg={3} md={6} sm={6}>
                              <div class="product-list-box">
                                <img
                                  src="assets/images/img-nft/list-img.png"
                                  class="img-fluid"
                                />
                                <div>
                                  <h5>Azuki 3D </h5>
                                  <p>AZUKI.JP</p>
                                  <div class="d-flex justify-content-between">
                                    <h6>1.5 ETH</h6>
                                    <h6>$1907</h6>
                                  </div>
                                  <div class="d-flex justify-content-between">
                                    <p>Floor Price </p>
                                    <p class="green-color">
                                      <span>+1.6%</span>
                                    </p>
                                  </div>
                                </div>
                              </div>
                            </Col>
                            <Col lg={3} md={6} sm={6}>
                              <div class="product-list-box">
                                <img
                                  src="assets/images/img-nft/list-img.png"
                                  class="img-fluid"
                                />
                                <div>
                                  <h5>Azuki 3D </h5>
                                  <p>AZUKI.JP</p>
                                  <div class="d-flex justify-content-between">
                                    <h6>1.5 ETH</h6>
                                    <h6>$1907</h6>
                                  </div>
                                  <div class="d-flex justify-content-between">
                                    <p>Floor Price </p>
                                    <p class="green-color">
                                      <span>+1.6%</span>
                                    </p>
                                  </div>
                                </div>
                              </div>
                            </Col>
                          </Row>
                        </div>
                      </Tab>
                      <Tab eventKey="Collectibles" title="Collectibles">
                        <div>
                          <Row>
                            <Col lg={3} md={6} sm={6}>
                              <div class="product-list-box">
                                <img
                                  src="assets/images/img-nft/list-img.png"
                                  class="img-fluid"
                                />
                                <div>
                                  <h5>Azuki 3D </h5>
                                  <p>AZUKI.JP</p>
                                  <div class="d-flex justify-content-between">
                                    <h6>1.5 ETH</h6>
                                    <h6>$1907</h6>
                                  </div>
                                  <div class="d-flex justify-content-between">
                                    <p>Floor Price </p>
                                    <p class="green-color">
                                      <span>+1.6%</span>
                                    </p>
                                  </div>
                                </div>
                              </div>
                            </Col>
                            <Col lg={3} md={6} sm={6}>
                              <div class="product-list-box">
                                <img
                                  src="assets/images/img-nft/list-img.png"
                                  class="img-fluid"
                                />
                                <div>
                                  <h5>Azuki 3D </h5>
                                  <p>AZUKI.JP</p>
                                  <div class="d-flex justify-content-between">
                                    <h6>1.5 ETH</h6>
                                    <h6>$1907</h6>
                                  </div>
                                  <div class="d-flex justify-content-between">
                                    <p>Floor Price </p>
                                    <p class="red-text">+1.6%</p>
                                  </div>
                                </div>
                              </div>
                            </Col>
                            <Col lg={3} md={6} sm={6}>
                              <div class="product-list-box">
                                <img
                                  src="assets/images/img-nft/list-img.png"
                                  class="img-fluid"
                                />
                                <div>
                                  <h5>Azuki 3D </h5>
                                  <p>AZUKI.JP</p>
                                  <div class="d-flex justify-content-between">
                                    <h6>1.5 ETH</h6>
                                    <h6>$1907</h6>
                                  </div>
                                  <div class="d-flex justify-content-between">
                                    <p>Floor Price </p>
                                    <p class="green-text">
                                      <span>+1.6%</span>
                                    </p>
                                  </div>
                                </div>
                              </div>
                            </Col>
                            <Col lg={3} md={6} sm={6}>
                              <div class="product-list-box">
                                <img
                                  src="assets/images/img-nft/list-img.png"
                                  class="img-fluid"
                                />
                                <div>
                                  <h5>Azuki 3D </h5>
                                  <p>AZUKI.JP</p>
                                  <div class="d-flex justify-content-between">
                                    <h6>1.5 ETH</h6>
                                    <h6>$1907</h6>
                                  </div>
                                  <div class="d-flex justify-content-between">
                                    <p>Floor Price </p>
                                    <p class="green-color">
                                      <span>+1.6%</span>
                                    </p>
                                  </div>
                                </div>
                              </div>
                            </Col>
                            <Col lg={3} md={6} sm={6}>
                              <div class="product-list-box">
                                <img
                                  src="assets/images/img-nft/list-img.png"
                                  class="img-fluid"
                                />
                                <div>
                                  <h5>Azuki 3D </h5>
                                  <p>AZUKI.JP</p>
                                  <div class="d-flex justify-content-between">
                                    <h6>1.5 ETH</h6>
                                    <h6>$1907</h6>
                                  </div>
                                  <div class="d-flex justify-content-between">
                                    <p>Floor Price </p>
                                    <p class="green-color">
                                      <span>+1.6%</span>
                                    </p>
                                  </div>
                                </div>
                              </div>
                            </Col>
                            <Col lg={3} md={6} sm={6}>
                              <div class="product-list-box">
                                <img
                                  src="assets/images/img-nft/list-img.png"
                                  class="img-fluid"
                                />
                                <div>
                                  <h5>Azuki 3D </h5>
                                  <p>AZUKI.JP</p>
                                  <div class="d-flex justify-content-between">
                                    <h6>1.5 ETH</h6>
                                    <h6>$1907</h6>
                                  </div>
                                  <div class="d-flex justify-content-between">
                                    <p>Floor Price </p>
                                    <p class="green-color">
                                      <span>+1.6%</span>
                                    </p>
                                  </div>
                                </div>
                              </div>
                            </Col>
                            <Col lg={3} md={6} sm={6}>
                              <div class="product-list-box">
                                <img
                                  src="assets/images/img-nft/list-img.png"
                                  class="img-fluid"
                                />
                                <div>
                                  <h5>Azuki 3D </h5>
                                  <p>AZUKI.JP</p>
                                  <div class="d-flex justify-content-between">
                                    <h6>1.5 ETH</h6>
                                    <h6>$1907</h6>
                                  </div>
                                  <div class="d-flex justify-content-between">
                                    <p>Floor Price </p>
                                    <p class="green-color">
                                      <span>+1.6%</span>
                                    </p>
                                  </div>
                                </div>
                              </div>
                            </Col>
                            <Col lg={3} md={6} sm={6}>
                              <div class="product-list-box">
                                <img
                                  src="assets/images/img-nft/list-img.png"
                                  class="img-fluid"
                                />
                                <div>
                                  <h5>Azuki 3D </h5>
                                  <p>AZUKI.JP</p>
                                  <div class="d-flex justify-content-between">
                                    <h6>1.5 ETH</h6>
                                    <h6>$1907</h6>
                                  </div>
                                  <div class="d-flex justify-content-between">
                                    <p>Floor Price </p>
                                    <p class="green-color">
                                      <span>+1.6%</span>
                                    </p>
                                  </div>
                                </div>
                              </div>
                            </Col>
                          </Row>
                        </div>
                      </Tab>
                      <Tab eventKey="Metaverse" title="Metaverse">
                        <div>
                          <Row>
                            <Col lg={3} md={6} sm={6}>
                              <div class="product-list-box">
                                <img
                                  src="assets/images/img-nft/list-img.png"
                                  class="img-fluid"
                                />
                                <div>
                                  <h5>Azuki 3D </h5>
                                  <p>AZUKI.JP</p>
                                  <div class="d-flex justify-content-between">
                                    <h6>1.5 ETH</h6>
                                    <h6>$1907</h6>
                                  </div>
                                  <div class="d-flex justify-content-between">
                                    <p>Floor Price </p>
                                    <p class="green-color">
                                      <span>+1.6%</span>
                                    </p>
                                  </div>
                                </div>
                              </div>
                            </Col>
                            <Col lg={3} md={6} sm={6}>
                              <div class="product-list-box">
                                <img
                                  src="assets/images/img-nft/list-img.png"
                                  class="img-fluid"
                                />
                                <div>
                                  <h5>Azuki 3D </h5>
                                  <p>AZUKI.JP</p>
                                  <div class="d-flex justify-content-between">
                                    <h6>1.5 ETH</h6>
                                    <h6>$1907</h6>
                                  </div>
                                  <div class="d-flex justify-content-between">
                                    <p>Floor Price </p>
                                    <p class="red-text">+1.6%</p>
                                  </div>
                                </div>
                              </div>
                            </Col>
                            <Col lg={3} md={6} sm={6}>
                              <div class="product-list-box">
                                <img
                                  src="assets/images/img-nft/list-img.png"
                                  class="img-fluid"
                                />
                                <div>
                                  <h5>Azuki 3D </h5>
                                  <p>AZUKI.JP</p>
                                  <div class="d-flex justify-content-between">
                                    <h6>1.5 ETH</h6>
                                    <h6>$1907</h6>
                                  </div>
                                  <div class="d-flex justify-content-between">
                                    <p>Floor Price </p>
                                    <p class="green-text">
                                      <span>+1.6%</span>
                                    </p>
                                  </div>
                                </div>
                              </div>
                            </Col>
                            <Col lg={3} md={6} sm={6}>
                              <div class="product-list-box">
                                <img
                                  src="assets/images/img-nft/list-img.png"
                                  class="img-fluid"
                                />
                                <div>
                                  <h5>Azuki 3D </h5>
                                  <p>AZUKI.JP</p>
                                  <div class="d-flex justify-content-between">
                                    <h6>1.5 ETH</h6>
                                    <h6>$1907</h6>
                                  </div>
                                  <div class="d-flex justify-content-between">
                                    <p>Floor Price </p>
                                    <p class="green-color">
                                      <span>+1.6%</span>
                                    </p>
                                  </div>
                                </div>
                              </div>
                            </Col>
                            <Col lg={3} md={6} sm={6}>
                              <div class="product-list-box">
                                <img
                                  src="assets/images/img-nft/list-img.png"
                                  class="img-fluid"
                                />
                                <div>
                                  <h5>Azuki 3D </h5>
                                  <p>AZUKI.JP</p>
                                  <div class="d-flex justify-content-between">
                                    <h6>1.5 ETH</h6>
                                    <h6>$1907</h6>
                                  </div>
                                  <div class="d-flex justify-content-between">
                                    <p>Floor Price </p>
                                    <p class="green-color">
                                      <span>+1.6%</span>
                                    </p>
                                  </div>
                                </div>
                              </div>
                            </Col>
                            <Col lg={3} md={6} sm={6}>
                              <div class="product-list-box">
                                <img
                                  src="assets/images/img-nft/list-img.png"
                                  class="img-fluid"
                                />
                                <div>
                                  <h5>Azuki 3D </h5>
                                  <p>AZUKI.JP</p>
                                  <div class="d-flex justify-content-between">
                                    <h6>1.5 ETH</h6>
                                    <h6>$1907</h6>
                                  </div>
                                  <div class="d-flex justify-content-between">
                                    <p>Floor Price </p>
                                    <p class="green-color">
                                      <span>+1.6%</span>
                                    </p>
                                  </div>
                                </div>
                              </div>
                            </Col>
                            <Col lg={3} md={6} sm={6}>
                              <div class="product-list-box">
                                <img
                                  src="assets/images/img-nft/list-img.png"
                                  class="img-fluid"
                                />
                                <div>
                                  <h5>Azuki 3D </h5>
                                  <p>AZUKI.JP</p>
                                  <div class="d-flex justify-content-between">
                                    <h6>1.5 ETH</h6>
                                    <h6>$1907</h6>
                                  </div>
                                  <div class="d-flex justify-content-between">
                                    <p>Floor Price </p>
                                    <p class="green-color">
                                      <span>+1.6%</span>
                                    </p>
                                  </div>
                                </div>
                              </div>
                            </Col>
                            <Col lg={3} md={6} sm={6}>
                              <div class="product-list-box">
                                <img
                                  src="assets/images/img-nft/list-img.png"
                                  class="img-fluid"
                                />
                                <div>
                                  <h5>Azuki 3D </h5>
                                  <p>AZUKI.JP</p>
                                  <div class="d-flex justify-content-between">
                                    <h6>1.5 ETH</h6>
                                    <h6>$1907</h6>
                                  </div>
                                  <div class="d-flex justify-content-between">
                                    <p>Floor Price </p>
                                    <p class="green-color">
                                      <span>+1.6%</span>
                                    </p>
                                  </div>
                                </div>
                              </div>
                            </Col>
                          </Row>
                        </div>
                      </Tab>
                      <Tab eventKey="Virtual Worlds" title="Virtual Worlds">
                        <div>
                          <Row>
                            <Col lg={3} md={6} sm={6}>
                              <div class="product-list-box">
                                <img
                                  src="assets/images/img-nft/list-img.png"
                                  class="img-fluid"
                                />
                                <div>
                                  <h5>Azuki 3D </h5>
                                  <p>AZUKI.JP</p>
                                  <div class="d-flex justify-content-between">
                                    <h6>1.5 ETH</h6>
                                    <h6>$1907</h6>
                                  </div>
                                  <div class="d-flex justify-content-between">
                                    <p>Floor Price </p>
                                    <p class="green-color">
                                      <span>+1.6%</span>
                                    </p>
                                  </div>
                                </div>
                              </div>
                            </Col>
                            <Col lg={3} md={6} sm={6}>
                              <div class="product-list-box">
                                <img
                                  src="assets/images/img-nft/list-img.png"
                                  class="img-fluid"
                                />
                                <div>
                                  <h5>Azuki 3D </h5>
                                  <p>AZUKI.JP</p>
                                  <div class="d-flex justify-content-between">
                                    <h6>1.5 ETH</h6>
                                    <h6>$1907</h6>
                                  </div>
                                  <div class="d-flex justify-content-between">
                                    <p>Floor Price </p>
                                    <p class="red-text">+1.6%</p>
                                  </div>
                                </div>
                              </div>
                            </Col>
                            <Col lg={3} md={6} sm={6}>
                              <div class="product-list-box">
                                <img
                                  src="assets/images/img-nft/list-img.png"
                                  class="img-fluid"
                                />
                                <div>
                                  <h5>Azuki 3D </h5>
                                  <p>AZUKI.JP</p>
                                  <div class="d-flex justify-content-between">
                                    <h6>1.5 ETH</h6>
                                    <h6>$1907</h6>
                                  </div>
                                  <div class="d-flex justify-content-between">
                                    <p>Floor Price </p>
                                    <p class="green-text">
                                      <span>+1.6%</span>
                                    </p>
                                  </div>
                                </div>
                              </div>
                            </Col>
                            <Col lg={3} md={6} sm={6}>
                              <div class="product-list-box">
                                <img
                                  src="assets/images/img-nft/list-img.png"
                                  class="img-fluid"
                                />
                                <div>
                                  <h5>Azuki 3D </h5>
                                  <p>AZUKI.JP</p>
                                  <div class="d-flex justify-content-between">
                                    <h6>1.5 ETH</h6>
                                    <h6>$1907</h6>
                                  </div>
                                  <div class="d-flex justify-content-between">
                                    <p>Floor Price </p>
                                    <p class="green-color">
                                      <span>+1.6%</span>
                                    </p>
                                  </div>
                                </div>
                              </div>
                            </Col>
                            <Col lg={3} md={6} sm={6}>
                              <div class="product-list-box">
                                <img
                                  src="assets/images/img-nft/list-img.png"
                                  class="img-fluid"
                                />
                                <div>
                                  <h5>Azuki 3D </h5>
                                  <p>AZUKI.JP</p>
                                  <div class="d-flex justify-content-between">
                                    <h6>1.5 ETH</h6>
                                    <h6>$1907</h6>
                                  </div>
                                  <div class="d-flex justify-content-between">
                                    <p>Floor Price </p>
                                    <p class="green-color">
                                      <span>+1.6%</span>
                                    </p>
                                  </div>
                                </div>
                              </div>
                            </Col>
                            <Col lg={3} md={6} sm={6}>
                              <div class="product-list-box">
                                <img
                                  src="assets/images/img-nft/list-img.png"
                                  class="img-fluid"
                                />
                                <div>
                                  <h5>Azuki 3D </h5>
                                  <p>AZUKI.JP</p>
                                  <div class="d-flex justify-content-between">
                                    <h6>1.5 ETH</h6>
                                    <h6>$1907</h6>
                                  </div>
                                  <div class="d-flex justify-content-between">
                                    <p>Floor Price </p>
                                    <p class="green-color">
                                      <span>+1.6%</span>
                                    </p>
                                  </div>
                                </div>
                              </div>
                            </Col>
                            <Col lg={3} md={6} sm={6}>
                              <div class="product-list-box">
                                <img
                                  src="assets/images/img-nft/list-img.png"
                                  class="img-fluid"
                                />
                                <div>
                                  <h5>Azuki 3D </h5>
                                  <p>AZUKI.JP</p>
                                  <div class="d-flex justify-content-between">
                                    <h6>1.5 ETH</h6>
                                    <h6>$1907</h6>
                                  </div>
                                  <div class="d-flex justify-content-between">
                                    <p>Floor Price </p>
                                    <p class="green-color">
                                      <span>+1.6%</span>
                                    </p>
                                  </div>
                                </div>
                              </div>
                            </Col>
                            <Col lg={3} md={6} sm={6}>
                              <div class="product-list-box">
                                <img
                                  src="assets/images/img-nft/list-img.png"
                                  class="img-fluid"
                                />
                                <div>
                                  <h5>Azuki 3D </h5>
                                  <p>AZUKI.JP</p>
                                  <div class="d-flex justify-content-between">
                                    <h6>1.5 ETH</h6>
                                    <h6>$1907</h6>
                                  </div>
                                  <div class="d-flex justify-content-between">
                                    <p>Floor Price </p>
                                    <p class="green-color">
                                      <span>+1.6%</span>
                                    </p>
                                  </div>
                                </div>
                              </div>
                            </Col>
                          </Row>
                        </div>
                      </Tab>
                      <Tab eventKey="Sports" title="Sports">
                        <div>
                          <Row>
                            <Col lg={3} md={6} sm={6}>
                              <div class="product-list-box">
                                <img
                                  src="assets/images/img-nft/list-img.png"
                                  class="img-fluid"
                                />
                                <div>
                                  <h5>Azuki 3D </h5>
                                  <p>AZUKI.JP</p>
                                  <div class="d-flex justify-content-between">
                                    <h6>1.5 ETH</h6>
                                    <h6>$1907</h6>
                                  </div>
                                  <div class="d-flex justify-content-between">
                                    <p>Floor Price </p>
                                    <p class="green-color">
                                      <span>+1.6%</span>
                                    </p>
                                  </div>
                                </div>
                              </div>
                            </Col>
                            <Col lg={3} md={6} sm={6}>
                              <div class="product-list-box">
                                <img
                                  src="assets/images/img-nft/list-img.png"
                                  class="img-fluid"
                                />
                                <div>
                                  <h5>Azuki 3D </h5>
                                  <p>AZUKI.JP</p>
                                  <div class="d-flex justify-content-between">
                                    <h6>1.5 ETH</h6>
                                    <h6>$1907</h6>
                                  </div>
                                  <div class="d-flex justify-content-between">
                                    <p>Floor Price </p>
                                    <p class="red-text">+1.6%</p>
                                  </div>
                                </div>
                              </div>
                            </Col>
                            <Col lg={3} md={6} sm={6}>
                              <div class="product-list-box">
                                <img
                                  src="assets/images/img-nft/list-img.png"
                                  class="img-fluid"
                                />
                                <div>
                                  <h5>Azuki 3D </h5>
                                  <p>AZUKI.JP</p>
                                  <div class="d-flex justify-content-between">
                                    <h6>1.5 ETH</h6>
                                    <h6>$1907</h6>
                                  </div>
                                  <div class="d-flex justify-content-between">
                                    <p>Floor Price </p>
                                    <p class="green-text">
                                      <span>+1.6%</span>
                                    </p>
                                  </div>
                                </div>
                              </div>
                            </Col>
                            <Col lg={3} md={6} sm={6}>
                              <div class="product-list-box">
                                <img
                                  src="assets/images/img-nft/list-img.png"
                                  class="img-fluid"
                                />
                                <div>
                                  <h5>Azuki 3D </h5>
                                  <p>AZUKI.JP</p>
                                  <div class="d-flex justify-content-between">
                                    <h6>1.5 ETH</h6>
                                    <h6>$1907</h6>
                                  </div>
                                  <div class="d-flex justify-content-between">
                                    <p>Floor Price </p>
                                    <p class="green-color">
                                      <span>+1.6%</span>
                                    </p>
                                  </div>
                                </div>
                              </div>
                            </Col>
                            <Col lg={3} md={6} sm={6}>
                              <div class="product-list-box">
                                <img
                                  src="assets/images/img-nft/list-img.png"
                                  class="img-fluid"
                                />
                                <div>
                                  <h5>Azuki 3D </h5>
                                  <p>AZUKI.JP</p>
                                  <div class="d-flex justify-content-between">
                                    <h6>1.5 ETH</h6>
                                    <h6>$1907</h6>
                                  </div>
                                  <div class="d-flex justify-content-between">
                                    <p>Floor Price </p>
                                    <p class="green-color">
                                      <span>+1.6%</span>
                                    </p>
                                  </div>
                                </div>
                              </div>
                            </Col>
                            <Col lg={3} md={6} sm={6}>
                              <div class="product-list-box">
                                <img
                                  src="assets/images/img-nft/list-img.png"
                                  class="img-fluid"
                                />
                                <div>
                                  <h5>Azuki 3D </h5>
                                  <p>AZUKI.JP</p>
                                  <div class="d-flex justify-content-between">
                                    <h6>1.5 ETH</h6>
                                    <h6>$1907</h6>
                                  </div>
                                  <div class="d-flex justify-content-between">
                                    <p>Floor Price </p>
                                    <p class="green-color">
                                      <span>+1.6%</span>
                                    </p>
                                  </div>
                                </div>
                              </div>
                            </Col>
                            <Col lg={3} md={6} sm={6}>
                              <div class="product-list-box">
                                <img
                                  src="assets/images/img-nft/list-img.png"
                                  class="img-fluid"
                                />
                                <div>
                                  <h5>Azuki 3D </h5>
                                  <p>AZUKI.JP</p>
                                  <div class="d-flex justify-content-between">
                                    <h6>1.5 ETH</h6>
                                    <h6>$1907</h6>
                                  </div>
                                  <div class="d-flex justify-content-between">
                                    <p>Floor Price </p>
                                    <p class="green-color">
                                      <span>+1.6%</span>
                                    </p>
                                  </div>
                                </div>
                              </div>
                            </Col>
                            <Col lg={3} md={6} sm={6}>
                              <div class="product-list-box">
                                <img
                                  src="assets/images/img-nft/list-img.png"
                                  class="img-fluid"
                                />
                                <div>
                                  <h5>Azuki 3D </h5>
                                  <p>AZUKI.JP</p>
                                  <div class="d-flex justify-content-between">
                                    <h6>1.5 ETH</h6>
                                    <h6>$1907</h6>
                                  </div>
                                  <div class="d-flex justify-content-between">
                                    <p>Floor Price </p>
                                    <p class="green-color">
                                      <span>+1.6%</span>
                                    </p>
                                  </div>
                                </div>
                              </div>
                            </Col>
                          </Row>
                        </div>
                      </Tab>
                      <Tab eventKey="Music" title="Music">
                        <div>
                          <Row>
                            <Col lg={3} md={6} sm={6}>
                              <div class="product-list-box">
                                <img
                                  src="assets/images/img-nft/list-img.png"
                                  class="img-fluid"
                                />
                                <div>
                                  <h5>Azuki 3D </h5>
                                  <p>AZUKI.JP</p>
                                  <div class="d-flex justify-content-between">
                                    <h6>1.5 ETH</h6>
                                    <h6>$1907</h6>
                                  </div>
                                  <div class="d-flex justify-content-between">
                                    <p>Floor Price </p>
                                    <p class="green-color">
                                      <span>+1.6%</span>
                                    </p>
                                  </div>
                                </div>
                              </div>
                            </Col>
                            <Col lg={3} md={6} sm={6}>
                              <div class="product-list-box">
                                <img
                                  src="assets/images/img-nft/list-img.png"
                                  class="img-fluid"
                                />
                                <div>
                                  <h5>Azuki 3D </h5>
                                  <p>AZUKI.JP</p>
                                  <div class="d-flex justify-content-between">
                                    <h6>1.5 ETH</h6>
                                    <h6>$1907</h6>
                                  </div>
                                  <div class="d-flex justify-content-between">
                                    <p>Floor Price </p>
                                    <p class="red-text">+1.6%</p>
                                  </div>
                                </div>
                              </div>
                            </Col>
                            <Col lg={3} md={6} sm={6}>
                              <div class="product-list-box">
                                <img
                                  src="assets/images/img-nft/list-img.png"
                                  class="img-fluid"
                                />
                                <div>
                                  <h5>Azuki 3D </h5>
                                  <p>AZUKI.JP</p>
                                  <div class="d-flex justify-content-between">
                                    <h6>1.5 ETH</h6>
                                    <h6>$1907</h6>
                                  </div>
                                  <div class="d-flex justify-content-between">
                                    <p>Floor Price </p>
                                    <p class="green-text">
                                      <span>+1.6%</span>
                                    </p>
                                  </div>
                                </div>
                              </div>
                            </Col>
                            <Col lg={3} md={6} sm={6}>
                              <div class="product-list-box">
                                <img
                                  src="assets/images/img-nft/list-img.png"
                                  class="img-fluid"
                                />
                                <div>
                                  <h5>Azuki 3D </h5>
                                  <p>AZUKI.JP</p>
                                  <div class="d-flex justify-content-between">
                                    <h6>1.5 ETH</h6>
                                    <h6>$1907</h6>
                                  </div>
                                  <div class="d-flex justify-content-between">
                                    <p>Floor Price </p>
                                    <p class="green-color">
                                      <span>+1.6%</span>
                                    </p>
                                  </div>
                                </div>
                              </div>
                            </Col>
                            <Col lg={3} md={6} sm={6}>
                              <div class="product-list-box">
                                <img
                                  src="assets/images/img-nft/list-img.png"
                                  class="img-fluid"
                                />
                                <div>
                                  <h5>Azuki 3D </h5>
                                  <p>AZUKI.JP</p>
                                  <div class="d-flex justify-content-between">
                                    <h6>1.5 ETH</h6>
                                    <h6>$1907</h6>
                                  </div>
                                  <div class="d-flex justify-content-between">
                                    <p>Floor Price </p>
                                    <p class="green-color">
                                      <span>+1.6%</span>
                                    </p>
                                  </div>
                                </div>
                              </div>
                            </Col>
                            <Col lg={3} md={6} sm={6}>
                              <div class="product-list-box">
                                <img
                                  src="assets/images/img-nft/list-img.png"
                                  class="img-fluid"
                                />
                                <div>
                                  <h5>Azuki 3D </h5>
                                  <p>AZUKI.JP</p>
                                  <div class="d-flex justify-content-between">
                                    <h6>1.5 ETH</h6>
                                    <h6>$1907</h6>
                                  </div>
                                  <div class="d-flex justify-content-between">
                                    <p>Floor Price </p>
                                    <p class="green-color">
                                      <span>+1.6%</span>
                                    </p>
                                  </div>
                                </div>
                              </div>
                            </Col>
                            <Col lg={3} md={6} sm={6}>
                              <div class="product-list-box">
                                <img
                                  src="assets/images/img-nft/list-img.png"
                                  class="img-fluid"
                                />
                                <div>
                                  <h5>Azuki 3D </h5>
                                  <p>AZUKI.JP</p>
                                  <div class="d-flex justify-content-between">
                                    <h6>1.5 ETH</h6>
                                    <h6>$1907</h6>
                                  </div>
                                  <div class="d-flex justify-content-between">
                                    <p>Floor Price </p>
                                    <p class="green-color">
                                      <span>+1.6%</span>
                                    </p>
                                  </div>
                                </div>
                              </div>
                            </Col>
                            <Col lg={3} md={6} sm={6}>
                              <div class="product-list-box">
                                <img
                                  src="assets/images/img-nft/list-img.png"
                                  class="img-fluid"
                                />
                                <div>
                                  <h5>Azuki 3D </h5>
                                  <p>AZUKI.JP</p>
                                  <div class="d-flex justify-content-between">
                                    <h6>1.5 ETH</h6>
                                    <h6>$1907</h6>
                                  </div>
                                  <div class="d-flex justify-content-between">
                                    <p>Floor Price </p>
                                    <p class="green-color">
                                      <span>+1.6%</span>
                                    </p>
                                  </div>
                                </div>
                              </div>
                            </Col>
                          </Row>
                        </div>
                      </Tab>
                    </Tabs>
                  </div>
                  <div className="text-center">
                    <a href="/" className="border-btn">
                      <span>see more</span>
                    </a>
                  </div>
                </Col>
              </Row>
            </Container>
          </section>

          <section className="trending-sec-new category-slider-sec">
            <Container>
              <Row>
                <Col>
                  <div className="">
                    <h2 className="heading-main">Top Categories</h2>
                    <Slider {...categorieslide}>
                      <div className="items">
                        <div className="category-slider">
                          <div className="cat-slide-inner">
                            <div className="left-box">
                              <img
                                src="assets/images/image 8.png"
                                class="img-fluid first-box"
                              />
                              <img
                                src="assets/images/image 6.png"
                                class="img-fluid second-box"
                              />
                            </div>
                            <div className="right-box">
                              <img
                                src="assets/images/image 14.png"
                                class="img-fluid right-img"
                              />
                            </div>
                          </div>
                          <h5>Golden Necklace</h5>
                        </div>
                      </div>
                      <div className="items">
                        <div className="category-slider">
                          <div className="cat-slide-inner">
                            <div className="left-box">
                              <img
                                src="assets/images/image 13.png"
                                class="img-fluid first-box"
                              />
                              <img
                                src="assets/images/image 12.png"
                                class="img-fluid second-box"
                              />
                            </div>
                            <div className="right-box">
                              <img
                                src="assets/images/nft-image-1.png"
                                class="img-fluid right-img"
                              />
                            </div>
                          </div>
                          <h5>Golden Necklace</h5>
                        </div>
                      </div>
                      <div className="items">
                        <div className="category-slider">
                          <div className="cat-slide-inner">
                            <div className="left-box">
                              <img
                                src="assets/images/image 11.png"
                                class="img-fluid first-box"
                              />
                              <img
                                src="assets/images/image 10.png"
                                class="img-fluid second-box"
                              />
                            </div>
                            <div className="right-box">
                              <img
                                src="assets/images/image 9.png"
                                class="img-fluid right-img"
                              />
                            </div>
                          </div>
                          <h5>Golden Necklace</h5>
                        </div>
                      </div>
                      <div className="items">
                        <div className="category-slider">
                          <div className="cat-slide-inner">
                            <div className="left-box">
                              <img
                                src="assets/images/image 8.png"
                                class="img-fluid first-box"
                              />
                              <img
                                src="assets/images/image 6.png"
                                class="img-fluid second-box"
                              />
                            </div>
                            <div className="right-box">
                              <img
                                src="assets/images/image 14.png"
                                class="img-fluid right-img"
                              />
                            </div>
                          </div>
                          <h5>Golden Necklace</h5>
                        </div>
                      </div>
                      <div className="items">
                        <div className="category-slider">
                          <div className="cat-slide-inner">
                            <div className="left-box">
                              <img
                                src="assets/images/image 13.png"
                                class="img-fluid first-box"
                              />
                              <img
                                src="assets/images/image 12.png"
                                class="img-fluid second-box"
                              />
                            </div>
                            <div className="right-box">
                              <img
                                src="assets/images/nft-image-1.png"
                                class="img-fluid right-img"
                              />
                            </div>
                          </div>
                          <h5>Golden Necklace</h5>
                        </div>
                      </div>
                      <div className="items">
                        <div className="category-slider">
                          <div className="cat-slide-inner">
                            <div className="left-box">
                              <img
                                src="assets/images/image 11.png"
                                class="img-fluid first-box"
                              />
                              <img
                                src="assets/images/image 10.png"
                                class="img-fluid second-box"
                              />
                            </div>
                            <div className="right-box">
                              <img
                                src="assets/images/image 9.png"
                                class="img-fluid right-img"
                              />
                            </div>
                          </div>
                          <h5>Golden Necklace</h5>
                        </div>
                      </div>
                    </Slider>
                  </div>

                  <div className="text-center">
                    <a href="/" className="border-btn">
                      <span>see more</span>
                    </a>
                  </div>
                </Col>
              </Row>
            </Container>
          </section>

          <section className="creat-process-sec">
            <Container>
              <Row>
                <Col>
                  <div className="inner-box-process">
                    <h2 className="heading-main">Create and sell your NFTs</h2>
                    <Row>
                      <Col lg={4} md={4}>
                        <div className="creat-process-box">
                          <img src="assets\images\sell-nft-image1.png" />
                          <h5>Set up your wallet</h5>
                          <p>
                            Once you’ve set up your wallet of choice, connect it
                            to OpenSea by clicking the wallet icon in the top
                            right corner. Learn about the wallets we support.
                          </p>
                        </div>
                      </Col>
                      <Col lg={4} md={4}>
                        <div className="creat-process-box">
                          <img src="assets\images\sell-nft-image2.png" />
                          <h5>Upload & Create Collection</h5>
                          <p>
                            Upload your work then Click My Collections and set
                            up your collection. Add social links, a description,
                            profile & banner images, and set a secondary sales
                            fee.
                          </p>
                        </div>
                      </Col>
                      <Col lg={4} md={4}>
                        <div className="creat-process-box">
                          <img src="assets\images\sell-nft-image3.png" />
                          <h5>List them for sale</h5>
                          <p>
                            Choose between auctions, fixed-price listings, and
                            declining-price listings. You choose how you want to
                            sell your NFTs, and we help you sell them
                          </p>
                        </div>
                      </Col>
                    </Row>
                  </div>
                </Col>
              </Row>
            </Container>
          </section>

          <section className="articles-new-sec" id="Articles">
            <Container>
              <Row>
                <Col>
                
                  <div className="">
                    <h2 className="heading-main">Articles</h2>
                    <Row>
                    {article.map((item, index) => (
                      <Col lg={4} md={4}>
                        <div className="artical-news-box" onClick={()=>{
                            single_nft_data(item)
                          }}>
                          <img src={item.images} />
                          <div className="inner-div-new">
                            <h5>
                             {item.title}
                            </h5>
                            <p>{moment(item.created_at).format("YYYY-MM-DD")}</p>
                          </div>
                        </div>
                      </Col>
                      ))}
                      {/* <Col lg={4} md={4}>
                        <div className="artical-news-box">
                          <img src="assets\images\article-image-2.png" />
                          <div className="inner-div-new">
                            <h5>
                              Lorem ipsum dolor sit amet, consectetur adipiscing
                              elit.
                            </h5>
                            <p>January 23, 2022</p>
                          </div>
                        </div>
                      </Col> */}
                      {/* <Col lg={4} md={4}>
                        <div className="artical-news-box">
                          <img src="assets\images\article-image-3.png" />
                          <div className="inner-div-new">
                            <h5>
                              Lorem ipsum dolor sit amet, consectetur adipiscing
                              elit.
                            </h5>
                            <p>January 23, 2022</p>
                          </div>
                        </div>
                      </Col> */}
                    </Row>
                  </div>
            
                  <div className="text-center">
                    <a href="/articles" className="border-btn">
                      <span>see more</span>
                    </a>
                  </div>
                </Col>
              </Row>
            </Container>
          </section>

          <section className="get-update-sec">
            <Container>
              <Row>
                <Col lg={8} className="m-auto">
                  <div className="">
                    <h2 className="heading-main">Get More Updates</h2>
                    <p>
                      Join our mailing list to stay in the loop with our newest
                      feature releases, NFT drops, and tips and tricks{" "}
                    </p>

                    <InputGroup className="mb-3">
                      <Form.Control
                        placeholder="Your Email..."
                        type="email"
                        name="email"
                        onChange={formdata}
                        value={inputdata.email}
                        id="subscribe"
                      />
                      <Button
                        className="gradient-btn"
                        onClick={() => {
                          HandleSubmit();
                        }}
                      >
                        I’m In
                      </Button>
                    </InputGroup>
                  </div>
                </Col>
              </Row>
            </Container>
          </section>
        </div>
      </Layout>
    </>
  );
}

export default Homepage;
