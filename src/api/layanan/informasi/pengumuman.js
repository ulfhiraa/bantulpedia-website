// src/api/informasi/pengumuman.js
import axios from "axios";

const URL = "https://mock.apidog.com/m1/1132338-1124338-default/pengumuman";

export const getPengumuman = async () => {
  const res = await axios.get(URL);
  return Array.isArray(res.data) ? res.data : res.data.data || res.data.items || [];
};
