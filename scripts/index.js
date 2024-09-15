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

const profile = document.querySelector(".profile");
const buttonEditProfile = profile.querySelector(".profile__edit-button");

const modalWindowProfile = document.querySelector("#modal-profile"); // account for potentially another future modal window
const buttonCloseProfileModal = modalWindowProfile.querySelector(
  "#modal-profile-close"
);

buttonEditProfile.addEventListener("click", openProfileModal);
buttonCloseProfileModal.addEventListener("click", closeProfileModal); // 2 ways to close: x and save
modalWindowProfile.addEventListener("submit", saveProfileModal);
// saves the need to tie an event listener to a button, as long as the html button type is 'submit'
// (i) the submit is tied to the form

// these are the HTML page vars...
const profileName = profile.querySelector(".profile__name");
const profileDescription = profile.querySelector(".profile__description");
// and these are the modal window vars
const inputProfileName = modalWindowProfile.querySelector(
  "#modal-profile-name"
);
const inputProfileDescription = modalWindowProfile.querySelector(
  "#modal-profile-description"
);

// init the gallery cards
const cardsGallery = document.querySelector(".gallery__cards");
const cardTemplate = document.querySelector("#card-template").content; // as a template, its HTML content won't suffice without using the .content property
initialCards.forEach((card) => {
  cardsGallery.append(getCardElement(card));
});

function openProfileModal() {
  // using separate let vars aren't necessary
  inputProfileName.value = profileName.textContent;
  inputProfileDescription.value = profileDescription.textContent;
  modalWindowProfile.classList.add("modal_opened"); // for rendering purposes, here it's the last line
}

function saveProfileModal(event) {
  event.preventDefault();
  // update from profile modal to profile page
  profileName.textContent = inputProfileName.value;
  profileDescription.textContent = inputProfileDescription.value;
  closeProfileModal();
}

function closeProfileModal() {
  modalWindowProfile.classList.remove("modal_opened");
}

function getCardElement(data) {
  const cardElement = cardTemplate.querySelector(".card").cloneNode(true); // cloning in a loop is fine
  const cardImage = cardElement.querySelector(".card__image"); // to change 2 attribs, a var would be recommended
  cardImage.src = data.link;
  cardImage.alt = data.name;
  cardElement.querySelector(".card__title").textContent = data.name;
  return cardElement;
}
