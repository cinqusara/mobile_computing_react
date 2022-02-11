/** MEMORIZZAZIONE PERSISTENTE */

import AsyncStorage from "@react-native-async-storage/async-storage";

export default class Storage {
  static async checkFirstRun() {
    const firstRun = await AsyncStorage.getItem("firstRun");
    if (firstRun != null) {
      return false;
    } else {
      await AsyncStorage.setItem("firstRun", "false");
      return true;
    }
  }

  static async saveSid(sid) {
    await AsyncStorage.setItem("sid", sid);
  }

  static async getSid() {
    const sidSaved = await AsyncStorage.getItem("sid");
    return sidSaved;
  }

  static async saveDid(did) {
    try {
      const didString = JSON.stringify(did);
      await AsyncStorage.setItem("did", didString);
    } catch (e) {
      console.error("Errore " + e);
    }
  }

  static async getDid() {
    const didSaved = await AsyncStorage.getItem("did");
    if (didSaved != null) {
      return didSaved;
    } else {
      return null;
    }
  }
}
