import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { RoutesNames } from '../constants';
import { useNavigate } from 'react-router-dom';


export default function NavBar(){

    const navigate = useNavigate();

    return(
        <>
            <Navbar collapseOnSelect expand="lg" className="bg-body-tertiary">
            <Container>
                <Navbar.Brand 
                className='kursor'
                onClick={()=>navigate(RoutesNames.HOME)}
                >Teniska Liga</Navbar.Brand>
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse id="responsive-navbar-nav">
                <Nav className="me-auto">
                    <Nav.Link 
                    href="https://neispavani-001-site1.etempurl.com/swagger/index.html"
                    target='_blank'>API</Nav.Link>
                    
                    <NavDropdown title="Izbornik" id="collapsible-nav-dropdown">
                    <NavDropdown.Item 
                    onClick={()=>navigate(RoutesNames.NATJECATELJ_PREGLED)}
                    >Natjecatelji</NavDropdown.Item> 
                   <NavDropdown.Item 
                  onClick={()=>navigate(RoutesNames.SEZONA_PREGLED)}
                  >
                    Sezone
                  </NavDropdown.Item>
                  <NavDropdown.Item 
                  onClick={()=>navigate(RoutesNames.MEČ_PREGLED)}
                  >

                    Grupe
                  </NavDropdown.Item>
                    </NavDropdown>
                </Nav>              
                
                


                </Navbar.Collapse>
            </Container>
        </Navbar>
        </>
    );
}