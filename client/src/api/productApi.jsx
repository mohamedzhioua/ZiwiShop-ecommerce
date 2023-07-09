import axiosInstance from './axios';

class ProductApi {
  AddProduct(payload) {
    return new Promise((resolve, reject) => {
      axiosInstance
        .post(`/api/v1/product/add`, payload, {
          headers: { 'content-type': 'multipart/form-data' }
        })
        .then((response) => {
          resolve(response.data);
        })
        .catch((error) => {
          reject(error.response.data);
        });
    });
    
  }
  Getoptions(payload) {
    return new Promise((resolve, reject) => {
      axiosInstance
        .get(`/api/v1/product/options`, payload)
        .then((response) => {
          resolve(response.data);
        })
        .catch((error) => {
          reject(error.response.data);
        });
    });
    
  }
    
  // constructor() {
  //   this.basePath = '/api/v1/product';
  //   this.config = {
  //     headers: {
  //       'Content-Type': 'multipart/form-data',
  //     },
  //   }
  // }

  // request(method, url, data) {
  //   return new Promise((resolve, reject) => {
  //     axiosInstance[method](`${this.basePath}${url}`, data ,this.config)
  //       .then((response) => {
  //         resolve(response.data);
  //       })
  //       .catch((error) => {
  //         reject(error.response.data);
  //       });
  //   });
  // }
  // Getoptions() {
  //   return this.request('get', '/options');
  // }
  // GetProducts() {
  //   return this.request('get', '/');
  // }
  // GetOneProduct(id) {
  //   return this.request('get', `/${id}`);
  // }

  // AddProduct(data) {
  //   return this.request('post', '/add', data);
  // }

  // UpdateProduct(id, data) {
  //   return this.request('patch', `/${id}`, data);
  // }

  // DeleteProduct(id) {
  //   return this.request('delete', `/${id}`);
  // }
}

export const productApi = new ProductApi();
