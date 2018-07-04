use todo;
db.dropDatabase();


db.list.insertMany([
  {
    text: "Do an app",
    done: false
  },
  {
    text: "Get milk",
    done: true
  }
]);
