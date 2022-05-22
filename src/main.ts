import express from "express"
const app = express()
const port = 3000

app.use(express.json())
app.use(express.urlencoded({extended: true}))

// get the client
import mysql from 'mysql2';

// create the connection to database
const connection = mysql.createConnection({
  host: 'localhost',
  password: "33416738aA!",
  user: 'root',
  database: 'mallspawn'
});

// simple query



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

