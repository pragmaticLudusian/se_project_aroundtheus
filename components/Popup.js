class Popup {
  constructor(popup) {
    this._popup = document.querySelector(popup);
  }

  setEventListeners() {
    this._popup.addEventListener("click", handleMouseClick);
    document.addEventListener("keydown", this._handleEscClose);

    const button = this._popup.querySelector(".modal__close-button");
    button.addEventListener("click", () => closePopup(modal));
    // for callback func to call forward a func, it would still need to have an anon.func body
  }

  open() {
    this._popup.classList.add("modal_opened");
    this.setEventListeners();
  }

  close() {
    this._popup.classList.remove("modal_opened");
    this._popup.removeEventListener("click", handleMouseClick);
    document.removeEventListener("keydown", this._handleEscClose);
  }

  _handleEscClose(event) {
    if (event.key === "Escape") {
      closePopup(document.querySelector(".modal_opened"));
    }
  }
}
