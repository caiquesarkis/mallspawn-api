import express from "express"
const app = express()
const port = 3000

app.use(express.json())
app.use(express.urlencoded({extended: true}))

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

