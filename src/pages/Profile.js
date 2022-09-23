import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import dateFormat from "dateformat";


function Profile() {
  let navigate = useNavigate();
  let { id } = useParams();
  const [user, setUser] = useState({});
  const [listOfCarts, setListOfCarts] = useState([]);
  useEffect(() => {
    axios
      .get(`http://localhost:3001/auth/basic-info/${id}`)
      .then((response) => {
        setUser(response.data);
      });
    axios.get(`http://localhost:3001/carts/byUserId/${id}`).then((response) => {
      setListOfCarts(response.data);
    });
  }, []);
  return (
    <div className="container-fluid h-custom mt-5">
        <div class= "row d-flex justify-content-center align-items-center h-100 py-1 my-1">
          <div class= "col-md-3">
            <div className="basic-info h1 text-center">{user.username}</div>
            <img
              src="https://cdn-icons-png.flaticon.com/512/216/216221.png"
              class = "col-md-8 img-fluid rounded mx-auto d-block my-4"
              alt="Sample image"
            ></img>
            <div className="h6">Fullname </div>
            <div class = "h5 mb-4">{user.fullname}</div>
            <div className="h6">Email </div>
            <div class = "h5 mb-4">{user.email}</div>
            <div className="h6">Created since</div>
            <div class = "h5 mb-4">
              {dateFormat(user.createdAt, "dddd, mmmm dS, yyyy")}
            </div>
          </div>
        <div class= "col-md-6">
            <h2 class= "text-center display-4">List of your carts</h2>
            <table class="table table-hover mx-3">
              <thead >
                <tr>
                  <th class= "h4">ID</th>
                  <th class= "h4">Date Created</th>
                  <th class= "h4">Total Price</th>
                  <th class= "h4">Details</th>
                </tr>
              </thead>
              <tbody>
                {listOfCarts.map((cart) => (
                  <tr class= "rounded py-3">
                    <td class="align-middle h5">{cart.id}</td>
                    <td class="align-middle">
                      <span class= "h5">
                        {dateFormat(cart.createdAt, "dddd, mmmm dS, yyyy, h:MM:ss TT")}
                      </span>
                      
                    </td>
                    <td class="align-middle h5" >{cart.totalPrice}</td>
                    <td class="align-middle h5">
                      <button
                        type="button"
                        class="btn btn-primary px-4 m-3"
                        onClick={() => navigate(`/cart-details/${cart.id}`)}>
                        <i class="fa fa-arrow-right"></i>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
              
            </table>
        </div>
      </div>
      
     
     
    </div>
  );
}

export default Profile;
