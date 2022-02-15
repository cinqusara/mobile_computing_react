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

  set UserName(name) {
    this._name = name;
  }

  get UserName() {
    return this._name;
  }

  set UserImg(img) {
    this._img = img;
  }

  get UserImg() {
    return this._img;
  }

  set AuthorName(name) {
    this._name = name;
  }

  get AuthorName() {
    return this._name;
  }

  
  set SponsorSelected(s) {
    this._sponsor = s;
  }

  get SponsorSelected() {
    return this._sponsor;
  }

  set AllSponsor(s) {
    this._sponsors = s;
  }

  get AllSponsor() {
    return this._sponsors;
  }
}

export default new Model();
