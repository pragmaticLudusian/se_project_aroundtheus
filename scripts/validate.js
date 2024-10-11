/*
console.log(formProfile);
  inputProfileName & Description
console.log(formCardAdd);
  inputCardTitle & Link
*/
inputProfileName.addEventListener("input", () => {
  const inputError = formProfile.querySelector(`#${inputProfileName.id}_error`);
  if (!inputProfileName.validity.valid) {
    inputError.textContent = inputProfileName.validationMessage;
    inputError.classList.add("form__error_active");
  } else {
    inputError.classList.remove("form__error_active");
    inputError.textContent = "";
  }
});

// function inputCheck(event) {
//   console.log(event.target.validity.valid);
//   console.log(event.target.validationMessage);
// }
