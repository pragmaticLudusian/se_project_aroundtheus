import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";

/* DECLARATIVE SECTION */
const initialCards = [
  {
    name: "Harbor Springs",
    link: "images/cards/harbor-springs.jpg",
  },
  {
    name: "Downtown Chicago",
    link: "images/cards/chicago.jpg",
  },
  {
    name: "Bethlehem",
    link: "images/cards/bethlehem.jpg",
  },
  {
    name: "Perrysburg",
    link: "images/cards/perrysburg.jpg",
  },
  {
    name: "Venice Beach",
    link: "images/cards/venice-beach.jpg",
  },
  {
    name: "Palace of Fine Arts",
    link: "images/cards/palace-finearts.jpg",
  },
];
const configuration = {
  // formSelector: ".form", // handled through document.forms pseudo-array
  inputSelector: ".form__input",
  submitButtonSelector: ".form__save-button",
  inactiveButtonClass: "form__save-button_inactive",
  activeButtonClass: "form__save-button_active",
  // inputErrorClass: "popup__input_type_error", // handled via CSS pseudo-class
  // errorSelector: `#${inputElement.id}_error`, // due to use of esc. lit. and id class templates, this is unused
  activeErrorClass: "form__error_active",
};

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

// init profile editing & related modal window
const profile = document.querySelector(".profile");
const buttonEditProfile = profile.querySelector(".profile__edit-button");
const profileName = profile.querySelector(".profile__name");
const profileDescription = profile.querySelector(".profile__description");
const modalWindowProfile = document.querySelector("#modal_profile");
// profile form & input vars
const formProfile = document.forms["profile_form"];
const inputProfileName = formProfile["name"]; // can refer to by name or id attribs
const inputProfileDescription = formProfile["description"];

// init card add & related modal window
const buttonAddCard = profile.querySelector(".profile__add-button");
const modalWindowCardAdd = document.querySelector("#modal_card-add");
// card-add form & input vars
const formCardAdd = document.forms["card-add_form"];
const inputCardTitle = formCardAdd["title"];
const inputCardLink = formCardAdd["link"];

// init card view modal window
const modalWindowCardView = document.querySelector("#modal_card-view");
const modalImage = modalWindowCardView.querySelector(".modal__image");
const modalCaption = modalWindowCardView.querySelector(".modal__caption");
// since these are singular elements that would change content for many images/captions, qS should only be used once here

// init the gallery cards and build all derivative actions upon page load
const cardsGallery = document.querySelector(".gallery__cards");
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
