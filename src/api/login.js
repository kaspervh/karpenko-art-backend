const express = require('express');
const router = express.Router();

//login user
router.post('/', (req, res) => {
	res.send('authenticates only user')
})




module.exports = router;