import * as SQLite from "expo-sqlite";

const db = SQLite.openDatabase("projects.db");

const createTableProject = () =>{
  db.transaction((tx)=> {
    tx.executeSql(`CREATE TABLE IF NOT EXISTS project(
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name VARCHAR(30) NOT NULL,
      startDate DATE NOT NULL,
      finishDate DATE NOT NULL,
      price INT NOT NULL)`,
      [],
      (sqlTxn, res) =>{
        console.log('table PROJECT created successfully');
      },
      error => {
         console.log('error on creating table PROJECT'+ error.message);
      },)
    });
};

const createTableItem = () =>{
  db.transaction((tx)=> {
    tx.executeSql(`CREATE TABLE IF NOT EXISTS item(
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name VARCHAR(30) NOT NULL,
      unitPrice INT NOT NULL,
      quantity INT NOT NULL,
      totalPrice INT NOT NULL,
      projectid INT ,
      purchaseDate DATE NOT NULL,
      FOREIGN KEY (projectid) REFERENCES project(id))`,
      [],
      (sqlTxn, res) =>{
          console.log('table ITEM created successfully');
      },
      error => {
        console.error('error on creating table ITEM '+ error);
      },)
  });
};

const createTableEmployee = () =>{
    db.transaction((tx)=> {
      tx.executeSql(`CREATE TABLE IF NOT EXISTS employee(
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name VARCHAR(30) NOT NULL,
        lastName VARCHAR(30) NOT NULL,
        startDate DATE NOT NULL,
        finishDate DATE NOT NULL,
        salary INT NOT NULL,
        projectId INT NOT NULL,
        workDays INTEGER DEFAULT 0,
        FOREIGN KEY (projectId) REFERENCES project(id)
        )`,
        [],
        (sqlTxn, res) =>{
            console.log('table EMPLOYEE created successfully');
        },
        error => {
          console.error('error on creating table EMPLOYEE '+ error);
        },)
    });
  };

export const createTables = () => {
    createTableProject();
    createTableItem();
    createTableEmployee();
};