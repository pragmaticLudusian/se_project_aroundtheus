export default class UserInfo {
  constructor({ name, description, avatar }) {
    this._nameElement = name;
    this._jobElement = description;
    this._avatarElement = avatar;
  }
  getUserInfo() {
    return {
      name: this._nameElement.textContent,
      description: this._jobElement.textContent,
    };
  }

  setUserInfo(name, description) {
    this._nameElement.textContent = name;
    this._jobElement.textContent = description;
  }

  getAvatar() {
    return this._avatarElement.src;
  }

  setAvatar(avatar) {
    this._avatarElement.src = avatar;
  }
}
