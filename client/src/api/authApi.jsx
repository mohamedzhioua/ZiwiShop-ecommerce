import axiosInstance from './axios';

class AuthApi {
  constructor() {
    this.basePath = '/api/v1/user';
  }

  request(method, url, data) {
    return new Promise((resolve, reject) => {
      axiosInstance[method](`${this.basePath}${url}`, data)
        .then((response) => {
          resolve(response.data);
        })
        .catch((error) => {
          reject(error.response.data);
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

  signup(data) {
    return this.request('post', '/signup', data);
  }

  emailverification(activationToken) {
     return this.request('post', `/emailverification?activationToken=${activationToken}`);
  }
  forgotPassword(data) {
     return this.request('post', '/resetpassword' , data);
 }

}

export const authApi = new AuthApi();
