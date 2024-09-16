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

// init profile editing and related modal window
const profile = document.querySelector(".profile");
const buttonEditProfile = profile.querySelector(".profile__edit-button");
const modalWindowProfile = document.querySelector("#modal_profile");
const buttonCloseProfileModal = modalWindowProfile.querySelector(
  "#modal_profile_close"
);
// html page vars
const profileName = profile.querySelector(".profile__name");
const profileDescription = profile.querySelector(".profile__description");
// modal window vars
const inputProfileName = modalWindowProfile.querySelector(
  "#modal_profile_name"
);
const inputProfileDescription = modalWindowProfile.querySelector(
  "#modal_profile_description"
);

// init card add and related modal window
const buttonAddCard = profile.querySelector(".profile__add-button");
const modalWindowCardAdd = document.querySelector("#modal_card-add");
const buttonCloseCardAddWindow = modalWindowCardAdd.querySelector(
  "#modal_card-add_close"
);
const inputCardTitle = modalWindowCardAdd.querySelector(
  "#modal_card-add_title"
);
const inputCardLink = modalWindowCardAdd.querySelector("#modal_card-add_link");

// init card view modal window
const modalWindowCardView = document.querySelector("#modal_card-view");
const buttonCloseCardViewModal = modalWindowCardView.querySelector(
  "#modal_card-view_close"
);
buttonCloseCardViewModal.addEventListener("click", () => {
  modalWindowCardView.classList.remove("modal_opened");
});

// init the gallery cards and build all derivative actions upon page load
const cardsGallery = document.querySelector(".gallery__cards");
const cardTemplate = document.querySelector("#card-template").content;
initialCards.forEach((card) => cardsGallery.append(getCardElement(card)));

function getCardElement(data) {
  const cardElement = cardTemplate.querySelector(".card").cloneNode(true); // cloning in a loop is the way
  const cardImage = cardElement.querySelector(".card__image"); // to change 2 attribs, a var would be recommended
  cardImage.src = data.link;
  cardImage.alt = data.name;
  cardElement.querySelector(".card__title").textContent = data.name;

  const cardDelete = cardElement.querySelector(".card__delete-button");
  cardDelete.addEventListener("click", (event) => {
    event.target.parentElement.remove();
  });

  const cardLike = cardElement.querySelector(".card__like");
  cardLike.addEventListener("click", (event) => {
    event.target.classList.toggle("card__like_active");
  });

  cardImage.addEventListener("click", (event) => {
    const modalImage = modalWindowCardView.querySelector(".modal__image");
    modalImage.src = event.target.src;
    modalImage.alt = event.target.alt;
    modalWindowCardView.querySelector(".modal__caption").textContent =
      event.target.alt;
    modalWindowCardView.classList.add("modal_opened");
  });

  return cardElement;
}
/* END DECLARATIVE SECTION */

/* PROFILE SECTION */
buttonEditProfile.addEventListener("click", () => {
  // using separate let vars aren't necessary
  inputProfileName.value = profileName.textContent;
  inputProfileDescription.value = profileDescription.textContent;
  modalWindowProfile.classList.add("modal_opened"); // for rendering purposes, here it's the last line
});

buttonCloseProfileModal.addEventListener("click", closeProfileModal); // 2 ways to close: x and save

modalWindowProfile.addEventListener("submit", (event) => {
  // submit is tied to the form by the html button that action's tied to submit
  event.preventDefault();
  profileName.textContent = inputProfileName.value;
  profileDescription.textContent = inputProfileDescription.value;
  closeProfileModal();
});

function closeProfileModal() {
  modalWindowProfile.classList.remove("modal_opened");
}
/* END PROFILE SECTION */

/* CARD ADD SECTION */
buttonAddCard.addEventListener("click", () => {
  modalWindowCardAdd.classList.add("modal_opened");
});

buttonCloseCardAddWindow.addEventListener("click", closeCardAddModal);

modalWindowCardAdd.addEventListener("submit", (event) => {
  event.preventDefault();
  const card = { name: inputCardTitle.value, link: inputCardLink.value };
  cardsGallery.prepend(getCardElement(card));
  closeCardAddModal(); // empty inputs once rendered closed
});

function closeCardAddModal() {
  modalWindowCardAdd.classList.remove("modal_opened");
  inputCardTitle.value = "";
  inputCardLink.value = "";
}
/* END CARD ADD SECTION */
