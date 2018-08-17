export default class Sync {
  constructor() {
    this.storage = window.localStorage;
  }

  get(item) {
    const storageItem = this.storage.getItem(item);

    if (this._isJSON(storageItem)) {
      return JSON.parse(storageItem);
    } else {
      return storageItem;
    }
  }

  set(itemName, item) {
    const storageItem = this._isJSON(item) ? JSON.stringify([item]) : item;
    this.storage.setItem(itemName, storageItem);
  }


  update(itemName, data) {
    const oldItem = this.get(itemName);
    const storageItem = this._isJSON(oldItem) ? [...oldItem, data] : data;
    this.set(itemName, storageItem);
  }

  _isJSON(str) {
    try {
      const json = JSON.parse(str);
      if (Object.prototype.toString.call(json).slice(8, -1) !== 'Object') {
        return false;
      }
    } catch (e) {
      return false;
    }
    return;
  }
}
