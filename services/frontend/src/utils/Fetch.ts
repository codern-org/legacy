import axios from 'axios';
import { route } from 'preact-router';

const fetch = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  withCredentials: true
});

axios.interceptors.response.use(
  (response) => response,
  (error) => {
    if (axios.isAxiosError(error) && error.status === 401) {
      route('/');
    }
    return Promise.reject(error);
  },
);

export { fetch };
