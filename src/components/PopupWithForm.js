import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
  constructor(popup, handleSubmit, inputSelector, submitSelector) {
    super(popup); // popup selected element
    this._handleSubmit = handleSubmit; // callback func for submitting form
    this._inputSelector = inputSelector;
    this._submitSelector = submitSelector; // used for api render
    this._submitText = this._submitSelector.textContent; // initial pre-loading submit text
  }

  setEventListeners() {
    super.setEventListeners();
    this._popup.addEventListener("submit", (event) => {
      this._handleSubmit(event, this._getInputValues()); // pass and execute func
    });
    this._inputFields = Array.from(
      this._popup.querySelectorAll(this._inputSelector)
    );
  }

  _getInputValues() {
    const inputValues = {};
    this._inputFields.forEach((input) => {
      inputValues[input.name] = input.value;
    });
    return inputValues;
  }

  renderLoading(isLoading, loadingText = "Saving...") {
    this._submitSelector.textContent = isLoading
      ? loadingText
      : this._submitText;
  }
}
