import * as SQLite from "expo-sqlite";

const db = SQLite.openDatabase("projects.db");

export const getEmployees = async (id) => {
  return new Promise((resolve, reject) => {
    db.transaction(tx => {
      tx.executeSql(`SELECT id, name, lastName, startDate, finishDate, salary, projectId, workDays FROM employee where projectId =?`,
      [id],
      (sqlTxn, res) => resolve(res.rows._array), // Resolvemos con los resultados de la consulta
      error => reject('Error on SELECT employees: ' + error));
    });
  });
};

export const getEmployee = async (id) => {
  return new Promise((resolve, reject) => {
    db.transaction(tx => {
      tx.executeSql(`SELECT id, name, lastName, startDate, finishDate, salary, projectId, workDays FROM employee WHERE id =?`,
        [id],
        (sqlTxn, res) => resolve(res.rows._array), // Resolvemos con los resultados de la consulta
        error => reject('Error on SELECT employee: ' + error));
    });
  });
};

export const createEmployee = async (employee) => {
  db.transaction(tx => {
    tx.executeSql(`INSERT INTO employee (name, lastName, startDate, finishDate, salary, projectId, workDays) VALUES (?, ?, ?, ?, ?, ?, ?)`,
      [employee.name, employee.lastname, employee.startdate, employee.finishdate, employee.salary, employee.projectid, employee.workdays],
      (sqlTxn, res) => console.log('Employee inserted succesfully. Id =',res.insertId),
      error => console.log('Error on INSERT employee'));
  });
};

export const updateEmployee = async (employee) => {
  db.transaction(tx => {
    tx.executeSql(`UPDATE employee SET name=?, lastName=?, startDate=?, finishDate=?, salary=?,projectId=?, workDays=? WHERE id=?`,
      [employee.name, employee.lastname, employee.startdate, employee.finishdate, employee.salary, employee.projectid, employee.workdays, employee.id],
      (sqlTxn, res) => console.log(`Employee of id = ${employee.id} was updated.`),
      error => console.log('Error on UPDATE employee'));
  });
};

export const deleteEmployee = async (id) => {
  db.transaction(tx => {
    tx.executeSql(`DELETE FROM employee WHERE id=?`,
      [id],
      (sqlTxn, res) => console.log(`Employee of id = ${id} was deleted.`),
      error =>  console.log('Error on DELETE employee'));
  });
};