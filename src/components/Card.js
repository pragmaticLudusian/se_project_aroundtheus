export default class Card {
  constructor(
    { name, link, _id, isLiked }, // reflect from JSON
    cardSelector,
    handleImageClick,
    handleCardDelete,
    handleCardLike
  ) {
    this._name = name;
    this._link = link;
    this._id = _id;
    this._isLiked = isLiked;
    this._cardSelector = cardSelector; // template
    this._handleImageClick = handleImageClick; // handleCardPopupImage(); all these are currently @index.js
    this._handleCardDelete = handleCardDelete; // handleCardPopupDelete(); confirmation popup to delete a card
    this._handleCardLike = handleCardLike; // handleCardLike(); used to handle the DOM side of the like boolean status from the server
  }

  _setEventListeners() {
    this._cardImage.addEventListener("click", () => {
      this._handleImageClick(this.getInfo()); // use just name and link to load the popup image
    });

    this._cardLike.addEventListener("click", () => {
      this._handleCardLike(this); // if callback was just a ref to the method, it would pass as the card image element, so instead this would pass along the class object with all the class-specific vars
    });

    this._cardDelete.addEventListener("click", () => {
      this._handleCardDelete(this); // same here, but here the element's going to be needed to delete the card from DOM just after requesting the api to delete from the server
    });
  }

  likeCard(isLiked) {
    this._isLiked = isLiked;
    const method = this._isLiked ? "add" : "remove";
    this._cardLike.classList[method]("card__like_active");
    // console.log(this.getInfo(), this._isLiked);
  }

  deleteCard() {
    // works with the same principle of generateCard(), but also possible from index.js
    this._cardDelete.closest(".card").remove();
    this._cardElement = null; // free up resources
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
    this._cardImage.alt = this._name;
    this._cardElement.querySelector(".card__title").textContent = this._name;
    this._cardLike = this._cardElement.querySelector(".card__like");
    this.likeCard(this._isLiked);
    this._cardDelete = this._cardElement.querySelector(".card__delete-button");
    this._setEventListeners();

    return this._cardElement;
  }

  getInfo() {
    return {
      name: this._name, // even if the form to add a card is called "title", it can be aliased by ref or by deconstructors
      link: this._link,
      id: this._id,
      isLiked: this._isLiked,
    };
  }
}
