import axiosInstance from './axios';

class ProductApi {
  constructor() {
    this.basePath = '/api/v1/product';
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
  Getoptions() {
    return this.request('get', '/options');
  }
  GetSizes() {
    return this.request('get', '/');
  }
  GetOneSize(id) {
    return this.request('get', `/${id}`);
  }

  AddSize(data) {
    return this.request('post', '/add', data);
  }

  UpdateSize(id, data) {
    return this.request('patch', `/${id}`, data);
  }

  DeleteSize(id) {
    return this.request('delete', `/${id}`);
  }
}

export const productApi = new ProductApi();
