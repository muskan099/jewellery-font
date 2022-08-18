import { Row, Col, Container,Nav,Button,Navbar,NavDropdown } from "react-bootstrap";


function Header() {

    
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
                 <Button className="nav-btn gradient-btn">Connect Wallet</Button>
                 <Navbar.Toggle aria-controls="basic-navbar-nav" />
            </Navbar>
               </Col>
            </Row>
        </Container>
    </header>
  );
}

export default Header;
