const router = require('express').Router();
const verify = require('./verifyToken');
const Paintings = require('../models/Paintings');

router.get('/:collection_id', async (req, res) => {
  res.header("Access-Control-Allow-Origin", "*")
  console.log('colection paintings backend')
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
    console.log(error)
    res.status(400).send('could not find any paintings')
  }
})

router.post('/', verify, async (req, res) => {
  const paintings = req.body.paintings;

  try {
    const newPaintings = Paintings.insertMany(paintings)
    res.send(newPaintings)
  } catch (error) {
    res.send(error)
  }
})

router.patch('/', (req, res) => {
  res.header("Access-Control-Allow-Origin", "*")

  console.log('udpdate paintings')

  const paintings = req.body.paintings
  console.log(paintings)

  res.send('diller')
  // try { 
  //   const updatedImage = Paintings.updateOne({"_id": req.params.id}, {$set: {
  //     name: req.body.name,
  //     image_string: req.body.image_string,
  //     dimensions: req.body.dimensions,
  //     medium: req.body.medium,
  //     price: req.body.price,
  //     description: req.body.description
  //   }})
  // } catch (error) {
  //   res.status(400).send('could not update image')
  // }
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