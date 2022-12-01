import React from "react";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Navbar, Container, Nav, Button } from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link, useLocation } from "react-router-dom";
import { logout, loginSaga, setmetaMaskWallet } from "../../store/reducers/authReducer";
import { Connect, onDisconnect } from "../../helpers/Connect";
import { Addnetwork, _switch } from "../../helpers/Web3Helper";

const screenWidth = window.screen.availWidth;

export default function HomeHeaderOther() {

    const newlocation = useLocation();
    const dispatch = useDispatch();
    const {
      value: { isAuthenticated },
      metaMaskWallet,
    } = useSelector((state) => state.auth);
  
    const [UserAddress, setAddress] = useState(metaMaskWallet || "");
    const [Chain, setChainId] = useState("Network");
    const getAddress = async () => {
      let Details = await Connect();
      let chain = Details.chainId;
      setChainId(chain);
      setAddress(Details.selectedAccount);
    };

    const handle_logout = () => {
        dispatch(logout())
    }
    return (
        <>
            <header className="main-header dash-header">
                <Navbar expand="lg" style={{ border: "none" }} sticky="top">
                    <Container>
                        <div className="d-flex align-items-center justify-content-between w-100">
                            <Navbar.Brand href="/">
                                <img width={"140px"} src="assets/images/Homeimg/logo.png" />
                            </Navbar.Brand>
                           
                            {newlocation.pathname == "/buyfrom_metamask" || newlocation.pathname == "/buy-paypal"  || newlocation.pathname == "/buyfromotherchain"? 
                            <Button
                                className="Logout-btn ms-auto"
                                onClick={async () => {
                                    if (!UserAddress) {
                                        let Details = await Connect();
                                        setAddress(Details.selectedAccount);
                                        dispatch(setmetaMaskWallet(Details.selectedAccount));
                                    }
                                }}
                            >
                                {!UserAddress ? (
                                    "Connect Wallet"
                                ) : (
                                    <a
                                        href={`https://testnet.bscscan.com/address/${UserAddress}`}
                                        target="_blank"
                                        style={{ color: "black" }}
                                    >
                                        {screenWidth >= 991
                                            ? UserAddress
                                            : UserAddress.replace(
                                                UserAddress.substring(4, 36),
                                                "..."
                                            )}
                                    </a>
                                )}
                            </Button> : ""}
                            <Button onClick={() => {
                                handle_logout()
                            }} className="Logout-btn">Logout</Button>
                      </div>
                    </Container>
                </Navbar>
            </header>
        </>
    )
}