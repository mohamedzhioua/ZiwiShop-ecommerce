import axiosInstance from './axios';

class OrderApi {
  constructor() {
    this.basePath = 'api/v1/order';
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

  CreateOrder(data) {
     return this.request('post', '/', data);
  }
 
  GetOneOrder(id) {
    return this.request('get', `/${id}`);
  }
}

export const orderApi = new OrderApi();
