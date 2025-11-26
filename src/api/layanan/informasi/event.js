// src/api/layanan/informasi/event.js
import axios from "axios";

const URL = "https://mock.apidog.com/m1/1132338-1124338-default/event";

export const getEvent = async () => {
  const res = await axios.get(URL);

  if (Array.isArray(res.data)) return res.data;

  if (res.data?.data && Array.isArray(res.data.data)) {
    return res.data.data;
  }

  return [];
};
