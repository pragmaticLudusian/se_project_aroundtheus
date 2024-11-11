export default class Section {
  // non-tangible class to add elements to the webpage
  constructor({ items, renderer }, selector) {
    this._items = items; // array of objects
    this._renderer = renderer; // custom-tailored func for classes
    this._selector = document.querySelector(selector); // class/id selector
  }

  renderItems() {
    this._items.forEach((item) => {
      this._renderer(item); // pass item out of array as arg to the function body inside index.js
    });
  }

  addItem(element, method = "append") {
    this._selector[method](element); // add elem to selected container
  }
}
