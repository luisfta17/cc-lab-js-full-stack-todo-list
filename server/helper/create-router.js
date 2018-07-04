const router = require('express').Router();
const ObjectID = require('mongodb').ObjectID;

function createRouter(collection) {

  router.get('/', (req, res) => {
    getAllDocs(res)
  });

  router.post('/', (req, res) => {
    const newDoc = req.body

    collection.insertOne(newDoc).then(() =>{
      getAllDocs(res)
    })
  })

  router.put('/:id', (req, res) => {
    const newDoc = req.body
    const _id = ObjectID(req.params.id)

    collection.updateOne({_id}, {$set: newDoc}).then(() => {
      getAllDocs(res)
    })
  })

  router.delete('/:id', (req, res) => {
    const _id = ObjectID(req.params.id)

    collection.deleteOne({_id}).then(() => {
      getAllDocs(res)
    })
  })

  return router;

  function getAllDocs(res) {
    collection
      .find()
      .toArray()
      .then((docs) => res.json(docs))
      .catch((error) => handleError(error, res));
  }
}

function handleError (error, res) {
    console.error(error);
    res.status(500).json({ status: 500, error});
}

module.exports = createRouter;
