import React, { useState, useContext } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../helpers/AuthContext";

function Login() {
  let navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { setAuthState, authState, setIsLoading } = useContext(AuthContext);
  const login = () => {
    setIsLoading(true);
    setTimeout(()=>{

      const data = {
        username: username,
        password: password,
      };
      axios.post("http://localhost:3001/auth/login", data).then((response) => {
        if (response.data.error) {
          alert(response.data.error);
        } else {
          setAuthState({
            ...authState,
            username: response.data.username,
            id: response.data.id,
            fullname: response.data.fullname,
          })
          let { data: user } = response;
          console.log(user)
          localStorage.setItem("accessToken", user.token);
          if (user.cartStatus === 1) {
            axios
              .post(
                "http://localhost:3001/carts",
                {
                  UserId: user.id,
                  totalPrice: 0,
                },
                {
                  headers: {
                    accessToken: localStorage.getItem("accessToken"),
                  },
                }
              )
              .then((response) => {
                setAuthState({...authState, cartId: response.data.id, cartStatus: response.data.status});
                console.log(
                  "Create new Cart because the previous cart is completed"
                );
              });
          }
          else{
            setAuthState({
              ...authState,
              cartId: user.cartId,
              cartStatus: false,
            });
          }
          setIsLoading(false)
          navigate("/");
        }
      });
    },1000)
    
  };
  return (
    <div className="container-fluid h-custom">
      <div className="row d-flex justify-content-center align-items-center h-100">
        <div className="col-md-9 col-lg-6 col-xl-5">
          <img
            src="https://woobro.design/thumbnails/34/ecommerce-buy-vector-illustration-5de18f29f32c3.png"
            className="img-fluid p-5"
            alt="Sample image"
          ></img>
        </div>
        <div className="col-md-8 col-lg-6 col-xl-4 offset-xl-1">
          <div className="form-outline mb-4">
            <input
              type="text"
              className="form-control form-control-lg"
              placeholder="Enter username"
              onChange={(event) => {
                setUsername(event.target.value);
              }}
            />
          </div>

          <div className="form-outline mb-4">
            <input
              type="password"
              className="form-control form-control-lg"
              placeholder="Enter password"
              onChange={(event) => {
                setPassword(event.target.value);
              }}
            />
          </div>

          <div className="d-flex justify-content-between align-items-center">
            <div className="form-check mb-0">
              <input
                className="form-check-input me-2"
                type="checkbox"
                value=""
                id="form2Example3"
              />
              <label className="form-check-label h5" htmlFor="form2Example3">
                Remember me
              </label>
            </div>
            <a href="#!" className="text-body h6">
              Forgot password?
            </a>
          </div>

          <div className="text-center text-lg-start">
            <button
              className="btn btn-primary btn-lg btn-block mt-4 p-3 px-5"
              onClick={login}
            >
              {" "}
              LOGIN{" "}
            </button>
            <p className="h5 mt-2 pt-1 mb-0">
              Don't have an account?
              <a href="/register" className="link-danger text-decoration-none">
                {" "}
                Register
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
