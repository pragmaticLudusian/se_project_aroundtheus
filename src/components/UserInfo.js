export default class UserInfo {
  constructor({ name, description }) {
    this._nameElement = name;
    this._jobElement = description;
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
}
