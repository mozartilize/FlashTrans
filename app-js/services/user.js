import AuthorizedToken from './authorized-token';
import appApi from './app-api';

class User {
  static getCurrentUser() {
    if (AuthorizedToken.isCredentialStored()) {
      return appApi.ready().get('/auth/validate_token')
      .then((response) => {
        return response;
      })
      .catch((error) => {
        return Promise.reject(error);
      });
    }
    else {
      return new Promise((resolve, reject) => {
        resolve({data: {data: null}});
      });
    }
  }
}

export default User;
