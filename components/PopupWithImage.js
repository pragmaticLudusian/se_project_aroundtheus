import Popup from "../components/Popup.js";
import { modalImage, modalCaption } from "../utils/constants.js";

export default class PopupWithImage extends Popup {
  constructor(popup) {
    super(popup);
  }

  // setEventListeners() doesn't need super because it's working in a default behavior

  open({ name, link }) {
    modalImage.src = link;
    modalImage.alt = name;
    modalCaption.textContent = name;
    super.open();
  }

  // close()
}
