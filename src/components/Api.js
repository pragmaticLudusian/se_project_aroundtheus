export default class Api {
  constructor(options) {
    this._baseUrl = options.baseUrl;
    this._headers = options.headers;
  }

  getUserProfileData() {
    // returns a Promise type object which is "thenable" to continue the async chain to go forward once the JSON object is retrieved from the server via the API call
    return fetch(`${this._baseUrl}/users/me`, {
      headers: this._headers,
    })
      .then((res) => {
        if (res.ok) return res.json(); // if successful, returns a user object
        return Promise.reject(`error ${res.status}`); // otherwise, output an error to .catch
      })
      .catch((err) => {
        console.error(err);
      });
  }

  setUserProfileData() {}

  getInitialCards() {}
}
