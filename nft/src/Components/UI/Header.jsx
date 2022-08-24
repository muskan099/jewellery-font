import { Row, Col, Container,Nav,Button,Navbar,NavDropdown } from "react-bootstrap";
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
function Header() {
  const[isLoginStart,setIsLoginStart]=useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
 
  const {
    isAuthenticated,
    walletAddress,
    hasWebsiteAccess: hasWebsiteAccessRedux,
  } = useSelector((state) => state.auth);
  const [hasWebsiteAccess, setHasWebsiteAccess] = useState(
    hasWebsiteAccessRedux ? true : true
  );
  const handleLogin = async () => {

    setIsLoginStart(true)
   let address = await Connect();

   let punk = 0;
   // console.log("punks",punk)
   //let tier=punk>0?"3 Tier":"1 Tier"
   let balance = await TabooBalance(address[0]);
   let tier = 0;
   console.log("balance", balance);

   if (address && address.length) {
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
useEffect(() => {

  if(!hasWebsiteAccess){
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
  const asyncFunction = async() => {
    if (isAuthenticated) {
      let provider = await Provider();
      provider.on("accountsChanged", (accounts) => {
        console.log(accounts);
        handleLogin();
      });

      // Subscribe to chainId change
      provider.on("chainChanged", (chainId) => {
        console.log(chainId);
        handleLogin();
      });

      // Subscribe to provider connection
      provider.on("connect", (info) => {
        console.log(info);
      });

      // Subscribe to provider disconnection
      provider.on("disconnect", (error) => {
        console.log(error);

        handleLogout();
      });
    }
  }
}
);
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
                            <Nav.Link href="/marketplace">Marketplace</Nav.Link>
                            <Nav.Link href="/overview">Collection</Nav.Link>
                            <Nav.Link href="/nft-detail">Community</Nav.Link>
                            <Nav.Link href="/create-nft">Create</Nav.Link>
                            <Nav.Link href="/create-stake">Create Stake</Nav.Link>
                        </Nav>
                    </Navbar.Collapse>
                    { isAuthenticated ?  <>
              <Dropdown className="d-flex align-items-center">
                <div className="wallet-addressNew">
                  {" "}
                  {`${walletAddress?.slice(0, 3)}...${walletAddress?.slice(
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
                <Dropdown.Menu>
                  <Dropdown.Item>
                    <Link to="/transactions" className="dropdown-item">
                      Collections
                    </Link>
                  </Dropdown.Item>

                {/*  <Dropdown.Item>
                    <Link to="/create-nft" className="dropdown-item">
                      Create NFT
                    </Link>
                  </Dropdown.Item> */}

                  <Dropdown.Item>
                    <Link to="/create-stake" className="dropdown-item">
                      Create Stake
                    </Link>
                  </Dropdown.Item>

                  <Dropdown.Item>
                    <Link to="/stakes" className="dropdown-item">
                      Stakes
                    </Link>
                  </Dropdown.Item>


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
            </>:  <Button className="nav-btn gradient-btn" onClick={handleLogin}>Connect Wallet</Button>}
                
                 <Navbar.Toggle aria-controls="basic-navbar-nav" />
            </Navbar>
               </Col>
            </Row>
        </Container>
    </header>
  );
}

export default Header;
