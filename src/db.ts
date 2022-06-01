import 'dotenv/config'
import * as readline from 'readline'

import mysql = require('mysql2/promise');
const pool = mysql.createPool({
  host: process.env.DB_HOST,
  password: process.env.DB_PASSWORD,
  user: process.env.DB_USER,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

async function runQuery(query:string){
  const result = await pool.query(query);
  return result
}


async function createDB() {
  await runQuery(`CREATE DATABASE mallspawn;`)
  await runQuery(`USE mallspawn;`)
  await runQuery(`
    CREATE TABLE shop_owners (
      owner_username varchar(255) PRIMARY KEY, 
      owner_password varchar(255),
      owner_salt varchar(255)
    );
  `)
  await runQuery(`
    CREATE TABLE stores (
      store_name varchar(255) PRIMARY KEY, 
      owner_username varchar(255),
      FOREIGN KEY (owner_username) REFERENCES shop_owners(owner_username)
    );
  `)
  await runQuery(`
    CREATE TABLE Products (
      product_id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
      store_name varchar(255),
      FOREIGN KEY (store_name) REFERENCES stores(store_name),
      name varchar(255),
      description varchar(2000),
      category varchar(255),
      is_active bool,
      price float(9,2),
      compare_at_price float(9,2),
      images JSON
    );
  `)
}


async function deleteDB() {

  await runQuery(`DROP DATABASE mallspawn;`)
}

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

rl.question(`Create or Delete DB? [C/D]`, (choice:string) => {
  switch (choice){
    case "C":
      createDB()
      console.log("Database was created successfully")
      break
    case "D":
      deleteDB()
      console.log("Database was deleted successfully")
      break
  }
});





