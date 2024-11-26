import "./index.css";
import Section from "../components/Section.js";
import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
import PopupWithImage from "../components/PopupWithImage.js";
import PopupWithForm from "../components/PopupWithForm.js";
import UserInfo from "../components/UserInfo.js";
/* DECLARATIVE SECTION */
import {
  initialCards,
  configuration,
  buttonEditProfile,
  profileName,
  profileDescription,
  modalWindowProfile,
  inputProfileName,
  inputProfileDescription,
  buttonAddCard,
  modalWindowCardAdd,
  formCardAdd,
  modalWindowCardView,
  modalImage,
  modalCaption,
  cardsGallery,
} from "../utils/constants.js";

const createCard = (cardItem) => {
  const card = new Card(cardItem, "#card-template", handleCardPopup);
  return card.generateCard();
};

const cardSection = new Section(
  {
    items: initialCards,
    renderer: (item) => {
      const cardElement = createCard(item);
      cardSection.addItem(cardElement);
    },
  },
  cardsGallery
);
cardSection.renderItems();

const popupImage = new PopupWithImage(modalWindowCardView, {
  image: modalImage,
  caption: modalCaption,
});
popupImage.setEventListeners();
function handleCardPopup(card) {
  // suggested by Sprint 7 project to keep this func in index.js for now
  popupImage.open(card); // since "this" is prohibited outside of classes, and passing an arg to the func as a param to this func causes a lexical ref err, then in the class's handler func it would need to pass the ready-made getInfo() method to pass through unimpeded
}

const formValidators = {};
Array.from(document.forms).forEach((formElement) => {
  const validator = new FormValidator(configuration, formElement);
  formValidators[formElement.id] = validator;
  validator.enableValidation();
});
/* END DECLARATIVE SECTION */

/* PROFILE SECTION */
const userProfile = new UserInfo({
  name: profileName,
  description: profileDescription,
});

const popupProfile = new PopupWithForm(
  modalWindowProfile,
  (event, { name, description }) => {
    event.preventDefault();
    userProfile.setUserInfo(name, description);
    popupProfile.close();
  },
  configuration.inputSelector
);
popupProfile.setEventListeners();

buttonEditProfile.addEventListener("click", () => {
  const { name, description } = userProfile.getUserInfo();
  inputProfileName.value = name;
  inputProfileDescription.value = description;
  formValidators["profile_form"].resetFormValidation(); // input always valid when taking from the html page
  popupProfile.open();
});

/* CARD ADD SECTION */
const popupCardAdd = new PopupWithForm(
  modalWindowCardAdd,
  (event, cardInputs) => {
    event.preventDefault();
    const cardElement = createCard(cardInputs);
    cardSection.addItem(cardElement, "prepend"); // can still be used to add later cards, not just init ones
    popupCardAdd.close();
    formCardAdd.reset();
    formValidators["card-add_form"].disableButton();
  },
  configuration.inputSelector
);
popupCardAdd.setEventListeners();

buttonAddCard.addEventListener("click", () => {
  // don't show errors upon opening the modal when no input is issued
  popupCardAdd.open();
});
/* END CARD ADD SECTION */
