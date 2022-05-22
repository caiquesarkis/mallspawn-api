import express from "express"
import mysql from 'mysql2';
import 'dotenv/config'


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


// POST

app.post('/stores',(req, res)=>{
  const {Store_Name, Owner} = req.body
  const query = `INSERT INTO stores (Store_Name, Owner) VALUES ("${Store_Name}", "${Owner}")`
  connection.query(query,(err, result)=>{
    if(err){
      res.send(err)
    }else{
      res.send("Loja cadastrada com sucesso!")
    }
  })
})

app.post('/products', (req,res)=>{
  let store = 'Mechdevil';
  const {name, description, category, status, price, compareAtPrice, images} = req.body
  const query = `INSERT INTO products (Store_Name, Name, Description, Category, IsActive, Price, CompareAtPrice, Images) VALUES ("${store}", "${name}", "${description}", "${category}", ${status}, "${price}", "${compareAtPrice}", '${JSON.stringify(images)}');`

  connection.query(query, (err) => {
      if(err){
        res.send(err)
      }else{
        res.send("Produto cadastrado com sucesso!")
      }
    }
  );
})

app.listen(port, () => {
  console.log(`API is running on port ${port}`)
})

