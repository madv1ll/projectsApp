import * as SQLite from "expo-sqlite";

const db = SQLite.openDatabase("projects.db");

const createTableItems = () =>{
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
                console.log('table item created successfully');
            },
            error => {
                console.error('error on creating table item '+ error);
            },)
        });
};

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
                console.log('table project created successfully');
            },
            error => {
                console.log('error on creating table project'+ error.message);
            },)
        });
};

export const createTables = () => {
    createTableProject();
    createTableItems();
};