import React, { useState, useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';
import { getProducts, createNewProduct, updateProductDetails, deleteProduct } from '../service/productService';
import './Admin.css';

const Admin = () => {
  const [products, setProducts] = useState([]);
  const [newProduct, setNewProduct] = useState({ title: '', description: '', price: '', imageUrl: '' });
  const [showProductModal, setShowProductModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [productToDelete, setProductToDelete] = useState(null);
  const [imageFile, setImageFile] = useState(null);
  const [search, setSearch] = useState("");
  const [sortBy, setSortBy] = useState("title");
  const [sortOrder, setSortOrder] = useState("ASC");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5); // Number of items per page

  // Check if user is admin
  const checkAdminRole = () => {
    const token = localStorage.getItem('token');
    if (token) {
      const decodedToken = jwtDecode(token);
      return decodedToken.isAdmin ? true : false;
    }
    return false;
  };

  const [isAdmin] = useState(checkAdminRole());

  useEffect(() => {
    fetchProducts(); // Fetch products on initial load or when filters change
  }, [currentPage, search, sortBy, sortOrder]); // Dependencies include currentPage, search, sortBy, sortOrder

  const fetchProducts = async () => {
    const fetchedProducts = await getProducts({
      search,
      sortBy,
      sortOrder,
      page: currentPage,
      limit: itemsPerPage
    });
    setProducts(fetchedProducts); // Update products with the response
  };

  const handleAddOrUpdateProduct = async () => {
    const formData = new FormData();
    formData.append('title', newProduct.title);
    formData.append('description', newProduct.description);
    formData.append('price', newProduct.price);
    if (imageFile) {
      formData.append('image', imageFile);
    }
    if (newProduct.id) {
      await updateProductDetails(newProduct.id, formData);
    } else {
      await createNewProduct(formData);
    }

    setNewProduct({ title: '', description: '', price: '' });
    setImageFile(null);
    setShowProductModal(false);
    fetchProducts(); // Fetch products again after add/update
  };

  // Open Add Product Modal
  const openAddProductModal = () => {
    setNewProduct({ title: '', description: '', price: '' });
    setImageFile(null);
    setShowProductModal(true);
  };

  const handleDeleteProduct = async () => {
    await deleteProduct(productToDelete.id);
    setShowDeleteModal(false);
    fetchProducts(); // Fetch products again after deletion
  };

  // Open Delete Modal
  const openDeleteModal = (product) => {
    setProductToDelete(product);
    setShowDeleteModal(true);
  };

  // Cancel Product Modal
  const handleCancelProductModal = () => {
    setShowProductModal(false);
  };

  // Cancel Delete Modal
  const handleCancelDeleteModal = () => {
    setProductToDelete(null);
    setShowDeleteModal(false);
  };

  if (!isAdmin) {
    return <Navigate to="/" />;
  }

  return (
    <div className="admin-container">
      <h1>Admin Page - Manage Products</h1>

      {/* Search and Sorting Controls */}
      <div className="admin-filters">
        <input
          type="text"
          placeholder="Search by title"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
          <option value="title">Sort by Title</option>
          <option value="price">Sort by Price</option>
        </select>
        <select value={sortOrder} onChange={(e) => setSortOrder(e.target.value)}>
          <option value="ASC">Ascending</option>
          <option value="DESC">Descending</option>
        </select>
        <button onClick={() => fetchProducts()}>Search</button> {/* Trigger search */}
      </div>

      <button className="add-product-button" onClick={openAddProductModal}>
        Add Product
      </button>
      <ul className="product-list">
        {products.map((product) => (
          <li key={product.id}>
            <img src={product.imageUrl} alt={product.title} className="product-image" />
            <span>{product.title} - ₹ {product.price}</span>
            <button onClick={() => setNewProduct(product)}>Edit</button>
            <button onClick={() => openDeleteModal(product)}>Delete</button>
          </li>
        ))}
      </ul>

      {/* Pagination Controls */}
      <div className="pagination">
        <button 
          onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))} 
          disabled={currentPage === 1}
        >
          Previous
        </button>
        <span>Page {currentPage}</span>
        <button 
          onClick={() => setCurrentPage(prev => prev + 1)} // Increment current page for the next button
        >
          Next
        </button>
      </div>

      {/* Add or Edit Product Modal */}
      {showProductModal && (
        <div className="modal">
          <div className="modal-content">
            <h3>{newProduct.id ? 'Edit Product' : 'Add New Product'}</h3>
            <input
              type="text"
              placeholder="Title"
              value={newProduct.title}
              onChange={(e) => setNewProduct({ ...newProduct, title: e.target.value })}
            />
            <input
              type="text"
              placeholder="Description"
              value={newProduct.description}
              onChange={(e) => setNewProduct({ ...newProduct, description: e.target.value })}
            />
            <input
              type="number"
              placeholder="Price"
              value={newProduct.price}
              onChange={(e) => setNewProduct({ ...newProduct, price: e.target.value })}
            />
            <input
              type="file"
              onChange={(e) => setImageFile(e.target.files[0])}
            />
            <button onClick={handleAddOrUpdateProduct}>
              {newProduct.id ? 'Update Product' : 'Add Product'}
            </button>
            <button onClick={handleCancelProductModal}>Cancel</button>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {showDeleteModal && (
        <div className="modal">
          <div className="modal-content">
            <h3>Are you sure you want to delete this product?</h3>
            <button onClick={handleDeleteProduct}>Yes, Delete</button>
            <button onClick={handleCancelDeleteModal}>Cancel</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Admin;
