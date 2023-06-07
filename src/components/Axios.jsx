import axios from 'axios';

const newAxios = axios.create({
  baseURL: import.meta.env.VITE_SERVER || "http://localhost:8080",
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

export default newAxios;
