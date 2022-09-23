import axios from 'axios';
import React,{useEffect, useState} from 'react'

import CurrencyFormat from "react-currency-format";
function ProductManagement() {
    const [listOfProduct, setListOfProduct] = useState([]);
    useEffect(() => {
        axios.get("http://localhost:3001/products").then((response) => {
            setListOfProduct(response.data);
            console.log(response.data)
        })
    }, [])
    const deleteButton = (id) => {
        axios.delete(`http://localhost:3001/products/${id}`).then((response) => {
            window.location.reload()
        })
    }
  return (
    <div class="container-fluid h-custom w-75 mt-5">
    <h2 class="text-center display-2 mb-5">Products in Store</h2>
    <table class="table table-hover">
      <thead>
        <tr>
          <th class="h3">Product</th>
          <th class="h3">Quantity</th>
          <th class="h3">Price</th>
          <th></th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        {listOfProduct.map((details, index) => {
          return (
            <tr key={index}>
              <td class = "rounded py-3">
                <div class="row">
                  <div class="col-md-4 ">
                    <img class="rounded" style={{width: "100%", height: "100px", objectFit: "cover" }} src = {details.pictSource} alt=""></img>
                  </div>
                  <p class="col-md-8 h2 pt-4 mt-1"> {details.name}</p>
                </div>        
              </td>
              <td>
                <p class="h2 pt-1 mt-4">{details.quantity}</p>
              </td>
              <td>
                <div class="pt-1 mt-4">
                  <CurrencyFormat
                    value={details.price}
                    class= "h2"
                    displayType={"text"}
                    thousandSeparator={true}
                  />
                </div>
              </td>
              <td><button class="btn btn-primary btn-lg mt-4">Edit</button></td>
                <td><button class="btn btn-danger btn-lg mt-4" onClick={() => {deleteButton(details.id)}}>Delete</button></td>
                        
            </tr>
          );
        })}
      </tbody>
      <tfoot>
      </tfoot>
    </table>

   
  </div>
  )
}

export default ProductManagement