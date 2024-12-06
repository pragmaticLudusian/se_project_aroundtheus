import Popup from "./Popup";

export default class PopupWithConfirm extends Popup {
  constructor(popup, handleSubmit) {
    super(popup);
    this._handleSubmit = handleSubmit;
  }

  setEventListeners() {
    super.setEventListeners();
    this._popup.addEventListener("submit", (event) => {
      this._handleSubmit(event, this._initiator); // continued from the open(initiator) method
    });
  }

  open(initiator) {
    this._initiator = initiator; // pass info about what triggered the popup to open
    super.open();
  }
}
