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
        return Promise.reject(`error ${res.status} while getting user data`); // otherwise, output an error to .catch
      })
      .catch((err) => {
        return Promise.reject(err); // properly return a rejected Promise state
      });
  }

  getInitialCards() {
    return fetch(`${this._baseUrl}/cards`, {
      headers: this._headers,
    })
      .then((res) => {
        if (res.ok) return res.json();
        return Promise.reject(`error ${res.status} while getting cards data`);
      })
      .catch((err) => {
        return Promise.reject(err);
      });
  }

  getUserAndCards(promiseArray) {
    return Promise.all(promiseArray).catch((err) => {
      console.error("Somethnig went wrong :(", err);
    });
  }

  setUserProfileData(name, description) {
    return fetch(`${this._baseUrl}/users/me`, {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify({ name: name, about: description }),
    })
      .then((res) => {
        if (res.ok) return res.json();
        return Promise.reject(`error ${res.status} while updating user data`);
      })
      .catch((err) => {
        return Promise.reject(err);
      });
  }

  addNewCard(name, link) {
    return fetch(`${this._baseUrl}/cards`, {
      method: "POST",
      headers: this._headers,
      body: JSON.stringify({ name: name, link: link }),
    })
      .then((res) => {
        if (res.ok) return res.json();
        return Promise.reject(`error ${res.status} while adding a new card`);
      })
      .catch((err) => {
        return Promise.reject(err);
      });
  }

  deleteCard(id) {
    return fetch(`${this._baseUrl}/cards/${id}`, {
      method: "DELETE",
      headers: this._headers,
    })
      .then((res) => {
        if (res.ok) return res.json();
        return Promise.reject(`error ${res.status} while deleting a card`);
      })
      .catch((err) => {
        return Promise.reject(err);
      });
  }

  likeCard(id) {
    return fetch(`${this._baseUrl}/cards/${id}/likes`, {
      method: "PUT",
      headers: this._headers,
      body: JSON.stringify({ isLiked: true }),
    })
      .then((res) => {
        if (res.ok) return res.json();
        return Promise.reject(`error ${res.status} while liking a card`);
      })
      .catch((err) => {
        return Promise.reject(err);
      });
  }

  unlikeCard(id) {
    return fetch(`${this._baseUrl}/cards/${id}/likes`, {
      method: "DELETE",
      headers: this._headers,
      body: JSON.stringify({ isLiked: false }),
    })
      .then((res) => {
        if (res.ok) return res.json();
        return Promise.reject(`error ${res.status} while unliking a card`);
      })
      .catch((err) => {
        return Promise.reject(err);
      });
  }
}
