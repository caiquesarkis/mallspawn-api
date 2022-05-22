import express from "express";
const app = express();
console.log('hello')
app.get("/", function (req, res) {
  res.send("Hello World");
});
 
app.listen(3000);