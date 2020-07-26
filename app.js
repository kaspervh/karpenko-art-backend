const express = require('express');
const mongoose = require('mongoose');
require('dotenv/config');
const app = express();
const cors = require('cors');


// will allow express to read calls with body
app.use(cors());
app.use(express.json())
app.use(express.urlencoded({extended: false}))


//connect to db
mongoose.connect(process.env.DB_CONNECTION,{useNewUrlParser: true}, () => console.log('db connected'))

// routess
app.get('/', (req, res) => {
  res.send('hello world')
})
app.use('/user', require('./src/user'));
app.use('/auth', require('./src/auth'));
app.use('/collections', require('./src/collections'));
app.use('/paintings', require('./src/paintings'));

app.listen(process.env.PORT || 1337, () => console.log('server is running'))