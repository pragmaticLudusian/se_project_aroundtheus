let initialCards = [
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

// init the gallery cards
const cardsGallery = document.querySelector(".gallery__cards");
const cardTemplate = document.querySelector("#card-template").content; // as a template, its HTML content won't suffice without using the .content property
initialCards.forEach((card) => cardsGallery.append(getCardElement(card)));

function getCardElement(data) {
  const cardElement = cardTemplate.querySelector(".card").cloneNode(true); // cloning in a loop is fine
  const cardImage = cardElement.querySelector(".card__image"); // to change 2 attribs, a var would be recommended
  cardImage.src = data.link;
  cardImage.alt = data.name;
  cardElement.querySelector(".card__title").textContent = data.name;

  const cardLike = cardElement.querySelector(".card__like");
  cardLike.addEventListener("click", (event) => {
    event.target.classList.toggle("card__like_active");
  });

  return cardElement;
}

/* PROFILE SECTION */
const profile = document.querySelector(".profile");
const buttonEditProfile = profile.querySelector(".profile__edit-button");

const modalWindowProfile = document.querySelector("#modal_profile");
const buttonCloseProfileModal = modalWindowProfile.querySelector(
  "#modal_profile_close"
);
// these are the HTML page vars...
const profileName = profile.querySelector(".profile__name");
const profileDescription = profile.querySelector(".profile__description");
// ...and these are the modal window vars
const inputProfileName = modalWindowProfile.querySelector(
  "#modal_profile_name"
);
const inputProfileDescription = modalWindowProfile.querySelector(
  "#modal_profile_description"
);

buttonEditProfile.addEventListener("click", () => {
  // using separate let vars aren't necessary
  inputProfileName.value = profileName.textContent;
  inputProfileDescription.value = profileDescription.textContent;
  modalWindowProfile.classList.add("modal_opened"); // for rendering purposes, here it's the last line
});

buttonCloseProfileModal.addEventListener("click", closeProfileModal); // 2 ways to close: x and save

modalWindowProfile.addEventListener("submit", (event) => {
  event.preventDefault();
  // update from profile modal to profile page
  profileName.textContent = inputProfileName.value;
  profileDescription.textContent = inputProfileDescription.value;
  closeProfileModal();
});
// saves the need to tie an event listener to a button, as long as the html button type is 'submit'
// (i) the submit is tied to the form

function closeProfileModal() {
  modalWindowProfile.classList.remove("modal_opened");
}
/* END PROFILE SECTION */

/* CARD ADD SECTION */
const buttonAddCard = profile.querySelector(".profile__add-button");
const modalWindowCardAdd = document.querySelector("#modal_card-add");
const buttonCloseCardAddWindow = modalWindowCardAdd.querySelector(
  "#modal_card-add_close"
);
// modal element vars
const inputCardTitle = modalWindowCardAdd.querySelector(
  "#modal_card-add_title"
);
const inputCardLink = modalWindowCardAdd.querySelector("#modal_card-add_link");

buttonAddCard.addEventListener("click", () => {
  modalWindowCardAdd.classList.add("modal_opened");
});

buttonCloseCardAddWindow.addEventListener("click", closeCardAddModal);

modalWindowCardAdd.addEventListener("submit", (event) => {
  event.preventDefault();
  const card = { name: inputCardTitle.value, link: inputCardLink.value };
  if (card.name && card.link) {
    // prevents empty card elements
    cardsGallery.prepend(getCardElement(card));
    inputCardTitle.value = "";
    inputCardLink.value = "";
    closeCardAddModal();
  }
});

function closeCardAddModal() {
  modalWindowCardAdd.classList.remove("modal_opened");
}
/* END CARD ADD SECTION */
