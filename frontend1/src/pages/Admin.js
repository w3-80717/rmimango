import React, { useState, useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';
import { getProducts, createNewProduct, updateProductDetails, deleteProduct } from '../service/productService';
import './Admin.css';

const Admin = () => {
  const [products, setProducts] = useState([]);
  const [productToEdit, setProductToEdit] = useState(null); // Track which product is being edited
  const [newProduct, setNewProduct] = useState({ title: '', description: '', price: '', imageUrl: '' });
  const [showProductModal, setShowProductModal] = useState(false); // Control the product modal visibility
  const [showDeleteModal, setShowDeleteModal] = useState(false); // Control the delete modal visibility
  const [productToDelete, setProductToDelete] = useState(null); // Track which product is being deleted
  const [imageFile, setImageFile] = useState(null); // New state for image file

  // Check if user is admin
  const checkAdminRole = () => {
    const token = localStorage.getItem('token');
    if (token) {
      const decodedToken = jwtDecode(token);
      if (decodedToken.isAdmin) {
        return true;
      }
    }
    return false;
  };
  const [isAdmin] = useState(checkAdminRole());

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    const fetchedProducts = await getProducts();
    setProducts(fetchedProducts);
  };

  // Handle add or update product

  const handleAddOrUpdateProduct = async () => {
      const formData = new FormData();
      formData.append('title', newProduct.title);
      formData.append('description', newProduct.description);
      formData.append('price', newProduct.price);
    if (imageFile) {
      formData.append('image', imageFile); // Append the image file
        }
      if (productToEdit) {
        await updateProductDetails(productToEdit.id, formData);
      } else {
        await createNewProduct(formData);
      }
  
      setNewProduct({ title: '', description: '', price: '' }); // Clear form
      setImageFile(null); // Reset image file
      setProductToEdit(null); // Reset editing state
      setShowProductModal(false); // Close modal
      fetchProducts(); // Fetch products again after add/update
    };


  // Open Add Product Modal
  const openAddProductModal = () => {
    setProductToEdit(null); // Reset any product being edited
    setNewProduct({ title: '', description: '', price: '', imageUrl: '' }); // Clear form
    setImageFile(null); // Clear image file
    setShowProductModal(true); // Open modal for adding new product
  };

  // Populate form with product details for editing
  const handleEditProduct = (product) => {
    setProductToEdit(product);
    setNewProduct({
      title: product.title,
      description: product.description,
      price: product.price,
    });
    setImageFile(null); // Clear image file on edit
    setShowProductModal(true);
  };

  const handleDeleteProduct = async () => {
    await deleteProduct(productToDelete.id);
    setShowDeleteModal(false); // Close modal
    fetchProducts();
  };

  // Open Delete Modal
  const openDeleteModal = (product) => {
    setProductToDelete(product);
    setShowDeleteModal(true); // Open delete modal
  };

  // Cancel Product Modal
  const handleCancelProductModal = () => {
    setProductToEdit(null); // Reset editing state
    setShowProductModal(false); // Close modal
  };

  // Cancel Delete Modal
  const handleCancelDeleteModal = () => {
    setProductToDelete(null);
    setShowDeleteModal(false); // Close modal
  };

  if (!isAdmin) {
    return <Navigate to="/" />;
  }

  return (
    <div className="admin-container">
      <h1>Admin Page - Manage Products</h1>

      <button className="add-product-button" onClick={openAddProductModal}>
        Add Product
      </button>
        <ul className="product-list">
        {products.map((product) => (
          <li key={product.id}>
            <img src={product.imageUrl} alt={product.title} className="product-image" />
            <span>{product.title} - ₹ {product.price}</span>
            <button onClick={() => handleEditProduct(product)}>Edit</button>
            <button onClick={() => openDeleteModal(product)}>Delete</button>
          </li>
        ))}
      </ul>

      {/* Add or Edit Product Modal */}
      {showProductModal && (
        <div className="modal">
          <div className="modal-content">
            <h3>{productToEdit ? 'Edit Product' : 'Add New Product'}</h3>
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
              onChange={(e) => setImageFile(e.target.files[0])} // Handle file upload
            />
            <button onClick={handleAddOrUpdateProduct}>
              {productToEdit ? 'Update Product' : 'Add Product'}
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
