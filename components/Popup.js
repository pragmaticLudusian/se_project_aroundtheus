export default class Popup {
  constructor(popup) {
    this._popup = popup; // the popup selector (as an element)
  }

  setEventListeners() {
    this._popup.addEventListener("click", (event) => {
      if (this._popup === event.target) this.close();
    });
    document.addEventListener("keydown", (event) =>
      this._handleEscClose(event)
    );
    // this being the class object functions better inside anon.func as opposed to named callback
    const button = this._popup.querySelector(".modal__close-button");
    button.addEventListener("click", () => this.close());
    // for callback func to call forward a func, it would still need to have an anon.func body
  }

  open() {
    this._popup.classList.add("modal_opened");
    // this.setEventListeners();
  }

  close() {
    this._popup.classList.remove("modal_opened");
    // this._popup.removeEventListener("click", handleMouseClick);
    document.removeEventListener("keydown", this._handleEscClose);
  }

  _handleEscClose(event) {
    if (event.key === "Escape") {
      this.close();
    }
  }
}
