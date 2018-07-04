const express = require('express');
const app = express();
const MongoClient = require('mongodb').MongoClient;


MongoClient.connect("mongodb://localhost:27017", (error, client) => {
  if (error){
    console.error(error);
  }
})


app.use(express.static('client/public'));

app.listen(3000, () => {
  console.log("Running express on http://localhost:3000 ");
})
