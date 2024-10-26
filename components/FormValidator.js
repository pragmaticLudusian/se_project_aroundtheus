export default class FormValidator {
  constructor(config, form) {
    this._config = config; // settings obj
    this._form = document.forms[form]; // form elem
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
  }

  _checkInputValidity(obj, inputElement) {
    // obj, being the 1st parameter is equivalent to the keyword this
    if (this._hasInvalidInput(this._inputList)) {
      this._showInputError(this, inputElement);
      this.disableButton(this);
    } else {
      this._hideInputError(this, inputElement);
      this.enableButton(this);
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
    const buttonElement = this._form.querySelector(
      this._config["submitButtonSelector"]
    );
    buttonElement.classList.replace(
      this._config["activeButtonClass"],
      this._config["inactiveButtonClass"]
    );
    buttonElement.setAttribute("disabled", true);
  }

  enableButton() {
    const buttonElement = this._form.querySelector(
      this._config["submitButtonSelector"]
    );
    buttonElement.removeAttribute("disabled");
    buttonElement.classList.replace(
      this._config["inactiveButtonClass"],
      this._config["activeButtonClass"]
    );
  }

  resetFormValidation() {
    // there's a diff between resetting form values and form validation, as well as resetting validation and disabling the button methods - hence why they're separate
    const inputList = Array.from(
      this._form.querySelectorAll(this._config["inputSelector"])
    );
    inputList.forEach((inputElement) => {
      this._checkInputValidity(this, inputElement);
    });
  }

  enableValidation() {
    this._setEventListeners();
  }
}
