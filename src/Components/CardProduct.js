import React, { useContext, useState } from "react";
import "../styles/card-product.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { AuthContext } from "../helpers/AuthContext";
import CurrencyFormat from "react-currency-format";
const CardProduct = ({ product }) => {
  const { id, pictSource, name, price, colors, sizes } = product;
  const [isBought, SetIsBought] = useState(false);
  const [Quantity, SetQuantity] = useState(1);
  const listOfColors = colors.split(",");
  const listOfSizes = sizes.split(",");
  const { authState } = useContext(AuthContext);
  let navigate = useNavigate();
  const buyButton = () => {
    axios
      .get(
        `https://e-commerce-lgb.herokuapp.com/carts/latestByUserId/${authState.id}`
      )
      .then((response) => {
        let data = {
          ProductId: product.id,
          Price: product.price,
          Quantity: Quantity,
          CartId: response.data.id,
        };
        axios
          .post("https://e-commerce-lgb.herokuapp.com/cart-details", data)
          .then((response) => {
            alert("Added to Cart");
          });
      });
    SetIsBought(true);
  };

  const SetScroll = () => {
    const maxWordNum = 20; //There can be at max 20 letters in the title, anymore than that and we will have to scroll
    var offset = -1 * (product.name.length / maxWordNum - 1) * 100; //Get the offset
    if (offset > 0) offset = 0; //No need to scroll

    var secondPerOffset = 0.05;
    var duration = secondPerOffset * -1 * offset; //The greater the offset, the greater the duration

    document.documentElement.style.setProperty("--scroll-offset", offset + "%");
    document.documentElement.style.setProperty(
      "--scroll-duration",
      duration + "s"
    );
  };
  return (
    <div className="card mx-5">
      <div className="card_like">
        <i className="bx bx-heart"></i>
      </div>
      <div className="card_cart">
        <i className="bx bx-cart-alt"></i>
      </div>
      <div
        className="card_img"
        onClick={() => {
          navigate(`product/${id}`);
        }}
      >
        <img src={pictSource} alt="" />
      </div>
      <div className="card_title">
        <div class="scrollable_text" onMouseEnter={() => SetScroll()}>
          {name}
        </div>
      </div>
      <div className="card_price">
        {" "}
        <CurrencyFormat
          value={price}
          displayType={"text"}
          thousandSeparator={true}
          suffix={"đ"}
        />
      </div>
      <div className="card_size overflow-hidden">
        <h3>Size:</h3>
        {listOfSizes.map((size) => (
          <span key={size}>{size}</span>
        ))}
      </div>
      <div className="card_color">
        <h3>Color: </h3>
        {listOfColors.map((color) => (
          <span key={color} style={{ background: color }}></span>
        ))}
      </div>
      <div className="card_action">
        <input
          type="number"
          class="product_count"
          placeholder="1"
          min="1"
          max="10"
          onChange={(event) => SetQuantity(event.target.value)}
        ></input>

        {authState.status && (
          <button class="product_buy" onClick={buyButton} disabled={isBought}>
            Buy
          </button>
        )}
        <button
          class="product_details"
          onClick={() => {
            navigate(`/product/${id}`);
          }}
        >
          Detail
        </button>
      </div>
    </div>
  );
};
export default CardProduct;
