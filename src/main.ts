import express from "express"
import mysql from 'mysql2';
import 'dotenv/config'


const app = express()
const port = 3000

app.use(express.json())
app.use(express.urlencoded({extended: true}))


const connection = mysql.createConnection({
  host: 'localhost',
  password: process.env.DB_PASSWORD,
  user: 'root',
  database: 'mallspawn'
});




app.get('/stores', (req, res)=>{
  let query = 'SELECT * FROM stores;'
  connection.query(query, (err, results, fields) => {
        res.send(results)
    }
  );
})

app.get('/', (req, res) => {
  res.send('Wellcome to Mallspawn Api!')
})

app.get('/products', (req, res) => {
  res.send(req.query)
})

app.post('/products/add', (req,res)=>{
  res.send(req.body)
})


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})

