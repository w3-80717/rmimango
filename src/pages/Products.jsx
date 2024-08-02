import React, { useEffect, useState } from "react";
import "../components/Product.css"
//import data  from "./components/data/Data"
import * as productService from "../service/productService";
const Products = ({ productItems, handleAddProduct }) => {

  // product list state
  const [productList, setProductsList] = useState([]);
  // fetch all the products when the page loads
  useEffect(
    () => {
      productService.getAllProducts()
        .then((plist) => {
          console.log("Got list of products: ", plist);
          setProductsList(plist);
        }
        )
        .catch((err) => {
          console.error("error occured while fetching the products list: ", err);
        });
    },
    []
  );

  return (
    <div className="products">
      {productList.map((productItem) => (
        <div itemID={productItem.id} className="card">

          <div>
            <img
              className="product-image"
              src={productItem.image}
              alt={productItem.name} />
          </div>

          <div >
            <h3 className="product-name">{productItem.name}</h3>
          </div>

          <div >
            <h3 className="product-price">{productItem.price}</h3>
          </div>

          <div>
            <button className="product-add-button" onClick={() => handleAddProduct(productItem)}> Add to Cart</button>
          </div>
        </div>
      ))};
    </div>
  );
};

export default Products;



