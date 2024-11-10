export default class Card {
  constructor(data, cardSelector, handleImageClick) {
    this._title = data.title; // object
    this._link = data.link; // object
    this._cardSelector = cardSelector; // template
    this._handleImageClick = handleImageClick; // handleCardPopup() currently @index.js
  }

  _setEventListeners() {
    this._cardImage.addEventListener("click", () => {
      this._handleImageClick(this);
    });

    this._cardLike.addEventListener("click", () => {
      this._handleCardLike(this); // if callback was just a ref to the method, it would pass as the card image element, so instead this would pass along the class object with all the class-specific vars
    });

    this._cardDelete.addEventListener("click", () => {
      this._handleCardDelete(this);
    });
  }

  _handleCardLike() {
    this._cardLike.classList.toggle("card__like_active");
  }

  _handleCardDelete() {
    this._cardDelete.closest(".card").remove();
  }

  _getTemplate() {
    const cardTemplate = document
      .querySelector(this._cardSelector)
      .content.querySelector(".card")
      .cloneNode(true); // pre-loop for cardGenerate()
    return cardTemplate;
  }

  generateCard() {
    this._cardElement = this._getTemplate(); // treat like class-specific var (non-static, kinda like let)
    this._cardImage = this._cardElement.querySelector(".card__image"); // this._var would be used for handling image click, so it's not a const here
    this._cardImage.src = this._link; // formally referred to as "class fields" or properties
    this._cardImage.alt = this._title;
    this._cardElement.querySelector(".card__title").textContent = this._title;
    this._cardLike = this._cardElement.querySelector(".card__like");
    this._cardDelete = this._cardElement.querySelector(".card__delete-button");
    this._setEventListeners();

    return this._cardElement;
  }

  getInfo() {
    return { title: this._title, link: this._link };
  }
}
