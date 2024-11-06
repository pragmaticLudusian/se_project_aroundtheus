import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
import {
  initialCards,
  configuration,
  profile,
  profileEditProfile,
  profileName,
  profileDescription,
  modalWindowProfile,
  formProfile,
  inputProfileName,
  inputProfileDescription,
  buttonAddCard,
  modalWindowCardAdd,
  formCardAdd,
  inputCardTitle,
  inputCardLink,
  modalWindowCardView,
  modalImage,
  modalCaption,
  cardsGallery,
} from "../utils/constants.js";

// universal popup functions
function openPopup(popup) {
  popup.classList.add("modal_opened");
  popup.addEventListener("click", handleMouseClick);
  document.addEventListener("keydown", handleKeyPress);
}

function closePopup(popup) {
  popup.classList.remove("modal_opened");
  popup.removeEventListener("click", handleMouseClick);
  document.removeEventListener("keydown", handleKeyPress);
}

function handleMouseClick(event) {
  if (event.currentTarget.id === event.target.id) {
    closePopup(event.currentTarget); // "this" context is too dynamic, so instead use the caller element via current
  }
}

function handleKeyPress(event) {
  if (event.key === "Escape") {
    closePopup(document.querySelector(".modal_opened"));
  }
}

const closeButtons = document.querySelectorAll(".modal__close-button");
closeButtons.forEach((button) => {
  const modal = button.closest(".modal");
  button.addEventListener("click", () => closePopup(modal));
  // for callback func to call forward a func, it would still need to have an anon.func body
});

initialCards.forEach((card) => renderCard(card)); // first it'll render the card being passed with the append method by default, then it'll setup all the rest with the getCardElement()

function renderCard(item, method = "append") {
  const card = new Card(item, "#card-template", handleCardPopup);
  const cardElement = card.generateCard();
  cardsGallery[method](cardElement);
}

function handleCardPopup(card) {
  // suggested by Sprint 7 project to keep this func in index.js for now
  const { name, link } = card.getInfo();
  modalImage.src = link;
  modalImage.alt = name;
  modalCaption.textContent = name;
  openPopup(modalWindowCardView);
}

const formValidators = {};
Array.from(document.forms).forEach((formElement) => {
  const validator = new FormValidator(configuration, formElement);
  formValidators[formElement.id] = validator;
  validator.enableValidation();
});
/* END DECLARATIVE SECTION */

/* PROFILE SECTION */
buttonEditProfile.addEventListener("click", () => {
  inputProfileName.value = profileName.textContent;
  inputProfileDescription.value = profileDescription.textContent;
  formValidators["profile_form"].resetFormValidation(); // input always valid when taking from the html page
  openPopup(modalWindowProfile); // for rendering purposes, here it's the last line
});

formProfile.addEventListener("submit", (event) => {
  // although the submit action could be tied to the window modal and it'd still work, semantically it's meant to be handled to the <form>
  event.preventDefault();
  profileName.textContent = inputProfileName.value;
  profileDescription.textContent = inputProfileDescription.value;
  closePopup(modalWindowProfile);
});
/* END PROFILE SECTION */

/* CARD ADD SECTION */
buttonAddCard.addEventListener("click", () => {
  // don't show errors upon opening the modal when no input is issued
  openPopup(modalWindowCardAdd);
});

modalWindowCardAdd.addEventListener("submit", (event) => {
  event.preventDefault();
  const card = { name: inputCardTitle.value, link: inputCardLink.value };
  renderCard(card, "prepend");
  closePopup(modalWindowCardAdd);
  formCardAdd.reset();
  formValidators["card-add_form"].disableButton();
  // apparently no need to show errors upon submitting either, since input is retained when simply closing the popup w/o submitting
});
/* END CARD ADD SECTION */
