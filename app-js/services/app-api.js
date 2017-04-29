import axios from 'axios';

import config from 'config';
import AuthorizedToken from './authorized-token';

class AppApi {
  constructor() {
    this.instance = axios.create({
        baseURL: config.apiUrl,
      });


    // FIXME: does it not work with post's response?
    this.instance.interceptors.response.use(response => {
        console.log(`fuck, i run everytime your request done, status ${response.status}`);
        console.log(response);
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

    console.log(`I'm ready, ${this.instance.defaults.headers.common['access-token']}, ${this.instance.defaults.headers.common['client']}`)
    return this.instance;
  }
}

const appApi = new AppApi;

export default appApi;
