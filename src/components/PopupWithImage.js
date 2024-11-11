import Popup from "../components/Popup.js";
import { modalImage, modalCaption } from "../utils/constants.js";

export default class PopupWithImage extends Popup {
  constructor(popup) {
    super(popup); // popup selected element
  }

  // setEventListeners() doesn't need super because it's working in a default behavior

  open({ title, link }) {
    modalImage.src = link;
    modalImage.alt = title;
    modalCaption.textContent = title;
    super.open();
  }

  // close() doesn't need method overriding either
}
