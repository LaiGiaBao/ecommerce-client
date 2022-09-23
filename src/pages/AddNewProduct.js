import React, { useEffect, useState, useContext } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import axios from "axios";
import * as Yup from "yup";
import "../styles/add-product.css";
import { AuthContext } from "../helpers/AuthContext";
import { useNavigate, Navigate } from "react-router-dom";
function AddNewProduct() {
  const [categories, setCategories] = useState([]);
  const [productImg, setProductImg] = useState("");
  const navigate = useNavigate();
  const { authState, admin } = useContext(AuthContext);
  useEffect(() => {
    axios
      .get("https://e-commerce-lgb.herokuapp.com/categories")
      .then((response) => {
        setCategories(response.data);
      });
  }, []);
  console.log(categories);
  const initialValues = {
    name: "",
    category: "",
    price: "",
    sizes: "",
    colors: "",
    pictSource: "",
    description: "",
  };
  const validationSchema = Yup.object().shape({
    name: Yup.string().required(),
    category: Yup.string().required(),
    price: Yup.number()
      .required()
      .positive()
      .integer(),
    sizes: Yup.string(),
    pictSource: Yup.string().url(),
    description: Yup.string(),
    quantity: Yup.number()
      .required()
      .positive()
      .integer(),
  });

  const onSubmit = (data) => {
    axios
      .post("https://e-commerce-lgb.herokuapp.com/products", data)
      .then((response) => {
        console.log("Product has been uploaded");
        console.log(data);
        alert("Product added");
      });
  };

  const OnFormChange = (data) => {
    if (data.name == "pictSource") {
      setProductImg(data.value);
    }
  };
  if (authState.username != admin) return <h1>Not Found</h1>;
  return (
    <div className="container-fluid h-custom">
      <div className="row d-flex justify-content-center align-items-center h-100 py-5">
        <div className="col-md-5 p-5">
          <Formik
            initialValues={initialValues}
            onSubmit={onSubmit}
            validation={validationSchema}
          >
            <Form onChange={(event) => OnFormChange(event.target)}>
              <div className="">
                <label htmlFor="name">Name:</label>
                <ErrorMessage name="name" component="span" />
                <Field
                  className="form-control form-control-lg"
                  placeholder="Product Name"
                  id="inputCreatePost"
                  name="name"
                ></Field>

                <label htmlFor="description">Description:</label>
                <ErrorMessage name="description" component="span" />
                <Field
                  className="form-control form-control-lg"
                  placeholder="Description"
                  id="inputCreatePost"
                  name="description"
                  as="textarea"
                ></Field>
              </div>

              <div className="col-md-4 py-4">
                <label>Price:</label>
                <ErrorMessage name="price" component="span" />
                <Field
                  className="form-control form-control-lg"
                  placeholder="Price"
                  id="inputCreatePost"
                  name="price"
                ></Field>
                <label>Quantity:</label>
                <ErrorMessage name="quantity" component="span" />
                <Field
                  className="form-control form-control-lg"
                  placeholder="Quantity"
                  id="inputCreatePost"
                  name="quantity"
                ></Field>
              </div>

              <label htmlFor="pictSource">PictSource:</label>
              <ErrorMessage name="pictSource" component="span" />
              <Field
                className="form-control form-control-lg"
                placeholder="Picture Source"
                id="inputCreatePost"
                name="pictSource"
              ></Field>

              <div className="row py-3 pb-5">
                <div className="col-md-4">
                  <label>Category:</label>
                  <ErrorMessage name="category" component="span" />
                  <Field
                    className="form-control form-control-lg"
                    id="inputCreatePost"
                    name="category"
                    component="select"
                  >
                    <option value="" label="Select a category"></option>
                    {categories.map((category) => (
                      <option
                        value={category.id}
                        key={category.id}
                        label={category.category}
                      ></option>
                    ))}
                  </Field>
                </div>

                <div className="col-md-4">
                  <label htmlFor="size">Sizes:</label>
                  <ErrorMessage name="sizes" component="span" />
                  <Field
                    className="form-control form-control-lg"
                    placeholder="Sizes"
                    id="inputCreatePost"
                    name="sizes"
                  ></Field>
                </div>

                <div className="col-md-4">
                  <label htmlFor="colors">Colors:</label>
                  <ErrorMessage name="colors" component="span" />
                  <Field
                    className="form-control form-control-lg"
                    placeholder="Color"
                    id="inputCreatePost"
                    name="colors"
                  ></Field>
                </div>
              </div>

              <div className="col-md-5 mx-auto">
                <button
                  className="btn btn-primary btn-lg btn-block p-3 px-5"
                  type="submit"
                >
                  CREATE PRODUCT
                </button>
              </div>
            </Form>
          </Formik>
        </div>
        <div className="col-md-5">
          <h2 className="text-center"> Product preview </h2>
          <div className="col-md-12">
            <img
              className="img-fluid mx-auto d-block w-75"
              src={productImg}
              alt=""
            ></img>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AddNewProduct;
