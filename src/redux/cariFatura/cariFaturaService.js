import axios from 'axios';
import { baseUrl } from '../apiURL';
const API_URL = baseUrl;

export const fetchCariFatura = async () => {
  try {
    const res = await axios.get(`${API_URL}cariFatura`);
    return res.data;
  } catch (error) {
    console.error("fetchcariFatura error:", error);
    throw error;
  }
};

export const createCariFatura = async (data) => {
  try {
    const res = await axios.post(`${API_URL}cariFatura`, data);
    return res.data;
  } catch (error) {
    console.error("createCari error:", error);
    throw error;
  }
};

export const updateCariFatura = async (id, data) => {
  try {
    const res = await axios.put(`${API_URL}cariFatura/${id}`, data);
    return res.data;
  } catch (error) {
    console.error("updateCari error:", error);
    throw error;
  }
};

export const deleteCariFatura = async (id) => {
  try {
    const res = await axios.delete(`${API_URL}cariFatura/${id}`);
    return res.data;
  } catch (error) {
    console.error("deleteCari error:", error);
    throw error;
  }
};
