class AuthorizedToken {
  static storeCredentials(credentials) {
    console.log('request done, i must to save credentials');
    this.storeClientToken(credentials['client']);
    this.storeAccessToken(credentials['access-token']);
    this.storeUId(credentials['uid']);
  }

  static storeAccessToken(token) {
    sessionStorage.setItem('access-token', token);
  }

  static storeClientToken(token) {
    sessionStorage.setItem('client', token);
  }

  static storeUId(uid) {
    sessionStorage.setItem('uid', uid);
  }

  static isCredentialStored() {
    return sessionStorage['client'] !== undefined &&
           sessionStorage['access-token'] !== undefined &&
           sessionStorage['uid'] !== undefined
  }

  static removeCredentials() {
    sessionStorage.removeItem('client');
    sessionStorage.removeItem('uid');
    sessionStorage.removeItem('access-token');
  }
}

export default AuthorizedToken;
