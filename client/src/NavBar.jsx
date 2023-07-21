import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";

const NavBar = () => {
  var acc_links;
  if (JSON.parse(localStorage.getItem("loggedin")) === true) {
    acc_links = (
      <NavDropdown title="Account" id="basic-nav-dropdown">
        <NavDropdown.Item href="/MainPage">Sign Out</NavDropdown.Item>
        <NavDropdown.Item href="/UpdateAccPage">
          Update Account Info
        </NavDropdown.Item>
      </NavDropdown>
    );
  } else {
    acc_links = (
      <NavDropdown title="Account" id="basic-nav-dropdown">
        <NavDropdown.Item href="/SigninPage">Sign In</NavDropdown.Item>
        <NavDropdown.Item href="/SignupPage">Sign Up</NavDropdown.Item>
      </NavDropdown>
    );
  }
  return (
    <Navbar expand="lg" className="bg-body-tertiary">
      <Container>
        <Navbar.Brand href="/MainPage">ToDoApp</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="/MainPage">Home</Nav.Link>
            <Nav.Link href="/TodoPage">Your ToDos</Nav.Link>
            {acc_links}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavBar;
