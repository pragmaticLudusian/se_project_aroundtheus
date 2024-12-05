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
const profile = document.querySelector(".profile");
export const buttonEditProfile = profile.querySelector(".profile__edit-button");
export const profileName = profile.querySelector(".profile__name");
export const profileDescription = profile.querySelector(
  ".profile__description"
);
export const profileAvatar = profile.querySelector(".profile__avatar");
export const buttonUpdateAvatar = profile.querySelector(
  ".profile__avatar-edit"
);
// profile (info) form & input vars
export const modalWindowProfile = document.querySelector("#modal_profile_info");
const formProfile = document.forms["profile_info_form"];
export const inputProfileName = formProfile["name"]; // can refer to by name or id attribs
export const inputProfileDescription = formProfile["description"];
// profile avatar from & input var
export const submitProfileInfo = formProfile["profile_info_form_save"];
export const modalWindowProfileAvatar = document.querySelector(
  "#modal_profile_avatar"
);
const formProfileAvatar = document.forms["profile_avatar_form"];
export const inputProfileAvatar = formProfileAvatar["avatar"];
export const submitProfileAvatar =
  formProfileAvatar["profile_avatar_form_save"];

// init card add & related modal window
export const buttonAddCard = profile.querySelector(".profile__add-button");
export const modalWindowCardAdd = document.querySelector("#modal_card-add");
// card-add form & input vars
export const formCardAdd = document.forms["card-add_form"];
export const submitCardAdd = formCardAdd["card-add_form_save"];

// init card view modal window
export const modalWindowCardView = document.querySelector("#modal_card-view");
export const modalImage = modalWindowCardView.querySelector(".modal__image");
export const modalCaption =
  modalWindowCardView.querySelector(".modal__caption");
// since these are singular elements that would change content for many images/captions, qS should only be used once here

// init card delete modal window
export const modalWindowCardDelete =
  document.querySelector("#modal_card-delete");

// init the gallery cards and build all derivative actions upon page load
export const cardsGallery = ".gallery__cards";

/* constant exporting note:
  usually those that would be referenced in code more than once should be listed from here.
  selectors != elements; selectors are strings and don't need to be listed here - elems do.
*/
