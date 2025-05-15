import axios from 'axios';
import { baseUrl } from '../apiURL';
const API_URL = baseUrl;

export const fetchCariler = async () => {
  try {
    const res = await axios.get(`${API_URL}cariler`);
    return res.data;
  } catch (error) {
    console.error("fetchCariler error:", error);
    throw error;
  }
};

export const createCari = async (data) => {
  try {
    const res = await axios.post(`${API_URL}cariler`, data);
    return res.data;
  } catch (error) {
    console.error("createCari error:", error);
    throw error;
  }
};

export const updateCari = async (id, data) => {
  try {
    const res = await axios.put(`${API_URL}cariler/${id}`, data);
    return res.data;
  } catch (error) {
    console.error("updateCari error:", error);
    throw error;
  }
};

export const deleteCari = async (id) => {
  try {
    const res = await axios.delete(`${API_URL}cariler/${id}`);
    return res.data;
  } catch (error) {
    console.error("deleteCari error:", error);
    throw error;
  }
};
