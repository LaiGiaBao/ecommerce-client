import React, { useState, useEffect, useContext } from "react";
import CardProduct from "../Components/CardProduct";
import axios from "axios";
import MainLayout from "../Components/MainLayout";
import "../styles/card-product.css";
import { AuthContext } from "../helpers/AuthContext";
import { Link } from "react-router-dom";
function Home() {
  const [listOfProducts, setListOfProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const { searchText, authState } = useContext(AuthContext);
  useEffect(() => {
    if (authState.cartId !== 0) {
      window.location.reload();
    }
    axios
      .get("https://e-commerce-lgb.herokuapp.com/products")
      .then((response) => {
        setListOfProducts(response.data);
      });
    axios
      .get("https://e-commerce-lgb.herokuapp.com/categories")
      .then((response) => {
        setCategories(response.data);
      });
    console.log("authState", authState);
  }, []);
  const RenderProducts = () => {
    return categories.map((category) => {
      const listOfFilteredProducts = listOfProducts.filter(
        (product) => product.category === category.id.toString()
      );
      if (listOfFilteredProducts.length !== 0)
        return (
          <div key={category.id} className="product-list">
            <h2 class="text-center">{category.category}</h2>
            <div class="d-flex">
              <Link class="mx-auto" to={`/product/byCategory/${category.id}`}>
                <button class="btn btn-primary px-4 m-1 mx-auto">
                  <i class="fa fa-arrow-right"></i>
                </button>
              </Link>
            </div>

            <div class="items">
              {listOfFilteredProducts.map((product) => (
                <CardProduct product={product} key={product.id} />
              ))}
            </div>
          </div>
        );
    });
  };

  return (
    <MainLayout>
      <div className="content">
        {!searchText ? (
          <RenderProducts />
        ) : (
          listOfProducts
            .filter((product) =>
              product.name.toLowerCase().includes(searchText)
            )
            .map((filtered) => (
              <CardProduct product={filtered} key={filtered.id} />
            ))
        )}
      </div>
    </MainLayout>
  );
}

export default Home;
