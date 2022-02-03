export class Model {
  constructor() {}

  set Sid(sid) {
    this._sid = sid;
  }

  get Sid() {
    return this._sid;
  }

  set Did(did) {
    this._did = did;
  }

  get Did() {
    return this._did;
  }

  set LineSelected(line) {
    this._lineSelected = line;
  }

  get LineSelected() {
    return this._lineSelected;
  }
}

export default new Model();
