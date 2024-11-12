import Popup from "../components/Popup.js";

export default class PopupWithImage extends Popup {
  constructor(popup, modalElements) {
    super(popup); // popup selected element
    this._modalElements = modalElements; // callback for the modal's elements
  }

  // setEventListeners() doesn't need super because it's working in a default behavior

  open({ title, link }) {
    this._modalElements.image.src = link;
    this._modalElements.image.alt = title;
    this._modalElements.caption.textContent = title;
    super.open();
  }

  // close() doesn't need method overriding either
}
