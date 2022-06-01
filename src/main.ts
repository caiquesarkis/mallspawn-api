import express from "express"
import mysql from 'mysql2';
import 'dotenv/config';
import session from 'express-session';
import path from 'path';
import crypto from 'crypto';

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
    salt: string;
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

function generateSalt() {
    return crypto.randomBytes(16).toString("hex");
}

function HashPassword(password: string, salt: string) {
  const hashFunction = crypto.createHmac("sha256", salt)
  const hashedPassword = hashFunction.update(password).digest("hex")
  return hashedPassword
}

app.post('/new_owner', (req, res)=>{
  const {owner_username, owner_password} = req.body

  const salt = generateSalt()
  const hashedPassword = HashPassword(owner_password, salt)

  const query = `INSERT INTO shop_owners (owner_username, owner_password, owner_salt) VALUES ("${owner_username}", "${hashedPassword}", "${salt}");`
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
  if (username && password && !req.session.username) {
		connection.query(`SELECT * FROM shop_owners WHERE owner_username = "${username}";`, (err, results)=> {
			if (err){
        res.send("User couldn't login.")
        throw err;
      }else{
        const owner = JSON.parse(JSON.stringify(results))[0];
        const hashedPassword = HashPassword(password, owner.owner_salt)
        if((owner) && (username == owner.owner_username) && ( hashedPassword == owner.owner_password)){
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


app.post('/add_product', (req,res)=>{
  if(!req.session.loggedIn){
    res.send("User not logged in.")
  }else{
    const store = 'Mechdevil';
    const {name, description, category, status, price, compareAtPrice, images} = req.body
    const query = `INSERT INTO products (store_name, name, description, category, is_active, price, compare_at_price, images) VALUES ("${store}", "${name}", "${description}", "${category}", ${status}, "${price}", "${compareAtPrice}", '${JSON.stringify(images)}');`

    connection.query(query, (err) => {
        if(err){
          // Add more especific error handling
          res.send(err)
        }else{
          res.send("Produto cadastrado com sucesso!")
        }
      }
    );
  }
})

app.listen(port, () => {
  console.log(`API is running on ${ "http://localhost:" + port }`)
})

