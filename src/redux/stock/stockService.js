import axios from 'axios';
import { baseUrl } from '../apiURL';
const API_URL = baseUrl;

export const fetchStock = async () => {
  try {
    const res = await axios.get(`${API_URL}stock`);
    return res.data;
  } catch (error) {
    console.error("fetchStockler error:", error);
    throw error;
  }
};

export const createStock = async (data) => {
  try {
    const res = await axios.post(`${API_URL}stock`, data);
    return res.data;
  } catch (error) {
    console.error("createStock error:", error);
    throw error;
  }
};

export const updateStock = async (id, data) => {
  try {
    const res = await axios.put(`${API_URL}stock/${id}`, data);
    return res.data;
  } catch (error) {
    console.error("updateStock error:", error);
    throw error;
  }
};

export const deleteStock = async (id) => {
  try {
    const res = await axios.delete(`${API_URL}stock/${id}`);
    return res.data;
  } catch (error) {
    console.error("deleteStock error:", error);
    throw error;
  }
};
