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

// universal popup functions
function openPopup(popup) {
  popup.classList.add("modal_opened");
}
function closePopup(popup) {
  popup.classList.remove("modal_opened");
}

// init profile editing and related modal window
const profile = document.querySelector(".profile");
const buttonEditProfile = profile.querySelector(".profile__edit-button");
const modalWindowProfile = document.querySelector("#modal_profile");
const formModalProfile = modalWindowProfile.querySelector(".modal__container"); // for submit handling
const buttonCloseProfileModal = modalWindowProfile.querySelector(
  "#modal_profile_close"
);
// html page vars
const profileName = profile.querySelector(".profile__name");
const profileDescription = profile.querySelector(".profile__description");
// modal window vars
const inputProfileName = formModalProfile.querySelector("#modal_profile_name");
const inputProfileDescription = formModalProfile.querySelector(
  "#modal_profile_description"
);

// init card add and related modal window
const buttonAddCard = profile.querySelector(".profile__add-button");
const modalWindowCardAdd = document.querySelector("#modal_card-add");
const formModalCardAdd = modalWindowCardAdd.querySelector(".modal__container"); // for submit handling
const buttonCloseCardAddWindow = modalWindowCardAdd.querySelector(
  "#modal_card-add_close"
);
const inputCardTitle = formModalCardAdd.querySelector("#modal_card-add_title");
const inputCardLink = formModalCardAdd.querySelector("#modal_card-add_link");

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
initialCards.forEach((card) => cardsGallery.append(getCardElement(card)));

function getCardElement(data) {
  const cardElement = cardTemplate.querySelector(".card").cloneNode(true); // cloning in a loop is the way
  const cardImage = cardElement.querySelector(".card__image"); // to change 2 attribs, a var would be recommended
  cardImage.src = data.link;
  cardImage.alt = data.name;
  cardElement.querySelector(".card__title").textContent = data.name;

  const cardDelete = cardElement.querySelector(".card__delete-button");
  cardDelete.addEventListener("click", (event) => {
    event.target.closest(".card").remove();
  });

  const cardLike = cardElement.querySelector(".card__like");
  cardLike.addEventListener("click", (event) => {
    event.target.classList.toggle("card__like_active");
  });

  cardImage.addEventListener("click", (event) => {
    modalImage.src = event.target.src;
    modalImage.alt = event.target.alt;
    modalCaption.textContent = event.target.alt;
    openPopup(modalWindowCardView);
  });

  return cardElement;
}
/* END DECLARATIVE SECTION */

/* PROFILE SECTION */
buttonEditProfile.addEventListener("click", () => {
  // using separate let vars aren't necessary
  inputProfileName.value = profileName.textContent;
  inputProfileDescription.value = profileDescription.textContent;
  openPopup(modalWindowProfile); // for rendering purposes, here it's the last line
});

buttonCloseProfileModal.addEventListener("click", () =>
  closePopup(modalWindowProfile)
);

formModalProfile.addEventListener("submit", (event) => {
  // although the submit action could be tied to the window modal and it'd still work, semantically it's meant to be handled to the <form>
  event.preventDefault();
  profileName.textContent = inputProfileName.value;
  profileDescription.textContent = inputProfileDescription.value;
  closePopup(modalWindowProfile);
});
/* END PROFILE SECTION */

/* CARD ADD SECTION */
buttonAddCard.addEventListener("click", () => openPopup(modalWindowCardAdd));
buttonCloseCardAddWindow.addEventListener("click", () =>
  closePopup(modalWindowCardAdd)
);

modalWindowCardAdd.addEventListener("submit", (event) => {
  event.preventDefault();
  const card = { name: inputCardTitle.value, link: inputCardLink.value };
  cardsGallery.prepend(getCardElement(card));
  closePopup(modalWindowCardAdd);
  // empty inputs once rendered closed AND actually added instead of not
  inputCardTitle.value = "";
  inputCardLink.value = "";
});
/* END CARD ADD SECTION */
