import "./index.css";
import Section from "../components/Section.js";
import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
import PopupWithImage from "../components/PopupWithImage.js";
import PopupWithForm from "../components/PopupWithForm.js";
import PopupWithConfirm from "../components/PopupWithConfirm.js";
import UserInfo from "../components/UserInfo.js";
/* DECLARATIVE SECTION */
import {
  configuration,
  buttonEditProfile,
  profileName,
  profileDescription,
  profileAvatar,
  modalWindowProfile,
  inputProfileName,
  inputProfileDescription,
  buttonAddCard,
  modalWindowCardAdd,
  formCardAdd,
  modalWindowCardView,
  modalImage,
  modalCaption,
  modalWindowCardDelete,
  cardsGallery,
} from "../utils/constants.js";
import Api from "../components/Api.js";

const api = new Api({
  baseUrl: "https://around-api.en.tripleten-services.com/v1",
  headers: {
    "content-type": "application/json",
    authorization: "c48564f3-ecfb-4a65-b35d-031aabc842ce",
  },
});

let cardSection; // since the card section is being tied to the DOM and is needed to both init and add cards later on, it would need to be declared at the global scope and can be reassigned with let.

api.getUserAndCards([
  // this is a Promise array that would get fulfilled when all subsequent promises are fulfilled too (&&-style)
  api
    .getUserProfileData() // return user from server as a JSON object
    .then((json) => {
      userProfile.setUserInfo(json.name, json.about); // despite being async, this will already be initialized thanks to event loop
      userProfile.setAvatar(json.avatar);
    })
    .catch((err) => {
      console.error(err); // w/out a way to return or print error to console it gets uncaught
    }),
  api
    .getInitialCards() // return the card array from the server
    .then((cardArray) => {
      // because the section const has to be accessed in the async bubble, exporting it would be a slight more complicated when new cards have to be added to the server, not just from it
      // also of note is that the "name" attrib is standard to the arguably-dupe "name" for the profile section
      cardSection = new Section(
        {
          items: cardArray,
          renderer: (item) => {
            const cardElement = createCard(item);
            cardSection.addItem(cardElement);
          },
        },
        cardsGallery
      );
      cardSection.renderItems();
    })
    .catch((err) => {
      console.error(err);
    }),
]);

const createCard = (cardItem) => {
  const card = new Card(
    cardItem,
    "#card-template",
    handleCardPopup,
    handleCardPopupDelete
  );
  return card.generateCard();
};

function handleCardPopup(card) {
  // suggested by Sprint 7 project to keep this func in index.js for now
  popupImage.open(card); // since "this" is prohibited outside of classes, and passing an arg to the func as a param to this func causes a lexical ref err, then in the class's handler func it would need to pass the ready-made getInfo() method to pass through unimpeded
}
const popupImage = new PopupWithImage(modalWindowCardView, {
  image: modalImage,
  caption: modalCaption,
});
popupImage.setEventListeners();

function handleCardPopupDelete(card) {
  popupCardDelete.open(card);
}
const popupCardDelete = new PopupWithConfirm(
  modalWindowCardDelete,
  (event, card) => {
    // this subclass acts like the form popup subclass except it has no inputs. It does however help to pass the necessary param to handle card deletion
    event.preventDefault();
    // console.log(card._cardElement);
    api
      .deleteCard(card.getInfo().id)
      .then(() => {
        card.deleteCard();
      })
      .catch((err) => {
        console.error(err);
      })
      .finally(() => {
        popupCardDelete.close();
      });
  }
);
popupCardDelete.setEventListeners();

const formValidators = {};
Array.from(document.forms).forEach((formElement) => {
  const validator = new FormValidator(configuration, formElement);
  formValidators[formElement.id] = validator;
  validator.enableValidation();
});
/* END DECLARATIVE SECTION */

/* PROFILE SECTION */
const userProfile = new UserInfo({
  // pass as arguments the HTML DOM profile elements
  name: profileName,
  description: profileDescription,
  avatar: profileAvatar,
});

const popupProfile = new PopupWithForm(
  modalWindowProfile,
  (event, { name, description }) => {
    event.preventDefault();
    api
      .setUserProfileData(name, description)
      .then(() => {
        userProfile.setUserInfo(name, description);
      })
      .catch((err) => {
        console.error(err);
      });
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
/* END PROFILE SECTION */

/* CARD ADD SECTION */
const popupCardAdd = new PopupWithForm(
  modalWindowCardAdd,
  (event, { name, link }) => {
    event.preventDefault();
    api
      .addNewCard(name, link)
      .then((newCard) => {
        const cardElement = createCard(newCard);
        cardSection.addItem(cardElement, "prepend"); // can still be used to add later cards, not just init ones
      })
      .catch((err) => {
        console.error(err);
      });
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
