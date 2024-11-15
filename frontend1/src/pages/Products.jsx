import React, { useEffect, useState } from "react";
import Card from "../components/Card"; // Import the Card component
import "./Products.css"; // Import CSS for styles
import * as productService from "../service/productService"; // Import service for API calls

const Products = ({ handleAddProduct, handleUpdateQuantity, cartItems }) => {
  const [products, setProducts] = useState([]);
  const [cartItemsMod, setCartItemsMod] = useState({});
  const [search, setSearch] = useState("");
  const [prevSearch, setPrevSearch] = useState(""); // Track the previous search term
  const [sortBy, setSortBy] = useState("title"); // Change default sortBy to "title"
  const [sortOrder, setSortOrder] = useState("ASC");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [page, setPage] = useState(1); // Pagination state
  const [limit, setLimit] = useState(20); // Default limit
  const [filtersChanged, setFiltersChanged] = useState(false); // New state to track changes

  const fetchProductsAndCart = async (sortBy,sortOrder) => {
    try {
      const productData = await productService.getProducts({
        search,
        sortBy,
        sortOrder,
        minPrice,
        maxPrice,
        page,
        limit,
      });
      setSortBy(sortBy);
      setSortOrder(sortOrder);

      // Convert the cart array into an object for faster lookup
      const cartItemsModObject = cartItems.reduce((acc, item) => {
        acc[item.productId] = item;
        return acc;
      }, {});

      setProducts(productData);
      setCartItemsMod(cartItemsModObject);
    } catch (error) {
      console.error("Error fetching products and cart:", error);
    }
  };

  const handleApplyFilters = (sortByP,sortOrderP) => {
    fetchProductsAndCart(sortBy,sortOrder);
    setFiltersChanged(false); // Reset filters changed state after applying
    setPrevSearch(search); // Update previous search to current search
  };

  useEffect(() => {
    fetchProductsAndCart(); // Fetch initial products
  }, [page]); // Only run on page change

  // Handle changes in filter inputs
  useEffect(() => {
    setFiltersChanged(true); // Mark filters as changed when filter inputs change
  }, [search, minPrice, maxPrice]);

  // Handle sorting changes
  const handleSortChange = (e) => {
    let sorting = e.target.value.split("_");
    handleApplyFilters(sorting[0], sorting[1]); // Apply filters when sorting is changed
  };

  return (
    <div className="products-container">
      <h2>Our Products</h2>

      {/* Filters and Sorting */}
      <div className="filters">
        <input
          type="text"
          placeholder="Search by title"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <select value={sortBy+"_"+sortOrder} onChange={handleSortChange}>
          <option value="title_ASC">A-Z</option>
          <option value="title_DESC">Z-A</option>
          <option value="price_ASC">Price Low to High</option>
          <option value="price_DESC">Price High to Low</option>
        </select>
        <input
          type="number"
          placeholder="Min Price"
          value={minPrice}
          onChange={(e) => setMinPrice(e.target.value)}
        />
        <input
          type="number"
          placeholder="Max Price"
          value={maxPrice}
          onChange={(e) => setMaxPrice(e.target.value)}
        />
        <button 
          className="apply-button"
          onClick={()=>handleApplyFilters(sortBy,sortOrder)} 
          disabled={!filtersChanged} // Disable if filters haven't changed
        >
          Apply
        </button>
      </div>

      <div className="products-grid">
        {products.map((product) => (
          <Card
            key={product.id}
            cartItem={cartItemsMod[product.id]} // Pass the cart item to the card
            product={product}
            onAddToCart={handleAddProduct} // Handle add to cart
            onQuantityChange={(productId, newQuantity) =>
              handleUpdateQuantity(productId, newQuantity)
            } // Handle quantity changes
          />
        ))}
      </div>

      {/* Pagination controls */}
      <div className="pagination">
        <button
          onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
          disabled={page === 1}
        >
          Previous
        </button>
        <span>Page {page}</span>
        <button onClick={() => setPage((prev) => prev + 1)}>Next</button>
      </div>
    </div>
  );
};

export default Products;
