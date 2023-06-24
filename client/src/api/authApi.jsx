import axiosInstance from './axios';

class AuthApi {
  constructor() {
    this.basePath = '/user';
  }

  request(method, url, data) {
    return new Promise((resolve, reject) => {
      axiosInstance[method](`${this.basePath}${url}`, data)
        .then((response) => {
          resolve(response.data);
        })
        .catch((error) => {
          reject(error.message);
        });
    });
  }


  login(data) {
    return this.request('post', '/signin', data);
  }

  facebookLogin(data) {
    return this.request('post', '/facebookLogin', data);
  }

  googleLogin(idToken) {
    return this.request('post', '/googleLogin', idToken);
  }

  register(data) {
    return this.request('post', '/signup', data);
  }

}

export const authApi = new AuthApi();
