export default class Api {
  constructor(options) {
    this._baseUrl = options.baseUrl;
    this._headers = options.headers;
  }

  _request(url, options) {
    return fetch(url, options).then(this._checkResponse); // thenable takes refs
  }

  _checkResponse(res) {
    if (res.ok) return res.json(); // if successful, returns a user object
    return Promise.reject(`error ${res.status}`); // otherwise, output an error to .catch, which should properly return the rejected Promise to a .catch() outside the class in index.js
  }

  getUserProfileData() {
    // returns a Promise type object which is "thenable" to continue the async chain to go forward once the JSON object is retrieved from the server via the API call
    return this._request(`${this._baseUrl}/users/me`, {
      headers: this._headers,
    });
  }

  getInitialCards() {
    return this._request(`${this._baseUrl}/cards`, {
      headers: this._headers,
    });
  }

  getUserAndCards(promiseArray) {
    return Promise.all(promiseArray);
  }

  setUserProfileData(name, description) {
    return this._request(`${this._baseUrl}/users/me`, {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify({ name: name, about: description }),
    });
  }

  addNewCard(title, link) {
    return this._request(`${this._baseUrl}/cards`, {
      method: "POST",
      headers: this._headers,
      body: JSON.stringify({ name: title, link: link }),
    });
  }

  deleteCard(id) {
    return this._request(`${this._baseUrl}/cards/${id}`, {
      method: "DELETE",
      headers: this._headers,
    });
  }

  likeCard(id) {
    return this._request(`${this._baseUrl}/cards/${id}/likes`, {
      method: "PUT", // despite being "PUT", the server handles the boolean just fine w/out a body inside the request
      headers: this._headers,
    });
  }

  unlikeCard(id) {
    return this._request(`${this._baseUrl}/cards/${id}/likes`, {
      method: "DELETE",
      headers: this._headers,
    });
  }

  setUserProfileAvatar(avatar) {
    return this._request(`${this._baseUrl}/users/me/avatar`, {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify({ avatar: avatar }),
    });
  }
}
