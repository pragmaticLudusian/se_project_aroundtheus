export const initialCards = [
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
export const configuration = {
  // formSelector: ".form", // handled through document.forms pseudo-array
  inputSelector: ".form__input",
  submitButtonSelector: ".form__save-button",
  inactiveButtonClass: "form__save-button_inactive",
  activeButtonClass: "form__save-button_active",
  // inputErrorClass: "popup__input_type_error", // handled via CSS pseudo-class
  // errorSelector: `#${inputElement.id}_error`, // due to use of esc. lit. and id class templates, this is unused
  activeErrorClass: "form__error_active",
};

// init profile editing & related modal window
export const profile = document.querySelector(".profile");
export const buttonEditProfile = profile.querySelector(".profile__edit-button");
export const profileName = profile.querySelector(".profile__name");
export const profileDescription = profile.querySelector(
  ".profile__description"
);
export const modalWindowProfile = document.querySelector("#modal_profile");
// profile form & input vars
export const formProfile = document.forms["profile_form"];
export const inputProfileName = formProfile["name"]; // can refer to by name or id attribs
export const inputProfileDescription = formProfile["description"];

// init card add & related modal window
export const buttonAddCard = profile.querySelector(".profile__add-button");
export const modalWindowCardAdd = document.querySelector("#modal_card-add");
// card-add form & input vars
export const formCardAdd = document.forms["card-add_form"];
export const inputCardTitle = formCardAdd["title"];
export const inputCardLink = formCardAdd["link"];

// init card view modal window
export const modalWindowCardView = document.querySelector("#modal_card-view");
export const modalImage = modalWindowCardView.querySelector(".modal__image");
export const modalCaption =
  modalWindowCardView.querySelector(".modal__caption");
// since these are singular elements that would change content for many images/captions, qS should only be used once here

// init the gallery cards and build all derivative actions upon page load
export const cardsGallery = document.querySelector(".gallery__cards");
