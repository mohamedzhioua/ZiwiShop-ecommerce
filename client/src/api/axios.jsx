import axios from 'axios';
import { authApi } from './authApi';
import { decodeToken } from '../utils/jwt_decode';

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  timeout: 60000,
  withCredentials: true,
});

axiosInstance.interceptors.request.use(
  (config) => {
    const userDetails = localStorage.getItem('userDetails');
    if (userDetails) {
      const user = JSON.parse(userDetails);
      const token = user.token;
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(console.log(error));
  }
);

axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    if (error.response) {
      const { status, config } = error.response;

      if (status === 401 && !config.prevRequest) {
        try {
          config.prevRequest = true;
          const AccessToken = await authApi.refresh();
          if (AccessToken) {
            // Update the token in localStorage
            const user = decodeToken(AccessToken)
            localStorage.setItem("userDetails", JSON.stringify(user));
            // Update Authorization header
            config.headers.Authorization = `Bearer ${AccessToken}`;
            // Retry the original request
            return axiosInstance(config);
          }

        } catch (_error) {
          return Promise.reject(_error);
        }
      }
      if (status === 401) {
        window.location = '/401';
      } else if (status === 403) {
        window.location = '/403';
      } else if (status === 500) {
        window.location = '/500';
      }
    }
    return Promise.reject(error);
  })
export default axiosInstance;


