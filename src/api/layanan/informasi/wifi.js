// src/api/layanan/informasi/wifi.js
import axios from "axios";

const URL = "https://mock.apidog.com/m1/1132338-1124338-default/wi-fi";

export const getWifi = async () => {
  const res = await axios.get(URL);

  if (Array.isArray(res.data)) return res.data;

  if (res.data?.data && Array.isArray(res.data.data)) {
    return res.data.data;
  }

  return [];
};
