const express = require('express');
const app = express();
const MongoClient = require('mongodb').MongoClient;
const createRouter = require('./helper/create-router.js');

MongoClient.connect("mongodb://localhost:27017", (error, client) => {
  if (error){
    console.error(error);
  }

  const db = client.db("todo")
  const collection = db.collection('list');
  const todoListRouter = createRouter(collection);
  app.use('/api/todo', todoListRouter);

})




app.use(express.static('client/public'));

app.listen(3000, () => {
  console.log("Running express on http://localhost:3000 ");
})
