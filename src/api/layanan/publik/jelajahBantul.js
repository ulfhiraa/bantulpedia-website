// src/api/layanan/publik/jelajahBantul.js
import axios from "axios";

// gunakan link mock Apidog kamu
const URL = "https://mock.apidog.com/m1/1132338-1124338-default/JelajahBantul";

export const getJelajahBantul = async () => {
  try {
    const res = await axios.get(URL);

    // Jika Apidog return langsung array
    if (Array.isArray(res.data)) return res.data;

    // Jika Apidog return {data:[...]}
    if (res.data?.data && Array.isArray(res.data.data)) return res.data.data;

    return [];
  } catch (error) {
    console.log("Gagal mengambil data Realisasi:", error.message);
    return [];
  }
};
