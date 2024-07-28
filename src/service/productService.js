import api from './api';


const getAllProducts = async () => {
    try {
        const response = await api.get('/api/products');
        return response.data;
    } catch (error) {
        throw error.response.data;
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

export { getAllProducts, getProductDetails, createNewProduct, updateProductDetails, deleteProduct };