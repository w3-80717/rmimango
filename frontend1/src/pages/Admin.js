import React, { useState, useEffect } from 'react';
import { Navigate } from 'react-router-dom'; // Updated from Redirect to Navigate
import { jwtDecode } from 'jwt-decode'; // Correctly importing jwtDecode
import { getProducts, createNewProduct, updateProductDetails, deleteProduct } from '../service/productService'; // Correct imports

const Admin = () => {
  const [products, setProducts] = useState([]);
  const [newProduct, setNewProduct] = useState({ title: '', description: '', price: '' });
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    checkAdminRole();
    fetchProducts();
  }, []);

  const checkAdminRole = () => {
    const token = localStorage.getItem('token');
    if (token) {
      const decodedToken = jwtDecode(token);
      if (decodedToken.isAdmin) {
        setIsAdmin(true);
      }
    }
  };

  const fetchProducts = async () => {
    const fetchedProducts = await getProducts();
    setProducts(fetchedProducts);
  };

  const handleAddProduct = async () => {
    await createNewProduct(newProduct);
    setNewProduct({ title: '', description: '', price: '' });
    fetchProducts();
  };

  const handleUpdateProduct = async (id, updatedData) => {
    await updateProductDetails(id, updatedData);
    fetchProducts();
  };

  const handleDeleteProduct = async (id) => {
    await deleteProduct(id);
    fetchProducts();
  };

  if (!isAdmin) {
    return <Navigate to="/" />; // Updated from Redirect to Navigate
  }

  return (
    <div>
      <h1>Admin Page - Manage Products</h1>

      {/* Add Product */}
      <h3>Add New Product</h3>
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
      <button onClick={handleAddProduct}>Add Product</button>

      {/* List Products */}
      <h3>All Products</h3>
      <ul>
        {products.map((product) => (
          <li key={product.id}>
            <span>{product.title} - ${product.price}</span>
            <button onClick={() => handleUpdateProduct(product.id, { title: 'Updated Title' })}>Update</button>
            <button onClick={() => handleDeleteProduct(product.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Admin;
