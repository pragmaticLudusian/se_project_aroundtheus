import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
  constructor(popup, handleSubmit) {
    super(popup);
    this._handleSubmit = handleSubmit;
  }

  setEventListeners() {
    super.setEventListeners();
    this._popup.addEventListener("submit", (event) => {
      this._handleSubmit(event, this._getInputValues());
    });
  }

  _getInputValues() {
    const inputValues = {};
    Array.from(this._popup.querySelectorAll(".form__input")).forEach(
      (input) => {
        inputValues[input.id] = input.value;
      }
    );
    return inputValues;
  }
}
