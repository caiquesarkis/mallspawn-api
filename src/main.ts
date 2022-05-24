import express from "express"
import mysql from 'mysql2';
import 'dotenv/config';
import session from 'express-session';
import path from 'path';

const app = express()
const port = process.env.API_PORT || 5000

app.use(session({
	secret: 'secret',
	resave: true,
	saveUninitialized: true
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'static')));

declare module 'express-session' {
  interface SessionData {
    username: string;
    password: string;
    loggedIn: boolean;
  }
}


const connection = mysql.createConnection({
  host: process.env.DB_HOST,
  password: process.env.DB_PASSWORD,
  user: process.env.DB_USER,
  database: process.env.DB_NAME
});



// GET
app.get('/stores', (req, res)=>{
  const query = 'SELECT * FROM stores;'
  connection.query(query, (err, results) => {
        res.send(results)
    }
  );
})

app.get('/products', (req, res) => {
  const query = 'SELECT * FROM products;'
  connection.query(query, (err, results) => {
        res.send(results)
    }
  );
})

app.get('/shop_owners', (req, res) => {
  const query = 'SELECT * FROM shop_owners;'
  connection.query(query, (err, results) => {
        res.send(results)
    }
  );
})


// POST

// Registry

app.post('/new_owner', (req, res)=>{
  const {owner_username, owner_password} = req.body
  const query = `INSERT INTO shop_owners (owner_username, owner_password) VALUES ("${owner_username}", "${owner_password}")`
  connection.query(query, (err) => {
      if(err){
        res.send(err)
      }else{
        res.send("Usuário cadastrado com sucesso!")
      }
    }
  );
})

// login
app.post('/auth',(req, res)=>{
  const {username, password} = req.body
  console.log(req.body)
  if (username && password && !req.session.username) {
		connection.query(`SELECT * FROM shop_owners WHERE owner_username = "${username}" AND owner_password = "${password}"`, (err, results)=> {
			if (err){
        res.send("User couldn't login.")
        throw err;
      }else{
        const owner = JSON.parse(JSON.stringify(results))[0];
        if((owner) && (username == owner.owner_username) && (password == owner.owner_password)){
          req.session.username = username;
          req.session.password = password;
          req.session.loggedIn = true;

          res.send(`User ${username} is logged in!`)
        }else{
          res.send("wrong user or password.")
        }
      }
   })
  }
})

// Logout

app.post('/logout',(req, res)=>{
  if(req.session){
    req.session.destroy((err) => {
      res.send('Logged out.')
    })
  }
})

// Create Store

app.post('/add_store', (req, res)=>{
  if(req.session.loggedIn){
    const {store_name} = req.body
    connection.query(`SELECT * FROM stores WHERE store_name = "${store_name}"`, (err, results)=>{
      if(err) throw err;
      const store = JSON.parse(JSON.stringify(results))[0];
      console.log(store)
      if((store) && (store_name == store.store_name)){
        res.send("Store name already taken.")
      }else{
        connection.query(`INSERT INTO stores (store_name, owner_username) VALUES ("${store_name}", "${req.session.username}");`, (err) => {
            if(err){
              // Add verification for if the store exists to inform user
              res.send(err)
            }else{
              res.send(`${store_name} was created sucessfuly!`)
            }
          }
        );
      }
    })
    
    
    }else{
      res.send("User is not logged in")
    }

})


app.post('/products', (req,res)=>{
  const store = 'Mechdevil';
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
  console.log(`API is running on ${ "http://localhost:" + port }`)
})

