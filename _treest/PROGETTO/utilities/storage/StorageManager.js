import * as SQLite from "expo-sqlite";

const transactionPromise = function (transactionCode) {
  /*questo codice costruisce una promessa
   la funzione ha in input due parametri:
   - resolve: caso in cui funziona
   - reject: caso non funzionante
   */

  return new Promise((resolve, reject) => {
    //this è il db
    this.transaction(
      transactionCode,
      (e) => reject(e),
      () => resolve(this.result) //mi salvo nell'attributo result il risultato della transazione
    );
  });
};

export default class StorageManager {
  constructor() {
    this.db = SQLite.openDatabase("DB");
    //trasformo la transazione con le promesse
    // --> aggiungo a db un nuovo attributo/funzione (transactionPromise)
    this.db.transactionPromise = transactionPromise;
    this.init(); //creo subito la table
  }

  init() {
    this.createTable().catch((err) => console.log(err));
  }

  async createTable() {
    const db = this.db;
    const transactionCode = function (tx) {
      let query =
        "Create TABLE if not EXISTS user(user text not null PRIMARY KEY, picture text, pversion integer not null)";
      tx.executeSql(
        query,
        [], //per la creazione della tabella non servono parametri
        (tx, result) => {
          //gestione del risulutato
          db.result = result; //quando leggiamo il risultato lo salviamo nell'attributo result di db
        },
        (tx, err) => {
          throw err;
        }
      );
    };
    return await this.db.transactionPromise(transactionCode); //ritorno la promessa
  }

  async getUser(user) {
    const db = this.db;
    const transactionCode = function (tx) {
      let query = "select * from user where user = ?"; //? placeholder, ci andrà il parametro passato in input
      tx.executeSql(
        query,
        [user],
        (tx, result) => {
          //gestione del risolutato
          if (result.rows.length > 0) {
            // console.log("trovato utente");
            db.result = result.rows._array[0]; //prendiamo la prima riga del risulato (sarà sempre una)
          } else {
            // console.log("utente non presente");
            db.result = null;
          }
        },
        (tx, err) => {
          console.error(err);
        }
      );
    };
    return await this.db.transactionPromise(transactionCode); //ritorno la promessa
  }

  async getAllUser() {
    const db = this.db;
    const transactionCode = function (tx) {
      let query = "select * from user";
      tx.executeSql(
        query,
        [],
        (tx, result) => {
          //gestione del risolutato
          if (result.rows.length > 0) {
            db.result = result.rows;
          } else {
            db.result = null;
          }
        },
        (tx, err) => {
          console.error(err);
        }
      );
    };
    return await this.db.transactionPromise(transactionCode); //ritorno la promessa
  }

  async insertUser(user, picture, pversion) {
    const db = this.db;
    const transactionCode = function (tx) {
      let query = "replace into user values (?, ?, ?)";
      tx.executeSql(
        query,
        [user, picture, pversion],
        (tx, result) => {
          //gestione del risolutato
          // console.log("utente inserito");
          // console.log("utente " + user + " pversion " + pversion);
        },
        (tx, err) => {
          console.error(err);
        }
      );
    };
    return await this.db.transactionPromise(transactionCode); //ritorno la promessa
  }
}
