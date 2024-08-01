// src/axios.js
import axios from "axios";

// Konfigurasi dasar untuk Axios
const instance = axios.create({
  baseURL: "http://localhost:2000", // URL dasar API Anda
  timeout: 1000, // Timeout request
});

export default instance;
