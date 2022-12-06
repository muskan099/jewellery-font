import { Row, Col, Container, Nav, Button, Navbar, NavDropdown, Modal } from "react-bootstrap";
import Connect from "../../helpers/Connect";
import { useDispatch, useSelector } from "react-redux";
import { TabooBalance } from "../../helpers/TabooHelper";
import {
  grantWebsiteAccessAction,
  loginSaga,
  logout,
} from "../../store/reducers/authReducer";
import React, { useEffect, useState, useRef } from "react";
import { toast } from "react-toastify";
import { Provider } from "../../helpers/Web3Helper";
import { Link, useNavigate } from "react-router-dom";
import {

  Dropdown,

} from "react-bootstrap";
import { web3 } from "../../helpers/Web3Helper";
function Header() {
  const [isLoginStart, setIsLoginStart] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  let {
    isAuthenticated,
    walletAddress,
    balance,
    hasWebsiteAccess: hasWebsiteAccessRedux,
  } = useSelector((state) => state.auth);
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [changedWalletAddress, setChangedWalletAddress] = useState(walletAddress)
  const [walletBalance, setwalletBalance] = useState(balance)

  const [hasWebsiteAccess, setHasWebsiteAccess] = useState(
    hasWebsiteAccessRedux ? true : true
  );
  let address;
  const handleLogin = async () => {

    setIsLoginStart(true)
    let data_Connect = await Connect();
    address = data_Connect.accounts;

    if (address) {
      let punk = 0;

      let balance = await TabooBalance(address[0]);
      // balance = parseFloat(balance)
      // balance = balance.toFixed(4)
      let tier = 0;

      dispatch(
        loginSaga({
          address: address[0],
          balance: balance,
          tabooPunk: punk,
          tier: tier,
        })
      );

      setIsLoginStart(false)
    } else {
      handleLogout();
      setIsLoginStart(false)
      toast.warn("Please connect to binance smart chain!")
    }
  };
  const handleLogout = async () => {
    dispatch(logout({}));
  };
  useEffect(() => {
    setChangedWalletAddress(walletAddress)
    setwalletBalance(balance)

  }, [walletAddress, balance])
  useEffect(() => {

    if (!hasWebsiteAccess) {
      navigate('/')
    }

    if (!isAuthenticated && window.location.pathname === "/login") {
      navigate("/login");
    } else if (!isAuthenticated && window.location.pathname === "/signup") {
      navigate("/signup");
    }
    // else if (!isAuthenticated) {
    //   navigate("/");
    // }
  }, [isAuthenticated]);
  useEffect(() => {

    if (isAuthenticated) {
      const handleChain = async () => {

        let provider = await Provider();
        provider.on("accountsChanged", (accounts) => {
          handleLogin();
        });

        // Subscribe to chainId change
        provider.on("chainChanged", (chainId) => {
          handleLogin();
        });

        // Subscribe to provider connection
        provider.on("connect", (info) => {
        });

        // Subscribe to provider disconnection
        provider.on("disconnect", (error) => {
          handleLogout();
        });
      }

      handleChain()
    }

  }, []);

  const [showModal1, setShowModal1] = useState(false);

  const handleModalClose1 = () => {
    setShowModal1(false);
  };
  /*
  const  accountInterval = async () => { 
    
    
    const web3Connect = await web3();
   
    let address1 = await web3Connect.eth.getAccounts();
   
    if (address1[0] !== walletAddress) {
      walletAddress = address1[0];
      setChangedWalletAddress(address1[0])
      localStorage.setItem("walletAddress", address1[0]);
      let newbalance = await TabooBalance(address1[0]);
      localStorage.setItem("balance", newbalance);
     
    
  }}
  
  setInterval(() => {
    accountInterval();
  
  },1000)
  */
  return (
    <header className='custom-header' fixed="top">
      <Container>
        <Row>
          <Col>
            <Navbar bg="dark" expand="lg" ms-auto >
              <Navbar.Brand href="/"><img
                src="assets/images/logo/logo.png"
                width="30"
                height="30"
                className="d-inline-block align-top"
                alt="React Bootstrap logo"
              /></Navbar.Brand>

              <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="ms-auto">
                  <Nav.Link onClick={() => {
                    navigate("/about")
                  }}>About</Nav.Link>
                  <Nav.Link onClick={() => {
                    navigate("/marketplace")
                  }}>Marketplace</Nav.Link>
                  {/* <Nav.Link onClick={()=>{
                          navigate("/overview")
                        }}>Collection</Nav.Link> */}
                  <Nav.Link onClick={handleShow}>Community</Nav.Link>
                  <Nav.Link onClick={() => {
                    navigate("/buyfromotherchain")
                  }}>Buy Coin</Nav.Link>
                  {/* <Nav.Link onClick={handleShow}>Contact Us</Nav.Link> */}
                  <Nav.Link onClick={() => {
                    navigate("/contact")
                  }}>Contact Us</Nav.Link>

                </Nav>
              </Navbar.Collapse>
              {isAuthenticated ? <>
                <Dropdown className="d-flex align-items-center">
                  <div className="wallet-addressNew">
                    {" "}
                    {`${changedWalletAddress?.slice(0, 3)}...${changedWalletAddress?.slice(
                      -3
                    )}`}{" "}
                  </div>
                  <Dropdown.Toggle className="loginUserDisplay">
                    <img
                      src="assets/images/detail-img.png"
                      width="30"
                      height="30"
                      className="loginUserDisplay-image"
                      alt="React Bootstrap logo"
                    />
                  </Dropdown.Toggle>
                  <Dropdown.Menu className="dropdown-after-login">

                    <Dropdown.Item>
                      <p>
                        {/* {`${walletBalance?.slice(0, 3)}{" "}``xJWL`} */}
                        {/* {walletBalance} xJWL */}
                        { walletBalance ? Number(walletBalance).toFixed(4) : ""} xJWL
                        {/* {walletBalance?.toFixed(4)} */}
                      </p>
                    </Dropdown.Item>

                    <Dropdown.Item>
                      <Link to="/collections" className="dropdown-item">
                        Collections
                      </Link>
                    </Dropdown.Item>

                    {/*  <Dropdown.Item>
                    <Link to="/create-nft" className="dropdown-item">
                      Create NFT
                    </Link>
                  </Dropdown.Item> */}

                    <Dropdown.Item>
                      <Link to="/create-nft" className="dropdown-item">
                        Create Nft
                      </Link>
                    </Dropdown.Item>
                    {/* <Dropdown.Item>
                    <Link to="/create-stake" className="dropdown-item">
                      Create Stake
                    </Link>
                  </Dropdown.Item>

                  <Dropdown.Item>
                    <Link to="/stakes" className="dropdown-item">
                      Stakes
                    </Link>
                  </Dropdown.Item> */}


                    {/* <Dropdown.Item>
                    <Link to="/buycoin" className="dropdown-item">
                       buycoin
                    </Link>
                  </Dropdown.Item>
                   */}
                    <Dropdown.Item>
                      <button className="dropdown-item" onClick={handleLogout}>
                        Logout
                      </button>
                    </Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
              </> : <Button className="nav-btn gradient-btn" onClick={handleLogin}>Connect Wallet</Button>}
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

              <Navbar.Toggle aria-controls="basic-navbar-nav" />
            </Navbar>
          </Col>
        </Row>
      </Container>
    </header>
  );
}

export default Header;
