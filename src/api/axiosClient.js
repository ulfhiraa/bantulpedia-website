// src/api/axiosClient.js
import axios from "axios";

const axiosClient = axios.create({
  headers: { "Accept": "application/json" },
  timeout: 15000,
});

export default axiosClient;
