const router = require('express').Router();
const verify = require('./verifyToken');
const Paintings = require('../models/Paintings');

router.get('/:collection_id', async (req, res) => {
  try {
    const paintings = await Paintings.find({"collection_id": req.params.collection_id})
    res.json(paintings);
  } catch (error) {
    res.status(400).send('could not find any paintings')
  }
})

router.get('/:id', async (req, res) => {
  try {
    const painting = await Paintings.find({"_id": req.params.id})
    res.json(painting);
  } catch (error) {
    res.status(400).send('could not find any paintings')
  }
})

router.post('/', async (req, res) => {
  const painting = new Paintings({
    collection_id: req.body.collection_id,
    name: req.body.name,
    image_string: req.body.image_string,
    dimensions: req.body.dimensions,
    medium: req.body.medium,
    price: req.body.price,
    description: req.body.description
  })

  try {
    const newPainting = await painting.save();
    res.json(newPainting);
  } catch (error) {
    res.status(400).send('could not create painting');
  }
})

router.patch('/:id', (req, res) => {
  try {
    const updatedImage = Paintings.updateOne({"_id": req.params.id}, {$set: {
      name: req.body.name,
      image_string: req.body.image_string,
      dimensions: req.body.dimensions,
      medium: req.body.medium,
      price: req.body.price,
      description: req.body.description
    }})
  } catch (error) {
    res.status(400).send('could not update image')
  }
})

router.delete('/:id', (req, res) => {
  try {
    const pictureToBeDeleted = Paintings.deleteOne({'_id': req.params.id});
    res.json(pictureToBeDeleted);
  } catch (error) {
    res.status(400).send('could not delete picture');
  }
})




module.exports = router;