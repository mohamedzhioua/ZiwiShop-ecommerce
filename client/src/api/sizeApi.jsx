import axiosInstance from './axios';

class SizeApi {
  constructor() {
    this.basePath = '/api/v1/size';
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


}

export const sizeApi = new SizeApi();
