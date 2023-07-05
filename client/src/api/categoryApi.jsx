import axiosInstance from './axios';

class CategoryApi {
  constructor() {
    this.basePath = '/api/v1/category';
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

  GetCategories() {
    return this.request('get', '/');
  }
  GetOneCategory(id) {
    return this.request('get', `/${id}`);
  }

  AddCategory(data) {
    return this.request('post', '/add', data);
  }

  UpdateCategory(id, data) {
    return this.request('patch', `/${id}`, data);
  }

  DeleteCategory(id) {
    return this.request('delete', `/${id}`);
  }
}

export const categoryApi = new CategoryApi();
