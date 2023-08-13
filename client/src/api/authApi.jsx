import axiosInstance from './axios';

class AuthApi {
  constructor() {
    this.basePath = '/api/v1/auth';
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

  refresh() {
     return this.request('get', `/refresh` );
  }

  signup(data) {
    return this.request('post', '/signup', data);
  }

  emailverification(activationToken) {
     return this.request('post', `/emailverification?activationToken=${activationToken}`);
  }

  forgotPassword(data) {
     return this.request('post', '/forgotpassword' , data);
 }
 
 resetpassword(data) {
  return this.request('post',  `/resetpassword?resetPasswordToken=${data.resetPasswordToken}`, data);
}
Logout() {
  return this.request('post', '/logout');
}

}

export const authApi = new AuthApi();
