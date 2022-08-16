import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';

function Header() {

    
  return (
    <section className='custom-header'>
        <Container>
            <Navbar bg="dark" expand="lg" ms-auto fixed="top">
            <Container>
                <Navbar.Brand href="#home"><img
                    src="assets/images/logo/logo.png"
                    width="30"
                    height="30"
                    className="d-inline-block align-top"
                    alt="React Bootstrap logo"
                    /></Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="ms-auto">
                    <Nav.Link href="" className="nav-link">Marketplace</Nav.Link>
                    <Nav.Link href="" className="nav-link">Collection</Nav.Link>
                    <Nav.Link href="" className="nav-link">Community</Nav.Link>
                    <Nav.Link href="" className="nav-link">Create</Nav.Link>
                    <Nav.Link href="" className='nav-btn connect-wallet'>Connect Wallet</Nav.Link>

                </Nav>
                </Navbar.Collapse>
            </Container>
            </Navbar>
        </Container>
    </section>
  );
}

export default Header;
