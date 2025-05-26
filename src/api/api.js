import axios from 'axios';

const API = axios.create({
  baseURL: 'http://localhost:5000/api',
});

export const getProducts = () => API.get('/products');
export const createSale = (saleData) => API.post('/sales', saleData);

export default API;