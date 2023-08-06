import axiosInstance from './axios';

class DashboardApi {
  constructor() {
    this.basePath = '/api/v1/dashboard';
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


  getInfo() {
    return this.request('get', '/');
  }

 

}

export const dashboardApi = new DashboardApi();
