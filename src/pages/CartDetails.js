import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { AuthContext } from "../helpers/AuthContext";
import axios from "axios";
import CurrencyFormat from "react-currency-format";
function CartDetails() {
  let { id } = useParams();
  const [cartDetails, setCartDetails] = useState([]);
  const { authState, setAuthState } = useContext(AuthContext);
  let totalPrice = 0;
  useEffect(() => {
    axios
      .get(`https://e-commerce-lgb.herokuapp.com/cart-details/byCartId/${id}`)
      .then((response) => {
        console.log(response.data);
        setCartDetails(response.data);
      });
  }, []);

  console.log(cartDetails);

  const updateDetailCart = (totalPrice) => {
    axios
      .put(
        `https://e-commerce-lgb.herokuapp.com/carts/totalPrice`,
        {
          totalPrice: totalPrice,
          cartId: id,
        },
        {
          headers: { accessToken: localStorage.getItem("accessToken") },
        }
      )
      .then(() => {
        cartDetails.map((details) => {
          axios
            .get(
              `https://e-commerce-lgb.herokuapp.com/products/byId/${details.id}`
            )
            .then((response) => {
              const remain = response.data.quantity - details.Quantity;
              if (remain < 0) {
                alert("this product is out of stock");
                return;
              }
              axios.put(
                `https://e-commerce-lgb.herokuapp.com/products/change-amount/${details.id}`,
                { quantity: remain, id: details.id }
              );
            });
        });
        setAuthState({ ...authState, cartStatus: true });
        alert("BUY SUCCESSFUL");
      });
  };
  const deleteProduct = (productId) => {
    axios
      .delete(
        `https://e-commerce-lgb.herokuapp.com/cart-details/${id}/${productId}`
      )
      .then(() => {
        setCartDetails(
          cartDetails.filter((detail) => {
            return detail.id !== id;
          })
        );
      })
      .then(() => window.location.reload());
  };
  return (
    <div class="container-fluid h-custom w-75 mt-5">
      <h2 class="text-center display-3 mb-5">Products in Cart</h2>
      <table class="table table-hover">
        <thead>
          <tr>
            <th class="h3">Product</th>
            <th class="h3">Quantity</th>
            <th class="h3">Price</th>
          </tr>
        </thead>
        <tbody>
          {cartDetails.map((details, index) => {
            totalPrice += details.Price * details.Quantity;
            return (
              <tr key={index}>
                <td class="rounded py-3">
                  <div class="row">
                    <div class="col-md-4 ">
                      <img
                        class="rounded"
                        style={{
                          width: "100%",
                          height: "100px",
                          objectFit: "cover",
                        }}
                        src={details.pictSource}
                        alt=""
                      ></img>
                    </div>
                    <span class="col-md-8 h-100 d-flex align-self-center h2 mt-1">
                      {details.name}
                    </span>
                  </div>
                </td>
                <td>
                  <p class="h2 pt-1 mt-4">{details.Quantity}</p>
                </td>
                <td>
                  <div class="pt-1 mt-4">
                    <CurrencyFormat
                      value={details.Price * details.Quantity}
                      class="h2"
                      displayType={"text"}
                      thousandSeparator={true}
                      suffix={"đ"}
                    />
                  </div>
                </td>
                {authState.cartStatus == false && authState.cartId == id && (
                  <td>
                    <button
                      class="btn btn-danger btn-lg mt-4"
                      onClick={() => {
                        deleteProduct(details.ProductId);
                      }}
                    >
                      X
                    </button>
                  </td>
                )}
              </tr>
            );
          })}
        </tbody>
        <tfoot>
          <tr>
            <td class="h3">Total Price:</td>
            <td></td>
            <td>
              <CurrencyFormat
                value={totalPrice}
                class="h2"
                displayType={"text"}
                thousandSeparator={true}
                suffix={"đ"}
              />
            </td>
            <td></td>
          </tr>
        </tfoot>
      </table>
      <div class="d-flex">
        {!authState.cartStatus && authState.cartId == id && (
          <button
            class="btn btn-primary btn-lg btn-block px-5 mx-auto mt-5 w-50 my-5"
            onClick={() => updateDetailCart(totalPrice)}
          >
            Confirm
          </button>
        )}
      </div>
    </div>
  );
}

export default CartDetails;
