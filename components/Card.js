class Card {
  constructor(data, cardSelector, handleImageClick) {
    this._data = data; // object
    this._cardSelector = cardSelector; // template
    this._handleImageClick = handleImageClick; // func() cur. handleCardPopup
  }

  _setEventListeners() {
    this._cardImageElement.addEventListener("click", () => {
      this._handleImageClick(this);
    });
  }

  _handleCardLike() {}

  _handleCardDelete() {}

  _getTemplate() {}

  generateCard() {}
}
