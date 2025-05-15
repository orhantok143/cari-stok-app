// src/features/gelir/gelirAPI.js
import axios from 'axios';
import { baseUrl } from '../apiURL';
const API_URL = baseUrl
export const fetchGelirler = async () => {
  const res = await axios.get(`${API_URL}gelirler`);
  return res.data;
};

export const createGelir = async (data) => {
  const res = await axios.post(`${API_URL}gelirler`, data);
  return res.data;
};

export const updateGelir = async (id, data) => {
  const res = await axios.put(`${API_URL}gelirler/${id}`, data);
  return res.data;
};

export const deleteGelir = async (id) => {
  const res = await axios.delete(`${API_URL}gelirler/${id}`);
  return res.data;
};
