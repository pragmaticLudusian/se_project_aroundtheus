export default class Card {
  constructor(data, cardSelector, handleImageClick) {
    this._name = data.name; // object
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
    this._cardLike.removeEventListener("click", this._handleCardLike);
    this._cardDelete.removeEventListener("click", this._handleCardDelete);
    this._cardImage.removeEventListener("click", this.handleCardPopup);
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
    this._cardImage.src = this._link;
    this._cardImage.alt = this._name;
    this._cardElement.querySelector(".card__title").textContent = this._name;
    this._cardLike = this._cardElement.querySelector(".card__like");
    this._cardDelete = this._cardElement.querySelector(".card__delete-button");
    this._setEventListeners();

    return this._cardElement;
  }

  getInfo() {
    return { name: this._name, link: this._link };
  }
}
