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
axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response) {
      const { status } = error.response;
      if (status === 401) {
        window.location = '/401'

      } else if (status === 403) {
        window.location = '/403'

      } else if (status === 500) {
        window.location = '/500'

      }
    }
   }
);

export default axiosInstance;
