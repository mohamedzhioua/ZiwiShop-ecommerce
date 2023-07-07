import axiosInstance from './axios';

class BrandApi {
  constructor() {
    this.basePath = '/api/v1/brand';
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

  GetBrands() {
    return this.request('get', '/');
  }
  GetOneBrand(id) {
    return this.request('get', `/${id}`);
  }

  AddBrand(data) {
    return this.request('post', '/add', data);
  }

  UpdateBrand(id, data) {
    return this.request('patch', `/${id}`, data);
  }

  DeleteBrand(id) {
    return this.request('delete', `/${id}`);
  }
}

export const brandApi = new BrandApi();
