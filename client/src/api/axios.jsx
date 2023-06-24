import axios from 'axios';
  
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

export default axiosInstance;
