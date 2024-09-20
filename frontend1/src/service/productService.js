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
        const response = await api.get(`/api/products/${productId}`);
        return response.data;
    } catch (error) {
        throw new Error(`Failed to get product details: ${error.message}`);
    }
};
const createNewProduct = async (formData) => {
  try {
    let token = api.getToken();
    let headers = {
      'Authorization': 'Bearer ' + token
    };
    const response = await api.post('/api/products', formData, { headers });
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

const updateProductDetails = async (productId, formData) => {
  try {
    let token = api.getToken();
    let headers = {
      'Authorization': 'Bearer ' + token
    };
    const response = await api.put(`/api/products/${productId}`, formData, { headers });
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

const deleteProduct = async (productId) => {
    try {
      let token = api.getToken();
      let headers = {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token
      };
        const response = await api.delete(`/api/products/${productId}`,{headers});
        return response.data;
    } catch (error) {
        throw error.response.data;
    }
};

export { getProducts, getProductDetails, createNewProduct, updateProductDetails, deleteProduct };