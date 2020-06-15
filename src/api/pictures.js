const express = require('express');
const router = express.Router();

// add picture
router.post('/', (req, res) => {
    res.send('add a picture')
})

// get all pictures
router.get('/', (req, res) => {
    res.send('get all pictures')
})

// update picture
router.put('/:id', (req, res) => {
    res.send('update picture')
})

// delete picture
router.delete('/:id', (req, res) => {
    res.send('delete picture')
})

module.exports = router;