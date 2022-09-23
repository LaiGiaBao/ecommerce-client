import React, {  useState, useContext } from "react";
import {
  Navbar,
  Nav,
  NavDropdown,
  Form,
  FormControl,
  Button,
  Container,
} from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  solid,

} from "@fortawesome/fontawesome-svg-core/import.macro";
import "../styles/navbar.css";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../helpers/AuthContext";
const NavBarComp = () => {
  const { setSearchText } = useContext(AuthContext);
  const { authState, setAuthState } = useContext(AuthContext);
  const { admin } = useContext(AuthContext);
  const [inputText, setInputText] = useState("");
  const navigate = useNavigate();
  const logOut = () => {
    localStorage.removeItem("accessToken");
    setAuthState({
      ...authState,
      username: "",
      id: 0,
      fullname: "",
      status: false,
    });
    navigate("/");
  };

  return (
    <Navbar className="navbar" variant={"dark"} expand="lg">
      <Container fluid>
        <Navbar.Brand href="/" style={{ fontSize: "30px", fontWeight: "bold" }}>
          Shopping
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Nav
            className="me-auto my-2 my-lg-0 justify-content-end"
            style={{ maxHeight: "100px" }}
            navbarScroll
          >
            <Nav.Link
              href="/"
              className="nav-link"
              style={{ color: "white", fontSize: "20px" }}
            >
              <FontAwesomeIcon icon={solid("house")} />
            </Nav.Link>
            <Form className="d-flex">
              <FormControl
                type="search"
                placeholder="Search"
                className="mx-2"
                aria-label="Search"
                name="searchInput"
                style={{ width: "300px" }}
                onChange={(event) => {
                  setInputText(event.target.value);
                }}
                onKeyPressCapture={(e) => {
                  if(e.key==="Enter") {
                    console.log(inputText.toLowerCase())
                    setSearchText(inputText.toLowerCase());
                  }
                }}
              />
              <Button
                variant="outline-light"
                onClick={() => {
                  console.log(inputText.toLowerCase());
                  setSearchText(inputText.toLowerCase());
                }}
              >
                Search
              </Button>
            </Form>
          </Nav>
          {!authState.status ? (
            <Nav>
              <Nav.Item>
                <Nav.Link href="/register" className="">
                  Sign-Up
                </Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link href="/login" className="">
                  Login
                </Nav.Link>
              </Nav.Item>
            </Nav>
          ) : (
            <Nav>
              <Nav.Link
                href={`/cart-details/${authState.cartId}`}
                style={{ fontSize: "18px", marginRight: "8px" }}
              >
                <FontAwesomeIcon
                  icon={solid("cart-shopping")}
                ></FontAwesomeIcon>
              </Nav.Link>
              <NavDropdown
                title={
                  <span>
                    <FontAwesomeIcon icon={solid("user")}></FontAwesomeIcon>
                    &nbsp; Hello, {authState.fullname.split(" ")[0]}
                  </span>
                }
                id="basic-nav-dropdown"
                style={{
                  color: "white",
                  fontSize: "18px",
                  marginRight: "12px",
                }}
              >
                <NavDropdown.Item
                  onClick={() => {
                    navigate(`./profile/${authState.id}`);
                  }}
                >
                  Profile
                </NavDropdown.Item>
                {authState.username===admin &&<NavDropdown.Item href="/addproduct">
                  Add Product
                </NavDropdown.Item>}
                {authState.username===admin &&<NavDropdown.Item href="/product-manage">
                  Manage Product
                </NavDropdown.Item>}
                <NavDropdown.Divider />
                <NavDropdown.Item
                  onClick={() => {
                    logOut();
                  }}
                >
                  Log out
                </NavDropdown.Item>
              </NavDropdown>
            </Nav>
          )}
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};
export default NavBarComp;
