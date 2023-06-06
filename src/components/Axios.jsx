import axios from 'axios';

const newAxios = axios.create({
  baseURL: import.meta.env.VITE_SERVER,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  },
});

export default newAxios;
