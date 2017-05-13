import axios from 'axios';

import config from 'config';
import AuthorizedToken from './authorized-token';

class AppApi {
  constructor() {
    this.instance = axios.create({
        baseURL: config.apiUrl,
      });

    this.instance.interceptors.response.use(response => {
        if (response.headers['access-token'] && response.headers['client'] && response.headers['uid']) {
          AuthorizedToken.storeCredentials(response.headers);
        }
        return response;
      }, error => {
        // Do something with response error
        return Promise.reject(error);
      });
  }

  ready() {
    if (AuthorizedToken.isCredentialStored()) {
      this.instance.defaults.headers.common['client'] = sessionStorage['client'];
      this.instance.defaults.headers.common['uid'] = sessionStorage['uid'];
      this.instance.defaults.headers.common['access-token'] = sessionStorage['access-token'];
    }

    return this.instance;
  }
}

const appApi = new AppApi;

export default appApi;
