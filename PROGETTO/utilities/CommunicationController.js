export default class CommunicationController {
  static BASE_URL = "https://ewserver.di.unimi.it/mobicomp/treest/";

  static async _treestRequest(endpoint, parameters) {
    console.log("sending request to: " + endpoint);
    const url = this.BASE_URL + endpoint + ".php";
    let httpResponse = await fetch(url, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(parameters),
    });
    const status = httpResponse.status;
    if (status == 200) {
      let deserializedObject = await httpResponse.json();
      return deserializedObject;
    } else {
      let error = new Error(
        "Error message from the server. HTTP status: " + status
      );
      throw error;
    }
  }

  /* chiamate di rete  */
  static async register() {
    const endPoint = "register";
    const parameter = {};
    return await CommunicationController._treestRequest(endPoint, parameter);
  }

  static async getProfile(sid) {
    const endPoint = "getProfile";
    const parameter = { sid: sid };
    return await CommunicationController._treestRequest(endPoint, parameter);
  }

  /* TODO testare la set */
  static async setProfile(sid, name, picture) {
    const endPoint = "setProfile";
    const parameter = { sid: sid, name: name, picture: picture };
    return await CommunicationController._treestRequest(endPoint, parameter);
  }

  static async getLines(sid) {
    const endPoint = "getLines";
    const parameter = { sid: sid };
    return await CommunicationController._treestRequest(endPoint, parameter);
  }

  static async getStations(sid, did) {
    const endPoint = "getStations";
    const parameter = { sid: sid, did: did };
    return await CommunicationController._treestRequest(endPoint, parameter);
  }

  static async getPosts(sid, did) {
    const endPoint = "getPosts";
    const parameter = { sid: sid, did: did };
    return await CommunicationController._treestRequest(endPoint, parameter);
  }

  /* TODO capire come strutturare add post (per i campi opzionali) */
  static async addPost(sid, did, delay, status, comment) {
    const endPoint = "addPost";
    const parameter = {
      sid: sid,
      did: did,
      delay: delay,
      status: status,
      comment: comment,
    };
    return await CommunicationController._treestRequest(endPoint, parameter);
  }

  static async getUserPicture(sid, uid) {
    const endPoint = "getUserPicture";
    const parameter = { sid: sid, uid: uid };
    return await CommunicationController._treestRequest(endPoint, parameter);
  }

  static async follow(sid, uid) {
    const endPoint = "follow";
    const parameter = { sid: sid, uid: uid };
    return await CommunicationController._treestRequest(endPoint, parameter);
  }

  static async unfollow(sid, uid) {
    const endPoint = "unfollow";
    const parameter = { sid: sid, uid: uid };
    return await CommunicationController._treestRequest(endPoint, parameter);
  }
}
