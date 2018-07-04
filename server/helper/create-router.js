const router = require('express').Router();
const ObjectID = require('mongodb').ObjectID;

const createRouter = (collection) => {


  router.get('/', (req, res) => {
    collection
      .find()
      .toArray()
      .then((docs) => res.json(docs))
      .catch((error) => handleError(error, res));
  });


  return router;
}

const handleError = (error, res) => {
    console.error(error);
    res.status(500).json({ status: 500, error});
}

module.exports = createRouter;
