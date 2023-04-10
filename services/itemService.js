import * as SQLite from "expo-sqlite";

const db = SQLite.openDatabase("projects.db");

export const getProjectItems = async (id) => {
  return new Promise((resolve, reject) => {
    db.transaction(tx => {
      tx.executeSql(`SELECT id, name, unitprice, quantity, totalprice, projectid, purchasedate FROM item where projectid =?`,
        [id],
        (sqlTxn, res) => resolve(res.rows._array),
        error => reject('Error on SELECT items: ' + error));
    });
  });
};

export const getItem = async (id) => {
  return new Promise((resolve, reject) => {
    db.transaction(tx => {
      tx.executeSql(`SELECT id, name, unitprice, quantity, totalprice, projectid, purchasedate FROM item where id =?`,
        [id],
        (sqlTxn, res) => resolve(res.rows._array),
        error => reject('Error on SELECT item: ' + error));
    });
  });
};

export const createItem = async (item) => {
  db.transaction(tx => {
    tx.executeSql(`INSERT INTO item (name, unitPrice, quantity, totalPrice, projectid, purchaseDate) VALUES (?, ?, ?, ?, ?, ?)`,
      [item.name, item.unitPrice, item.quantity, item.totalPrice, item.projectid, item.purchaseDate],
      (sqlTxn, res) => console.log('Item inserted succesfully. Id =',res.insertId),
      error => console.log('Error on INSERT'));
  });
};
export const updateItem = async (item) => {
  db.transaction(tx => {
    tx.executeSql(`UPDATE item SET name=?, unitPrice=?, quantity=?, totalPrice=?, projectid=?, purchaseDate=? WHERE id=?`,
      [item.name, item.unitPrice, item.quantity, item.totalPrice, item.projectid, item.purchaseDate, item.id],
      (sqlTxn, res) => console.log(`item of id = ${item.id} was updated.`),
      error => console.log('Error on UPDATE item'));
  });
};

export const deleteItem = async (id) => {
  db.transaction(tx => {
    tx.executeSql(`DELETE FROM item WHERE id=?`,
      [id],
      (sqlTxn, res) => console.log(`Item of id = ${id} was deleted.`),
      error => console.log('Error on DELETE item'));
  });
};