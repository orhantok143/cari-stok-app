// src/features/Gider/GiderAPI.js
import axios from 'axios';
import { baseUrl } from '../apiURL';
const API_URL = baseUrl
export const fetchGiderler = async () => {
  const res = await axios.get(`${API_URL}giderler`);
  return res.data;
};

export const createGider = async (data) => {
  const res = await axios.post(`${API_URL}giderler`, data);
  return res.data;
};

export const updateGider = async (id, data) => {
  const res = await axios.put(`${API_URL}giderler/${id}`, data);
  return res.data;
};

export const deleteGider = async (id) => {
  const res = await axios.delete(`${API_URL}giderler/${id}`);
  return res.data;
};
