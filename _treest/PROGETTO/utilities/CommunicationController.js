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

  static async setProfile(sid, name, picture) {
    const endPoint = "setProfile";

    const parameter = { sid: sid };
    if (name != undefined) {
      parameter.name = name;
    }
    if (picture != "") {
      parameter.picture = picture;
    }

    let result = await CommunicationController._treestRequest(
      endPoint,
      parameter
    );
    return result;
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

  static async addPost(sid, did, delay, status, comment) {
    const endPoint = "addPost";

    let parameter = {
      sid: sid,
      did: did,
    };

    if (comment != "") {
      parameter.comment = comment;
    }
    if (delay != "") {
      parameter.delay = delay;
    }

    if (status != "") {
      parameter.status = status;
    }

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

  //FUNZIONALITA' ESAME GENNAIO
  static async statoLineaTreEst(did) {
    const endPoint = "statolineatreest";
    const parameter = { did: did };
    return await CommunicationController._treestRequest(endPoint, parameter);
  }

  //FUNZIONALITA' ESAME FEBBRAIO
  static async getSponsor(sid) {
    const endPoint = "locspons";
    const parameter = { sid: sid };
    return await CommunicationController._treestRequest(endPoint, parameter);
  }
}
