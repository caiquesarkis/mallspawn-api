import express from "express"
import mysql from 'mysql2';
import 'dotenv/config'
import { stat } from "fs";


const app = express()
const port = process.env.API_PORT || 5000

app.use(express.json())
app.use(express.urlencoded({extended: true}))


const connection = mysql.createConnection({
  host: process.env.DB_HOST,
  password: process.env.DB_PASSWORD,
  user: process.env.DB_USER,
  database: process.env.DB_NAME
});


// GET
app.get('/', (req, res) => {
  res.send('Wellcome to Mallspawn Api!')
})

app.get('/stores', (req, res)=>{
  let query = 'SELECT * FROM stores;'
  connection.query(query, (err, results, fields) => {
        res.send(results)
    }
  );
})

app.get('/products', (req, res) => {
  const query = 'SELECT * FROM products;'
  connection.query(query, (err, results, fields) => {
        res.send(results)
    }
  );
})



app.post('/products', (req,res)=>{
  let store = 'Multithings';
  
  const {name, description, category, status, price, compareAtPrice, images} = req.body
  const query = `INSERT INTO products (Store_Name, Name, Description, Category, IsActive, Price, CompareAtPrice, Images) VALUES ("${store}", "${name}", "${description}", "${category}", ${status}, "${price}", "${compareAtPrice}", '["kakak","kaka"]');`
  connection.query(query, (err, results, fields) => {
      res.send(err + query)
    }
  );
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})

