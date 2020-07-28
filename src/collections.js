const router = require('express').Router();
const verify = require('./verifyToken');
const Collections = require('../models/Collections');
const Paintings = require('../models/Paintings');


// gets last collection
router.get('/', async (req, res) => {
  try {
    const collections = await Collections.find();
    res.send(collections)
  } catch (error) {
    res.status(400).send('cannot find any collection')
  }
})

router.get('/:id', verify, async (req, res) => {
  try {
    const collection = await Collections.findOne({"_id": req.params.id })
    res.json(collection)
  } catch (error) {
    res.status(400).send('cannot find collection')
  }
})

router.post('/', verify, async (req, res) => {
  const collection = new Collections({
    name: req.body.name,
    userId: req.body.userId
  })

  try {
    const newCollection = await collection.save();
    res.json(newCollection);
  } catch (error) {
    res.status(400).send('could not make the collection')
  }
})

router.patch('/:id', verify, async (req, res) => {
  try {
    const collection = await Collections.updateOne({"_id": req.params.id}, {$set: {name: req.body.name}})
    res.json(collection);
  } catch (error) {
    req.status(400).send('could not update collection')
  }
})

router.delete('/:id', async (req, res) => {
  try {
    const paintingsToBeDeleted = await Paintings.deleteMany({"collection_id": req.params.id});
    const collectionToBeDeleted = await Collections.deleteOne({"_id": req.params.id})
    res.json(collectionToBeDeleted)
  } catch (error) {
    res.status(400).send('Faild to delete collection');
  }
})

module.exports = router;