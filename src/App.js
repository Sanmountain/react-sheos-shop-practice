import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { Navbar, Container, Nav, NavLink } from "react-bootstrap";
import { useState } from "react";
import data from "./data.js";
import { Routes, Route, Link, useNavigate, Outlet } from "react-router-dom";
import Detail from "./routes/Detail";
import axios from "axios";
import Cart from "./routes/Cart.js";

function App() {
  const [shoes, setShoes] = useState(data);

  const navigate = useNavigate();

  return (
    <div className="App">
      <Navbar bg="light" variant="light">
        <Container>
          <Navbar.Brand href="#home">ShoeShop</Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link
              onClick={() => {
                navigate("/");
              }}
            >
              Home
            </Nav.Link>
            <Nav.Link
              onClick={() => {
                navigate("/cart");
              }}
            >
              Cart
            </Nav.Link>
          </Nav>
        </Container>
      </Navbar>

      <Routes>
        <Route
          path="/"
          element={
            <>
              <div className="main-bg"></div>
              <div className="container">
                <div className="row">
                  {shoes.map((a, i) => {
                    return <Card shoes={shoes[i]} i={i + 1}></Card>;
                  })}
                </div>
              </div>
              <button
                onClick={() => {
                  axios
                    .get("https://codingapple1.github.io/shop/data2.json")
                    .then((res) => {
                      console.log(res.data);
                      let copy = [...shoes, ...res.data];
                      setShoes(copy);
                    });
                }}
              >
                상품더보기
              </button>
            </>
          }
        />
        <Route path="/detail/:id" element={<Detail shoes={shoes} />} />
        <Route path="*" element={<div>없는 페이지입니다.</div>} />
        <Route path="/cart" element={<Cart />} />
      </Routes>
    </div>
  );
}

function Card(props) {
  const navigate = useNavigate();
  return (
    <div className="col-md-4">
      <Nav.Link
        onClick={() => {
          navigate("/detail/" + props.i);
        }}
      >
        <img
          src={"https://codingapple1.github.io/shop/shoes" + props.i + ".jpg"}
          width="80%"
          alt="shoes1"
        />
      </Nav.Link>
      <h4>{props.shoes.title}</h4>
      <p>{props.shoes.content}</p>
      <p>{props.shoes.price}</p>
    </div>
  );
}

export default App;
