import * as SQLite from "expo-sqlite";

const db = SQLite.openDatabase("projects.db");

export const countProjects = () =>{
  return new Promise((resolve, reject) => {
    db.transaction(tx => {
    tx.executeSql(`SELECT COUNT(*) AS count FROM project`,
      null,
      (sqlTxn, res) => resolve(res.rows._array[0]),
      error => reject('Error on count'));
    });
  }); 
}

export const getProjects = () => {
  return new Promise((resolve, reject) => {
    db.transaction(tx => {
    tx.executeSql(`SELECT id, name, startdate, finishdate, price FROM project`,
      null,
      (sqlTxn, res) => resolve(res.rows._array),
      error => reject('Error on SELECT: ' + error));
    });
  });
};

export const getProject = async (id) => {
  return new Promise((resolve, reject) => {
    db.transaction(tx => {
      tx.executeSql(`SELECT id, name, startdate, finishdate, price FROM project WHERE id = ?`,
        [id],
        (sqlTxn, res) => resolve(res.rows._array),
        error => reject('Error on SELECT: ' + error));
      });
    });
};

export const createProject = async (project) => {
  db.transaction(tx => {
    tx.executeSql(`INSERT INTO project (name, startdate, finishdate, price) VALUES (?, ?, ?, ?)`,
      [project.name, project.startDate, project.finishDate, project.price],
      (sqlTxn, res) => console.log('Project inserted succesfully. Id =',res.insertId),
      error => console.log('Error on INSERT'));
  });
};

export const deleteProject = async (id) => {
  db.transaction(tx => {
    tx.executeSql(`DELETE FROM project WHERE id=?`,
      [id],
      (sqlTxn, res) => console.log(`Project of id = ${id} was deleted.`),
      error => console.log('Error on DELETE project'));
  });
};

export const updateProject = async (id, project) => {
  db.transaction(tx => {
    tx.executeSql(`UPDATE project SET name=?, startdate=?, finishdate=?, price=? WHERE id=?`,
      [project.name, project.startDate, project.finishDate, project.price, id],
      (sqlTxn, res) => console.log(`Project of id = ${id} was updated.`),
      error => console.log('Error on UPDATE project'));
  });
};