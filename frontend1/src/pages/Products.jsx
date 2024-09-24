import React, { useEffect, useState } from 'react';
import Card from '../components/Card'; // Import the Card component
import "./Products.css"; // Import CSS for styles
import * as productService from '../service/productService'; // Import service for API calls
import * as cartService from '../service/cartService'; // Import service for cart operations

const Products = ({ handleAddProduct }) => {
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState('');
  const [sortBy, setSortBy] = useState('id');
  const [sortOrder, setSortOrder] = useState('ASC');
  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');
  const [page, setPage] = useState(1); // Pagination state
  const [limit, setLimit] = useState(10); // Limit state

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const data = await productService.getProducts({
          search,
          sortBy,
          sortOrder,
          minPrice,
          maxPrice,
          page,
          limit,
        });
        setProducts(data);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    fetchProducts();
  }, [search, sortBy, sortOrder, minPrice, maxPrice, page, limit]);

  const handleAddToCart = async (productId) => {
    try {
      await cartService.addItemToCart(productId, 1); // Add product to cart
      alert('Product added to cart!');
    } catch (error) {
      console.error('Error adding product to cart:', error);
      alert('Failed to add product to cart');
    }
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
        <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
          <option value="id">ID</option>
          <option value="title">Title</option>
          <option value="price">Price</option>
        </select>
        <select value={sortOrder} onChange={(e) => setSortOrder(e.target.value)}>
          <option value="ASC">Ascending</option>
          <option value="DESC">Descending</option>
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

        {/* Pagination controls */}
        <div className="pagination">
          <button onClick={() => setPage((prev) => Math.max(prev - 1, 1))} disabled={page === 1}>
            Previous
          </button>
          <span>Page {page}</span>
          <button onClick={() => setPage((prev) => prev + 1)}>Next</button>
        </div>
        <select value={limit} onChange={(e) => setLimit(e.target.value)}>
          <option value={10}>10 per page</option>
          <option value={20}>20 per page</option>
          <option value={50}>50 per page</option>
        </select>
      </div>

      <div className="products-grid">
        {products.map((product) => (
          <Card
            key={product.id}
            title={product.title}
            description={product.description}
            imageUrl={product.imageUrl}
            price={product.price} // Add price as a prop
            onAddToCart={() => handleAddToCart(product.id)} // Handle add to cart
          />
        ))}
      </div>
    </div>
  );
};

export default Products;
