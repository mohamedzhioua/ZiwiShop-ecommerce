import axiosInstance from './axios';

class PaymentApi {
  constructor() {
    this.basePath = '/api/v1/payment';
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

  getstripeapikey() {
    return this.request('get', '/stripeapikey');
  }
  paymentProcess(totalPrice) {
    return this.request('post', '/create-payment-intent',{totalPrice});
  }
}

export const paymentApi = new PaymentApi();
