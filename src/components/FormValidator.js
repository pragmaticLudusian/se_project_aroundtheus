export default class FormValidator {
  constructor(config, form) {
    this._config = config; // settings obj
    this._form = form; // form elem, not id
  }

  _setEventListeners() {
    this._inputList = Array.from(
      this._form.querySelectorAll(this._config["inputSelector"])
    );
    this._inputList.forEach((inputElement) => {
      // this._inputElement = inputElement; // this gets overwritten and causes the last input on the list to be selected. it may not be static, but it's shared among the very same instance of the class
      inputElement.addEventListener("input", () => {
        this._checkInputValidity(this, inputElement); // as such, another argument needs to pass through
      });
    });
    this._buttonElement = this._form.querySelector(
      this._config["submitButtonSelector"]
    ); // for use in both the class construction and resetValidation method, here being the exception rather than the rule
  }

  _checkInputValidity(obj, inputElement) {
    // obj, being the 1st parameter is equivalent to the keyword this
    if (this._hasInvalidInput(this._inputList)) {
      this._showInputError(this, inputElement);
      this.disableButton(); // "end-point" methods need no args incl. this
    } else {
      this._hideInputError(this, inputElement);
      this.enableButton();
    }
  }

  _hasInvalidInput(inputList) {
    return inputList.some((inputElement) => {
      return !inputElement.validity.valid;
    });
  }

  _showInputError(obj, inputElement) {
    const inputError = this._form.querySelector(`#${inputElement.id}_error`);
    inputError.textContent = inputElement.validationMessage;
    inputError.classList.add(this._config["activeErrorClass"]);
  }

  _hideInputError(obj, inputElement) {
    const inputError = this._form.querySelector(`#${inputElement.id}_error`);
    inputError.classList.remove(this._config["activeErrorClass"]);
    inputError.textContent = "";
  }

  disableButton() {
    // unless using the private properties from the constructor, using intermediate priv. props. would be considered undef if called from outside using a public method
    this._buttonElement.classList.replace(
      this._config["activeButtonClass"],
      this._config["inactiveButtonClass"]
    );
    this._buttonElement.setAttribute("disabled", true);
  }

  enableButton() {
    this._buttonElement.removeAttribute("disabled");
    this._buttonElement.classList.replace(
      this._config["inactiveButtonClass"],
      this._config["activeButtonClass"]
    );
  }

  resetFormValidation() {
    // remove errors and disable them rather than adding them anew
    this._inputList.forEach((inputElement) => {
      this._hideInputError(this, inputElement);
    });
    this.disableButton();
  }

  enableValidation() {
    this._setEventListeners();
  }
}
