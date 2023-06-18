 import axiosInstance from './axios';

class AuthApi {
  login(data) {
    return new Promise((resolve, reject) => {
      axiosInstance
        .post(`/user/signin`, data)
        .then((user) => {
          resolve(user);
        })
        .catch((error) => {
          reject(error.response.data);
        });
    });
  }
  
  register(data) {
    return new Promise((resolve, reject) => {
      axiosInstance
        .post(`/user/signup`, data)
        .then((user) => {
          resolve(user);
        })
        .catch((error) => {
          reject(console.log(error));
        });
    });
  }


}

export const authApi = new AuthApi();
