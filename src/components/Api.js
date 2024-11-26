export default class Api {
  constructor(options) {
    this._baseUrl = options.baseUrl;
    this._headers = options.headers;
  }

  getUserProfileData() {
    return fetch(`${this._baseUrl}/users/me`, {
      headers: this._headers,
    })
      .then((res) => {
        if (res.ok) return res.json();
        return Promise.reject(`error ${res.status}`);
      })
      .catch((err) => {
        console.error(err);
      });
  }

  getInitialCards() {}
}
