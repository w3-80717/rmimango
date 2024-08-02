import React from "react";
import "../components/Product.css"
//import data  from "./components/data/Data"
const Products = ({ productItems, handleAddProduct}) => {
  return (
    <div className="products">
      {productItems.map((productItem) => (
        <div className="card">

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



