import Section from "../components/Section.js";
import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
import {
  initialCards,
  configuration,
  profile,
  buttonEditProfile,
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
import PopupWithImage from "../components/PopupWithImage.js";
import PopupWithForm from "../components/PopupWithForm.js";

const cardSection = new Section(
  {
    items: initialCards,
    renderer: (item) => {
      const card = new Card(item, "#card-template", handleCardPopup);
      const cardElement = card.generateCard();
      cardSection.addItem(cardElement);
    },
  },
  cardsGallery
);
cardSection.renderItems();

const popupImage = new PopupWithImage(modalWindowCardView);
popupImage.setEventListeners();
function handleCardPopup() {
  // suggested by Sprint 7 project to keep this func in index.js for now
  popupImage.open(this.getInfo()); // this refers to Card
  // should this be moved from being a standalone func?
}

const formValidators = {};
Array.from(document.forms).forEach((formElement) => {
  const validator = new FormValidator(configuration, formElement);
  formValidators[formElement.id] = validator;
  validator.enableValidation();
});
/* END DECLARATIVE SECTION */

/* PROFILE SECTION */
const popupProfile = new PopupWithForm(
  modalWindowProfile,
  (event, profileInputs) => {
    event.preventDefault();
    profileName.textContent = profileInputs.name;
    profileDescription.textContent = profileInputs.description;
    popupProfile.close();
  }
);
popupProfile.setEventListeners();

buttonEditProfile.addEventListener("click", () => {
  inputProfileName.value = profileName.textContent;
  inputProfileDescription.value = profileDescription.textContent;
  formValidators["profile_form"].resetFormValidation(); // input always valid when taking from the html page
  popupProfile.open();
});

/* CARD ADD SECTION */
const popupCardAdd = new PopupWithForm(
  modalWindowCardAdd,
  (event, cardAddInputs) => {
    event.preventDefault();
    const card = new Card(cardAddInputs, "#card-template", handleCardPopup); // {name, link} tying to html name= attribs
    const cardElement = card.generateCard();
    cardSection.addItem(cardElement, "prepend"); // can still be used to add later cards, not just init ones
    popupCardAdd.close();
    formCardAdd.reset();
    formValidators["card-add_form"].disableButton();
  }
);
popupCardAdd.setEventListeners();

buttonAddCard.addEventListener("click", () => {
  // don't show errors upon opening the modal when no input is issued
  popupCardAdd.open();
});
/* END CARD ADD SECTION */
