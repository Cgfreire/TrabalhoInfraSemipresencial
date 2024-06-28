import { api } from './config';

export const getAllProducts = async (userId) => {
  const response = await api.get(`/users/${userId}/products`);
  const products = response.data;
  return products;
};

export const getProductById = async (userId, productId) => {
  const response = await api.get(`/users/${userId}/products/${productId}`);
  const product = response.data;
  return product;
};

export const createProduct = async (userId, productData) => {
  const response = await api.post(`/users/${userId}/products`, productData);
  const product = response.data;
  return product;
};

export const updateProduct = async (userId, productId, productData) => {
  const response = await api.put(`/users/${userId}/products/${productId}`, productData);
  const updatedProduct = response.data;
  return updatedProduct;
};

export const deleteProduct = async (userId, productId) => {
  const response = await api.delete(`/users/${userId}/products/${productId}`);
  return response.data;
};

export const getAllProductsIndependent = async () => {
  const response = await api.get('/productsall');
  const products = response.data;
  return products;
};
