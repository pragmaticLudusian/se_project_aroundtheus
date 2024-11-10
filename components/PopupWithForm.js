import Popup from "./Popup.js";
import { configuration as c } from "../utils/constants.js";

export default class PopupWithForm extends Popup {
  constructor(popup, handleSubmit) {
    super(popup); // popup selected element
    this._handleSubmit = handleSubmit; // callback func for submitting form
  }

  setEventListeners() {
    super.setEventListeners();
    this._popup.addEventListener("submit", (event) => {
      this._handleSubmit(event, this._getInputValues()); // pass and execute func
    });
  }

  _getInputValues() {
    const inputValues = {};
    Array.from(this._popup.querySelectorAll(c.inputSelector)).forEach(
      (input) => {
        inputValues[input.name] = input.value;
      }
    );
    return inputValues;
  }
}
