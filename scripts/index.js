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

// init profile editing & related modal window
const profile = document.querySelector(".profile");
const buttonEditProfile = profile.querySelector(".profile__edit-button");
const profileName = profile.querySelector(".profile__name");
const profileDescription = profile.querySelector(".profile__description");
const modalWindowProfile = document.querySelector("#modal_profile");
const buttonCloseProfileModal = modalWindowProfile.querySelector(
  "#modal_profile_close"
);
// profile form & input vars
const formProfile = document.forms["profile_form"];
const inputProfileName = formProfile["name"]; // can refer to by name or id attribs
const inputProfileDescription = formProfile["description"];

// init card add & related modal window
const buttonAddCard = profile.querySelector(".profile__add-button");
const modalWindowCardAdd = document.querySelector("#modal_card-add");
const buttonCloseCardAddWindow = modalWindowCardAdd.querySelector(
  "#modal_card-add_close"
);
// card-add form & input vars
const formCardAdd = document.forms["card-add_form"];
const inputCardTitle = formCardAdd["title"];
const inputCardLink = formCardAdd["link"];

// init card view modal window
const modalWindowCardView = document.querySelector("#modal_card-view");
const modalImage = modalWindowCardView.querySelector(".modal__image");
const modalCaption = modalWindowCardView.querySelector(".modal__caption");
// since these are singular elements that would change content for many images/captions, qS should only be used once here
const buttonCloseCardViewModal = modalWindowCardView.querySelector(
  "#modal_card-view_close"
);
buttonCloseCardViewModal.addEventListener("click", () =>
  closePopup(modalWindowCardView)
); // for callback func to call forward a func, it's still would need to have a function body

// init the gallery cards and build all derivative actions upon page load
const cardsGallery = document.querySelector(".gallery__cards");
const cardTemplate = document.querySelector("#card-template").content;
initialCards.forEach((card) => cardRender(card)); // first it'll render the card being passed with the append method by default, then it'll setup all the rest with the getCardElement()

function cardRender(item, method = "append") {
  const cardElement = getCardElement(item);
  cardsGallery[method](cardElement); // not an array, but a var acting for .method
}

function getCardElement(data) {
  const cardElement = cardTemplate.querySelector(".card").cloneNode(true); // cloning in a loop is the way
  const cardImage = cardElement.querySelector(".card__image"); // to change 2 attribs, a var would be recommended
  cardImage.src = data.link;
  cardImage.alt = data.name;
  cardElement.querySelector(".card__title").textContent = data.name;

  return cardElement;
}
/* END DECLARATIVE SECTION */

/* PROFILE SECTION */
buttonEditProfile.addEventListener("click", () => {
  inputProfileName.value = profileName.textContent;
  inputProfileDescription.value = profileDescription.textContent;
  const inputList = Array.from(formProfile.querySelectorAll(".form__input"));
  inputList.forEach((inputElement) => {
    checkInputValidity(configuration, formProfile, inputElement, inputList);
  }); // render input validity just before opening the popup
  openPopup(modalWindowProfile); // for rendering purposes, here it's the last line
});

buttonCloseProfileModal.addEventListener("click", () =>
  closePopup(modalWindowProfile)
);

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
  const inputList = Array.from(formCardAdd.querySelectorAll(".form__input"));
  inputList.forEach((inputElement) => {
    checkInputValidity(configuration, formCardAdd, inputElement, inputList);
  });
  openPopup(modalWindowCardAdd);
});
buttonCloseCardAddWindow.addEventListener("click", () =>
  closePopup(modalWindowCardAdd)
);

modalWindowCardAdd.addEventListener("submit", (event) => {
  event.preventDefault();
  const card = { name: inputCardTitle.value, link: inputCardLink.value };
  cardRender(card, "prepend");
  closePopup(modalWindowCardAdd);
  // empty inputs once rendered closed AND actually added instead of not
  inputCardTitle.value = "";
  inputCardLink.value = "";
});
/* END CARD ADD SECTION */

/* CARD GALLERY SECTION */
cardsGallery.addEventListener("click", (event) => {
  const cardElement = event.target;
  if (cardElement.className === "card__image") {
    modalImage.src = cardElement.src;
    modalImage.alt = cardElement.alt;
    modalCaption.textContent = cardElement.alt;
    openPopup(modalWindowCardView);
  } else if (cardElement.className.includes("card__like")) {
    cardElement.classList.toggle("card__like_active");
  } else if (cardElement.className === "card__delete-button") {
    cardElement.closest(".card").remove();
  }
});
/* END CARD GALLERY SECTION */

enableValidation(configuration);
