function enableValidation() {
  const formList = Array.from(document.forms);
  formList.forEach((formElement) => {
    formElement.addEventListener("submit", (event) => {
      event.preventDefault();
    });
    setEventListeners(formElement);
  });

  function setEventListeners(formElement) {
    const inputList = Array.from(formElement.querySelectorAll(".form__input"));
    inputList.forEach((inputElement) => {
      inputElement.addEventListener("input", () => {
        checkInputValidity(formElement, inputElement, inputList); // 3rd parameter is needed to pass through to check all inputs
      });
    });
  }

  function checkInputValidity(formElement, inputElement, inputList) {
    const buttonElement = formElement[`${formElement.id}_save`];
    if (hasInvalidInput(inputList)) {
      showInputError(formElement, inputElement, inputElement.validationMessage);
      disableButton(inputElement, buttonElement);
    } else {
      hideInputError(formElement, inputElement);
      enableButton(inputElement, buttonElement);
    }
  }

  const hasInvalidInput = (inputList) => {
    return inputList.some((inputElement) => {
      return !inputElement.validity.valid;
    });
  };

  function showInputError(formElement, inputElement, errorMessage) {
    const inputError = formElement.querySelector(`#${inputElement.id}_error`);
    inputError.classList.add("form__error_active");
    inputError.textContent = errorMessage;
  }

  function hideInputError(formElement, inputElement) {
    const inputError = formElement.querySelector(`#${inputElement.id}_error`);
    inputError.classList.remove("form__error_active");
    inputError.textContent = "";
  }

  function disableButton(inputElement, buttonElement) {
    buttonElement.classList.replace(
      "form__save-button_active",
      "form__save-button_inactive"
    );
    buttonElement.setAttribute("disabled", true);
  }

  function enableButton(inputElement, buttonElement) {
    buttonElement.removeAttribute("disabled");
    buttonElement.classList.replace(
      "form__save-button_inactive",
      "form__save-button_active"
    );
  }
}
