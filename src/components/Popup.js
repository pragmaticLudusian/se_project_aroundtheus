export default class Popup {
  constructor(popup) {
    this._popup = popup; // the popup selector (as an element)
  }

  setEventListeners() {
    this._popup.addEventListener("click", (event) => {
      if (this._popup === event.target) this.close();
    });
    const closeButton = this._popup.querySelector(".modal__close-button");
    closeButton.addEventListener("click", () => this.close());
    // for callback func to call forward a func, it would still need to have an anon.func body, since "this" being the class object functions better inside anon.func as opposed to a named callback
  }

  open() {
    this._escCallback = this._handleEscClose.bind(this); // apparently with named callbacks - which are required to be removed - "this" in _hEC will refer to the whole document and not the popup instance, so binding it ensures that the popup itself can be passed through without additional args and retain event.key...
    document.addEventListener("keydown", this._escCallback); // ...however, using bind() causes an entirely different function with a different ref to be created, so the original ref would be lost, if not to have it saved into a class field to remove the event listener.
    this._popup.classList.add("modal_opened");
  }

  close() {
    this._popup.classList.remove("modal_opened");
    document.removeEventListener("keydown", this._escCallback); // QoL and it can be re-enabled upon opening the popup
  }

  _handleEscClose(event) {
    if (event.key === "Escape") {
      this.close();
    }
  }
}
