import api from './api';
// Function to fetch products with filtering, sorting, paging, and searching
const getProducts = async ({ search, sortBy, sortOrder, minPrice, maxPrice, page, limit } = {}) => {
  try {
    // Construct query parameters and filter out the ones that are not provided
    const params = {
      ...(search && { title: search }),     // Add 'title' only if search is provided
      ...(sortBy && { sortBy }),            // Add 'sortBy' only if provided
      ...(sortOrder && { sortOrder }),      // Add 'sortOrder' only if provided
      ...(minPrice && { minPrice }),        // Add 'minPrice' only if provided
      ...(maxPrice && { maxPrice }),        // Add 'maxPrice' only if provided
      ...(page && { page }),                // Add 'page' only if provided
      ...(limit && { limit }),              // Add 'limit' only if provided
    };
    console.log("params");
    console.log(params);
    const response = await api.get('/api/products', { params });
    return response.data;
  } catch (error) {
    console.log(error);
    throw error.response?.data || error;
  }
};

const getProductDetails = async (productId) => {
    try {
        const response = await api.get(`/api/product/${productId}`);
        return response.data;
    } catch (error) {
        throw new Error(`Failed to get product details: ${error.message}`);
    }
};
const createNewProduct = async (title, description, price, imageUrl) => {
    try {
        const response = await api.post('/api/product', { title, description, price, imageUrl });
        return response.data;
    } catch (error) {
        throw error.response.data;
    }
};

const updateProductDetails = async (productId, title, description, price, imageUrl) => {
    try {
        const response = await api.put(`/api/product/${productId}`, { title, description, price, imageUrl });
        return response.data;
    } catch (error) {
        throw error.response.data;
    }
};

const deleteProduct = async (productId) => {
    try {
        const response = await api.delete(`/api/product/${productId}`);
        return response.data;
    } catch (error) {
        throw error.response.data;
    }
};

export { getProducts, getProductDetails, createNewProduct, updateProductDetails, deleteProduct };