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
  buttonUpdateAvatar,
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
  modalWindowProfileAvatar,
  inputProfileAvatar,
  cardsGallery,
  submitProfileInfo,
  submitProfileAvatar,
  submitCardAdd,
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
let userId; // this is global too

// this is a Promise array that would get fulfilled when all subsequent promises are fulfilled too (&&-style)
// as such, it chains on a per-array basis, not per individual Promise
api
  .getUserAndCards([api.getUserProfileData(), api.getInitialCards()])
  .then(([{ _id, name, about, avatar }, cardArray]) => {
    userId = _id; // for future use
    userProfile.setUserInfo(name, about); // despite being async, this will already be initialized thanks to event loop (sync then async)
    userProfile.setAvatar(avatar);

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
    console.error(err); // w/out a way to return or print error to console it gets uncaught
  });

const createCard = (cardItem) => {
  const card = new Card(
    cardItem,
    "#card-template",
    handleCardPopupImage,
    handleCardPopupDelete,
    handleCardLike
  );
  return card.generateCard();
};

const formValidators = {};
Array.from(document.forms).forEach((formElement) => {
  const validator = new FormValidator(configuration, formElement);
  formValidators[formElement.id] = validator;
  validator.enableValidation();
});
/* END DECLARATIVE SECTION */

/* PROFILE INFO SECTION */
const userProfile = new UserInfo({
  // pass as arguments the HTML DOM profile elements
  name: profileName,
  description: profileDescription,
  avatar: profileAvatar,
});

buttonEditProfile.addEventListener("click", () => {
  const { name, description } = userProfile.getUserInfo();
  inputProfileName.value = name;
  inputProfileDescription.value = description;
  formValidators["profile_info_form"].resetFormValidation(); // input always valid when taking from the html page
  popupProfileInfo.open();
});

const popupProfileInfo = new PopupWithForm(
  modalWindowProfile,
  (event, { name, description }) => {
    event.preventDefault();
    popupProfileInfo.renderLoading(true); // renders faster when synced before the async begins
    api
      .setUserProfileData(name, description)
      .then(() => {
        userProfile.setUserInfo(name, description);
        popupProfileInfo.close();
      })
      .catch((err) => {
        console.error(err);
      })
      .finally(() => {
        popupProfileInfo.renderLoading(false);
      });
  },
  configuration.inputSelector,
  submitProfileInfo
);
popupProfileInfo.setEventListeners();
/* END PROFILE INFO SECTION */

/* PROFILE AVATAR SECTION */
buttonUpdateAvatar.addEventListener("click", () => {
  inputProfileAvatar.value = userProfile.getAvatar();
  popupProfileAvatar.open();
});

const popupProfileAvatar = new PopupWithForm(
  modalWindowProfileAvatar,
  (event, { avatar }) => {
    event.preventDefault();
    popupProfileAvatar.renderLoading(true);
    api
      .setUserProfileAvatar(avatar)
      .then(() => {
        userProfile.setAvatar(avatar);
        popupProfileAvatar.close();
      })
      .catch((err) => {
        console.error(err);
      })
      .finally(() => {
        popupProfileAvatar.renderLoading(false);
      });
  },
  configuration.inputSelector,
  submitProfileAvatar
);
popupProfileAvatar.setEventListeners();
/* END PROFILE AVATAR SECTION */

/* CARD ADD SECTION */
buttonAddCard.addEventListener("click", () => {
  // don't show errors upon opening the modal when no input is issued
  popupCardAdd.open();
});

const popupCardAdd = new PopupWithForm(
  modalWindowCardAdd,
  (event, { title, link }) => {
    event.preventDefault();
    popupCardAdd.renderLoading(true, "Creating...");
    api
      .addNewCard(title, link)
      .then((newCard) => {
        const cardElement = createCard(newCard);
        cardSection.addItem(cardElement, "prepend"); // can still be used to add later cards, not just init ones
        popupCardAdd.close();
        formCardAdd.reset();
        formValidators["card-add_form"].disableButton();
      })
      .catch((err) => {
        console.error(err);
      })
      .finally(() => {
        popupCardAdd.renderLoading(false);
      });
  },
  configuration.inputSelector,
  submitCardAdd
);
popupCardAdd.setEventListeners();
/* END CARD ADD SECTION */

/* CARD VIEW IMAGE SECTION */
function handleCardPopupImage(card) {
  // suggested by Sprint 7 project to keep this func in index.js for now
  popupImage.open(card); // since "this" is prohibited outside of classes, and passing an arg to the func as a param to this func causes a lexical ref err, then in the class's handler func it would need to pass the ready-made getInfo() method to pass through unimpeded
}

const popupImage = new PopupWithImage(modalWindowCardView, {
  image: modalImage,
  caption: modalCaption,
});
popupImage.setEventListeners();
/* END CARD VIEW IMAGE SECTION */

/* CARD LIKE/UNLIKE SECTION */
function handleCardLike(card) {
  const request = card.getInfo().isLiked ? "unlikeCard" : "likeCard"; // inverted logic gets handled here
  api[request](card.getInfo().id)
    .then((cardRes) => {
      card.likeCard(cardRes.isLiked);
    })
    .catch((err) => {
      console.error(err);
    });
}
/* END CARD LIKE/UNLIKE SECTION */

/* CARD DELETE SECTION */
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
/* END CARD DELETE SECTION */
