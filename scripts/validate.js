/*
console.log(formProfile);
  inputProfileName & Description
console.log(formCardAdd);
  inputCardTitle & Link
*/

const formList = Array.from(document.forms);
formList.forEach((formElement) => {
  formElement.addEventListener("submit", (event) => {
    event.preventDefault();
  });
  const inputList = Array.from(formElement.querySelectorAll(".form__input"));
  inputList.forEach((inputElement) => {
    inputElement.addEventListener("input", () => {
      const inputError = formElement.querySelector(`#${inputElement.id}_error`);
      if (!inputElement.validity.valid) {
        inputError.textContent = inputElement.validationMessage;
        inputError.classList.add("form__error_active");
        buttonProfileSave.classList.replace(
          "form__save-button_active",
          "form__save-button_inactive"
        );
        buttonProfileSave.setAttribute("disabled", true);
      } else {
        buttonProfileSave.removeAttribute("disabled");
        buttonProfileSave.classList.replace(
          "form__save-button_inactive",
          "form__save-button_active"
        );
        inputError.classList.remove("form__error_active");
        inputError.textContent = "";
      }
    });
  });
});

// function inputCheck(event) {
//   console.log(event.target.validity.valid);
//   console.log(event.target.validationMessage);
// }

/* roadmap
  enableValidation()
    setEventListeners(formElem)
      checkInputValidity(formElem, inputElem)
        show&hideInputError(formElem, inputElem, errMsg)
        toggleButtonState(inputElem, btnElem)
*/
