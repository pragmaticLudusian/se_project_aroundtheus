function enableValidation(config) {
  const formList = Array.from(document.forms);
  formList.forEach((formElement) => {
    formElement.addEventListener("submit", (event) => {
      event.preventDefault();
    });
    setEventListeners(config, formElement);
  });
}

function setEventListeners(config, formElement) {
  const inputList = Array.from(
    formElement.querySelectorAll(config["inputSelector"])
  );
  inputList.forEach((inputElement) => {
    inputElement.addEventListener("input", () => {
      checkInputValidity(config, formElement, inputElement, inputList); // 3rd parameter would be needed to pass through to check all inputs, incl. the init validity renderer
    });
  });
}

function checkInputValidity(config, formElement, inputElement, inputList) {
  const buttonElement = formElement.querySelector(
    config["submitButtonSelector"]
  );
  if (hasInvalidInput(inputList)) {
    showInputError(
      config,
      formElement,
      inputElement,
      inputElement.validationMessage
    );
    disableButton(config, inputElement, buttonElement);
  } else {
    hideInputError(config, formElement, inputElement);
    enableButton(config, inputElement, buttonElement);
  }
}

const hasInvalidInput = (inputList) => {
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid;
  });
};

function showInputError(config, formElement, inputElement, errorMessage) {
  const inputError = formElement.querySelector(config["errorSelector"]);
  inputError.classList.add(config["activeErrorClass"]);
  inputError.textContent = errorMessage;
}

function hideInputError(config, formElement, inputElement) {
  const inputError = formElement.querySelector(config["errorSelector"]);
  inputError.classList.remove(config["activeErrorClass"]);
  inputError.textContent = "";
}

function disableButton(config, inputElement, buttonElement) {
  buttonElement.classList.replace(
    config["activeButtonClass"],
    config["inactiveButtonClass"]
  );
  buttonElement.setAttribute("disabled", true);
}

function enableButton(config, inputElement, buttonElement) {
  buttonElement.removeAttribute("disabled");
  buttonElement.classList.replace(
    config["inactiveButtonClass"],
    config["activeButtonClass"]
  );
}
